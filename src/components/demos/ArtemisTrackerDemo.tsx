import React, { useState, useEffect, useRef } from 'react'
import { Rocket, Tv, Orbit, Timer, Clock, AlertTriangle } from 'lucide-react'
import * as THREE from 'three'
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js'

// Positional scale: 1 unit = Earth's radius (6,371 km)
// Visual radii are exaggerated so bodies are legible at the full Earth-Moon distance (~60 units)
const KM_PER_UNIT  = 6371
const EARTH_VR     = 5      // visual radius (true = 1)
const MOON_VR      = 2      // visual radius (true = 0.27)

interface HorizonsPoint {
  t:  Date
  x:  number   // km, Earth-centred ICRF
  y:  number
  z:  number
  vx: number   // km/s
  vy: number
  vz: number
}

// ICRF → Three.js: swap Y↔Z (puts north pole as Y-up)
function icrf(x: number, y: number, z: number, scale = 1): THREE.Vector3 {
  return new THREE.Vector3(-x * scale, z * scale, y * scale)
}

const MONTHS: Record<string, string> = {
  Jan:'01',Feb:'02',Mar:'03',Apr:'04',May:'05',Jun:'06',
  Jul:'07',Aug:'08',Sep:'09',Oct:'10',Nov:'11',Dec:'12',
}
function parseHorizonsDate(s: string): Date {
  const parts = s.trim().split(/\s+/)
  const [y, mon, d] = parts[0].split('-')
  const tp = (parts[1] ?? '00:00:00').replace(/\.\d+$/, '')
  return new Date(`${y}-${MONTHS[mon]}-${d}T${tp}Z`)
}

// Extract each data type independently — robust against any inter-line whitespace or extra columns
function parseHorizons(text: string): HorizonsPoint[] {
  const soe = text.indexOf('$$SOE')
  const eoe = text.indexOf('$$EOE')
  if (soe === -1 || eoe === -1) return []

  const block = text.slice(soe + 5, eoe)

  const dates:  Date[]                        = []
  const pos:    [number,number,number][]       = []
  const vel:    [number,number,number][]       = []

  const dateRe = /A\.D\.\s+([\d]{4}-\w{3}-\d{2}\s+[\d:.]+)\s+TDB/g
  const xyzRe  = /\bX\s*=\s*([-\d.E+]+)\s+Y\s*=\s*([-\d.E+]+)\s+Z\s*=\s*([-\d.E+]+)/g
  const vRe    = /VX\s*=\s*([-\d.E+]+)\s+VY\s*=\s*([-\d.E+]+)\s+VZ\s*=\s*([-\d.E+]+)/g

  let m: RegExpExecArray | null
  while ((m = dateRe.exec(block)) !== null) dates.push(parseHorizonsDate(m[1]))
  while ((m = xyzRe.exec(block))  !== null) pos.push([parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])])
  while ((m = vRe.exec(block))    !== null) vel.push([parseFloat(m[1]), parseFloat(m[2]), parseFloat(m[3])])

  return pos.map((p, i) => ({
    t:  dates[i] ?? new Date(),
    x:  p[0], y: p[1], z: p[2],
    vx: vel[i]?.[0] ?? 0, vy: vel[i]?.[1] ?? 0, vz: vel[i]?.[2] ?? 0,
  }))
}

function interpolate(pts: HorizonsPoint[], now: Date): HorizonsPoint | null {
  if (!pts.length) return null
  const t = now.getTime()
  // Clamp to range
  if (t <= pts[0].t.getTime()) return pts[0]
  if (t >= pts[pts.length - 1].t.getTime()) return pts[pts.length - 1]
  for (let i = 0; i < pts.length - 1; i++) {
    const t0 = pts[i].t.getTime(), t1 = pts[i + 1].t.getTime()
    if (t >= t0 && t < t1) {
      const f = (t - t0) / (t1 - t0)
      const lerp = (a: number, b: number) => a + f * (b - a)
      return {
        t: now,
        x: lerp(pts[i].x, pts[i + 1].x), y: lerp(pts[i].y, pts[i + 1].y),
        z: lerp(pts[i].z, pts[i + 1].z), vx: lerp(pts[i].vx, pts[i + 1].vx),
        vy: lerp(pts[i].vy, pts[i + 1].vy), vz: lerp(pts[i].vz, pts[i + 1].vz),
      }
    }
  }
  return pts[pts.length - 1]
}


function horizonsUrl(target: string, start: string, stop: string, step: string) {
  const p = new URLSearchParams({
    format:     'json',
    COMMAND:    target,
    OBJ_DATA:   'NO',
    MAKE_EPHEM: 'YES',
    EPHEM_TYPE: 'VECTORS',
    CENTER:     '500@399',
    START_TIME: start,
    STOP_TIME:  stop,
    STEP_SIZE:  step,
    VEC_TABLE:  '2',
    OUT_UNITS:  'KM-S',
  })
  const horizons = `https://ssd.jpl.nasa.gov/api/horizons.api?${p}`
  return `https://horizons-proxy.culturebombadil.workers.dev/?url=${encodeURIComponent(horizons)}`
}

function isoHorizons(d: Date): string {
  return d.toISOString().slice(0, 16)   // keep T — Horizons accepts ISO format
}

export default function ArtemisTrackerDemo() {
  const mountRef       = useRef<HTMLDivElement>(null)
  const frameRef       = useRef<number>(0)
  const clockRef       = useRef(performance.now())
  const markerRef      = useRef<THREE.Mesh | null>(null)
  const ringRef        = useRef<THREE.Mesh | null>(null)
  const ringMatRef     = useRef<THREE.MeshBasicMaterial | null>(null)
  const moonMeshRef    = useRef<THREE.Mesh | null>(null)
  const moonGlowRef    = useRef<THREE.Mesh | null>(null)
  const moonOrbitRingRef = useRef<THREE.Line | null>(null)
  const sunMeshRef       = useRef<THREE.Group | null>(null)
  const labelRendererRef = useRef<CSS2DRenderer | null>(null)
  const pathRef        = useRef<THREE.Mesh | null>(null)
  const fullPathRef    = useRef<THREE.Mesh | null>(null)
  const sunLightRef    = useRef<THREE.DirectionalLight | null>(null)
  const fillLightRef   = useRef<THREE.DirectionalLight | null>(null)
  const sceneRef       = useRef<THREE.Scene | null>(null)
  const cameraRef      = useRef<THREE.PerspectiveCamera | null>(null)
  const isDragging     = useRef(false)
  const userDragged    = useRef(false)
  const sceneReadyRef  = useRef(false)
  const lastMouse      = useRef({ x: 0, y: 0 })
  const spherical      = useRef((() => {
    // Initialise camera facing the sun-lit side of Earth
    const D   = Date.now() / 86400000 + 2440587.5 - 2451545.0
    const g   = (357.528 + 0.9856003 * D) * Math.PI / 180
    const L   = (280.460 + 0.9856474 * D) * Math.PI / 180
    const lam = L + (1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * Math.PI / 180
    const eps = (23.439 - 0.0000004 * D) * Math.PI / 180
    const sx  = Math.cos(lam), sy = Math.cos(eps) * Math.sin(lam)
    // Three.js sun X = -sx, Z = sy → theta = atan2(Z, X)
    return { theta: Math.atan2(sy, -sx), phi: Math.PI * 0.45 }
  })())
  const lookTargetRef  = useRef(new THREE.Vector3(0, 0, 0))

  const [artemisPts,    setArtemisPts]    = useState<HorizonsPoint[]>([])
  const [fullTrajPts,   setFullTrajPts]   = useState<HorizonsPoint[]>([])
  const [moonPts,       setMoonPts]       = useState<HorizonsPoint[]>([])
  const [current,       setCurrent]       = useState<HorizonsPoint | null>(null)
  const [moonCurrent,   setMoonCurrent]   = useState<HorizonsPoint | null>(null)
  const [posSpeed,      setPosSpeed]      = useState<number | null>(null)
  const [met,           setMet]           = useState('')
  const [loading,       setLoading]       = useState(true)
  const [sceneReady,    setSceneReady]    = useState(false)
  const [fetchError,    setFetchError]    = useState<string | null>(null)
  const [hoveredCrew,   setHoveredCrew]   = useState<string | null>(null)

  const FALLBACK_CREW = [
    { role: 'Commander',          name: 'Reid Wiseman',   photo: '/astronauts/wiseman1.png', wiki: 'https://en.wikipedia.org/wiki/Reid_Wiseman'    },
    { role: 'Pilot',              name: 'Victor Glover',  photo: '/astronauts/glover1.png',  wiki: 'https://en.wikipedia.org/wiki/Victor_Glover'   },
    { role: 'Mission Spec.', name: 'Christina Koch', photo: '/astronauts/koch1.png',    wiki: 'https://en.wikipedia.org/wiki/Christina_Koch'  },
    { role: 'Mission Spec.', name: 'Jeremy Hansen',  photo: '/astronauts/hansen1.png',  wiki: 'https://en.wikipedia.org/wiki/Jeremy_Hansen'   },
  ]
  const crew = FALLBACK_CREW

  // Fetch Horizons data on mount — fetches are independent so Moon failure doesn't kill Artemis
  useEffect(() => {
    const now   = new Date()
    const back  = new Date(now.getTime() - 8 * 3600_000)
    const fwd   = new Date(now.getTime() + 4 * 3600_000)

    const fetchTarget = async (target: string, start: string, stop: string, step: string): Promise<{ pts: HorizonsPoint[], status: number }> => {
      const attempt = async () => {
        const r = await fetch(horizonsUrl(target, start, stop, step))
        const status = r.status
        if (!r.ok) return { pts: [], status }
        try {
          const d = await r.json()
          return { pts: parseHorizons(d.result as string), status }
        } catch {
          return { pts: [], status }
        }
      }
      try {
        const first = await attempt()
        if (first.pts.length) return first
        if (first.status !== 200) return first   // don't retry a known error
        return await attempt()
      } catch {
        return { pts: [], status: 0 }
      }
    }

    // Live window — fine resolution for accurate current position
    fetchTarget('-1024', isoHorizons(back), isoHorizons(fwd), '30m').then(({ pts, status }) => {
      if (pts.length) {
        setArtemisPts(pts)
      } else {
        if (status === 503) setFetchError('JPL Horizons offline. Service unavailable.')
        else if (status === 0)  setFetchError('No contact with JPL Horizons. Check network.')
        else                    setFetchError(`JPL Horizons fault. Status ${status}.`)
      }
      setLoading(false)
    })

    // Full mission arc — coarse resolution just for the trajectory shape
    // Stop at splashdown; Horizons has no trajectory data for -1024 beyond mission end
    fetchTarget('-1024', '2026-04-01T00:00', '2026-04-11T01:00', '6h').then(({ pts }) => {
      setFullTrajPts(pts)
    })

    fetchTarget('301', isoHorizons(back), isoHorizons(fwd), '1h').then(({ pts }) => {
      setMoonPts(pts)
    })

  }, [])

  // Mission Elapsed Time — T+ since launch
  const LAUNCH_TIME      = new Date('2026-04-01T22:35:12Z')
  const SPLASHDOWN_TIME  = new Date('2026-04-11T00:07:00Z')
  const MISSION_DURATION = SPLASHDOWN_TIME.getTime() - LAUNCH_TIME.getTime()
  useEffect(() => {
    const tick = () => {
      const elapsed = Date.now() - LAUNCH_TIME.getTime()
      const s = Math.floor(elapsed / 1000)
      const d = Math.floor(s / 86400)
      const h = Math.floor((s % 86400) / 3600)
      const m = Math.floor((s % 3600) / 60)
      const sec = s % 60
      setMet(`T+ ${String(d).padStart(2,'0')}:${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`)
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Update interpolated positions every second
  useEffect(() => {
    if (!artemisPts.length) return
    const tick = () => {
      const now  = new Date()
      const prev = new Date(now.getTime() - 60_000)  // 60s back for stable delta
      const p1   = interpolate(artemisPts, prev)
      const p2   = interpolate(artemisPts, now)
      if (p1 && p2) {
        const dx = p2.x - p1.x, dy = p2.y - p1.y, dz = p2.z - p1.z
        const distKm = Math.sqrt(dx*dx + dy*dy + dz*dz)
        setPosSpeed(distKm / 60)  // km/s
      }
      setCurrent(p2)
      setMoonCurrent(interpolate(moonPts, now))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [artemisPts, moonPts])

  // Build Three.js scene once
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const W = mount.clientWidth, H = mount.clientHeight

    function makeLabel(text: string): HTMLDivElement {
      const el = document.createElement('div')
      el.textContent = text
      el.style.cssText = 'font-family:monospace;font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(255,255,255,0.55);pointer-events:none;user-select:none;text-shadow:0 0 6px rgba(0,0,0,0.9)'
      return el
    }

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.shadowMap.enabled = false
    mount.appendChild(renderer.domElement)

    const labelRenderer = new CSS2DRenderer()
    labelRenderer.setSize(W, H)
    labelRenderer.domElement.style.position = 'absolute'
    labelRenderer.domElement.style.top      = '0'
    labelRenderer.domElement.style.left     = '0'
    labelRenderer.domElement.style.pointerEvents = 'none'
    mount.appendChild(labelRenderer.domElement)
    labelRendererRef.current = labelRenderer

    const scene  = new THREE.Scene()
    scene.background = new THREE.Color(0x010209)
    const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 3000)
    camera.position.set(0, 25, 85)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera
    sceneRef.current  = scene

    // Stars — three layers for depth
    function makeStars(count: number, rMin: number, rMax: number, size: number, opacity: number) {
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        const th = Math.random() * Math.PI * 2
        const ph = Math.acos(2 * Math.random() - 1)
        const r  = rMin + Math.random() * (rMax - rMin)
        pos[i*3]   = r * Math.sin(ph) * Math.cos(th)
        pos[i*3+1] = r * Math.sin(ph) * Math.sin(th)
        pos[i*3+2] = r * Math.cos(ph)
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      return new THREE.Points(geo, new THREE.PointsMaterial({
        color: 0xffffff, size, sizeAttenuation: true, transparent: true, opacity,
      }))
    }
    scene.add(makeStars(7000, 500, 750, 0.28, 0.55))  // faint background haze
    scene.add(makeStars(1800, 400, 650, 0.55, 0.80))  // mid-range stars
    scene.add(makeStars(220,  350, 600, 1.1,  0.95))  // bright foreground stars

    // Milky Way band — sparse stars concentrated along an angled disc plane
    {
      const count = 2200
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const spread = (Math.random() - 0.5) * 0.22   // thin band in xz plane
        const r = 550 + Math.random() * 150
        const x = r * Math.cos(angle)
        const z = r * Math.sin(angle)
        const y = r * (spread + Math.sin(angle) * 0.05)
        pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = z
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const mw = new THREE.Points(geo, new THREE.PointsMaterial({
        color: 0xaac8ff, size: 0.32, sizeAttenuation: true, transparent: true, opacity: 0.35,
      }))
      mw.rotation.z = Math.PI * 0.18   // tilt band
      scene.add(mw)
    }

    // Earth
    const loader   = new THREE.TextureLoader()
    const earthMat = new THREE.MeshPhongMaterial({ specular: new THREE.Color(0x1a3a5c), shininess: 12, emissive: new THREE.Color(0x112233), emissiveIntensity: 0.4 })
    const earth    = new THREE.Mesh(new THREE.SphereGeometry(EARTH_VR, 64, 64), earthMat)
    scene.add(earth)
    const earthLabel = new CSS2DObject(makeLabel('Earth'))
    earthLabel.position.set(0, EARTH_VR + 1.5, 0)
    earth.add(earthLabel)
    loader.load('/textures/earth.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      earthMat.map = tex
      earthMat.needsUpdate = true
    })

    // Earth atmosphere glow
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_VR * 1.08, 64, 64),
      new THREE.ShaderMaterial({
        uniforms: { c: { value: 0.38 }, p: { value: 5.0 }, glowColor: { value: new THREE.Color(0x1a66ff) } },
        vertexShader:   `varying vec3 vNormal; void main(){vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
        fragmentShader: `uniform float c,p;uniform vec3 glowColor;varying vec3 vNormal;void main(){float i=pow(c-dot(vNormal,vec3(0,0,1)),p);gl_FragColor=vec4(glowColor,i);}`,
        side: THREE.FrontSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
      }),
    ))

    // Moon — procedural grey sphere with subtle darker patches
    const moonMat  = new THREE.MeshPhongMaterial({ specular: 0x111111, shininess: 4, emissive: new THREE.Color(0x1a1a1a), emissiveIntensity: 0.5 })
    loader.load('/textures/2k_moon.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      moonMat.map = tex
      moonMat.needsUpdate = true
    })
    const moonMesh = new THREE.Mesh(new THREE.SphereGeometry(MOON_VR, 32, 32), moonMat)
    moonMesh.position.set(0, 0, -60)   // default; updated each frame from data
    scene.add(moonMesh)
    moonMeshRef.current = moonMesh
    const moonLabel = new CSS2DObject(makeLabel('Moon'))
    moonLabel.position.set(0, MOON_VR + 1.2, 0)
    moonMesh.add(moonLabel)

    // Moon glow (very faint) — stored in ref so it follows the moon
    const moonGlow = new THREE.Mesh(
      new THREE.SphereGeometry(MOON_VR * 1.06, 32, 32),
      new THREE.ShaderMaterial({
        uniforms: { c: { value: 0.25 }, p: { value: 4.0 }, glowColor: { value: new THREE.Color(0x556677) } },
        vertexShader:   `varying vec3 vNormal; void main(){vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
        fragmentShader: `uniform float c,p;uniform vec3 glowColor;varying vec3 vNormal;void main(){float i=pow(c-dot(vNormal,vec3(0,0,1)),p);gl_FragColor=vec4(glowColor,i*0.5);}`,
        side: THREE.FrontSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
      }),
    )
    moonGlow.position.set(0, 0, -60)
    scene.add(moonGlow)
    moonGlowRef.current = moonGlow

    // Moon orbit ring — oriented when moonPts data arrives
    {
      const segments = 128
      const ringPos = new Float32Array((segments + 1) * 3)
      for (let i = 0; i <= segments; i++) {
        const a = (i / segments) * Math.PI * 2
        ringPos[i * 3]     = Math.cos(a)
        ringPos[i * 3 + 1] = 0
        ringPos[i * 3 + 2] = Math.sin(a)
      }
      const ringGeo = new THREE.BufferGeometry()
      ringGeo.setAttribute('position', new THREE.BufferAttribute(ringPos, 3))
      const moonOrbitRing = new THREE.Line(
        ringGeo,
        new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22, depthWrite: false }),
      )
      scene.add(moonOrbitRing)
      moonOrbitRingRef.current = moonOrbitRing
    }

    // Trajectory path line (updated when data arrives)

    // Artemis marker
    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.7, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0x0AFF9D }),
    )
    // Point light on the marker so it casts a green glow onto nearby space
    const markerLight = new THREE.PointLight(0x0AFF9D, 2.5, 20)
    marker.add(markerLight)
    const orionLabel = new CSS2DObject(makeLabel('Orion'))
    orionLabel.position.set(0, 4, 0)
    marker.add(orionLabel)
    scene.add(marker)
    markerRef.current = marker

    // Pulsing ring
    const ringMat = new THREE.MeshBasicMaterial({ color: 0x0AFF9D, side: THREE.DoubleSide, transparent: true, opacity: 1, depthWrite: false })
    const ring    = new THREE.Mesh(new THREE.RingGeometry(0.8, 1.1, 32), ringMat)
    scene.add(ring)
    ringRef.current    = ring
    ringMatRef.current = ringMat

    // Bracket corners (4 L-shaped corners around the marker)
    const bracketMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.75 })
    const BRACKET_OUTER = 2.8  // distance from centre to bracket tip
    const BRACKET_LEN   = 0.9  // length of each bracket arm
    const bracketGroup  = new THREE.Group()
    ;[
      [1, 1], [1, -1], [-1, 1], [-1, -1]  // four corners
    ].forEach(([sx, sy]) => {
      const geo = new THREE.BufferGeometry()
      const x = sx * BRACKET_OUTER, y = sy * BRACKET_OUTER
      const xl = sx * (BRACKET_OUTER - BRACKET_LEN), yl = sy * (BRACKET_OUTER - BRACKET_LEN)
      geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array([
        xl, y, 0,   // horizontal arm start
        x,  y, 0,   // corner
        x, yl, 0,   // vertical arm end
      ]), 3))
      bracketGroup.add(new THREE.Line(geo, bracketMat))
    })
    scene.add(bracketGroup)
    // Store ref so we can billboard it each frame
    ;(marker as THREE.Mesh & { bracketGroup?: THREE.Group }).bracketGroup = bracketGroup

    // Sun visual — bright sphere + additive glow, positioned each frame along the real solar vector
    {
      const sunGroup = new THREE.Group()
      // Core sphere
      const sunMat = new THREE.MeshBasicMaterial({ color: 0xfffbe6 })
      loader.load('/textures/2k_sun.jpg', (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace
        sunMat.map = tex
        sunMat.needsUpdate = true
      })
      sunGroup.add(new THREE.Mesh(new THREE.SphereGeometry(7, 24, 24), sunMat))
      // Inner corona glow
      sunGroup.add(new THREE.Mesh(
        new THREE.SphereGeometry(10.5, 24, 24),
        new THREE.MeshBasicMaterial({ color: 0xffe066, transparent: true, opacity: 0.18, depthWrite: false, side: THREE.BackSide }),
      ))
      // Outer haze
      sunGroup.add(new THREE.Mesh(
        new THREE.SphereGeometry(17.5, 24, 24),
        new THREE.MeshBasicMaterial({ color: 0xffaa00, transparent: true, opacity: 0.07, depthWrite: false, side: THREE.BackSide }),
      ))
      scene.add(sunGroup)
      sunMeshRef.current = sunGroup
    }

    // Lighting: sun positioned from real solar direction (updated each frame)
    const sun = new THREE.DirectionalLight(0xfff8e7, 2.2)
    scene.add(sun)
    sunLightRef.current = sun
    scene.add(new THREE.AmbientLight(0x6080aa, 1.8))
    // Soft fill from opposite side so dark hemispheres are still visible
    const fill = new THREE.DirectionalLight(0x4466aa, 1.0)
    scene.add(fill)
    fillLightRef.current = fill

    function animate() {
      frameRef.current = requestAnimationFrame(animate)
      const t = (performance.now() - clockRef.current) / 1000

      // Rotate Earth on its axis using GMST (Greenwich Mean Sidereal Time)
      // GMST gives the real-world rotation angle of Earth at the current UTC instant.
      // J2000.0 epoch: 2000-Jan-1 12:00 UTC = 2451545.0 Julian Day
      // GMST at J2000.0 = 280.46061837° and Earth rotates 360.98564724° per Julian day.
      const nowMs   = Date.now()
      const jd      = nowMs / 86400000 + 2440587.5          // Julian Day (UTC)
      const T       = (jd - 2451545.0) / 36525              // Julian centuries from J2000.0
      const gmstDeg = (280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T) % 360
      const gmstRad = (gmstDeg * Math.PI) / 180
      // The earth.jpg texture has the prime meridian (0° lon) at the centre-right seam.
      // An offset of -π/2 aligns that seam with Three.js's default sphere UV mapping.
      earth.rotation.y = -gmstRad - Math.PI / 2

      // Sun direction in ICRF (low-precision solar coordinates, accurate to ~0.01°)
      // Source: Astronomical Algorithms, Meeus Ch.25 / JPL low-precision formulae
      {
        const D     = jd - 2451545.0                             // days since J2000.0
        const g     = (357.528 + 0.9856003 * D) * Math.PI / 180 // mean anomaly
        const L     = (280.460 + 0.9856474 * D) * Math.PI / 180 // mean longitude
        const lam   = L + (1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * Math.PI / 180 // ecliptic lon
        const eps   = (23.439 - 0.0000004 * D) * Math.PI / 180  // obliquity of ecliptic
        // Ecliptic → ICRF equatorial unit vector (Earth→Sun direction)
        const sx = Math.cos(lam)
        const sy = Math.cos(eps) * Math.sin(lam)
        const sz = Math.sin(eps) * Math.sin(lam)
        // ICRF → Three.js (same transform as icrf() helper: swap Y↔Z, negate X)
        const sunUnit = new THREE.Vector3(-sx, sz, sy)
        const sunDir  = sunUnit.clone().multiplyScalar(500)
        if (sunLightRef.current)  sunLightRef.current.position.copy(sunDir)
        if (fillLightRef.current) fillLightRef.current.position.copy(sunDir.clone().negate())
        if (sunMeshRef.current)   sunMeshRef.current.position.copy(sunUnit.multiplyScalar(1500))
      }

      // Pulse ring
      const ring    = ringRef.current!
      const ringMat = ringMatRef.current!
      const pulse   = (t % 2.2) / 2.2
      ring.scale.setScalar(1 + pulse * 1.6)
      ringMat.opacity = Math.max(0, 1 - pulse * 1.3)
      ring.position.copy(marker.position)
      ring.lookAt(camera.position)

      // Bracket corners — billboard to always face camera
      const bg = (marker as THREE.Mesh & { bracketGroup?: THREE.Group }).bracketGroup
      if (bg) {
        bg.position.copy(marker.position)
        bg.quaternion.copy(camera.quaternion)
      }

      // Auto-orbit until user has dragged
      if (!isDragging.current && !userDragged.current && sceneReadyRef.current) spherical.current.theta += 0.0015

      // Camera: orbit around the Earth-Moon midpoint, at a distance that always fits both
      const moon = moonMeshRef.current
      const mid  = moon ? moon.position.clone().multiplyScalar(0.5) : new THREE.Vector3()

      // Smoothly track midpoint
      lookTargetRef.current.lerp(mid, 0.04)

      const halfFov  = (55 / 2) * (Math.PI / 180)
      const dToEarth = lookTargetRef.current.length() + EARTH_VR + 10
      const dToMoon  = moon
        ? lookTargetRef.current.distanceTo(moon.position) + MOON_VR + 10
        : 0
      // On portrait screens use horizontal FOV so bodies fill width not just height
      const effectiveFov = camera.aspect < 1
        ? Math.atan(Math.tan(halfFov) * camera.aspect)
        : halfFov
      const zoomFactor = camera.aspect < 1 ? 0.78 : 1
      const r = (Math.max(dToEarth, dToMoon) / Math.tan(effectiveFov)) * zoomFactor

      const { theta, phi } = spherical.current
      camera.position.set(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      ).add(lookTargetRef.current)

      camera.lookAt(lookTargetRef.current)

      renderer.render(scene, camera)
      labelRenderer.render(scene, camera)
    }
    animate()

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth, h = mount.clientHeight
      renderer.setSize(w, h)
      labelRenderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    ro.observe(mount)

    return () => {
      cancelAnimationFrame(frameRef.current)
      ro.disconnect()
      if (earthMat.map) earthMat.map.dispose()
      if (moonMat.map)  moonMat.map.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
      if (mount.contains(labelRenderer.domElement)) mount.removeChild(labelRenderer.domElement)
    }
  }, [])

  // Build trajectory line
  function buildLine(
    scene: THREE.Scene,
    pts: HorizonsPoint[],
    color: number,
    opacity: number,
  ): THREE.Line {
    const positions = new Float32Array(pts.length * 3)
    pts.forEach((p, i) => {
      const v = icrf(p.x, p.y, p.z, 1 / KM_PER_UNIT)
      positions[i * 3] = v.x; positions[i * 3 + 1] = v.y; positions[i * 3 + 2] = v.z
    })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity, depthTest: false })
    const line = new THREE.Line(geo, mat)
    scene.add(line)
    return line
  }

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene) return
    if (!fullTrajPts.length) { console.warn('[Artemis] full traj empty'); return }
    console.log('[Artemis] full traj pts:', fullTrajPts.length, 'first:', fullTrajPts[0]?.x, fullTrajPts[0]?.y)
    if (fullPathRef.current) { scene.remove(fullPathRef.current); fullPathRef.current = null }
    fullPathRef.current = buildLine(scene, fullTrajPts, 0xffffff, 1.0) as unknown as THREE.Mesh
  }, [fullTrajPts])

  useEffect(() => {
    const scene = sceneRef.current
    if (!scene || !artemisPts.length) return
    if (pathRef.current) { scene.remove(pathRef.current); pathRef.current = null }
    pathRef.current = buildLine(scene, artemisPts, 0x0AFF9D, 1.0) as unknown as THREE.Mesh
  }, [artemisPts])

  // Orient moon orbit ring from real ephemeris data
  useEffect(() => {
    const ring = moonOrbitRingRef.current
    if (!ring || moonPts.length < 3) return
    // Sample three positions spread across the dataset to define the orbital plane
    const n = moonPts.length
    const p0 = icrf(moonPts[0].x,           moonPts[0].y,           moonPts[0].z)
    const p1 = icrf(moonPts[Math.floor(n / 3)].x, moonPts[Math.floor(n / 3)].y, moonPts[Math.floor(n / 3)].z)
    const p2 = icrf(moonPts[Math.floor(2 * n / 3)].x, moonPts[Math.floor(2 * n / 3)].y, moonPts[Math.floor(2 * n / 3)].z)
    const normal = p1.clone().sub(p0).cross(p2.clone().sub(p0)).normalize()
    // Average orbital radius in scene units
    const avgRadius = moonPts.reduce((sum, p) =>
      sum + Math.sqrt(p.x ** 2 + p.y ** 2 + p.z ** 2), 0) / moonPts.length / KM_PER_UNIT
    ring.scale.setScalar(avgRadius)
    ring.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), normal)
  }, [moonPts])

  // Mark scene ready once the two live datasets have arrived (full trajectory is cosmetic, not blocking)
  useEffect(() => {
    if (artemisPts.length && moonPts.length) { setSceneReady(true); sceneReadyRef.current = true }
  }, [artemisPts, moonPts])


  // Once both datasets load, orient camera to Artemis-side of Moon so it's never occluded
  const autoOriented = useRef(false)
  useEffect(() => {
    if (autoOriented.current || userDragged.current || !artemisPts.length || !moonPts.length) return
    const now = new Date()
    const ap = interpolate(artemisPts, now)
    const mp = interpolate(moonPts, now)
    if (!ap || !mp) return
    // Vector from Moon to Artemis — camera should be on this side
    const dx = ap.x - mp.x
    const dz = ap.y - mp.y   // ICRF y → scene z after transform
    const theta = Math.atan2(dz, -dx)  // negated X matches icrf() transform
    spherical.current.theta = theta
    spherical.current.phi   = Math.PI * 0.45
    autoOriented.current = true
  }, [artemisPts, moonPts])

  // Sync marker + moon mesh positions from interpolated state
  useEffect(() => {
    if (current && markerRef.current) {
      markerRef.current.position.copy(icrf(current.x, current.y, current.z, 1 / KM_PER_UNIT))
    }
  }, [current])

  useEffect(() => {
    if (moonCurrent) {
      const pos = icrf(moonCurrent.x, moonCurrent.y, moonCurrent.z, 1 / KM_PER_UNIT)
      moonMeshRef.current?.position.copy(pos)
      moonGlowRef.current?.position.copy(pos)
    }
  }, [moonCurrent])

  // Drag handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current  = true
    userDragged.current = true
    lastMouse.current  = { x: e.clientX, y: e.clientY }
    if (e.pointerType !== 'touch') e.currentTarget.setPointerCapture(e.pointerId)
  }
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastMouse.current.x
    const dy = e.clientY - lastMouse.current.y
    lastMouse.current = { x: e.clientX, y: e.clientY }
    spherical.current.theta += dx * 0.005
    if (e.pointerType !== 'touch') spherical.current.phi = Math.max(0.05, Math.min(Math.PI - 0.05, spherical.current.phi - dy * 0.005))
  }
  const handlePointerUp = () => { isDragging.current = false }

  // Derived telemetry — distances are surface-to-surface to match NASA's public figures
  const EARTH_RADIUS_KM = 6371
  const MOON_RADIUS_KM  = 1737.4

  const distEarth = current
    ? Math.sqrt(current.x ** 2 + current.y ** 2 + current.z ** 2) - EARTH_RADIUS_KM
    : null
  const distMoon = (current && moonCurrent)
    ? Math.sqrt(
        (current.x - moonCurrent.x) ** 2 +
        (current.y - moonCurrent.y) ** 2 +
        (current.z - moonCurrent.z) ** 2
      ) - MOON_RADIUS_KM
    : null
  const altMoon = distMoon


  // Closest approach — hardcoded from mission parameters (~7,400 km / ~4,600 mi on April 8)
  const CLOSEST_FLYBY_KM = 7400
  const CLOSEST_FLYBY_T  = new Date('2026-04-06T18:00:00Z')
  const closestApproach  = { dist: CLOSEST_FLYBY_KM, t: CLOSEST_FLYBY_T, passed: CLOSEST_FLYBY_T.getTime() < Date.now() }


  const KM_TO_MI = 0.621371
  const mi    = (km: number) => Math.round(km * KM_TO_MI).toLocaleString()
  const mph   = (kms: number) => Math.round(kms * 3600 * KM_TO_MI).toLocaleString()

  return (
    <div className="mb-5 flex flex-col">
      <div className="order-2 sm:order-1 mb-2 rounded-lg overflow-hidden bg-[#070c11] border border-accent/10">
        {/* Title row */}
        <div className="px-4 py-3 border-b border-accent/[7%]">
          {/* Mobile: title only */}
          <div className="sm:hidden flex items-center gap-2">
            <Orbit size={15} className="text-text-primary flex-shrink-0" />
            <span className="font-mono text-[13px] tracking-wide text-text-primary">Artemis II: Lunar Flyby Mission</span>
          </div>
          {/* Desktop: icon + title + Live pill inline */}
          <div className="hidden sm:flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <Orbit size={18} className="text-text-primary flex-shrink-0" />
              <span className="font-mono text-[15px] tracking-wide truncate text-text-primary">Artemis II: Lunar Flyby Mission</span>
            </div>
            <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full flex-shrink-0 bg-accent/[6%] border border-accent/[15%]">
              <span className="pulse-dot w-1.5 h-1.5 rounded-full flex-shrink-0 bg-accent" style={{ boxShadow: '0 0 6px #0AFF9D' }} />
              <span className="font-mono text-[10px] tracking-widest uppercase text-accent">Live</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        {(() => {
          const progress = Math.min(1, Math.max(0, (Date.now() - LAUNCH_TIME.getTime()) / MISSION_DURATION))
          const flybyPct = closestApproach
            ? Math.min(1, Math.max(0, (closestApproach.t.getTime() - LAUNCH_TIME.getTime()) / MISSION_DURATION))
            : null
          return (
            <div className="px-4 py-4 border-b border-accent/[7%]">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <Timer size={13} className="text-amber-400 flex-shrink-0" />
                  <span className="font-mono text-[11px] tracking-wide text-accent text-[13px]">Mission progress</span>
                </div>
                <span className="font-mono sm:font-bold text-[11px] tracking-[0.08em] text-[#38bdf8] bg-[rgba(56,189,248,0.1)] border border-[rgba(56,189,248,0.2)] rounded px-[7px] py-[2px]">
                  {(progress * 100).toFixed(1)}%
                </span>
              </div>
              <div className="relative w-full flex items-center gap-1.5">
                <div className="w-1 h-3 rounded-sm flex-shrink-0 bg-[rgba(56,189,248,0.4)]" />
                <div className="relative flex-1 rounded-full overflow-hidden h-[5px] bg-[rgba(56,189,248,0.12)] border border-[rgba(56,189,248,0.15)]">
                  <div className="absolute inset-y-0 left-0 rounded-full" style={{ width: `${progress * 100}%`, background: 'linear-gradient(90deg, #1d4ed8, #38bdf8)' }} />
                  {flybyPct !== null && (
                    <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white" style={{ left: `calc(${flybyPct * 100}% - 3px)` }} />
                  )}
                </div>
                <div className="w-1 h-3 rounded-sm flex-shrink-0 bg-[rgba(56,189,248,0.4)]" />
              </div>
              <div className="relative flex items-center justify-between mt-2">
                <span className="font-mono text-[10px] text-text-muted">Launch</span>
                {flybyPct !== null && (
                  <span className="font-mono text-[10px] text-text-muted absolute -translate-x-1/2" style={{ left: `calc(${flybyPct * 100}%)` }}>Flyby</span>
                )}
                <span className="font-mono text-[10px] text-text-muted">Splashdown</span>
              </div>
            </div>
          )
        })()}

        {/* Desktop: mission time + NASA broadcast row */}
        <div className="hidden sm:flex items-center justify-between px-4 py-4 border-b border-accent/[7%]">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <Clock size={13} className="text-amber-400 flex-shrink-0" />
              <span className="font-mono text-[11px] tracking-wide text-accent text-[13px]">Mission time</span>
            </div>
            <span className="font-mono text-[18px] font-bold text-text-primary tabular-nums">{met || '—'}</span>
          </div>
          <a
            href="https://www.youtube.com/watch?v=m3kR2KK8TEs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-link hover:text-link/80 transition-colors duration-150"
          >
            NASA Broadcast
            <Tv size={11} />
          </a>
        </div>

        {/* Body: crew + right column */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-accent/[7%]">

          {/* Crew */}
          <div className="px-4 pt-4 pb-2 sm:py-4 border-b sm:border-b-0 sm:border-r border-accent/[7%]">
            <div className="flex items-center gap-2 mb-2.5">
              <Rocket size={13} className="text-amber-400 flex-shrink-0" />
              <span className="font-mono text-[11px] tracking-wide text-accent text-[13px]">Crew</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0 sm:gap-y-1">
              {crew.map((m) => (
                <div key={m.name} className="flex items-center gap-2.5">
                  <div className="relative w-14 h-14 flex-shrink-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/70 flex-shrink-0">
                      <img
                        src={m.photo}
                        alt={m.name}
                        className="w-full h-full object-cover object-[center_10%] scale-125 transform"
                      />
                    </div>
                    <svg className="hidden sm:block absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 56 56">
                      <circle
                        cx="28" cy="28" r="26"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeDasharray="163.36"
                        style={{ strokeDashoffset: hoveredCrew === m.name ? 0 : 163.36, transition: 'stroke-dashoffset 1050ms ease-in-out' }}
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <a
                      href={m.wiki}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[13px] font-semibold leading-snug hover:text-[#38bdf8] transition-colors duration-150 truncate text-[#F5A623] sm:text-text-primary"
                      onMouseEnter={() => setHoveredCrew(m.name)}
                      onMouseLeave={() => setHoveredCrew(null)}
                    >{m.name}</a>
                    <span className="font-mono text-[10px] tracking-widest uppercase text-text-muted truncate">
                      <span className="sm:hidden">{m.role === 'Mission Spec.' ? 'Mission Specialist' : m.role}</span>
                      <span className="hidden sm:inline">{m.role}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: mission time on mobile, stats on desktop */}
          <div>
            {/* Mobile: mission time */}
            <div className="sm:hidden px-4 pt-2 pb-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={13} className="text-amber-400 flex-shrink-0" />
                <span className="font-mono text-[11px] tracking-wide text-accent text-[13px]">Mission time</span>
              </div>
              <span className="font-mono text-[18px] sm:font-bold text-text-primary tabular-nums">{met || '—'}</span>
            </div>

            {/* Desktop: 2x2 stats */}
            {fetchError ? (
              <div className="hidden sm:block px-4 py-4">
                <div className="flex items-center gap-2 mb-2.5">
                  <AlertTriangle size={13} className="text-[#ff4d4d] flex-shrink-0" />
                  <span className="font-mono text-[11px] tracking-wide text-[#ff4d4d]">Telemetry unavailable</span>
                </div>
                <span className="font-mono text-[12px] text-[rgba(255,77,77,0.85)]">{fetchError}</span>
              </div>
            ) : (loading || !current) ? (
              <div className="hidden sm:flex items-center gap-3 px-4 py-4">
                <div className="relative flex-shrink-0 w-7 h-7">
                  <div className="absolute inset-0 rounded-full border border-accent/[15%]" />
                  <div className="animate-spin absolute inset-0 rounded-full border-2 border-transparent" style={{ borderTopColor: '#0AFF9D' }} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-1 h-1 rounded-full bg-accent" style={{ boxShadow: '0 0 6px #0AFF9D' }} />
                  </div>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-accent">Acquiring telemetry</span>
                  <span className="font-mono text-[9px] text-accent/40">NASA / JPL Horizons</span>
                </div>
              </div>
            ) : (
              <div className="hidden sm:grid grid-cols-2 h-full">
                {[
                  { label: 'Distance from Earth', value: distEarth ? mi(distEarth) + ' mi' : '—' },
                  { label: 'Distance from Moon',  value: altMoon != null ? mi(altMoon) + ' mi' : '—' },
                  { label: 'Speed',               value: posSpeed ? mph(posSpeed) + ' mph' : '—' },
                  { label: 'Closest flyby',        value: closestApproach ? mi(closestApproach.dist) + ' mi' : '—' },
                ].map(({ label, value }, i) => (
                  <div key={label} className={`px-4 py-4 ${i % 2 === 1 ? 'border-l border-accent/[7%]' : ''} ${i >= 2 ? 'border-t border-accent/[7%]' : ''}`}>
                    <span className="font-mono text-[11px] tracking-wide block mb-2.5 text-accent">{label}</span>
                    <span className="font-mono text-[14px] font-bold text-text-primary tabular-nums">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Mobile stats */}
        <div className="sm:hidden grid grid-cols-2 border-b border-accent/[7%]">
          {fetchError ? (
            <div className="col-span-2 px-4 py-4">
              <div className="flex items-center gap-2 mb-2.5">
                <AlertTriangle size={13} className="text-[#ff4d4d] flex-shrink-0" />
                <span className="font-mono text-[11px] tracking-wide text-[#ff4d4d]">Telemetry unavailable</span>
              </div>
              <span className="font-mono text-[12px] text-[rgba(255,77,77,0.85)]">{fetchError}</span>
            </div>
          ) : (loading || !current) ? (
            <div className="col-span-2 flex items-center gap-3 px-4 py-4">
              <div className="relative flex-shrink-0 w-7 h-7">
                <div className="absolute inset-0 rounded-full border border-accent/[15%]" />
                <div className="animate-spin absolute inset-0 rounded-full border-2 border-transparent" style={{ borderTopColor: '#0AFF9D' }} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-accent" style={{ boxShadow: '0 0 6px #0AFF9D' }} />
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-[10px] tracking-widest uppercase text-accent">Acquiring telemetry</span>
                <span className="font-mono text-[9px] text-accent/40">NASA / JPL Horizons</span>
              </div>
            </div>
          ) : (
            [
              { label: 'Distance from Earth', value: distEarth ? mi(distEarth) + ' mi' : '—' },
              { label: 'Distance from Moon',  value: altMoon != null ? mi(altMoon) + ' mi' : '—' },
              { label: 'Speed',               value: posSpeed ? mph(posSpeed) + ' mph' : '—' },
              { label: 'Closest flyby',        value: closestApproach ? mi(closestApproach.dist) + ' mi' : '—' },
            ].map(({ label, value }, i) => (
              <div key={label} className={`px-4 py-4 ${i % 2 === 1 ? 'border-l border-accent/[7%]' : ''} ${i >= 2 ? 'border-t border-accent/[7%]' : ''}`}>
                <span className="font-mono text-[11px] tracking-wide block mb-2.5 text-accent">{label}</span>
                <span className="font-mono text-[14px] text-text-primary tabular-nums">{value}</span>
              </div>
            ))
          )}
        </div>

        {/* Mobile bottom bar */}
        <div className="flex sm:hidden items-center justify-between px-4 py-3 border-t border-accent/[7%]">
          <a
            href="https://www.youtube.com/watch?v=m3kR2KK8TEs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-link hover:text-link/80 transition-colors duration-150"
          >
            NASA Broadcast
            <Tv size={11} />
          </a>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/[6%] border border-accent/[15%]">
            <span className="pulse-dot w-1.5 h-1.5 rounded-full flex-shrink-0 bg-accent" style={{ boxShadow: '0 0 6px #0AFF9D' }} />
            <span className="font-mono text-[9px] tracking-widest uppercase text-accent">Live</span>
          </div>
        </div>

      </div>

      <div className="order-1 sm:order-2 mb-2 sm:mb-0 rounded-xl overflow-hidden border border-accent/[12%] bg-[#080d12]">

        <div className="relative w-full" style={{ height: 'clamp(260px, 56vw, 520px)' }}>
          <div
            ref={mountRef}
            className="absolute inset-0 bg-[#000306] sm:brightness-100 brightness-125"
            style={{ cursor: isDragging.current ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />

          {/* Loading skeleton overlay — fades out once all data has arrived */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none bg-[#000306]"
            style={{
              transition: 'opacity 0.8s ease',
              opacity: sceneReady && !fetchError ? 0 : 1,
            }}
            aria-hidden={sceneReady}
          >
            {fetchError ? (
              <div className="flex flex-col items-center gap-2">
                <span className="font-mono text-[11px] tracking-widest uppercase text-[#ff4d4d]">
                  Telemetry unavailable
                </span>
                <span className="font-mono text-[9px] tracking-wider text-center text-[rgba(255,77,77,0.85)]">
                  {fetchError}
                </span>
              </div>
            ) : (
              <>
                {/* Animated radar ring */}
                <div className="relative flex items-center justify-center w-[72px] h-[72px]">
                  <div className="absolute inset-0 rounded-full border border-accent/[15%]" />
                  <div className="absolute inset-[6px] rounded-full border border-accent/10" />
                  <div className="animate-spin absolute inset-0 rounded-full border-2 border-transparent" style={{ borderTopColor: '#0AFF9D' }} />
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" style={{ boxShadow: '0 0 8px #0AFF9D' }} />
                </div>
                <div className="flex flex-col items-center gap-1.5">
                  <span className="font-mono text-[11px] tracking-widest uppercase text-accent">
                    Acquiring telemetry
                  </span>
                  <span className="font-mono text-[9px] tracking-wider text-accent/40">
                    NASA / JPL Horizons
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 hidden sm:flex items-center justify-between px-3 py-1.5 bg-[rgba(8,13,18,0.7)] border-t border-accent/[8%]">
            <span className="font-mono text-[7px] text-[#3d5060]">Trajectory: <span className="text-[#3d6070]">NASA/JPL Horizons (−1024)</span></span>
            <span className="font-mono text-[7px] text-[#3d5060]">Earth texture: <span className="text-[#3d6070]">Solar System Scope (CC BY 4.0)</span></span>
          </div>
        </div>


      </div>
    </div>
  )
}

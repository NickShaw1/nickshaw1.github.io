import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

function issLatLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90-lat)*(Math.PI/180), theta = (lon+180)*(Math.PI/180)
  return new THREE.Vector3(-r*Math.sin(phi)*Math.cos(theta), r*Math.cos(phi), r*Math.sin(phi)*Math.sin(theta))
}

interface ISSData { latitude: number; longitude: number; altitude: number; velocity: number }
interface CrewMember { name: string; craft: string }

export default function ISSTrackerDemo() {
  const mountRef        = useRef<HTMLDivElement>(null)
  const frameRef        = useRef<number>(0)
  const markerRef       = useRef<THREE.Mesh | null>(null)
  const cameraRef       = useRef<THREE.PerspectiveCamera | null>(null)
  const earthMeshRef    = useRef<THREE.Mesh | null>(null)
  const earthMatRef     = useRef<THREE.ShaderMaterial | null>(null)
  const sunLightRef     = useRef<THREE.DirectionalLight | null>(null)
  const fillLightRef    = useRef<THREE.DirectionalLight | null>(null)
  const issGeoRef       = useRef<{ lat: number; lon: number } | null>(null)
  const prevApiWorld    = useRef<THREE.Vector3 | null>(null)
  const orbitNormalRef  = useRef<THREE.Vector3 | null>(null)

  const userControlled  = useRef(false)
  const isDragging      = useRef(false)
  const lastMouse       = useRef({ x: 0, y: 0 })
  const spherical       = useRef({ theta: 0, phi: Math.PI / 2 })
  const retractTimer    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastPointerType = useRef<string>('')
  const [following, setFollowing] = useState(true)

  const [issData,  setIssData]  = useState<ISSData | null>(null)
  const [crew,     setCrew]     = useState<CrewMember[]>([])
  const [crewFailed,  setCrewFailed]  = useState(false)
  const [loading,     setLoading]     = useState(true)
  const [fetchFailed, setFetchFailed] = useState(false)
  const dataArrivedRef  = useRef(false)
  const crewArrivedRef  = useRef(false)
  const issRetriedRef   = useRef(false)
  const crewRetriedRef  = useRef(false)

  const centreOnISS = useCallback(() => {
    userControlled.current = false
    setFollowing(true)
  }, [])

  const scheduleRetract = useCallback(() => {
    if (retractTimer.current) clearTimeout(retractTimer.current)
    retractTimer.current = setTimeout(() => {
      userControlled.current = false
      setFollowing(true)
    }, 5000)
  }, [])

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const W = mount.clientWidth, H = mount.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.shadowMap.enabled = false
    mount.appendChild(renderer.domElement)

    const scene  = new THREE.Scene()
    scene.background = new THREE.Color(0x010209)
    const camera = new THREE.PerspectiveCamera(45, W/H, 0.1, 1000)
    camera.position.set(0, 0, 3.0)
    cameraRef.current = camera

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
    scene.add(makeStars(7000, 50, 90, 0.04, 0.55))
    scene.add(makeStars(1800, 40, 80, 0.07, 0.80))
    scene.add(makeStars(220,  35, 75, 0.14, 0.95))

    // Milky Way band
    {
      const count = 2200
      const pos = new Float32Array(count * 3)
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2
        const spread = (Math.random() - 0.5) * 0.22
        const r = 65 + Math.random() * 20
        const x = r * Math.cos(angle)
        const z = r * Math.sin(angle)
        const y = r * (spread + Math.sin(angle) * 0.05)
        pos[i*3] = x; pos[i*3+1] = y; pos[i*3+2] = z
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
      const mw = new THREE.Points(geo, new THREE.PointsMaterial({
        color: 0xaac8ff, size: 0.04, sizeAttenuation: true, transparent: true, opacity: 0.35,
      }))
      mw.rotation.z = Math.PI * 0.18
      scene.add(mw)
    }

    const loader = new THREE.TextureLoader()

    // Day/night shader — blends textures based on sun angle, city lights only on dark side
    const earthMat = new THREE.ShaderMaterial({
      uniforms: {
        dayMap:       { value: null },
        nightMap:     { value: null },
        sunDirection: { value: new THREE.Vector3(1, 0, 0) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vWorldNormal;
        void main() {
          vUv = uv;
          vWorldNormal = normalize(mat3(modelMatrix) * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D dayMap;
        uniform sampler2D nightMap;
        uniform vec3 sunDirection;
        varying vec2 vUv;
        varying vec3 vWorldNormal;
        void main() {
          vec3 n    = normalize(vWorldNormal);
          vec3 sun  = normalize(sunDirection);
          float cosA = dot(n, sun);
          // Blend day/night over ±8° around the terminator
          float blend = smoothstep(-0.14, 0.14, cosA);
          // Diffuse lighting: boost day side, soft ambient on night side
          float diffuse = max(0.0, cosA);
          float ambient = 0.45;
          float light   = ambient + diffuse * 1.4;
          vec4 day   = texture2D(dayMap,   vUv) * light;
          vec4 night = texture2D(nightMap, vUv) * 1.2;
          // Blue floor + earthshine: brighter toward limb on dark side
          float darkness = 1.0 - blend;
          vec3 earthshine = vec3(0.04, 0.07, 0.18) * darkness;
          vec3 nightFinal = max(night.rgb + earthshine, vec3(0.05, 0.09, 0.20));
          gl_FragColor = vec4(mix(nightFinal, day.rgb, blend), 1.0);
        }
      `,
    })
    loader.load('/textures/earth.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      earthMat.uniforms.dayMap.value = tex
    })
    loader.load('/textures/2k_earth_nightmap.jpg', (tex) => {
      tex.colorSpace = THREE.LinearSRGBColorSpace
      earthMat.uniforms.nightMap.value = tex
    })
    const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), earthMat)
    scene.add(earthMesh)
    earthMeshRef.current = earthMesh
    earthMatRef.current  = earthMat



    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.08, 64, 64),
      new THREE.ShaderMaterial({
        uniforms: { p: { value: 3.5 }, glowColor: { value: new THREE.Color(0x3388ff) } },
        vertexShader:   `varying vec3 vNormal; void main(){vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
        fragmentShader: `uniform float p;uniform vec3 glowColor;varying vec3 vNormal;void main(){float rim=1.0-max(0.0,dot(vNormal,vec3(0,0,1)));float i=pow(rim,p)*0.9;gl_FragColor=vec4(glowColor*i,i);}`,
        side: THREE.FrontSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
      }),
    ))

    const sun = new THREE.DirectionalLight(0xfff8e7, 1.8)
    sun.castShadow = false
    scene.add(sun)
    sunLightRef.current = sun
    scene.add(new THREE.AmbientLight(0x3a5070, 1.1))
    const fill = new THREE.DirectionalLight(0x2a4060, 0.5)
    scene.add(fill)
    fillLightRef.current = fill

    // Sprite marker — always faces camera, consistent screen size, readable on any terrain
    const markerCanvas = document.createElement('canvas')
    markerCanvas.width = 64; markerCanvas.height = 64
    const ctx = markerCanvas.getContext('2d')!
    const cx = 32, cy = 32
    // White outer ring
    ctx.beginPath(); ctx.arc(cx, cy, 18, 0, Math.PI * 2)
    ctx.strokeStyle = 'rgba(255,255,255,0.95)'; ctx.lineWidth = 3; ctx.stroke()
    // Green inner dot
    ctx.beginPath(); ctx.arc(cx, cy, 8, 0, Math.PI * 2)
    ctx.fillStyle = '#0AFF9D'; ctx.fill()
    const markerTex = new THREE.CanvasTexture(markerCanvas)
    const marker = new THREE.Sprite(new THREE.SpriteMaterial({ map: markerTex, depthTest: true, transparent: true }))
    marker.scale.setScalar(0.18)
    scene.add(marker)
    markerRef.current = marker as unknown as THREE.Mesh

    function animate() {
      frameRef.current = requestAnimationFrame(animate)



      // Rotate Earth on its axis using GMST (same formula as Artemis tracker)
      const nowMs   = Date.now()
      const jd      = nowMs / 86400000 + 2440587.5
      const T       = (jd - 2451545.0) / 36525
      const gmstDeg = (280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T) % 360
      const gmstRad = (gmstDeg * Math.PI) / 180
      const earthRotY = -gmstRad - Math.PI / 2
      if (earthMeshRef.current) earthMeshRef.current.rotation.y = earthRotY

      // Sun direction from real solar coordinates (low-precision, ~0.01° accuracy)
      const sunDirNorm = (() => {
        const D   = jd - 2451545.0
        const g   = (357.528 + 0.9856003 * D) * Math.PI / 180
        const L   = (280.460 + 0.9856474 * D) * Math.PI / 180
        const lam = L + (1.915 * Math.sin(g) + 0.020 * Math.sin(2 * g)) * Math.PI / 180
        const eps = (23.439 - 0.0000004 * D) * Math.PI / 180
        const sx  = Math.cos(lam)
        const sy  = Math.cos(eps) * Math.sin(lam)
        const sz  = Math.sin(eps) * Math.sin(lam)
        return new THREE.Vector3(-sx, sz, sy).normalize()
      })()
      if (sunLightRef.current)  sunLightRef.current.position.copy(sunDirNorm.clone().multiplyScalar(500))
      if (fillLightRef.current) fillLightRef.current.position.copy(sunDirNorm.clone().negate().multiplyScalar(500))
      // Pass normalised sun direction into the day/night shader
      if (earthMatRef.current) earthMatRef.current.uniforms.sunDirection.value.copy(sunDirNorm)

      // Keep ISS marker co-rotating with Earth's texture
      if (issGeoRef.current && markerRef.current) {
        const geo = issGeoRef.current
        const base = issLatLonToVec3(geo.lat, geo.lon, 1.065)
        base.applyEuler(new THREE.Euler(0, earthRotY, 0))
        markerRef.current.position.copy(base)


      }


      if (userControlled.current) {
        const { theta, phi } = spherical.current
        const r = 3.0
        camera.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta),
        )
        camera.lookAt(0, 0, 0)
      } else if (marker.position.lengthSq() > 0) {
        const target = marker.position.clone().normalize().multiplyScalar(3.0)
        camera.position.lerp(target, 0.03)
        camera.lookAt(0, 0, 0)
        const r = camera.position.length()
        spherical.current.phi   = Math.acos(Math.max(-1, Math.min(1, camera.position.y / r)))
        spherical.current.theta = Math.atan2(camera.position.z, camera.position.x)
      }

      renderer.render(scene, camera)
    }
    animate()

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth, h = mount.clientHeight
      renderer.setSize(w, h); camera.aspect = w/h; camera.updateProjectionMatrix()
    })
    ro.observe(mount)

    return () => {
      cancelAnimationFrame(frameRef.current)
      ro.disconnect()
      const dayTex   = earthMat.uniforms.dayMap.value as THREE.Texture | null
      const nightTex = earthMat.uniforms.nightMap.value as THREE.Texture | null
      if (dayTex)   dayTex.dispose()
      if (nightTex) nightTex.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  const fetchISS = useCallback(async () => {
    const attempt = async () => {
      const r = await fetch('https://api.wheretheiss.at/v1/satellites/25544')
      const d = await r.json()
      const data: ISSData = { latitude: d.latitude, longitude: d.longitude, altitude: d.altitude, velocity: d.velocity }
      setIssData(data)
      if (!dataArrivedRef.current) { dataArrivedRef.current = true; setLoading(false); setFetchFailed(false) }
      issGeoRef.current = { lat: d.latitude, lon: d.longitude }
      // Compute world position (ICRF) for orbital plane — includes GMST at time of fetch
      const jdNow    = Date.now() / 86400000 + 2440587.5
      const tNow     = (jdNow - 2451545.0) / 36525
      const gmstNow  = (280.46061837 + 360.98564736629 * (jdNow - 2451545.0) + 0.000387933 * tNow * tNow) % 360
      const rotY     = -(gmstNow * Math.PI / 180) - Math.PI / 2
      const worldPos = issLatLonToVec3(d.latitude, d.longitude, 1.065).applyEuler(new THREE.Euler(0, rotY, 0))
      if (prevApiWorld.current) {
        const rawNormal = new THREE.Vector3().crossVectors(prevApiWorld.current.normalize(), worldPos.clone().normalize()).normalize()
        if (rawNormal.lengthSq() > 0.0001) {
          if (!orbitNormalRef.current) orbitNormalRef.current = rawNormal.clone()
          else orbitNormalRef.current.lerp(rawNormal, 0.25).normalize()
        }
      }
      prevApiWorld.current = worldPos.clone()
    }
    try {
      await attempt()
    } catch {
      if (!dataArrivedRef.current && !issRetriedRef.current) {
        issRetriedRef.current = true
        try { await attempt() } catch { setFetchFailed(true) }
      }
    }
  }, [])

  useEffect(() => {
    fetchISS()
    const id = setInterval(fetchISS, 5000)
    return () => clearInterval(id)
  }, [fetchISS])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!crewArrivedRef.current) setCrewFailed(true)
    }, 8000)

    const parseCrew = (d: { people?: { name: string; craft?: string; spacecraft?: string }[] }) => {
      if (d.people) {
        setCrew(d.people.map((m) => ({ name: m.name, craft: m.craft || m.spacecraft || 'ISS' })))
        crewArrivedRef.current = true
        clearTimeout(timeout)
      }
    }

    const url = 'https://corquaid.github.io/international-space-station-APIs/JSON/people-in-space.json'
    fetch(url)
      .then(r => r.json())
      .then(parseCrew)
      .catch(() => {
        if (!crewRetriedRef.current) {
          crewRetriedRef.current = true
          fetch(url)
            .then(r => r.json())
            .then(parseCrew)
            .catch(() => setCrewFailed(true))
        } else {
          setCrewFailed(true)
        }
      })
  }, [])

  const craftGroups = crew.reduce<Record<string,string[]>>((acc,m) => { const k = m.craft||'ISS'; ;(acc[k]??=[]).push(m.name); return acc }, {})

  const panel = 'font-mono bg-[rgba(8,13,18,0.9)] border border-accent/[18%] backdrop-blur-[10px] rounded-lg px-3 py-[9px]'
  const lbl   = 'font-mono text-[9px] tracking-[0.15em] uppercase text-accent mb-1.5 block'
  const dim   = 'font-mono text-[10px] text-[#3d5060]'

  const posPanel = (
    <div className={`${panel} flex-1 min-w-0`}>
      <span className={lbl}>ISS Position</span>
      {issData ? (
        <div>
          <div className="font-mono text-[13px] text-[#dde6ee] leading-[1.5]">
            {Math.abs(issData.latitude).toFixed(3)}° {issData.latitude>=0?'N':'S'}&nbsp;&nbsp;{Math.abs(issData.longitude).toFixed(3)}° {issData.longitude>=0?'E':'W'}
          </div>
          <div className="mt-2 flex flex-col gap-[3px]">
            <div className="font-mono text-[12px] text-[#8bb8cc]">Alt &nbsp;<span className="text-[#dde6ee]">{issData.altitude.toFixed(1)} km</span></div>
            <div className="font-mono text-[12px] text-[#8bb8cc]">Speed <span className="text-[#dde6ee]">{(issData.velocity/3.6).toFixed(0)} m/s</span></div>
          </div>
        </div>
      ) : <div className={dim}>Fetching…</div>}
    </div>
  )

  const crewPanel = (
    <div className={`${panel} flex-1 min-w-0 max-h-[220px] overflow-y-auto`}>
      <span className={lbl}>People in Space {crew.length > 0 && <span className="text-[#5a8a9a]">({crew.length})</span>}</span>
      {crew.length > 0
        ? Object.entries(craftGroups).map(([craft, names]) => (
            <div key={craft} className="mb-1.5">
              <div className={`${dim} mb-0.5`}>{craft}</div>
              {names.map(n => <div key={n} className="font-mono text-[10px] text-[#dde6ee] leading-[1.65]">{n}</div>)}
            </div>
          ))
        : crewFailed
          ? <div className="font-mono text-[10px] text-[rgba(255,77,77,0.7)]">Unavailable</div>
          : <div className={dim}>Fetching…</div>
      }
    </div>
  )

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = true
    userControlled.current = true
    lastPointerType.current = e.pointerType
    setFollowing(false)
    if (retractTimer.current) clearTimeout(retractTimer.current)
    lastMouse.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastMouse.current.x
    const dy = e.clientY - lastMouse.current.y
    lastMouse.current = { x: e.clientX, y: e.clientY }
    spherical.current.theta += dx * 0.005
    spherical.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.current.phi - dy * 0.005))
  }
  const handlePointerUp = () => {
    isDragging.current = false
    if (userControlled.current) scheduleRetract()
  }

  return (
    <div className="mb-5">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Live demo</p>

      <div className="rounded-xl overflow-hidden border border-accent/[12%] bg-[#080d12]">

        <div className="relative w-full" style={{ height: 'clamp(260px, 45vw, 440px)' }}>
          <div
            ref={mountRef}
            className="absolute inset-0 bg-[#000306]"
            style={{ cursor: isDragging.current ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          />

          {/* Loading skeleton overlay — fades out once ISS data has arrived */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-[#000306]"
            style={{
              transition: 'opacity 0.8s ease',
              opacity: loading || fetchFailed ? 1 : 0,
              pointerEvents: loading || fetchFailed ? 'auto' : 'none',
            }}
            aria-hidden={!loading && !fetchFailed}
          >
            {fetchFailed ? (
              <div className="flex flex-col items-center gap-2">
                <span className="font-mono text-[11px] tracking-widest uppercase text-[#ff4d4d]">
                  Telemetry unavailable
                </span>
                <span className="font-mono text-[9px] tracking-wider text-center text-[rgba(255,77,77,0.5)]">
                  Could not reach wheretheiss.at
                </span>
              </div>
            ) : (
              <>
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
                    wheretheiss.at
                  </span>
                </div>
              </>
            )}
          </div>

          <div className="absolute top-3 left-3 hidden sm:block min-w-[195px]" style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease', pointerEvents: loading ? 'none' : 'auto' }}>{posPanel}</div>
          <div className="absolute top-3 right-3 hidden sm:block max-w-[172px]" style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease', pointerEvents: loading ? 'none' : 'auto' }}>{crewPanel}</div>

          {/* Centre on ISS button — panel style, bottom left */}
          <div className="absolute bottom-3 left-3 hidden sm:block" style={{ opacity: loading ? 0 : 1, transition: 'opacity 0.6s ease', pointerEvents: loading ? 'none' : 'auto' }}>
            <button
              onClick={centreOnISS}
              disabled={following}
              className={`${panel} flex items-center gap-[7px] transition-opacity duration-200 ${following ? 'cursor-default opacity-55' : 'cursor-pointer'} ${following ? 'border-accent/[18%]' : 'border-accent/50'}`}
            >
              <span
                className="w-[7px] h-[7px] rounded-full flex-shrink-0 transition-all duration-200"
                style={{
                  background: following ? '#0AFF9D' : 'transparent',
                  border: following ? 'none' : '1.5px solid #0AFF9D',
                  boxShadow: following ? '0 0 6px #0AFF9D88' : 'none',
                }}
              />
              <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-accent">
                {following ? 'Following ISS' : 'Centre on ISS'}
              </span>
            </button>
          </div>

        </div>

        <div className="hidden sm:flex items-center justify-end px-3 py-1.5 bg-[rgba(8,13,18,0.7)] border-t border-accent/[8%]">
          <span className="font-mono text-[7px] text-[#3d5060]">Earth texture: <span className="text-[#3d6070]">Solar System Scope (CC BY 4.0)</span></span>
        </div>

        <div className="block sm:hidden">
          <div className="px-4 py-3 border-t border-accent/10">
            <div className={lbl}>ISS Position</div>
            {issData ? (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[12px] text-[#dde6ee]">
                  {Math.abs(issData.latitude).toFixed(2)}° {issData.latitude>=0?'N':'S'}&nbsp;&nbsp;{Math.abs(issData.longitude).toFixed(2)}° {issData.longitude>=0?'E':'W'}
                </span>
                <span className="font-mono text-[11px] text-[#8bb8cc]">Alt <span className="text-[#dde6ee]">{issData.altitude.toFixed(1)} km</span></span>
                <span className="font-mono text-[11px] text-[#8bb8cc]">Speed <span className="text-[#dde6ee]">{(issData.velocity/3.6).toFixed(0)} m/s</span></span>
              </div>
            ) : <span className={dim}>Fetching…</span>}
          </div>

          <div className="px-4 py-3 border-t border-accent/10">
            <div className={lbl}>People in Space {crew.length > 0 && <span className="text-[#5a8a9a]">({crew.length})</span>}</div>
            {crew.length > 0
              ? Object.entries(craftGroups).map(([craft, names]) => (
                  <div key={craft} className="mb-1.5">
                    <div className={`${dim} mb-0.5`}>{craft}</div>
                    <div className="flex flex-wrap gap-x-3 gap-y-0.5">
                      {names.map(n => <span key={n} className="font-mono text-[10px] text-[#dde6ee]">{n}</span>)}
                    </div>
                  </div>
                ))
              : crewFailed
                ? <span className="font-mono text-[10px] text-[rgba(255,77,77,0.7)]">Unavailable</span>
                : <span className={dim}>Fetching…</span>
            }
          </div>

          <div className="px-4 py-2 text-right border-t border-accent/[6%]">
            <span className="font-mono text-[7px] text-[#3d5060]">Earth texture: <span className="text-[#3d6070]">Solar System Scope (CC BY 4.0)</span></span>
          </div>
        </div>

      </div>
    </div>
  )
}

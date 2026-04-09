import React, { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'
import { Activity } from 'lucide-react'

// Plate boundary data credit: Peter Bird (2003) / Hugo Ahlenius (Nordpil), ODbL
// https://github.com/fraxen/tectonicplates

const EARTH_R = 5

function latLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi   = (90 - lat) * Math.PI / 180
  const theta = (lon + 180) * Math.PI / 180
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  )
}

function magColor(mag: number): THREE.Color {
  if (mag >= 7)   return new THREE.Color(0xff1111)  // danger red
  if (mag >= 5.5) return new THREE.Color(0xff6600)  // burning orange
  if (mag >= 4)   return new THREE.Color(0xb44fff)  // plasma violet
  return new THREE.Color(0x00d4ff)                  // electric cyan
}

function quakeRadius(mag: number): number {
  // M2.5 ≈ 0.03, M5 ≈ 0.08, M7 ≈ 0.17, M9 ≈ 0.35 — relative to Earth radius 5
  return Math.min(0.45, 0.03 * Math.pow(2, (mag - 2.5) * 0.55))
}

// Convert a lat/lon to camera spherical angles, accounting for Earth's current GMST rotation
function getQuakeSpherical(lat: number, lon: number): { theta: number; phi: number } {
  const jd      = Date.now() / 86400000 + 2440587.5
  const gmstDeg = (280.46061837 + 360.98564736629 * (jd - 2451545.0)) % 360
  const rotY    = -(gmstDeg * Math.PI / 180) - Math.PI / 2
  // Unit vector in Earth local space
  const lp = (90 - lat) * Math.PI / 180
  const lt = (lon + 180) * Math.PI / 180
  const lx = -Math.sin(lp) * Math.cos(lt)
  const ly =  Math.cos(lp)
  const lz =  Math.sin(lp) * Math.sin(lt)
  // Apply Earth's Y rotation to get world space direction (Three.js Y rotation matrix)
  const wx = lx * Math.cos(rotY) + lz * Math.sin(rotY)
  const wy = ly
  const wz = -lx * Math.sin(rotY) + lz * Math.cos(rotY)
  return {
    theta: Math.atan2(wz, wx),
    phi:   Math.max(0.1, Math.min(Math.PI - 0.1, Math.acos(Math.max(-1, Math.min(1, wy))))),
  }
}

// Spatial deduplication: one ping per cluster within ~300 km (≈ 2.7 degrees).
// For each candidate, if a representative already exists within the threshold,
// keep whichever has the higher magnitude; otherwise start a new cluster.
function clusterByLocation(quakes: QuakeProps[], thresholdDeg = 2.7): QuakeProps[] {
  const reps: QuakeProps[] = []
  for (const q of quakes) {
    const idx = reps.findIndex(
      r => Math.abs(r.lat - q.lat) < thresholdDeg && Math.abs(r.lon - q.lon) < thresholdDeg
    )
    if (idx === -1) reps.push(q)
    else if (q.mag > reps[idx].mag) reps[idx] = q
  }
  return reps
}

function timeAgo(ms: number): string {
  const s = Math.floor((Date.now() - ms) / 1000)
  if (s < 60)    return `${s}s ago`
  if (s < 3600)  return `${Math.floor(s / 60)}m ago`
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`
  return `${Math.floor(s / 86400)}d ago`
}

type TimeRange  = 'hour' | 'day' | 'week' | 'month'
type MagFilter  = '2.5' | '4.5' | 'significant'

interface QuakeProps {
  mag:     number
  place:   string
  time:    number
  depth:   number
  lat:     number
  lon:     number
  alert:   string | null
  tsunami: number
}

function feedUrl(time: TimeRange, mag: MagFilter): string {
  return `https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${mag}_${time}.geojson`
}

const TIME_BTNS: { label: string; value: TimeRange }[] = [
  { label: 'Hour',  value: 'hour'  },
  { label: 'Day',   value: 'day'   },
  { label: 'Week',  value: 'week'  },
  { label: 'Month', value: 'month' },
]

const MAG_BTNS: { label: string; value: MagFilter }[] = [
  { label: 'M2.5+',   value: '2.5'         },
  { label: 'M4.5+',   value: '4.5'         },
  { label: 'Notable', value: 'significant' },
]

const MAG_LEGEND = [
  { color: '#00d4ff', label: 'M2.5–4',  desc: 'Minor, rarely felt'          },
  { color: '#b44fff', label: 'M4–5.5',  desc: 'Light, felt indoors'         },
  { color: '#ff6600', label: 'M5.5–7',  desc: 'Strong, potential damage'    },
  { color: '#ff1111', label: 'M7+',     desc: 'Major, widespread damage'    },
]

export default function EarthquakeTrackerDemo() {
  const mountRef       = useRef<HTMLDivElement>(null)
  const dismissRef     = useRef<() => void>(() => {})
  const sceneRef       = useRef<THREE.Scene | null>(null)
  const cameraRef      = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef    = useRef<THREE.WebGLRenderer | null>(null)
  const frameRef       = useRef<number>(0)
  const quakeMeshRef   = useRef<THREE.InstancedMesh | null>(null)
  const glowMeshRef    = useRef<THREE.InstancedMesh | null>(null)
  const pingMeshRef    = useRef<THREE.InstancedMesh | null>(null)
  const pingDataRef    = useRef<{ pos: THREE.Vector3; baseScale: number; color: THREE.Color }[]>([])
  const pingMeshBRef   = useRef<THREE.InstancedMesh | null>(null)
  const platesRef      = useRef<THREE.Group | null>(null)
  const earthMeshRef   = useRef<THREE.Mesh | null>(null)
  const spherical      = useRef({ theta: 0.3, phi: Math.PI * 0.42 })
  const isDragging       = useRef(false)
  const lastMouse        = useRef({ x: 0, y: 0 })
  const pointerDownPos   = useRef({ x: 0, y: 0 })
  const userDragged      = useRef(false)
  const resumeTimer      = useRef<ReturnType<typeof setTimeout> | null>(null)
  const quakesRef        = useRef<QuakeProps[]>([])
  const cameraDistRef    = useRef(13)   // zoom-able camera distance (units); Earth radius = 5
  const lerpTarget       = useRef<{ theta: number; phi: number } | null>(null)
  const lerpDistTarget   = useRef<number | null>(null)
  const mostRecentQuake  = useRef<QuakeProps | null>(null)
  const hitMeshRef       = useRef<THREE.InstancedMesh | null>(null)
  const tooltipRef       = useRef<HTMLDivElement>(null)
  const selLocalPos      = useRef<THREE.Vector3 | null>(null)
  const projVec          = useRef(new THREE.Vector3())

  const [quakes,     setQuakes]     = useState<QuakeProps[]>([])
  const [selected,   setSelected]   = useState<QuakeProps | null>(null)
  const [timeRange,  setTimeRange]  = useState<TimeRange>('day')
  const [magFilter,  setMagFilter]  = useState<MagFilter>('2.5')
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState<string | null>(null)
  const [showPlates, setShowPlates] = useState(true)

  // Keep selectedRef in sync so the scheduleResume timer can check it without a stale closure
  useEffect(() => { selectedRef.current = selected }, [selected])


  // Build Three.js scene once
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    cameraDistRef.current = window.innerWidth < 640 ? 10 : 13

    const W = mount.clientWidth, H = mount.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    mount.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const scene  = new THREE.Scene()
    scene.background = new THREE.Color(0x010209)
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 1000)
    camera.position.set(0, 0, 18)
    cameraRef.current = camera

    // Stars
    const starPos = new Float32Array(3000 * 3)
    for (let i = 0; i < 3000; i++) {
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      const r  = 300 + Math.random() * 200
      starPos[i*3]   = r * Math.sin(ph) * Math.cos(th)
      starPos[i*3+1] = r * Math.sin(ph) * Math.sin(th)
      starPos[i*3+2] = r * Math.cos(ph)
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({
      color: 0xffffff, size: 0.4, sizeAttenuation: true, transparent: true, opacity: 0.7,
    })))

    // Earth
    const loader   = new THREE.TextureLoader()
    const earthMat = new THREE.MeshPhongMaterial({
      specular: new THREE.Color(0x1a3a5c), shininess: 10,
      emissive: new THREE.Color(0x112233), emissiveIntensity: 0.3,
    })
    const earth = new THREE.Mesh(new THREE.SphereGeometry(EARTH_R, 64, 64), earthMat)
    scene.add(earth)
    earthMeshRef.current = earth
    loader.load('/textures/earth.jpg', tex => {
      tex.colorSpace = THREE.SRGBColorSpace
      earthMat.map = tex
      earthMat.needsUpdate = true
    })

    // Atmosphere glow
    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(EARTH_R * 1.08, 64, 64),
      new THREE.ShaderMaterial({
        uniforms: {
          c: { value: 0.35 }, p: { value: 5.0 },
          glowColor: { value: new THREE.Color(0x1a66ff) },
        },
        vertexShader:   `varying vec3 vNormal; void main(){vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
        fragmentShader: `uniform float c,p;uniform vec3 glowColor;varying vec3 vNormal;void main(){float i=pow(c-dot(vNormal,vec3(0,0,1)),p);gl_FragColor=vec4(glowColor,i);}`,
        side: THREE.FrontSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
      }),
    ))

    // Lighting
    scene.add(new THREE.AmbientLight(0x6080aa, 0.6))
    const sun = new THREE.DirectionalLight(0xfff8e7, 2.0)
    sun.position.set(100, 50, 80)
    scene.add(sun)

    // Tectonic plate boundaries
    fetch('/data/PB2002_boundaries.json')
      .then(r => r.json())
      .then((data: { features: Array<{ geometry: { type: string; coordinates: [number, number][] } }> }) => {
        const group   = new THREE.Group()
        const lineMat = new THREE.LineBasicMaterial({ color: 0xffd700, transparent: true, opacity: 0.4 })
        for (const feature of data.features) {
          if (feature.geometry.type !== 'LineString') continue
          const points = feature.geometry.coordinates.map(([lon, lat]) =>
            latLonToVec3(lat, lon, EARTH_R * 1.003)
          )
          const geo = new THREE.BufferGeometry().setFromPoints(points)
          group.add(new THREE.Line(geo, lineMat))
        }
        earth.add(group)
        platesRef.current = group
      })
      .catch(() => { /* plates are optional decoration */ })

    // Animate
    const pingDummy = new THREE.Object3D()
    function animate() {
      frameRef.current = requestAnimationFrame(animate)

      // Earth rotation via GMST
      const jd      = Date.now() / 86400000 + 2440587.5
      const gmstDeg = (280.46061837 + 360.98564736629 * (jd - 2451545.0)) % 360
      earth.rotation.y = -(gmstDeg * Math.PI / 180) - Math.PI / 2

      // Lerp camera distance
      if (lerpDistTarget.current !== null) {
        cameraDistRef.current += (lerpDistTarget.current - cameraDistRef.current) * 0.06
        if (Math.abs(cameraDistRef.current - lerpDistTarget.current) < 0.05) {
          cameraDistRef.current  = lerpDistTarget.current
          lerpDistTarget.current = null
        }
      }

      if (!isDragging.current) {
        const tgt = lerpTarget.current
        if (tgt) {
          let dt = tgt.theta - spherical.current.theta
          dt = (((dt + Math.PI) % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2) - Math.PI
          spherical.current.theta += dt * 0.04
          spherical.current.phi   += (tgt.phi - spherical.current.phi) * 0.04
          if (Math.abs(dt) < 0.001 && Math.abs(tgt.phi - spherical.current.phi) < 0.001) {
            spherical.current.theta = tgt.theta
            spherical.current.phi   = tgt.phi
            lerpTarget.current      = null
            if (!selLocalPos.current) userDragged.current = false
          }
        } else if (!userDragged.current) {
          spherical.current.theta += 0.00004
        }
      }

      // Update tooltip screen position
      const slp = selLocalPos.current
      const tooltipEl = tooltipRef.current
      if (slp && tooltipEl && mount) {
        const rotY2 = earth.rotation.y
        const pv = projVec.current
        pv.set(
          slp.x * Math.cos(rotY2) + slp.z * Math.sin(rotY2),
          slp.y,
          -slp.x * Math.sin(rotY2) + slp.z * Math.cos(rotY2),
        )
        pv.project(camera)
        if (pv.z < 1) {
          tooltipEl.style.left    = `${(pv.x + 1) / 2 * mount.clientWidth}px`
          tooltipEl.style.top     = `${(-pv.y + 1) / 2 * mount.clientHeight}px`
          tooltipEl.style.display = 'block'
        } else {
          tooltipEl.style.display = 'none'
        }
      }

      // Pulse recent-quake rings
      const pm = pingMeshRef.current
      const pd  = pingDataRef.current
      const pmB = pingMeshBRef.current
      if (pm && pd.length > 0) {
        const t = Date.now() * 0.0012
        pd.forEach(({ pos, baseScale }, i) => {
          // Ring A: 0→1 cycle, fades out as it expands
          const tA = (t + i * 0.7) % (Math.PI * 2)
          const progA = tA / (Math.PI * 2)
          const scaleA = baseScale * (1 + progA * 6)
          pingDummy.position.copy(pos)
          pingDummy.lookAt(0, 0, 0)
          pingDummy.scale.setScalar(scaleA)
          pingDummy.updateMatrix()
          pm.setMatrixAt(i, pingDummy.matrix)
          ;(pm.material as THREE.MeshBasicMaterial).opacity = 0.7 * (1 - progA)

          // Ring B: offset by π (half cycle behind)
          if (pmB) {
            const tB = (t + i * 0.7 + Math.PI) % (Math.PI * 2)
            const progB = tB / (Math.PI * 2)
            const scaleB = baseScale * (1 + progB * 6)
            pingDummy.scale.setScalar(scaleB)
            pingDummy.updateMatrix()
            pmB.setMatrixAt(i, pingDummy.matrix)
            ;(pmB.material as THREE.MeshBasicMaterial).opacity = 0.7 * (1 - progB)
          }
        })
        pm.instanceMatrix.needsUpdate = true
        if (pmB) pmB.instanceMatrix.needsUpdate = true
      }

      const { theta, phi } = spherical.current
      const R = cameraDistRef.current
      camera.position.set(
        R * Math.sin(phi) * Math.cos(theta),
        R * Math.cos(phi),
        R * Math.sin(phi) * Math.sin(theta),
      )
      camera.lookAt(0, 0, 0)
      renderer.render(scene, camera)
    }
    animate()

    const el = renderer.domElement

    // Scroll to zoom — clamped to [7, maxDist]; maxDist is the default view distance
    const maxDist = window.innerWidth < 640 ? 10 : 13
    function onWheel(e: WheelEvent) {
      e.preventDefault()
      dismissRef.current()
      lerpDistTarget.current = null
      cameraDistRef.current = Math.max(7, Math.min(maxDist, cameraDistRef.current + e.deltaY * 0.02))
    }
    el.addEventListener('wheel', onWheel, { passive: false })

    // Pinch-to-zoom for mobile
    let lastPinchDist = 0
    function onTouchStart(e: TouchEvent) {
      if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        lastPinchDist = Math.sqrt(dx * dx + dy * dy)
      }
    }
    function onTouchMove(e: TouchEvent) {
      if (e.touches.length === 2) {
        e.preventDefault()
        dismissRef.current()
        const dx = e.touches[0].clientX - e.touches[1].clientX
        const dy = e.touches[0].clientY - e.touches[1].clientY
        const dist = Math.sqrt(dx * dx + dy * dy)
        const delta = lastPinchDist - dist
        lerpDistTarget.current = null
        cameraDistRef.current = Math.max(7, Math.min(maxDist, cameraDistRef.current + delta * 0.04))
        lastPinchDist = dist
      }
    }
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('touchmove',  onTouchMove,  { passive: false })

    const ro = new ResizeObserver(() => {
      const w = mount.clientWidth, h = mount.clientHeight
      renderer.setSize(w, h)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    })
    ro.observe(mount)

    return () => {
      cancelAnimationFrame(frameRef.current)
      if (resumeTimer.current) clearTimeout(resumeTimer.current)
      ro.disconnect()
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('touchmove',  onTouchMove)
      // Dispose plate boundary geometries
      if (platesRef.current) {
        platesRef.current.children.forEach(child => {
          if (child instanceof THREE.Line) child.geometry.dispose()
        })
      }
      if (pingMeshRef.current) pingMeshRef.current.geometry.dispose()
      if (earthMat.map) earthMat.map.dispose()
      renderer.dispose()
      if (mount.contains(el)) mount.removeChild(el)
    }
  }, [])

  // Fetch quakes when filter changes — abort any in-flight request when filters change
  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    setError(null)

    fetch(feedUrl(timeRange, magFilter), { signal: controller.signal })
      .then(r => r.json())
      .then((data: {
        features: Array<{
          properties: { mag: number; place: string; time: number; alert: string | null; tsunami: number }
          geometry:   { coordinates: [number, number, number] }
        }>
      }) => {
        const pts: QuakeProps[] = data.features
          .filter(f => f.properties.mag != null)
          .map(f => ({
            mag:     f.properties.mag,
            place:   f.properties.place,
            time:    f.properties.time,
            depth:   f.geometry.coordinates[2],
            lat:     f.geometry.coordinates[1],
            lon:     f.geometry.coordinates[0],
            alert:   f.properties.alert,
            tsunami: f.properties.tsunami,
          }))
        quakesRef.current = pts
        setSelected(null)
        // Track and jump to most recent quake
        const recent = pts.reduce<QuakeProps | null>((b, q) => (!b || q.time > b.time ? q : b), null)
        mostRecentQuake.current = recent
        if (recent && !userDragged.current) {
          lerpTarget.current = getQuakeSpherical(recent.lat, recent.lon)
        }
        setQuakes(pts)
        setLoading(false)
      })
      .catch(err => {
        if (err.name === 'AbortError') return
        setError('Failed to fetch earthquake data.')
        setLoading(false)
      })

    return () => controller.abort()
  }, [timeRange, magFilter])

  // Rebuild instanced mesh when quakes change
  useEffect(() => {
    const earth = earthMeshRef.current
    if (!earth) return

    if (glowMeshRef.current) {
      earth.remove(glowMeshRef.current)
      glowMeshRef.current.geometry.dispose()
      glowMeshRef.current = null
    }
    if (quakeMeshRef.current) {
      earth.remove(quakeMeshRef.current)
      quakeMeshRef.current.geometry.dispose()
      quakeMeshRef.current = null
    }
    if (hitMeshRef.current) {
      earth.remove(hitMeshRef.current)
      hitMeshRef.current.geometry.dispose()
      hitMeshRef.current = null
    }
    if (pingMeshRef.current) {
      earth.remove(pingMeshRef.current)
      pingMeshRef.current.geometry.dispose()
      pingMeshRef.current = null
    }
    if (pingMeshBRef.current) {
      earth.remove(pingMeshBRef.current)
      pingMeshBRef.current.geometry.dispose()
      pingMeshBRef.current = null
    }
    pingDataRef.current = []

    if (!quakes.length) return

    const dummy = new THREE.Object3D()
    const now   = Date.now()
    const markerScale = window.innerWidth < 640 ? 1.8 : 1

    // Outer glow ring (permanent, behind core)
    const glowGeo = new THREE.RingGeometry(0.8, 1.4, 32)
    const glowMat = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, transparent: true, opacity: 0.25, depthWrite: false })
    const glowMesh = new THREE.InstancedMesh(glowGeo, glowMat, quakes.length)
    glowMesh.renderOrder = 1
    quakes.forEach((q, i) => {
      const pos = latLonToVec3(q.lat, q.lon, EARTH_R * 1.009)
      dummy.position.copy(pos)
      dummy.lookAt(0, 0, 0)
      dummy.scale.setScalar(quakeRadius(q.mag) * 0.7 * markerScale)
      dummy.updateMatrix()
      glowMesh.setMatrixAt(i, dummy.matrix)
      glowMesh.setColorAt(i, magColor(q.mag))
    })
    glowMesh.instanceMatrix.needsUpdate = true
    if (glowMesh.instanceColor) glowMesh.instanceColor.needsUpdate = true
    earth.add(glowMesh)
    glowMeshRef.current = glowMesh

    // Bright core dot
    const geo  = new THREE.CircleGeometry(1, 24)
    const mat  = new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, depthWrite: false })
    const mesh = new THREE.InstancedMesh(geo, mat, quakes.length)
    mesh.renderOrder = 2

    quakes.forEach((q, i) => {
      const pos = latLonToVec3(q.lat, q.lon, EARTH_R * 1.011)
      dummy.position.copy(pos)
      dummy.lookAt(0, 0, 0)
      dummy.scale.setScalar(quakeRadius(q.mag) * 0.45 * markerScale)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
      mesh.setColorAt(i, magColor(q.mag))
    })

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
    earth.add(mesh)
    quakeMeshRef.current = mesh

    // Invisible hit mesh — larger radius so clicks are easier to land
    const hitGeo  = new THREE.CircleGeometry(1, 8)
    const hitMat  = new THREE.MeshBasicMaterial({ visible: false, side: THREE.DoubleSide })
    const hitMesh = new THREE.InstancedMesh(hitGeo, hitMat, quakes.length)
    hitMesh.renderOrder = 3
    quakes.forEach((q, i) => {
      const pos = latLonToVec3(q.lat, q.lon, EARTH_R * 1.015)
      dummy.position.copy(pos)
      dummy.lookAt(0, 0, 0)
      dummy.scale.setScalar(Math.max(0.18, quakeRadius(q.mag) * 2) * markerScale)
      dummy.updateMatrix()
      hitMesh.setMatrixAt(i, dummy.matrix)
    })
    hitMesh.instanceMatrix.needsUpdate = true
    earth.add(hitMesh)
    hitMeshRef.current = hitMesh

    // Pulsing sonar rings for quakes in the last hour — two rings per quake, phase offset
    const recent = clusterByLocation(quakes.filter(q => (now - q.time) < 3_600_000))
    if (recent.length > 0) {
      // Two InstancedMeshes: ring A and ring B, phase offset by π
      const ringGeo = new THREE.RingGeometry(0.85, 1, 48)
      const makeRingMat = () => new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide, transparent: true, opacity: 0.7, depthWrite: false,
      })
      const ringMeshA = new THREE.InstancedMesh(ringGeo, makeRingMat(), recent.length)
      const ringMeshB = new THREE.InstancedMesh(ringGeo, makeRingMat(), recent.length)
      ringMeshA.renderOrder = 3
      ringMeshB.renderOrder = 3

      pingDataRef.current = recent.map(q => ({
        pos: latLonToVec3(q.lat, q.lon, EARTH_R * 1.012),
        baseScale: quakeRadius(q.mag) * 1.8 * markerScale,
        color: new THREE.Color(0xff2222),
      }))

      pingDataRef.current.forEach(({ pos, baseScale, color }, i) => {
        for (const rm of [ringMeshA, ringMeshB]) {
          dummy.position.copy(pos)
          dummy.lookAt(0, 0, 0)
          dummy.scale.setScalar(baseScale)
          dummy.updateMatrix()
          rm.setMatrixAt(i, dummy.matrix)
          rm.setColorAt(i, color)
        }
      })

      for (const rm of [ringMeshA, ringMeshB]) {
        rm.instanceMatrix.needsUpdate = true
        if (rm.instanceColor) rm.instanceColor.needsUpdate = true
        earth.add(rm)
      }

      pingMeshRef.current  = ringMeshA
      pingMeshBRef.current = ringMeshB
    }

    // Crown marker for the single most recent quake — white ring + larger hit area so it's always on top in clusters
    const newest = quakes.reduce<QuakeProps | null>((b, q) => (!b || q.time > b.time ? q : b), null)
    if (newest) {
      const crownGeo = new THREE.RingGeometry(0.85, 1.15, 48)
      const crownMat = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, transparent: true, opacity: 0.9, depthWrite: false })
      const crownMesh = new THREE.Mesh(crownGeo, crownMat)
      const crownPos = latLonToVec3(newest.lat, newest.lon, EARTH_R * 1.013)
      crownMesh.position.copy(crownPos)
      crownMesh.lookAt(0, 0, 0)
      crownMesh.scale.setScalar(quakeRadius(newest.mag) * 1.1)
      crownMesh.renderOrder = 5
      earth.add(crownMesh)

      // Bump the hit mesh for the most recent quake so it wins raycasts in clusters
      const newestIdx = quakes.indexOf(newest)
      if (hitMeshRef.current && newestIdx !== -1) {
        const hm = hitMeshRef.current
        const tmpObj = new THREE.Object3D()
        tmpObj.position.copy(latLonToVec3(newest.lat, newest.lon, EARTH_R * 1.02))
        tmpObj.lookAt(0, 0, 0)
        tmpObj.scale.setScalar(Math.max(0.28, quakeRadius(newest.mag) * 2.5))
        tmpObj.updateMatrix()
        hm.setMatrixAt(newestIdx, tmpObj.matrix)
        hm.instanceMatrix.needsUpdate = true
      }
    }
  }, [quakes])

  // Toggle plate visibility
  useEffect(() => {
    if (platesRef.current) platesRef.current.visible = showPlates
  }, [showPlates])

  // Resume auto-orbit 8s after user stops dragging
  const selectedRef = useRef<QuakeProps | null>(null)

  const scheduleResume = useCallback(() => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => {
      // Only revert if no tooltip is open
      if (selectedRef.current) return
      const q = mostRecentQuake.current
      lerpDistTarget.current = window.innerWidth < 640 ? 10 : 13
      if (q) lerpTarget.current = getQuakeSpherical(q.lat, q.lon)
      else   userDragged.current = false
    }, 10000)
  }, [])

  const dismiss = useCallback(() => {
    setSelected(null)
    selLocalPos.current    = null
    if (tooltipRef.current) tooltipRef.current.style.display = 'none'
    // Do not reset zoom or position — let the user stay where they are.
    // The 10s scheduleResume timer handles full revert after no interaction.
  }, [])

  // Keep dismissRef current so wheel/touch handlers inside the Three.js effect can call it
  useEffect(() => { dismissRef.current = dismiss }, [dismiss])

  // Close tooltip if user scrolls the globe out of view
  useEffect(() => {
    const el = mountRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting) dismiss() },
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [dismiss])

  // Raycast at a client position → select quake
  const raycast = useCallback((clientX: number, clientY: number) => {
    const mesh   = hitMeshRef.current
    const camera = cameraRef.current
    const mount  = mountRef.current
    if (!mesh || !camera || !mount) return

    const rect = mount.getBoundingClientRect()
    const x    = ((clientX - rect.left) / rect.width)  * 2 - 1
    const y    = -((clientY - rect.top) / rect.height) * 2 + 1

    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera)

    const hits = raycaster.intersectObject(mesh)
    if (hits.length > 0 && hits[0].instanceId !== undefined) {
      const q = quakesRef.current[hits[0].instanceId] ?? null
      setSelected(q)
      if (q) {
        selLocalPos.current    = latLonToVec3(q.lat, q.lon, EARTH_R * 1.01)
        userDragged.current    = true   // stop auto-orbit
        lerpTarget.current     = getQuakeSpherical(q.lat, q.lon)
        if (cameraDistRef.current > 8) lerpDistTarget.current = 8
      }
    } else {
      dismiss()
    }
  }, [dismiss])

  // Pointer handlers — unified mouse + touch via React pointer events + setPointerCapture
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current     = true
    userDragged.current    = true
    lerpTarget.current     = null  // cancel any in-progress camera lerp immediately
    lastMouse.current      = { x: e.clientX, y: e.clientY }
    pointerDownPos.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }, [])

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastMouse.current.x
    const dy = e.clientY - lastMouse.current.y
    lastMouse.current = { x: e.clientX, y: e.clientY }
    if (Math.abs(dx) > 1 || Math.abs(dy) > 1) dismiss()
    spherical.current.theta += dx * 0.005
    spherical.current.phi    = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.current.phi - dy * 0.005))
  }, [dismiss])

  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    isDragging.current = false
    scheduleResume()
    // If pointer barely moved, treat as a click → raycast
    const dx = e.clientX - pointerDownPos.current.x
    const dy = e.clientY - pointerDownPos.current.y
    if (Math.sqrt(dx * dx + dy * dy) < 5) raycast(e.clientX, e.clientY)
  }, [scheduleResume, raycast])

  // Derived stats
  const strongest   = quakes.reduce<QuakeProps | null>((b, q) => (!b || q.mag  > b.mag  ? q : b), null)
  const mostRecent  = quakes.reduce<QuakeProps | null>((b, q) => (!b || q.time > b.time ? q : b), null)
  const recentCount = quakes.filter(q => (Date.now() - q.time) < 3_600_000).length

  function magHex(mag: number) {
    if (mag >= 7)   return '#ff1111'
    if (mag >= 5.5) return '#ff6600'
    if (mag >= 4)   return '#b44fff'
    return '#00d4ff'
  }



  const tabBase     = 'font-mono text-[9px] tracking-widest uppercase py-1 px-3 rounded transition-colors cursor-pointer text-center flex-1'
  const tabActive   = `${tabBase} bg-accent/10 border border-accent/30 text-accent`
  const tabInactive = `${tabBase} bg-transparent border border-white/[8%] text-white/30 hover:text-white/[65%]`

  return (
    <div className="mb-5 select-none flex flex-col gap-3">

      {/* ── Controls + Stats ───────────────────────────────────── */}
      <div className="rounded-lg overflow-hidden bg-[#070c11] border border-accent/10">

        {/* Row 1: LIVE header + Tectonic plates toggle */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-accent/[7%]">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/[6%] border border-accent/[15%]">
            <span className="pulse-dot w-1.5 h-1.5 rounded-full flex-shrink-0 bg-accent" style={{ boxShadow: '0 0 6px #0AFF9D' }} />
            <span className="font-mono text-[10px] tracking-widest uppercase text-accent">Live</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] tracking-wide text-accent">Tectonic plates</span>
            <button
              onClick={() => setShowPlates(v => !v)}
              className={`font-mono text-[9px] tracking-widest uppercase px-3 py-1 rounded transition-colors cursor-pointer hover:opacity-75 border ${
                showPlates
                  ? 'bg-[rgba(255,215,0,0.08)] border-[rgba(255,215,0,0.3)] text-[#ffd700]'
                  : 'bg-transparent border-white/[8%] text-white/30'
              }`}
            >
              <span className="inline-block w-6 text-center">{showPlates ? 'On' : 'Off'}</span>
            </button>
          </div>
        </div>

        {/* Row 2: Stats */}
        {/* Mobile: Events + Latest side by side, Largest full width below */}
        {/* Desktop: all 3 in one row */}
        <div className="border-b border-accent/[7%]">
          {/* Top: Events | Latest earthquake */}
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <div className="px-4 py-3 min-w-0 overflow-hidden border-b sm:border-b-0 sm:border-r border-accent/[7%]">
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted block mb-1">Events</span>
              <div className="flex items-center gap-3 h-7">
                <span className="font-mono text-[13px] font-bold text-text-primary tabular-nums">
                  {loading ? '—' : quakes.length.toLocaleString()}
                </span>
              </div>
              <span className="font-mono text-[12px] tracking-wide block mt-0.5 text-text-secondary min-h-[1.125rem]">{recentCount > 0 ? `${recentCount} in the past hour` : ''}</span>
            </div>
            <div className="px-4 py-3 min-w-0 overflow-hidden border-b sm:border-b-0 sm:border-r border-accent/[7%]">
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted block mb-1">Latest earthquake</span>
              {loading || !mostRecent ? (
                <div className="flex items-center gap-3 h-7">
                  <span className="font-mono text-[13px] font-bold text-text-primary">—</span>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-3 h-7">
                    <span className="font-mono text-[13px] font-bold text-text-primary tabular-nums">
                      {timeAgo(mostRecent.time)}
                    </span>
                    <button
                      onClick={() => {
                        const q = mostRecent!
                        const sp = getQuakeSpherical(q.lat, q.lon)
                        lerpTarget.current     = sp
                        if (cameraDistRef.current > 8) lerpDistTarget.current = 8
                        userDragged.current    = true
                        setSelected(q)
                      }}
                      className="font-mono text-[9px] tracking-widest uppercase px-3 py-1 rounded transition-colors cursor-pointer hover:opacity-75 bg-[rgba(255,215,0,0.08)] border border-[rgba(255,215,0,0.3)] text-[#ffd700]"
                    >
                      Locate ↗
                    </button>
                  </div>
                  <span className="font-mono text-[12px] tracking-wide block mt-0.5 text-text-secondary truncate min-h-[1.125rem]">
                    {mostRecent.place}
                  </span>
                </>
              )}
              {(loading || !mostRecent) && (
                <span className="block mt-0.5 min-h-[1.125rem]" />
              )}
            </div>
            {/* Largest magnitude — hidden on mobile, shown inline on sm+ */}
            <div className="hidden sm:block px-4 py-3 min-w-0 overflow-hidden">
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted block mb-1">Largest magnitude</span>
              <div className="flex items-center gap-3 h-7">
                <span className="font-mono text-[13px] font-bold text-text-primary tabular-nums">
                  {loading || !strongest ? '—' : `M${strongest.mag.toFixed(1)}`}
                </span>
              </div>
              <span className="font-mono text-[12px] tracking-wide block mt-0.5 text-text-secondary truncate min-h-[1.125rem]">
                {strongest ? strongest.place : ''}
              </span>
            </div>
          </div>
          {/* Largest magnitude — mobile only, full width */}
          <div className="sm:hidden px-4 py-3 min-w-0 overflow-hidden border-t border-accent/[7%]">
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted block mb-1">Largest magnitude</span>
            <span className="font-mono text-[13px] font-bold text-text-primary tabular-nums block">
              {loading || !strongest ? '—' : `M${strongest.mag.toFixed(1)}`}
            </span>
            <span className="font-mono text-[12px] tracking-wide block mt-0.5 text-text-secondary truncate min-h-[1.125rem]">
              {strongest ? strongest.place : ''}
            </span>
          </div>
        </div>

        {/* Row 3: Time window | Minimum magnitude — stack on mobile, 2-col on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-accent/[7%]">
          <div className="px-4 pt-3.5 pb-3 border-b sm:border-b-0 border-accent/[7%]">
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted block mb-1.5">Time window</span>
            <div className="flex gap-1.5">
              {TIME_BTNS.map(b => (
                <button key={b.value} onClick={() => setTimeRange(b.value)} className={timeRange === b.value ? tabActive : tabInactive}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
          <div className="px-4 pt-3.5 pb-3 sm:border-l border-accent/[7%]">
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted block mb-1.5">Minimum magnitude</span>
            <div className="flex gap-1.5">
              {MAG_BTNS.map(b => (
                <button key={b.value} onClick={() => setMagFilter(b.value)} className={magFilter === b.value ? tabActive : tabInactive}>
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 4: How to explore | Marker colour key — stack on mobile, 2-col on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="px-4 pt-3.5 pb-3 border-b sm:border-b-0 border-accent/[7%]">
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted block mb-1.5">How to explore</span>
            <div className="flex flex-col gap-1">
              {[
                { key: 'Drag',           desc: 'Rotates the globe'         },
                { key: 'Scroll / Pinch', desc: 'Zoom in for a closer look' },
                { key: 'Click marker',   desc: 'Opens earthquake details'  },
              ].map(({ key, desc }) => (
                <div key={key} className="mb-1">
                  <span className="font-mono text-[12px] text-text-muted block">{key}</span>
                  <span className="font-mono text-[12px] text-text-secondary block">{desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="px-4 pt-3.5 pb-3 sm:border-l border-accent/[7%]">
            <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-text-muted block mb-1.5">Marker colour key</span>
            <div className="flex flex-col gap-1.5">
              {MAG_LEGEND.map(({ color, label, desc }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
                  <span className="font-mono text-[12px]">
                    <span style={{ color }}>{label}</span>
                    <span className="text-text-secondary"> {desc}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Globe ──────────────────────────────────────────────── */}
      <div
        ref={mountRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        role="img"
        aria-label="Interactive 3D earthquake globe. Drag to rotate, click a marker to zoom in and view details."
        className="-order-1 sm:order-none w-full h-72 sm:h-96 rounded-lg overflow-hidden relative border border-accent/10"
        style={{ cursor: isDragging.current ? 'grabbing' : 'grab', touchAction: 'none' }}
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-surface/80 z-10">
            <span className="font-mono text-[11px] animate-pulse text-accent">Fetching data…</span>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="font-mono text-[11px] text-red-400">{error}</span>
          </div>
        )}

        {/* Zoom controls — bottom right */}
        <div className="absolute bottom-3 right-3 pointer-events-auto w-8 bg-[rgba(8,13,18,0.9)] border border-accent/[18%] backdrop-blur-[10px] rounded-lg overflow-hidden">
          {[{ label: '+', delta: -1.5 }, { label: '−', delta: 1.5 }].map(({ label, delta }) => (
            <button
              key={label}
              onPointerDown={e => e.stopPropagation()}
              onClick={() => {
                lerpDistTarget.current = null
                cameraDistRef.current = Math.max(7, Math.min(window.innerWidth < 640 ? 10 : 13, cameraDistRef.current + delta))
              }}
              className={`font-mono text-base font-bold text-accent bg-transparent border-0 w-8 h-8 cursor-pointer leading-none block hover:opacity-75 transition-opacity duration-150${label === '+' ? ' border-b border-accent/[12%]' : ''}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Tooltip — positioned via DOM ref each frame */}
        <div
          ref={tooltipRef}
          className="absolute pointer-events-none z-20 min-w-[180px]"
          style={{ display: 'none', transform: 'translate(-50%, calc(-100% - 14px))' }}
        >
          {selected && (
            <div className="font-mono rounded-lg overflow-hidden min-w-[210px]" style={{
              background: 'rgba(7,12,17,0.97)',
              border: '1px solid rgba(10,255,157,0.2)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.7)',
            }}>
              {/* Stem */}
              <div className="absolute left-1/2 bottom-0 w-px h-[14px]" style={{ transform: 'translate(-50%, 100%)', background: 'rgba(10,255,157,0.35)' }} />
              {/* Row 1: icon + magnitude + dismiss */}
              <div className="flex items-center justify-between gap-2 px-3 pt-2.5">
                <div className="flex items-center gap-[7px]">
                  <Activity size={14} color={magHex(selected.mag)} strokeWidth={2.5} />
                  <span className="text-[15px] font-bold text-[#eef2f7] tracking-[0.02em]">M{selected.mag.toFixed(1)}</span>
                </div>
                <button className="pointer-events-auto text-[13px] text-white/30 bg-transparent border-0 cursor-pointer leading-none" onClick={dismiss} aria-label="Dismiss">✕</button>
              </div>
              {/* Row 2: location */}
              <div className="px-3 pt-[5px] pb-2">
                <div className="text-[12px] text-[#dde6ee] leading-[1.45]">{selected.place}</div>
              </div>
              {/* Row 3: depth + time */}
              <div className="px-3 pt-2 pb-2.5 border-t border-white/[6%] grid grid-cols-2 gap-x-3">
                <div>
                  <div className="text-[9px] text-accent uppercase tracking-[0.15em] mb-[3px]">Depth</div>
                  <div className="text-[15px] text-[#dde6ee]">{selected.depth.toFixed(0)} km</div>
                </div>
                <div>
                  <div className="text-[9px] text-accent uppercase tracking-[0.15em] mb-[3px]">Time</div>
                  <div className="text-[15px] text-[#dde6ee]">{timeAgo(selected.time)}</div>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>


    </div>
  )
}

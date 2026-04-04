import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

function noise2D(x: number, y: number): number {
  const X = Math.floor(x), Y = Math.floor(y)
  const fx = x - X, fy = y - Y
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy)
  const h = (nx: number, ny: number) => { const n = Math.sin(nx * 127.1 + ny * 311.7) * 43758.5453; return n - Math.floor(n) }
  return h(X,Y)*(1-u)*(1-v) + h(X+1,Y)*u*(1-v) + h(X,Y+1)*(1-u)*v + h(X+1,Y+1)*u*v
}
function fbm(x: number, y: number, octaves = 5): number {
  let val = 0, amp = 0.5, freq = 1, max = 0
  for (let i = 0; i < octaves; i++) { val += noise2D(x*freq,y*freq)*amp; max+=amp; amp*=0.5; freq*=2 }
  return val / max
}
function generateCloudTexture(): THREE.CanvasTexture {
  const W = 1024, H = 512, canvas = document.createElement('canvas')
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')!, img = ctx.createImageData(W, H)
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const n = fbm(x/W*5+2, y/H*5+8)
    const a = Math.round(Math.max(0, (n-0.52)/0.48) * 210)
    const i = (y*W+x)*4; img.data[i]=255; img.data[i+1]=255; img.data[i+2]=255; img.data[i+3]=a
  }
  ctx.putImageData(img, 0, 0)
  return new THREE.CanvasTexture(canvas)
}
function issLatLonToVec3(lat: number, lon: number, r: number): THREE.Vector3 {
  const phi = (90-lat)*(Math.PI/180), theta = (lon+180)*(Math.PI/180)
  return new THREE.Vector3(-r*Math.sin(phi)*Math.cos(theta), r*Math.cos(phi), r*Math.sin(phi)*Math.sin(theta))
}

interface ISSData { latitude: number; longitude: number; altitude: number; velocity: number }
interface CrewMember { name: string; craft: string }

export default function ISSTrackerDemo() {
  const mountRef        = useRef<HTMLDivElement>(null)
  const frameRef        = useRef<number>(0)
  const clockRef        = useRef(new THREE.Clock())
  const markerRef       = useRef<THREE.Mesh | null>(null)
  const ringRef         = useRef<THREE.Mesh | null>(null)
  const ringMatRef      = useRef<THREE.MeshBasicMaterial | null>(null)
  const cameraRef       = useRef<THREE.PerspectiveCamera | null>(null)
  // Drag / free-look state (desktop only)
  const userControlled  = useRef(false)
  const isDragging      = useRef(false)
  const lastMouse       = useRef({ x: 0, y: 0 })
  const spherical       = useRef({ theta: 0, phi: Math.PI / 2 })
  const [following, setFollowing] = useState(true)

  const [issData,  setIssData]  = useState<ISSData | null>(null)
  const [overText, setOverText] = useState<string>('')
  const [crew,     setCrew]     = useState<CrewMember[]>([])

  const centreOnISS = useCallback(() => {
    userControlled.current = false
    setFollowing(true)
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
    const camera = new THREE.PerspectiveCamera(45, W/H, 0.1, 1000)
    camera.position.set(0, 0, 3.4)
    cameraRef.current = camera

    const starPos = new Float32Array(6000*3)
    for (let i = 0; i < 6000; i++) {
      const th = Math.random()*Math.PI*2, ph = Math.acos(2*Math.random()-1), r = 80+Math.random()*20
      starPos[i*3]=r*Math.sin(ph)*Math.cos(th); starPos[i*3+1]=r*Math.sin(ph)*Math.sin(th); starPos[i*3+2]=r*Math.cos(ph)
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, sizeAttenuation: true })))

    const loader = new THREE.TextureLoader()
    const earthMat = new THREE.MeshPhongMaterial({ specular: new THREE.Color(0x1a3a5c), shininess: 12 })
    const earthMesh = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), earthMat)
    earthMesh.receiveShadow = false
    earthMesh.castShadow    = false
    scene.add(earthMesh)
    loader.load('/textures/earth.jpg', (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace
      earthMat.map = tex
      earthMat.needsUpdate = true
    })

    const cloudMesh = new THREE.Mesh(
      new THREE.SphereGeometry(1.012, 64, 64),
      new THREE.MeshPhongMaterial({ map: generateCloudTexture(), transparent: true, opacity: 0.5, depthWrite: false }),
    )
    scene.add(cloudMesh)

    scene.add(new THREE.Mesh(
      new THREE.SphereGeometry(1.08, 64, 64),
      new THREE.ShaderMaterial({
        uniforms: { c: { value: 0.38 }, p: { value: 5.0 }, glowColor: { value: new THREE.Color(0x1a66ff) } },
        vertexShader:   `varying vec3 vNormal; void main(){vNormal=normalize(normalMatrix*normal);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
        fragmentShader: `uniform float c,p;uniform vec3 glowColor;varying vec3 vNormal;void main(){float i=pow(c-dot(vNormal,vec3(0,0,1)),p);gl_FragColor=vec4(glowColor,i);}`,
        side: THREE.FrontSide, blending: THREE.AdditiveBlending, transparent: true, depthWrite: false,
      }),
    ))

    const sun = new THREE.DirectionalLight(0xfff8e7, 1.8)
    sun.position.set(5, 2, 3)
    sun.castShadow = false
    scene.add(sun)
    scene.add(new THREE.AmbientLight(0x0d1a2e, 0.6))

    const marker = new THREE.Mesh(
      new THREE.SphereGeometry(0.014, 12, 12),
      new THREE.MeshBasicMaterial({ color: 0x0AFF9D }),
    )
    scene.add(marker)
    markerRef.current = marker

    const ringMat = new THREE.MeshBasicMaterial({ color: 0x0AFF9D, side: THREE.DoubleSide, transparent: true, opacity: 1, depthWrite: false })
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.022, 0.03, 32), ringMat)
    scene.add(ring)
    ringRef.current = ring
    ringMatRef.current = ringMat

    function animate() {
      frameRef.current = requestAnimationFrame(animate)
      const t = clockRef.current.getElapsedTime()

      cloudMesh.rotation.y += 0.00015

      const pulse = (t % 1.8) / 1.8
      ring.scale.setScalar(1 + pulse * 1.8)
      ringMat.opacity = Math.max(0, 1 - pulse * 1.2)
      ring.position.copy(marker.position)
      ring.lookAt(camera.position)

      if (userControlled.current) {
        // Free-look: position camera from stored spherical coords
        const { theta, phi } = spherical.current
        const r = 3.4
        camera.position.set(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.cos(phi),
          r * Math.sin(phi) * Math.sin(theta),
        )
        camera.lookAt(0, 0, 0)
      } else if (marker.position.lengthSq() > 0) {
        // Follow ISS
        const target = marker.position.clone().normalize().multiplyScalar(3.4)
        camera.position.lerp(target, 0.03)
        camera.lookAt(0, 0, 0)
        // Keep spherical in sync so free-look starts from current position
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
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  const fetchISS = useCallback(async () => {
    try {
      const r = await fetch('https://api.wheretheiss.at/v1/satellites/25544')
      const d = await r.json()
      const data: ISSData = { latitude: d.latitude, longitude: d.longitude, altitude: d.altitude, velocity: d.velocity }
      setIssData(data)
      const pos = issLatLonToVec3(d.latitude, d.longitude, 1.065)
      if (markerRef.current) markerRef.current.position.copy(pos)
      try {
        const gr = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${d.latitude}&longitude=${d.longitude}&localityLanguage=en`)
        const gd = await gr.json()
        const country = gd.countryName || gd.locality || ''
        setOverText(country || (Math.abs(d.latitude) > 60 ? 'Antarctica' : 'Over Ocean'))
      } catch { setOverText('') }
    } catch { /* silent */ }
  }, [])

  useEffect(() => {
    fetchISS()
    const id = setInterval(fetchISS, 5000)
    return () => clearInterval(id)
  }, [fetchISS])

  useEffect(() => {
    fetch('https://corquaid.github.io/international-space-station-APIs/JSON/people-in-space.json')
      .then(r => r.json())
      .then(d => {
        console.log('[ISS Tracker] Crew fetch success:', d.number, 'people', d.people)
        if (d.people) setCrew(d.people.map((m: { name: string; craft?: string; spacecraft?: string }) => ({
          name: m.name,
          craft: m.craft || m.spacecraft || 'ISS',
        })))
      })
      .catch(e => console.warn('[ISS Tracker] Crew fetch failed:', e))
  }, [])

  const craftGroups = crew.reduce<Record<string,string[]>>((acc,m) => { const k = m.craft||'ISS'; ;(acc[k]??=[]).push(m.name); return acc }, {})

  const panel: React.CSSProperties = {
    background: 'rgba(8,13,18,0.9)', border: '1px solid rgba(10,255,157,0.18)',
    backdropFilter: 'blur(10px)', borderRadius: 8, padding: '9px 12px', fontFamily: 'monospace',
  }
  const lbl:  React.CSSProperties = { fontSize: 8, letterSpacing:'0.15em', textTransform:'uppercase', color:'#0AFF9D', marginBottom:6, display:'block' }
  const val:  React.CSSProperties = { fontSize: 11, color:'#dde6ee', lineHeight: 1.65 }
  const dim:  React.CSSProperties = { fontSize: 9, color:'#3d5060' }
  const hi:   React.CSSProperties = { color:'#8bb8cc' }

  void val; void hi

  const posPanel = (
    <div style={{ ...panel, flex: 1, minWidth: 0 }}>
      <span style={lbl}>ISS Position</span>
      {issData ? (
        <div>
          <div style={{ fontSize:13, color:'#dde6ee', fontFamily:'monospace', lineHeight:1.5 }}>
            {Math.abs(issData.latitude).toFixed(3)}° {issData.latitude>=0?'N':'S'}&nbsp;&nbsp;{Math.abs(issData.longitude).toFixed(3)}° {issData.longitude>=0?'E':'W'}
          </div>
          {overText && <div style={{ fontSize:10, color:'#5a8a9a', marginTop:2 }}>{overText}</div>}
          <div style={{ marginTop:8, display:'flex', flexDirection:'column', gap:3 }}>
            <div style={{ fontSize:12, color:'#8bb8cc', fontFamily:'monospace' }}>Alt &nbsp;<span style={{ color:'#dde6ee' }}>{issData.altitude.toFixed(1)} km</span></div>
            <div style={{ fontSize:12, color:'#8bb8cc', fontFamily:'monospace' }}>Speed <span style={{ color:'#dde6ee' }}>{(issData.velocity/3.6).toFixed(0)} m/s</span></div>
          </div>
        </div>
      ) : <div style={{ ...dim, fontSize:10 }}>Fetching…</div>}
    </div>
  )

  const crewPanel = (
    <div style={{ ...panel, flex: 1, minWidth: 0, maxHeight: 220, overflowY: 'auto' }}>
      <span style={lbl}>People in Space {crew.length > 0 && <span style={{ color:'#5a8a9a' }}>({crew.length})</span>}</span>
      {crew.length > 0
        ? Object.entries(craftGroups).map(([craft, names]) => (
            <div key={craft} style={{ marginBottom:6 }}>
              <div style={{ ...dim, marginBottom:2 }}>{craft}</div>
              {names.map(n => <div key={n} style={{ fontSize:10, color:'#dde6ee', lineHeight:1.65 }}>{n}</div>)}
            </div>
          ))
        : <div style={{ ...dim, fontSize:10 }}>Fetching…</div>
      }
    </div>
  )

  // Pointer handlers — desktop (mouse) only
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    isDragging.current = true
    userControlled.current = true
    setFollowing(false)
    lastMouse.current = { x: e.clientX, y: e.clientY }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return
    const dx = e.clientX - lastMouse.current.x
    const dy = e.clientY - lastMouse.current.y
    lastMouse.current = { x: e.clientX, y: e.clientY }
    spherical.current.theta -= dx * 0.005
    spherical.current.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.current.phi + dy * 0.005))
  }
  const handlePointerUp = () => { isDragging.current = false }

  return (
    <div className="mb-5">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Live demo</p>

      <div className="rounded-xl overflow-hidden" style={{ border:'1px solid rgba(10,255,157,0.12)', background:'#080d12' }}>

        <div className="relative w-full" style={{ height: 'clamp(260px, 45vw, 440px)' }}>
          <div
            ref={mountRef}
            className="absolute inset-0"
            style={{ background: '#000306', cursor: isDragging.current ? 'grabbing' : 'grab' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />

          <div className="absolute top-3 left-3 hidden sm:block" style={{ minWidth: 195 }}>{posPanel}</div>
          <div className="absolute top-3 right-3 hidden sm:block" style={{ maxWidth: 172 }}>{crewPanel}</div>

          {/* Centre on ISS button — panel style, bottom left */}
          <div className="absolute bottom-9 left-3 hidden sm:block">
            <button
              onClick={centreOnISS}
              disabled={following}
              style={{
                ...panel,
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                cursor: following ? 'default' : 'pointer',
                opacity: following ? 0.55 : 1,
                transition: 'opacity 0.2s',
                border: `1px solid ${following ? 'rgba(10,255,157,0.18)' : 'rgba(10,255,157,0.5)'}`,
              }}
            >
              <span style={{
                width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
                background: following ? '#0AFF9D' : 'transparent',
                border: following ? 'none' : '1.5px solid #0AFF9D',
                boxShadow: following ? '0 0 6px #0AFF9D88' : 'none',
                transition: 'all 0.2s',
              }} />
              <span style={{ ...lbl, marginBottom: 0, fontSize: 9 }}>
                {following ? 'Following ISS' : 'Centre on ISS'}
              </span>
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 hidden sm:flex items-center justify-end px-3 py-1.5" style={{ background:'rgba(8,13,18,0.7)', borderTop:'1px solid rgba(10,255,157,0.08)' }}>
            <span style={{ ...dim, fontSize:7 }}>Earth texture: <span style={{ color:'#3d6070' }}>Solar System Scope (CC BY 4.0)</span></span>
          </div>
        </div>

        <div className="block sm:hidden">
          <div className="px-4 py-3" style={{ borderTop:'1px solid rgba(10,255,157,0.1)' }}>
            <div style={{ ...lbl, marginBottom:6 }}>ISS Position</div>
            {issData ? (
              <div style={{ display:'flex', flexDirection:'column', gap:4 }}>
                <span style={{ fontSize:12, color:'#dde6ee', fontFamily:'monospace' }}>
                  {Math.abs(issData.latitude).toFixed(2)}° {issData.latitude>=0?'N':'S'}&nbsp;&nbsp;{Math.abs(issData.longitude).toFixed(2)}° {issData.longitude>=0?'E':'W'}
                </span>
                {overText && <span style={{ fontSize:10, color:'#5a8a9a' }}>{overText}</span>}
                <span style={{ fontSize:11, color:'#8bb8cc', fontFamily:'monospace' }}>Alt <span style={{ color:'#dde6ee' }}>{issData.altitude.toFixed(1)} km</span></span>
                <span style={{ fontSize:11, color:'#8bb8cc', fontFamily:'monospace' }}>Speed <span style={{ color:'#dde6ee' }}>{(issData.velocity/3.6).toFixed(0)} m/s</span></span>
              </div>
            ) : <span style={{ ...dim, fontSize:10 }}>Fetching…</span>}
          </div>

          <div className="px-4 py-3" style={{ borderTop:'1px solid rgba(10,255,157,0.1)' }}>
            <div style={{ ...lbl, marginBottom:6 }}>People in Space {crew.length > 0 && <span style={{ color:'#5a8a9a' }}>({crew.length})</span>}</div>
            {crew.length > 0
              ? Object.entries(craftGroups).map(([craft, names]) => (
                  <div key={craft} style={{ marginBottom:6 }}>
                    <div style={{ ...dim, marginBottom:2 }}>{craft}</div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'2px 12px' }}>
                      {names.map(n => <span key={n} style={{ fontSize:10, color:'#dde6ee', fontFamily:'monospace' }}>{n}</span>)}
                    </div>
                  </div>
                ))
              : <span style={{ ...dim, fontSize:10 }}>Fetching…</span>
            }
          </div>

          <div className="px-4 py-2 text-right" style={{ borderTop:'1px solid rgba(10,255,157,0.06)' }}>
            <span style={{ ...dim, fontSize:7 }}>Earth texture: <span style={{ color:'#3d6070' }}>Solar System Scope (CC BY 4.0)</span></span>
          </div>
        </div>

      </div>
    </div>
  )
}

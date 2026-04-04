import { useState, useEffect, useRef } from 'react'

const NOTE_FREQ: Record<string, number> = {
  C3:261.63,  Cs3:277.18, D3:293.66,  Ds3:311.13, E3:329.63,
  F3:349.23,  Fs3:369.99, G3:392.00,  Gs3:415.30, A3:440.00,
  As3:466.16, B3:493.88,  C4:523.25,  Cs4:554.37, D4:587.33,
  Ds4:622.25, E4:659.25,  F4:698.46,  Fs4:739.99, G4:783.99,
  Gs4:830.61, A4:880.00,  As4:932.33, B4:987.77,
}

const WHITE_KEYS = ['C3','D3','E3','F3','G3','A3','B3','C4','D4','E4','F4','G4','A4','B4']
const BLACK_KEYS: Record<number, string> = { 0:'Cs3',1:'Ds3',3:'Fs3',4:'Gs3',5:'As3',7:'Cs4',8:'Ds4',10:'Fs4',11:'Gs4',12:'As4' }
const KB_MAP: Record<string, string> = {
  z:'C3',s:'Cs3',x:'D3',d:'Ds3',c:'E3',v:'F3',g:'Fs3',b:'G3',h:'Gs3',n:'A3',j:'As3',m:'B3',
  q:'C4','2':'Cs4',w:'D4','3':'Ds4',e:'E4',r:'F4','5':'Fs4',t:'G4','6':'Gs4',y:'A4','7':'As4',u:'B4',
}

// Suppress unused variable warning — BLACK_KEYS kept for parity with original
void BLACK_KEYS

function makeReverb(ctx: AudioContext, duration: number, decay: number): AudioBuffer {
  const len = ctx.sampleRate * duration
  const buf = ctx.createBuffer(2, len, ctx.sampleRate)
  for (let ch = 0; ch < 2; ch++) {
    const d = buf.getChannelData(ch)
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay)
  }
  return buf
}

function makeDistortionCurve(amount: number): Float32Array {
  const n = 256, curve = new Float32Array(n)
  for (let i = 0; i < n; i++) {
    const x = (i * 2) / n - 1
    curve[i] = amount === 0 ? x : ((Math.PI + amount) * x) / (Math.PI + amount * Math.abs(x))
  }
  return curve
}

interface ActiveNote { osc: OscillatorNode; lfoGain: GainNode; env: GainNode }

const SYNTH_DEFAULTS = {
  wave: 'sawtooth' as OscillatorType,
  attack: 0.01, decay: 0.2, sustain: 0.6, release: 0.4,
  cutoff: 2000, res: 1, dist: 0, revMix: 0.2,
  lfoRate: 4, lfoDepth: 0, vol: 0.6,
}

export default function SynthDemo() {
  const ctxRef      = useRef<AudioContext | null>(null)
  const masterRef   = useRef<GainNode | null>(null)
  const filterRef   = useRef<BiquadFilterNode | null>(null)
  const distRef     = useRef<WaveShaperNode | null>(null)
  const reverbRef   = useRef<ConvolverNode | null>(null)
  const reverbGain  = useRef<GainNode | null>(null)
  const dryGain     = useRef<GainNode | null>(null)
  const lfoRef      = useRef<OscillatorNode | null>(null)
  const activeNotes = useRef<Map<string, ActiveNote>>(new Map())

  const [wave,     setWave]     = useState<OscillatorType>(SYNTH_DEFAULTS.wave)
  const [attack,   setAttack]   = useState(SYNTH_DEFAULTS.attack)
  const [decay,    setDecay]    = useState(SYNTH_DEFAULTS.decay)
  const [sustain,  setSustain]  = useState(SYNTH_DEFAULTS.sustain)
  const [release,  setRelease]  = useState(SYNTH_DEFAULTS.release)
  const [cutoff,   setCutoff]   = useState(SYNTH_DEFAULTS.cutoff)
  const [res,      setRes]      = useState(SYNTH_DEFAULTS.res)
  const [dist,     setDist]     = useState(SYNTH_DEFAULTS.dist)
  const [revMix,   setRevMix]   = useState(SYNTH_DEFAULTS.revMix)
  const [lfoRate,  setLfoRate]  = useState(SYNTH_DEFAULTS.lfoRate)
  const [lfoDepth, setLfoDepth] = useState(SYNTH_DEFAULTS.lfoDepth)
  const [vol,      setVol]      = useState(SYNTH_DEFAULTS.vol)
  const [held,     setHeld]     = useState<Set<string>>(new Set())

  function resetSynth() {
    setWave(SYNTH_DEFAULTS.wave); setAttack(SYNTH_DEFAULTS.attack); setDecay(SYNTH_DEFAULTS.decay)
    setSustain(SYNTH_DEFAULTS.sustain); setRelease(SYNTH_DEFAULTS.release)
    setCutoff(SYNTH_DEFAULTS.cutoff); setRes(SYNTH_DEFAULTS.res)
    setDist(SYNTH_DEFAULTS.dist); setRevMix(SYNTH_DEFAULTS.revMix)
    setLfoRate(SYNTH_DEFAULTS.lfoRate); setLfoDepth(SYNTH_DEFAULTS.lfoDepth)
    setVol(SYNTH_DEFAULTS.vol)
  }

  function ensureCtx() {
    if (ctxRef.current) return ctxRef.current
    const ctx  = new AudioContext()
    const mast = ctx.createGain(); mast.gain.value = vol
    const filt = ctx.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.value = cutoff; filt.Q.value = res
    const dist_ = ctx.createWaveShaper(); dist_.curve = makeDistortionCurve(dist * 400); dist_.oversample = '4x'
    const rev  = ctx.createConvolver(); rev.buffer = makeReverb(ctx, 2, 4)
    const rGain = ctx.createGain(); rGain.gain.value = revMix
    const dGain = ctx.createGain(); dGain.gain.value = 1 - revMix
    const lfo  = ctx.createOscillator(); lfo.frequency.value = lfoRate; lfo.start()

    filt.connect(dist_)
    dist_.connect(dGain); dGain.connect(mast)
    dist_.connect(rev);   rev.connect(rGain); rGain.connect(mast)
    mast.connect(ctx.destination)

    ctxRef.current = ctx; masterRef.current = mast; filterRef.current = filt
    distRef.current = dist_; reverbRef.current = rev; reverbGain.current = rGain
    dryGain.current = dGain; lfoRef.current = lfo
    return ctx
  }

  function noteOn(note: string) {
    if (activeNotes.current.has(note)) return
    const ctx = ensureCtx()
    const now = ctx.currentTime
    const osc = ctx.createOscillator(); osc.type = wave; osc.frequency.value = NOTE_FREQ[note]
    const lfoGain = ctx.createGain(); lfoGain.gain.value = lfoDepth
    lfoRef.current?.connect(lfoGain); lfoGain.connect(osc.frequency)
    const env = ctx.createGain(); env.gain.setValueAtTime(0, now)
    env.gain.linearRampToValueAtTime(1, now + attack)
    env.gain.linearRampToValueAtTime(sustain, now + attack + decay)
    osc.connect(env); env.connect(filterRef.current!)
    osc.start(now)
    activeNotes.current.set(note, { osc, lfoGain, env })
    setHeld(prev => new Set(prev).add(note))
  }

  function noteOff(note: string) {
    const n = activeNotes.current.get(note)
    if (!n) return
    const ctx = ctxRef.current!; const now = ctx.currentTime
    n.env.gain.cancelScheduledValues(now)
    n.env.gain.setValueAtTime(n.env.gain.value, now)
    n.env.gain.linearRampToValueAtTime(0, now + release)
    n.osc.stop(now + release)
    activeNotes.current.delete(note)
    setHeld(prev => { const s = new Set(prev); s.delete(note); return s })
  }

  useEffect(() => {
    const down = (e: KeyboardEvent) => { if (e.repeat) return; const n = KB_MAP[e.key.toLowerCase()]; if (n) noteOn(n) }
    const up   = (e: KeyboardEvent) => { const n = KB_MAP[e.key.toLowerCase()]; if (n) noteOff(n) }
    window.addEventListener('keydown', down); window.addEventListener('keyup', up)
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up) }
  }, [wave, attack, decay, sustain, release, lfoRate, lfoDepth])

  useEffect(() => { if (masterRef.current) masterRef.current.gain.value = vol }, [vol])
  useEffect(() => { if (filterRef.current) { filterRef.current.frequency.value = cutoff; filterRef.current.Q.value = res } }, [cutoff, res])
  useEffect(() => { if (distRef.current) distRef.current.curve = makeDistortionCurve(dist * 400) }, [dist])
  useEffect(() => { if (reverbGain.current && dryGain.current) { reverbGain.current.gain.value = revMix; dryGain.current.gain.value = 1 - revMix } }, [revMix])
  useEffect(() => { if (lfoRef.current) lfoRef.current.frequency.value = lfoRate }, [lfoRate])
  useEffect(() => () => { ctxRef.current?.close() }, [])

  const knob = (label: string, value: number, min: number, max: number, step: number, setter: (v: number) => void, fmt?: (v: number) => string) => {
    const pct = ((value - min) / (max - min)) * 100
    return (
      <div className="flex flex-col items-center gap-1">
        <span className="font-mono text-[8px] tracking-widest uppercase" style={{ color: '#3d4a4f' }}>{label}</span>
        <div className="relative w-10 h-10 flex items-center justify-center">
          <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-220deg)' }}>
            <circle cx="20" cy="20" r="14" fill="none" stroke="#1f2427" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={`${0.72 * 2 * Math.PI * 14} ${2 * Math.PI * 14}`} />
            <circle cx="20" cy="20" r="14" fill="none" stroke="#0AFF9D" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={`${(pct / 100) * 0.72 * 2 * Math.PI * 14} ${2 * Math.PI * 14}`} />
          </svg>
          <div className="absolute inset-[10px] rounded-full" style={{ background: '#111416', border: '1px solid #3d4a4f' }} />
          <div className="absolute w-1 h-1 rounded-full" style={{
            background: '#0AFF9D',
            top: '50%', left: '50%',
            transform: `rotate(${-135 + pct * 2.7}deg) translateY(-10px) translate(-50%, -50%)`,
            transformOrigin: '0 0',
          }} />
          <input
            type="range" min={min} max={max} step={step} value={value}
            onChange={e => setter(parseFloat(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            aria-label={label}
          />
        </div>
        <span className="font-mono text-[8px] tabular-nums" style={{ color: '#0AFF9D' }}>{fmt ? fmt(value) : value}</span>
      </div>
    )
  }

  const WAVE_LABELS: [OscillatorType, string][] = [['sawtooth','SAW'],['square','SQR'],['sine','SIN'],['triangle','TRI']]

  return (
    <div className="mb-5 select-none">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Live demo</p>

      <div className="rounded-xl overflow-hidden" style={{ background: '#0d0f11', border: '1px solid #1f2427' }}>

        <div className="px-4 py-2.5 flex items-center justify-between" style={{ background: '#111316', borderBottom: '1px solid #1f2427' }}>
          <div className="flex items-baseline gap-2">
            <span className="font-mono font-bold text-[13px] tracking-[0.15em] uppercase" style={{ color: '#0AFF9D' }}>PRISM</span>
            <span className="font-mono text-[8px] tracking-widest uppercase" style={{ color: '#1e3a50' }}>Polyphonic Synthesizer</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={resetSynth}
              className="font-mono text-[8px] tracking-widest uppercase px-2.5 py-1 rounded transition-colors duration-150"
              style={{ color: '#4d5c63', border: '1px solid #1f2427', background: 'transparent' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.color='#0AFF9D'; el.style.borderColor='#0AFF9D' }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.color='#4d5c63'; el.style.borderColor='#1f2427' }}
            >Reset</button>
            <div
              title="Power"
              className="flex items-center justify-center rounded-full"
              style={{
                width: 22, height: 22,
                background: '#1a0000',
                border: '1px solid #ff220055',
                boxShadow: '0 0 8px #ff220055, 0 0 18px #ff220033',
                color: '#ff3300',
                fontSize: 11,
                lineHeight: 1,
              }}
            >⏻</div>
          </div>
        </div>

        <div className="px-4 py-3 flex items-center gap-3" style={{ borderBottom: '1px solid #1f2427', background: '#0d0f11' }}>
          <span className="font-mono text-[8px] tracking-widest uppercase" style={{ color: '#3d4a4f' }}>OSC</span>
          <div className="flex rounded-md overflow-hidden" style={{ border: '1px solid #1f2427' }}>
            {WAVE_LABELS.map(([w, label]) => (
              <button key={w} onClick={() => setWave(w)}
                className="font-mono text-[8px] tracking-wider uppercase px-3 py-1.5 transition-all duration-100"
                style={{
                  background: wave === w ? '#002d1f' : 'transparent',
                  color: wave === w ? '#0AFF9D' : '#3d4a4f',
                  borderRight: '1px solid #1f2427',
                }}>
                {label}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2" style={{ minWidth: 120 }}>
            <span className="font-mono text-[8px] uppercase" style={{ color: '#3d4a4f' }}>VOL</span>
            <input type="range" min={0} max={1} step={0.01} value={vol}
              onChange={e => setVol(parseFloat(e.target.value))}
              className="flex-1 cursor-pointer" style={{ accentColor: '#0AFF9D' }} aria-label="Volume" />
            <span className="font-mono text-[8px] tabular-nums w-7 text-right" style={{ color: '#0AFF9D' }}>{Math.round(vol * 100)}%</span>
          </div>
        </div>

        <div className="hidden sm:flex" style={{ borderBottom: '1px solid #1f2427' }}>
          <div className="flex-1 px-3 py-3 flex flex-col gap-2" style={{ borderRight: '1px solid #1f2427' }}>
            <span className="font-mono text-[8px] tracking-widest uppercase text-center" style={{ color: '#3d4a4f' }}>Envelope</span>
            <div className="flex justify-around">
              {knob('ATK', attack, 0.001, 2, 0.001, setAttack, v => `${v.toFixed(2)}s`)}
              {knob('DEC', decay, 0.01, 2, 0.01, setDecay, v => `${v.toFixed(2)}s`)}
              {knob('SUS', sustain, 0, 1, 0.01, setSustain, v => v.toFixed(2))}
              {knob('REL', release, 0.01, 3, 0.01, setRelease, v => `${v.toFixed(2)}s`)}
            </div>
          </div>
          <div className="flex-none px-3 py-3 flex flex-col gap-2" style={{ borderRight: '1px solid #1f2427' }}>
            <span className="font-mono text-[8px] tracking-widest uppercase text-center" style={{ color: '#3d4a4f' }}>Filter</span>
            <div className="flex justify-around gap-2">
              {knob('FREQ', cutoff, 80, 18000, 10, setCutoff, v => v >= 1000 ? `${(v/1000).toFixed(1)}k` : `${Math.round(v)}`)}
              {knob('RES', res, 0.01, 20, 0.1, setRes, v => v.toFixed(1))}
            </div>
          </div>
          <div className="flex-none px-3 py-3 flex flex-col gap-2" style={{ borderRight: '1px solid #1f2427' }}>
            <span className="font-mono text-[8px] tracking-widest uppercase text-center" style={{ color: '#3d4a4f' }}>FX</span>
            <div className="flex justify-around gap-2">
              {knob('DIST', dist, 0, 1, 0.01, setDist, v => v.toFixed(2))}
              {knob('REVB', revMix, 0, 1, 0.01, setRevMix, v => v.toFixed(2))}
            </div>
          </div>
          <div className="flex-none px-3 py-3 flex flex-col gap-2">
            <span className="font-mono text-[8px] tracking-widest uppercase text-center" style={{ color: '#3d4a4f' }}>LFO</span>
            <div className="flex justify-around gap-2">
              {knob('RATE', lfoRate, 0.1, 20, 0.1, setLfoRate, v => `${v.toFixed(1)}hz`)}
              {knob('DPTH', lfoDepth, 0, 30, 0.5, setLfoDepth, v => v.toFixed(1))}
            </div>
          </div>
        </div>

        <div className="px-4 py-3" style={{ background: '#0a0c0e' }}>
          {(['sm', 'full'] as const).map(variant => {
            const whiteKeys = variant === 'sm'
              ? ['C4','D4','E4','F4','G4','A4','B4']
              : WHITE_KEYS
            const wCount = whiteKeys.length
            const wPct   = 100 / wCount
            const bW     = wPct * 0.6
            const allBlack: { note: string; leftPct: number }[] = variant === 'sm'
              ? [
                  { note: 'Cs4', leftPct: 1*wPct - bW/2 },
                  { note: 'Ds4', leftPct: 2*wPct - bW/2 },
                  { note: 'Fs4', leftPct: 4*wPct - bW/2 },
                  { note: 'Gs4', leftPct: 5*wPct - bW/2 },
                  { note: 'As4', leftPct: 6*wPct - bW/2 },
                ]
              : [
                  { note: 'Cs3', leftPct: 1*wPct - bW/2 },
                  { note: 'Ds3', leftPct: 2*wPct - bW/2 },
                  { note: 'Fs3', leftPct: 4*wPct - bW/2 },
                  { note: 'Gs3', leftPct: 5*wPct - bW/2 },
                  { note: 'As3', leftPct: 6*wPct - bW/2 },
                  { note: 'Cs4', leftPct: 8*wPct - bW/2 },
                  { note: 'Ds4', leftPct: 9*wPct - bW/2 },
                  { note: 'Fs4', leftPct: 11*wPct - bW/2 },
                  { note: 'Gs4', leftPct: 12*wPct - bW/2 },
                  { note: 'As4', leftPct: 13*wPct - bW/2 },
                ]
            return (
              <div key={variant} className={variant === 'sm' ? 'block sm:hidden' : 'hidden sm:block'}>
                <div className="relative w-full" style={{ height: 90 }}>
                  {whiteKeys.map((note, i) => (
                    <div key={note}
                      onMouseDown={() => noteOn(note)} onMouseUp={() => noteOff(note)} onMouseLeave={() => noteOff(note)}
                      onTouchStart={e => { e.preventDefault(); noteOn(note) }} onTouchEnd={() => noteOff(note)}
                      className="absolute top-0 bottom-0 cursor-pointer rounded-b"
                      style={{
                        left: `calc(${i * wPct}% + 1px)`,
                        width: `calc(${wPct}% - 2px)`,
                        background: held.has(note) ? '#003d2b' : '#dde3ee',
                        border: '1px solid #8896aa',
                        borderTop: 'none',
                        boxShadow: held.has(note) ? `inset 0 -2px 0 #0AFF9D44, 0 0 8px #0AFF9D33` : 'inset 0 -4px 0 #b0bac8',
                        transition: 'background 40ms',
                      }}
                    />
                  ))}
                  {allBlack.map(({ note, leftPct }) => (
                    <div key={note}
                      onMouseDown={e => { e.stopPropagation(); noteOn(note) }}
                      onMouseUp={e => { e.stopPropagation(); noteOff(note) }}
                      onMouseLeave={() => noteOff(note)}
                      onTouchStart={e => { e.preventDefault(); e.stopPropagation(); noteOn(note) }}
                      onTouchEnd={e => { e.stopPropagation(); noteOff(note) }}
                      className="absolute top-0 z-10 cursor-pointer rounded-b"
                      style={{
                        left: `${leftPct}%`,
                        width: `${bW}%`,
                        height: '60%',
                        background: held.has(note) ? '#003d2b' : '#10181f',
                        border: '1px solid #000',
                        borderTop: 'none',
                        boxShadow: held.has(note) ? `0 0 8px #0AFF9D44` : '0 4px 0 #000',
                        transition: 'background 40ms',
                      }}
                    />
                  ))}
                </div>
              </div>
            )
          })}
          <p className="font-mono text-[7px] text-center mt-2.5 tracking-widest" style={{ color: '#1f2427' }}>
            Z – M &nbsp;·&nbsp; Q – U &nbsp;·&nbsp; keyboard playable
          </p>
        </div>

      </div>
    </div>
  )
}

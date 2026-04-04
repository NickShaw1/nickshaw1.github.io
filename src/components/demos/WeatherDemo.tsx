import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CITIES = [
  { name: 'Belfast',  lat: 54.60,  lon: -5.93,  tz: 'Europe/London',    tzLabel: 'GMT'  },
  { name: 'London',   lat: 51.51,  lon: -0.13,  tz: 'Europe/London',    tzLabel: 'GMT'  },
  { name: 'Paris',    lat: 48.85,  lon: 2.35,   tz: 'Europe/Paris',     tzLabel: 'CET'  },
  { name: 'New York', lat: 40.71,  lon: -74.01, tz: 'America/New_York', tzLabel: 'ET'   },
  { name: 'Tokyo',    lat: 35.68,  lon: 139.69, tz: 'Asia/Tokyo',       tzLabel: 'JST'  },
]

function weatherLabel(code: number): string {
  if (code === 0)                    return 'Clear sky'
  if (code <= 3)                     return 'Partly cloudy'
  if (code <= 48)                    return 'Foggy'
  if (code <= 57)                    return 'Drizzle'
  if (code <= 67)                    return 'Rain'
  if (code <= 77)                    return 'Snow'
  if (code <= 82)                    return 'Rain showers'
  if (code <= 86)                    return 'Snow showers'
  if (code === 95)                   return 'Thunderstorm'
  return 'Thunderstorm'
}

function WeatherIcon({ code, size = 32, className = '' }: { code: number; size?: number; className?: string }) {
  const s = size
  if (code === 0) return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" className={`text-yellow-400 ${className}`}>
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  )
  if (code <= 3) return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="currentColor" className={`text-text-secondary ${className}`}>
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/>
    </svg>
  )
  if (code <= 67 || (code >= 80 && code <= 82)) return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={`text-blue-400 ${className}`}>
      <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
      <line x1="8" y1="19" x2="8" y2="21"/><line x1="8" y1="13" x2="8" y2="15"/>
      <line x1="12" y1="21" x2="12" y2="23"/><line x1="12" y1="15" x2="12" y2="17"/>
      <line x1="16" y1="19" x2="16" y2="21"/>
    </svg>
  )
  if (code <= 77 || (code >= 85 && code <= 86)) return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={`text-blue-200 ${className}`}>
      <path d="M20 17.58A5 5 0 0 0 18 8h-1.26A8 8 0 1 0 4 16.25"/>
      <line x1="8" y1="19" x2="10" y2="21"/><line x1="8" y1="13" x2="10" y2="15"/>
      <line x1="12" y1="21" x2="14" y2="23"/><line x1="12" y1="15" x2="14" y2="17"/>
    </svg>
  )
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className={`text-yellow-300 ${className}`}>
      <path d="M19 16.9A5 5 0 0 0 18 7h-1.26a8 8 0 1 0-11.62 9"/>
      <polyline points="13 11 9 17 15 17 11 23"/>
    </svg>
  )
}

interface WeatherData {
  temp: number
  code: number
  wind: number
  humidity: number
  hourly: { time: string; temp: number; code: number }[]
}

function weatherGradient(code: number): string {
  if (code === 0)  return 'from-[#0a1f4a] to-[#0d4a8a]'
  if (code <= 3)   return 'from-[#161f30] to-[#2a3f5a]'
  if (code <= 48)  return 'from-[#181818] to-[#383840]'
  if (code <= 67)  return 'from-[#080f1a] to-[#0a2545]'
  if (code <= 77)  return 'from-[#141f30] to-[#1e4870]'
  if (code <= 82)  return 'from-[#0a1e25] to-[#0f4055]'
  return 'from-[#100820] to-[#2a0850]'
}

export default function WeatherDemo() {
  const [cityIdx,  setCityIdx]  = useState(0)
  const [weather,  setWeather]  = useState<WeatherData | null>(null)
  const [status,   setStatus]   = useState<'idle' | 'loading' | 'error'>('idle')
  const [localTime, setLocalTime] = useState('')
  const cache = useRef<Record<number, WeatherData>>({})

  useEffect(() => {
    function tick() {
      const tz = CITIES[cityIdx].tz
      setLocalTime(new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: tz }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [cityIdx])

  useEffect(() => {
    async function load() {
      if (cache.current[cityIdx]) { setWeather(cache.current[cityIdx]); setStatus('idle'); return }
      setStatus('loading')
      const city = CITIES[cityIdx]
      try {
        const res  = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${city.lat}&longitude=${city.lon}&current=temperature_2m,weather_code,wind_speed_10m,relative_humidity_2m&hourly=temperature_2m,weather_code&forecast_hours=24&timezone=${encodeURIComponent(city.tz)}`
        )
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        const w: WeatherData = {
          temp:     Math.round(data.current.temperature_2m),
          code:     data.current.weather_code,
          wind:     Math.round(data.current.wind_speed_10m),
          humidity: data.current.relative_humidity_2m,
          hourly:   data.hourly.time.map((t: string, i: number) => ({
            time: t,
            temp: Math.round(data.hourly.temperature_2m[i]),
            code: data.hourly.weather_code[i],
          })).filter((_: unknown, i: number) => i % 3 === 0).slice(0, 8),
        }
        cache.current[cityIdx] = w
        setWeather(w)
        setStatus('idle')
      } catch (err) {
        console.error('Weather fetch error:', err)
        setStatus('error')
      }
    }
    load()
  }, [cityIdx])

  function toF(c: number) { return Math.round(c * 9/5 + 32) }
  function fmtHour(iso: string) {
    return new Date(iso).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: false })
  }

  return (
    <div className="mb-5">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Live demo</p>

      <div className="flex gap-1 flex-wrap mb-4">
        {CITIES.map((c, i) => (
          <button
            key={c.name}
            onClick={() => setCityIdx(i)}
            className={`font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-pill border transition-colors duration-150
              ${cityIdx === i
                ? 'border-accent text-accent bg-accent/10'
                : 'border-bg-border text-text-muted hover:text-text-secondary hover:border-text-muted/30'}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="rounded-card border border-bg-border overflow-hidden">
        <div className={`relative bg-gradient-to-br ${weather ? weatherGradient(weather.code) : 'from-[#1e2d40] to-[#3a5068]'} px-6 pt-6 pb-5 transition-all duration-700`}>
          <div className="absolute right-5 top-5 opacity-30">
            <WeatherIcon code={weather?.code ?? 0} size={90} />
          </div>

          {status === 'loading' && (
            <p className="font-mono text-[11px] text-white/60 py-8">Fetching weather…</p>
          )}
          {status === 'error' && (
            <p className="font-mono text-[11px] text-red-300 py-8">Could not fetch weather. Please try again.</p>
          )}

          {weather && status !== 'loading' && (
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={cityIdx}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                <p className="font-mono text-[10px] tracking-widest uppercase text-white/50 mb-1">
                  {CITIES[cityIdx].name}
                </p>
                <p className="font-mono text-[11px] text-white/40 tabular-nums mb-3">
                  {localTime} <span className="text-white/25">{CITIES[cityIdx].tzLabel}</span>
                </p>

                <div className="flex items-end gap-2 mb-1">
                  <span className="font-display font-bold text-[4.5rem] text-white leading-none tabular-nums">
                    {weather.temp}°
                  </span>
                  <div className="mb-3">
                    <span className="font-display font-bold text-[1.5rem] text-white/80 leading-none">C</span>
                    <span className="font-mono text-[0.85rem] text-white/40 ml-2">/ {toF(weather.temp)}°F</span>
                  </div>
                </div>

                <p className="font-mono text-[13px] text-white/70 mb-5">{weatherLabel(weather.code)}</p>

                <div className="flex gap-5">
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5 text-white/50">
                      <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/>
                      <path d="M12.6 19.4A2 2 0 1 0 14 16H2"/>
                    </svg>
                    <span className="font-mono text-[11px] text-white/60">{weather.wind} km/h</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-3.5 h-3.5 text-white/50">
                      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
                    </svg>
                    <span className="font-mono text-[11px] text-white/60">{weather.humidity}%</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {weather && status !== 'loading' && (
          <div className="bg-bg-surface border-t border-bg-border px-4 py-4">
            <p className="font-mono text-[9px] tracking-widest uppercase text-text-muted mb-3">24hr forecast</p>
            <div className="grid grid-cols-8 gap-1">
              {weather.hourly.map((h) => (
                <div key={h.time} className="flex flex-col items-center gap-1.5">
                  <span className="font-mono text-[9px] text-text-muted">{fmtHour(h.time)}</span>
                  <WeatherIcon code={h.code} size={14} />
                  <span className="font-mono text-[10px] text-text-primary font-medium">{h.temp}°</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

import { useState, useEffect, useRef } from 'react'

const COMMON_CURRENCIES = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'SEK', 'NZD', 'MXN', 'SGD', 'NOK', 'DKK', 'PLN']

export default function CurrencyConverterDemo() {
  const [amount, setAmount] = useState('1')
  const [from,   setFrom]   = useState('GBP')
  const [to,     setTo]     = useState('USD')
  const [result, setResult] = useState<number | null>(null)
  const [rate,   setRate]   = useState<number | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  async function fetchRate(fromCcy: string, toCcy: string, amt: string) {
    if (!amt || isNaN(Number(amt)) || Number(amt) <= 0) { setResult(null); return }
    setStatus('loading')
    try {
      const res  = await fetch(`https://api.frankfurter.dev/v2/rates?base=${fromCcy}&quotes=${toCcy}`)
      const data = await res.json()
      if (!Array.isArray(data) || !data.length) throw new Error('Unexpected response')
      const r    = data[0].rate
      setRate(r)
      setResult(parseFloat(amt) * r)
      setStatus('idle')
    } catch (err) {
      console.error('Currency fetch error:', err)
      setStatus('error')
    }
  }

  // Debounced live conversion on any input change
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => fetchRate(from, to, amount), 400)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [amount, from, to])

  function swap() {
    setFrom(to)
    setTo(from)
  }

  const fieldClass = "w-full bg-bg-elevated border border-bg-border rounded px-4 py-3 font-mono text-[15px] text-text-primary placeholder:text-text-muted focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-150 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
  const selectClass = "demo-select w-full bg-bg-elevated border border-bg-border rounded px-4 py-3 font-mono text-[13px] text-text-primary focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors duration-150 cursor-pointer"
  const labelClass = "font-mono text-[10px] tracking-widest uppercase text-text-muted"

  return (
    <div className="mb-5">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Live demo</p>
      <div className="bg-bg-surface border border-bg-border rounded-card p-5 space-y-5">

        <div>
          <p className={`${labelClass} mb-1`}>Amount</p>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            value={amount}
            onChange={e => { if (e.target.value.replace('.', '').length <= 10) setAmount(e.target.value) }}
            className={fieldClass}
            placeholder="0"
          />
        </div>

        <div className="flex items-end gap-3">
          <div className="flex-1">
            <p className={`${labelClass} mb-1`}>From</p>
            <select value={from} onChange={e => setFrom(e.target.value)} className={selectClass}>
              {COMMON_CURRENCIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>

          <button
            onClick={swap}
            aria-label="Swap currencies"
            className="flex-shrink-0 mb-2 w-8 h-8 rounded-full border border-bg-border text-text-muted hover:border-accent hover:text-accent transition-colors duration-150 flex items-center justify-center"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
              <path d="M7 16V4m0 0L3 8m4-4l4 4M17 8v12m0 0l4-4m-4 4l-4-4"/>
            </svg>
          </button>

          <div className="flex-1">
            <p className={`${labelClass} mb-1`}>To</p>
            <select value={to} onChange={e => setTo(e.target.value)} className={selectClass}>
              {COMMON_CURRENCIES.filter(c => c !== from).map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        <div className="pt-4 border-t border-bg-border min-h-[56px]">
          {status === 'loading' && (
            <p className="font-mono text-[11px] text-text-muted">Fetching…</p>
          )}
          {status === 'error' && (
            <p className="font-mono text-[11px] text-red-400">Could not fetch rate. Please try again.</p>
          )}
          {status === 'idle' && result !== null && rate !== null && (
            <>
              <p className="font-display font-bold text-[clamp(1rem,5vw,1.8rem)] text-text-primary tabular-nums leading-none break-all">
                {result.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                <span className="ml-2 font-mono text-[1rem] font-normal text-accent">{to}</span>
              </p>
              <p className="font-mono text-[11px] text-text-muted mt-2">
                1 {from} = {rate.toFixed(4)} {to}
              </p>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

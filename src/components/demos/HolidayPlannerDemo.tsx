import { useState } from 'react'

const CURRENCIES = [
  { code: 'GBP', symbol: '£' },
  { code: 'EUR', symbol: '€' },
  { code: 'USD', symbol: '$' },
  { code: 'JPY', symbol: '¥' },
  { code: 'AUD', symbol: 'A$' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'CHF', symbol: 'Fr' },
]

export default function HolidayPlannerDemo() {
  const [destination, setDestination] = useState('')
  const [startDate,   setStartDate]   = useState('')
  const [endDate,     setEndDate]     = useState('')
  const [currency,    setCurrency]    = useState('GBP')
  const [items, setItems] = useState<{ label: string; cost: string }[]>([
    { label: '', cost: '' },
  ])

  const labelClass  = 'font-mono text-[11px] tracking-widest uppercase text-text-secondary mb-1'
  const inputClass  = 'w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-text-primary text-[13px] font-mono placeholder:text-text-muted/40 focus:outline-none focus:border-accent/40 transition-colors duration-150 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
  const dateClass   = 'w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-text-primary text-[13px] font-mono text-left focus:outline-none focus:border-accent/40 transition-colors duration-150 cursor-pointer'
  const selectClass = 'demo-select w-full bg-bg-base border border-bg-border rounded px-3 py-2 text-text-primary text-[13px] font-mono focus:outline-none focus:border-accent/40 cursor-pointer transition-colors duration-150'

  const symbol = CURRENCIES.find(c => c.code === currency)?.symbol ?? '£'

  const maxEnd = startDate
    ? (() => {
        const d = new Date(startDate)
        d.setMonth(d.getMonth() + 1)
        return d.toISOString().split('T')[0]
      })()
    : ''

  function addItem() {
    if (items.length >= 10) return
    setItems(prev => [...prev, { label: '', cost: '' }])
  }

  function removeItem(i: number) {
    setItems(prev => prev.filter((_, idx) => idx !== i))
  }

  function updateItem(i: number, field: 'label' | 'cost', value: string) {
    if (field === 'cost') {
      if (value === '' || value === '.') {
        setItems(prev => prev.map((item, idx) => idx === i ? { ...item, cost: value } : item))
        return
      }
      const n = parseFloat(value)
      if (isNaN(n) || n < 0 || n > 10000) return
      setItems(prev => prev.map((item, idx) => idx === i ? { ...item, cost: String(n) } : item))
      return
    }
    setItems(prev => prev.map((item, idx) => idx === i ? { ...item, [field]: value } : item))
  }

  const total = items.reduce((sum, item) => {
    const n = parseFloat(item.cost)
    return sum + (isNaN(n) ? 0 : n)
  }, 0)

  const nights = startDate && endDate
    ? Math.max(0, Math.round((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000))
    : null

  return (
    <div className="mb-5">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Live demo</p>

      <div className="rounded-xl overflow-hidden bg-bg-base border border-bg-border">

        <div className="px-4 py-2.5 flex items-center justify-between bg-bg-surface border-b border-bg-border">
          <div className="flex items-baseline gap-2">
            <span className="font-mono font-bold text-[13px] tracking-[0.15em] uppercase text-accent">
              {destination || 'Holiday Planner'}
            </span>
            {nights !== null && nights > 0 && (
              <span className="font-mono text-[10px] tracking-widest uppercase text-text-muted">
                {nights} night{nights !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <button
            onClick={() => { setDestination(''); setStartDate(''); setEndDate(''); setCurrency('GBP'); setItems([{ label: '', cost: '' }]) }}
            className="font-mono text-[10px] tracking-widest uppercase px-2.5 py-1 rounded border border-bg-border bg-transparent text-text-secondary transition-colors duration-150 hover:text-red-400 hover:border-red-400"
          >Reset</button>
        </div>

        <div className="p-4 flex flex-col gap-4">

          <div>
            <p className={labelClass}>Destination</p>
            <input
              type="text"
              value={destination}
              onChange={e => setDestination(e.target.value)}
              placeholder="e.g. Amalfi Coast"
              maxLength={30}
              className={inputClass}
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <div>
              <p className={labelClass}>Start date</p>
              <input
                type="date"
                value={startDate}
                placeholder="Start date"
                onChange={e => { setStartDate(e.target.value); if (endDate && endDate < e.target.value) setEndDate('') }}
                onClick={e => (e.currentTarget as HTMLInputElement).showPicker?.()}
                className={dateClass}
              />
            </div>
            <div>
              <p className={labelClass}>End date</p>
              <input
                type="date"
                value={endDate}
                placeholder="End date"
                min={startDate || undefined}
                max={maxEnd || undefined}
                onChange={e => {
                  const val = e.target.value
                  if (!startDate || val >= startDate) setEndDate(val)
                }}
                onClick={e => (e.currentTarget as HTMLInputElement).showPicker?.()}
                className={dateClass}
              />
            </div>
            <div>
              <p className={labelClass}>Currency</p>
              <select value={currency} onChange={e => setCurrency(e.target.value)} className={selectClass}>
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.code} {c.symbol}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="border-t border-bg-border pt-4">
            <div className="flex items-center justify-between mb-2">
              <p className={labelClass}>Itinerary &amp; costs</p>
              <span className={`${labelClass} mb-0 ${items.length >= 10 ? 'text-accent' : ''}`}>{items.length}/10</span>
            </div>

            <div className="flex gap-2 mb-1 px-0.5">
              <span className="flex-[3] font-mono text-[11px] tracking-wide uppercase text-text-secondary">Item</span>
              <span className="flex-[2] font-mono text-[11px] tracking-wide uppercase text-right text-text-secondary whitespace-nowrap">Cost ({symbol})</span>
              <span className="w-5" />
            </div>

            <div className="flex flex-col gap-1.5">
              {items.map((item, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={item.label}
                    onChange={e => updateItem(i, 'label', e.target.value)}
                    placeholder={`Item ${i + 1}`}
                    maxLength={50}
                    className={`${inputClass} flex-[3]`}
                  />
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    max="10000"
                    value={item.cost}
                    onChange={e => updateItem(i, 'cost', e.target.value)}
                    placeholder="0"
                    className={`${inputClass} flex-[2] text-right`}
                  />
                  <button
                    onClick={() => {
                      if (items.length === 1) {
                        setItems([{ label: '', cost: '' }])
                      } else {
                        removeItem(i)
                      }
                    }}
                    aria-label="Remove item"
                    className="flex-shrink-0 w-5 text-center text-text-muted hover:text-red-400 transition-colors duration-150 font-mono text-lg leading-none"
                  >×</button>
                </div>
              ))}
            </div>

            {items.length < 10 && (
              <button
                onClick={addItem}
                className="mt-2 font-mono text-[10px] tracking-widest uppercase text-accent hover:text-accent/70 transition-colors duration-150"
              >+ Add item</button>
            )}
          </div>

          <div className="flex items-center justify-between rounded-lg px-4 py-3 bg-bg-surface border border-bg-border">
            <span className="font-mono text-[12px] tracking-widest uppercase text-text-muted">Total</span>
            <span className={`font-display font-bold text-[1.5rem] tabular-nums ${total > 0 ? 'text-accent' : 'text-text-secondary'}`}>
              {symbol}{total.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>

        </div>
      </div>
    </div>
  )
}

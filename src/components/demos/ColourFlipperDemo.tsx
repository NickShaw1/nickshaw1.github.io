import { useState } from 'react'

const FLIPPER_COLORS = ['#e74c3c', '#e67e22', '#f1c40f', '#2ecc71', '#3498db', '#9b59b6']

export default function ColourFlipperDemo() {
  const [index, setIndex] = useState(0)
  const colour = FLIPPER_COLORS[index]
  return (
    <div className="mb-5">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Live demo</p>
      <div className="flex flex-col items-center gap-4 bg-bg-surface border border-bg-border rounded-card py-8 px-6">
        <div
          className="w-24 h-24 rounded-card transition-colors duration-300"
          style={{ background: colour }}
          aria-label={`Current colour: ${colour}`}
        />
        <span className="font-mono text-[13px] text-text-secondary">{colour}</span>
        <div className="flex gap-2 flex-wrap justify-center">
          {FLIPPER_COLORS.map((c, i) => (
            <button
              key={c}
              onClick={() => setIndex(i)}
              aria-label={`Set colour to ${c}`}
              className="w-7 h-7 rounded-full border-2 transition-all duration-150"
              style={{
                background: c,
                borderColor: i === index ? '#F0EDE6' : 'transparent',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'

export default function CounterDemo() {
  const [count, setCount] = useState(0)

  const valueClass =
    count > 0 ? 'text-accent' :
    count < 0 ? 'text-red-400' :
    'text-text-primary'

  return (
    <div className="mb-5">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">
        Live demo
      </p>
      <div className="
        flex flex-col items-center gap-5
        bg-bg-surface border border-bg-border rounded-card
        py-8 px-6
      ">
        <span className={`font-display font-bold text-6xl leading-none tabular-nums transition-colors duration-150 ${valueClass}`}>
          {count}
        </span>
        <div className="flex gap-3">
          <button
            onClick={() => setCount(c => c - 1)}
            aria-label="Decrement"
            className="
              w-10 h-10 rounded-full
              border border-bg-border text-text-secondary
              hover:border-accent/40 hover:text-accent
              font-mono text-lg leading-none
              transition-colors duration-150
            "
          >
            −
          </button>
          <button
            onClick={() => setCount(0)}
            aria-label="Reset"
            className="
              px-4 h-10 rounded-pill
              border border-bg-border text-text-muted
              hover:border-text-muted/40 hover:text-text-secondary
              font-mono text-[11px] tracking-widest uppercase
              transition-colors duration-150
            "
          >
            Reset
          </button>
          <button
            onClick={() => setCount(c => c + 1)}
            aria-label="Increment"
            className="
              w-10 h-10 rounded-full
              border border-bg-border text-text-secondary
              hover:border-accent/40 hover:text-accent
              font-mono text-lg leading-none
              transition-colors duration-150
            "
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

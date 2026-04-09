import { meta } from '../data/meta'

export default function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-bg-border">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between gap-4 flex-wrap">

        {/* Left: domain + year */}
        <p className="font-mono text-[12px] text-text-muted tracking-wide">
          {meta.domain} · {meta.year}
        </p>

        {/* Right: status indicator with hover reveal */}
        <div
          className="group flex items-center gap-2 cursor-default"
          aria-label="Employment status: open to roles — available now for remote or Belfast-based roles"
        >
          <span aria-hidden="true" className="pulse-dot w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />

          {/* Base label — slides left on hover */}
          <span className="font-mono text-[11px] text-accent tracking-[0.15em] uppercase">
            open to roles
          </span>

          {/* Revealed detail — hidden until hover */}
          <span
            aria-hidden="true"
            className="
              hidden sm:inline
              font-mono text-[11px] text-text-muted tracking-wide
              max-w-0 overflow-hidden opacity-0 whitespace-nowrap
              group-hover:max-w-[400px] group-hover:opacity-100
              transition-all duration-1000 ease-in-out
            "
          >
            · available now for remote or Belfast-based roles
          </span>
        </div>

      </div>
    </footer>
  )
}

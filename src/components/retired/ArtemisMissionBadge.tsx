import { Rocket } from 'lucide-react'
import { m } from 'framer-motion'

interface Props {
  onOpen: () => void
}

export default function ArtemisMissionBadge({ onOpen }: Props) {
  return (
    <m.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
      className="mb-6 w-full lg:w-72"
    >
      <button
        onClick={onOpen}
        aria-label="Open Artemis II live tracker"
        className="w-full text-left group bg-bg-elevated border border-accent/25 rounded-card hover:border-accent/50 transition-colors duration-200"
        style={{
          boxShadow: '0 4px 20px rgba(10,255,157,0.06)',
          padding: '12px 14px',
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-2.5">
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-muted">
            NASA · Artemis Programme
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className="pulse-dot w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: '#FC3D21', boxShadow: '0 0 5px #FC3D21' }}
            />
            <span
              className="font-mono text-[9px] tracking-[0.15em] uppercase"
              style={{ color: '#FC3D21' }}
            >
              Active
            </span>
          </span>
        </div>

        {/* Mission title */}
        <div className="flex items-center gap-2 mb-2.5">
          <Rocket size={14} className="text-text-primary flex-shrink-0" />
          <span className="font-mono font-bold text-[15px] tracking-[0.08em] uppercase text-text-primary">
            Artemis II
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-bg-border mb-2.5" />

        {/* Data fields */}
        <div className="flex flex-col gap-1.5 mb-3">
          {[
            { label: 'Launched', value: '01 Apr 2026 · 22:35 UTC' },
            { label: 'Crew',     value: '4 Astronauts' },
            { label: 'Status',   value: 'En route · Lunar orbit' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-baseline gap-2">
              <span className="font-mono text-[9px] tracking-[0.15em] uppercase flex-shrink-0 w-14 text-text-muted">
                {label}
              </span>
              <span className="font-mono text-[10px] tracking-wide text-text-secondary">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="flex items-center justify-end">
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-accent/70 group-hover:text-accent transition-colors duration-150">
            Open live tracker →
          </span>
        </div>
      </button>
    </m.div>
  )
}

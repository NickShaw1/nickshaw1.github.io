import type { ReactNode } from 'react'

type AsideVariant = 'default' | 'gold' | 'blue' | 'purple'

const ASIDE_LABEL_CLASSES: Record<AsideVariant, string> = {
  default: 'text-text-muted',
  gold:    'text-[#fbbf24]',
  blue:    'text-[#60a5fa]',
  purple:  'text-[#a78bfa]',
}

export default function KBAside({ label, children, variant = 'default' }: { label?: string; children: ReactNode; variant?: AsideVariant }) {
  return (
    <div role="note" className="border border-bg-border bg-bg-surface rounded-card px-5 py-4 my-5">
      {label && (
        <p className={`font-mono text-[10px] tracking-widest uppercase mb-2 ${ASIDE_LABEL_CLASSES[variant]}`}>{label}</p>
      )}
      <div className="text-text-secondary text-[14px] leading-relaxed">{children}</div>
    </div>
  )
}

import type { ReactNode } from 'react'

type StepsVariant = 'green' | 'gold' | 'blue' | 'purple'

const STEPS_CLASSES: Record<StepsVariant, { border: string; text: string }> = {
  green:  { border: 'border-[#0AFF9D]/20', text: 'text-[#0AFF9D]' },
  gold:   { border: 'border-[#fbbf24]/20', text: 'text-[#fbbf24]' },
  blue:   { border: 'border-[#60a5fa]/20', text: 'text-[#60a5fa]' },
  purple: { border: 'border-[#a78bfa]/20', text: 'text-[#a78bfa]' },
}

export default function KBSteps({ steps, variant = 'green' }: { steps: { title: string; body: ReactNode }[]; variant?: StepsVariant }) {
  const cls = STEPS_CLASSES[variant]
  return (
    <ol role="list" className="my-6 space-y-4 list-none">
      {steps.map((step, i) => (
        <li key={step.title} className={`border-l-2 ${cls.border} pl-4 py-1`}>
          <span aria-hidden="true" className={`font-mono text-[10px] tracking-widest uppercase ${cls.text} mb-1 block`}>{i + 1}</span>
          {step.title && (
            <p className="font-display font-semibold text-[14px] text-text-primary mb-1">{step.title}</p>
          )}
          <div className="text-text-secondary text-[14px] leading-relaxed">{step.body}</div>
        </li>
      ))}
    </ol>
  )
}

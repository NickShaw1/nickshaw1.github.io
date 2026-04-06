import type { ReactNode } from 'react'
import { Info, AlertCircle, Lightbulb, BookOpen } from 'lucide-react'

type NoteVariant = 'green' | 'warning' | 'blue' | 'purple'

const NOTE_CLASSES: Record<NoteVariant, { border: string; bg: string; icon: string; full?: boolean }> = {
  green:   { border: 'border-[#0AFF9D]',           bg: 'bg-[#0AFF9D]/5',        icon: 'text-[#0AFF9D]' },
  warning: { border: 'border-[#fbbf24]/[0.6]',     bg: 'bg-[#fbbf24]/[0.08]',   icon: 'text-[#fbbf24]/[0.6]', full: true },
  blue:    { border: 'border-[#60a5fa]',            bg: 'bg-[#60a5fa]/5',         icon: 'text-[#60a5fa]' },
  purple:  { border: 'border-[#a78bfa]',            bg: 'bg-[#a78bfa]/5',         icon: 'text-[#a78bfa]' },
}

const NOTE_ICONS: Record<NoteVariant, typeof Info> = {
  green:   Info,
  warning: AlertCircle,
  blue:    BookOpen,
  purple:  Lightbulb,
}

export default function KBNote({ children, variant = 'green' }: { children: ReactNode; variant?: NoteVariant }) {
  const cls = NOTE_CLASSES[variant]
  const Icon = NOTE_ICONS[variant]
  return (
    <div className={`
      ${cls.bg} ${cls.border} rounded-card px-5 py-4 my-6 md:flex md:items-center md:gap-5
      ${cls.full ? `border` : `border-l-2 rounded-l-none`}
    `}>
      <Icon size={44} aria-hidden="true" className={`${cls.icon} flex-shrink-0 hidden md:block`} />
      <p className="text-text-secondary text-[14px] leading-relaxed">{children}</p>
    </div>
  )
}

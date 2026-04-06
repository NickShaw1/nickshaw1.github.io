import type { ReactNode } from 'react'
import { Info } from 'lucide-react'

type BannerVariant = 'info' | 'gold' | 'blue' | 'purple'

const VARIANT_CLASSES: Record<BannerVariant, string> = {
  info:   'bg-[#0AFF9D]/[0.08] border-[#0AFF9D]/[0.6]',
  gold:   'bg-[#fbbf24]/[0.08] border-[#fbbf24]/[0.6]',
  blue:   'bg-[#60a5fa]/10 border-[#60a5fa]/20',
  purple: 'bg-[#a78bfa]/10 border-[#a78bfa]/20',
}

const ICON_CLASSES: Record<BannerVariant, string> = {
  info:   'text-[#0AFF9D]/[0.6]',
  gold:   'text-[#fbbf24]/[0.6]',
  blue:   'text-[#60a5fa]',
  purple: 'text-[#a78bfa]',
}

export default function KBBanner({ children, variant = 'info' }: { children: ReactNode; variant?: BannerVariant }) {
  return (
    <div role="note" className={`border rounded-card px-5 py-4 my-6 md:flex md:items-center md:gap-5 ${VARIANT_CLASSES[variant]}`}>
      <Info size={44} aria-hidden="true" className={`flex-shrink-0 hidden md:block ${ICON_CLASSES[variant]}`} />
      <p className="text-text-secondary text-[14px] leading-relaxed">{children}</p>
    </div>
  )
}

import type { ReactNode } from 'react'

export function KBH2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="font-display font-semibold text-[1.2rem] text-text-primary mt-10 mb-4 leading-snug scroll-mt-24"
    >
      {children}
    </h2>
  )
}

export function KBH3({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h3
      id={id}
      className="font-display font-semibold text-[1rem] text-text-primary mt-6 mb-2 leading-snug scroll-mt-24"
    >
      {children}
    </h3>
  )
}

export function KBP({ children }: { children: ReactNode }) {
  return (
    <p className="text-text-secondary text-[15px] leading-relaxed mb-5">{children}</p>
  )
}

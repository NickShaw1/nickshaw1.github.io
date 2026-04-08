interface SectionLabelProps {
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <p
      className={`
        font-mono text-[12px] tracking-[0.18em] uppercase text-accent
        mb-3 ${className}
      `}
    >
      {children}
    </p>
  )
}

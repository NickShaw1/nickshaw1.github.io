import { meta } from '../data/meta'

export default function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-bg-border">
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-5 flex items-center justify-between gap-4 flex-wrap">

        {/* Left: domain + year */}
        <p className="font-mono text-[12px] text-text-muted tracking-wide">
          {meta.domain} · {meta.year}
        </p>


      </div>
    </footer>
  )
}

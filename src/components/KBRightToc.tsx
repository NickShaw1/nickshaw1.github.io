import { useEffect, useState } from 'react'
import type { KBTocSection } from '../data/kb'

interface KBRightTocProps {
  sections: KBTocSection[]
  contentLoaded: boolean
}

export default function KBRightToc({ sections, contentLoaded }: KBRightTocProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '')

  useEffect(() => {
    // Wait until the article content is in the DOM — headings don't exist until
    // the per-article chunk loads, so observing before then silently observes nothing.
    if (!contentLoaded || sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: '-20% 0% -70% 0%', threshold: 0 },
    )

    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sections, contentLoaded])

  if (sections.length === 0) return null

  return (
    <aside className="w-44 flex-shrink-0 sticky top-[88px] self-start max-h-[calc(100vh-104px)] overflow-y-auto pl-2 hidden lg:block">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-4 pb-3 border-b border-bg-border">
        On this page
      </p>
      <nav aria-label="On this page">
        <ul className="space-y-0.5">
          {sections.map(({ id, title }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={activeId === id ? 'true' : undefined}
                className={`
                  block text-[12px] leading-snug px-2 py-1 rounded
                  transition-colors duration-150
                  ${activeId === id
                    ? 'text-link font-medium'
                    : 'text-text-muted hover:text-text-secondary'
                  }
                `}
              >
                {title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

import { Link } from 'react-router-dom'
import type { KBArticle } from '../data/kb'

interface KBLeftSidebarProps {
  sectionSlug: string
  sectionTitle: string
  articles: KBArticle[]
  activeSlug: string
}

export default function KBLeftSidebar({ sectionSlug, sectionTitle, articles, activeSlug }: KBLeftSidebarProps) {
  return (
    <aside className="hidden md:block w-56 flex-shrink-0 sticky top-[88px] self-start max-h-[calc(100vh-104px)] overflow-y-auto pr-2">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-4 pb-3 border-b border-bg-border">
        {sectionTitle}
      </p>
      <nav aria-label={`${sectionTitle} articles`}>
        <ul className="space-y-0.5">
          {articles.map((article) => {
            const isActive = article.slug === activeSlug
            return (
              <li key={article.slug}>
                <Link
                  to={`/knowledge-base/${sectionSlug}/${article.slug}`}
                  onMouseEnter={() => article.load()}
                  className={`
                    block text-[13px] leading-snug px-2 py-1.5 rounded
                    transition-colors duration-150
                    ${isActive
                      ? 'text-accent bg-accent/10 font-medium'
                      : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface'
                    }
                  `}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {article.shortTitle ?? article.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}

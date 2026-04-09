import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { FC } from 'react'
import SEOHead from '../components/SEOHead'
import { techArticleSchema } from '../seo/structured-data'
import KBLeftSidebar from '../components/KBLeftSidebar'
import KBRightToc from '../components/KBRightToc'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { loadSection, getAdjacentArticles, readingTime } from '../data/kb'
import KBArticleSkeleton from '../components/kb/KBArticleSkeleton'
import KBSearch from '../components/kb/KBSearch'
import type { KBSectionData } from '../data/kb'

export default function KBArticlePage() {
  const { section: sectionSlug = '', slug: articleSlug = '' } = useParams<{ section: string; slug: string }>()
  const navigate = useNavigate()
  const reduced  = useReducedMotion()

  const [sectionData, setSectionData]   = useState<KBSectionData | null>(null)
  const [Content, setContent]           = useState<FC | null>(null)

  // Load section metadata
  useEffect(() => {
    setSectionData(null)
    loadSection(sectionSlug).then((data) => {
      if (!data) { navigate('/knowledge-base', { replace: true }); return }
      setSectionData(data)
    })
  }, [sectionSlug, navigate])

  const article = sectionData?.articles.find((a) => a.slug === articleSlug) ?? null

  // Redirect if article slug is invalid (in effect, not during render)
  useEffect(() => {
    if (sectionData && !article) navigate('/knowledge-base', { replace: true })
  }, [sectionData, article, navigate])

  // Load article content chunk on demand
  useEffect(() => {
    if (!article) { setContent(null); return }
    setContent(null)
    article.load().then((mod) => setContent(() => mod.default))
  }, [article])


  if (!sectionData || !article) return null

  const { prev, next } = getAdjacentArticles(sectionData.articles, articleSlug)
  const contentLoaded = Content !== null
  const pillStyle = { backgroundColor: `${sectionData.colour}1a`, color: sectionData.colour }
  const SectionIcon = sectionData.icon

  return (
    <>
      <SEOHead
        title={`${article.title} | ${sectionData.title} | Nick Shaw`}
        description={article.description ?? `${article.title}: part of the ${sectionData.title} section of the Software Testing Knowledge Base.`}
        canonicalUrl={`/knowledge-base/${sectionSlug}/${articleSlug}`}
        jsonLd={techArticleSchema({
          headline: article.title,
          description: article.description ?? `${article.title}: part of the ${sectionData.title} section of the Software Testing Knowledge Base.`,
          url: `/knowledge-base/${sectionSlug}/${articleSlug}`,
        })}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 md:py-16">

        {/* ── Mobile top bar ───────────────────────── */}
        <div className="md:hidden mb-6 flex items-center justify-between">
          <Link
            to="/knowledge-base"
            className="inline-flex items-center gap-1.5 font-mono text-[12px] tracking-wider text-text-muted hover:text-link transition-colors duration-150"
          >
            <ArrowLeft size={13} /> Back to Knowledge Base
          </Link>
          <KBSearch
            inlineMobile
            sectionArticles={sectionData.articles}
            currentArticleSlug={articleSlug}
            sectionSlug={sectionSlug}
          />
        </div>

        {/* ── Back link (desktop) ──────────────────── */}
        <div className="hidden md:flex items-center justify-between mb-8 -mt-1">
          <Link
            to="/knowledge-base"
            className="inline-flex items-center gap-2 font-mono text-[12px] tracking-wider text-text-muted hover:text-link transition-colors duration-150"
          >
            <ArrowLeft size={14} /> Back to Knowledge Base
          </Link>
          <KBSearch floating={false} />
        </div>

        {/* ── Three-column layout ──────────────────── */}
        <div className="flex gap-10 items-start">

          <KBLeftSidebar
            sectionSlug={sectionSlug}
            sectionTitle={sectionData.title}
            articles={sectionData.articles}
            activeSlug={articleSlug}
          />

          <m.div
            key={articleSlug}
            initial={reduced ? undefined : { opacity: 0, y: 12 }}
            animate={reduced ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="flex-1 min-w-0 kb-content"
          >
            {/* ── Article header ─────────────────── */}
            <header className="mb-8 pb-8 border-b border-bg-border">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-tag"
                  style={pillStyle}
                >
                  <SectionIcon size={11} aria-hidden="true" />
                  {sectionData.title}
                </span>
                {article.wordCount > 0 && (
                  <span className="font-mono text-[11px] text-text-muted">{readingTime(article.wordCount)}</span>
                )}
              </div>
              <h1 className="font-display font-bold text-[clamp(1.6rem,3.5vw,2.25rem)] text-text-primary leading-tight tracking-[-0.02em]">
                {article.title}
              </h1>
            </header>


            {/* ── Article body ───────────────────── */}
            <article>
              {Content ? <Content /> : <KBArticleSkeleton />}
            </article>

            {/* ── Prev / next navigation ─────────── */}
            {(prev || next) && (
              <nav
                aria-label="Article navigation"
                className="mt-14 pt-8 border-t border-bg-border grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {prev ? (
                  <Link
                    to={`/knowledge-base/${sectionSlug}/${prev.slug}`}
                    className="group flex flex-col gap-1 bg-bg-surface border border-bg-border rounded-card p-4 hover:border-accent/30 transition-colors duration-150"
                    onMouseEnter={() => prev.load()}
                  >
                    <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase text-text-muted mb-1">
                      <ArrowLeft size={11} /> Previous
                    </span>
                    <span className="font-display text-[14px] text-text-primary group-hover:text-link transition-colors duration-150 leading-snug">
                      {prev.shortTitle ?? prev.title}
                    </span>
                  </Link>
                ) : <div />}

                {next ? (
                  <Link
                    to={`/knowledge-base/${sectionSlug}/${next.slug}`}
                    className="group flex flex-col gap-1 text-right bg-bg-surface border border-bg-border rounded-card p-4 hover:border-accent/30 transition-colors duration-150 sm:col-start-2"
                    onMouseEnter={() => next.load()}
                  >
                    <span className="flex items-center justify-end gap-1.5 font-mono text-[10px] tracking-wider uppercase text-text-muted mb-1">
                      Next <ArrowRight size={11} />
                    </span>
                    <span className="font-display text-[14px] text-text-primary group-hover:text-link transition-colors duration-150 leading-snug">
                      {next.shortTitle ?? next.title}
                    </span>
                  </Link>
                ) : <div />}
              </nav>
            )}
            {/* ── Return to Knowledge Base ───────── */}
            <div className="mt-8">
              <Link
                to="/knowledge-base"
                className="inline-flex items-center gap-1.5 font-mono text-[12px] tracking-wider text-text-muted hover:text-link transition-colors duration-150"
              >
                <ArrowLeft size={13} /> Back to Knowledge Base
              </Link>
            </div>

          </m.div>

          <KBRightToc sections={article.sections} contentLoaded={contentLoaded} />

        </div>
      </div>
    </>
  )
}

import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import SEOHead from '../components/SEOHead'
import { webPageSchema } from '../seo/structured-data'
import BlogCard from '../components/BlogCard'
import SectionLabel from '../components/SectionLabel'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { allPostMeta } from '../lib/blog'
import { meta } from '../data/meta'

const ALL_CATEGORIES = ['All', ...Array.from(new Set(allPostMeta.map((p) => p.category))).sort()]

export default function Blog() {
  const reduced = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All'
    ? allPostMeta
    : allPostMeta.filter((p) => p.category === activeCategory)

  return (
    <>
      <SEOHead
        title={meta.seo.blog.title}
        description={meta.seo.blog.description}
        canonicalUrl="/blog"
        jsonLd={webPageSchema({
          name: 'Blog',
          description: meta.seo.blog.description,
          url: '/blog',
        })}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16">

        {/* ── Header ──────────────────────────────────────── */}
        <m.div
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-8 md:mb-12"
        >
          <SectionLabel>Writing</SectionLabel>
          <h1 className="font-display font-bold text-[clamp(2rem,5vw,3rem)] text-text-primary leading-tight tracking-[-0.02em] mb-4">
            Blog.
          </h1>
          <p className="text-text-secondary text-[15px] leading-relaxed max-w-xl">
            Thoughts on QA, testing, delivery and the tools I use day-to-day.
          </p>
        </m.div>

        {/* ── Category filter ─────────────────────────────── */}
        <m.div
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
          className="hidden sm:flex flex-wrap gap-2 mb-10"
          role="group"
          aria-label="Filter posts by category"
        >
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                font-mono text-[10px] tracking-widest uppercase
                px-3 py-1.5 rounded-pill border
                transition-colors duration-150
                ${activeCategory === cat
                  ? 'border-accent text-accent bg-accent/10'
                  : 'border-bg-border text-text-muted hover:text-text-secondary hover:border-text-muted/30'}
              `}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </m.div>

        {/* ── Post list ───────────────────────────────────── */}
        <AnimatePresence mode="wait">
          <m.div
            key={activeCategory}
            initial={reduced ? undefined : { opacity: 0 }}
            animate={reduced ? undefined : { opacity: 1 }}
            exit={reduced ? undefined : { opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {filtered.length === 0 ? (
              <p className="text-text-muted font-mono text-sm">No posts in this category yet.</p>
            ) : (
              <div className="flex flex-col">
                {filtered.map((post, i) => (
                  <BlogCard
                    key={post.slug}
                    post={post}
                    delay={reduced ? 0 : i * 80}
                    reduced={reduced}
                  />
                ))}
              </div>
            )}
          </m.div>
        </AnimatePresence>

      </div>
    </>
  )
}

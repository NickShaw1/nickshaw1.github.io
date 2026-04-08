import { useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { m } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { getPostBySlug, getAdjacentPosts, formatDate } from '../lib/blog'
import { meta } from '../data/meta'
import { articleSchema } from '../seo/structured-data'
import 'highlight.js/styles/github-dark.css'

export default function BlogPost() {
  const { slug }   = useParams<{ slug: string }>()
  const navigate   = useNavigate()
  const reduced    = useReducedMotion()
  const articleRef = useRef<HTMLDivElement>(null)

  const post = slug ? getPostBySlug(slug) : undefined

  useEffect(() => {
    if (!post) navigate('/blog', { replace: true })
  }, [post, navigate])

  // Copy-to-clipboard for code blocks
  useEffect(() => {
    if (!articleRef.current) return
    const blocks = articleRef.current.querySelectorAll('pre')

    blocks.forEach((pre) => {
      if (pre.querySelector('.code-copy-btn')) return
      const btn = document.createElement('button')
      btn.className = 'code-copy-btn'
      btn.setAttribute('aria-label', 'Copy code to clipboard')

      const renderIcon = (copied: boolean) => {
        btn.innerHTML = copied
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
          : '<svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>'
      }

      renderIcon(false)
      btn.addEventListener('click', () => {
        const code = pre.querySelector('code')?.innerText ?? ''
        navigator.clipboard.writeText(code).then(() => {
          renderIcon(true)
          setTimeout(() => renderIcon(false), 2000)
        })
      })
      pre.style.position = 'relative'
      pre.appendChild(btn)
    })
  }, [post])

  if (!post) return null

  const { prev, next } = getAdjacentPosts(post.slug)

  return (
    <>
      <SEOHead
        title={`${post.title} | ${meta.name}`}
        description={post.excerpt}
        ogType="article"
        canonicalUrl={`/blog/${post.slug}`}
        jsonLd={articleSchema({
          headline:      post.title,
          description:   post.excerpt,
          datePublished: post.date,
          dateModified:  post.date,
          url:           `/blog/${post.slug}`,
        })}
      />

      <div className="max-w-3xl mx-auto px-6 md:px-10 py-10 md:py-16">

        {/* ── Back link ──────────────────────────────────── */}
        <m.div
          initial={reduced ? undefined : { opacity: 0, x: -12 }}
          animate={reduced ? undefined : { opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mb-10"
        >
          <Link
            to="/blog"
            className="
              inline-flex items-center gap-2
              font-mono text-[11px] tracking-wider text-text-muted
              hover:text-link transition-colors duration-150
            "
          >
            <ArrowLeft size={13} /> Back to blog
          </Link>
        </m.div>

        {/* ── Post header ────────────────────────────────── */}
        <m.header
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.05 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="
              font-mono text-[10px] tracking-widest uppercase
              bg-accent/10 text-accent px-2 py-0.5 rounded-tag
            ">
              {post.category}
            </span>
            <span className="font-mono text-[11px] text-text-muted">{post.readingTime}</span>
          </div>

          <h1 className="
            font-display font-bold
            text-[clamp(1.75rem,4vw,2.75rem)]
            leading-[1.1] tracking-[-0.025em]
            text-text-primary mb-5
          ">
            {post.title}
          </h1>

          <p className="text-text-secondary text-[15px] leading-relaxed mb-5 max-w-2xl">
            {post.excerpt}
          </p>

          <time
            dateTime={post.date}
            className="font-mono text-[11px] text-text-muted"
          >
            {formatDate(post.date)}
          </time>

          <hr className="border-0 border-t border-bg-border mt-8" />
        </m.header>

        {/* ── Post body ──────────────────────────────────── */}
        <m.div
          ref={articleRef}
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.15 }}
          className="prose-blog"
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
          >
            {post.body}
          </ReactMarkdown>
        </m.div>

        {/* ── Prev / Next navigation ─────────────────────── */}
        {(prev || next) && (
          <nav
            aria-label="Post navigation"
            className="
              mt-10 md:mt-16 pt-6 md:pt-8 border-t border-bg-border
              grid grid-cols-1 sm:grid-cols-2 gap-4
            "
          >
            {prev ? (
              <Link
                to={`/blog/${prev.slug}`}
                className="
                  group flex flex-col gap-1
                  bg-bg-surface border border-bg-border rounded-card
                  p-4 hover:border-accent/30
                  transition-colors duration-150
                "
              >
                <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider uppercase text-text-muted mb-1">
                  <ArrowLeft size={11} /> Previous
                </span>
                <span className="font-display text-[15px] text-text-primary group-hover:text-link transition-colors duration-150 leading-snug">
                  {prev.title}
                </span>
              </Link>
            ) : <div />}

            {next ? (
              <Link
                to={`/blog/${next.slug}`}
                className="
                  group flex flex-col gap-1 text-right
                  bg-bg-surface border border-bg-border rounded-card
                  p-4 hover:border-accent/30
                  transition-colors duration-150
                  sm:col-start-2
                "
              >
                <span className="flex items-center justify-end gap-1.5 font-mono text-[10px] tracking-wider uppercase text-text-muted mb-1">
                  Next <ArrowRight size={11} />
                </span>
                <span className="font-display text-[15px] text-text-primary group-hover:text-link transition-colors duration-150 leading-snug">
                  {next.title}
                </span>
              </Link>
            ) : <div />}
          </nav>
        )}

      </div>
    </>
  )
}

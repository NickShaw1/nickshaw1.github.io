import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, FlaskConical, Code2, BookOpen, Sparkles } from 'lucide-react'
import { motion } from 'framer-motion'
import type { PostMeta } from '../lib/blog'
import { formatDate } from '../lib/blog'

const CATEGORY_META: Record<string, { icon: React.ComponentType<{ size?: number; className?: string }>; colour: string }> = {
  Testing:     { icon: FlaskConical, colour: 'text-[#fb7185]' },
  Development: { icon: Code2,        colour: 'text-[#60a5fa]' },
  General:     { icon: BookOpen,     colour: 'text-[#e879f9]' },
  AI:          { icon: Sparkles,    colour: 'text-[#fbbf24]' },
}

interface BlogCardProps {
  post: PostMeta
  delay?: number
  reduced?: boolean
}

export default function BlogCard({ post, delay = 0, reduced = false }: BlogCardProps) {
  const { icon: Icon, colour } = CATEGORY_META[post.category] ?? CATEGORY_META['General']

  return (
    <motion.article
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, ease: 'easeOut', delay: reduced ? 0 : delay / 1000 }}
      className="group border-b border-bg-border py-5 sm:py-7 first:border-t"
    >
      {/* Meta row */}
      <div className="flex items-center gap-3 mb-2">
        <span className="font-mono text-[10px] tracking-widest uppercase bg-accent/10 text-accent px-2 py-0.5 rounded-tag">
          {post.category}
        </span>
        <time dateTime={post.date} className="font-mono text-[11px] text-text-muted">
          {formatDate(post.date)}
        </time>
        <span className="font-mono text-[11px] text-text-muted">· {post.readingTime}</span>
      </div>

      {/* Title */}
      <h2 className="font-display font-semibold text-[17px] sm:text-[19px] leading-snug mb-2 flex items-start gap-2">
        <Icon size={16} className={`${colour} flex-shrink-0 mt-[3px]`} />
        <Link
          to={`/blog/${post.slug}`}
          className="text-text-primary hover:text-link transition-colors duration-150 line-clamp-1 sm:line-clamp-none"
        >
          {post.title}
        </Link>
      </h2>

      {/* Excerpt + read link row */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 sm:gap-6">
        <p className="text-text-secondary text-sm leading-relaxed max-w-2xl line-clamp-1 sm:line-clamp-2">
          {post.excerpt}
        </p>
        <Link
          to={`/blog/${post.slug}`}
          aria-label={`Read ${post.title}`}
          className="flex-shrink-0 self-end sm:self-auto flex items-center gap-1.5 font-mono text-[11px] text-link hover:text-link/80 transition-colors duration-150 group-hover:gap-2.5"
        >
          Read <ArrowRight size={12} className="transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </motion.article>
  )
}

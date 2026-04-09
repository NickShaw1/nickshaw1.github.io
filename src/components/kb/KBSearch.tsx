import { useState, useEffect, useRef, useCallback, type ReactNode, type ComponentType } from 'react'
import { m } from 'framer-motion'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { Search, SearchX, X, ArrowRight, FileText, Check, BookOpen, Hand, ClipboardList, Bot, FlaskConical, Activity, Sparkles, Wrench, Lightbulb, Play, Globe, Cpu } from 'lucide-react'
import type { SearchEntry } from '../../data/kb/search-index'
import type { KBArticle } from '../../data/kb'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const SECTION_ICONS: Record<string, ComponentType<{ size?: number }>> = {
  'foundations':            BookOpen,
  'manual-testing':         Hand,
  'test-management':        ClipboardList,
  'automation':             Bot,
  'specialist-testing':     FlaskConical,
  'observability':          Activity,
  'ai-and-modern-testing':  Sparkles,
  'tooling':                Wrench,
  'concepts':               Lightbulb,
  'playwright':             Play,
  'playwright-api-testing': Globe,
  'playwright-mcp':         Cpu,
}

// ── Search logic ─────────────────────────────────────────────

function tokenize(text: string): string[] {
  return text.split(/[\s\-/]+/).filter(Boolean)
}

function wordMatch(text: string, q: string): 'exact' | 'start' | 'none' {
  const tokens = tokenize(text)
  if (tokens.some(w => w === q))         return 'exact'
  if (tokens.some(w => w.startsWith(q))) return 'start'
  return 'none'
}

function scoreEntry(entry: SearchEntry, q: string): number {
  const t = entry.title.toLowerCase()
  const d = entry.description.toLowerCase()
  const s = entry.sectionTitles.join(' ').toLowerCase()
  let n = 0

  if (t === q)                          n += 10
  else if (wordMatch(t, q) === 'exact') n += 8
  else if (t.startsWith(q))            n += 6
  else if (wordMatch(t, q) === 'start') n += 4

  const dm = wordMatch(d, q)
  if (dm !== 'none') n += 2

  const sm = wordMatch(s, q)
  if (sm !== 'none') n += 1

  return n
}

const MAX_RESULTS = 10

function runSearch(index: SearchEntry[], raw: string): { results: SearchEntry[]; total: number } {
  const terms = raw.toLowerCase().trim().split(/\s+/).filter(t => t.length >= 2)
  if (terms.length === 0) return { results: [], total: 0 }
  const matched = index
    .map(e => {
      let total = 0
      for (const term of terms) {
        const s = scoreEntry(e, term)
        if (s === 0) return { e, s: 0 }
        total += s
      }
      return { e, s: total }
    })
    .filter(x => x.s > 0)
    .sort((a, b) => b.s - a.s)
  return { results: matched.slice(0, MAX_RESULTS).map(x => x.e), total: matched.length }
}

// ── Highlight ────────────────────────────────────────────────

function highlight(text: string, query: string): ReactNode {
  const idx = text.toLowerCase().indexOf(query.toLowerCase())
  if (idx === -1 || query.length < 2) return text
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-accent/20 text-accent not-italic">{text.slice(idx, idx + query.length)}</mark>
      {text.slice(idx + query.length)}
    </>
  )
}

// ── Result row ───────────────────────────────────────────────

function ResultRow({ entry, query, active, onSelect, id }: {
  entry: SearchEntry; query: string; active: boolean; onSelect: () => void; id: string
}) {
  return (
    <button
      id={id}
      role="option"
      aria-selected={active}
      onMouseDown={onSelect}
      className={`group w-full text-left px-3 py-3 flex items-start gap-2.5 transition-colors duration-100 ${
        active ? 'bg-white/[0.06]' : 'hover:bg-white/[0.06]'
      }`}
    >
      <span className="flex-shrink-0 self-center" style={{ color: entry.sectionColour }}>
        {(() => { const Icon = SECTION_ICONS[entry.sectionSlug]; return Icon ? <Icon size={20} /> : null })()}
      </span>
      <div className="flex-1 min-w-0">
        <p className="font-display font-medium text-[13px] text-text-primary leading-snug truncate">
          {highlight(entry.title, query)}
        </p>
        {entry.description && (
          <p className="font-mono text-[12px] text-text-secondary mt-0.5 line-clamp-1">
            {highlight(entry.description, query)}
          </p>
        )}
      </div>
      <ArrowRight size={12} className="flex-shrink-0 self-center text-text-muted group-hover:text-link transition-colors duration-150" />
    </button>
  )
}

// ── Results panel ────────────────────────────────────────────

function ResultsPanel({ results, query, activeIndex, onSelect, loading, listboxId, reduced }: {
  results: SearchEntry[]; query: string; activeIndex: number
  onSelect: (e: SearchEntry) => void; loading: boolean
  listboxId: string; reduced: boolean
}) {
  if (loading) return (
    <div role="status" aria-live="polite" className="px-3 py-4 text-center">
      <p className="font-mono text-[11px] text-text-muted animate-pulse">Loading…</p>
    </div>
  )
  if (query.length >= 2 && results.length === 0) return (
    <div role="status" aria-live="polite" className="px-3 py-4 flex items-center gap-2.5">
      <SearchX size={15} className="text-text-muted flex-shrink-0" aria-hidden="true" />
      <p className="font-mono text-[12px] text-text-secondary">
        No results for <span className="text-text-primary">"{query}"</span>
      </p>
    </div>
  )
  if (results.length === 0) return null
  return (
    <div id={listboxId} role="listbox" aria-label="Search results" className="divide-y divide-bg-border">
      {results.map((entry, i) => (
        <m.div
          key={`${entry.sectionSlug}/${entry.articleSlug}`}
          initial={reduced ? undefined : { opacity: 0, y: 4 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.14, ease: 'easeOut', delay: i * 0.04 }}
        >
          <ResultRow
            id={`${listboxId}-option-${i}`}
            entry={entry} query={query}
            active={i === activeIndex}
            onSelect={() => onSelect(entry)}
          />
        </m.div>
      ))}
    </div>
  )
}

// ── Section articles panel (mobile default state) ────────────

function SectionArticlesPanel({ articles, currentSlug, onSelect, reduced }: {
  articles: KBArticle[]; currentSlug: string
  onSelect: (slug: string) => void; reduced: boolean
}) {
  return (
    <div role="listbox" aria-label="Articles in this section">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted px-3 pt-3 pb-2">
        In this section
      </p>
      <div className="divide-y divide-bg-border">
        {articles.map((article, i) => {
          const isCurrent = article.slug === currentSlug
          return (
            <m.button
              key={article.slug}
              role="option"
              aria-selected={isCurrent}
              onMouseDown={() => onSelect(article.slug)}
              initial={reduced ? undefined : { opacity: 0, y: 4 }}
              animate={reduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.13, ease: 'easeOut', delay: i * 0.03 }}
              className="group w-full text-left px-3 py-2.5 flex items-center gap-2.5 hover:bg-white/[0.06] transition-colors duration-100"
            >
              <FileText
                size={14}
                className={`flex-shrink-0 ${isCurrent ? 'text-accent' : 'text-text-muted'}`}
                aria-hidden="true"
              />
              <span className={`flex-1 font-mono text-[13px] leading-snug truncate ${
                isCurrent ? 'text-accent' : 'text-text-secondary'
              }`}>
                {article.shortTitle ?? article.title}
              </span>
              {isCurrent
                ? <Check size={11} className="flex-shrink-0 text-accent" aria-hidden="true" />
                : <ArrowRight size={11} className="flex-shrink-0 text-text-muted group-hover:text-link transition-colors duration-150" aria-hidden="true" />
              }
            </m.button>
          )
        })}
      </div>
    </div>
  )
}

// ── Main component ───────────────────────────────────────────

interface KBSearchProps {
  floating?: boolean
  inlineMobile?: boolean
  sectionArticles?: KBArticle[]
  currentArticleSlug?: string
  sectionSlug?: string
}

export default function KBSearch({
  floating = true,
  inlineMobile = false,
  sectionArticles,
  currentArticleSlug = '',
  sectionSlug = '',
}: KBSearchProps) {
  const navigate = useNavigate()
  const reduced  = useReducedMotion()

  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [query,          setQuery]          = useState('')
  const [results,        setResults]        = useState<SearchEntry[]>([])
  const [totalResults,   setTotalResults]   = useState(0)
  const [activeIndex,    setActiveIndex]    = useState(-1)
  const [indexData,      setIndexData]      = useState<SearchEntry[] | null>(null)
  const [loading,        setLoading]        = useState(false)
  const [desktopFocused, setDesktopFocused] = useState(false)

  const desktopInputRef  = useRef<HTMLInputElement>(null)
  const mobileInputRef   = useRef<HTMLInputElement>(null)
  const mobileTriggerRef = useRef<HTMLButtonElement>(null)
  const containerRef     = useRef<HTMLDivElement>(null)
  const debounceRef      = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [dropdownRect, setDropdownRect] = useState<DOMRect | null>(null)

  const desktopListboxId = 'kb-search-desktop-listbox'
  const mobileListboxId  = 'kb-search-mobile-listbox'

  const showSectionDefault = !!sectionArticles && query.length < 2

  const loadIndex = useCallback(async () => {
    if (indexData) return
    setLoading(true)
    const mod = await import('../../data/kb/search-index')
    setIndexData(mod.searchIndex)
    setLoading(false)
  }, [indexData])

  const handleSelect = useCallback((entry: SearchEntry) => {
    navigate(`/knowledge-base/${entry.sectionSlug}/${entry.articleSlug}`)
    setQuery('')
    setResults([])
    setDesktopFocused(false)
    setMobileOpen(false)
    setActiveIndex(-1)
  }, [navigate])

  const handleSectionArticleSelect = useCallback((slug: string) => {
    navigate(`/knowledge-base/${sectionSlug}/${slug}`)
    setMobileOpen(false)
    setQuery('')
    setActiveIndex(-1)
  }, [navigate, sectionSlug])

  const handleMobileOpen = useCallback(async () => {
    setMobileOpen(true)
    await loadIndex()
    setTimeout(() => mobileInputRef.current?.focus(), 50)
  }, [loadIndex])

  const handleMobileClose = useCallback(() => {
    setMobileOpen(false)
    setQuery('')
    setResults([])
    setActiveIndex(-1)
    setTimeout(() => mobileTriggerRef.current?.focus(), 50)
  }, [])

  // Lock body scroll when mobile overlay is open
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', mobileOpen)
    return () => { document.body.classList.remove('overflow-hidden') }
  }, [mobileOpen])

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (!indexData) return
    debounceRef.current = setTimeout(() => {
      const { results, total } = runSearch(indexData, query)
      setResults(results)
      setTotalResults(total)
      setActiveIndex(-1)
    }, 150)
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current) }
  }, [query, indexData])

  // Click outside desktop dropdown to close
  useEffect(() => {
    if (!desktopFocused) return
    function handler(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setDesktopFocused(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [desktopFocused])

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Escape') {
      e.stopPropagation()
      setDesktopFocused(false)
      setMobileOpen(false)
      setQuery('')
      setResults([])
      setTimeout(() => mobileTriggerRef.current?.focus(), 50)
      return
    }
    if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, results.length - 1)) }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, -1)) }
    if (e.key === 'Enter' && activeIndex >= 0 && results[activeIndex]) handleSelect(results[activeIndex])
  }

  const showDropdown   = desktopFocused && query.length >= 2
  const activeOptionId = activeIndex >= 0 ? `${desktopListboxId}-option-${activeIndex}` : undefined
  const inputCls       = 'w-full bg-transparent font-mono text-[11px] text-text-primary placeholder:text-text-secondary focus:outline-none'

  // ── Desktop dropdown portal ──────────────────────────────
  const liveRect = showDropdown && containerRef.current ? containerRef.current.getBoundingClientRect() : dropdownRect
  const desktopDropdown = showDropdown && liveRect && createPortal(
    <m.div
      initial={reduced ? undefined : { opacity: 0, y: -6 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: liveRect.bottom + 8,
        right: document.documentElement.clientWidth - liveRect.right,
        width: 560,
        maxWidth: '90vw',
        zIndex: 9999,
      }}
      className="bg-bg-elevated border border-bg-border rounded-card shadow-2xl overflow-hidden"
    >
      <div className="max-h-[420px] overflow-y-auto overscroll-contain">
        <ResultsPanel
          results={results} query={query} activeIndex={activeIndex}
          onSelect={handleSelect} loading={loading}
          listboxId={desktopListboxId} reduced={reduced}
        />
      </div>
      {totalResults > MAX_RESULTS && (
        <div className="px-3 py-2 border-t border-bg-border">
          <p className="font-mono text-[12px] text-text-muted text-right">
            <span className="text-link">{totalResults}</span> results. Try a more specific term.
          </p>
        </div>
      )}
    </m.div>,
    document.body,
  )

  // ── Mobile overlay ───────────────────────────────────────
  const mobileActiveOptionId = activeIndex >= 0 ? `${mobileListboxId}-option-${activeIndex}` : undefined
  const mobileOverlay = mobileOpen && createPortal(
    <m.div
      role="dialog"
      aria-modal="true"
      aria-label="Search knowledge base"
      initial={reduced ? undefined : { opacity: 0 }}
      animate={reduced ? undefined : { opacity: 1 }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      className="sm:hidden fixed inset-0 z-50 flex flex-col"
    >
      <div className="absolute inset-0 bg-black/60" onMouseDown={handleMobileClose} aria-hidden="true" />
      <m.div
        initial={reduced ? undefined : { opacity: 0, y: -8 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="relative mt-16 mx-3 bg-bg-surface border border-bg-border rounded-card overflow-hidden shadow-2xl"
      >
        <div className="flex items-center gap-2 px-3 py-3 border-b border-bg-border">
          <Search size={13} className="text-text-muted flex-shrink-0" aria-hidden="true" />
          <input
            ref={mobileInputRef}
            role="combobox"
            aria-expanded={mobileOpen && (showSectionDefault || results.length > 0)}
            aria-controls={mobileListboxId}
            aria-autocomplete="list"
            aria-activedescendant={mobileActiveOptionId}
            aria-label={showSectionDefault ? 'Search all sections' : 'Search all sections'}
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search all sections…"
            autoComplete="off"
            maxLength={20}
            className={inputCls}
          />
          <button
            onMouseDown={handleMobileClose}
            aria-label="Close search"
            className="text-text-muted hover:text-text-secondary transition-colors duration-150"
          >
            <X size={13} aria-hidden="true" />
          </button>
        </div>

        {/* Default state: section articles */}
        {showSectionDefault && (
          <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
            <SectionArticlesPanel
              articles={sectionArticles!}
              currentSlug={currentArticleSlug}
              onSelect={handleSectionArticleSelect}
              reduced={reduced}
            />
          </div>
        )}

        {/* Search results state */}
        {!showSectionDefault && mobileOpen && (loading || query.length >= 2) && (
          <>
            <div className="max-h-[60vh] overflow-y-auto overscroll-contain">
              <ResultsPanel
                results={results} query={query} activeIndex={activeIndex}
                onSelect={handleSelect} loading={loading}
                listboxId={mobileListboxId} reduced={reduced}
              />
            </div>
            {totalResults > MAX_RESULTS && (
              <div className="px-3 py-2 border-t border-bg-border">
                <p className="font-mono text-[12px] text-text-muted text-right">
                  <span className="text-link">{totalResults}</span> results. Try a more specific term.
                </p>
              </div>
            )}
          </>
        )}
      </m.div>
    </m.div>,
    document.body,
  )

  return (
    <>
      {mobileOverlay}
      {desktopDropdown}

      {/* Mobile trigger */}
      <button
        ref={mobileTriggerRef}
        onClick={handleMobileOpen}
        onFocus={loadIndex}
        aria-label="Search knowledge base"
        aria-expanded={mobileOpen}
        aria-haspopup="dialog"
        className={`sm:hidden text-text-muted hover:text-accent transition-colors duration-150 p-1 ${inlineMobile ? '' : 'absolute right-0 top-1/2 -translate-y-1/2'}`}
      >
        <Search size={15} aria-hidden="true" />
      </button>

      {/* Desktop input */}
      <div ref={containerRef} className={floating ? "hidden sm:block absolute right-0 top-1/2 -translate-y-1/2" : "hidden sm:block"}>
        <div className="flex items-center gap-1.5 bg-bg-surface border border-bg-border hover:border-accent/40 focus-within:border-accent/40 rounded-pill px-3 py-1 transition-colors duration-150 w-44">
          <Search size={11} className="text-text-secondary flex-shrink-0" aria-hidden="true" />
          <input
            ref={desktopInputRef}
            role="combobox"
            aria-expanded={showDropdown}
            aria-controls={desktopListboxId}
            aria-autocomplete="list"
            aria-activedescendant={activeOptionId}
            aria-label="Search articles"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => {
              setDesktopFocused(true)
              loadIndex()
              if (containerRef.current) setDropdownRect(containerRef.current.getBoundingClientRect())
              if (desktopInputRef.current) desktopInputRef.current.placeholder = ''
            }}
            onBlur={() => {
              if (desktopInputRef.current) desktopInputRef.current.placeholder = 'Search articles…'
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search articles…"
            autoComplete="off"
            maxLength={20}
            className={inputCls}
          />
          {query && (
            <button
              onMouseDown={() => { setQuery(''); setResults([]); desktopInputRef.current?.focus() }}
              aria-label="Clear search"
              className="text-text-muted hover:text-text-secondary transition-colors duration-150 flex-shrink-0"
            >
              <X size={11} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </>
  )
}

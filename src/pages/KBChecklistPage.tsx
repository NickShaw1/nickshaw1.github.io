import { useState, useCallback } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check, Download, RotateCcw } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { webPageSchema } from '../seo/structured-data'
import { useReducedMotion } from '../hooks/useReducedMotion'

// ── Types ─────────────────────────────────────────────────────
interface CheckItem {
  id: string
  text: string
  note?: string
}

interface Category {
  id: string
  title: string
  items: CheckItem[]
}

// ── Checklist data — 30 items across 6 categories ─────────────
const CATEGORIES: Category[] = [
  {
    id: 'functional',
    title: 'Functional',
    items: [
      { id: 'fn-1', text: 'The feature works as described in the ticket or spec', note: 'Walk through each acceptance criterion. If none exist, flag it before signing off.' },
      { id: 'fn-2', text: 'The main user journey completes without errors', note: 'Test with a standard account on staging, not a developer or admin account with elevated permissions.' },
      { id: 'fn-3', text: 'Invalid input fails with a message a non-technical user would understand', note: 'Try empty fields, maximum lengths, special characters and unexpected data types.' },
      { id: 'fn-4', text: 'Existing flows that share code or data with this change have been spot-checked', note: 'Focus on what could plausibly have broken based on the diff, not the full regression suite.' },
      { id: 'fn-5', text: 'Users can only see and do what their role permits', note: 'Test with an account that should not have access and confirm the response is a proper denial, not an error or a silent data leak.' },
      { id: 'fn-6', text: 'The feature degrades gracefully when a dependency is slow or unavailable', note: 'Throttle the network or simulate a service failure and confirm the user sees something useful, not a blank screen or an unhandled exception.' },
    ],
  },
  {
    id: 'ui-compatibility',
    title: 'UI & Compatibility',
    items: [
      { id: 'ui-1', text: 'The UI looks correct at the screen sizes your users are most likely to be using', note: 'Check the viewport range relevant to your product rather than assuming a fixed set of breakpoints.' },
      { id: 'ui-2', text: 'Nothing is visually broken at the smallest viewport in your analytics', note: 'DevTools simulation is useful for a first pass but does not replicate real device font rendering or scroll behaviour.' },
      { id: 'ui-3', text: 'Hover, focus and disabled states look deliberate rather than broken', note: 'Tab through the feature with a keyboard to see each state in sequence without using a mouse.' },
      { id: 'ui-4', text: 'Tested in the browsers relevant to your user base', note: 'Check your analytics before deciding which browsers to test. Do not assume Chrome and Safari covers everyone.' },
      { id: 'ui-5', text: 'No placeholder copy, console errors or missing assets in the build being released', note: 'Open the browser console before testing so any errors introduced by this change are immediately visible.' },
    ],
  },
  {
    id: 'accessibility',
    title: 'Accessibility',
    items: [
      { id: 'a11y-1', text: 'All interactive elements are reachable and operable by keyboard alone', note: 'If you cannot reach or activate something without a mouse, that is a bug, not a nice-to-have.' },
      { id: 'a11y-2', text: 'Every interactive element has a visible focus indicator', note: 'CSS resets commonly suppress browser defaults without adding a replacement. Check across at least two browsers.' },
      { id: 'a11y-3', text: 'Controls have names that make sense when read aloud without surrounding context', note: 'Screen readers present controls in isolation. "Submit" is often ambiguous; "Submit contact form" is not.' },
      { id: 'a11y-4', text: 'Colour alone is not used to communicate meaning', note: 'Error states, status labels and required fields should use text or an icon alongside colour.' },
    ],
  },
  {
    id: 'performance',
    title: 'Performance',
    items: [
      { id: 'perf-1', text: 'The feature does not introduce a noticeable drop in perceived load speed', note: 'Run Lighthouse against staging and compare against the previous baseline. If it feels slower, investigate before releasing.' },
      { id: 'perf-2', text: 'Images are sized and compressed for their actual display size', note: 'Check the network tab. A transfer size significantly larger than the displayed dimensions is a red flag.' },
      { id: 'perf-3', text: 'The page does not visibly shift or jump as it loads', note: 'Elements without explicit dimensions and late-loading fonts are the most common causes of layout shift.' },
      { id: 'perf-4', text: 'No new network requests have been introduced that are clearly redundant or premature', note: 'Check the network tab for duplicate calls or requests firing before the data is actually needed.' },
    ],
  },
  {
    id: 'security',
    title: 'Security',
    items: [
      { id: 'sec-1', text: 'Server-side validation exists for all user-supplied input', note: 'Client-side validation can be bypassed trivially. Use Postman or curl to send requests directly to the API.' },
      { id: 'sec-2', text: 'Protected routes and endpoints reject unauthenticated requests', note: 'Remove your auth token and confirm the response is a 401 or 403, not a data leak or unhandled error.' },
      { id: 'sec-3', text: 'No sensitive data is exposed in responses, logs or the console', note: 'Check response bodies and headers in the network tab for tokens, keys and PII during normal use.' },
      { id: 'sec-4', text: 'New dependencies have been scanned for known vulnerabilities', note: 'Run npm audit or equivalent. A critical severity result should block the release.' },
      { id: 'sec-5', text: 'No new attack surface has been introduced without a security review', note: 'New endpoints, file uploads, open redirects and third-party integrations all warrant scrutiny before going live.' },
    ],
  },
  {
    id: 'pre-release',
    title: 'Pre-release Sign-off',
    items: [
      { id: 'pr-1', text: 'The automated test suite passes on the exact build being released', note: 'Match the pipeline run to the commit SHA being deployed. An earlier green run does not count.' },
      { id: 'pr-2', text: 'All open bugs are resolved or formally risk-accepted', note: 'Risk acceptance should be documented by a product owner, not self-approved by the developer.' },
      { id: 'pr-3', text: 'Feature flags are confirmed for production, not assumed to match staging', note: 'Walk through each flag changed in this release and verify the production value explicitly.' },
      { id: 'pr-4', text: 'The feature has been tested by someone other than the developer who built it', note: 'A five-minute walkthrough from a colleague will surface things a self-review will not.' },
      { id: 'pr-5', text: 'A changelog entry or release note is ready, even if only internal', note: 'On-call engineers and support teams will need context if something goes wrong after deployment.' },
      { id: 'pr-6', text: 'A tested rollback plan exists for this release', note: 'If the release includes a database migration, confirm the down migration runs cleanly before deploying.' },
    ],
  },
]

const TOTAL_ITEMS = CATEGORIES.reduce((sum, c) => sum + c.items.length, 0)

// ── Mini ring SVG ─────────────────────────────────────────────
function MiniRing({ pct }: { pct: number }) {
  const r = 7
  const circ = 2 * Math.PI * r
  const offset = circ * (1 - pct / 100)
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" className="flex-shrink-0">
      <circle cx="9" cy="9" r={r} fill="none" strokeWidth="2.5" className="stroke-bg-border" />
      <circle
        cx="9" cy="9" r={r} fill="none" strokeWidth="2.5"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="stroke-accent transition-[stroke-dashoffset] duration-500 ease-out"
        style={{ transform: 'rotate(-90deg)', transformOrigin: '9px 9px' }}
      />
    </svg>
  )
}

// ── Checklist item row ─────────────────────────────────────────
interface CheckRowProps {
  item: CheckItem
  isChecked: boolean
  onToggle: () => void
  reduced: boolean
  index: number
}

function CheckRow({ item, isChecked, onToggle, reduced, index }: CheckRowProps) {
  return (
    <m.div
      initial={reduced ? undefined : { opacity: 0, y: 6 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut', delay: reduced ? 0 : index * 0.04 }}
    >
      <label className="group flex items-start gap-3 px-3 py-3 rounded cursor-pointer hover:bg-bg-surface transition-colors duration-150 select-none">
        <input
          type="checkbox"
          className="sr-only"
          checked={isChecked}
          onChange={onToggle}
          aria-label={item.text}
        />
        {/* Custom checkbox — sits at top of the two-line label */}
        <span
          aria-hidden="true"
          className={[
            'mt-[3px] flex-shrink-0 w-[17px] h-[17px] rounded border flex items-center justify-center transition-all duration-200',
            isChecked
              ? 'bg-accent border-accent'
              : 'border-bg-border group-hover:border-accent/60 bg-transparent',
          ].join(' ')}
        >
          {isChecked && (
            <Check size={10} strokeWidth={3.5} className="text-bg-base" aria-hidden="true" />
          )}
        </span>
        {/* Label — primary text + consistent supporting note */}
        <span className="flex-1 min-w-0">
          <span className={[
            'block text-[14px] leading-snug font-medium transition-colors duration-150',
            isChecked
              ? 'text-text-muted line-through decoration-text-muted/40'
              : 'text-text-primary',
          ].join(' ')}>
            {item.text}
          </span>
          {item.note && (
            <span className="block text-[13px] leading-relaxed text-text-secondary mt-1" style={{ textDecoration: 'none' }}>
              {item.note}
            </span>
          )}
        </span>
      </label>
    </m.div>
  )
}

// ── Category section ───────────────────────────────────────────
interface CategorySectionProps {
  category: Category
  checked: Set<string>
  onToggle: (id: string) => void
  reduced: boolean
  showHeading: boolean
}

function CategorySection({ category, checked, onToggle, reduced, showHeading }: CategorySectionProps) {
  const checkedCount = category.items.filter((i) => checked.has(i.id)).length
  const pct = category.items.length > 0 ? Math.round((checkedCount / category.items.length) * 100) : 0

  return (
    <m.section
      key={category.id}
      aria-label={category.title}
      initial={reduced ? undefined : { opacity: 0, y: 10 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      {showHeading && (
        <div className="flex items-center gap-3 mb-3">
          <MiniRing pct={pct} />
          <h2 className="font-display font-bold text-[1.375rem] leading-none text-accent/70">
            {category.title}
          </h2>
          <div className="flex-1 h-px bg-bg-border" aria-hidden="true" />
          <span className="font-mono text-[11px] text-text-muted tabular-nums flex-shrink-0">
            {checkedCount}/{category.items.length}
          </span>
        </div>
      )}
      <div className="rounded-card border border-bg-border overflow-hidden">
        {category.items.map((item, i) => (
          <div key={item.id} className={i > 0 ? 'border-t border-bg-border' : ''}>
            <CheckRow
              item={item}
              isChecked={checked.has(item.id)}
              onToggle={() => onToggle(item.id)}
              reduced={reduced}
              index={i}
            />
          </div>
        ))}
      </div>
    </m.section>
  )
}

// ── Main page ──────────────────────────────────────────────────
export default function KBChecklistPage() {
  const reduced = useReducedMotion()
  const [checked, setChecked] = useState<Set<string>>(new Set())
  const [exporting, setExporting] = useState(false)

  const checkedCount = checked.size
  const pct = Math.round((checkedCount / TOTAL_ITEMS) * 100)

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  const handleReset = useCallback(() => {
    setChecked(new Set())
  }, [])

  const handleExport = useCallback(async () => {
    setExporting(true)
    try {
      const ExcelJS = (await import('exceljs')).default
      const wb = new ExcelJS.Workbook()
      const ws = wb.addWorksheet('Pre-Release Checklist')

      ws.columns = [
        { width: 22 },
        { width: 68 },
        { width: 14 },
        { width: 35 },
      ]

      ws.addRow(['Project:', ''])
      ws.addRow(['Tester Name:', ''])
      ws.addRow(['Release ID:', ''])
      ws.addRow([])
      ws.addRow(['Category', 'Item', 'Status', 'Notes'])

      for (const cat of CATEGORIES) {
        for (const item of cat.items) {
          ws.addRow([
            cat.title,
            item.text,
            checked.has(item.id) ? 'Checked' : 'Not checked',
            '',
          ])
        }
      }

      const buffer = await wb.xlsx.writeBuffer()
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'pre-release-checklist.xlsx'
      a.click()
      URL.revokeObjectURL(url)
    } finally {
      setExporting(false)
    }
  }, [checked])


  return (
    <>
      <SEOHead
        title="Pre-Release Testing Checklist | Nick Shaw"
        description="A practical, interactive pre-release testing checklist covering functional, accessibility, performance, security and more. Export your results to Excel."
        canonicalUrl="/knowledge-base/testing-checklist"
        jsonLd={webPageSchema({
          name: 'Pre-Release Testing Checklist',
          description: 'A practical, interactive pre-release testing checklist covering functional, accessibility, performance, security and more. Export your results to Excel.',
          url: '/knowledge-base/testing-checklist',
        })}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-12">

        {/* ── Back link ────────────────────────────── */}
        <div className="mb-6">
          <Link
            to="/knowledge-base"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-text-muted hover:text-link transition-colors duration-150"
          >
            <ArrowLeft size={12} /> Back to Knowledge Base
          </Link>
        </div>

        {/* ── Page header ──────────────────────────── */}
        <m.header
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mb-6"
        >
          <div className="mb-3">
            <span className="inline-flex items-center font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-tag bg-[#f59e0b1a] text-[#f59e0b]">
              Reference
            </span>
          </div>
          <h1 className="font-display font-bold text-[clamp(1.6rem,3.5vw,2.25rem)] text-text-primary leading-tight tracking-[-0.02em] mb-3">
            Testing Checklist
          </h1>
          <p className="text-text-secondary text-[15px] leading-relaxed">
            A practical pre-release sign-off checklist covering the key test dimensions. Work through each item, then export your results to Excel for sign-off or audit evidence.
          </p>
        </m.header>

        {/* ── Mobile: progress strip ────────────────── */}
        <m.div
          initial={reduced ? undefined : { opacity: 0, y: 8 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut', delay: 0.1 }}
          className="md:hidden flex items-center gap-4 py-5 border-y border-bg-border mb-8"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-3 mb-2">
              <span className="font-mono text-[11px] tracking-widest uppercase text-text-muted">
                {checkedCount} of {TOTAL_ITEMS} items
              </span>
              <span className="font-mono text-[13px] font-bold text-accent tabular-nums">{pct}%</span>
            </div>
            <div
              className="h-1.5 bg-bg-border rounded-full overflow-hidden"
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Overall checklist progress"
            >
              <div className="h-full bg-accent rounded-full transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <button
            onClick={handleReset}
            disabled={checkedCount === 0}
            aria-label="Reset all items"
            className="flex-shrink-0 inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-pill border border-bg-border text-text-muted hover:text-text-secondary hover:border-text-muted/30 transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <RotateCcw size={11} aria-hidden="true" /> Reset
          </button>
        </m.div>

        {/* ── Two-column layout ─────────────────────── */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">

          {/* Left: tabs + checklist */}
          <div className="flex-1 min-w-0">

            {/* Checklist */}
            <div className="space-y-8">
              {CATEGORIES.map((category) => (
                <CategorySection
                  key={category.id}
                  category={category}
                  checked={checked}
                  onToggle={toggle}
                  reduced={reduced}
                  showHeading={true}
                />
              ))}
            </div>

            {/* Mobile: export */}
            <div className="md:hidden mt-10 bg-bg-surface border border-bg-border rounded-card p-5 space-y-4">
              <p className="font-mono text-[11px] text-text-muted leading-relaxed" role="status" aria-live="polite">
                {checkedCount === TOTAL_ITEMS
                  ? 'All items signed off — ready to export'
                  : `${TOTAL_ITEMS - checkedCount} item${TOTAL_ITEMS - checkedCount !== 1 ? 's' : ''} remaining before export is available`}
              </p>
              <button
                onClick={handleExport}
                disabled={checkedCount < TOTAL_ITEMS || exporting}
                aria-label="Export checklist to Excel"
                className="w-full inline-flex items-center justify-center gap-1.5 font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-pill border border-accent text-text-primary bg-accent/10 hover:bg-accent/20 transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Download size={11} aria-hidden="true" />
                {exporting ? 'Exporting…' : 'Export .xlsx'}
              </button>
            </div>

          </div>

          {/* Right: sticky console — desktop only */}
          <m.aside
            initial={reduced ? undefined : { opacity: 0, x: 12 }}
            animate={reduced ? undefined : { opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut', delay: 0.2 }}
            className="hidden md:block w-64 flex-shrink-0 sticky top-[88px] self-start"
            aria-label="Checklist progress and actions"
          >
            <div className="bg-bg-surface border border-bg-border rounded-card p-5 space-y-5">

              {/* Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-[10px] tracking-widest uppercase text-text-muted">Progress</span>
                  <span className="font-mono text-[13px] font-bold text-accent tabular-nums">{pct}%</span>
                </div>
                <div
                  className="h-1.5 bg-bg-border rounded-full overflow-hidden"
                  role="progressbar"
                  aria-valuenow={pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label="Overall checklist progress"
                >
                  <div className="h-full bg-accent rounded-full transition-all duration-500 ease-out" style={{ width: `${pct}%` }} />
                </div>
                <p className="font-mono text-[11px] text-text-muted mt-2">
                  {checkedCount} of {TOTAL_ITEMS} items checked
                </p>
              </div>

              <div className="h-px bg-bg-border" />

              {/* Reset */}
              <button
                onClick={handleReset}
                disabled={checkedCount === 0}
                aria-label="Reset all items"
                className="w-full inline-flex items-center justify-center gap-1.5 font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-pill border border-bg-border text-text-muted hover:text-text-secondary hover:border-text-muted/30 transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <RotateCcw size={11} aria-hidden="true" /> Reset
              </button>

              <div className="h-px bg-bg-border" />

              {/* Completion or hint */}
              <AnimatePresence mode="wait">
                {checkedCount === TOTAL_ITEMS ? (
                  <m.div
                    key="complete"
                    initial={reduced ? undefined : { opacity: 0, y: 6 }}
                    animate={reduced ? undefined : { opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: 6 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex items-center gap-3"
                    role="status"
                    aria-live="polite"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                      <Check size={12} strokeWidth={3} className="text-emerald-400" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-display font-semibold text-[13px] text-text-primary leading-snug">All items signed off</p>
                      <p className="font-mono text-[10px] text-text-secondary mt-0.5">Ready to export</p>
                    </div>
                  </m.div>
                ) : (
                  <m.p
                    key="remaining"
                    initial={reduced ? undefined : { opacity: 0 }}
                    animate={reduced ? undefined : { opacity: 1 }}
                    exit={reduced ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-mono text-[11px] text-text-muted leading-relaxed"
                  >
                    {TOTAL_ITEMS - checkedCount} item{TOTAL_ITEMS - checkedCount !== 1 ? 's' : ''} remaining before export is available
                  </m.p>
                )}
              </AnimatePresence>

              <div className="h-px bg-bg-border" />

              {/* Export */}
              <button
                onClick={handleExport}
                disabled={checkedCount < TOTAL_ITEMS || exporting}
                aria-label="Export checklist to Excel"
                className="w-full inline-flex items-center justify-center gap-1.5 font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-pill border border-accent text-text-primary bg-accent/10 hover:bg-accent/20 transition-colors duration-150 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Download size={11} aria-hidden="true" />
                {exporting ? 'Exporting…' : 'Export .xlsx'}
              </button>

            </div>
          </m.aside>

        </div>

        {/* ── Footer link ──────────────────────────── */}
        <div className="mt-16 pt-8 border-t border-bg-border">
          <Link
            to="/knowledge-base"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-text-muted hover:text-link transition-colors duration-150"
          >
            <ArrowLeft size={12} /> Back to Knowledge Base
          </Link>
        </div>

      </div>
    </>
  )
}

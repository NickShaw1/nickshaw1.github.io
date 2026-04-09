import React, { useState } from 'react'
import type { ComponentType } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import {
  BookOpen, Hand, ClipboardList, Bot, FlaskConical, Activity,
  Sparkles, Wrench, Lightbulb,
  Play, Globe,
  BookMarked, CheckSquare, HelpCircle,
  Construction, ArrowUpRight, Clock, Cpu, FileText,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { collectionPageSchema } from '../seo/structured-data'
import SectionLabel from '../components/SectionLabel'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { prefetchSection } from '../data/kb'

interface KBCard {
  title: string
  blurb: string
  icon: ComponentType<{ size?: number; className?: string }>
  href?: string
  readingMins?: number
  articleCount?: number
}

// ── Icon colours per section type ─────────────────────────
const THEORY_COLOUR  = 'text-[#60a5fa]'
const GUIDES_COLOUR  = 'text-[#E2574C]'
const REF_COLOUR     = 'text-[#f59e0b]'

const THEORY: KBCard[] = [
  { title: 'Foundations',         icon: BookOpen,      blurb: 'The theory, history and core principles of software testing.',                   href: '/knowledge-base/foundations/what-is-software-testing',              readingMins: 49,  articleCount: 10 },
  { title: 'Manual Testing',      icon: Hand,          blurb: 'Exploratory testing, bug reporting, defect management and usability testing.',    href: '/knowledge-base/manual-testing/introduction-to-manual-testing',     readingMins: 37,  articleCount: 7  },
  { title: 'Test Management',     icon: ClipboardList, blurb: 'Test planning, risk prioritisation, compliance and stakeholder communication.',   href: '/knowledge-base/test-management/test-planning-and-strategy',        readingMins: 37,  articleCount: 9  },
  { title: 'Automation',          icon: Bot,           blurb: 'Test automation concepts, patterns and practices across the full pyramid.',       href: '/knowledge-base/automation/introduction-to-test-automation',        readingMins: 64,  articleCount: 14 },
  { title: 'Specialist Testing',  icon: FlaskConical,  blurb: 'In-depth coverage of API, performance, security, mobile and beyond.',            href: '/knowledge-base/specialist-testing/api-testing',                    readingMins: 67,  articleCount: 14 },
  { title: 'Observability',       icon: Activity,      blurb: 'Monitoring, alerting, feature flags and production quality signals.',             href: '/knowledge-base/observability/logs-metrics-and-traces',             readingMins: 25,  articleCount: 5  },
  { title: 'AI & Modern Testing', icon: Sparkles,      blurb: 'How AI changes testing and how to test AI systems.',                             href: '/knowledge-base/ai-and-modern-testing/software-testing-in-the-age-of-ai', readingMins: 44, articleCount: 7 },
  { title: 'Tooling',             icon: Wrench,        blurb: 'Practical guides to the tools powering modern testing workflows.',               href: '/knowledge-base/tooling/browser-and-e2e-tools',                     readingMins: 49,  articleCount: 9  },
  { title: 'Concepts',            icon: Lightbulb,     blurb: 'Strategy, good tests, legacy codebases and setting up CI/CD.',                  href: '/knowledge-base/concepts/writing-good-tests',                       readingMins: 21,  articleCount: 4  },
]

const GUIDES: KBCard[] = [
  { title: 'Playwright Guide',        icon: Play,  blurb: 'From zero to a production-ready test suite using the Playwright framework.',  href: '/knowledge-base/playwright/introduction',                              readingMins: 137, articleCount: 10 },
  { title: 'Playwright API Testing',  icon: Globe, blurb: 'Test REST APIs, mock network calls and seed test data.',                      href: '/knowledge-base/playwright-api-testing/what-is-api-testing',          readingMins: 75,  articleCount: 6  },
  { title: 'Playwright MCP & AI',     icon: Cpu,   blurb: 'Generate, debug and maintain tests using AI and MCP.',                       href: '/knowledge-base/playwright-mcp/what-is-mcp',                          readingMins: 100, articleCount: 9  },
]

const REFERENCE: KBCard[] = [
  { title: 'Glossary',          icon: BookMarked,    blurb: 'Definitions for common testing terms, acronyms and concepts.', href: '/knowledge-base/glossary' },
  { title: 'Testing Checklist', icon: CheckSquare,   blurb: 'A practical pre-release checklist covering all major test dimensions.', href: '/knowledge-base/testing-checklist' },
  { title: 'Testing Resources',  icon: HelpCircle,    blurb: 'Certifications, courses, tools and communities for software testing professionals.', href: '/knowledge-base/testing-resources' },
]

function KBCard({ card, iconColour, section, delay, reduced }: { card: KBCard; iconColour: string; section: string; delay: number; reduced: boolean }) {
  const Icon = card.icon
  return (
    <m.article
      initial={reduced ? undefined : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: reduced ? 0 : delay / 1000 }}
      className="group relative flex flex-col bg-bg-surface border border-bg-border rounded-card p-5 h-full min-h-[160px] hover:border-accent/30 transition-colors duration-150"
      onMouseEnter={() => {
        if (card.href) {
          const slug = card.href.split('/')[2]
          if (slug) prefetchSection(slug)
        }
      }}
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-display font-medium text-[17px] text-text-primary leading-snug flex items-center gap-2 min-w-0">
          <Icon size={15} className={`${iconColour} flex-shrink-0`} />
          <span className="truncate">{card.title}</span>
        </h3>
        <span className="flex-shrink-0 font-mono text-[10px] tracking-wider uppercase text-text-muted border border-bg-border rounded-tag px-1.5 py-0.5 mt-0.5">
          {section}
        </span>
      </div>

      <div className="flex-1">
        <p className="text-text-secondary text-sm leading-relaxed">
          {card.blurb}
        </p>
      </div>

      <div className="border-t border-bg-border pt-3 mt-4 flex items-center justify-between">
        {card.readingMins ? (
          <span className="flex items-center gap-2 font-mono text-[10px] text-text-muted">
            <span className="flex items-center gap-1">
              <Clock size={10} aria-hidden="true" />
              {card.readingMins} min read
            </span>
            {card.articleCount != null && (
              <>
                <span className="text-text-muted/30">·</span>
                <span className="flex items-center gap-1">
                  <FileText size={10} aria-hidden="true" />
                  {card.articleCount} art.
                </span>
              </>
            )}
          </span>
        ) : (
          <span />
        )}
        {card.href ? (
          <Link
            to={card.href}
            aria-label={card.title}
            className="flex items-center gap-1 group-hover:gap-1.5 font-mono text-[11px] tracking-wide text-link hover:text-link/80 transition-all duration-150 after:absolute after:inset-0"
          >
            View details <ArrowUpRight size={12} aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        ) : (
          <span className="text-text-muted font-mono text-[11px] tracking-wide flex items-center gap-1.5">
            <Construction size={12} className="flex-shrink-0" />
            In development
          </span>
        )}
      </div>
    </m.article>
  )
}

type TabKey = 'All' | 'Theory' | 'Guides' | 'Reference'
const TABS: TabKey[] = ['All', 'Guides', 'Reference', 'Theory']

const SECTIONS: { key: Exclude<TabKey, 'All'>; colour: string; cards: KBCard[] }[] = [
  { key: 'Theory',    colour: THEORY_COLOUR,  cards: THEORY    },
  { key: 'Guides',    colour: GUIDES_COLOUR,  cards: GUIDES    },
  { key: 'Reference', colour: REF_COLOUR,     cards: REFERENCE },
]

export default function KnowledgeBase() {
  const reduced = useReducedMotion()
  const [activeTab, setActiveTab] = useState<TabKey>('All')

  const visible = SECTIONS.filter((s) => activeTab === 'All' || s.key === activeTab)

  return (
    <>
      <SEOHead
        title="Software Testing Knowledge Base | Nick Shaw"
        description="A wiki-style knowledge base covering software testing theory, practical tool guides and quick-reference material, by Nick Shaw."
        canonicalUrl="/knowledge-base"
        jsonLd={collectionPageSchema({
          name: 'Software Testing Knowledge Base',
          description: 'A wiki-style knowledge base covering software testing theory, practical tool guides and quick-reference material, by Nick Shaw.',
          url: '/knowledge-base',
        })}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16">

        {/* ── Header ──────────────────────────────────────── */}
        <m.div
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-10"
        >
          <SectionLabel>Knowledge Base</SectionLabel>
          <h1 className="font-display font-bold text-[clamp(2rem,5vw,3rem)] text-text-primary leading-tight tracking-[-0.02em] mb-4">
            Software Testing.
          </h1>
          <p className="text-text-secondary text-[15px] leading-relaxed">
            A structured reference covering testing theory, practical tool guides and quick-reference material. Currently in development.
          </p>
        </m.div>

        {/* ── Tabs ────────────────────────────────────────── */}
        <m.div
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
          className="hidden sm:flex flex-wrap gap-2 mb-10"
          role="group"
          aria-label="Filter by section"
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`
                flex-shrink-0 font-mono text-[10px] tracking-widest uppercase
                px-3 py-1.5 rounded-pill border
                transition-colors duration-150
                ${activeTab === tab
                  ? 'border-accent text-accent bg-accent/10'
                  : 'border-bg-border text-text-muted hover:text-text-secondary hover:border-text-muted/30'}
              `}
              aria-pressed={activeTab === tab}
            >
              {tab}
            </button>
          ))}
        </m.div>

        {/* ── Unified card grid ────────────────────────────── */}
        <AnimatePresence mode="wait">
        <m.div
          key={activeTab}
          initial={reduced ? undefined : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 [&>article]:min-h-[180px]">
          {visible.map((section, si) => {
            let cardIndex = 0
            visible.slice(0, si).forEach((s) => { cardIndex += s.cards.length })
            return (
              <React.Fragment key={section.key}>
                {/* Section heading spans full width */}
                <m.div
                  key={`heading-${section.key}`}
                  initial={reduced ? undefined : { opacity: 0, y: 16 }}
                  whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="col-span-full"
                >
                  <h2 className="font-mono text-[11px] tracking-widest uppercase text-text-muted border-b border-bg-border pb-3">
                    {section.key}
                    <span className="ml-2 text-accent">{section.cards.length}</span>
                  </h2>
                </m.div>

                {/* Cards */}
                {section.cards.map((card, i) => (
                  <KBCard
                    key={card.title}
                    card={card}
                    iconColour={section.colour}
                    section={section.key}
                    delay={cardIndex + i * 70}
                    reduced={reduced}
                  />
                ))}
              </React.Fragment>
            )
          })}
        </div>
        </m.div>
        </AnimatePresence>

      </div>
    </>
  )
}

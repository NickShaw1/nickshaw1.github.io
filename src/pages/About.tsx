import { useEffect, useRef, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Dog, Download, ExternalLink, User } from 'lucide-react'
import pippinImg from '../assets/pippin.jpg'
import nickImg from '../assets/nick-diner.jpg'
import { m } from 'framer-motion'
import SEOHead from '../components/SEOHead'
import { webPageSchema } from '../seo/structured-data'
import SectionLabel from '../components/SectionLabel'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { meta } from '../data/meta'

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g

function renderInlineLinks(text: string): ReactNode {
  const parts: ReactNode[] = []
  let last = 0
  let match: RegExpExecArray | null
  LINK_RE.lastIndex = 0
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    const isExternal = /^https?:\/\//.test(match[2])
    parts.push(
      isExternal ? (
        <a key={match.index} href={match[2]} target="_blank" rel="noopener noreferrer"
          className="text-link hover:text-link/80 transition-colors duration-150">
          {match[1]}
        </a>
      ) : (
        <Link key={match.index} to={match[2]}
          className="text-link hover:text-link/80 transition-colors duration-150">
          {match[1]}
        </Link>
      )
    )
    last = match.index + match[0].length
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

const SECTIONS = [
  { id: 'im-nick',      label: 'About me'     },
  { id: 'experience',   label: 'Experience'   },
  { id: 'learning',     label: 'Learning'     },
  { id: 'outside-work', label: 'Outside Work' },
  { id: 'writing',      label: 'Writing'      },
  { id: 'adventures',   label: 'Adventures'   },
] as const

const ROLES = [
  { title: 'Head of QA',         company: 'Cloudbooking',      period: '2025' },
  { title: 'Test Manager',       company: 'ITS Computing Ltd', period: '2021 – 2024' },
  { title: 'Senior QA Engineer', company: 'HHA Exchange',      period: '2019 – 2021' },
  { title: 'QA Engineer',        company: 'Flowlens',          period: '2017 – 2019' },
  { title: 'UK QA Lead',         company: 'Concentrix',        period: '2013 – 2016' },
] as const

type SectionId = typeof SECTIONS[number]['id']

function Divider() {
  return <hr className="border-0 border-t border-bg-border my-8 sm:my-12" />
}

interface SectionBlockProps {
  id: SectionId
  label: string
  heading: string
  children: React.ReactNode
  reduced: boolean
  noYOffset?: boolean
  card?: React.ReactNode
}

function SectionBlock({ id, label, heading, children, reduced, noYOffset, card }: SectionBlockProps) {
  return (
    <m.section
      id={id}
      aria-labelledby={`${id}-heading`}
      initial={reduced ? undefined : { opacity: 0, y: noYOffset ? 0 : 24 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
      className="scroll-mt-[88px] m-0"
    >
      <SectionLabel>{label}</SectionLabel>
      {card ? (
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-6 items-center">
          <div className="flex-1 min-w-0">
            <h2
              id={`${id}-heading`}
              className="font-display font-semibold text-[clamp(1.5rem,3vw,2rem)] text-text-primary leading-tight tracking-[-0.02em] mb-6"
            >
              {heading}
            </h2>
            {children}
          </div>
          {card}
        </div>
      ) : (
        <>
          <h2
            id={`${id}-heading`}
            className="font-display font-semibold text-[clamp(1.5rem,3vw,2rem)] text-text-primary leading-tight tracking-[-0.02em] mb-6"
          >
            {heading}
          </h2>
          {children}
        </>
      )}
    </m.section>
  )
}

function ProfileCard({ src, alt, name, icon, iconColour, rows, imgClass = 'object-cover object-top' }: {
  src: string
  alt: string
  name: string
  icon: React.ReactNode
  iconColour: string
  rows: readonly (readonly [string, string])[]
  imgClass?: string
}) {
  return (
    <div className="w-full sm:flex-shrink-0 sm:w-48 bg-accent/[0.06] border border-bg-border rounded-card overflow-hidden">
      <img src={src} alt={alt} loading="lazy" className={`w-full aspect-[4/3] sm:aspect-auto sm:h-32 ${imgClass}`} />
      <div className="px-3 py-3">
        <div className={`flex items-center gap-2 mb-2 pb-2 border-b border-bg-border ${iconColour}`}>
          {icon}
          <span className="font-display font-medium text-[15px] text-text-primary">{name}</span>
        </div>
        <div className="divide-y divide-bg-border">
          {rows.map(([label, value]) => (
            <div key={label} className="flex items-center justify-between py-1.5">
              <span className="font-mono text-[10px] tracking-widest uppercase text-text-muted">{label}</span>
              <span className="font-mono text-[11px] text-text-secondary">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function About() {
  const reduced             = useReducedMotion()
  const [active, setActive] = useState<SectionId>('im-nick')
  const observerRef         = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    observerRef.current?.disconnect()
    const els = SECTIONS.map(({ id }) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id as SectionId)
        }
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0 },
    )
    els.forEach((el) => observerRef.current!.observe(el))

    function onScroll() {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 40
      if (scrolledToBottom) setActive('adventures')
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      observerRef.current?.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  function scrollTo(id: SectionId) {
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <>
      <SEOHead
        title={meta.seo.about.title}
        description={meta.seo.about.description}
        canonicalUrl="/about"
        jsonLd={webPageSchema({
          name: 'About Nick Shaw',
          description: meta.seo.about.description,
          url: '/about',
        })}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-10 md:py-16 lg:flex lg:gap-16">

        {/* ── Sidebar nav (desktop) ─────────────────────── */}
        <aside className="hidden lg:block w-36 flex-shrink-0" aria-label="Page sections">
          <nav className="sticky top-[92px]">
            <ul className="space-y-3 list-none p-0 m-0" role="list">
              {SECTIONS.map(({ id, label }) => (
                <li key={id} className="flex">
                  <button
                    onClick={() => scrollTo(id)}
                    className={`
                      text-left w-full font-mono text-[12px] tracking-wider uppercase
                      transition-colors duration-150 leading-snug
                      ${active === id ? 'text-accent' : 'text-text-muted hover:text-text-secondary'}
                    `}
                    aria-current={active === id ? 'location' : undefined}
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>


        {/* ── Main content ──────────────────────────────── */}
        <article className="flex-1 min-w-0 m-0 p-0">
          <h1 className="sr-only">About Nick Shaw</h1>

          {/* ── I'm Nick ──────────────────────────────────── */}
          <SectionBlock id="im-nick" label="About me" heading="I'm Nick." reduced={reduced} noYOffset
            card={
              <ProfileCard
                src={nickImg}
                alt="Nick Shaw"
                name="Nick Shaw"
                icon={<User size={16} />}
                iconColour="text-accent"
                imgClass="object-cover object-[center_10%]"
                rows={[['Field', 'QA & Delivery'], ['Based', 'County Down'], ['Experience', '12 years']]}
              />
            }
          >
            {meta.aboutSections.imNick.split('\n\n').map((para, i) => (
              <p key={i} className="text-text-secondary text-[15px] leading-[1.85] mb-4 last:mb-0">
                {para}
              </p>
            ))}
          </SectionBlock>

          <Divider />

          {/* ── Experience ────────────────────────────────── */}
          <SectionBlock id="experience" label="Experience" heading="Where I've worked." reduced={reduced}>
            <div className="bg-bg-surface border border-bg-border rounded-card p-5 sm:p-6">

              {/* Top: career history + certs/courses */}
              <div className="flex flex-col sm:flex-row gap-0">

                {/* Left — career history */}
                <div className="flex-1 min-w-0 sm:pr-8 flex flex-col pb-8 sm:pb-0">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Career History</p>
                  <div className="flex-1">
                    {ROLES.map((role) => (
                      <div key={role.title + role.company} className="group flex items-stretch gap-3 py-2.5">
                        <div className="w-0.5 bg-[#fbbf24]/30 group-hover:bg-[#fbbf24] flex-shrink-0 transition-colors duration-150" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="font-display font-semibold text-[13px] sm:text-[14px] text-text-primary leading-snug">{role.title}</span>
                            <span className="font-mono text-[11px] text-text-muted flex-shrink-0">{role.period}</span>
                          </div>
                          <span className="font-mono text-[11px] text-text-muted mt-0.5 block">{role.company}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex sm:flex-wrap gap-2">
                    <Link
                      to="/cv"
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 font-mono text-[11px] tracking-widest uppercase border border-accent text-text-primary bg-accent/10 px-4 py-2 rounded-pill hover:bg-accent/20 transition-colors duration-150"
                    >
                      <ExternalLink size={12} />
                      View CV
                    </Link>
                    <a
                      href="/Nick_Shaw_CV.pdf"
                      download
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 font-mono text-[11px] tracking-widest uppercase border border-bg-border text-text-muted px-4 py-2 rounded-pill hover:text-text-secondary hover:border-text-muted/30 transition-colors duration-150"
                    >
                      <Download size={12} />
                      PDF
                    </a>
                  </div>
                </div>

                {/* Right — certs & courses */}
                <div className="flex-1 flex flex-col gap-6 sm:pl-8 border-t sm:border-t-0 sm:border-l border-bg-border pt-8 sm:pt-0">
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Certifications</p>
                    {([
                      { name: 'ISTQB Foundation',   issuer: 'ISTQB',          year: '2013' },
                      { name: 'CSM ScrumMaster',    issuer: 'Scrum Alliance', year: '2025' },
                      { name: 'CSPO Product Owner', issuer: 'Scrum Alliance', year: '2025' },
                    ] as const).map((c) => (
                      <div key={c.name} className="group flex items-stretch gap-3 py-2.5">
                        <div className="w-0.5 bg-accent/30 group-hover:bg-accent flex-shrink-0 transition-colors duration-150" />
                        <div className="flex-1 flex items-baseline justify-between gap-2">
                          <div>
                            <p className="font-display font-medium text-[13px] text-text-primary leading-snug">{c.name}</p>
                            <p className="font-mono text-[10px] text-text-muted mt-0.5">{c.issuer}</p>
                          </div>
                          <span className="font-mono text-[11px] text-text-muted flex-shrink-0">{c.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Courses</p>
                    {([
                      { name: 'Claude 101',            issuer: 'Anthropic', year: '2026' },
                      { name: 'Claude Code in Action', issuer: 'Anthropic', year: '2026' },
                      { name: 'Agent Skills',          issuer: 'Anthropic', year: '2026' },
                    ] as const).map((c) => (
                      <div key={c.name} className="group flex items-stretch gap-3 py-2.5">
                        <div className="w-0.5 bg-[#ff2d9b]/40 group-hover:bg-[#ff2d9b] flex-shrink-0 transition-colors duration-150" />
                        <div className="flex-1 flex items-baseline justify-between gap-2">
                          <div>
                            <p className="font-display font-medium text-[13px] text-text-primary leading-snug">{c.name}</p>
                            <p className="font-mono text-[10px] text-text-muted mt-0.5">{c.issuer}</p>
                          </div>
                          <span className="font-mono text-[11px] text-text-muted flex-shrink-0">{c.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom — education + skills */}
              <div className="mt-6 pt-6 border-t border-bg-border flex flex-col sm:flex-row gap-8">
                <div className="sm:w-56 flex-shrink-0">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Education</p>
                  {([
                    { degree: 'MA Creative Writing', grade: 'Merit', institution: "Queen's University Belfast", year: '2013' },
                    { degree: 'BA (Hons) English',   grade: '2:1',   institution: "Queen's University Belfast", year: '2010' },
                  ] as const).map((e) => (
                    <div key={e.degree} className="group flex items-stretch gap-3 py-2.5">
                      <div className="w-0.5 bg-[#1d4ed8]/40 group-hover:bg-[#1d4ed8] flex-shrink-0 transition-colors duration-150" />
                      <div className="flex-1 flex items-baseline justify-between gap-2">
                        <div>
                          <p className="font-display font-medium text-[13px] text-text-primary leading-snug">{e.degree}</p>
                          <p className="font-mono text-[10px] text-text-muted mt-0.5">{e.institution}</p>
                          <p className="font-mono text-[10px] text-text-muted">{e.grade}</p>
                        </div>
                        <span className="font-mono text-[11px] text-text-muted flex-shrink-0">{e.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex-1 flex flex-col gap-4 min-w-0">
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">Skills for Work</p>
                    <p className="font-mono text-[11px] text-text-secondary leading-relaxed break-words">
                      QA Strategy · Test Management · Delivery Management · Agile · Stakeholder Management · Quality Governance · Risk-based Testing · Defect Management · API Testing · Playwright · Azure DevOps · AI-assisted Delivery
                    </p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">Skills for Fun</p>
                    <p className="font-mono text-[11px] text-text-secondary leading-relaxed break-words">
                      Claude · React · Tailwind · Vite · Git · Python · Node.js · Selenium · Jenkins
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </SectionBlock>

          <Divider />

          {/* ── Learning ──────────────────────────────────── */}
          <SectionBlock id="learning" label="Learning" heading="What I'm learning." reduced={reduced}>
            {meta.aboutSections.learning.split('\n\n').map((para, i) => (
              <p key={i} className="text-text-secondary text-[15px] leading-[1.85] mb-4 last:mb-0">
                {renderInlineLinks(para)}
              </p>
            ))}
          </SectionBlock>

          <Divider />

          {/* ── Outside Work ──────────────────────────────── */}
          <SectionBlock id="outside-work" label="Outside Work" heading="Life outside the office." reduced={reduced}
            card={
              <ProfileCard
                src={pippinImg}
                alt="Pippin"
                name="Pippin"
                icon={<Dog size={16} />}
                iconColour="text-[#fbbf24]"
                imgClass="object-cover object-[center_45%]"
                rows={[['Breed', 'Cavapoo'], ['Age', '6 months'], ['Fav. food', 'Yoghurt'], ['Hobbies', 'Walks, Toys']]}
              />
            }
          >
            {meta.aboutSections.outsideWork.split('\n\n').map((para, i) => (
              <p key={i} className="text-text-secondary text-[15px] leading-[1.85] mb-4 last:mb-0">
                {para}
              </p>
            ))}
          </SectionBlock>

          <Divider />

          {/* ── Writing ───────────────────────────────────── */}
          <SectionBlock id="writing" label="Writing" heading="Creative writing." reduced={reduced}>
            {meta.aboutSections.writing.split('\n\n').map((para, i) =>
              para.startsWith('> ') ? (
                <blockquote key={i} className="border-l-[3px] border-accent pl-4 my-5 text-text-secondary text-[15px] leading-[1.85] italic">
                  {renderInlineLinks(para.slice(2))}
                </blockquote>
              ) : (
                <p key={i} className="text-text-secondary text-[15px] leading-[1.85] mb-4 last:mb-0">
                  {renderInlineLinks(para)}
                </p>
              )
            )}
          </SectionBlock>

          <Divider />

          {/* ── Adventures ────────────────────────────────── */}
          <SectionBlock id="adventures" label="Adventures" heading="Where I've been." reduced={reduced}>
            {meta.aboutSections.adventures.split('\n\n').map((para, i) => (
              <p key={i} className="text-text-secondary text-[15px] leading-[1.85] mb-4 last:mb-0">
                {para}
              </p>
            ))}
          </SectionBlock>

        </article>
      </div>
    </>
  )
}

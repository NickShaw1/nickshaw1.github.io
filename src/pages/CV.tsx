import { m } from 'framer-motion'
import {
  Download, MapPin, ArrowLeft,
  User, Zap, Briefcase, Clock, Code2, Award, BookOpen, GraduationCap,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { profilePageSchema } from '../seo/structured-data'

/* ── One unique colour per section ─────────────────────────────── */
const C = {
  summary:    '#0AFF9D', // green
  competencies: '#F5A623', // amber
  experience: '#60a5fa', // blue
  earlier:    '#a78bfa', // violet
  projects:   '#fb7185', // rose
  certs:      '#34d399', // emerald
  profdev:    '#22d3ee', // cyan
  education:  '#e879f9', // fuchsia
} as const

/* ── Data ───────────────────────────────────────────────────────── */
const ROLES = [
  {
    title:    'Head of QA',
    note:     'Promoted from Lead QA',
    company:  'Cloudbooking',
    location: 'London, UK (Remote)',
    period:   'Mar 2025 – Dec 2025',
    summary:  'Directed QA strategy, delivery operations and performance across a 17-person SaaS team spanning web, mobile and tablet platforms. Member of the senior management team, collaborating with the C-suite on product and programme strategy.',
    achievements: [
      'Doubled test coverage from 45% to 90% within six months through structured test case development, AI-assisted test generation, shift-left practices and embedding QA in backlog refinement',
      'Reduced manual regression effort by 50% through targeted automation and tightened sprint scope',
      "Overhauled the organisation's Agile delivery approach, improving release cadence from monthly to twice-monthly",
      'Architected Playwright automation frameworks (JavaScript/TypeScript) for critical end-to-end workflows using AI-assisted development, establishing scalable automated regression capability',
      'Implemented accessibility-first delivery (WCAG 2.1), embedding standards into sprint execution and supporting team adoption',
    ],
    closing: 'Operated across the full delivery lifecycle, bridging QA, product ownership and programme governance within a fast-moving SaaS environment. Managed all aspects of team leadership including resourcing, hiring and performance, while maintaining active Scrum Master and Product Owner responsibilities across the roadmap.',
    tools:   'Axe DevTools · Azure DevOps · Claude Code · Google Lighthouse · Jira · Miro · NVDA · OWASP ZAP · Playwright (JavaScript, TypeScript) · Postman · Qase · SQL · Swagger · TestRail · WAV',
  },
  {
    title:    'Test Manager',
    company:  'ITS Computing Ltd',
    location: 'Belfast, UK (Remote)',
    period:   'Jun 2021 – Dec 2024',
    summary:  'Led QA and delivery across a 25-person distributed team spanning the UK and India, owning QA strategy, delivery governance and test lifecycle execution for major national public sector programmes within complex regulatory environments.',
    achievements: [
      'Delivered end-to-end QA strategy and full test lifecycle for national public sector programmes including LPS Rates and Benefits, Insolvency Service GB, NISRA, PBNI and FSNI',
      'Built and scaled test automation capability from scratch, implementing Playwright and TestComplete while increasing regression coverage across all programmes',
      'Standardised QA processes and governance frameworks across concurrent Agile and Waterfall programmes, establishing consistent quality standards across all active public sector accounts',
      'Contributed QA strategy, technical input and risk mitigation to public sector bid and tender submissions',
      'Implemented accessibility-first practices (WCAG 2.1), embedding accessibility standards and delivering team training',
    ],
    closing: 'Maintained Product Owner and Scrum Master responsibilities across concurrent Agile and Waterfall programmes, with additional scope covering performance testing, UAT, change control and pre-release validation across all active programmes.',
    tools:   'Axe DevTools · Azure DevOps · JMeter · Jira · Miro · NVDA · Playwright (JavaScript) · Postman · SQL · Swagger · TestComplete · WAV',
  },
]

const EARLIER = [
  {
    title:    'Senior QA Engineer',
    company:  'HHA Exchange',
    location: 'Belfast, UK',
    period:   'Mar 2019 – Jun 2021',
    points: [
      'BDD automation (SpecFlow/Gherkin), API and end-to-end testing on a large-scale US healthcare SaaS platform (.NET, Angular) within a regulated, distributed environment',
      'Supported sprint planning, backlog refinement and UAT across Agile delivery cycles',
    ],
  },
  {
    title:    'QA Engineer',
    company:  'Flowlens',
    location: 'Belfast, UK',
    period:   'Sept 2017 – Mar 2019',
    points: [
      'Functional and integration testing across SaaS modules built on Ruby on Rails, including Xero and QuickBooks integrations',
      'Produced test documentation and onboarding materials to improve knowledge transfer and support issue resolution',
    ],
  },
  {
    title:    'UK QA Lead',
    note:     'Promoted from Intern through to Senior QA',
    company:  'Concentrix',
    location: 'Belfast, UK',
    period:   'Nov 2013 – Nov 2016',
    points: [
      'Managed a 10-person QA team across .NET CRM SaaS platforms for enterprise clients including Riverbed, Polycom, Symantec and Acronis',
      'Owned end-to-end QA strategy, SDLC governance and defect management, with on-site stakeholder delivery in Boston, New York and San Francisco',
    ],
  },
]

const COMPETENCIES = [
  'QA Strategy, Governance and Test Lifecycle Leadership',
  'Test Automation and Quality Engineering (Playwright, BDD, CI/CD Integration)',
  'AI-Assisted Development and Testing (Claude Code, Playwright MCP, LLM Evaluation)',
  'Multi-Team Leadership, Resourcing and Delivery Management',
  'Agile Delivery and Product Leadership (Scrum Master, Product Owner)',
  'Risk-Based Testing, Defect Management and Regulatory Compliance',
  'Performance, API, Integration and Data Validation',
  'Executive and Stakeholder Engagement and C-Suite Reporting',
]

const PROJECTS = [
  {
    name:        'nickshawqa.com',
    subtitle:    'QA Knowledge Base & Portfolio',
    period:      'Nov 2024 – present',
    description: 'A production site built in React and TypeScript using Claude Code, using Playwright MCP for visual verification and sanity testing throughout. Houses a 105+ article QA knowledge base across 13 structured topic areas, covering the full testing landscape from foundations and manual techniques through to Playwright automation, AI-generated tests, MCP-assisted test execution and LLM evaluation. A portfolio of 15+ projects including:',
    points: [
      "Live Artemis II mission tracker powered by NASA's JPL Horizons API",
      'Live ISS tracker with a custom GLSL atmospheric shader',
      'Polyphonic synthesiser built on the Web Audio API',
      'Playwright test suite and a wider collection of React and TypeScript exercises',
    ],
    closing: 'A self-directed, end-to-end demonstration of technical range, applied AI-assisted development and sustained independent delivery.',
  },
  {
    name:        'asaware.org',
    subtitle:    'Axial SpA Awareness Project',
    period:      'Jan 2026 – present',
    description: 'An informational site raising awareness of Ankylosing Spondylitis, developed in React, TypeScript and Vite. Encompasses independent front-end delivery including hosting, CI/CD and ongoing maintenance.',
    points:  [],
    closing: null,
  },
]

const CERTIFICATIONS = [
  { name: 'Certified Scrum Master (CSM)',         year: '2025' },
  { name: 'Certified Scrum Product Owner (CSPO)', year: '2025' },
  { name: 'ISTQB Foundation Certificate',         year: '2013' },
]

const PROFESSIONAL_DEVELOPMENT = [
  { name: 'Claude Code in Action',        issuer: 'Anthropic', year: '2026' },
  { name: 'Introduction to Agent Skills', issuer: 'Anthropic', year: '2026' },
  { name: 'Claude 101',                   issuer: 'Anthropic', year: '2026' },
]

/* ── Shared sub-components ──────────────────────────────────────── */
type LucideIcon = React.ComponentType<{ size?: number; style?: React.CSSProperties }>

function SectionHeading({
  children,
  icon: Icon,
  color,
}: {
  children: React.ReactNode
  icon: LucideIcon
  color: string
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <Icon size={15} style={{ color, flexShrink: 0 }} />
      <h2
        className="font-display font-bold text-[1.375rem] leading-none whitespace-nowrap"
        style={{ color }}
      >
        {children}
      </h2>
      <div className="flex-1 h-px bg-bg-border" aria-hidden="true" />
    </div>
  )
}

function Bullet({ color }: { color: string }) {
  return <span className="flex-shrink-0 mt-[5px] text-[8px]" style={{ color }}>▸</span>
}

function AccentBar({ color }: { color: string }) {
  return (
    <div
      className="w-0.5 flex-shrink-0 rounded-full transition-colors duration-200"
      style={{ backgroundColor: `${color}35` }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = color)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = `${color}35`)}
    />
  )
}

/* ── Page ───────────────────────────────────────────────────────── */
export default function CV() {
  return (
    <>
      <SEOHead
        title="CV | Nick Shaw, Head of QA"
        description="Online CV for Nick Shaw, Head of QA and Delivery with 12 years' experience leading software quality across SaaS, enterprise and public sector environments."
        canonicalUrl="/cv"
        jsonLd={profilePageSchema()}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10 py-12 sm:py-16">

        {/* ── Back link ─────────────────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mb-10"
        >
          <Link
            to="/about"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-wider text-text-muted hover:text-link transition-colors duration-150"
          >
            <ArrowLeft size={13} /> Back to about
          </Link>
        </m.div>

        {/* ── Header ────────────────────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-14"
        >
          <h1 className="font-display font-bold text-[clamp(2rem,5vw,3rem)] text-text-primary leading-tight tracking-[-0.02em]">
            Nick Shaw
          </h1>
          <p className="text-accent font-mono text-[13px] tracking-widest uppercase mt-1">
            Head of QA and Delivery
          </p>
          <p className="text-text-muted font-mono text-[11px] mt-1">
            SaaS · Enterprise · Public Sector
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-text-muted font-mono text-[11px]">
            <span className="flex items-center gap-1.5"><MapPin size={11} /> Belfast, UK · Remote</span>
          </div>
          <a
            href="/Nick_Shaw_CV.pdf"
            download
            className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase border border-accent text-text-primary bg-accent/10 px-4 py-2 rounded-pill hover:bg-accent/20 transition-colors duration-150"
          >
            <Download size={12} />
            Download PDF
          </a>
        </m.div>

        {/* ── Professional Summary ───────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="mb-12"
        >
          <SectionHeading icon={User} color={C.summary}>Professional Summary</SectionHeading>
          <p className="text-text-secondary text-[15px] leading-[1.85]">
            Head of QA and Delivery with 12 years' experience leading teams of up to 25 across SaaS, enterprise, public sector and healthcare environments. Proven in QA strategy, Playwright automation and regulated programme delivery, with a track record of measurable improvement in coverage, release cadence and production stability. Cross-functional leader with Scrum Master and Product Owner experience across Agile and Waterfall programmes, hands-on in AI-assisted testing using Claude Code, Playwright MCP and LLM evaluation.
          </p>
        </m.div>

        {/* ── Core Competencies ─────────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          className="mb-12"
        >
          <SectionHeading icon={Zap} color={C.competencies}>Core Competencies</SectionHeading>
          <div className="flex flex-col gap-2">
            {COMPETENCIES.map((c) => (
              <div key={c} className="flex items-start gap-2.5">
                <Bullet color={C.competencies} />
                <span className="text-text-secondary text-[13px] leading-relaxed">{c}</span>
              </div>
            ))}
          </div>
        </m.div>

        {/* ── Professional Experience ────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
          className="mb-12"
        >
          <SectionHeading icon={Briefcase} color={C.experience}>Professional Experience</SectionHeading>
          <div className="flex flex-col gap-10">
            {ROLES.map((role) => (
              <div key={role.title + role.company} className="flex items-stretch gap-4 sm:gap-5">
                <AccentBar color={C.experience} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2 mb-1">
                    <div>
                      <span className="font-display font-semibold text-[15px] sm:text-[16px] text-text-primary">{role.title}</span>
                      {role.note && (
                        <span className="font-mono text-[10px] text-text-muted ml-2 tracking-wide">({role.note})</span>
                      )}
                    </div>
                    <span className="font-mono text-[11px] text-text-muted sm:flex-shrink-0">{role.period}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-3">
                    <span className="font-mono text-[12px]" style={{ color: C.experience }}>{role.company}</span>
                    <span className="text-bg-border hidden sm:inline">·</span>
                    <span className="font-mono text-[11px] text-text-muted">{role.location}</span>
                  </div>
                  <p className="text-text-secondary text-[14px] leading-relaxed mb-3">{role.summary}</p>
                  <ul className="space-y-2 mb-4">
                    {role.achievements.map((a) => (
                      <li key={a} className="flex items-start gap-2.5">
                        <Bullet color={C.experience} />
                        <span className="text-text-secondary text-[13px] leading-relaxed">{a}</span>
                      </li>
                    ))}
                  </ul>
                  {role.closing && (
                    <p className="text-text-secondary text-[14px] leading-relaxed mb-3">{role.closing}</p>
                  )}
                  <p className="font-mono text-[11px] text-text-secondary leading-relaxed break-words">
                    <span className="uppercase tracking-widest mr-2 text-[10px]" style={{ color: `${C.experience}99` }}>Tools</span>
                    {role.tools}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </m.div>

        {/* ── Earlier Experience ────────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12"
        >
          <SectionHeading icon={Clock} color={C.earlier}>Earlier Experience</SectionHeading>
          <div className="flex flex-col gap-7">
            {EARLIER.map((role) => (
              <div key={role.title + role.company} className="flex items-stretch gap-4 sm:gap-5">
                <AccentBar color={C.earlier} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2 mb-1">
                    <div>
                      <span className="font-display font-semibold text-[15px] text-text-primary">{role.title}</span>
                      {role.note && (
                        <span className="font-mono text-[10px] text-text-muted ml-2 tracking-wide">({role.note})</span>
                      )}
                    </div>
                    <span className="font-mono text-[11px] text-text-muted sm:flex-shrink-0">{role.period}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mb-3">
                    <span className="font-mono text-[12px]" style={{ color: C.earlier }}>{role.company}</span>
                    <span className="text-bg-border hidden sm:inline">·</span>
                    <span className="font-mono text-[11px] text-text-muted">{role.location}</span>
                  </div>
                  <ul className="space-y-2">
                    {role.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <Bullet color={C.earlier} />
                        <span className="text-text-secondary text-[13px] leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </m.div>

        {/* ── Projects ──────────────────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12"
        >
          <SectionHeading icon={Code2} color={C.projects}>Projects</SectionHeading>
          <div className="flex flex-col gap-8">
            {PROJECTS.map((project) => (
              <div key={project.name} className="flex items-stretch gap-4 sm:gap-5">
                <AccentBar color={C.projects} />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-0.5 sm:gap-2 mb-3">
                    <div>
                      <span className="font-display font-semibold text-[15px] text-text-primary">{project.name}</span>
                      <span className="font-mono text-[11px] text-text-muted ml-2">{project.subtitle}</span>
                    </div>
                    <span className="font-mono text-[11px] text-text-muted sm:flex-shrink-0">{project.period}</span>
                  </div>
                  <p className="text-text-secondary text-[13px] leading-relaxed mb-3">{project.description}</p>
                  {project.points.length > 0 && (
                    <ul className="space-y-2 mb-3">
                      {project.points.map((p) => (
                        <li key={p} className="flex items-start gap-2.5">
                          <Bullet color={C.projects} />
                          <span className="text-text-secondary text-[13px] leading-relaxed">{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {project.closing && (
                    <p className="text-text-secondary text-[13px] leading-relaxed">{project.closing}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </m.div>

        {/* ── Qualifications and Certifications ─────────── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12"
        >
          <SectionHeading icon={Award} color={C.certs}>
            <span className="sm:hidden">Qualifications</span>
            <span className="hidden sm:inline">Qualifications and Certifications</span>
          </SectionHeading>
          <div className="flex flex-col">
            {CERTIFICATIONS.map((q) => (
              <div key={q.name} className="flex items-stretch gap-3 py-2.5">
                <AccentBar color={C.certs} />
                <div className="flex-1 flex items-baseline justify-between gap-4 min-w-0">
                  <span className="font-display font-medium text-[13px] text-text-primary">{q.name}</span>
                  <span className="font-mono text-[11px] text-text-muted flex-shrink-0">{q.year}</span>
                </div>
              </div>
            ))}
          </div>
        </m.div>

        {/* ── Professional Development ───────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12"
        >
          <SectionHeading icon={BookOpen} color={C.profdev}>Professional Development</SectionHeading>
          <div className="flex flex-col">
            {PROFESSIONAL_DEVELOPMENT.map((q) => (
              <div key={q.name} className="flex items-stretch gap-3 py-2.5">
                <AccentBar color={C.profdev} />
                <div className="flex-1 flex items-baseline justify-between gap-4 min-w-0">
                  <div className="min-w-0">
                    <span className="font-display font-medium text-[13px] text-text-primary">{q.name}</span>
                    <span className="font-mono text-[10px] text-text-muted ml-2">{q.issuer}</span>
                  </div>
                  <span className="font-mono text-[11px] text-text-muted flex-shrink-0">{q.year}</span>
                </div>
              </div>
            ))}
          </div>
        </m.div>

        {/* ── Education ─────────────────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-12"
        >
          <SectionHeading icon={GraduationCap} color={C.education}>Education</SectionHeading>
          <div className="mb-2">
            <span className="font-display font-semibold text-[15px] text-text-primary">Queen's University, Belfast</span>
          </div>
          {([
            { degree: 'MA Creative Writing', grade: 'Merit', years: '2012 – 2013' },
            { degree: 'BA (Hons) English',   grade: '2:1',   years: '2007 – 2010' },
          ] as const).map((e) => (
            <div key={e.degree} className="flex items-stretch gap-3 py-2.5">
              <AccentBar color={C.education} />
              <div className="flex-1 flex items-baseline justify-between gap-4 min-w-0">
                <div>
                  <span className="font-display font-medium text-[13px] text-text-primary">{e.degree}</span>
                  <span className="font-mono text-[10px] text-text-muted ml-2">{e.grade}</span>
                </div>
                <span className="font-mono text-[11px] text-text-muted flex-shrink-0">{e.years}</span>
              </div>
            </div>
          ))}
        </m.div>

      </div>
    </>
  )
}

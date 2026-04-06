import { m } from 'framer-motion'
import { Download, MapPin, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEOHead from '../components/SEOHead'
import { profilePageSchema } from '../seo/structured-data'

const ROLES = [
  {
    title:   'Head of QA',
    note:    'Promoted from Lead QA',
    company: 'Cloudbooking',
    location: 'London, UK (Remote)',
    period:  'March 2025 – December 2025',
    summary: 'Directed QA strategy, delivery operations and performance across a 17-person SaaS team spanning web, mobile and tablet platforms.',
    achievements: [
      'Doubled test coverage from 45% to 90% within six months through structured test case development, embedding QA in backlog refinement and implementing shift-left testing practices',
      'Reduced manual regression effort by 40%, enhancing pre-release confidence and release stability',
      'Improved release cadence from monthly to twice-monthly through enhanced delivery governance and sprint structures',
      'Led delivery and QA operations across multiple product streams, coordinating releases, cross-team collaboration and operational governance',
      'Directed team resourcing, hiring, onboarding and performance management',
      'Member of the senior management team, collaborating with the C-suite on product and programme strategy',
      'Oversaw end-to-end test lifecycle and release readiness across .NET, MAUI and React SaaS platforms',
      'Architected a Playwright automation framework (JavaScript) for critical end-to-end workflows, establishing scalable automated regression capability',
      'Implemented accessibility-first delivery (WCAG 2.1), embedding standards into sprint execution',
      'Acted as Product Owner and Scrum Master, managing SaaS roadmap and leading sprint planning, execution and dependency control',
    ],
    tools: 'Axe DevTools · Azure DevOps · Google Lighthouse · Jira · Miro · NVDA · OWASP ZAP · Playwright (JavaScript) · Postman · Qase · SQL · Swagger · TestRail · WAV',
  },
  {
    title:   'Test Manager',
    company: 'ITS Computing Ltd',
    location: 'Belfast, UK (Remote)',
    period:  'June 2021 – December 2024',
    summary: 'Led QA and delivery across a 25-person, distributed team spanning the UK and India, owning QA strategy, delivery governance and test lifecycle execution for major national public sector programmes within complex regulatory environments.',
    achievements: [
      'Built and scaled test automation capability from scratch, implementing Playwright and TestComplete while increasing regression coverage across programmes',
      'Standardised QA processes, governance frameworks and documentation, improving delivery consistency and quality across all projects',
      'Delivered end-to-end QA strategy and full test lifecycle for national programmes, including LPS Rates and Benefits, Insolvency Service GB, NISRA, PBNI and FSNI',
      'Led delivery and QA operations across concurrent Agile and Waterfall projects, coordinating cross-team activities, release governance and programme delivery',
      'Managed a 25-person UK and India testing team, directing resourcing, hiring, mentoring, vendor relationships and performance management',
      'Implemented accessibility-first practices (WCAG 2.1), embedding accessibility standards and delivering team training',
      'Oversaw performance testing using JMeter to validate scalability and regulatory compliance',
      'Acted as Product Owner and Scrum Master, managing backlog, sprint execution and cross-team delivery alignment',
      'Managed UAT, change control and pre-release validation to ensure compliant, production-ready delivery',
    ],
    tools: 'Axe DevTools · Azure DevOps · JMeter · Jira · Miro · NVDA · Playwright (JavaScript) · Postman · SQL · Swagger · TestComplete · WAV',
  },
]

const EARLIER = [
  {
    title:   'Senior QA Engineer',
    company: 'HHA Exchange',
    location: 'Belfast, UK (Remote)',
    period:  'March 2019 – June 2021',
    points: [
      'Contributed to QA delivery on a large-scale US healthcare SaaS platform (.NET, Angular), supporting distributed teams in a regulated environment',
      'Maintained BDD automation suites (SpecFlow/Gherkin) and conducted API, integration and end-to-end testing across Agile delivery cycles',
    ],
  },
  {
    title:   'QA Engineer',
    company: 'Flowlens',
    location: 'Belfast, UK',
    period:  'September 2017 – March 2019',
    points: [
      'Conducted functional and integration testing across multiple SaaS modules (Ruby on Rails), including integrations with Xero and QuickBooks',
      'Produced test documentation and onboarding materials to improve knowledge transfer and support issue resolution',
    ],
  },
  {
    title:   'UK QA Lead',
    company: 'Concentrix',
    location: 'Belfast, UK (Remote)',
    period:  'November 2013 – November 2016',
    points: [
      'Managed a 10-person QA team for .NET CRM SaaS platforms, supporting enterprise clients including Riverbed, Polycom, Symantec and Acronis',
      'Oversaw end-to-end QA strategy, SDLC governance and defect management, including on-site project delivery and stakeholder collaboration in Boston, New York and San Francisco',
      'Delivered functional, regression, integration and UAT testing, ensuring global QA consistency through training and documentation rollouts',
      'Promoted internally from Intern to Junior QA, Senior QA and UK QA Lead',
    ],
  },
]

const COMPETENCIES = [
  'QA Strategy and Test Lifecycle Leadership',
  'Test Automation (Playwright, BDD, AI-assisted)',
  'Multi-Team Leadership and Delivery Management',
  'Agile Delivery, Scrum Master and Product Owner',
  'Risk-Based Testing and Regulatory Compliance',
  'Accessibility Compliance (WCAG 2.1)',
  'Performance, API and Integration Testing',
  'UAT, Release and Go-Live Governance',
  'Executive and Stakeholder Engagement',
  'Public Sector Bid and Tender Support',
]

const QUALIFICATIONS = [
  { name: 'Claude 101',                    issuer: 'Anthropic',      year: '2026' },
  { name: 'Claude Code in Action',         issuer: 'Anthropic',      year: '2026' },
  { name: 'Introduction to Agent Skills',  issuer: 'Anthropic',      year: '2026' },
  { name: 'Certified Scrum Master (CSM)',  issuer: 'Scrum Alliance', year: '2025' },
  { name: 'Certified Scrum Product Owner (CSPO)', issuer: 'Scrum Alliance', year: '2025' },
  { name: 'ISTQB Foundation Certificate', issuer: 'ISTQB',          year: '2013' },
]

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <h2 className="font-display font-bold text-[1.375rem] leading-none text-accent/70 whitespace-nowrap">
        {children}
      </h2>
      <div className="flex-1 h-px bg-bg-border" aria-hidden="true" />
    </div>
  )
}

export default function CV() {
  return (
    <>
      <SEOHead
        title="CV | Nick Shaw, Head of QA"
        description="Online CV for Nick Shaw, Head of QA and Delivery with 12 years' experience leading software quality across SaaS, enterprise and public sector environments."
        canonicalUrl="/cv"
        jsonLd={profilePageSchema()}
      />

      <div className="max-w-4xl mx-auto px-6 md:px-10 py-16">

        {/* ── Back link ──────────────────────────────────── */}
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

        {/* ── Header ─────────────────────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-12"
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

        {/* ── Professional Summary ────────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
          className="mb-8 sm:mb-12"
        >
          <SectionHeading>Professional Summary</SectionHeading>
          <p className="text-text-secondary text-[15px] leading-[1.85] mb-3">
            Head of QA and Delivery with 12 years' experience leading high-performing teams and directing software delivery across SaaS, enterprise, public sector and healthcare environments. I have built and scaled teams of up to 25 engineers, architected Playwright automation frameworks and delivered multiple concurrent programmes that improved test coverage, accelerated release cadence and reduced production defects.
          </p>
          <p className="text-text-secondary text-[15px] leading-[1.85]">
            I bring cross-functional leadership experience across QA, delivery and product management, including Product Owner, Scrum Master and project oversight responsibilities. My focus is on strategic governance, risk-aware delivery, Agile transformation and embedding automation and AI-assisted testing to drive efficiency and consistent quality outcomes. I work closely with senior executives to optimise organisational performance and ensure delivery excellence across complex regulated programmes.
          </p>
        </m.div>

        {/* ── Core Competencies ──────────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.15 }}
          className="mb-8 sm:mb-12"
        >
          <SectionHeading>Core Competencies</SectionHeading>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2">
            {COMPETENCIES.map((c) => (
              <div key={c} className="flex items-start gap-2">
                <span className="text-accent mt-[6px] flex-shrink-0 text-[8px]">▸</span>
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
          className="mb-8 sm:mb-12"
        >
          <SectionHeading>Professional Experience</SectionHeading>
          <div className="flex flex-col gap-10">
            {ROLES.map((role) => (
              <div key={role.title + role.company} className="group flex items-stretch gap-5">
                <div className="w-0.5 flex-shrink-0 bg-accent/25 group-hover:bg-accent transition-colors duration-200 rounded-full" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                    <div>
                      <span className="font-display font-semibold text-[16px] text-text-primary">{role.title}</span>
                      {role.note && (
                        <span className="font-mono text-[10px] text-text-muted ml-2 tracking-wide">({role.note})</span>
                      )}
                    </div>
                    <span className="font-mono text-[11px] text-text-muted flex-shrink-0">{role.period}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[12px] text-accent">{role.company}</span>
                    <span className="text-bg-border">·</span>
                    <span className="font-mono text-[11px] text-text-muted">{role.location}</span>
                  </div>
                  <p className="text-text-secondary text-[14px] leading-relaxed mb-3 italic">{role.summary}</p>
                  <ul className="space-y-2 mb-4">
                    {role.achievements.map((a) => (
                      <li key={a} className="flex items-start gap-2.5">
                        <span className="text-accent flex-shrink-0 mt-[5px] text-[8px]">▸</span>
                        <span className="text-text-secondary text-[13px] leading-relaxed">{a}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="font-mono text-[11px] text-text-secondary leading-relaxed break-words">
                    <span className="uppercase tracking-widest text-accent/70 mr-2 text-[10px]">Tools</span>
                    {role.tools}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </m.div>

        {/* ── Earlier Career ──────────────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-8 sm:mb-12"
        >
          <SectionHeading>Earlier Career</SectionHeading>
          <div className="flex flex-col gap-7">
            {EARLIER.map((role) => (
              <div key={role.title + role.company} className="group flex items-stretch gap-5">
                <div className="w-0.5 flex-shrink-0 bg-accent/25 group-hover:bg-accent transition-colors duration-200 rounded-full" />
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1">
                    <span className="font-display font-semibold text-[15px] text-text-primary">{role.title}</span>
                    <span className="font-mono text-[11px] text-text-muted flex-shrink-0">{role.period}</span>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-mono text-[12px] text-accent">{role.company}</span>
                    <span className="text-bg-border">·</span>
                    <span className="font-mono text-[11px] text-text-muted">{role.location}</span>
                  </div>
                  <ul className="space-y-2">
                    {role.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5">
                        <span className="text-accent flex-shrink-0 mt-[5px] text-[8px]">▸</span>
                        <span className="text-text-secondary text-[13px] leading-relaxed">{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </m.div>

        {/* ── Qualifications ──────────────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-8 sm:mb-12"
        >
          <SectionHeading>Qualifications and Certifications</SectionHeading>
          <div className="flex flex-col gap-0">
            {QUALIFICATIONS.map((q) => (
              <div key={q.name} className="group flex items-stretch gap-3 py-2.5">
                <div className="w-0.5 bg-accent/20 group-hover:bg-accent flex-shrink-0 transition-colors duration-150" />
                <div className="flex-1 flex items-baseline justify-between gap-4">
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

        {/* ── Education ──────────────────────────────────── */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <SectionHeading>Education</SectionHeading>
          <div className="mb-2">
            <span className="font-display font-semibold text-[15px] text-text-primary">Queen's University Belfast</span>
          </div>
          {([
            { degree: 'MA Creative Writing', grade: 'Merit', years: '2012–2013' },
            { degree: 'BA (Hons) English',   grade: '2:1',   years: '2007–2010' },
          ] as const).map((e) => (
            <div key={e.degree} className="group flex items-stretch gap-3 py-2.5">
              <div className="w-0.5 bg-[#e879f9]/20 group-hover:bg-[#e879f9] flex-shrink-0 transition-colors duration-150" />
              <div className="flex-1 flex items-baseline justify-between gap-4">
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

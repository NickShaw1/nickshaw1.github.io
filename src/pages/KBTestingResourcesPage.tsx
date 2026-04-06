import { useState } from 'react'
import { m } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import { useReducedMotion } from '../hooks/useReducedMotion'

type Level = 'foundation' | 'intermediate' | 'advanced' | 'expert'

interface CertItem {
  name: string
  provider: string
  note: string
  level: Level
}

interface ResourceItem {
  name: string
  url?: string
  note: string
  author?: string
}

// ── Certifications ────────────────────────────────────────
const CERTS: CertItem[] = [
  { name: 'CTFL',                    provider: 'ISTQB', level: 'foundation',   note: 'Foundation Level. The most widely held entry-level testing qualification globally' },
  { name: 'CTFL-AT',                 provider: 'ISTQB', level: 'foundation',   note: 'Agile Tester extension to CTFL. Note: agile content was folded into the core CTFL v4.0 syllabus in 2023; availability varies by region' },
  { name: 'CTAL-TM',                 provider: 'ISTQB', level: 'advanced',     note: 'Test Manager. Test planning, risk management and stakeholder communication' },
  { name: 'CTAL-TA',                 provider: 'ISTQB', level: 'advanced',     note: 'Test Analyst. Test techniques and structured approaches to test design' },
  { name: 'CTAL-TAE',                provider: 'ISTQB', level: 'advanced',     note: 'Test Automation Engineer. Automation architecture, frameworks and tool selection' },
  { name: 'CT-AI',                   provider: 'ISTQB', level: 'advanced',     note: 'AI Testing. Testing of AI and ML systems including bias detection and model evaluation' },
  { name: 'Expert Level',            provider: 'ISTQB', level: 'expert',       note: 'Highest tier of ISTQB qualification, available in Test Management and Improving the Testing Process' },
  { name: 'CAST',                    provider: 'QAI Global Institute', level: 'foundation',   note: 'Certified Associate in Software Testing. Entry-level credential covering fundamental testing concepts' },
  { name: 'CSTE',                    provider: 'QAI Global Institute', level: 'intermediate', note: 'Certified Software Tester. Practitioner-level credential focused on applied quality assurance' },
  { name: 'CMSQ',                    provider: 'QAI Global Institute', level: 'advanced',     note: 'Certified Manager of Software Quality. For QA leads and managers overseeing quality programmes' },
  { name: 'ISEB Foundation',         provider: 'BCS',   level: 'foundation',   note: 'Foundation Certificate in Software Testing. Widely recognised in the UK, aligned with ISTQB Foundation' },
  { name: 'ISEB Practitioner',       provider: 'BCS',   level: 'intermediate', note: 'Practitioner Certificate in Software Testing. Builds on Foundation with a focus on test design and management' },
  { name: 'Certified Agile Tester',  provider: 'iSQI',  level: 'intermediate', note: 'Testing roles and responsibilities within agile and Scrum environments' },
  { name: 'TOSCA Certification',                    provider: 'Tricentis',              level: 'intermediate', note: 'Vendor certification for the TOSCA automation platform, covering test design and execution' },
  { name: 'UFT Certification',                      provider: 'Micro Focus / OpenText', level: 'intermediate', note: 'Vendor certification for Unified Functional Testing, covering GUI and API automation' },
  { name: 'Azure DevOps Engineer Expert',            provider: 'Microsoft',              level: 'advanced',     note: 'Covers CI/CD pipelines, source control, infrastructure-as-code and release management within Azure DevOps and GitHub' },
  { name: 'Azure AI Engineer Associate',             provider: 'Microsoft',              level: 'advanced',     note: 'Covers designing and implementing AI solutions on Azure, relevant to testing AI-powered systems' },
  { name: 'AI-900: Azure AI Fundamentals',           provider: 'Microsoft',              level: 'foundation',   note: 'Entry-level introduction to AI and machine learning concepts on Azure, with no programming prerequisite' },
  { name: 'AWS Certified DevOps Engineer – Professional', provider: 'Amazon Web Services', level: 'advanced', note: 'Covers CI/CD pipelines, infrastructure-as-code, monitoring and quality practices in AWS environments' },
  { name: 'AWS Certified AI Practitioner',           provider: 'Amazon Web Services',    level: 'foundation',   note: 'Introduces AI and ML concepts on AWS, useful for testers working with AI-powered products' },
  { name: 'Professional Machine Learning Engineer',  provider: 'Google Cloud',           level: 'advanced',     note: 'Covers designing and deploying ML models on Google Cloud, relevant to testing and validating ML systems' },
  { name: 'Associate Cloud Engineer',                provider: 'Google Cloud',           level: 'intermediate', note: 'Covers deployment and monitoring on Google Cloud, useful for testers working in GCP environments' },
]

const LEVEL_ORDER: Level[] = ['foundation', 'intermediate', 'advanced', 'expert']

const LEVEL_CONFIG: Record<Level, { label: string; className: string }> = {
  foundation:   { label: 'Foundation',   className: 'text-sky-400 bg-sky-400/10 border-sky-400/20' },
  intermediate: { label: 'Intermediate', className: 'text-violet-400 bg-violet-400/10 border-violet-400/20' },
  advanced:     { label: 'Advanced',     className: 'text-orange-400 bg-orange-400/10 border-orange-400/20' },
  expert:       { label: 'Expert',       className: 'text-rose-400 bg-rose-400/10 border-rose-400/20' },
}

// ── Professional Bodies ───────────────────────────────────
const BODIES: ResourceItem[] = [
  { name: 'ISTQB',               url: 'https://istqb.org',              note: 'The global body for software testing qualifications, maintaining the CTFL and CTAL syllabi used worldwide' },
  { name: 'QAI Global Institute', url: 'https://qaiusa.com',            note: 'US-based quality assurance institute offering certifications and training programmes for software testers and QA managers' },
  { name: 'BCS Testing Board',   url: 'https://bcs.org',                note: 'UK professional body offering ISEB-aligned software testing qualifications and continuing professional development' },
  { name: 'ASQ',                 url: 'https://asq.org',                note: 'Broad quality management body with certifications and resources relevant to software quality assurance' },
  { name: 'Ministry of Testing', url: 'https://ministryoftesting.com',  note: 'Global community for software testers offering free articles, forums and a paid learning club' },
  { name: 'uTest',               url: 'https://utest.com',              note: 'Crowdsourced testing community where testers can join paid testing cycles for real-world products' },
]

// ── Free Resources ────────────────────────────────────────
const FREE: ResourceItem[] = [
  { name: 'Test Automation University',    url: 'https://testautomationu.applitools.com', note: 'Entirely free video course library from Applitools covering Playwright, Selenium, Cypress, API testing and more' },
  { name: 'Ministry of Testing',           url: 'https://ministryoftesting.com',          note: 'Free articles, forums and community content alongside a paid MoT Club subscription' },
  { name: 'Google Testing Blog',           url: 'https://testing.googleblog.com',         note: 'Engineering articles from Google\'s testing teams covering large-scale test infrastructure and practice' },
  { name: 'Guru99',                        url: 'https://guru99.com',                     note: 'Beginner-friendly tutorials covering manual testing, Selenium, JMeter and common testing concepts' },
  { name: 'Software Testing Help',         url: 'https://softwaretestinghelp.com',        note: 'Broad library of testing guides, tool comparisons and career advice' },
  { name: 'ISTQB Sample Papers & Glossary', url: 'https://istqb.org',                    note: 'Official practice exam papers and the ISTQB Standard Glossary of Terms used in certification exams' },
  { name: 'freeCodeCamp',                  url: 'https://freecodecamp.org',               note: 'Covers test-driven development and unit testing as part of broader software engineering curricula' },
]

// ── Paid Courses ──────────────────────────────────────────
const COURSES: ResourceItem[] = [
  { name: 'Udemy',            url: 'https://udemy.com',              note: 'Large marketplace with courses on Selenium, Playwright, Cypress, API testing and ISTQB preparation at various price points' },
  { name: 'Pluralsight',      url: 'https://pluralsight.com',        note: 'Subscription platform with structured learning paths covering automation frameworks and DevOps quality practices' },
  { name: 'LinkedIn Learning', url: 'https://linkedin.com/learning', note: 'Wide range of testing and QA courses included with LinkedIn Premium subscriptions' },
  { name: 'Coursera',         url: 'https://coursera.org',           note: 'University-backed QA and software testing courses from various universities and industry partners including Google' },
  { name: 'A Cloud Guru',     url: 'https://acloudguru.com',         note: 'DevOps and cloud-focused content covering testing in CI/CD pipelines and AWS quality practices' },
]

// ── Tool Docs ─────────────────────────────────────────────
const TOOLS: ResourceItem[] = [
  { name: 'Selenium',         url: 'https://selenium.dev',                 note: 'Official documentation and getting started guides for the Selenium WebDriver browser automation library' },
  { name: 'Cypress',          url: 'https://learn.cypress.io',             note: 'Official learn platform with structured courses covering end-to-end testing with Cypress' },
  { name: 'Playwright',       url: 'https://playwright.dev',               note: 'Comprehensive official documentation and guides for browser automation with Microsoft Playwright' },
  { name: 'Postman Academy',  url: 'https://learning.postman.com',         note: 'Free structured learning for API testing with Postman, covering collections, environments and automated test scripts' },
  { name: 'Apache JMeter',    url: 'https://jmeter.apache.org',            note: 'Official documentation for the open-source performance and load testing tool' },
  { name: 'k6',               url: 'https://k6.io/docs',                   note: 'Documentation and guides for Grafana k6, a developer-friendly load and performance testing tool' },
  { name: 'Appium',           url: 'https://appium.io/docs/latest/',        note: 'Official documentation for Appium, the open-source framework for automating mobile app testing on iOS and Android' },
]

// ── Books ─────────────────────────────────────────────────
const BOOKS: ResourceItem[] = [
  { name: 'Lessons Learned in Software Testing',           author: 'Kaner, Bach, Pettichord',  note: 'A collection of practical insights from three influential testing practitioners, covering strategy and common pitfalls' },
  { name: 'The Art of Software Testing',                   author: 'Glenford Myers',            note: 'A foundational text on testing principles and techniques, first published in 1979 and still widely cited' },
  { name: 'Explore It!',                                   author: 'Elisabeth Hendrickson',     note: 'A practical guide to exploratory testing, structured sessions and using charters to focus investigative testing' },
  { name: 'Software Testing: A Craftsman\'s Approach',    author: 'Paul Jorgensen',            note: 'A technical treatment of testing theory including boundary value analysis, equivalence classes and structural testing' },
  { name: 'Agile Testing',                                 author: 'Lisa Crispin, Janet Gregory', note: 'Covers how testers work effectively within agile teams, including the agile testing quadrants model' },
  { name: 'Growing Object-Oriented Software, Guided by Tests', author: 'Freeman, Pryce',       note: 'A deep dive into test-driven development using a worked example, highly regarded in the TDD community' },
]

// ── Cert groups (by provider, sorted by level) ────────────
const CERT_PROVIDER_ORDER = ['ISTQB', 'QAI Global Institute', 'BCS', 'iSQI', 'Microsoft', 'Amazon Web Services', 'Google Cloud', 'Tricentis', 'Micro Focus / OpenText']
const certGroups: [string, CertItem[]][] = CERT_PROVIDER_ORDER
  .map((org) => [org, CERTS.filter((c) => c.provider === org).sort((a, b) => LEVEL_ORDER.indexOf(a.level) - LEVEL_ORDER.indexOf(b.level))] as [string, CertItem[]])
  .filter(([, certs]) => certs.length > 0)

function ResourceList({ items }: { items: ResourceItem[] }) {
  return (
    <dl className="space-y-4">
      {items.map((item) => (
        <div key={item.name}>
          <dt className="font-display font-semibold text-[14px] text-text-primary mb-0.5">
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer"
                className="text-link hover:text-link/80 transition-colors duration-150">
                {item.name}
              </a>
            ) : item.name}
            {item.author && (
              <span className="block sm:inline font-normal text-text-muted sm:ml-2 text-[13px]">{item.author}</span>
            )}
          </dt>
          <dd className="text-text-secondary text-[14px] leading-relaxed">{item.note}</dd>
        </div>
      ))}
    </dl>
  )
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <h2 className="font-display font-bold text-[1.375rem] leading-none text-accent/70 whitespace-nowrap">
        {children}
      </h2>
      <div className="flex-1 h-px bg-bg-border" aria-hidden="true" />
    </div>
  )
}

export default function KBTestingResourcesPage() {
  const reduced = useReducedMotion()

  const [activeTab, setActiveTab] = useState<'certifications' | 'resources'>('certifications')

  const section = (
    content: React.ReactNode,
    key: string,
    delay = 0,
  ) => (
    <m.section
      key={key}
      initial={reduced ? undefined : { opacity: 0, y: 12 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.35, ease: 'easeOut', delay: reduced ? 0 : delay }}
    >
      {content}
    </m.section>
  )

  return (
    <>
      <SEOHead
        title="Software Testing Resources | Nick Shaw"
        description="Certifications, courses, tools, books and communities for software testing professionals."
        canonicalUrl="/knowledge-base/testing-resources"
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
          className="mb-4"
        >
          <div className="mb-3">
            <span className="inline-flex items-center font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-tag bg-[#f59e0b1a] text-[#f59e0b]">
              Reference
            </span>
          </div>
          <h1 className="font-display font-bold text-[clamp(1.6rem,3.5vw,2.25rem)] text-text-primary leading-tight tracking-[-0.02em] mb-3">
            Testing Resources
          </h1>
          <p className="text-text-secondary text-[15px] leading-relaxed">
            Certifications, courses, tools, books and communities for software testing professionals.
          </p>
        </m.header>

        {/* ── Tabs ─────────────────────────────────── */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="group" aria-label="Filter by section">
          {(['certifications', 'resources'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-shrink-0 font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 rounded-pill border transition-colors duration-150 ${
                activeTab === tab
                  ? 'border-accent text-accent bg-accent/10'
                  : 'border-bg-border text-text-muted hover:text-text-secondary hover:border-text-muted/30'
              }`}
              aria-pressed={activeTab === tab}
            >
              {tab === 'certifications' ? 'Certifications' : 'Links & Resources'}
            </button>
          ))}
        </div>

        {/* ── Content ──────────────────────────────── */}
        <div className="space-y-10">

          {activeTab === 'certifications' && section(<>
            <SectionHeading>Certifications</SectionHeading>
            <div className="space-y-8">
              {certGroups.map(([org, certs]) => (
                <div key={org}>
                  <p className="font-mono text-[11px] tracking-widest uppercase text-text-muted mb-3">{org}</p>
                  <div className="rounded-card border border-bg-border overflow-hidden">
                    {certs.map((cert, i) => (
                      <div key={cert.name} className={`flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6 px-4 py-3.5 ${i > 0 ? 'border-t border-bg-border' : ''}`}>
                        <div className="min-w-0">
                          <p className="font-display font-semibold text-[14px] text-text-primary leading-snug">{cert.name}</p>
                          <p className="text-text-secondary text-[13px] leading-relaxed mt-0.5">{cert.note}</p>
                        </div>
                        <span className={`self-start flex-shrink-0 inline-flex items-center font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-tag border sm:mt-0.5 ${LEVEL_CONFIG[cert.level].className}`}>
                          {LEVEL_CONFIG[cert.level].label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>, 'certs')}

          {activeTab === 'resources' && section(<>
            <SectionHeading>Professional Bodies</SectionHeading>
            <ResourceList items={BODIES} />
          </>, 'bodies')}

          {activeTab === 'resources' && section(<>
            <SectionHeading>Free Resources</SectionHeading>
            <ResourceList items={FREE} />
          </>, 'free')}

          {activeTab === 'resources' && section(<>
            <SectionHeading>Paid Courses</SectionHeading>
            <ResourceList items={COURSES} />
          </>, 'courses')}

          {activeTab === 'resources' && section(<>
            <SectionHeading>Tool Documentation</SectionHeading>
            <ResourceList items={TOOLS} />
          </>, 'tools')}

          {activeTab === 'resources' && section(<>
            <SectionHeading>Books</SectionHeading>
            <ResourceList items={BOOKS} />
          </>, 'books')}

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

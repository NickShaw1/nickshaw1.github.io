import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState, lazy, Suspense } from 'react'
import { m } from 'framer-motion'
import { ArrowRight, User, FolderOpen } from 'lucide-react'
import SEOHead from '../components/SEOHead'
import TerminalStrip from '../components/TerminalStrip'
import ProjectCard from '../components/ProjectCard'
import SectionLabel from '../components/SectionLabel'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { featuredProjects } from '../data/projects'
import type { ProjectItem } from '../data/projects'
import { prefetchSection } from '../data/kb'
import { meta } from '../data/meta'
import nickShawImg from '../assets/nick-shaw.jpg'
import { personSchema } from '../seo/structured-data'

const ProjectModal = lazy(() => import('../components/ProjectModal'))

const ContactForm  = lazy(() => import('../components/ContactForm'))

// ── Reusable fade-up variant factory ─────────────────────
function fadeUp(delay: number) {
  return {
    initial:  { opacity: 0, y: 20 },
    animate:  { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: 'easeOut', delay },
  }
}

export default function Home() {
  const reduced  = useReducedMotion()
  const location = useLocation()
  const [activeProject, setActiveProject] = useState<ProjectItem | null>(null)

  useEffect(() => {
    if (location.hash) {
      const el = document.getElementById(location.hash.slice(1))
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [location.hash])

  const anim = (delay: number) =>
    reduced ? {} : fadeUp(delay)

  return (
    <>
      <SEOHead
        title={meta.seo.home.title}
        description={meta.seo.home.description}
        canonicalUrl="/"
        jsonLd={personSchema()}
      />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        className="relative min-h-[calc(100svh-72px)] flex items-center overflow-hidden"
        aria-label="Introduction"
      >

        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-10 pt-8 pb-8 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 xl:gap-24">

            {/* ── Left: text ── */}
            <div className="flex-1 min-w-0">

              {/* Available badge */}
              <m.div {...anim(0)} className="mb-8">
                <span
                  className="
                    inline-flex items-center gap-2
                    border border-accent/40 rounded-pill
                    px-3 py-1.5
                    font-mono text-[11px] tracking-wider uppercase text-accent
                  "
                  aria-label="Employment status: available for work"
                >
                  <span aria-hidden="true" className="pulse-dot w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                  Available for work
                </span>
              </m.div>

              {/* Headline */}
              <m.h1
                {...anim(0.1)}
                className="
                  font-display font-bold
                  text-[clamp(2.5rem,6.5vw,4.5rem)]
                  leading-[1.03] tracking-[-0.03em]
                  text-text-primary mb-8
                  max-w-3xl
                "
              >
                Senior <span className="text-accent">QA</span> &amp; Delivery<br />
                Professional.
              </m.h1>

              {/* Subheading with inline photo */}
              <m.div {...anim(0.2)} className="flex items-center gap-5 max-w-xl mb-8">
                <img
                  src={nickShawImg}
                  alt="Nick Shaw"
                  width={96}
                  height={96}
                  className="
                    w-24 h-24 flex-shrink-0
                    object-cover object-top
                    rounded-full
                    ring-2 ring-accent/40 ring-offset-2 ring-offset-bg-base
                  "
                />
                <p className="text-text-secondary text-[15px] leading-relaxed">
                  Hi, I'm Nick. I've spent 12 years delivering quality software across commercial and public sector teams. I'm based in Belfast, Northern Ireland.
                </p>
              </m.div>

              {/* CTAs */}
              <m.div {...anim(0.35)} className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
                <Link
                  to="/about"
                  className="
                    inline-flex items-center justify-center gap-2
                    bg-accent text-bg-base
                    font-mono text-[12px] font-semibold tracking-widest uppercase
                    w-full sm:w-auto whitespace-nowrap px-6 py-3.5 rounded-pill
                    shadow-[0_0_24px_rgba(10,255,157,0.25)]
                    hover:bg-accent/90 hover:shadow-[0_0_32px_rgba(10,255,157,0.35)]
                    transition-all duration-150
                    active:scale-100
                  "
                >
                  <User size={14} /> About me <ArrowRight size={14} />
                </Link>
                <Link
                  to="/projects"
                  className="
                    inline-flex items-center justify-center gap-2
                    border border-accent text-text-primary bg-accent/10
                    font-mono text-[12px] tracking-widest uppercase
                    w-full sm:w-auto whitespace-nowrap px-6 py-3.5 rounded-pill
                    hover:bg-accent/20
                    transition-colors duration-150
                    active:scale-100
                  "
                >
                  <FolderOpen size={14} /> Latest projects
                </Link>
              </m.div>

              {/* Stats row */}
              <m.div
                {...anim(0.5)}
                className="
                  grid grid-cols-3
                  border border-bg-border rounded-card
                  divide-x divide-bg-border
                  max-w-md
                "
                role="list"
                aria-label="Career highlights"
              >
                {[
                  { value: meta.stats.yearsExperience, label: 'Years exp.' },
                  { value: meta.stats.bugsRaised,      label: 'Bugs raised' },
                  { value: meta.stats.teamSize,        label: 'Team size' },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col items-center py-4 px-3" role="listitem">
                    <span className="font-display font-bold text-xl text-accent leading-none mb-1">
                      {value}
                    </span>
                    <span className="font-mono text-[10px] tracking-wider uppercase text-text-muted">
                      {label}
                    </span>
                  </div>
                ))}
              </m.div>
            </div>

            {/* ── Right: certifications ── */}
            <div className="mt-10 lg:mt-0 flex-shrink-0 flex flex-col justify-center w-full lg:w-72">
              {[
                {
                  abbr: 'ISTQB',
                  name: 'Certified Tester',
                  level: 'Foundation Level',
                  issuer: 'ISTQB',
                },
                {
                  abbr: 'CSM',
                  name: 'Certified ScrumMaster',
                  level: 'Professional Certification',
                  issuer: 'Scrum Alliance',
                },
                {
                  abbr: 'CSPO',
                  name: 'Certified Scrum Product Owner',
                  level: 'Professional Certification',
                  issuer: 'Scrum Alliance',
                },
              ].map(({ abbr, name, level, issuer }, i) => (
                <m.div
                  key={abbr}
                  {...(reduced ? {} : { initial: { opacity: 0, x: 20 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.5, ease: 'easeOut', delay: 0.35 + i * 0.1 } })}
                  className="
                    group flex items-stretch gap-4
                    border-b border-bg-border last:border-b-0
                    py-3
                    transition-colors duration-150
                  "
                >
                  {/* Accent bar */}
                  <div className="w-px bg-accent/20 group-hover:bg-accent flex-shrink-0 transition-colors duration-150" />

                  <div className="flex flex-col justify-center min-w-0">
                    <span className="font-mono text-[11px] tracking-widest uppercase text-accent mb-1">
                      {abbr}
                    </span>
                    <h3 className="font-display font-semibold text-[16px] text-text-primary leading-snug">
                      {name}
                    </h3>
                    <p className="font-mono text-[12px] text-text-muted tracking-wide mt-1 leading-relaxed">
                      {level}<br />{issuer}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── Terminal strip ────────────────────────────────── */}
      <TerminalStrip />

      {/* ── Featured projects ─────────────────────────────── */}
      <section
        className="px-6 md:px-10 pt-12 md:pt-16 pb-6 max-w-6xl mx-auto"
        aria-labelledby="featured-heading"
      >
        <SectionLabel>Featured projects</SectionLabel>
        <h2
          id="featured-heading"
          className="font-display font-semibold text-[clamp(1.5rem,3vw,2rem)] text-text-primary mb-6"
        >
          Things I've built.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {featuredProjects.slice(0, 3).map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              delay={i * 80}
              reduced={reduced}
              onDetailClick={setActiveProject}
            />
          ))}
        </div>

        <Link
          to="/projects"
          className="
            inline-flex items-center gap-2
            font-mono text-[12px] tracking-wider text-link
            hover:text-link/80 transition-colors duration-150
            group
          "
        >
          View all projects
          <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      </section>

      {/* ── Knowledge Base ───────────────────────────────── */}
      <section
        className="px-6 md:px-10 pt-6 pb-8 max-w-6xl mx-auto"
        aria-labelledby="wiki-heading"
      >
        {/* Compact header row */}
        <m.div
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-6"
        >
          <div>
            <SectionLabel>Knowledge Base</SectionLabel>
            <h2
              id="wiki-heading"
              className="font-display font-semibold text-[clamp(1.5rem,3vw,2rem)] text-text-primary"
            >
              A reference on software testing.
            </h2>
          </div>
        </m.div>

        {/* 3×3 section card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {([
            { label: 'Foundations',        slug: 'foundations',           article: 'what-is-software-testing',          count: 10, blurb: 'Theory, history and core principles of software testing.' },
            { label: 'Manual Testing',     slug: 'manual-testing',        article: 'introduction-to-manual-testing',    count: 7,  blurb: 'Exploratory testing, bug reporting and defect management.' },
            { label: 'Test Management',    slug: 'test-management',       article: 'test-planning-and-strategy',        count: 9,  blurb: 'Planning, risk prioritisation and stakeholder communication.' },
            { label: 'Automation',         slug: 'automation',            article: 'introduction-to-test-automation',   count: 14, blurb: 'Automation concepts, patterns and practices.' },
            { label: 'Specialist Testing', slug: 'specialist-testing',    article: 'api-testing',                       count: 14, blurb: 'API, performance, security, mobile and beyond.' },
            { label: 'Observability',      slug: 'observability',         article: 'logs-metrics-and-traces',           count: 5,  blurb: 'Monitoring, alerting, feature flags and production signals.' },
            { label: 'AI & Modern Testing',slug: 'ai-and-modern-testing', article: 'software-testing-in-the-age-of-ai', count: 7,  blurb: 'How AI changes testing and how to test AI systems.' },
            { label: 'Tooling',            slug: 'tooling',               article: 'browser-and-e2e-tools',             count: 9,  blurb: 'Practical guides to the tools powering modern testing.' },
            { label: 'Concepts',           slug: 'concepts',              article: 'writing-good-tests',                count: 4,  blurb: 'Strategy, good tests, legacy codebases and CI/CD.' },
          ] as const).map(({ label, slug, article, count, blurb }, i) => (
            <m.div
              key={slug}
              initial={reduced ? undefined : { opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: reduced ? 0 : i * 0.05 }}
            >
              <Link
                to={`/knowledge-base/${slug}/${article}`}
                onMouseEnter={() => prefetchSection(slug)}
                className="group flex flex-col h-full border border-bg-border rounded-card p-4 hover:border-accent/30 transition-colors duration-150"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p className="font-display font-semibold text-[14px] text-text-primary group-hover:text-link transition-colors duration-150 leading-snug">
                    {label}
                  </p>
                  <span className="font-mono text-[10px] text-text-muted flex-shrink-0 tabular-nums mt-0.5">
                    {count} art.
                  </span>
                </div>
                <p className="font-mono text-[12px] text-text-secondary leading-relaxed">
                  {blurb}
                </p>
              </Link>
            </m.div>
          ))}
        </div>

        <Link
          to="/knowledge-base"
          className="inline-flex items-center gap-2 font-mono text-[12px] tracking-wider text-link hover:text-link/80 transition-colors duration-150 group"
        >
          Explore the Knowledge Base
          <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" />
        </Link>
      </section>

      {/* ── Experience ───────────────────────────────────── */}
      <section
        className="px-6 md:px-10 pt-6 pb-8 max-w-6xl mx-auto"
        aria-labelledby="experience-heading"
      >
        <SectionLabel>Experience</SectionLabel>
        <h2
          id="experience-heading"
          className="font-display font-semibold text-[clamp(1.5rem,3vw,2rem)] text-text-primary mb-6"
        >
          Where I've worked.
        </h2>

        <div className="relative">
          {/* Vertical timeline line */}
          <div aria-hidden="true" className="absolute left-[7px] top-2 bottom-2 w-px bg-bg-border" />

          <div className="flex flex-col gap-0">
            {[
              { period: '2025',        role: 'Head of QA',          company: 'Cloudbooking' },
              { period: '2021 – 2024', role: 'Test Manager',         company: 'ITS Computing Ltd' },
              { period: '2019 – 2021', role: 'Senior QA Engineer',   company: 'HHA Exchange' },
              { period: '2017 – 2019', role: 'QA Engineer',          company: 'Flowlens' },
              { period: '2013 – 2016', role: 'UK QA Lead',           company: 'Concentrix' },
            ].map(({ period, role, company }, i) => (
              <m.div
                key={company}
                initial={reduced ? undefined : { opacity: 0, x: -12 }}
                whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.07 }}
                viewport={{ once: true, amount: 0.5 }}
                className="relative flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-4 pl-7 border-b border-bg-border last:border-b-0 group"
              >
                {/* Timeline dot */}
                <div
                  aria-hidden="true"
                  className="absolute left-0 w-3.5 h-3.5 rounded-full border-2 border-bg-border bg-bg-base group-hover:border-accent transition-colors duration-150"
                />

                <span className="font-mono text-[11px] tracking-wider text-text-muted uppercase sm:w-24 flex-shrink-0">
                  {period}
                </span>

                <span className="font-display font-semibold text-[15px] text-text-primary flex-1">
                  {role}
                </span>

                <span className="font-mono text-[12px] tracking-wide text-accent">
                  {company}
                </span>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact ───────────────────────────────────────── */}
      <section
        id="contact"
        className="bg-bg-surface border-t border-bg-border"
        aria-labelledby="contact-heading"
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 md:py-20">

          <SectionLabel>Get in touch</SectionLabel>
          <h2
            id="contact-heading"
            className="font-display font-semibold text-[clamp(1.5rem,3vw,2rem)] text-text-primary mb-10"
          >
            Let's work together.
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-start">

            {/* ── Left ── */}
            <div>
              <p className="text-text-secondary text-[15px] leading-relaxed mb-10">
                I am at my best in teams that move deliberately, care about quality and are genuinely exploring what AI can do for their delivery. If that sounds like your environment, I would love to talk.
              </p>

              <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-4">Connect</p>
              <div className="flex flex-col">
                {[
                  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/nickshawqa/', icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg> },
                  { name: 'GitHub',   href: 'https://github.com/nickshaw1',             icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/></svg> },
                  { name: 'X/Twitter', href: 'https://x.com/nickshawqa',               icon: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
                ].map(({ name, href, icon }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${name} (opens in new tab)`}
                    className="
                      group/link flex items-center gap-3
                      border-l-2 border-link/20 hover:border-link
                      pl-4 py-3
                      font-mono text-[11px] tracking-widest uppercase
                      text-text-muted hover:text-link
                      transition-all duration-150
                    "
                  >
                    <span className="opacity-60 group-hover/link:opacity-100 transition-opacity duration-150">{icon}</span>
                    {name}
                  </a>
                ))}
              </div>
            </div>

            {/* ── Right: form ── */}
            <div>
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </div>

          </div>
        </div>
      </section>
      <Suspense fallback={null}>
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
      </Suspense>
    </>
  )
}

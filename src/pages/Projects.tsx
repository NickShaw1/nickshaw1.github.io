import { useState, useCallback, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { m } from 'framer-motion'
import { ArrowUpRight, Monitor, BookOpen } from 'lucide-react'
import type { ComponentType } from 'react'

const SITES_ICON_MAP: Record<string, { icon: ComponentType<{ size?: number; className?: string }>; colour: string }> = {
  Monitor: { icon: Monitor, colour: 'text-[#fbbf24]' },
  BookOpen: { icon: BookOpen, colour: 'text-[#a78bfa]' },
}
import SEOHead from '../components/SEOHead'
import { collectionPageSchema } from '../seo/structured-data'
import ProjectCard from '../components/ProjectCard'
import SectionLabel from '../components/SectionLabel'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { projectsByCategory, type ProjectCategory, type ProjectItem } from '../data/projects'
import { meta } from '../data/meta'

const ProjectModal = lazy(() => import('../components/ProjectModal'))

const CATEGORY_ORDER: ProjectCategory[] = ['Sites', 'Exercises', 'GitHub', 'Testing']
const ALL_CATEGORIES = ['All', ...CATEGORY_ORDER] as const
type FilterCategory = typeof ALL_CATEGORIES[number]

export default function Projects() {
  const reduced = useReducedMotion()
  const [activeProject, setActiveProject]   = useState<ProjectItem | null>(null)
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All')

  const openModal  = useCallback((project: ProjectItem) => setActiveProject(project), [])
  const closeModal = useCallback(() => setActiveProject(null), [])

  const visibleCategories = activeCategory === 'All'
    ? CATEGORY_ORDER
    : [activeCategory as ProjectCategory]

  return (
    <>
      <SEOHead
        title={meta.seo.projects.title}
        description={meta.seo.projects.description}
        canonicalUrl="/projects"
        jsonLd={collectionPageSchema({
          name: 'Projects',
          description: meta.seo.projects.description,
          url: '/projects',
        })}
      />

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">

        {/* ── Header ──────────────────────────────────────── */}
        <m.div
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: 'easeOut' }}
          className="mb-10"
        >
          <SectionLabel>Work</SectionLabel>
          <h1 className="font-display font-bold text-[clamp(2rem,5vw,3rem)] text-text-primary leading-tight tracking-[-0.02em] mb-4">
            Projects.
          </h1>
          <p className="text-text-secondary text-[15px] leading-relaxed">
            A collection of exercises, tools and live sites built to develop and demonstrate my skills. Many of these were built in close collaboration with Claude Code, an honest reflection of how I work and what modern AI-assisted development looks like in practice.
          </p>
        </m.div>

        {/* ── Filter pills ── */}
        <m.div
          initial={reduced ? undefined : { opacity: 0, y: 12 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut', delay: 0.1 }}
          className="hidden sm:flex flex-wrap gap-2 mb-10"
          role="group"
          aria-label="Filter projects by category"
        >
          {ALL_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                font-mono text-[10px] tracking-widest uppercase
                px-3 py-1.5 rounded-pill border
                transition-colors duration-150
                ${cat === 'All' ? 'w-full sm:w-auto' : ''}
                ${activeCategory === cat
                  ? 'border-accent text-accent bg-accent/10'
                  : 'border-bg-border text-text-muted hover:text-text-secondary hover:border-text-muted/30'}
              `}
              aria-pressed={activeCategory === cat}
            >
              {cat}
            </button>
          ))}
        </m.div>

        {/* ── Category sections ───────────────────────────── */}
        {visibleCategories.map((cat, catIndex) => {
          const projects = projectsByCategory(cat)
          if (!projects?.length) return null
          return (
            <section
              key={cat}
              className="mb-16 last:mb-0"
              aria-labelledby={`cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <m.div
                initial={reduced ? undefined : { opacity: 0, y: 16 }}
                whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, ease: 'easeOut', delay: catIndex * 0.05 }}
                className="mb-6"
              >
                <h2
                  id={`cat-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className="font-mono text-[11px] tracking-widest uppercase text-text-muted border-b border-bg-border pb-3"
                >
                  {cat}
                  <span className="ml-2 text-accent">{projects.length}</span>
                </h2>
              </m.div>

              {cat === 'Sites' ? (
                <div className="flex flex-col gap-6">
                  {projects.map((project, i) => (
                    <m.article
                      key={project.id}
                      initial={reduced ? undefined : { opacity: 0, y: 16 }}
                      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.1 }}
                      transition={{ duration: 0.45, ease: 'easeOut', delay: reduced ? 0 : i * 0.07 }}
                      className="group relative flex flex-col bg-bg-surface border border-bg-border rounded-card p-5 hover:border-accent/30 transition-colors duration-150"
                    >
                      {/* Header row: title + category badge */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h3 className="font-display font-medium text-[17px] text-text-primary leading-snug flex items-center gap-2 min-w-0">
                          {project.icon && SITES_ICON_MAP[project.icon] && (() => {
                            const { icon: Icon, colour } = SITES_ICON_MAP[project.icon!]
                            return <Icon size={15} className={`${colour} flex-shrink-0`} />
                          })()}
                          <span className="truncate">{project.title}</span>
                        </h3>
                        <span className="flex-shrink-0 font-mono text-[10px] tracking-wider uppercase text-text-muted border border-bg-border rounded-tag px-1.5 py-0.5 mt-0.5">
                          {project.category}
                        </span>
                      </div>

                      <p className="text-text-secondary text-sm leading-relaxed mb-4">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {project.stack.map((tag) => (
                          <span key={tag} className="font-mono text-[11px] tracking-wide bg-accent/10 text-accent px-2 py-0.5 rounded-tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="border-t border-bg-border pt-3 mt-4 flex items-center gap-3">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} (opens in new tab)`}
                            className="ml-auto flex items-center gap-1 group-hover:gap-1.5 font-mono text-[11px] tracking-wide text-link hover:text-link/80 transition-all duration-150 after:absolute after:inset-0"
                          >
                            view site <ArrowUpRight size={12} aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </a>
                        )}
                        {project.internalUrl && (
                          <Link
                            to={project.internalUrl}
                            aria-label={project.title}
                            className="ml-auto flex items-center gap-1 group-hover:gap-1.5 font-mono text-[11px] tracking-wide text-link hover:text-link/80 transition-all duration-150 after:absolute after:inset-0"
                          >
                            view site <ArrowUpRight size={12} aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </Link>
                        )}
                      </div>
                    </m.article>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {projects.map((project, i) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      delay={reduced ? 0 : i * 70}
                      reduced={reduced}
                      onDetailClick={openModal}
                    />
                  ))}
                </div>
              )}
            </section>
          )
        })}

      </div>

      <Suspense fallback={null}>
        <ProjectModal project={activeProject} onClose={closeModal} />
      </Suspense>
    </>
  )
}

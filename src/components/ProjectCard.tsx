import { memo } from 'react'
import type { ComponentType } from 'react'
import {
  ArrowUpRight,
  Rocket, Satellite, Music, Cloud, Plane, DollarSign, MessageSquare,
  Layers, ChevronDown, Calculator, Square, Palette, Hash,
  Code2, Terminal, Heart, FlaskConical, Play, Monitor, Activity,
} from 'lucide-react'
import { m } from 'framer-motion'
import type { ProjectItem, ProjectCategory } from '../data/projects'

const ICON_MAP: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Rocket, Satellite, Music, Cloud, Plane, DollarSign, MessageSquare,
  Layers, ChevronDown, Calculator, Square, Palette, Hash,
  Code2, Terminal, Heart, FlaskConical, Play, Monitor, Activity,
}

interface ProjectCardProps {
  project: ProjectItem
  delay?: number
  reduced?: boolean
  onDetailClick?: (project: ProjectItem) => void
  disableHighlight?: boolean
}

const CATEGORY_COLOURS: Record<ProjectCategory, string> = {
  Exercises: 'text-[#e879f9]',
  GitHub:    'text-[#60a5fa]',
  Testing:   'text-[#fb7185]',
  Sites:     'text-[#a78bfa]',
}

function HighlightedCard({ project, cardVariants, reduced, onDetailClick }: {
  project: ProjectItem
  cardVariants: object
  reduced: boolean
  onDetailClick?: (project: ProjectItem) => void
}) {
  const hasDetail     = !!project.detail
  const primaryAction = project.liveUrl ? 'live' : project.githubUrl ? 'github' : hasDetail ? 'detail' : null
  const stretched     = "after:absolute after:inset-0 after:content-['']"
  const elevated      = 'relative z-10'
  const ProjectIcon   = project.icon ? (ICON_MAP[project.icon] ?? null) : null

  return (
    <m.article
      variants={reduced ? undefined : cardVariants}
      initial={reduced ? undefined : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.1 }}
      className="group relative flex flex-col rounded-card h-full overflow-hidden border border-[#0b3d91] bg-gradient-to-br from-[#040d1f] via-[#061028] to-[#080a12] hover:border-[#1a5dcc] hover:shadow-[0_0_40px_rgba(11,61,145,0.5)] hover:-translate-y-1 transition-all duration-200"
    >

      <div className="flex flex-col flex-1 p-5">

        {/* Header: title + Live pill */}
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-display font-semibold text-[17px] text-white leading-snug flex items-center gap-2 min-w-0">
            {ProjectIcon && <ProjectIcon size={15} className="text-[#fc3d21] flex-shrink-0" />}
            <span className="truncate">{project.title}</span>
          </h3>
          {/* Live pill — matches the demo exactly */}
          <div className="flex-shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/[6%] border border-accent/[15%]">
            <span className="pulse-dot w-1.5 h-1.5 rounded-full flex-shrink-0 bg-accent" style={{ boxShadow: '0 0 6px #0AFF9D' }} />
            <span className="font-mono text-[9px] tracking-widest uppercase text-accent">Live</span>
          </div>
        </div>

        {/* Mission tagline */}
        <p className="font-mono text-[10px] tracking-widest uppercase text-[#4a7fd4] mb-3">
          Historic Lunar Flyby · April 2026
        </p>

        <div className="flex-1">
          {/* Description */}
          <div className="mb-4 overflow-hidden">
            <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>

          {/* Crew */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { name: 'Wiseman',  file: 'wiseman1.png' },
              { name: 'Koch',     file: 'koch1.png'    },
              { name: 'Glover',   file: 'glover1.png'  },
              { name: 'Hansen',   file: 'hansen1.png'  },
            ].map(({ name, file }) => (
              <div key={name} className="flex flex-col items-center gap-1.5">
                <div className="w-full aspect-square rounded-full overflow-hidden border-2 border-white/60">
                  <img
                    src={`/astronauts/${file}`}
                    alt={name}
                    className="w-full h-full object-cover object-[center_15%]"
                  />
                </div>
                <span className="font-mono text-[9px] tracking-widest uppercase text-white/70 text-center">{name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#0b3d91]/60 pt-3 mt-4 flex items-center gap-3">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} on GitHub (opens in new tab)`}
              className={`ml-auto flex items-center gap-1 group-hover:gap-1.5 font-mono text-[11px] tracking-wide text-link hover:text-link/80 transition-all duration-150 ${primaryAction === 'github' ? stretched : elevated}`}
            >
              GitHub <ArrowUpRight size={12} aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} live site (opens in new tab)`}
              className={`ml-auto flex items-center gap-1 group-hover:gap-1.5 font-mono text-[11px] tracking-wide text-link hover:text-link/80 transition-all duration-150 ${primaryAction === 'live' ? stretched : elevated}`}
            >
              live site <ArrowUpRight size={12} aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          )}
          {hasDetail && onDetailClick && (
            <button
              onClick={() => onDetailClick(project)}
              aria-label={`View details for ${project.title}`}
              className={`ml-auto flex items-center gap-1 group-hover:gap-1.5 font-mono text-[11px] tracking-wide text-link hover:text-link/80 transition-all duration-150 ${primaryAction === 'detail' ? stretched : elevated}`}
            >
              view details <ArrowUpRight size={12} aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          )}
        </div>

      </div>
    </m.article>
  )
}

function ProjectCard({ project, delay = 0, reduced = false, onDetailClick, disableHighlight = false }: ProjectCardProps) {
  const hasLink    = project.liveUrl ?? project.githubUrl
  const isExternal = !!hasLink
  const hasDetail  = !!project.detail
  const iconColour = CATEGORY_COLOURS[project.category]

  const cardVariants = reduced
    ? {}
    : {
        hidden:  { opacity: 0, y: 20 },
        visible: {
          opacity: 1, y: 0,
          transition: { duration: 0.45, ease: 'easeOut', delay: delay / 1000 },
        },
      }

  const ProjectIcon = project.icon ? (ICON_MAP[project.icon] ?? null) : null

  if (project.highlighted && !disableHighlight) {
    return <HighlightedCard project={project} cardVariants={cardVariants} reduced={reduced} onDetailClick={onDetailClick} />
  }

  const primaryAction = project.liveUrl ? 'live' : project.githubUrl ? 'github' : hasDetail ? 'detail' : null
  const stretched = "after:absolute after:inset-0 after:content-['']"
  const elevated  = 'relative z-10'

  return (
    <m.article
      variants={reduced ? undefined : cardVariants}
      initial={reduced ? undefined : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.1 }}
      className="group relative flex flex-col bg-bg-surface border border-bg-border rounded-card p-5 h-full hover:border-accent/30 transition-colors duration-150"
    >
      {/* Header row: title + category badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="font-display font-medium text-[17px] text-text-primary leading-snug flex items-center gap-2 min-w-0">
          {ProjectIcon && <ProjectIcon size={15} className={`${iconColour} flex-shrink-0`} />}
          <span className="truncate">{project.title}</span>
        </h3>
        <span className="flex-shrink-0 font-mono text-[10px] tracking-wider uppercase text-text-muted border border-bg-border rounded-tag px-1.5 py-0.5 mt-0.5">
          {project.category}
        </span>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="h-[72px] mb-4 overflow-hidden">
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[11px] tracking-wide bg-accent/10 text-accent px-2 py-0.5 rounded-tag"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer separator + links row */}
      <div className="border-t border-bg-border pt-3 mt-4 flex items-center gap-3">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub (opens in new tab)`}
            className={`ml-auto flex items-center gap-1 group-hover:gap-1.5 font-mono text-[11px] tracking-wide text-link hover:text-link/80 transition-all duration-150 ${primaryAction === 'github' ? stretched : elevated}`}
          >
            GitHub <ArrowUpRight size={12} aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live site (opens in new tab)`}
            className={`ml-auto flex items-center gap-1 group-hover:gap-1.5 font-mono text-[11px] tracking-wide text-link hover:text-link/80 transition-all duration-150 ${primaryAction === 'live' ? stretched : elevated}`}
          >
            live site <ArrowUpRight size={12} aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
        {!isExternal && !hasDetail && (
          <span className="font-mono text-[11px] text-text-muted">exercise</span>
        )}
        {hasDetail && onDetailClick && (
          <button
            onClick={() => onDetailClick(project)}
            aria-label={`View details for ${project.title}`}
            className={`ml-auto flex items-center gap-1 group-hover:gap-1.5 font-mono text-[11px] tracking-wide text-link hover:text-link/80 transition-all duration-150 ${primaryAction === 'detail' ? stretched : elevated}`}
          >
            view details <ArrowUpRight size={12} aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        )}
      </div>
    </m.article>
  )
}

export default memo(ProjectCard)

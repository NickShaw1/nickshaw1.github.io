import { memo } from 'react'
import type { ComponentType } from 'react'
import {
  ArrowUpRight,
  Rocket, Satellite, Music, Cloud, Plane, DollarSign, MessageSquare,
  Layers, ChevronDown, Calculator, Square, Palette, Hash,
  Code2, Terminal, Heart, FlaskConical, Play, Monitor,
} from 'lucide-react'
import { m } from 'framer-motion'
import type { ProjectItem, ProjectCategory } from '../data/projects'

const ICON_MAP: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Rocket, Satellite, Music, Cloud, Plane, DollarSign, MessageSquare,
  Layers, ChevronDown, Calculator, Square, Palette, Hash,
  Code2, Terminal, Heart, FlaskConical, Play, Monitor,
}

interface ProjectCardProps {
  project: ProjectItem
  /** Delay for staggered scroll entrance (ms) */
  delay?: number
  reduced?: boolean
  onDetailClick?: (project: ProjectItem) => void
}

const CATEGORY_COLOURS: Record<ProjectCategory, string> = {
  Exercises: 'text-[#e879f9]',
  GitHub:    'text-[#60a5fa]',
  Testing:   'text-[#fb7185]',
  Sites:     'text-[#a78bfa]',
}

function ProjectCard({ project, delay = 0, reduced = false, onDetailClick }: ProjectCardProps) {
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

  // Stretched-link pattern: primary action covers the whole card; secondary sits above it
  const primaryAction = project.liveUrl ? 'live' : project.githubUrl ? 'github' : hasDetail ? 'detail' : null
  const stretched = "after:absolute after:inset-0 after:content-['']"
  const elevated  = 'relative z-10'

  return (
    <m.article
      variants={reduced ? undefined : cardVariants}
      initial={reduced ? undefined : 'hidden'}
      whileInView={reduced ? undefined : 'visible'}
      viewport={{ once: true, amount: 0.1 }}

      className="
        group relative flex flex-col
        bg-bg-surface border border-bg-border rounded-card
        p-5 h-full
        hover:border-accent/30
        transition-colors duration-150
      "
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

      <div className="flex-1">
        <div className="h-[72px] mb-4 overflow-hidden">
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-1.5">
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
            className={`
              ml-auto flex items-center gap-1 group-hover:gap-1.5
              font-mono text-[11px] tracking-wide text-link
              hover:text-link/80 transition-all duration-150
              ${primaryAction === 'github' ? stretched : elevated}
            `}
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
            className={`
              ml-auto flex items-center gap-1 group-hover:gap-1.5
              font-mono text-[11px] tracking-wide text-link
              hover:text-link/80 transition-all duration-150
              ${primaryAction === 'live' ? stretched : elevated}
            `}
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
            className={`
              ml-auto flex items-center gap-1 group-hover:gap-1.5
              font-mono text-[11px] tracking-wide text-link
              hover:text-link/80 transition-all duration-150
              ${primaryAction === 'detail' ? stretched : elevated}
            `}
          >
            view details <ArrowUpRight size={12} aria-hidden="true" className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        )}
      </div>
    </m.article>
  )
}

export default memo(ProjectCard)

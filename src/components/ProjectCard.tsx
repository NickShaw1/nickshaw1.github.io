import { memo } from 'react'
import type { ComponentType } from 'react'
import {
  ArrowUpRight,
  Satellite, Music, Cloud, Plane, DollarSign, MessageSquare,
  Layers, ChevronDown, Calculator, Square, Palette, Hash,
  Code2, Terminal, Heart, FlaskConical, Play,
} from 'lucide-react'
import { motion } from 'framer-motion'
import type { ProjectItem, ProjectCategory } from '../data/projects'

const ICON_MAP: Record<string, ComponentType<{ size?: number; className?: string }>> = {
  Satellite, Music, Cloud, Plane, DollarSign, MessageSquare,
  Layers, ChevronDown, Calculator, Square, Palette, Hash,
  Code2, Terminal, Heart, FlaskConical, Play,
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

  return (
    <motion.article
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
      <span className="
        absolute top-3 right-3
        font-mono text-[10px] tracking-wider uppercase
        text-text-muted border border-bg-border rounded-tag px-1.5 py-0.5
      ">
        {project.category}
      </span>

      <div className="flex-1 pr-16">
        <h3 className="font-display font-medium text-[17px] text-text-primary mb-2 leading-snug flex items-center gap-2">
          {ProjectIcon && <ProjectIcon size={15} className={`${iconColour} flex-shrink-0`} />}
          <span className="truncate">{project.title}</span>
        </h3>
        <div className="h-[72px] mb-4 overflow-hidden">
          <p className="text-text-secondary text-sm leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>
      </div>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.stack.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[11px] tracking-wide bg-accent/10 text-accent px-2 py-0.5 rounded-tag"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links row */}
      <div className="flex items-center gap-3 mt-auto">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} on GitHub (opens in new tab)`}
            className="
              ml-auto flex items-center gap-1 group-hover:gap-1.5
              font-mono text-[11px] tracking-wide text-link
              hover:text-link/80 transition-all duration-150
            "
          >
            GitHub <ArrowUpRight size={12} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live site (opens in new tab)`}
            className="
              ml-auto flex items-center gap-1 group-hover:gap-1.5
              font-mono text-[11px] tracking-wide text-link
              hover:text-link/80 transition-all duration-150
            "
          >
            live site <ArrowUpRight size={12} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        )}
        {!isExternal && !hasDetail && (
          <span className="font-mono text-[11px] text-text-muted">exercise</span>
        )}
        {hasDetail && onDetailClick && (
          <button
            onClick={() => onDetailClick(project)}
            className="
              ml-auto flex items-center gap-1 group-hover:gap-1.5
              font-mono text-[11px] tracking-wide text-link
              hover:text-link/80 transition-all duration-150
            "
          >
            view details <ArrowUpRight size={12} className="transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        )}
      </div>
    </motion.article>
  )
}

export default memo(ProjectCard)

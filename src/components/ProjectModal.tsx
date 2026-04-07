import { useEffect, useRef, lazy, Suspense } from 'react'
import { m, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useReducedMotion } from '../hooks/useReducedMotion'
import type { ProjectItem } from '../data/projects'

interface ProjectModalProps {
  project: ProjectItem | null
  onClose: () => void
}

const DEMO_COMPONENTS: Partial<Record<string, React.LazyExoticComponent<() => React.ReactElement>>> = {
  'counter':            lazy(() => import('./demos/CounterDemo')),
  'colour-flipper':     lazy(() => import('./demos/ColourFlipperDemo')),
  'simple-modal':       lazy(() => import('./demos/SimpleModalDemo')),
  'calculator':         lazy(() => import('./demos/CalculatorDemo')),
  'accordion':          lazy(() => import('./demos/AccordionDemo')),
  'tabs':               lazy(() => import('./demos/TabsDemo')),
  'reviews-carousel':   lazy(() => import('./demos/ReviewsCarouselDemo')),
  'currency-converter': lazy(() => import('./demos/CurrencyConverterDemo')),
  'weather-app':        lazy(() => import('./demos/WeatherDemo')),
  'piano':              lazy(() => import('./demos/SynthDemo')),
  'artemis-tracker':    lazy(() => import('./demos/ArtemisTrackerDemo')),
  'iss-tracker':        lazy(() => import('./demos/ISSTrackerDemo')),
  'holiday-planner':    lazy(() => import('./demos/HolidayPlannerDemo')),
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const reduced  = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (project) {
      closeRef.current?.focus()
      document.body.style.overflow = 'hidden'
    }
    return () => { document.body.style.overflow = '' }
  }, [project])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  const DemoComponent = project?.id ? DEMO_COMPONENTS[project.id] : undefined

  return (
    <AnimatePresence>
      {project && (
        /* Single element: backdrop + flex centering + click-to-close */
        <m.div
          key="modal"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          exit={reduced ? undefined : { opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex items-start sm:items-center justify-center sm:p-4 bg-black/75 backdrop-blur-md"
          onClick={onClose}
        >
          {/* Panel */}
          <m.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-hidden="false"
            aria-labelledby="modal-title"
            initial={reduced ? undefined : { opacity: 0, y: 40, scale: 0.96 }}
            animate={reduced ? undefined : { opacity: 1, y: 0,  scale: 1    }}
            exit={reduced   ? undefined : { opacity: 0, y: 20, scale: 0.97  }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`
              relative w-full
              h-screen sm:h-auto sm:max-h-[90vh] overflow-y-auto
              bg-bg-elevated border-0 sm:border border-bg-border rounded-none sm:rounded-card
              p-5 sm:p-8
              shadow-2xl shadow-black/60
              ${project.modalSize === 'expanded' ? 'sm:max-w-4xl' : 'sm:max-w-xl'}
            `}
            tabIndex={-1}
          >
            {/* Category + close row */}
            <div className="flex items-center justify-between mb-3">
              <span className="
                font-mono text-[10px] tracking-widest uppercase
                bg-accent/10 text-accent px-2 py-0.5 rounded-tag
              ">
                {project.category}
              </span>
              <button
                ref={closeRef}
                onClick={onClose}
                aria-label="Close"
                className="flex-shrink-0 text-text-muted hover:text-text-primary transition-colors duration-150"
              >
                <X size={16} />
              </button>
            </div>

            {/* Stack pills */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {project.stack.map(tag => (
                <span key={tag} className="
                  font-mono text-[10px] tracking-wide
                  border border-bg-border text-text-muted
                  px-2 py-0.5 rounded-tag
                ">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h2
              id="modal-title"
              className="font-display font-bold text-[1.375rem] text-text-primary leading-snug mb-3"
            >
              {project.title}
            </h2>

            {project.detail && (
              <>
                <p className="text-text-secondary text-[14px] leading-relaxed mb-5">
                  {project.detail.body}
                </p>

                {DemoComponent && (
                  <Suspense fallback={<div className="mb-5 h-24" />}>
                    <DemoComponent />
                  </Suspense>
                )}

                <div className="mb-5">
                  <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">
                    What this demonstrates
                  </p>
                  <ul className="space-y-2">
                    {project.detail.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-[13px] text-text-secondary">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                {project.detail.codeSnippet && (
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
                      Core logic
                    </p>
                    <pre className="
                      bg-bg-surface border border-bg-border rounded-card
                      p-4 overflow-x-hidden
                      font-mono text-[11px] leading-[1.7] text-text-secondary
                      whitespace-pre-wrap break-words
                    ">
                      <code>{project.detail.codeSnippet}</code>
                    </pre>
                  </div>
                )}
              </>
            )}
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}

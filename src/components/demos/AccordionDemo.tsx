import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ACCORDION_ITEMS = [
  { title: 'What is test-driven development?',   body: 'TDD means writing a failing test before writing the code that makes it pass. Red → Green → Refactor.' },
  { title: 'What does a QA engineer actually do?', body: 'Finds gaps between what was built and what was intended, through exploratory testing, automation and asking awkward questions early.' },
  { title: 'When should you automate a test?',    body: "When it's stable, repeated often, and the cost of maintaining the script is less than the cost of running it manually each sprint." },
]

export default function AccordionDemo() {
  const [open, setOpen] = useState<number | null>(0)
  return (
    <div className="mb-5">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Live demo</p>
      <div className="bg-bg-surface border border-bg-border rounded-card overflow-hidden divide-y divide-bg-border">
        {ACCORDION_ITEMS.map((item, i) => (
          <div key={i}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-4 py-3 text-left"
              aria-expanded={open === i}
            >
              <span className="font-display text-[13px] text-text-primary leading-snug pr-4">{item.title}</span>
              <span className={`font-mono text-text-muted text-lg leading-none flex-shrink-0 transition-transform duration-200 ${open === i ? 'rotate-45' : ''}`}>+</span>
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 text-[13px] text-text-secondary leading-relaxed">{item.body}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  )
}

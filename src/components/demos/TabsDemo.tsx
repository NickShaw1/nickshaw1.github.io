import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TABS_DATA = [
  { label: 'Overview',   content: 'Tabs keep related content in one place without navigating away. Only one panel is visible at a time, determined by the active tab.' },
  { label: 'Use cases',  content: 'Settings pages, product details, dashboards and anywhere you need to organise content into discrete categories without a full page change.' },
  { label: 'The pattern', content: 'Each tab maps to a panel by index. Clicking a tab sets it as active, which unhides its panel and hides all others.' },
]

export default function TabsDemo() {
  const [active, setActive] = useState(0)
  return (
    <div className="mb-5">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Live demo</p>
      <div className="bg-bg-surface border border-bg-border rounded-card overflow-hidden">
        <div className="flex border-b border-bg-border">
          {TABS_DATA.map((tab, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-selected={active === i}
              className={`
                flex-1 py-2.5 font-mono text-[10px] tracking-wider uppercase
                transition-colors duration-150 border-b-2
                ${active === i
                  ? 'text-accent border-accent'
                  : 'text-text-muted border-transparent hover:text-text-secondary'}
              `}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-4 min-h-[72px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={active}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.15 }}
              className="text-[13px] text-text-secondary leading-relaxed"
            >
              {TABS_DATA[active].content}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

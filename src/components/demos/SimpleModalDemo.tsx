import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SIMPLE_MODAL_CONTENT = {
  title: 'Modal title',
  body:  'This is the modal body. Click the backdrop or the close button to dismiss.',
}

export default function SimpleModalDemo() {
  const [open, setOpen] = useState(false)
  return (
    <div className="mb-5">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Live demo</p>
      <div className="relative flex items-center justify-center bg-bg-surface border border-bg-border rounded-card py-8 px-6 overflow-hidden" style={{ minHeight: 160 }}>
        <button
          onClick={() => setOpen(true)}
          className="font-mono text-[11px] tracking-widest uppercase px-4 py-2 rounded-pill border border-accent text-accent hover:bg-accent/10 transition-colors duration-150"
        >
          Open modal
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-card"
              onClick={() => setOpen(false)}
            >
              <motion.div
                initial={{ scale: 0.92 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }}
                transition={{ duration: 0.15 }}
                onClick={e => e.stopPropagation()}
                className="bg-bg-elevated border border-bg-border rounded-card p-5 w-[80%] max-w-xs"
              >
                <p className="font-display font-semibold text-[15px] text-text-primary mb-2">{SIMPLE_MODAL_CONTENT.title}</p>
                <p className="text-text-secondary text-[12px] leading-relaxed mb-4">{SIMPLE_MODAL_CONTENT.body}</p>
                <button
                  onClick={() => setOpen(false)}
                  className="font-mono text-[10px] tracking-widest uppercase text-accent hover:text-accent-dark transition-colors duration-150"
                >
                  Close ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

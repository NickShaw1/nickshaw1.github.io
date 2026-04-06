import { useState } from 'react'
import { m, AnimatePresence } from 'framer-motion'

const REVIEWS = [
  {
    name: 'Gillian Sleith',
    role: 'IT Program Manager',
    text: 'I had the pleasure of working with Nick on a key software development project and was impressed by his extensive testing knowledge. The test plans and related documentation Nick produced were comprehensive and clearly thought out. His attention to detail was admirable and helped ensure that the software being delivered was of a high quality and fully met the client\'s requirements. Nick sets high standards both for himself and his team and does not compromise on these. I would definitely recommend Nick for a lead test management role.',
  },
  {
    name: 'Caroline Colgan',
    role: 'QA Colleague',
    text: 'Working with Nick at HHA Exchange was an absolute pleasure! He was such a diligent and professional member of the QA team. I really appreciated his commitment to detail and his always positive attitude. I\'m so grateful for the time we got to collaborate and learn from each other.',
  },
  {
    name: 'Devin Maulayah',
    role: 'Engineering Lead',
    text: 'I recruited and worked closely with Nick as Lead QA, and for a period as Head of QA. He brought a strong balance of process, platform and people-focused thinking to how we ran our SDLC, with a clear understanding of how to embed quality into delivery rather than treat it as a final step. Nick worked professionally at all times, consistently brought forward new ideas, and built strong relationships across engineering and product. Nick is a dependable QA leader who improves both teams and outcomes, and I\'d happily recommend him.',
  },
  {
    name: 'Shruthi Jagadishwara',
    role: 'QA',
    text: 'I had the pleasure of working with Nick at HHAExchange. He excelled in his role, approaching every task with strong skill, attention to detail in delivering quality work. Nick was never hesitant to raise questions or speak up when something did not look right. He is an excellent team player and would be a valuable addition to any engineering team.',
  },
  {
    name: 'Sarah Parry',
    role: 'Knowledge Manager / Project Administrator',
    text: 'I was lucky enough to work with Nick last year. He was always very professional and dealt with my many varied questions and queries promptly and with a gracious good humour. I wish him well for the future as I\'m sure he will bring that good natured professionalism to any role he undertakes.',
  },
]

export default function ReviewsCarouselDemo() {
  const [index, setIndex] = useState(0)
  const review = REVIEWS[index]

  const prev = () => setIndex(i => (i - 1 + REVIEWS.length) % REVIEWS.length)
  const next = () => setIndex(i => (i + 1) % REVIEWS.length)
  const random = () => {
    let r = index
    while (r === index) r = Math.floor(Math.random() * REVIEWS.length)
    setIndex(r)
  }

  return (
    <div className="mb-5">
      <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Live demo</p>
      <div className="bg-bg-surface border border-bg-border rounded-card p-5">
        <div className="h-48 overflow-y-auto overflow-x-hidden pr-3">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={index}
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-3">
                <p className="font-display font-semibold text-[14px] text-text-primary">{review.name}</p>
                <p className="font-mono text-[11px] text-accent tracking-wide">{review.role}</p>
              </div>
              <p className="text-text-secondary text-[13px] leading-relaxed">
                "{review.text}"
              </p>
            </m.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between mt-5 pt-4 border-t border-bg-border">
          <div className="flex gap-2">
            <button
              onClick={prev}
              aria-label="Previous review"
              className="w-8 h-8 rounded-full border border-bg-border text-text-muted hover:border-accent/40 hover:text-accent font-mono text-sm transition-colors duration-150"
            >
              ‹
            </button>
            <button
              onClick={next}
              aria-label="Next review"
              className="w-8 h-8 rounded-full border border-bg-border text-text-muted hover:border-accent/40 hover:text-accent font-mono text-sm transition-colors duration-150"
            >
              ›
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={random}
              aria-label="Random review"
              className="font-mono text-[10px] tracking-widest uppercase text-text-muted hover:text-text-secondary transition-colors duration-150"
            >
              random
            </button>
            <span className="font-mono text-[11px] text-text-muted">
              {index + 1} / {REVIEWS.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

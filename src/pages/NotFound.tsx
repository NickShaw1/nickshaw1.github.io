import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SEOHead from '../components/SEOHead'
import { useReducedMotion } from '../hooks/useReducedMotion'

export default function NotFound() {
  const reduced = useReducedMotion()
  const anim = reduced
    ? {}
    : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 } }

  return (
    <>
      <SEOHead
        title="404 – Page not found | Nick Shaw"
        description="This page doesn't exist. Head back to the homepage."
        canonicalUrl="/404"
      />
      <div className="min-h-[80vh] flex items-center justify-center px-6 text-center">
        <motion.div className="max-w-md" {...anim}>
          <p className="font-mono text-[11px] text-accent tracking-widest uppercase mb-6">
            404 – not found
          </p>
          <h1 className="font-display font-bold text-5xl tracking-tight mb-4">
            Wrong<span className="text-accent"> turn.</span>
          </h1>
          <p className="text-text-secondary text-[15px] leading-relaxed mb-10">
            This page doesn't exist, or it may have moved. Head back to the
            homepage and we'll pretend this never happened.
          </p>
          <Link
            to="/"
            className="
              inline-block font-mono text-[12px] tracking-widest uppercase
              bg-accent text-bg-base px-6 py-3 rounded-pill
              hover:bg-accent-dark transition-colors duration-150
            "
          >
            Back to home
          </Link>
        </motion.div>
      </div>
    </>
  )
}

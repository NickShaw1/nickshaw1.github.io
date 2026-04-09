import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { X, Menu } from 'lucide-react'
import { m, AnimatePresence, type Easing } from 'framer-motion'
import { useReducedMotion } from '../hooks/useReducedMotion'
import { useGlitchText } from '../hooks/useGlitchText'
import { meta } from '../data/meta'

const NAV_LINKS = [
  { to: '/',                label: 'Home'     },
  { to: '/about',           label: 'About'    },
  { to: '/blog',            label: 'Blog'     },
  { to: '/projects',        label: 'Projects' },
  { to: '/knowledge-base',  label: 'Knowledge' },
] as const

export default function Nav() {
  const [scrolled,    setScrolled]    = useState(false)
  const [menuOpen,    setMenuOpen]    = useState(false)
  const prefersReduced                = useReducedMotion()
  const { display: logoText, start: glitchStart, reset: glitchReset } = useGlitchText('nick.shaw')
  const location                      = useLocation()
  const hamburgerRef                  = useRef<HTMLButtonElement>(null)
  const overlayRef                    = useRef<HTMLDivElement>(null)

  // Close menu on route change
  useEffect(() => { setMenuOpen(false) }, [location.pathname])

  // Scroll listener for backdrop blur
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Escape key closes overlay
  useEffect(() => {
    if (!menuOpen) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        hamburgerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [menuOpen])

  // Focus trap inside overlay
  useEffect(() => {
    if (!menuOpen || !overlayRef.current) return
    const focusable = overlayRef.current.querySelectorAll<HTMLElement>(
      'a, button, [tabindex]:not([tabindex="-1"])'
    )
    const first = focusable[0]
    const last  = focusable[focusable.length - 1]
    first?.focus()

    const trap = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last)  { e.preventDefault(); first?.focus() }
      }
    }
    document.addEventListener('keydown', trap)
    return () => document.removeEventListener('keydown', trap)
  }, [menuOpen])

  // Prevent body scroll when overlay open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const overlayVariants = prefersReduced
    ? {}
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: 0.2 } },
        exit:    { opacity: 0, transition: { duration: 0.15 } },
      }

  const linkListVariants = prefersReduced
    ? {}
    : {
        animate: { transition: { staggerChildren: 0.07 } },
      }

  const EASE_OUT: Easing = 'easeOut'
  const linkItemVariants = prefersReduced
    ? {}
    : {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0, transition: { duration: 0.3, ease: EASE_OUT } },
      }

  return (
    <>
      {/* ── Skip link ── */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* ── Sticky nav bar ── */}
      <header
        role="banner"
        className={[
          'fixed top-0 left-0 right-0 z-50',
          'h-[72px]',
          'bg-bg-base border-b border-bg-border',
          'transition-all duration-300',
          scrolled ? 'backdrop-blur-md bg-bg-base/90' : '',
        ].join(' ')}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-full flex items-center justify-between">

        {/* Logo */}
        <NavLink
            to="/"
            aria-label="Nick Shaw, home"
            onMouseEnter={prefersReduced ? undefined : glitchStart}
            onMouseLeave={prefersReduced ? undefined : glitchReset}
            onFocus={prefersReduced ? undefined : glitchStart}
            onBlur={prefersReduced ? undefined : glitchReset}
            className="font-display font-bold text-lg text-text-primary hover:text-text-primary transition-colors duration-150 focus-visible:outline-accent font-mono"
          >
            {logoText.split('').map((char, i) =>
              char === '.' ? <span key={i} className="text-accent">.</span> : char
            )}
          </NavLink>

        {/* Desktop nav */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 list-none m-0 p-0" role="list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={to === '/'}
                  aria-current={undefined}
                  className={({ isActive }) =>
                    [
                      'nav-link font-mono text-[13px] tracking-wide transition-colors duration-150',
                      isActive
                        ? 'text-text-primary'
                        : 'text-text-secondary hover:text-text-primary',
                    ].join(' ')
                  }
                  {...({ 'aria-current': undefined } as object)}
                >
                  {({ isActive }) => (
                    <span aria-current={isActive ? 'page' : undefined}>
                      {label}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Hire me */}
          <a
            href="/#contact"
            className="
              font-mono text-[12px] font-semibold tracking-widest uppercase
              bg-accent text-bg-base
              px-4 py-2 rounded-pill
              shadow-[0_0_24px_rgba(10,255,157,0.25)]
              hover:bg-accent/90 hover:shadow-[0_0_32px_rgba(10,255,157,0.35)]
              transition-all duration-150
              focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2
            "
          >
            contact
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((o) => !o)}
          className="
            md:hidden flex items-center justify-center
            w-11 h-11 -mr-2
            text-text-secondary hover:text-text-primary
            transition-colors duration-150
          "
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            id="mobile-menu"
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            {...(prefersReduced
              ? { style: { opacity: 1 } }
              : overlayVariants
            )}
            initial="initial"
            animate="animate"
            exit="exit"
            className="
              fixed inset-0 z-40
              bg-bg-base/95 backdrop-blur-lg
              flex flex-col justify-center
              px-8 overflow-hidden
              md:hidden
            "
          >
            <m.ul
              role="list"
              className="list-none m-0 p-0 flex flex-col gap-1"
              {...(prefersReduced ? {} : linkListVariants)}
              initial="initial"
              animate="animate"
            >
              {NAV_LINKS.map(({ to, label }) => (
                <m.li
                  key={to}
                  {...(prefersReduced ? {} : linkItemVariants)}
                >
                  <NavLink
                    to={to}
                    end={to === '/'}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      [
                        'flex items-center gap-4 py-2 group',
                        'font-display font-semibold text-[1.75rem] tracking-tight',
                        'transition-colors duration-150',
                        isActive
                          ? 'text-text-primary'
                          : 'text-text-secondary/50 hover:text-text-primary',
                      ].join(' ')
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`w-0.5 h-6 rounded-full flex-shrink-0 transition-colors duration-150 ${isActive ? 'bg-accent' : 'bg-bg-border group-hover:bg-accent'}`} />
                        {label}
                      </>
                    )}
                  </NavLink>
                </m.li>
              ))}

              <m.li {...(prefersReduced ? {} : linkItemVariants)}>
                <a
                  href="/#contact"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-4 py-2 group font-display font-semibold text-[1.75rem] tracking-tight text-text-secondary/50 hover:text-text-primary transition-colors duration-150"
                >
                  <span className="w-0.5 h-6 rounded-full flex-shrink-0 bg-bg-border group-hover:bg-accent transition-colors duration-150" />
                  Contact
                </a>
              </m.li>
            </m.ul>

            {/* Bottom status */}
            <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between gap-4 overflow-hidden">
              <p className="font-mono text-[11px] text-text-muted tracking-wide truncate">{meta.domain}</p>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                <span className="font-mono text-[11px] text-accent tracking-widest uppercase">open to roles</span>
              </div>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}

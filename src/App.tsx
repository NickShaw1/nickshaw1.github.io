import { lazy, Suspense, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import {
  HomePageSkeleton,
  BlogPageSkeleton,
  BlogPostSkeleton,
  ProjectsPageSkeleton,
  AboutPageSkeleton,
} from './components/SkeletonScreen'

const Home      = lazy(() => import('./pages/Home'))
const About     = lazy(() => import('./pages/About'))
const Blog      = lazy(() => import('./pages/Blog'))
const BlogPost  = lazy(() => import('./pages/BlogPost'))
const Projects  = lazy(() => import('./pages/Projects'))
const CV        = lazy(() => import('./pages/CV'))
const NotFound  = lazy(() => import('./pages/NotFound'))

export default function App() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="flex flex-col min-h-screen bg-bg-base text-text-primary">
      <Nav />

      <main id="main-content" className="flex-1 pt-[72px]">
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={
              <Suspense fallback={<HomePageSkeleton />}>
                <Home />
              </Suspense>
            } />
            <Route path="/about" element={
              <Suspense fallback={<AboutPageSkeleton />}>
                <About />
              </Suspense>
            } />
            <Route path="/blog" element={
              <Suspense fallback={<BlogPageSkeleton />}>
                <Blog />
              </Suspense>
            } />
            <Route path="/blog/:slug" element={
              <Suspense fallback={<BlogPostSkeleton />}>
                <BlogPost />
              </Suspense>
            } />
            <Route path="/projects" element={
              <Suspense fallback={<ProjectsPageSkeleton />}>
                <Projects />
              </Suspense>
            } />
            <Route path="/cv" element={
              <Suspense fallback={null}>
                <CV />
              </Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={null}>
                <NotFound />
              </Suspense>
            } />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  )
}

import { lazy, Suspense, useEffect } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import Nav from './components/Nav'
import Footer from './components/Footer'
import { HomePageSkeleton } from './components/HomeSkeletons'
import { BlogPageSkeleton, BlogPostSkeleton } from './components/BlogSkeletons'
import { ProjectsPageSkeleton } from './components/ProjectsSkeletons'
import { AboutPageSkeleton, CVPageSkeleton } from './components/AboutSkeletons'
import { KnowledgeBaseSkeleton, KBArticleSkeleton, KBGlossarySkeleton, KBChecklistSkeleton, KBTestingResourcesSkeleton } from './components/KBSkeletons'

const Home      = lazy(() => import('./pages/Home'))
const About     = lazy(() => import('./pages/About'))
const Blog      = lazy(() => import('./pages/Blog'))
const BlogPost  = lazy(() => import('./pages/BlogPost'))
const Projects  = lazy(() => import('./pages/Projects'))
const CV            = lazy(() => import('./pages/CV'))
const KnowledgeBase  = lazy(() => import('./pages/KnowledgeBase'))
const KBArticlePage  = lazy(() => import('./pages/KBArticlePage'))
const KBGlossaryPage         = lazy(() => import('./pages/KBGlossaryPage'))
const KBChecklistPage        = lazy(() => import('./pages/KBChecklistPage'))
const KBTestingResourcesPage = lazy(() => import('./pages/KBTestingResourcesPage'))
const NotFound      = lazy(() => import('./pages/NotFound'))

export default function App() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <LazyMotion features={domAnimation}>
    <div className="flex flex-col min-h-screen bg-bg-base text-text-primary">
      <Nav />

      <main id="main-content" className="flex-1 pt-[72px]">
        <ErrorBoundary>
        <AnimatePresence initial={false}>
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
              <Suspense fallback={<CVPageSkeleton />}>
                <CV />
              </Suspense>
            } />
            <Route path="/knowledge-base" element={
              <Suspense fallback={<KnowledgeBaseSkeleton />}>
                <KnowledgeBase />
              </Suspense>
            } />
            <Route path="/knowledge-base/testing-checklist" element={
              <Suspense fallback={<KBChecklistSkeleton />}>
                <KBChecklistPage />
              </Suspense>
            } />
            <Route path="/knowledge-base/testing-resources" element={
              <Suspense fallback={<KBTestingResourcesSkeleton />}>
                <KBTestingResourcesPage />
              </Suspense>
            } />
            <Route path="/knowledge-base/glossary" element={
              <Suspense fallback={<KBGlossarySkeleton />}>
                <KBGlossaryPage />
              </Suspense>
            } />
            <Route path="/knowledge-base/:section/:slug" element={
              <Suspense fallback={<KBArticleSkeleton />}>
                <KBArticlePage />
              </Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={null}>
                <NotFound />
              </Suspense>
            } />
          </Routes>
        </AnimatePresence>
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
    </LazyMotion>
  )
}

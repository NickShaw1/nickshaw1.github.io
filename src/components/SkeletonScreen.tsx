import React from 'react'

interface SkeletonBlockProps {
  className?: string
  style?: React.CSSProperties
}

function SkeletonBlock({ className = '', style }: SkeletonBlockProps) {
  return <div className={`skeleton rounded ${className}`} style={style} aria-hidden="true" />
}

// ── Page-level skeletons ──────────────────────────────────

export function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-bg-base px-6 pt-24 pb-16 max-w-5xl mx-auto" aria-busy="true" aria-label="Loading page">
      {/* Hero */}
      <div className="space-y-4 mb-16">
        <SkeletonBlock className="h-5 w-32" />
        <SkeletonBlock className="h-16 w-3/4" />
        <SkeletonBlock className="h-5 w-1/2" />
        <SkeletonBlock className="h-5 w-2/5" />
        <div className="flex gap-4 pt-2">
          <SkeletonBlock className="h-11 w-36 rounded-pill" />
          <SkeletonBlock className="h-11 w-32 rounded-pill" />
        </div>
      </div>
      {/* Terminal strip */}
      <SkeletonBlock className="h-14 w-full rounded-card mb-16" />
      {/* Projects grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <SkeletonBlock key={i} className="h-48 rounded-card" />
        ))}
      </div>
    </div>
  )
}

export function BlogPageSkeleton() {
  return (
    <div className="min-h-screen bg-bg-base px-6 pt-24 pb-16 max-w-5xl mx-auto" aria-busy="true" aria-label="Loading blog">
      <SkeletonBlock className="h-10 w-40 mb-10" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="space-y-3 p-5 border border-bg-border rounded-card">
            <SkeletonBlock className="h-4 w-20" />
            <SkeletonBlock className="h-6 w-4/5" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-3/4" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-bg-base px-6 pt-24 pb-16 max-w-prose mx-auto" aria-busy="true" aria-label="Loading post">
      <SkeletonBlock className="h-4 w-24 mb-8" />
      <SkeletonBlock className="h-4 w-20 mb-4" />
      <SkeletonBlock className="h-10 w-full mb-2" />
      <SkeletonBlock className="h-10 w-4/5 mb-6" />
      <SkeletonBlock className="h-4 w-40 mb-12" />
      <div className="space-y-3">
        {[100, 95, 90, 100, 85, 100, 92, 78, 100, 88].map((w, i) => (
          <SkeletonBlock key={i} className={`h-4 w-[${w}%]`} />
        ))}
      </div>
    </div>
  )
}

export function ProjectsPageSkeleton() {
  return (
    <div className="min-h-screen bg-bg-base px-6 pt-24 pb-16 max-w-5xl mx-auto" aria-busy="true" aria-label="Loading projects">
      <SkeletonBlock className="h-10 w-40 mb-10" />
      <SkeletonBlock className="h-4 w-24 mb-4" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <SkeletonBlock key={i} className="h-44 rounded-card" />
        ))}
      </div>
    </div>
  )
}

export function AboutPageSkeleton() {
  return (
    <div className="min-h-screen bg-bg-base px-6 pt-24 pb-16 max-w-4xl mx-auto" aria-busy="true" aria-label="Loading about page">
      <SkeletonBlock className="h-10 w-48 mb-8" />
      <div className="space-y-3 mb-12">
        {[95, 88, 100, 75, 90].map((w, i) => (
          <SkeletonBlock key={i} className="h-4" style={{ width: `${w}%` }} />
        ))}
      </div>
      <SkeletonBlock className="h-6 w-32 mb-6" />
      <div className="space-y-3">
        {[100, 92, 85, 100, 78].map((w, i) => (
          <SkeletonBlock key={i} className="h-4" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  )
}

// Default export — generic fallback
export default function SkeletonScreen() {
  return (
    <div className="min-h-screen bg-bg-base px-6 pt-24 pb-16 max-w-5xl mx-auto" aria-busy="true" aria-label="Loading">
      <SkeletonBlock className="h-10 w-64 mb-8" />
      <div className="space-y-3">
        {[95, 88, 100, 75, 90, 82, 100].map((w, i) => (
          <SkeletonBlock key={i} className="h-4" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  )
}

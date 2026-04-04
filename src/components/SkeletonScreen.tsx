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
    <div className="min-h-screen bg-bg-base px-6 md:px-10 pt-16 pb-16 max-w-6xl mx-auto" aria-busy="true" aria-label="Loading blog">
      {/* Header */}
      <div className="mb-12 space-y-3">
        <SkeletonBlock className="h-3 w-16" />
        <SkeletonBlock className="h-10 w-32" />
        <SkeletonBlock className="h-4 w-72" />
      </div>
      {/* Category filter pills */}
      <div className="hidden sm:flex gap-2 mb-10">
        {[28, 20, 24, 22, 26].map((w, i) => (
          <SkeletonBlock key={i} className="h-6 rounded-pill" style={{ width: `${w * 4}px` }} />
        ))}
      </div>
      {/* Post list */}
      <div className="flex flex-col divide-y divide-bg-border">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="py-6 space-y-2">
            <SkeletonBlock className="h-3 w-16" />
            <SkeletonBlock className="h-5 w-3/4" />
            <SkeletonBlock className="h-4 w-full" />
            <SkeletonBlock className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function BlogPostSkeleton() {
  return (
    <div className="min-h-screen bg-bg-base px-6 md:px-10 pt-16 pb-16 max-w-3xl mx-auto" aria-busy="true" aria-label="Loading post">
      {/* Back link */}
      <SkeletonBlock className="h-3 w-24 mb-10" />
      {/* Category + reading time */}
      <div className="flex gap-3 mb-4">
        <SkeletonBlock className="h-5 w-16 rounded-tag" />
        <SkeletonBlock className="h-5 w-20" />
      </div>
      {/* Title */}
      <SkeletonBlock className="h-9 w-full mb-2" />
      <SkeletonBlock className="h-9 w-4/5 mb-5" />
      {/* Excerpt */}
      <SkeletonBlock className="h-4 w-full mb-2" />
      <SkeletonBlock className="h-4 w-3/4 mb-5" />
      {/* Date */}
      <SkeletonBlock className="h-3 w-28 mb-8" />
      <SkeletonBlock className="h-px w-full mb-8" />
      {/* Body text */}
      <div className="space-y-3">
        {[100, 95, 90, 100, 85, 100, 92, 78, 100, 88].map((w, i) => (
          <SkeletonBlock key={i} className="h-4" style={{ width: `${w}%` }} />
        ))}
      </div>
    </div>
  )
}

export function ProjectsPageSkeleton() {
  return (
    <div className="min-h-screen bg-bg-base px-6 md:px-10 pt-16 pb-16 max-w-6xl mx-auto" aria-busy="true" aria-label="Loading projects">
      {/* Header */}
      <div className="mb-10 space-y-3">
        <SkeletonBlock className="h-3 w-12" />
        <SkeletonBlock className="h-10 w-40" />
        <SkeletonBlock className="h-4 w-full max-w-xl" />
        <SkeletonBlock className="h-4 w-3/4 max-w-xl" />
      </div>
      {/* Filter pills */}
      <div className="hidden sm:flex gap-2 mb-10">
        {[20, 16, 24, 20, 22, 20].map((w, i) => (
          <SkeletonBlock key={i} className="h-6 rounded-pill" style={{ width: `${w * 4}px` }} />
        ))}
      </div>
      {/* Sites section */}
      <SkeletonBlock className="h-3 w-16 mb-6" />
      <div className="flex flex-col gap-4 mb-12">
        {[0, 1].map((i) => (
          <SkeletonBlock key={i} className="h-32 rounded-card" />
        ))}
      </div>
      {/* Exercises section */}
      <SkeletonBlock className="h-3 w-20 mb-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <SkeletonBlock key={i} className="h-40 rounded-card" />
        ))}
      </div>
    </div>
  )
}

export function AboutPageSkeleton() {
  return (
    <div className="min-h-screen bg-bg-base px-6 md:px-10 pt-16 pb-16 max-w-6xl mx-auto lg:flex lg:gap-16" aria-busy="true" aria-label="Loading about page">
      {/* Sidebar nav */}
      <div className="hidden lg:flex flex-col gap-3 w-36 flex-shrink-0 pt-1">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <SkeletonBlock key={i} className="h-3 w-20" />
        ))}
      </div>
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* I'm Nick section */}
        <SkeletonBlock className="h-3 w-16 mb-4" />
        <div className="flex flex-col sm:flex-row gap-6 mb-12">
          <div className="flex-1 space-y-3">
            {[100, 95, 88, 100, 80].map((w, i) => (
              <SkeletonBlock key={i} className="h-4" style={{ width: `${w}%` }} />
            ))}
          </div>
          <SkeletonBlock className="w-full sm:w-48 h-48 rounded-card flex-shrink-0" />
        </div>
        {/* Experience card */}
        <SkeletonBlock className="h-3 w-24 mb-4" />
        <SkeletonBlock className="h-64 rounded-card mb-12" />
        {/* Learning */}
        <SkeletonBlock className="h-3 w-16 mb-4" />
        <div className="space-y-3 mb-12">
          {[100, 92, 85, 78].map((w, i) => (
            <SkeletonBlock key={i} className="h-4" style={{ width: `${w}%` }} />
          ))}
        </div>
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

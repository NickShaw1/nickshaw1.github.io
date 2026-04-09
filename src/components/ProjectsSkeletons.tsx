import React from 'react'

interface SkeletonBlockProps {
  className?: string
  style?: React.CSSProperties
}

function SkeletonBlock({ className = '', style }: SkeletonBlockProps) {
  return <div className={`skeleton rounded ${className}`} style={style} aria-hidden="true" />
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

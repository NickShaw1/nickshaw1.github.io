import React from 'react'

interface SkeletonBlockProps {
  className?: string
  style?: React.CSSProperties
}

function SkeletonBlock({ className = '', style }: SkeletonBlockProps) {
  return <div className={`skeleton rounded ${className}`} style={style} aria-hidden="true" />
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
      {/* Category filter pills — 6 categories: All, AI, Development, General, Site, Testing */}
      <div className="hidden sm:flex gap-2 mb-10">
        {[28, 20, 36, 28, 24, 28].map((w, i) => (
          <SkeletonBlock key={i} className="h-6 rounded-pill" style={{ width: `${w * 4}px` }} />
        ))}
      </div>
      {/* Post list */}
      <div className="flex flex-col divide-y divide-bg-border">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="py-5 sm:py-7 space-y-2">
            <div className="flex items-center gap-3">
              <SkeletonBlock className="h-5 w-20 rounded-tag" />
              <SkeletonBlock className="h-3 w-24" />
              <SkeletonBlock className="h-3 w-16" />
            </div>
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

import React from 'react'

interface SkeletonBlockProps {
  className?: string
  style?: React.CSSProperties
}

function SkeletonBlock({ className = '', style }: SkeletonBlockProps) {
  return <div className={`skeleton rounded ${className}`} style={style} aria-hidden="true" />
}

export function AboutPageSkeleton() {
  return (
    <div className="min-h-screen bg-bg-base px-6 md:px-10 py-10 md:py-16 max-w-6xl mx-auto lg:flex lg:gap-16" aria-busy="true" aria-label="Loading about page">
      {/* Sidebar nav */}
      <div className="hidden lg:flex flex-col gap-3 w-36 flex-shrink-0">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <SkeletonBlock key={i} className="h-3 w-20" />
        ))}
      </div>
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* About me section */}
        <SkeletonBlock className="h-3 w-16 mb-3" />
        <SkeletonBlock className="h-9 w-36 mb-6" />
        <div className="flex flex-col sm:flex-row gap-6 mb-12">
          <div className="flex-1 space-y-3">
            {[100, 95, 88, 100, 80].map((w, i) => (
              <SkeletonBlock key={i} className="h-4" style={{ width: `${w}%` }} />
            ))}
          </div>
          <SkeletonBlock className="w-full sm:w-48 h-48 rounded-card flex-shrink-0" />
        </div>
        {/* Experience section */}
        <SkeletonBlock className="h-3 w-24 mb-3" />
        <SkeletonBlock className="h-9 w-52 mb-6" />
        <SkeletonBlock className="h-64 rounded-card mb-12" />
        {/* Learning section */}
        <SkeletonBlock className="h-3 w-16 mb-3" />
        <SkeletonBlock className="h-9 w-48 mb-6" />
        <div className="space-y-3 mb-12">
          {[100, 92, 85, 78].map((w, i) => (
            <SkeletonBlock key={i} className="h-4" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function CVPageSkeleton() {
  return (
    <div className="max-w-4xl mx-auto px-6 md:px-10 py-16" aria-busy="true" aria-label="Loading CV">
      {/* Back link */}
      <SkeletonBlock className="h-3 w-24 mb-10" />
      {/* Header */}
      <div className="mb-12 space-y-2">
        <SkeletonBlock className="h-12 w-48" />
        <SkeletonBlock className="h-3 w-40" />
        <SkeletonBlock className="h-3 w-32" />
        <SkeletonBlock className="h-8 w-36 rounded-pill mt-4" />
      </div>
      {/* Summary */}
      <div className="mb-12">
        <SkeletonBlock className="h-3 w-40 mb-5" />
        <div className="space-y-2">
          {[100, 96, 88, 100, 92, 80].map((w, i) => (
            <SkeletonBlock key={i} className="h-4" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
      {/* Competencies */}
      <div className="mb-12">
        <SkeletonBlock className="h-3 w-32 mb-5" />
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-3" style={{ width: `${60 + (i * 17) % 35}%` }} />
          ))}
        </div>
      </div>
      {/* Experience */}
      <div className="mb-12">
        <SkeletonBlock className="h-3 w-44 mb-5" />
        <div className="flex flex-col gap-10">
          {[8, 9].map((bulletCount, ri) => (
            <div key={ri}>
              <SkeletonBlock className="h-4 w-48 mb-1" />
              <SkeletonBlock className="h-3 w-36 mb-4" />
              <div className="space-y-2">
                {Array.from({ length: bulletCount }).map((_, i) => (
                  <SkeletonBlock key={i} className="h-3" style={{ width: `${75 + (i * 11) % 25}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Earlier Experience */}
      <div className="mb-12">
        <SkeletonBlock className="h-3 w-40 mb-5" />
        <div className="flex flex-col gap-7">
          {[2, 2, 2].map((bulletCount, ri) => (
            <div key={ri}>
              <SkeletonBlock className="h-4 w-44 mb-1" />
              <SkeletonBlock className="h-3 w-32 mb-3" />
              <div className="space-y-2">
                {Array.from({ length: bulletCount }).map((_, i) => (
                  <SkeletonBlock key={i} className="h-3" style={{ width: `${70 + (i * 13) % 25}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Projects */}
      <div className="mb-12">
        <SkeletonBlock className="h-3 w-24 mb-5" />
        <div className="flex flex-col gap-8">
          {[4, 0].map((bulletCount, ri) => (
            <div key={ri}>
              <SkeletonBlock className="h-4 w-40 mb-1" />
              <SkeletonBlock className="h-3 w-56 mb-3" />
              <div className="space-y-2 mb-2">
                {Array.from({ length: bulletCount }).map((_, i) => (
                  <SkeletonBlock key={i} className="h-3" style={{ width: `${65 + (i * 9) % 30}%` }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Qualifications */}
      <div className="mb-12">
        <SkeletonBlock className="h-3 w-52 mb-5" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-3" style={{ width: `${50 + (i * 13) % 30}%` }} />
          ))}
        </div>
      </div>
      {/* Professional Development */}
      <div className="mb-12">
        <SkeletonBlock className="h-3 w-48 mb-5" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-3" style={{ width: `${45 + (i * 11) % 30}%` }} />
          ))}
        </div>
      </div>
      {/* Education */}
      <div>
        <SkeletonBlock className="h-3 w-28 mb-5" />
        <SkeletonBlock className="h-4 w-48 mb-3" />
        <div className="flex flex-col gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <SkeletonBlock key={i} className="h-3" style={{ width: `${40 + (i * 15) % 25}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

import React from 'react'

interface SkeletonBlockProps {
  className?: string
  style?: React.CSSProperties
}

function SkeletonBlock({ className = '', style }: SkeletonBlockProps) {
  return <div className={`skeleton rounded ${className}`} style={style} aria-hidden="true" />
}

export function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-bg-base" aria-busy="true" aria-label="Loading page">

      {/* Hero — full viewport height */}
      <section className="min-h-[calc(100svh-72px)] flex items-center">
        <div className="w-full max-w-6xl mx-auto px-6 md:px-10 pt-8 pb-8 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16 xl:gap-24">

            {/* Left */}
            <div className="flex-1 min-w-0">
              {/* Available badge */}
              <SkeletonBlock className="h-7 w-40 rounded-pill mb-8" />
              {/* Headline */}
              <SkeletonBlock className="h-16 w-3/4 mb-2" />
              <SkeletonBlock className="h-16 w-1/2 mb-8" />
              {/* Photo + bio */}
              <div className="flex items-center gap-5 max-w-xl mb-8">
                <SkeletonBlock className="w-24 h-24 rounded-full flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <SkeletonBlock className="h-4 w-full" />
                  <SkeletonBlock className="h-4 w-5/6" />
                  <SkeletonBlock className="h-4 w-4/6" />
                </div>
              </div>
              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8">
                <SkeletonBlock className="h-12 w-full sm:w-36 rounded-pill" />
                <SkeletonBlock className="h-12 w-full sm:w-40 rounded-pill" />
              </div>
              {/* Stats — 3-col grid */}
              <div className="grid grid-cols-3 border border-bg-border rounded-card divide-x divide-bg-border max-w-md">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex flex-col items-center py-4 px-3 gap-1.5">
                    <SkeletonBlock className="h-6 w-10" />
                    <SkeletonBlock className="h-2.5 w-14" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: certifications */}
            <div className="mt-10 lg:mt-0 flex-shrink-0 w-full lg:w-72">
              {[0, 1, 2].map((i) => (
                <div key={i} className="flex items-stretch gap-4 border-b border-bg-border last:border-b-0 py-3">
                  <div className="w-px bg-bg-border flex-shrink-0" />
                  <div className="flex flex-col justify-center gap-1.5 min-w-0">
                    <SkeletonBlock className="h-2.5 w-12" />
                    <SkeletonBlock className="h-4 w-40" />
                    <SkeletonBlock className="h-3 w-32" />
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Terminal strip */}
      <SkeletonBlock className="h-14 w-full rounded-none" />

      {/* Featured projects */}
      <div className="px-6 md:px-10 pt-12 md:pt-16 pb-6 max-w-6xl mx-auto">
        <SkeletonBlock className="h-2.5 w-28 mb-3" />
        <SkeletonBlock className="h-8 w-44 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {[0, 1, 2].map((i) => (
            <SkeletonBlock key={i} className="h-48 rounded-card" />
          ))}
        </div>
        <SkeletonBlock className="h-3 w-32" />
      </div>

      {/* Knowledge Base — 3×3 grid */}
      <div className="px-6 md:px-10 pt-6 pb-8 max-w-6xl mx-auto">
        <SkeletonBlock className="h-2.5 w-28 mb-3" />
        <SkeletonBlock className="h-8 w-64 mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="border border-bg-border rounded-card p-4 space-y-2">
              <div className="flex justify-between">
                <SkeletonBlock className="h-3.5 w-28" />
                <SkeletonBlock className="h-2.5 w-10" />
              </div>
              <SkeletonBlock className="h-3 w-full" />
              <SkeletonBlock className="h-3 w-4/5" />
            </div>
          ))}
        </div>
        <SkeletonBlock className="h-3 w-40" />
      </div>

      {/* Experience — timeline */}
      <div className="px-6 md:px-10 pt-6 pb-8 max-w-6xl mx-auto">
        <SkeletonBlock className="h-2.5 w-20 mb-3" />
        <SkeletonBlock className="h-8 w-44 mb-6" />
        <div className="flex flex-col">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="relative flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6 py-4 pl-7 border-b border-bg-border last:border-b-0">
              <div className="absolute left-0 w-3.5 h-3.5 rounded-full border-2 border-bg-border bg-bg-base" aria-hidden="true" />
              <SkeletonBlock className="h-2.5 w-16 flex-shrink-0 sm:w-24" />
              <SkeletonBlock className="h-3.5 flex-1" />
              <SkeletonBlock className="h-2.5 w-24 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-bg-surface border-t border-bg-border">
        <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 md:py-20">
          <SkeletonBlock className="h-2.5 w-24 mb-3" />
          <SkeletonBlock className="h-8 w-52 mb-10" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 xl:gap-24 items-start">
            {/* Left: bio + social links */}
            <div>
              <div className="space-y-2 mb-10">
                <SkeletonBlock className="h-4 w-full" />
                <SkeletonBlock className="h-4 w-5/6" />
                <SkeletonBlock className="h-4 w-4/6" />
              </div>
              <SkeletonBlock className="h-2.5 w-16 mb-4" />
              <div className="flex flex-col">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="border-l-2 border-bg-border pl-4 py-3">
                    <SkeletonBlock className="h-2.5 w-20" />
                  </div>
                ))}
              </div>
            </div>
            {/* Right: contact form */}
            <div className="space-y-4">
              <SkeletonBlock className="h-11 w-full rounded-card" />
              <SkeletonBlock className="h-11 w-full rounded-card" />
              <SkeletonBlock className="h-28 w-full rounded-card" />
              <SkeletonBlock className="h-11 w-32 rounded-pill" />
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

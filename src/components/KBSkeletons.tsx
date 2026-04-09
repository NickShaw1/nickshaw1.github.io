import React from 'react'

interface SkeletonBlockProps {
  className?: string
  style?: React.CSSProperties
}

function SkeletonBlock({ className = '', style }: SkeletonBlockProps) {
  return <div className={`skeleton rounded ${className}`} style={style} aria-hidden="true" />
}

export function KBArticleSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 md:py-16" aria-busy="true" aria-label="Loading article">
      {/* Mobile: select nav */}
      <div className="md:hidden mb-6">
        <SkeletonBlock className="h-10 w-full rounded-card" />
      </div>
      {/* Desktop: back link */}
      <div className="hidden md:block mb-8">
        <SkeletonBlock className="h-3 w-36" />
      </div>
      <div className="flex gap-10 items-start">
        {/* Left sidebar — desktop only */}
        <div className="hidden md:flex flex-col gap-2 w-56 flex-shrink-0 pt-1">
          <SkeletonBlock className="h-3 w-24 mb-3" />
          {[80, 100, 70, 90, 65, 85, 75, 100, 80, 70].map((w, i) => (
            <SkeletonBlock key={i} className="h-3 rounded" style={{ width: `${w}%` }} />
          ))}
        </div>
        {/* Main content */}
        <div className="flex-1 min-w-0">
          {/* Article header */}
          <div className="mb-8 pb-8 border-b border-bg-border space-y-4">
            <div className="flex gap-3">
              <SkeletonBlock className="h-5 w-24 rounded-tag" />
              <SkeletonBlock className="h-5 w-16" />
            </div>
            <SkeletonBlock className="h-9 w-4/5" />
            <SkeletonBlock className="h-9 w-3/5" />
          </div>
          {/* Body paragraphs */}
          <div className="space-y-3">
            {[100, 96, 88, 100, 92, 0, 72, 100, 94, 80, 100, 0, 60, 100, 90, 85].map((w, i) =>
              w === 0
                ? <div key={i} className="h-4" />
                : <SkeletonBlock key={i} className="h-4" style={{ width: `${w}%` }} />,
            )}
          </div>
        </div>
        {/* Right TOC — xl only */}
        <div className="hidden xl:flex flex-col gap-2 w-44 flex-shrink-0 pt-1">
          <SkeletonBlock className="h-3 w-20 mb-3" />
          {[70, 85, 60, 90, 75].map((w, i) => (
            <SkeletonBlock key={i} className="h-3" style={{ width: `${w}%` }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export function KBTestingResourcesSkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-12" aria-busy="true" aria-label="Loading testing resources">
      {/* Back link */}
      <SkeletonBlock className="h-3 w-32 mb-6" />
      {/* Header */}
      <div className="mb-4 space-y-3">
        <SkeletonBlock className="h-5 w-20 rounded-tag" />
        <SkeletonBlock className="h-10 w-52" />
        <SkeletonBlock className="h-4 w-2/3" />
      </div>
      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        <SkeletonBlock className="h-7 w-28 rounded-pill" />
        <SkeletonBlock className="h-7 w-36 rounded-pill" />
      </div>
      {/* Cert groups */}
      <div className="space-y-8">
        {[4, 2, 3, 2].map((rowCount, gi) => (
          <div key={gi}>
            <SkeletonBlock className="h-2.5 w-28 mb-3" />
            <div className="rounded-card border border-bg-border overflow-hidden">
              {Array.from({ length: rowCount }).map((_, i) => (
                <div key={i} className={`flex justify-between items-start px-4 py-3.5 gap-6 ${i > 0 ? 'border-t border-bg-border' : ''}`}>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <SkeletonBlock className="h-3.5 w-40" />
                    <SkeletonBlock className="h-3.5 w-full" />
                  </div>
                  <SkeletonBlock className="h-5 w-20 rounded-tag flex-shrink-0" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function KBGlossarySkeleton() {
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-12" aria-busy="true" aria-label="Loading glossary">
      {/* Back link */}
      <SkeletonBlock className="h-3 w-32 mb-6" />
      {/* Header */}
      <div className="mb-8 space-y-3">
        <SkeletonBlock className="h-4 w-20 rounded-tag" />
        <SkeletonBlock className="h-10 w-40" />
        <SkeletonBlock className="h-4 w-2/3" />
      </div>
      {/* A-Z filter */}
      <div className="hidden md:flex justify-between mb-12 py-3">
        {Array.from({ length: 26 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-8 w-8 rounded" />
        ))}
      </div>
      {/* Letter sections */}
      <div className="space-y-10">
        {[4, 3, 7, 2, 3, 2, 4, 3, 2, 3].map((termCount, si) => (
          <div key={si}>
            <div className="flex items-center gap-4 mb-5">
              <SkeletonBlock className="h-6 w-6" />
              <SkeletonBlock className="flex-1 h-px" />
            </div>
            <div className="space-y-4 pl-1">
              {Array.from({ length: termCount }).map((_, ti) => (
                <div key={ti} className="space-y-1.5">
                  <SkeletonBlock className="h-3.5 w-36" />
                  <SkeletonBlock className="h-3.5 w-full" />
                  <SkeletonBlock className="h-3.5" style={{ width: `${60 + (ti * 13) % 35}%` }} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function KnowledgeBaseSkeleton() {
  const sections = [
    { cardCount: 9 },
    { cardCount: 1 },
    { cardCount: 3 },
  ]
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-16" aria-busy="true" aria-label="Loading knowledge base">
      {/* Header */}
      <div className="mb-10 space-y-3">
        <SkeletonBlock className="h-3 w-20" />
        <SkeletonBlock className="h-12 w-56" />
        <SkeletonBlock className="h-4 w-full max-w-lg" />
      </div>
      {/* Tabs — desktop only */}
      <div className="hidden sm:flex flex-wrap gap-2 mb-10">
        {[48, 64, 88, 64].map((w, i) => (
          <SkeletonBlock key={i} className="h-7 rounded-pill" style={{ width: `${w}px` }} />
        ))}
      </div>
      {/* Sections */}
      {sections.map((section, si) => (
        <div key={si} className="mb-16 last:mb-0">
          <SkeletonBlock className="h-3 w-20 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: section.cardCount }).map((_, i) => (
              <SkeletonBlock key={i} className="h-36 rounded-card" />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export function KBChecklistSkeleton() {
  // 6 categories with realistic item counts matching the real page
  const CATEGORY_ROWS = [6, 5, 4, 4, 5, 6]
  return (
    <div className="max-w-6xl mx-auto px-6 md:px-10 py-12" aria-busy="true" aria-label="Loading checklist">
      {/* Back link */}
      <SkeletonBlock className="h-3 w-32 mb-6" />
      {/* Header */}
      <div className="mb-6 space-y-3">
        <SkeletonBlock className="h-5 w-20 rounded-tag" />
        <SkeletonBlock className="h-10 w-56" />
        <SkeletonBlock className="h-4 w-full max-w-xl" />
        <SkeletonBlock className="h-4 w-3/4 max-w-xl" />
      </div>
      {/* Mobile progress strip */}
      <div className="md:hidden flex items-center gap-4 py-5 border-y border-bg-border mb-8">
        <div className="flex-1 space-y-2">
          <div className="flex justify-between">
            <SkeletonBlock className="h-2.5 w-28" />
            <SkeletonBlock className="h-2.5 w-8" />
          </div>
          <SkeletonBlock className="h-1.5 w-full rounded-full" />
        </div>
        <SkeletonBlock className="h-7 w-16 rounded-pill flex-shrink-0" />
      </div>
      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-10 items-start">
        {/* Left: checklist */}
        <div className="flex-1 min-w-0 space-y-8">
          {CATEGORY_ROWS.map((rowCount, gi) => (
            <div key={gi}>
              <div className="flex items-center gap-3 mb-3">
                <SkeletonBlock className="rounded-full flex-shrink-0" style={{ width: '18px', height: '18px' }} />
                <SkeletonBlock className="h-6 w-36" />
                <div className="flex-1 h-px bg-bg-border" />
                <SkeletonBlock className="h-2.5 w-8 flex-shrink-0" />
              </div>
              <div className="rounded-card border border-bg-border overflow-hidden">
                {Array.from({ length: rowCount }).map((_, i) => (
                  <div key={i} className={`flex items-start gap-3 px-3 py-3 ${i > 0 ? 'border-t border-bg-border' : ''}`}>
                    <SkeletonBlock className="h-[17px] w-[17px] flex-shrink-0 rounded mt-0.5" />
                    <div className="flex-1 space-y-1.5">
                      <SkeletonBlock className="h-3.5" style={{ width: `${65 + (i * 13) % 30}%` }} />
                      <SkeletonBlock className="h-3 w-full" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Right: console sidebar — desktop only */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-bg-surface border border-bg-border rounded-card p-5 space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between">
                <SkeletonBlock className="h-2.5 w-16" />
                <SkeletonBlock className="h-2.5 w-8" />
              </div>
              <SkeletonBlock className="h-1.5 w-full rounded-full" />
              <SkeletonBlock className="h-2.5 w-28" />
            </div>
            <div className="h-px bg-bg-border" />
            <SkeletonBlock className="h-7 w-full rounded-pill" />
            <div className="h-px bg-bg-border" />
            <SkeletonBlock className="h-3 w-full" />
            <div className="h-px bg-bg-border" />
            <SkeletonBlock className="h-7 w-full rounded-pill" />
          </div>
        </div>
      </div>
    </div>
  )
}


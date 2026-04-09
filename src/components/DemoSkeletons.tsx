import React from 'react'

interface SkeletonBlockProps {
  className?: string
  style?: React.CSSProperties
}

function SkeletonBlock({ className = '', style }: SkeletonBlockProps) {
  return <div className={`skeleton rounded ${className}`} style={style} aria-hidden="true" />
}

function DemoLabel() {
  return <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-3">Live demo</p>
}

export function CounterDemoSkeleton() {
  return (
    <div className="mb-5" aria-busy="true" aria-label="Loading counter demo">
      <DemoLabel />
      <div className="flex flex-col items-center gap-5 bg-bg-surface border border-bg-border rounded-card py-8 px-6">
        <SkeletonBlock className="h-16 w-20" />
        <div className="flex gap-3">
          <SkeletonBlock className="w-10 h-10 rounded-full" />
          <SkeletonBlock className="w-16 h-10 rounded-pill" />
          <SkeletonBlock className="w-10 h-10 rounded-full" />
        </div>
      </div>
    </div>
  )
}

export function ColourFlipperDemoSkeleton() {
  return (
    <div className="mb-5" aria-busy="true" aria-label="Loading colour flipper demo">
      <DemoLabel />
      <div className="flex flex-col items-center gap-4 bg-bg-surface border border-bg-border rounded-card py-8 px-6">
        <SkeletonBlock className="w-24 h-24 rounded-card" />
        <SkeletonBlock className="h-3 w-20" />
        <div className="flex gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonBlock key={i} className="w-7 h-7 rounded-full" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function SimpleModalDemoSkeleton() {
  return (
    <div className="mb-5" aria-busy="true" aria-label="Loading modal demo">
      <DemoLabel />
      <div className="flex items-center justify-center bg-bg-surface border border-bg-border rounded-card py-8 px-6" style={{ minHeight: 160 }}>
        <SkeletonBlock className="h-8 w-28 rounded-pill" />
      </div>
    </div>
  )
}

export function CalculatorDemoSkeleton() {
  return (
    <div className="mb-5" aria-busy="true" aria-label="Loading calculator demo">
      <DemoLabel />
      <div className="bg-bg-surface border border-bg-border rounded-card p-4 max-w-[220px] mx-auto">
        <SkeletonBlock className="h-10 w-full rounded mb-3" />
        {[0, 1, 2, 3, 4].map((row) => (
          <div key={row} className="grid grid-cols-4 gap-1.5 mb-1.5">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonBlock key={i} className="h-10 rounded" />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export function AccordionDemoSkeleton() {
  return (
    <div className="mb-5" aria-busy="true" aria-label="Loading accordion demo">
      <DemoLabel />
      <div className="bg-bg-surface border border-bg-border rounded-card overflow-hidden divide-y divide-bg-border">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center justify-between px-4 py-3">
            <SkeletonBlock className="h-3.5 flex-1 mr-4" style={{ width: `${65 + i * 10}%` }} />
            <SkeletonBlock className="w-4 h-4 flex-shrink-0" />
          </div>
        ))}
      </div>
    </div>
  )
}

export function TabsDemoSkeleton() {
  return (
    <div className="mb-5" aria-busy="true" aria-label="Loading tabs demo">
      <DemoLabel />
      <div className="bg-bg-surface border border-bg-border rounded-card overflow-hidden">
        <div className="flex border-b border-bg-border">
          {[64, 56, 72].map((w, i) => (
            <div key={i} className="flex-1 py-2.5 flex justify-center">
              <SkeletonBlock className="h-2.5" style={{ width: `${w}%` }} />
            </div>
          ))}
        </div>
        <div className="p-4 min-h-[72px] space-y-2">
          <SkeletonBlock className="h-3.5 w-full" />
          <SkeletonBlock className="h-3.5 w-4/5" />
        </div>
      </div>
    </div>
  )
}

export function ReviewsCarouselDemoSkeleton() {
  return (
    <div className="mb-5" aria-busy="true" aria-label="Loading reviews carousel demo">
      <DemoLabel />
      <div className="bg-bg-surface border border-bg-border rounded-card p-5">
        <div className="h-48 space-y-3">
          <SkeletonBlock className="h-3.5 w-28 mb-1" />
          <SkeletonBlock className="h-2.5 w-20" />
          <div className="space-y-2 mt-3">
            {[100, 96, 90, 100, 85, 78].map((w, i) => (
              <SkeletonBlock key={i} className="h-3" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-bg-border">
          <div className="flex gap-2">
            <SkeletonBlock className="w-8 h-8 rounded-full" />
            <SkeletonBlock className="w-8 h-8 rounded-full" />
          </div>
          <div className="flex gap-3">
            <SkeletonBlock className="h-2.5 w-12" />
            <SkeletonBlock className="h-2.5 w-8" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function CurrencyConverterDemoSkeleton() {
  return (
    <div className="mb-5" aria-busy="true" aria-label="Loading currency converter demo">
      <DemoLabel />
      <div className="bg-bg-surface border border-bg-border rounded-card p-5 space-y-5">
        <div>
          <SkeletonBlock className="h-2.5 w-14 mb-1" />
          <SkeletonBlock className="h-11 w-full rounded" />
        </div>
        <div className="flex items-end gap-3">
          <div className="flex-1">
            <SkeletonBlock className="h-2.5 w-10 mb-1" />
            <SkeletonBlock className="h-11 w-full rounded" />
          </div>
          <SkeletonBlock className="w-8 h-8 rounded-full flex-shrink-0 mb-1.5" />
          <div className="flex-1">
            <SkeletonBlock className="h-2.5 w-6 mb-1" />
            <SkeletonBlock className="h-11 w-full rounded" />
          </div>
        </div>
        <div className="pt-4 border-t border-bg-border min-h-[56px]">
          <SkeletonBlock className="h-8 w-40" />
          <SkeletonBlock className="h-2.5 w-28 mt-2" />
        </div>
      </div>
    </div>
  )
}

export function WeatherDemoSkeleton() {
  return (
    <div className="mb-5" aria-busy="true" aria-label="Loading weather demo">
      <DemoLabel />
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-7 flex-1 rounded-pill" />
        ))}
      </div>
      <div className="rounded-card border border-bg-border overflow-hidden">
        <div className="bg-bg-surface px-6 pt-6 pb-5 space-y-3">
          <SkeletonBlock className="h-2.5 w-16" />
          <SkeletonBlock className="h-20 w-32" />
          <SkeletonBlock className="h-3 w-24" />
          <div className="flex gap-5">
            <SkeletonBlock className="h-3 w-16" />
            <SkeletonBlock className="h-3 w-12" />
          </div>
        </div>
        <div className="bg-bg-surface border-t border-bg-border px-4 py-4">
          <SkeletonBlock className="h-2.5 w-20 mb-3" />
          <div className="grid grid-cols-8 gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <SkeletonBlock className="h-2 w-full" />
                <SkeletonBlock className="w-3.5 h-3.5 rounded-full" />
                <SkeletonBlock className="h-2.5 w-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function SynthDemoSkeleton() {
  return (
    <div className="mb-5 select-none" aria-busy="true" aria-label="Loading synthesizer demo">
      <DemoLabel />
      <div className="rounded-xl overflow-hidden bg-bg-surface border border-bg-border">
        <div className="px-4 py-2.5 flex items-center justify-between bg-bg-elevated border-b border-bg-border">
          <SkeletonBlock className="h-3.5 w-24" />
          <div className="flex gap-2">
            <SkeletonBlock className="h-6 w-12 rounded" />
            <SkeletonBlock className="w-[22px] h-[22px] rounded-full" />
          </div>
        </div>
        <div className="px-4 py-3 flex items-center gap-3 border-b border-bg-border">
          <SkeletonBlock className="h-2.5 w-8" />
          <SkeletonBlock className="h-7 w-40 rounded-md" />
          <div className="ml-auto flex gap-2 items-center">
            <SkeletonBlock className="h-2.5 w-6" />
            <SkeletonBlock className="h-6 w-20 rounded" />
          </div>
        </div>
        {/* Knobs — desktop only */}
        <div className="hidden sm:flex border-b border-bg-border px-4 py-3 gap-6">
          {[4, 2, 2, 2].map((count, gi) => (
            <div key={gi} className="flex flex-col gap-2 border-r border-bg-border last:border-r-0 pr-6 last:pr-0">
              <SkeletonBlock className="h-2 w-16 mx-auto" />
              <div className="flex gap-3">
                {Array.from({ length: count }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <SkeletonBlock className="h-2 w-6" />
                    <SkeletonBlock className="w-10 h-10 rounded-full" />
                    <SkeletonBlock className="h-2 w-6" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* Piano — 7 keys mobile, 14 keys desktop */}
        <div className="px-2 py-2">
          <div className="flex gap-0.5 sm:hidden">
            {Array.from({ length: 7 }).map((_, i) => (
              <SkeletonBlock key={i} className="flex-1 h-20 rounded-b" />
            ))}
          </div>
          <div className="hidden sm:flex gap-0.5">
            {Array.from({ length: 14 }).map((_, i) => (
              <SkeletonBlock key={i} className="flex-1 h-20 rounded-b" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function ArtemisDemoSkeleton() {
  return (
    <div className="mb-5 flex flex-col" aria-busy="true" aria-label="Loading Artemis tracker demo">
      <div className="rounded-lg overflow-hidden bg-bg-surface border border-bg-border">
        {/* Title — mobile: no Live pill, desktop: with Live pill */}
        <div className="px-4 py-3 border-b border-bg-border">
          <div className="sm:hidden flex items-center gap-2">
            <SkeletonBlock className="w-4 h-4 rounded flex-shrink-0" />
            <SkeletonBlock className="h-3.5 w-44" />
          </div>
          <div className="hidden sm:flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <SkeletonBlock className="w-4 h-4 rounded flex-shrink-0" />
              <SkeletonBlock className="h-3.5 w-52" />
            </div>
            <SkeletonBlock className="h-5 w-12 rounded-full flex-shrink-0" />
          </div>
        </div>
        {/* Progress bar */}
        <div className="px-4 py-4 border-b border-bg-border">
          <div className="flex justify-between mb-2.5">
            <SkeletonBlock className="h-3 w-32" />
            <SkeletonBlock className="h-5 w-12 rounded" />
          </div>
          <SkeletonBlock className="h-[5px] w-full rounded-full" />
        </div>
        {/* Mission time + broadcast — desktop only */}
        <div className="hidden sm:flex items-center justify-between px-4 py-4 border-b border-bg-border">
          <div className="space-y-2">
            <SkeletonBlock className="h-3 w-24" />
            <SkeletonBlock className="h-5 w-32" />
          </div>
          <SkeletonBlock className="h-3 w-28" />
        </div>
        {/* Body grid — 1 col mobile, 2 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-bg-border">
          <div className="px-4 pt-4 pb-2 sm:py-4 border-b sm:border-b-0 sm:border-r border-bg-border">
            <SkeletonBlock className="h-3 w-12 mb-3" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <SkeletonBlock className="w-10 h-10 rounded-full flex-shrink-0" />
                  <div className="space-y-1.5">
                    <SkeletonBlock className="h-3 w-20" />
                    <SkeletonBlock className="h-2.5 w-16" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Mobile: mission time / Desktop: stats */}
          <div className="px-4 pt-2 pb-4 sm:py-4">
            <SkeletonBlock className="h-3 w-24 mb-2" />
            <SkeletonBlock className="h-5 w-28 sm:hidden" />
            <div className="hidden sm:grid grid-cols-2 gap-3 mt-1">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="space-y-1.5">
                  <SkeletonBlock className="h-2.5 w-16" />
                  <SkeletonBlock className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Globe */}
        <SkeletonBlock className="w-full rounded-none" style={{ height: 'clamp(260px, 45vw, 440px)' }} />
      </div>
    </div>
  )
}

export function EarthquakeDemoSkeleton() {
  return (
    <div className="mb-5" aria-busy="true" aria-label="Loading earthquake tracker demo">
      <DemoLabel />
      <div className="rounded-lg overflow-hidden border border-bg-border bg-bg-surface">

        {/* Row 1: LIVE pill + plates toggle */}
        <div className="px-4 py-3 flex items-center justify-between border-b border-bg-border">
          <SkeletonBlock className="h-6 w-20 rounded-pill" />
          <SkeletonBlock className="h-7 w-36 rounded-pill" />
        </div>

        {/* Row 2: stats — 3-col on sm+, stacked on mobile */}
        <div className="border-b border-bg-border">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            <div className="px-4 py-3 border-b sm:border-b-0 sm:border-r border-bg-border space-y-1.5">
              <SkeletonBlock className="h-2.5 w-10" />
              <SkeletonBlock className="h-5 w-16" />
              <SkeletonBlock className="h-3 w-28" />
            </div>
            <div className="px-4 py-3 border-b sm:border-b-0 sm:border-r border-bg-border space-y-1.5">
              <SkeletonBlock className="h-2.5 w-24" />
              <SkeletonBlock className="h-5 w-20" />
              <SkeletonBlock className="h-3 w-36" />
            </div>
            <div className="hidden sm:block px-4 py-3 space-y-1.5">
              <SkeletonBlock className="h-2.5 w-28" />
              <SkeletonBlock className="h-5 w-14" />
              <SkeletonBlock className="h-3 w-32" />
            </div>
          </div>
          {/* Largest magnitude — mobile only */}
          <div className="sm:hidden px-4 py-3 border-t border-bg-border space-y-1.5">
            <SkeletonBlock className="h-2.5 w-28" />
            <SkeletonBlock className="h-5 w-14" />
          </div>
        </div>

        {/* Row 3: Time window | Minimum magnitude */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-bg-border">
          <div className="px-4 pt-3.5 pb-3 border-b sm:border-b-0 sm:border-r border-bg-border">
            <SkeletonBlock className="h-2.5 w-20 mb-2" />
            <div className="flex gap-1.5">
              {[0, 1, 2, 3].map((i) => <SkeletonBlock key={i} className="h-7 flex-1 rounded-pill" />)}
            </div>
          </div>
          <div className="px-4 pt-3.5 pb-3">
            <SkeletonBlock className="h-2.5 w-28 mb-2" />
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => <SkeletonBlock key={i} className="h-7 flex-1 rounded-pill" />)}
            </div>
          </div>
        </div>

        {/* Row 4: How to explore | Marker colour key */}
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="px-4 pt-3.5 pb-3 border-b sm:border-b-0 sm:border-r border-bg-border">
            <SkeletonBlock className="h-2.5 w-24 mb-2" />
            <div className="flex flex-col gap-1.5">
              {[0, 1, 2].map((i) => <SkeletonBlock key={i} className="h-3 w-full" />)}
            </div>
          </div>
          <div className="px-4 pt-3.5 pb-3">
            <SkeletonBlock className="h-2.5 w-28 mb-2" />
            <div className="flex flex-col gap-1.5">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <SkeletonBlock className="w-3 h-3 rounded-full flex-shrink-0" />
                  <SkeletonBlock className="h-3 flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Globe */}
        <SkeletonBlock className="w-full rounded-none" style={{ height: 'clamp(280px, 50vw, 480px)' }} />
      </div>
    </div>
  )
}

export function ISSDemoSkeleton() {
  return (
    <div className="mb-5" aria-busy="true" aria-label="Loading ISS tracker demo">
      <DemoLabel />
      <div className="rounded-xl overflow-hidden border border-bg-border bg-bg-surface">
        <SkeletonBlock className="w-full rounded-none" style={{ height: 'clamp(260px, 45vw, 440px)' }} />
        {/* Telemetry panels — desktop only */}
        <div className="hidden sm:grid grid-cols-2 gap-3 px-4 py-3">
          <div className="space-y-1.5">
            <SkeletonBlock className="h-2 w-20" />
            <SkeletonBlock className="h-4 w-32" />
            <SkeletonBlock className="h-3 w-24" />
          </div>
          <div className="space-y-1.5">
            <SkeletonBlock className="h-2 w-24" />
            {[0, 1, 2].map((i) => (
              <SkeletonBlock key={i} className="h-3 w-28" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function HolidayPlannerDemoSkeleton() {
  return (
    <div className="mb-5" aria-busy="true" aria-label="Loading holiday planner demo">
      <DemoLabel />
      <div className="rounded-xl overflow-hidden bg-bg-surface border border-bg-border">
        <div className="px-4 py-2.5 flex items-center justify-between bg-bg-elevated border-b border-bg-border">
          <SkeletonBlock className="h-3.5 w-32" />
          <SkeletonBlock className="h-6 w-12 rounded" />
        </div>
        <div className="p-4 flex flex-col gap-4">
          <div>
            <SkeletonBlock className="h-2.5 w-20 mb-1" />
            <SkeletonBlock className="h-9 w-full rounded" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[0, 1, 2].map((i) => (
              <div key={i}>
                <SkeletonBlock className="h-2.5 w-14 mb-1" />
                <SkeletonBlock className="h-9 w-full rounded" />
              </div>
            ))}
          </div>
          <div className="border-t border-bg-border pt-4">
            <div className="flex justify-between mb-2">
              <SkeletonBlock className="h-2.5 w-28" />
              <SkeletonBlock className="h-2.5 w-8" />
            </div>
            {[0, 1].map((i) => (
              <div key={i} className="flex gap-2 mb-1.5">
                <SkeletonBlock className="flex-[4] h-9 rounded" />
                <SkeletonBlock className="flex-1 h-9 rounded" />
                <SkeletonBlock className="w-5 h-9" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

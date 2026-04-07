export default function KBArticleSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse space-y-5">

      {/* Video embed placeholder (16:9) */}
      <div className="w-full rounded-[10px] bg-bg-surface border border-bg-border overflow-hidden">
        <div className="aspect-video w-full" />
      </div>

      {/* Intro paragraph */}
      <div className="space-y-2 pt-1">
        <div className="h-3.5 rounded bg-bg-surface w-full" />
        <div className="h-3.5 rounded bg-bg-surface w-[94%]" />
        <div className="h-3.5 rounded bg-bg-surface w-[80%]" />
      </div>

      {/* H2 */}
      <div className="h-5 rounded bg-bg-surface w-52 mt-2" />

      <div className="space-y-2">
        <div className="h-3.5 rounded bg-bg-surface w-full" />
        <div className="h-3.5 rounded bg-bg-surface w-[91%]" />
        <div className="h-3.5 rounded bg-bg-surface w-[76%]" />
      </div>

      {/* Terminal-style code block */}
      <div className="rounded-[10px] overflow-hidden border border-[#1e1e1e]">
        {/* Header bar */}
        <div className="h-9 bg-[#141414] border-b border-[#1e1e1e]" />
        {/* Body */}
        <div className="bg-[#0d0d0d] px-4 py-4 space-y-2">
          <div className="h-3 rounded bg-bg-elevated w-[60%]" />
          <div className="h-3 rounded bg-bg-elevated w-[80%]" />
          <div className="h-3 rounded bg-bg-elevated w-[45%]" />
          <div className="h-3 rounded bg-bg-elevated w-[70%]" />
        </div>
      </div>

      {/* H2 */}
      <div className="h-5 rounded bg-bg-surface w-44 mt-2" />

      <div className="space-y-2">
        <div className="h-3.5 rounded bg-bg-surface w-full" />
        <div className="h-3.5 rounded bg-bg-surface w-[88%]" />
        <div className="h-3.5 rounded bg-bg-surface w-[95%]" />
        <div className="h-3.5 rounded bg-bg-surface w-[65%]" />
      </div>

      {/* Note block */}
      <div className="h-16 rounded-card bg-bg-surface border border-bg-border" />

      {/* H2 */}
      <div className="h-5 rounded bg-bg-surface w-36 mt-2" />

      <div className="space-y-2">
        <div className="h-3.5 rounded bg-bg-surface w-full" />
        <div className="h-3.5 rounded bg-bg-surface w-[78%]" />
      </div>

    </div>
  )
}

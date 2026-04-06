export default function KBArticleSkeleton() {
  return (
    <div aria-hidden="true" className="animate-pulse space-y-4">

      {/* Banner-shaped block */}
      <div className="h-14 rounded-card bg-bg-surface border border-bg-border" />

      {/* Intro paragraphs */}
      <div className="space-y-2 pt-2">
        <div className="h-3.5 rounded bg-bg-surface w-full" />
        <div className="h-3.5 rounded bg-bg-surface w-[92%]" />
        <div className="h-3.5 rounded bg-bg-surface w-[85%]" />
      </div>

      {/* H2 */}
      <div className="h-5 rounded bg-bg-surface w-48 mt-6" />

      <div className="space-y-2">
        <div className="h-3.5 rounded bg-bg-surface w-full" />
        <div className="h-3.5 rounded bg-bg-surface w-[96%]" />
        <div className="h-3.5 rounded bg-bg-surface w-[78%]" />
      </div>

      {/* Code block */}
      <div className="h-28 rounded-card bg-bg-surface border border-bg-border mt-2" />

      {/* H2 */}
      <div className="h-5 rounded bg-bg-surface w-56 mt-6" />

      <div className="space-y-2">
        <div className="h-3.5 rounded bg-bg-surface w-full" />
        <div className="h-3.5 rounded bg-bg-surface w-[88%]" />
        <div className="h-3.5 rounded bg-bg-surface w-[94%]" />
        <div className="h-3.5 rounded bg-bg-surface w-[70%]" />
      </div>

      {/* Note block */}
      <div className="h-16 rounded-card bg-bg-surface border border-bg-border mt-2" />

      {/* H2 */}
      <div className="h-5 rounded bg-bg-surface w-40 mt-6" />

      <div className="space-y-2">
        <div className="h-3.5 rounded bg-bg-surface w-full" />
        <div className="h-3.5 rounded bg-bg-surface w-[82%]" />
      </div>

    </div>
  )
}

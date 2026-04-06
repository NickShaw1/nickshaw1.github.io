interface KBDiagramProps {
  src: string
  alt: string
  caption?: string
}

export default function KBDiagram({ src, alt, caption }: KBDiagramProps) {
  return (
    <figure className="my-8">
      <div className="rounded-card border border-bg-border bg-bg-surface p-4 flex items-center justify-center">
        <img
          src={src}
          alt={alt}
          className="max-w-full h-auto rounded"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center font-mono text-[11px] text-text-muted leading-relaxed">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

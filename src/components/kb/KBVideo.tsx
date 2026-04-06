interface KBVideoProps {
  videoId: string
  title: string
  caption?: string
}

export default function KBVideo({ videoId, title, caption }: KBVideoProps) {
  return (
    <figure className="my-8">
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          className="absolute inset-0 w-full h-full rounded-card"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <figcaption className="mt-3 text-center font-mono text-[11px] text-text-muted leading-relaxed">
        {caption && <span>{caption}. </span>}
        <span>Video by the Playwright team. </span>
        <a
          href="https://www.youtube.com/@Playwrightdev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link/80 transition-colors duration-150"
        >
          Playwright on YouTube
        </a>
      </figcaption>
    </figure>
  )
}

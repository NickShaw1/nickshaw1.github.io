import { useState } from 'react'
import { Play } from 'lucide-react'

interface KBVideoProps {
  videoId: string
  title: string
  caption?: string
}

export default function KBVideo({ videoId, title, caption }: KBVideoProps) {
  const [loaded, setLoaded] = useState(false)

  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

  return (
    <figure className="my-8">
      <div
        className="relative w-full overflow-hidden rounded-card border border-bg-border bg-bg-surface"
        style={{ paddingBottom: '56.25%' }}
      >
        {loaded ? (
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button
            onClick={() => setLoaded(true)}
            aria-label={`Play video: ${title}`}
            className="absolute inset-0 w-full h-full group"
          >
            <img
              src={thumbnailUrl}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-bg-base/50 group-hover:bg-bg-base/40 transition-colors duration-150" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-accent/90 group-hover:bg-accent transition-colors duration-150 shadow-lg">
                <Play size={24} className="text-bg-base ml-1" fill="currentColor" />
              </div>
            </div>
          </button>
        )}
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

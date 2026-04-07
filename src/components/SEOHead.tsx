import { Helmet } from 'react-helmet-async'
import { meta } from '../data/meta'

interface SEOHeadProps {
  title: string
  description: string
  ogType?: 'website' | 'article'
  canonicalUrl?: string
  ogImage?: string
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export default function SEOHead({
  title,
  description,
  ogType = 'website',
  canonicalUrl,
  ogImage = `${meta.canonicalBase}/og-image.png`,
  jsonLd,
}: SEOHeadProps) {
  const canonical = canonicalUrl
    ? `${meta.canonicalBase}${canonicalUrl}`
    : meta.canonicalBase

  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self'",
    `connect-src 'self' https://formspree.io https://api.frankfurter.dev https://api.open-meteo.com https://api.wheretheiss.at https://corquaid.github.io https://ssd.jpl.nasa.gov https://corsproxy.io`,
    "frame-src https://www.youtube.com",
  ].join('; ')

  return (
    <Helmet>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="author" content={meta.name} />
      <link rel="canonical" href={canonical} />

      {/* CSP */}
      <meta http-equiv="Content-Security-Policy" content={csp} />

      {/* Open Graph */}
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type"        content={ogType} />
      <meta property="og:url"         content={canonical} />
      <meta property="og:image"       content={ogImage} />
      <meta property="og:site_name"   content={meta.domain} />
      <meta property="og:locale"      content="en_GB" />

      {/* Twitter */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content="@nickshawqa" />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImage} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Helmet>
  )
}

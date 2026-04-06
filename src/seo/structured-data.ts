import { meta } from '../data/meta'

export function personSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${meta.canonicalBase}/#person`,
    name: meta.name,
    jobTitle: meta.jobTitle,
    url: meta.canonicalBase,
    sameAs: [
      meta.social.linkedin,
      meta.social.github,
      meta.social.twitter,
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'County Down',
      addressRegion: 'Northern Ireland',
      addressCountry: 'GB',
    },
    description:
      `Head of QA with 12 years of experience in software testing and delivery, based in County Down, Northern Ireland.`,
  }
}

export function profilePageSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${meta.canonicalBase}/cv#profilepage`,
    name: `CV – ${meta.name}`,
    url: `${meta.canonicalBase}/cv`,
    mainEntity: {
      '@id': `${meta.canonicalBase}/#person`,
    },
  }
}

interface ArticleSchemaOptions {
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  url: string
}

interface WebPageSchemaOptions {
  name: string
  description: string
  url: string
}

export function webPageSchema(opts: WebPageSchemaOptions): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: opts.name,
    description: opts.description,
    url: `${meta.canonicalBase}${opts.url}`,
    author: {
      '@type': 'Person',
      '@id': `${meta.canonicalBase}/#person`,
      name: meta.name,
    },
    inLanguage: 'en-GB',
  }
}

interface CollectionPageSchemaOptions {
  name: string
  description: string
  url: string
}

export function collectionPageSchema(opts: CollectionPageSchemaOptions): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: opts.name,
    description: opts.description,
    url: `${meta.canonicalBase}${opts.url}`,
    author: {
      '@type': 'Person',
      '@id': `${meta.canonicalBase}/#person`,
      name: meta.name,
    },
    inLanguage: 'en-GB',
  }
}

interface TechArticleSchemaOptions {
  headline: string
  description: string
  url: string
  dateModified?: string
}

export function techArticleSchema(opts: TechArticleSchemaOptions): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: opts.headline,
    description: opts.description,
    url: `${meta.canonicalBase}${opts.url}`,
    dateModified: opts.dateModified ?? '2026-04-06',
    author: {
      '@type': 'Person',
      '@id': `${meta.canonicalBase}/#person`,
      name: meta.name,
      url: meta.canonicalBase,
    },
    publisher: {
      '@type': 'Person',
      name: meta.name,
      url: meta.canonicalBase,
    },
    isPartOf: {
      '@type': 'WebSite',
      name: `${meta.name} — Software Testing Knowledge Base`,
      url: `${meta.canonicalBase}/knowledge-base`,
    },
    inLanguage: 'en-GB',
  }
}

export function articleSchema(opts: ArticleSchemaOptions): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: opts.headline,
    description: opts.description,
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    url: `${meta.canonicalBase}${opts.url}`,
    author: {
      '@type': 'Person',
      '@id': `${meta.canonicalBase}/#person`,
      name: meta.name,
      url: meta.canonicalBase,
    },
    publisher: {
      '@type': 'Person',
      name: meta.name,
      url: meta.canonicalBase,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${meta.canonicalBase}${opts.url}`,
    },
  }
}

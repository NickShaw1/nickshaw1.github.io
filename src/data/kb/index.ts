import type { ComponentType, FC } from 'react'
import { BookOpen, Hand, ClipboardList, Bot, FlaskConical, Activity, Sparkles, Wrench, Lightbulb } from 'lucide-react'

// Types — shared across all KB files
export interface KBTocSection {
  id: string
  title: string
}

export interface KBArticle {
  slug: string
  title: string
  shortTitle?: string
  description?: string
  wordCount: number
  sections: KBTocSection[]
  load: () => Promise<{ default: FC }>
}

export function readingTime(wordCount: number): string {
  const mins = Math.ceil(wordCount / 200)
  return `${mins} min read`
}

export type KBIcon = ComponentType<{ size?: number; className?: string }>

export interface KBSectionData {
  slug: string
  title: string
  colour: string
  icon: KBIcon
  articles: KBArticle[]
}

// Colour key:
//   Theory    → #60a5fa  (blue)
//   Guides    → #34d399  (green)
//   Reference → #f59e0b  (amber)
const SECTION_LOADERS: Record<string, {
  title: string
  colour: string
  icon: KBIcon
  load: () => Promise<{ articles: KBArticle[] }>
}> = {
  foundations: {
    title: 'Foundations',
    colour: '#60a5fa',
    icon: BookOpen,
    load: () => import('./foundations/index'),
  },
  'manual-testing': {
    title: 'Manual Testing',
    colour: '#60a5fa',
    icon: Hand,
    load: () => import('./manual-testing/index'),
  },
  'test-management': {
    title: 'Test Management',
    colour: '#60a5fa',
    icon: ClipboardList,
    load: () => import('./test-management/index'),
  },
  automation: {
    title: 'Automation',
    colour: '#60a5fa',
    icon: Bot,
    load: () => import('./automation/index'),
  },
  'specialist-testing': {
    title: 'Specialist Testing',
    colour: '#60a5fa',
    icon: FlaskConical,
    load: () => import('./specialist-testing/index'),
  },
  observability: {
    title: 'Observability',
    colour: '#60a5fa',
    icon: Activity,
    load: () => import('./observability/index'),
  },
  'ai-and-modern-testing': {
    title: 'AI & Modern Testing',
    colour: '#60a5fa',
    icon: Sparkles,
    load: () => import('./ai-and-modern-testing/index'),
  },
  tooling: {
    title: 'Tooling',
    colour: '#60a5fa',
    icon: Wrench,
    load: () => import('./tooling/index'),
  },
  concepts: {
    title: 'Concepts',
    colour: '#60a5fa',
    icon: Lightbulb,
    load: () => import('./concepts/index'),
  },
}

const sectionCache = new Map<string, KBSectionData>()

export async function loadSection(slug: string): Promise<KBSectionData | undefined> {
  if (sectionCache.has(slug)) return sectionCache.get(slug)!

  const entry = SECTION_LOADERS[slug]
  if (!entry) return undefined

  const mod = await entry.load()
  const data: KBSectionData = {
    slug,
    title: entry.title,
    colour: entry.colour,
    icon: entry.icon,
    articles: mod.articles,
  }
  sectionCache.set(slug, data)
  return data
}

export function prefetchSection(slug: string): void {
  SECTION_LOADERS[slug]?.load()
}

export function getAdjacentArticles(articles: KBArticle[], articleSlug: string) {
  const index = articles.findIndex((a) => a.slug === articleSlug)
  return {
    prev: index > 0 ? articles[index - 1] : null,
    next: index < articles.length - 1 ? articles[index + 1] : null,
  }
}

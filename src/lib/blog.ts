export interface PostMeta {
  slug: string
  title: string
  date: string          // ISO: YYYY-MM-DD
  excerpt: string
  category: string
  readingTime: string
}

export interface Post extends PostMeta {
  body: string          // Markdown body (frontmatter stripped)
}

// ── Frontmatter parser ────────────────────────────────────
function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { meta: {}, body: raw }

  const meta: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    const val = line.slice(colon + 1).trim().replace(/^"(.*)"$/, '$1')
    if (key) meta[key] = val
  }

  return { meta, body: match[2].trimStart() }
}

// ── Load all posts eagerly at build time ──────────────────
const rawModules = import.meta.glob<string>(
  '../content/blog/*.md',
  { query: '?raw', import: 'default', eager: true },
)

function buildPosts(): Post[] {
  const posts: Post[] = []

  for (const [path, raw] of Object.entries(rawModules)) {
    const { meta, body } = parseFrontmatter(raw)
    const slug = meta['slug'] ?? path.replace(/^.*\/(.+)\.md$/, '$1')

    posts.push({
      slug,
      title:       meta['title']       ?? 'Untitled',
      date:        meta['date']        ?? '',
      excerpt:     meta['excerpt']     ?? '',
      category:    meta['category']    ?? 'General',
      readingTime: meta['readingTime'] ?? '3 min read',
      body,
    })
  }

  // Newest first
  return posts.sort((a, b) => b.date.localeCompare(a.date))
}

export const allPosts: Post[]     = buildPosts()
export const allPostMeta: PostMeta[] = allPosts.map(({ body: _b, ...meta }) => meta)

export function getPostBySlug(slug: string): Post | undefined {
  return allPosts.find((p) => p.slug === slug)
}

export function getAdjacentPosts(slug: string): { prev: PostMeta | null; next: PostMeta | null } {
  const idx = allPosts.findIndex((p) => p.slug === slug)
  return {
    prev: idx > 0                    ? allPostMeta[idx - 1] : null,
    next: idx < allPosts.length - 1  ? allPostMeta[idx + 1] : null,
  }
}

// ── Date formatting ───────────────────────────────────────
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

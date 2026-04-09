import { articles as foundations }        from './foundations/index'
import { articles as manualTesting }       from './manual-testing/index'
import { articles as testManagement }      from './test-management/index'
import { articles as automation }          from './automation/index'
import { articles as specialistTesting }   from './specialist-testing/index'
import { articles as observability }       from './observability/index'
import { articles as aiAndModernTesting }  from './ai-and-modern-testing/index'
import { articles as tooling }             from './tooling/index'
import { articles as concepts }            from './concepts/index'
import { articles as playwright }          from './playwright/index'
import { articles as playwrightApi }       from './playwright-api-testing/index'
import { articles as playwrightMcp }       from './playwright-mcp/index'

export interface SearchEntry {
  sectionSlug:   string
  sectionTitle:  string
  sectionColour: string
  articleSlug:   string
  title:         string
  description:   string
  sectionTitles: string[]
}

const BLUE = '#60a5fa'
const RED  = '#E2574C'

const SECTIONS: { slug: string; title: string; colour: string; articles: typeof foundations }[] = [
  { slug: 'foundations',           title: 'Foundations',                  colour: BLUE, articles: foundations        },
  { slug: 'manual-testing',        title: 'Manual Testing',               colour: BLUE, articles: manualTesting      },
  { slug: 'test-management',       title: 'Test Management',              colour: BLUE, articles: testManagement     },
  { slug: 'automation',            title: 'Automation',                   colour: BLUE, articles: automation         },
  { slug: 'specialist-testing',    title: 'Specialist Testing',           colour: BLUE, articles: specialistTesting  },
  { slug: 'observability',         title: 'Observability',                colour: BLUE, articles: observability      },
  { slug: 'ai-and-modern-testing', title: 'AI & Modern Testing',          colour: BLUE, articles: aiAndModernTesting },
  { slug: 'tooling',               title: 'Tooling',                      colour: BLUE, articles: tooling            },
  { slug: 'concepts',              title: 'Concepts',                     colour: BLUE, articles: concepts           },
  { slug: 'playwright',            title: 'Playwright',                   colour: RED,  articles: playwright         },
  { slug: 'playwright-api-testing',title: 'API Testing in Playwright',    colour: RED,  articles: playwrightApi      },
  { slug: 'playwright-mcp',        title: 'MCP and AI-Assisted Testing',  colour: RED,  articles: playwrightMcp      },
]

export const searchIndex: SearchEntry[] = SECTIONS.flatMap(({ slug, title, colour, articles }) =>
  articles.map(a => ({
    sectionSlug:   slug,
    sectionTitle:  title,
    sectionColour: colour,
    articleSlug:   a.slug,
    title:         a.title,
    description:   a.description ?? '',
    sectionTitles: a.sections.map(s => s.title),
  }))
)

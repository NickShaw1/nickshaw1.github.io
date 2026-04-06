import type { KBArticle } from '../index'

export const articles: KBArticle[] = [
  {
    slug: 'logs-metrics-and-traces',
    title: 'Logs, Metrics & Traces in QA',
    shortTitle: 'Logs, Metrics & Traces',
    wordCount: 1100,
    sections: [
      { id: 'logs',                        title: 'Logs' },
      { id: 'metrics',                     title: 'Metrics' },
      { id: 'traces',                      title: 'Traces' },
      { id: 'correlating-the-three-signals', title: 'Correlating the three signals' },
    ],
    load: () => import('./logs-metrics-and-traces'),
  },
  {
    slug: 'error-tracking-and-alerting',
    title: 'Error Tracking & Alerting',
    wordCount: 950,
    sections: [
      { id: 'error-tracking',                  title: 'Error tracking' },
      { id: 'alerting',                         title: 'Alerting' },
      { id: 'using-production-signals-in-qa',  title: 'Using production signals in QA' },
    ],
    load: () => import('./error-tracking-and-alerting'),
  },
  {
    slug: 'synthetic-monitoring',
    title: 'Synthetic Monitoring',
    wordCount: 900,
    sections: [
      { id: 'how-synthetic-monitoring-works',       title: 'How synthetic monitoring works' },
      { id: 'what-synthetic-monitoring-catches',    title: 'What synthetic monitoring catches' },
      { id: 'the-relationship-to-automated-testing', title: 'The relationship to automated testing' },
    ],
    load: () => import('./synthetic-monitoring'),
  },
  {
    slug: 'feature-flags-and-canary-releases',
    title: 'Feature Flags & Canary Releases',
    shortTitle: 'Feature Flags & Canaries',
    wordCount: 1000,
    sections: [
      { id: 'feature-flags',                        title: 'Feature flags' },
      { id: 'canary-releases',                      title: 'Canary releases' },
      { id: 'qa-in-a-progressive-delivery-model',  title: 'QA in a progressive delivery model' },
    ],
    load: () => import('./feature-flags-and-canary-releases'),
  },
  {
    slug: 'ab-testing-as-engineering',
    title: 'A/B Testing as Engineering',
    wordCount: 900,
    sections: [
      { id: 'the-engineering-requirements', title: 'The engineering requirements' },
      { id: 'testing-experiments',          title: 'Testing experiments' },
      { id: 'statistical-validity',         title: 'Statistical validity' },
      { id: 'quality-considerations',       title: 'Quality considerations' },
    ],
    load: () => import('./ab-testing-as-engineering'),
  },
]

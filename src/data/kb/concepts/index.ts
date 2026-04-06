import type { KBArticle } from '../index'

export const articles: KBArticle[] = [
  {
    slug: 'writing-good-tests',
    title: 'Writing Good Tests: General Principles',
    shortTitle: 'Writing Good Tests',
    wordCount: 950,
    sections: [
      { id: 'what-makes-a-test-good', title: 'What makes a test good' },
      { id: 'naming-and-readability', title: 'Naming and readability' },
      { id: 'test-isolation',         title: 'Test isolation' },
      { id: 'assertions',             title: 'Assertions' },
      { id: 'what-not-to-test',       title: 'What not to test' },
      { id: 'maintenance',            title: 'Maintenance' },
    ],
    load: () => import('./writing-good-tests'),
  },
  {
    slug: 'introducing-testing-to-a-legacy-codebase',
    title: 'Introducing Testing to a Legacy Codebase',
    shortTitle: 'Legacy Testing',
    wordCount: 900,
    sections: [
      { id: 'the-challenge',          title: 'The challenge' },
      { id: 'where-to-start',         title: 'Where to start' },
      { id: 'characterisation-tests', title: 'Characterisation tests' },
      { id: 'making-code-testable',   title: 'Making code testable' },
      { id: 'avoiding-the-rewrite-trap', title: 'Avoiding the rewrite trap' },
    ],
    load: () => import('./legacy-codebase-testing'),
  },
  {
    slug: 'building-a-test-strategy',
    title: 'Building a Test Strategy from Scratch',
    shortTitle: 'Test Strategy',
    wordCount: 950,
    sections: [
      { id: 'what-a-strategy-is-not',      title: 'What a strategy is not' },
      { id: 'understanding-risk',          title: 'Understanding risk' },
      { id: 'choosing-the-right-coverage', title: 'Choosing the right coverage' },
      { id: 'tooling-and-infrastructure',  title: 'Tooling and infrastructure' },
      { id: 'making-it-stick',             title: 'Making it stick' },
    ],
    load: () => import('./building-a-test-strategy'),
  },
  {
    slug: 'setting-up-testing-in-ci-cd',
    title: 'Setting Up Testing in CI/CD',
    shortTitle: 'Testing in CI/CD',
    wordCount: 1400,
    sections: [
      { id: 'what-ci-cd-means-for-testing', title: 'What CI/CD means for testing' },
      { id: 'structuring-your-pipeline',    title: 'Structuring your pipeline' },
      { id: 'test-environment-management',  title: 'Test environment management' },
      { id: 'parallelisation-and-speed',    title: 'Parallelisation and speed' },
      { id: 'handling-flaky-tests',         title: 'Handling flaky tests' },
      { id: 'gates-and-failure-policies',   title: 'Gates and failure policies' },
      { id: 'reporting-and-visibility',     title: 'Reporting and visibility' },
    ],
    load: () => import('./testing-in-ci-cd'),
  },
]

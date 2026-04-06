import type { KBArticle } from '../index'

export const articles: KBArticle[] = [
  {
    slug: 'test-planning-and-strategy',
    title: 'Test Planning & Strategy',
    wordCount: 1250,
    sections: [
      { id: 'test-strategy',            title: 'Test strategy' },
      { id: 'test-plan',                title: 'Test plan' },
      { id: 'entry-and-exit-criteria',  title: 'Entry and exit criteria' },
      { id: 'planning-in-agile-contexts', title: 'Planning in agile contexts' },
    ],
    load: () => import('./test-planning-and-strategy'),
  },
  {
    slug: 'writing-and-managing-test-cases',
    title: 'Writing & Managing Test Cases',
    shortTitle: 'Test Cases',
    wordCount: 750,
    sections: [
      { id: 'anatomy-of-a-test-case',  title: 'Anatomy of a test case' },
      { id: 'an-example-test-case',    title: 'An example test case' },
      { id: 'conditions-not-scripts',  title: 'Conditions, not scripts' },
      { id: 'test-case-maintenance',   title: 'Test case maintenance' },
    ],
    load: () => import('./writing-and-managing-test-cases'),
  },
  {
    slug: 'test-suite-management',
    title: 'Test Suite Management',
    wordCount: 700,
    sections: [
      { id: 'organising-suites',      title: 'Organising suites' },
      { id: 'suite-health-and-decay', title: 'Suite health and decay' },
      { id: 'review-and-pruning',     title: 'Review and pruning' },
    ],
    load: () => import('./test-suite-management'),
  },
  {
    slug: 'estimating-testing-effort',
    title: 'Estimating Testing Effort',
    wordCount: 750,
    sections: [
      { id: 'why-estimates-are-hard',  title: 'Why estimates are hard' },
      { id: 'estimation-techniques',   title: 'Estimation techniques' },
      { id: 'communicating-estimates', title: 'Communicating estimates' },
    ],
    load: () => import('./estimating-testing-effort'),
  },
  {
    slug: 'risk-based-test-prioritisation',
    title: 'Risk-Based Test Prioritisation',
    shortTitle: 'Risk-Based Prioritisation',
    wordCount: 750,
    sections: [
      { id: 'what-risk-based-testing-means', title: 'What risk-based testing means' },
      { id: 'identifying-and-scoring-risk',  title: 'Identifying and scoring risk' },
      { id: 'applying-the-prioritisation',   title: 'Applying the prioritisation' },
    ],
    load: () => import('./risk-based-test-prioritisation'),
  },
  {
    slug: 'testing-in-regulated-industries',
    title: 'Testing in Regulated Industries',
    shortTitle: 'Regulated Industries',
    wordCount: 950,
    sections: [
      { id: 'what-regulation-changes',      title: 'What regulation changes' },
      { id: 'common-regulatory-frameworks', title: 'Common regulatory frameworks' },
      { id: 'documentation-requirements',   title: 'Documentation requirements' },
      { id: 'validation-and-qualification', title: 'Validation and qualification' },
    ],
    load: () => import('./testing-in-regulated-industries'),
  },
  {
    slug: 'compliance-and-audit-evidence',
    title: 'Compliance & Audit Evidence',
    wordCount: 750,
    sections: [
      { id: 'what-auditors-look-for', title: 'What auditors look for' },
      { id: 'traceability',           title: 'Traceability' },
      { id: 'maintaining-evidence',   title: 'Maintaining evidence' },
    ],
    load: () => import('./compliance-and-audit-evidence'),
  },
  {
    slug: 'outsourcing-qa-vs-in-house',
    title: 'Outsourcing QA vs In-House',
    wordCount: 750,
    sections: [
      { id: 'the-core-trade-off',     title: 'The core trade-off' },
      { id: 'when-outsourcing-works', title: 'When outsourcing works' },
      { id: 'hybrid-models',          title: 'Hybrid models' },
    ],
    load: () => import('./outsourcing-qa-vs-in-house'),
  },
  {
    slug: 'selling-testing-to-stakeholders',
    title: 'Selling Testing to Stakeholders',
    wordCount: 750,
    sections: [
      { id: 'the-framing-problem',   title: 'The framing problem' },
      { id: 'language-that-works',   title: 'Language that works' },
      { id: 'metrics-that-resonate', title: 'Metrics that resonate' },
    ],
    load: () => import('./selling-testing-to-stakeholders'),
  },
]

import type { KBArticle } from '../index'

export const articles: KBArticle[] = [
  {
    slug: 'introduction-to-manual-testing',
    title: 'Introduction to Manual Testing',
    shortTitle: 'Introduction',
    wordCount: 1000,
    sections: [
      { id: 'what-manual-testing-does-well', title: 'What manual testing does well' },
      { id: 'where-it-is-less-suitable',     title: 'Where it is less suitable' },
      { id: 'in-practice',                   title: 'In practice' },
    ],
    load: () => import('./introduction-to-manual-testing'),
  },
  {
    slug: 'exploratory-testing',
    title: 'Exploratory Testing',
    wordCount: 1200,
    sections: [
      { id: 'charters-and-session-based-testing', title: 'Charters and session-based testing' },
      { id: 'heuristics-and-mental-models',       title: 'Heuristics and mental models' },
      { id: 'when-it-matters-most',               title: 'When it matters most' },
    ],
    load: () => import('./exploratory-testing'),
  },
  {
    slug: 'writing-good-bug-reports',
    title: 'Writing Good Bug Reports',
    wordCount: 1400,
    sections: [
      { id: 'why-report-quality-matters', title: 'Why report quality matters' },
      { id: 'anatomy-of-a-good-report',   title: 'Anatomy of a good report' },
      { id: 'example-bug-report',         title: 'An example report' },
      { id: 'reproducibility',            title: 'Reproducibility' },
      { id: 'severity-and-priority',      title: 'Severity and priority' },
      { id: 'evidence-and-context',       title: 'Evidence and context' },
    ],
    load: () => import('./writing-good-bug-reports'),
  },
  {
    slug: 'defect-lifecycle-management',
    title: 'Defect Lifecycle Management',
    wordCount: 1000,
    sections: [
      { id: 'the-standard-lifecycle',       title: 'The standard lifecycle' },
      { id: 'triage',                       title: 'Triage' },
      { id: 'verification-and-regression',  title: 'Verification and regression' },
      { id: 'non-standard-outcomes',        title: 'Non-standard outcomes' },
    ],
    load: () => import('./defect-lifecycle-management'),
  },
  {
    slug: 'bug-bashes-and-structured-sessions',
    title: 'Bug Bashes & Structured Sessions',
    shortTitle: 'Bug Bashes',
    wordCount: 800,
    sections: [
      { id: 'when-to-run-one',        title: 'When to run one' },
      { id: 'running-one-effectively', title: 'Running one effectively' },
      { id: 'what-makes-them-fail',   title: 'What makes them fail' },
    ],
    load: () => import('./bug-bashes-and-structured-sessions'),
  },
  {
    slug: 'pair-testing',
    title: 'Pair Testing',
    wordCount: 800,
    sections: [
      { id: 'pairing-models',     title: 'Pairing models' },
      { id: 'when-it-adds-value', title: 'When it adds value' },
    ],
    load: () => import('./pair-testing'),
  },
  {
    slug: 'usability-testing',
    title: 'Usability Testing',
    wordCount: 1200,
    sections: [
      { id: 'what-usability-testing-examines', title: 'What usability testing examines' },
      { id: 'moderated-and-unmoderated',       title: 'Moderated and unmoderated' },
      { id: 'heuristic-evaluation',            title: 'Heuristic evaluation' },
      { id: 'what-to-measure',                 title: 'What to measure' },
      { id: 'the-testers-role',                title: "The tester's role" },
    ],
    load: () => import('./usability-testing'),
  },
]

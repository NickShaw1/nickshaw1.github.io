import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function AccessibilityAndVisualTools() {
  return (
    <>
      <KBP>
        Accessibility and visual testing tools cover two distinct quality dimensions that
        conventional functional tests do not address. Accessibility tools verify that an
        application meets the technical requirements of assistive technologies and
        accessibility standards, catching issues that prevent users with disabilities from
        using the application effectively. Visual testing tools detect unintended changes
        to the rendered appearance of a page or component, catching regressions that are
        invisible to functional assertions but immediately apparent to users. The three tools
        in this section, Axe, Percy and Storybook, are often used together to cover both
        dimensions at different levels of the test hierarchy.
      </KBP>

      <KBH2 id="axe">Axe</KBH2>

      <KBP>
        <a href="https://www.deque.com/axe" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">Axe</a> is
        an accessibility testing engine developed by Deque. The core library,
        <a href="https://github.com/dequelabs/axe-core" target="_blank" rel="noopener noreferrer" className="text-link hover:underline"> axe-core</a>,
        is open source and forms the basis of integrations available for Playwright, Cypress,
        Selenium, Jest and Vitest, as well as browser extensions for Chrome and Firefox.
        It analyses the rendered DOM against a set of rules derived from WCAG 2.x and
        best practices, and returns a list of violations with an impact rating of minor,
        moderate, serious or critical.
      </KBP>

      <KBP>
        Axe's design principle is to have no false positives. Every violation it reports
        is a genuine accessibility issue. Some issues that require human judgement to
        evaluate, such as whether an image's alternative text is meaningfully descriptive,
        are flagged as requiring review rather than reported as definitive violations. This
        approach makes axe-core results trustworthy without requiring manual triage of
        noisy output.
      </KBP>

      <KBP>
        Integrating axe into an existing test suite is low friction. In a Playwright test,
        a single call to <code>checkA11y()</code> via the axe-playwright package will
        analyse the current page and fail the test if any violations are found. Teams
        commonly add axe checks to end-to-end tests at key points in critical user flows,
        ensuring that accessibility is continuously verified as the application evolves.
      </KBP>

      <KBH2 id="percy">Percy</KBH2>

      <KBP>
        <a href="https://percy.io" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">Percy</a>, now
        part of BrowserStack, is a visual testing platform that captures screenshots of
        pages or components and compares them against an approved baseline to detect visual
        regressions. When a pull request is opened, Percy captures new screenshots, diffs
        them pixel by pixel against the baseline and presents the changes in a review
        dashboard. Reviewers approve or reject the changes; approved changes become the
        new baseline for future comparisons.
      </KBP>

      <KBP>
        Percy integrates with Playwright, Cypress, Selenium, WebdriverIO and Storybook,
        capturing snapshots at points defined within existing tests without requiring a
        separate test suite. It handles responsive snapshots across multiple viewport widths
        in a single run, and its rendering infrastructure normalises cross-browser and
        cross-platform rendering differences to reduce noise in the diffs.
      </KBP>

      <KBP>
        The review workflow is Percy's key design choice. Rather than treating every visual
        difference as a test failure, it puts the decision in front of a human: is this
        change intentional or accidental? Intentional design changes are approved and the
        baseline moves forward. Accidental regressions are rejected and must be fixed before
        the pull request is merged. This makes Percy more practical than pixel-perfect
        assertions in automated tests, which produce failures on every intentional change.
      </KBP>

      <KBH2 id="storybook">Storybook</KBH2>

      <KBP>
        <a href="https://storybook.js.org" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">Storybook</a> is
        a component workshop that renders UI components in isolation, outside the application.
        Each story defines a component in a specific state: a button in its default, disabled
        and loading states, a form with validation errors or a card with long and short
        content. Stories serve as living documentation and as the foundation for several
        types of testing.
      </KBP>

      <KBP>
        Storybook's test runner executes stories as automated tests in a headless browser,
        checking that each component renders without errors. Play functions add interaction
        testing: a story can define a sequence of user interactions, such as filling a form
        and submitting it, and assert on the resulting state using Testing Library queries.
        The accessibility addon integrates axe-core into the Storybook UI, running
        accessibility checks on each story and displaying violations in a dedicated panel.
        Percy integration captures visual snapshots of every story, giving visual regression
        coverage at the component level without requiring a full application deployment.
      </KBP>

      <KBAside label="Layering these tools" variant="blue">
        Axe, Percy and Storybook are complementary at different granularities. Storybook
        provides component-level coverage: accessibility and visual checks on each component
        state in isolation. Percy in end-to-end tests provides page-level visual regression
        coverage across assembled pages and real user flows. Axe in end-to-end tests provides
        accessibility coverage in the context of real routes and dynamic content. Used
        together, they give breadth at the component level and depth at the integration level
        without significant overlap.
      </KBAside>

      <KBNote variant="green">
        Automated accessibility testing with axe catches a well-defined subset of WCAG
        violations, typically around 30 to 40 percent of possible issues. The remainder
        require human judgement: whether a screen reader experience makes sense, whether
        focus management is logical in a complex interactive widget or whether colour contrast
        is sufficient in a context axe cannot fully evaluate. Automated checks are a
        necessary baseline, but they do not substitute for testing with assistive technologies
        and involving users with disabilities in the process.
      </KBNote>
    </>
  )
}

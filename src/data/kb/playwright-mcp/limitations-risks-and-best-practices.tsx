import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBCode from '../../../components/kb/KBCode'
import KBSteps from '../../../components/kb/KBSteps'

export default function LimitationsRisksAndBestPractices() {
  return (
    <>
      <KBP>
        This final article in the section provides a clear-eyed assessment of what
        AI-assisted testing cannot do reliably, the risks of using it carelessly and a
        practical checklist for teams that want to use it well. The aim is not to discourage
        the use of AI tools - they offer real value - but to make sure that value is captured
        without sacrificing the integrity of your test suite.
      </KBP>

      <KBH2 id="hallucination">Hallucination in generated test code</KBH2>

      <KBP>
        Hallucination is the well-known tendency of large language models to produce
        confident-sounding output that is factually wrong. In test code, hallucination
        takes several specific forms:
      </KBP>

      <KBH3>Non-existent locators</KBH3>

      <KBP>
        The AI generates a locator for an element that does not exist on the page. This is
        most common when the AI has not been given access to the live page via the MCP
        server and is generating code from a description alone. The locator looks plausible
        but resolves to nothing when the test runs.
      </KBP>

      <KBCode language="typescript">{`// AI generated this for a checkout page it had not seen
await page.getByRole('button', { name: 'Proceed to payment' }).click()

// The actual button text is "Continue to payment"
// Times out: No element found with role 'button' and name 'Proceed to payment'`}</KBCode>

      <KBH3>Invented API methods</KBH3>

      <KBP>
        Occasionally an AI generates a Playwright method that does not exist. This is
        less common with well-trained models on the current Playwright API, but it still
        happens - particularly for newer features or unusual combinations:
      </KBP>

      <KBCode language="typescript">{`// This method does not exist in Playwright
await page.waitForNetworkIdle({ timeout: 5000 })

// The correct approach is either:
await page.waitForLoadState('networkidle')
// or
await page.waitForResponse('**/api/data')`}</KBCode>

      <KBH3>Wrong assertion methods</KBH3>

      <KBP>
        The AI may use Jest assertion methods that do not exist in Playwright's
        <code>expect</code>, or may confuse retrying and non-retrying assertions:
      </KBP>

      <KBCode language="typescript">{`// AI may generate this - works in Jest but not as a Playwright async assertion
expect(await page.getByText('Hello').isVisible()).toBe(true)

// Correct - uses Playwright's auto-retrying assertion
await expect(page.getByText('Hello')).toBeVisible()`}</KBCode>

      <KBH3>How to spot hallucination</KBH3>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>Run the generated code immediately. Many hallucinated locators and methods produce errors on the first run.</li>
        <li>Check any method you do not recognise against the Playwright documentation before accepting it.</li>
        <li>Be suspicious of locators that were generated without the AI having direct access to the page.</li>
      </ul>

      <KBH2 id="over-reliance">Over-reliance and accountability for test quality</KBH2>

      <KBP>
        The most significant risk of AI-assisted testing is not that the AI produces bad
        code, but that engineers accept bad code without scrutiny because they trust the
        tool. Over-reliance on AI output leads to a test suite that provides the appearance
        of coverage without the reality.
      </KBP>

      <KBP>
        Three forms of over-reliance to watch for:
      </KBP>

      <KBH3>Coverage illusion</KBH3>

      <KBP>
        A test that navigates to a page and asserts that the heading is visible has covered
        the page in the sense that a test file exists for it. It has not covered the page
        in the sense that verifies the page works correctly. AI-generated test suites
        often have high coverage numbers and low actual confidence because the assertions
        are too weak to catch real bugs.
      </KBP>

      <KBH3>Velocity over quality</KBH3>

      <KBP>
        AI can generate a hundred test cases in the time it would take a human to write
        ten. This speed creates pressure to commit quickly and move on. The discipline of
        reviewing every test before committing becomes harder to maintain when the AI is
        producing output faster than you can read it. Slow down. Review everything.
      </KBP>

      <KBH3>Diffused accountability</KBH3>

      <KBP>
        "The AI wrote it" is not an acceptable answer when a production bug is caught by a
        customer that your test suite should have caught. The person who committed the test
        is accountable for its quality, regardless of what tool generated the first draft.
        AI assistance does not transfer accountability.
      </KBP>

      <KBH2 id="human-readable">Keeping your test suite human-readable and maintainable</KBH2>

      <KBP>
        AI-generated code can accumulate patterns that make a test suite harder to maintain
        over time: inconsistent naming, duplicated setup code, overly long test functions
        and mixed abstraction levels. Review generated code with maintainability in mind,
        not just correctness.
      </KBP>

      <KBCode language="typescript">{`// AI may generate this - functional but not maintainable
test('test 1', async ({ page }) => {
  await page.goto('http://localhost:3000/login')
  await page.locator('input[type="email"]').fill('user@example.com')
  await page.locator('input[type="password"]').fill('password123')
  await page.locator('button[type="submit"]').click()
  await expect(page.locator('h1')).toBeVisible()
})

// What it should look like after human review
test.describe('Login page', () => {
  test('redirects to dashboard on valid credentials', async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel('Email').fill('user@example.com')
    await page.getByLabel('Password').fill('password123')
    await page.getByRole('button', { name: 'Sign in' }).click()
    await expect(page).toHaveURL('/dashboard')
    const heading = page.getByRole('heading', { name: 'Dashboard' })
    await expect(heading).toBeVisible()
  })
})`}</KBCode>

      <KBH2 id="when-not-to-use-ai">When not to use AI in your testing workflow</KBH2>

      <KBP>
        AI assistance is most valuable for mechanical, pattern-repeating work. It is least
        appropriate when you need:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li><strong className="text-text-primary">Security testing coverage</strong> - Security tests require deliberate adversarial thinking. An AI will not think to check for SQL injection, CSRF vulnerabilities or improper authorisation unless specifically prompted to, and even then the coverage is not reliable.</li>
        <li><strong className="text-text-primary">Domain-specific test logic</strong> - Tests for financial calculations, medical device behaviour, regulatory compliance or other domain-critical logic require deep domain knowledge. AI does not have reliable domain knowledge about your specific business rules.</li>
        <li><strong className="text-text-primary">Tests for complex race conditions</strong> - Identifying and testing race conditions requires a precise understanding of your system's concurrency model. AI suggestions in this area tend to be generic rather than specific to your architecture.</li>
        <li><strong className="text-text-primary">Deciding what to test</strong> - AI can suggest tests for what it can observe, but it cannot decide which scenarios are most important to your business. Test strategy requires human judgement about risk and value.</li>
      </ul>

      <KBH2 id="checklist">A practical checklist for safe AI-assisted testing</KBH2>

      <KBSteps
        variant="green"
        steps={[
          {
            title: 'Before generating',
            body: (
              <ul className="space-y-2 text-text-secondary text-[14px] leading-relaxed list-disc pl-4">
                <li>Describe the flow precisely: entry state, actions to perform, expected outcomes.</li>
                <li>Specify the locator strategies you want used (getByRole, getByLabel first).</li>
                <li>Tell the AI whether it has access to the live application or is working from a description.</li>
                <li>Give it your project's naming and organisation conventions.</li>
              </ul>
            ),
          },
          {
            title: 'After generating - initial review',
            body: (
              <ul className="space-y-2 text-text-secondary text-[14px] leading-relaxed list-disc pl-4">
                <li>Run the generated test immediately. Confirm it executes without syntax errors.</li>
                <li>Check every method name against the Playwright documentation if you are not certain it exists.</li>
                <li>Verify each locator resolves to the element you expect by running in headed mode.</li>
              </ul>
            ),
          },
          {
            title: 'Assertion quality review',
            body: (
              <ul className="space-y-2 text-text-secondary text-[14px] leading-relaxed list-disc pl-4">
                <li>For each assertion, ask: would this assertion catch a bug that matters to users?</li>
                <li>Check for missing negative assertions - things that should be absent after an action.</li>
                <li>Replace any assertion that checks a property that was already true before the test action.</li>
              </ul>
            ),
          },
          {
            title: 'Locator review',
            body: (
              <ul className="space-y-2 text-text-secondary text-[14px] leading-relaxed list-disc pl-4">
                <li>Flag any CSS selector, XPath or nth-child locator for replacement.</li>
                <li>Check that role-based locators are not ambiguous - run in strict mode.</li>
                <li>Assess whether the accessible name the locator relies on is stable.</li>
              </ul>
            ),
          },
          {
            title: 'Maintainability review',
            body: (
              <ul className="space-y-2 text-text-secondary text-[14px] leading-relaxed list-disc pl-4">
                <li>Rename tests and describe blocks to accurately reflect what they test.</li>
                <li>Extract repeated setup into beforeEach or fixtures.</li>
                <li>Remove any waitForTimeout calls and replace with proper assertions.</li>
              </ul>
            ),
          },
          {
            title: 'Before committing',
            body: (
              <ul className="space-y-2 text-text-secondary text-[14px] leading-relaxed list-disc pl-4">
                <li>Run the full test file at least once to confirm all tests pass consistently.</li>
                <li>Read the complete diff. Every line you commit is your responsibility.</li>
                <li>If you cannot explain why a line of test code is correct, investigate before committing.</li>
              </ul>
            ),
          },
        ]}
      />

      <KBNote variant="warning">
        The measure of a good test suite is not how many tests it contains or how quickly
        they were written. It is how many real bugs it catches before users do. A small
        suite of carefully written, well-reviewed tests catches more bugs than a large
        suite of AI-generated tests that nobody has read carefully. Use AI to get to a
        good suite faster, not to get to a large suite carelessly.
      </KBNote>
    </>
  )
}

import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBBanner from '../../../components/kb/KBBanner'
import KBCode from '../../../components/kb/KBCode'
import KBVideo from '../../../components/kb/KBVideo'

export default function PlaywrightAssertions() {
  return (
    <>
      <KBBanner variant="info">
        This article assumes you are familiar with locators. If not, read the Locators and
        Selectors article first.
      </KBBanner>

      <KBP>
        Assertions are the part of a test that determines whether it passes or fails. They
        check that the application is in the expected state after your test has interacted
        with it. Playwright's assertion library is built around the <code>expect()</code>
        function and covers everything from element visibility and text content to URLs,
        network requests and visual screenshots.
      </KBP>

      <KBH2 id="auto-retrying-assertions">Auto-retrying assertions</KBH2>

      <KBVideo
        videoId="1VxkHP8vfGg"
        title="Playwright Assertions: Avoid Race Conditions with This Simple Fix!"
        caption="How Playwright's auto-retrying assertions prevent race conditions"
      />

      <KBP>
        The most important thing to understand about Playwright assertions is that most of
        them are auto-retrying. When you write:
      </KBP>

      <KBCode language="typescript">{`await expect(page.getByRole('status')).toHaveText('Saved');`}</KBCode>

      <KBP>
        Playwright does not check the element once and either pass or fail immediately. It
        checks repeatedly until the condition is met or the assertion timeout expires. The
        default assertion timeout is five seconds, configurable in <code>playwright.config.ts</code>.
      </KBP>

      <KBP>
        This behaviour solves a fundamental problem in browser automation: web applications
        are asynchronous. A button click might trigger an API call, which updates state,
        which causes the UI to re-render. The sequence takes time. Without auto-retrying
        assertions, you would need to add explicit waits before every assertion to give the
        UI time to catch up. Those waits are a major source of both slow tests and flaky
        tests.
      </KBP>

      <KBNote variant="green">
        Never use <code>page.waitForTimeout()</code> before an assertion to give the page
        time to update. Use an auto-retrying assertion instead. Fixed waits make your tests
        slower on fast machines and still fail on slow ones.
      </KBNote>

      <KBH2 id="non-retrying-assertions">Non-retrying assertions</KBH2>

      <KBP>
        Not all assertions auto-retry. Assertions that operate on plain JavaScript values
        rather than locators or page objects check once and either pass or fail immediately:
      </KBP>

      <KBCode language="typescript">{`// These check once — they do not retry
expect(2 + 2).toBe(4);
expect('hello world').toContain('world');
expect([1, 2, 3]).toHaveLength(3);
expect({ name: 'Alice' }).toEqual({ name: 'Alice' });`}</KBCode>

      <KBP>
        These are appropriate when asserting on values you have already retrieved from the
        page, such as the result of <code>page.evaluate()</code> or a value read from a
        fixture. They are not appropriate for asserting directly on the state of the UI,
        because by the time you read the value the UI may not have finished updating.
      </KBP>

      <KBH2 id="page-assertions">Page-level assertions</KBH2>

      <KBH3 id="to-have-title">toHaveTitle()</KBH3>

      <KBP>
        Asserts that the page's <code>&lt;title&gt;</code> element matches a string or regular
        expression:
      </KBP>

      <KBCode language="typescript">{`await expect(page).toHaveTitle('My Application: Dashboard');
await expect(page).toHaveTitle(/Dashboard/);`}</KBCode>

      <KBH3 id="to-have-url">toHaveURL()</KBH3>

      <KBP>
        Asserts that the current URL matches a string or regular expression. This is
        particularly useful after navigation triggered by a user action:
      </KBP>

      <KBCode language="typescript">{`await expect(page).toHaveURL('https://example.com/dashboard');
await expect(page).toHaveURL(/\\/dashboard$/);`}</KBCode>

      <KBH2 id="element-assertions">Element assertions</KBH2>

      <KBH3 id="to-be-visible">toBeVisible() and toBeHidden()</KBH3>

      <KBP>
        <code>toBeVisible()</code> asserts that an element is present in the DOM and visible
        to the user. An element is considered visible if it has non-zero dimensions and is
        not hidden via <code>display: none</code>, <code>visibility: hidden</code> or
        <code>opacity: 0</code>.
      </KBP>

      <KBCode language="typescript">{`await expect(page.getByRole('dialog')).toBeVisible();
await expect(page.getByRole('dialog')).toBeHidden();`}</KBCode>

      <KBH3 id="to-be-attached">toBeAttached()</KBH3>

      <KBP>
        Asserts that an element is present in the DOM, regardless of whether it is visible.
        This is useful for elements that exist in the DOM but are visually hidden, such as
        off-screen modals or visually hidden accessibility content:
      </KBP>

      <KBCode language="typescript">{`await expect(page.locator('#hidden-form')).toBeAttached();`}</KBCode>

      <KBH3 id="to-have-text">toHaveText() and toContainText()</KBH3>

      <KBP>
        <code>toHaveText()</code> asserts that an element's text content matches the expected
        value exactly. <code>toContainText()</code> asserts that the element's text includes
        the expected string as a substring:
      </KBP>

      <KBCode language="typescript">{`// Exact match
await expect(page.getByRole('status')).toHaveText('Item added to basket');

// Partial match
await expect(page.getByRole('status')).toContainText('added to basket');

// Regular expression
await expect(page.getByRole('heading')).toHaveText(/Welcome, .+/);`}</KBCode>

      <KBP>
        Both methods also accept an array of strings when asserting on a list of elements:
      </KBP>

      <KBCode language="typescript">{`// Assert that a list contains exactly these items in this order
await expect(page.getByRole('listitem')).toHaveText(['Apples', 'Bananas', 'Cherries']);`}</KBCode>

      <KBH3 id="to-have-value">toHaveValue()</KBH3>

      <KBP>
        Asserts the current value of an input, textarea or select element:
      </KBP>

      <KBCode language="typescript">{`await expect(page.getByLabel('Email address')).toHaveValue('user@example.com');
await expect(page.getByLabel('Country')).toHaveValue('GB');`}</KBCode>

      <KBH3 id="to-be-checked">toBeChecked()</KBH3>

      <KBP>
        Asserts that a checkbox or radio button is in the checked state:
      </KBP>

      <KBCode language="typescript">{`await expect(page.getByLabel('I agree to the terms')).toBeChecked();
await expect(page.getByLabel('Receive marketing emails')).not.toBeChecked();`}</KBCode>

      <KBH3 id="to-be-enabled">toBeEnabled() and toBeDisabled()</KBH3>

      <KBP>
        Asserts that an interactive element is enabled or disabled. This is useful for
        verifying that form validation is working correctly, such as a submit button that
        should remain disabled until all required fields are filled:
      </KBP>

      <KBCode language="typescript">{`await expect(page.getByRole('button', { name: 'Submit' })).toBeDisabled();

await page.getByLabel('Name').fill('Alice');
await page.getByLabel('Email').fill('alice@example.com');

await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled();`}</KBCode>

      <KBH3 id="to-have-attribute">toHaveAttribute()</KBH3>

      <KBP>
        Asserts that an element has a specific attribute with an optional specific value:
      </KBP>

      <KBCode language="typescript">{`// Assert the attribute exists with any value
await expect(page.getByRole('img', { name: 'Profile photo' })).toHaveAttribute('src');

// Assert the attribute has a specific value
await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');

// Assert the attribute value matches a regular expression
await expect(page.getByRole('img')).toHaveAttribute('src', /\\/images\\//);`}</KBCode>

      <KBH3 id="to-have-class">toHaveClass()</KBH3>

      <KBP>
        Asserts that an element has a specific CSS class. This can be useful for verifying
        state changes that are communicated through class names, such as an active navigation
        item:
      </KBP>

      <KBCode language="typescript">{`await expect(page.getByRole('link', { name: 'Dashboard' })).toHaveClass(/active/);`}</KBCode>

      <KBH3 id="to-have-count">toHaveCount()</KBH3>

      <KBP>
        Asserts that a locator matches a specific number of elements. This is useful for
        verifying that a list has the expected number of items:
      </KBP>

      <KBCode language="typescript">{`// Assert there are exactly 5 items in the list
await expect(page.getByRole('listitem')).toHaveCount(5);

// Assert the basket is empty
await expect(page.getByRole('listitem')).toHaveCount(0);`}</KBCode>

      <KBH3 id="to-be-in-viewport">toBeInViewport()</KBH3>

      <KBP>
        Asserts that an element is visible within the current viewport. This is useful for
        testing scroll behaviour or verifying that elements scroll into view when expected:
      </KBP>

      <KBCode language="typescript">{`await expect(page.getByRole('heading', { name: 'Footer section' })).toBeInViewport();`}</KBCode>

      <KBH2 id="negating-assertions">Negating assertions</KBH2>

      <KBP>
        Add <code>.not</code> before any assertion method to negate it. The negated assertion
        also auto-retries, waiting until the condition is false rather than true:
      </KBP>

      <KBCode language="typescript">{`await expect(page.getByRole('dialog')).not.toBeVisible();
await expect(page.getByRole('button', { name: 'Submit' })).not.toBeDisabled();
await expect(page.getByText('Error')).not.toBeAttached();`}</KBCode>

      <KBH2 id="custom-error-messages">Custom error messages</KBH2>

      <KBP>
        Pass a second argument to <code>expect()</code> with a <code>message</code> property
        to provide a custom error message that appears when the assertion fails. This helps
        when reading test output to understand what the test was trying to verify:
      </KBP>

      <KBCode language="typescript">{`await expect(
  page.getByRole('status'),
  { message: 'Expected confirmation message to appear after form submission' }
).toHaveText('Your order has been placed');`}</KBCode>

      <KBH2 id="soft-assertions">Soft assertions</KBH2>

      <KBP>
        By default, a failing assertion immediately stops the test. Soft assertions allow a
        test to continue after an assertion fails, collecting all failures before reporting
        them together. This is useful when you want to check multiple independent conditions
        on the same page without having one failure mask the rest:
      </KBP>

      <KBCode language="typescript">{`test('order confirmation page displays all details', async ({ page }) => {
  await page.goto('https://example.com/order-confirmation/12345');

  // These use expect.soft() — failures are collected but the test continues
  await expect.soft(page.getByRole('heading')).toHaveText('Order confirmed');
  await expect.soft(page.getByTestId('order-number')).toHaveText('#12345');
  await expect.soft(page.getByTestId('delivery-date')).toBeVisible();

  // The test stops here and reports all soft failures from above
  // Any hard assertion after this point would stop the test immediately
});`}</KBCode>

      <KBNote variant="warning">
        Soft assertions are useful for checking multiple properties of a page in one pass,
        but do not use them as a substitute for writing focused tests. If a page has ten
        things to check, it is usually better to group them into meaningful tests than to
        write a single test with ten soft assertions.
      </KBNote>

      <KBH2 id="assertion-timeouts">Assertion timeouts</KBH2>

      <KBP>
        The default assertion timeout is five seconds. You can override this for a specific
        assertion using the <code>timeout</code> option:
      </KBP>

      <KBCode language="typescript">{`// Wait up to 10 seconds for this specific assertion
await expect(page.getByRole('status')).toHaveText('Processing complete', { timeout: 10_000 });`}</KBCode>

      <KBP>
        To change the default timeout for all assertions in your project, set
        <code>expect.timeout</code> in <code>playwright.config.ts</code>:
      </KBP>

      <KBCode language="typescript">{`// playwright.config.ts
export default defineConfig({
  expect: {
    timeout: 10_000,
  },
});`}</KBCode>

      <KBH2 id="visual-regression">Visual regression with toHaveScreenshot()</KBH2>

      <KBP>
        <code>toHaveScreenshot()</code> takes a screenshot of an element or the full page and
        compares it against a stored baseline image. If the screenshots differ beyond a
        configurable threshold, the assertion fails:
      </KBP>

      <KBCode language="typescript">{`// Takes a full-page screenshot and compares it to the baseline
await expect(page).toHaveScreenshot('dashboard.png');

// Takes a screenshot of a specific element
await expect(page.getByRole('img', { name: 'Chart' })).toHaveScreenshot('chart.png');`}</KBCode>

      <KBP>
        On the first run, no baseline exists, so Playwright saves the screenshot as the
        baseline and the test passes. On subsequent runs it compares the current screenshot
        against the saved baseline.
      </KBP>

      <KBP>
        When you intentionally change the UI and want to update the baselines, run:
      </KBP>

      <KBCode language="bash">{`npx playwright test --update-snapshots`}</KBCode>

      <KBNote variant="warning">
        Screenshot baselines are operating-system and browser-specific. A baseline captured
        on macOS will differ from one captured on Linux due to font rendering and
        anti-aliasing differences. For consistent results in CI, generate and store baselines
        from the same environment that runs your CI pipeline, typically Linux.
      </KBNote>

      <KBNote variant="blue">
        The full assertion API reference is at{' '}
        <a
          href="https://playwright.dev/docs/test-assertions"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link/80 transition-colors duration-150"
        >
          playwright.dev/docs/test-assertions
        </a>.
      </KBNote>

      <KBH2 id="next-steps">Next steps</KBH2>

      <KBP>
        You now have a thorough understanding of how to assert on the state of your
        application. The next article covers the Page Object Model: a design pattern for
        organising your test code that makes large test suites significantly easier to
        maintain.
      </KBP>
    </>
  )
}

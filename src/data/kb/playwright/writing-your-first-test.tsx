import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBBanner from '../../../components/kb/KBBanner'
import KBCode from '../../../components/kb/KBCode'
import KBVideo from '../../../components/kb/KBVideo'

export default function PlaywrightWritingYourFirstTest() {
  return (
    <>
      <KBBanner variant="info">
        This article assumes you have a working Playwright project set up. If you have not
        done that yet, start with the Installation and Project Setup article.
      </KBBanner>

      <KBVideo
        videoId="GKG9g_JGZPc"
        title="Get started with end-to-end testing: Playwright | Episode 4 - Writing Tests"
        caption="Writing end-to-end tests with Playwright"
      />

      <KBP>
        A test in Playwright is a JavaScript or TypeScript function that opens a browser,
        interacts with a web page and checks that the page behaves as expected. This article
        explains the anatomy of a test file in detail, introduces the core API you will use
        in every test and walks through writing a complete test from scratch.
      </KBP>

      <KBH2 id="anatomy-of-a-test-file">Anatomy of a test file</KBH2>

      <KBP>
        Open <code>tests/example.spec.ts</code> in your project. It contains two tests and
        looks like this:
      </KBP>

      <KBCode language="typescript">{`import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page).toHaveURL(/.*intro/);
});`}</KBCode>

      <KBP>
        Each part of this file has a specific purpose. The following sections break it down
        line by line.
      </KBP>

      <KBH3 id="the-import">The import</KBH3>

      <KBCode language="typescript">{`import { test, expect } from '@playwright/test';`}</KBCode>

      <KBP>
        This imports two things from the Playwright test package. <code>test</code> is the
        function you use to define a test. <code>expect</code> is the assertion library you
        use to verify that things on the page are correct. Both come from the same package
        and work together throughout your test suite.
      </KBP>

      <KBH3 id="the-test-function">The test function</KBH3>

      <KBCode language="typescript">{`test('has title', async ({ page }) => {
  // test body
});`}</KBCode>

      <KBP>
        The <code>test</code> function takes two arguments: a name and an async function.
        The name appears in the terminal output and in the HTML report, so it should describe
        what the test is checking in plain language.
      </KBP>

      <KBP>
        The async function receives an object of fixtures as its argument. The most important
        fixture is <code>page</code>, which represents the browser page your test is
        controlling. Playwright provides this automatically for every test; you do not create
        it yourself.
      </KBP>

      <KBH3 id="async-await">async and await</KBH3>

      <KBP>
        Every Playwright action that interacts with the browser is asynchronous. This means
        it does not complete instantly; it sends an instruction to the browser and waits for
        the browser to respond. The <code>async</code> keyword on the test function tells
        JavaScript that the function contains asynchronous operations. The <code>await</code>
        keyword before each Playwright call tells JavaScript to wait for that operation to
        complete before moving to the next line.
      </KBP>

      <KBP>
        If you forget <code>await</code>, the code will move on before the browser has
        finished the previous action. This leads to tests that fail inconsistently and are
        difficult to debug. You should always use <code>await</code> before every Playwright
        call.
      </KBP>

      <KBH3 id="the-page-object">The page object</KBH3>

      <KBP>
        The <code>page</code> object is your primary interface to the browser. It represents
        a single browser tab and provides methods for navigating, finding elements,
        interacting with the page and reading its state. Most of what you do in a Playwright
        test goes through the <code>page</code> object.
      </KBP>

      <KBH2 id="navigating-to-a-page">Navigating to a page</KBH2>

      <KBP>
        Use <code>page.goto()</code> to navigate to a URL. Playwright waits for the page to
        reach a usable state before continuing, so you do not need to add an explicit wait
        after navigation in most cases:
      </KBP>

      <KBCode language="typescript">{`await page.goto('https://example.com');`}</KBCode>

      <KBP>
        By default <code>goto()</code> waits until the <code>load</code> event fires, which
        means the page's HTML has loaded and all synchronous scripts have run. For pages that
        load content dynamically after the initial load, Playwright's auto-waiting on element
        interactions handles the remaining delay without any additional configuration.
      </KBP>

      <KBH2 id="interacting-with-elements">Interacting with elements</KBH2>

      <KBP>
        Playwright provides methods for all the common ways a user interacts with a web page.
        Each of these is called on a locator, which is an object that describes how to find
        an element on the page. Locators are covered in full in the next article; for now,
        the examples below use <code>getByRole()</code>, which finds elements by their
        accessible role and name.
      </KBP>

      <KBH3 id="clicking">Clicking</KBH3>

      <KBP>
        Use <code>click()</code> to click on an element. Playwright waits for the element to
        be visible and stable before clicking:
      </KBP>

      <KBCode language="typescript">{`await page.getByRole('button', { name: 'Submit' }).click();`}</KBCode>

      <KBH3 id="typing">Typing into inputs</KBH3>

      <KBP>
        Use <code>fill()</code> to type a value into an input field. This clears any existing
        content first and then enters the new value:
      </KBP>

      <KBCode language="typescript">{`await page.getByLabel('Email address').fill('test@example.com');`}</KBCode>

      <KBH3 id="pressing-keys">Pressing keys</KBH3>

      <KBP>
        Use <code>press()</code> to simulate a key press. This is useful for submitting forms
        with the Enter key or triggering keyboard shortcuts:
      </KBP>

      <KBCode language="typescript">{`await page.getByLabel('Search').press('Enter');`}</KBCode>

      <KBH3 id="selecting-options">Selecting from a dropdown</KBH3>

      <KBP>
        Use <code>selectOption()</code> to select a value from a <code>&lt;select&gt;</code>
        element:
      </KBP>

      <KBCode language="typescript">{`await page.getByLabel('Country').selectOption('United Kingdom');`}</KBCode>

      <KBH3 id="checking-checkboxes">Checking and unchecking</KBH3>

      <KBP>
        Use <code>check()</code> and <code>uncheck()</code> for checkboxes and radio buttons:
      </KBP>

      <KBCode language="typescript">{`await page.getByLabel('I agree to the terms').check();`}</KBCode>

      <KBH3 id="hovering">Hovering</KBH3>

      <KBP>
        Use <code>hover()</code> to move the mouse over an element. This is useful for
        triggering dropdown menus and tooltips that only appear on hover:
      </KBP>

      <KBCode language="typescript">{`await page.getByRole('button', { name: 'More options' }).hover();`}</KBCode>

      <KBH2 id="making-assertions">Making assertions</KBH2>

      <KBP>
        Assertions check that the page is in the state you expect. They use the
        <code>expect()</code> function, which takes either the <code>page</code> object or
        a locator as its argument.
      </KBP>

      <KBP>
        Playwright's assertions are auto-retrying: if the condition is not yet met, Playwright
        keeps checking until it passes or the assertion timeout expires. This removes the
        need to add manual waits before assertions, which is a common source of fragile tests.
      </KBP>

      <KBCode language="typescript">{`// Assert the page title matches a string or regular expression
await expect(page).toHaveTitle('My Application');

// Assert the URL contains a pattern
await expect(page).toHaveURL(/dashboard/);

// Assert an element is visible on the page
await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();

// Assert an element contains specific text
await expect(page.getByRole('status')).toHaveText('Saved successfully');`}</KBCode>

      <KBH2 id="writing-a-complete-test">Writing a complete test from scratch</KBH2>

      <KBP>
        The following example writes a complete test against the Wikipedia homepage. It
        navigates to the site, searches for a term and verifies the results page loads
        correctly. Wikipedia is publicly accessible without an account, which makes it a
        convenient target for learning.
      </KBP>

      <KBP>
        Create a new file at <code>tests/wikipedia.spec.ts</code> and add the following:
      </KBP>

      <KBCode language="typescript">{`import { test, expect } from '@playwright/test';

test('searching Wikipedia returns results', async ({ page }) => {
  // Navigate to the Wikipedia homepage
  await page.goto('https://en.wikipedia.org/wiki/Main_Page');

  // Find the search input and type a search term
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).fill('Playwright');

  // Submit the search by pressing Enter
  await page.getByRole('searchbox', { name: 'Search Wikipedia' }).press('Enter');

  // Verify the results page has loaded by checking the heading
  await expect(page.getByRole('heading', { name: 'Playwright' })).toBeVisible();

  // Verify the URL has changed to the article page
  await expect(page).toHaveURL(/Playwright/);
});`}</KBCode>

      <KBP>
        Run this test on its own by specifying the file name:
      </KBP>

      <KBCode language="bash">{`npx playwright test wikipedia.spec.ts`}</KBCode>

      <KBP>
        You should see three passing results, one per browser. Each line describes which
        browser ran the test and how long it took.
      </KBP>

      <KBH2 id="running-a-single-test">Running a single test by name</KBH2>

      <KBP>
        When your suite grows, you will often want to run a single specific test rather than
        the whole file. Use the <code>--grep</code> flag with a search string or regular
        expression that matches the test name:
      </KBP>

      <KBCode language="bash">{`npx playwright test --grep "searching Wikipedia"`}</KBCode>

      <KBP>
        This runs only the tests whose names contain that string. It is useful during
        development when you are iterating on a specific test.
      </KBP>

      <KBH2 id="understanding-test-output">Understanding test output</KBH2>

      <KBP>
        The terminal output from <code>npx playwright test</code> uses a compact format. Each
        passing test is represented by a tick and a description. Failing tests show a cross
        along with an error message and a stack trace pointing to the line that failed.
      </KBP>

      <KBP>
        The final summary line shows the total number of tests, how many passed, how many
        failed and the total duration. If any tests failed, Playwright also reminds you to
        run <code>npx playwright show-report</code> to open the HTML report with full details.
      </KBP>

      <KBH2 id="fixing-a-failing-test">Fixing a deliberately broken test</KBH2>

      <KBP>
        Understanding failure output is as important as writing passing tests. Modify the
        Wikipedia test to introduce a deliberate failure by asserting the wrong heading:
      </KBP>

      <KBCode language="typescript">{`// This assertion is wrong — the heading on the Playwright article is "Playwright", not "Playwright (software)"
await expect(page.getByRole('heading', { name: 'Playwright (software)' })).toBeVisible();`}</KBCode>

      <KBP>
        Run the test again. It will fail with an error like:
      </KBP>

      <KBCode language="text">{`Error: Timed out 5000ms waiting for expect(locator).toBeVisible()

Locator: getByRole('heading', { name: 'Playwright (software)' })
Expected: visible
Received: hidden

  at tests/wikipedia.spec.ts:14:68`}</KBCode>

      <KBP>
        The error tells you exactly what went wrong: Playwright waited five seconds for a
        heading with that exact name to become visible but it never did. The stack trace
        points to the line number in your file. Correct the assertion back to
        <code>'Playwright'</code> and the test will pass again.
      </KBP>

      <KBNote variant="warning">
        The most common cause of assertion failures is a mismatch between the text you
        specify and the actual text on the page, including differences in capitalisation and
        whitespace. If an assertion fails unexpectedly, open the page in a browser and inspect
        the element carefully.
      </KBNote>

      <KBH2 id="test-isolation">Test isolation</KBH2>

      <KBP>
        Each Playwright test runs in a fresh browser context. This means cookies, local
        storage, session storage and authentication state are reset between every test.
        Tests cannot accidentally affect one another through shared browser state.
      </KBP>

      <KBP>
        This isolation is one of the most important properties of a reliable test suite.
        It means you can run your tests in any order and get the same results. It also means
        that if one test fails, the failure cannot cause subsequent tests to behave
        unexpectedly.
      </KBP>

      <KBH2 id="grouping-tests">Grouping tests with describe</KBH2>

      <KBP>
        Use <code>test.describe()</code> to group related tests together. This organises your
        test file and makes the output easier to read when there are many tests:
      </KBP>

      <KBCode language="typescript">{`import { test, expect } from '@playwright/test';

test.describe('Wikipedia search', () => {
  test('returns results for a valid search term', async ({ page }) => {
    await page.goto('https://en.wikipedia.org/wiki/Main_Page');
    await page.getByRole('searchbox', { name: 'Search Wikipedia' }).fill('Playwright');
    await page.getByRole('searchbox', { name: 'Search Wikipedia' }).press('Enter');
    await expect(page.getByRole('heading', { name: 'Playwright' })).toBeVisible();
  });

  test('shows the search input on the homepage', async ({ page }) => {
    await page.goto('https://en.wikipedia.org/wiki/Main_Page');
    await expect(page.getByRole('searchbox', { name: 'Search Wikipedia' })).toBeVisible();
  });
});`}</KBCode>

      <KBH2 id="setup-and-teardown">Setup and teardown with beforeEach and afterEach</KBH2>

      <KBP>
        If multiple tests in a describe block share the same setup step, use
        <code>test.beforeEach()</code> to run it before every test automatically. This avoids
        repeating the same navigation code across every test:
      </KBP>

      <KBCode language="typescript">{`import { test, expect } from '@playwright/test';

test.describe('Wikipedia search', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://en.wikipedia.org/wiki/Main_Page');
  });

  test('returns results for a valid search term', async ({ page }) => {
    await page.getByRole('searchbox', { name: 'Search Wikipedia' }).fill('Playwright');
    await page.getByRole('searchbox', { name: 'Search Wikipedia' }).press('Enter');
    await expect(page.getByRole('heading', { name: 'Playwright' })).toBeVisible();
  });

  test('shows the search input', async ({ page }) => {
    await expect(page.getByRole('searchbox', { name: 'Search Wikipedia' })).toBeVisible();
  });
});`}</KBCode>

      <KBP>
        Similarly, <code>test.afterEach()</code> runs after every test and is useful for
        cleanup tasks such as deleting test data created during a test.
      </KBP>

      <KBH2 id="naming-conventions">Naming conventions</KBH2>

      <KBP>
        Test files should be named with a <code>.spec.ts</code> suffix, which is the pattern
        Playwright looks for by default. The file name should describe the feature or page
        being tested: <code>login.spec.ts</code>, <code>checkout.spec.ts</code>,
        <code>navigation.spec.ts</code>.
      </KBP>

      <KBP>
        Test names should read like sentences that describe what is being verified. Prefer
        "adds an item to the basket" over "test basket" or "basket test 1". Good test names
        make failure output self-explanatory without needing to read the test code.
      </KBP>

      <KBNote variant="green">
        The official Playwright documentation for writing tests is at{' '}
        <a
          href="https://playwright.dev/docs/writing-tests"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link/80 transition-colors duration-150"
        >
          playwright.dev/docs/writing-tests
        </a>.
      </KBNote>

      <KBH2 id="next-steps">Next steps</KBH2>

      <KBP>
        You now know how to write, run and interpret Playwright tests. The next article covers
        locators in depth: how Playwright finds elements on the page, which strategies to
        prefer and how to write locators that hold up as your application changes.
      </KBP>
    </>
  )
}

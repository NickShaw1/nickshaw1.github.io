import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBBanner from '../../../components/kb/KBBanner'
import KBCode from '../../../components/kb/KBCode'
import KBVideo from '../../../components/kb/KBVideo'

export default function PlaywrightAdvancedPatterns() {
  return (
    <>
      <KBBanner variant="info">
        This article covers advanced usage patterns. Work through the earlier articles in
        this guide before reading this one, as it builds on concepts introduced throughout.
      </KBBanner>

      <KBP>
        The earlier articles in this guide cover the fundamentals: writing tests, locating
        elements, making assertions, structuring your code and running in CI. This article
        covers the patterns that become necessary as your test suite matures: mocking network
        requests, managing authentication state efficiently, composing tests with fixtures,
        handling multiple tabs and testing accessibility.
      </KBP>

      <KBH2 id="api-mocking">API mocking with page.route()</KBH2>

      <KBVideo
        videoId="kvGszYAYQ6M"
        title="How to test dynamic content in Playwright with API mocking"
        caption="Mocking API responses in Playwright tests"
      />

      <KBP>
        <code>page.route()</code> intercepts network requests that match a URL pattern and
        allows you to return a mock response, modify the real response or abort the request
        entirely. This is useful when you want to test how your application handles specific
        API responses without depending on a live backend.
      </KBP>

      <KBH3 id="returning-a-mock-response">Returning a mock response</KBH3>

      <KBP>
        The following example intercepts a GET request and returns a fixed JSON payload:
      </KBP>

      <KBCode language="typescript">{`test('displays products from API', async ({ page }) => {
  await page.route('**/api/products', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, name: 'Widget', price: 9.99 },
        { id: 2, name: 'Gadget', price: 19.99 },
      ]),
    });
  });

  await page.goto('/products');

  await expect(page.getByText('Widget')).toBeVisible();
  await expect(page.getByText('Gadget')).toBeVisible();
});`}</KBCode>

      <KBH3 id="modifying-a-real-response">Modifying a real response</KBH3>

      <KBP>
        You can fetch the real response and modify it before returning it to the page. This
        is useful for adding edge-case data to a real response without fully mocking the
        endpoint:
      </KBP>

      <KBCode language="typescript">{`await page.route('**/api/products', async (route) => {
  const response = await route.fetch();
  const json = await response.json();

  // Add a product the real API does not return
  json.push({ id: 99, name: 'Test Product', price: 0.01 });

  await route.fulfill({ response, json });
});`}</KBCode>

      <KBH3 id="simulating-errors">Simulating error responses</KBH3>

      <KBP>
        Testing how your application handles API errors is important and difficult to do
        reliably against a live backend. With <code>page.route()</code> you can return any
        status code on demand:
      </KBP>

      <KBCode language="typescript">{`await page.route('**/api/products', async (route) => {
  await route.fulfill({ status: 500 });
});

await page.goto('/products');
await expect(page.getByText('Something went wrong')).toBeVisible();`}</KBCode>

      <KBH3 id="aborting-requests">Aborting requests</KBH3>

      <KBP>
        Use <code>route.abort()</code> to simulate a network failure:
      </KBP>

      <KBCode language="typescript">{`await page.route('**/api/products', (route) => route.abort());`}</KBCode>

      <KBNote variant="warning">
        Mocking is appropriate for testing specific edge cases and error conditions. Do not
        use it as the default approach for all tests. Tests that run against real API
        responses provide more genuine coverage of your application's behaviour and catch
        integration problems that mocked tests will never see.
      </KBNote>

      <KBH3 id="waiting-for-requests">Waiting for requests and responses</KBH3>

      <KBP>
        <code>page.waitForRequest()</code> and <code>page.waitForResponse()</code> allow you
        to synchronise a test with network activity. This is useful when a user action
        triggers a request and you want to wait for the response before making an assertion:
      </KBP>

      <KBCode language="typescript">{`// Start waiting for the response before triggering the action
const responsePromise = page.waitForResponse('**/api/orders');

await page.getByRole('button', { name: 'Place order' }).click();

const response = await responsePromise;
expect(response.status()).toBe(201);`}</KBCode>

      <KBH2 id="authentication">Authentication state with storageState</KBH2>

      <KBP>
        Most test suites need to test authenticated pages. If every test logs in through the
        UI, you spend a significant fraction of your total test time repeating a login flow
        that you are not actually testing. <code>storageState</code> solves this by saving
        and reusing browser state across tests.
      </KBP>

      <KBH3 id="saving-authentication-state">Saving authentication state</KBH3>

      <KBP>
        Create a <code>global-setup.ts</code> file that logs in once and saves the resulting
        browser storage to a file:
      </KBP>

      <KBCode language="typescript">{`// global-setup.ts
import { chromium } from '@playwright/test';

async function globalSetup() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto('http://localhost:3000/login');
  await page.getByLabel('Email').fill(process.env.TEST_EMAIL!);
  await page.getByLabel('Password').fill(process.env.TEST_PASSWORD!);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('/dashboard');

  // Save cookies and localStorage to a file
  await page.context().storageState({ path: '.auth/user.json' });

  await browser.close();
}

export default globalSetup;`}</KBCode>

      <KBP>
        Register the global setup file in <code>playwright.config.ts</code> and configure
        projects to use the saved state:
      </KBP>

      <KBCode language="typescript">{`export default defineConfig({
  globalSetup: './global-setup',
  projects: [
    {
      name: 'authenticated',
      use: {
        ...devices['Desktop Chrome'],
        storageState: '.auth/user.json',
      },
    },
  ],
});`}</KBCode>

      <KBP>
        Every test in the authenticated project starts with the saved cookies and local
        storage already in place. The login flow runs once before the entire suite rather
        than once per test, which can save minutes on large suites.
      </KBP>

      <KBNote variant="warning">
        Add <code>.auth/</code> to your <code>.gitignore</code>. The saved state file
        contains session tokens and should not be committed to version control.
      </KBNote>

      <KBH2 id="fixtures">Fixtures</KBH2>

      <KBP>
        Fixtures are Playwright's built-in system for sharing setup and teardown logic
        between tests. You have already used fixtures without realising it: <code>page</code>,
        <code>browser</code> and <code>context</code> are all fixtures that Playwright
        provides automatically.
      </KBP>

      <KBP>
        You can define your own fixtures to share page objects, test data or any other
        setup logic across tests without repeating it in every test file.
      </KBP>

      <KBH3 id="defining-custom-fixtures">Defining custom fixtures</KBH3>

      <KBP>
        Extend the base <code>test</code> object with custom fixtures:
      </KBP>

      <KBCode language="typescript">{`// fixtures.ts
import { test as base } from '@playwright/test';
import { LoginPage } from './pages/login-page';
import { DashboardPage } from './pages/dashboard-page';

type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  dashboardPage: async ({ page }, use) => {
    const dashboardPage = new DashboardPage(page);
    await use(dashboardPage);
  },
});

export { expect } from '@playwright/test';`}</KBCode>

      <KBP>
        Import <code>test</code> and <code>expect</code> from your fixtures file instead of
        from <code>@playwright/test</code>:
      </KBP>

      <KBCode language="typescript">{`// tests/login.spec.ts
import { test, expect } from '../fixtures';

test('user can log in', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');
  await expect(page).toHaveURL('/dashboard');
});`}</KBCode>

      <KBH3 id="fixture-scope">Fixture scope</KBH3>

      <KBP>
        By default, fixtures are scoped to a single test: they are created fresh for each
        test and torn down afterwards. You can change this to <code>'worker'</code> scope,
        which creates the fixture once per worker process and shares it across all tests
        that run in that worker:
      </KBP>

      <KBCode language="typescript">{`export const test = base.extend<{}, { sharedData: SomeExpensiveType }>({
  sharedData: [async ({}, use) => {
    const data = await buildExpensiveTestData();
    await use(data);
    await data.cleanup();
  }, { scope: 'worker' }],
});`}</KBCode>

      <KBP>
        Worker-scoped fixtures are useful for expensive operations that are safe to share,
        such as database seeding or starting a test server. They should not be used for
        anything that modifies shared state, as this would introduce the test pollution
        problem discussed in the debugging article.
      </KBP>

      <KBH2 id="test-annotations">Test annotations and tags</KBH2>

      <KBP>
        Playwright provides several built-in annotations for managing test execution:
      </KBP>

      <KBCode language="typescript">{`// Skip a test unconditionally
test.skip('this feature is not yet implemented', async ({ page }) => {});

// Skip conditionally
test.skip(process.env.CI === 'true', 'Not supported in CI');

// Mark a test as expected to fail — it passes if it fails, fails if it passes
test.fail('known bug — see ticket #123', async ({ page }) => {});

// Mark a test as broken without skipping it entirely
test.fixme('needs attention', async ({ page }) => {});`}</KBCode>

      <KBP>
        You can also add custom tags to tests and filter by them when running:
      </KBP>

      <KBCode language="typescript">{`test('checkout flow @smoke', async ({ page }) => {
  // ...
});

test('order history @regression', async ({ page }) => {
  // ...
});`}</KBCode>

      <KBCode language="bash">{`# Run only tests tagged @smoke
npx playwright test --grep @smoke

# Run everything except @slow tests
npx playwright test --grep-invert @slow`}</KBCode>

      <KBH2 id="serial-tests">Sequential tests with test.describe.serial()</KBH2>

      <KBP>
        Playwright runs tests in parallel by default, but some scenarios require a defined
        execution order. For example, a multi-step onboarding flow where each step depends
        on the previous one completing successfully. Use <code>test.describe.serial()</code>
        to enforce sequential execution within a group:
      </KBP>

      <KBCode language="typescript">{`test.describe.serial('onboarding flow', () => {
  test('step 1: create account', async ({ page }) => { /* ... */ });
  test('step 2: verify email', async ({ page }) => { /* ... */ });
  test('step 3: complete profile', async ({ page }) => { /* ... */ });
});`}</KBCode>

      <KBNote variant="warning">
        Prefer independent tests wherever possible. Serial test groups are harder to debug
        because a failure in an early step causes all subsequent steps to be skipped,
        making it less clear what the root cause was.
      </KBNote>

      <KBH2 id="multiple-tabs">Handling multiple tabs and popups</KBH2>

      <KBP>
        When a user action opens a new browser tab or window, Playwright provides a way to
        obtain the new page object and continue testing in it:
      </KBP>

      <KBCode language="typescript">{`// Start waiting for the new page before triggering the action that opens it
const pagePromise = context.waitForEvent('page');
await page.getByRole('link', { name: 'Open in new tab' }).click();
const newPage = await pagePromise;

// Wait for the new page to load
await newPage.waitForLoadState();

// Continue testing in the new page
await expect(newPage).toHaveTitle('New Page Title');`}</KBCode>

      <KBP>
        Similarly, use <code>page.waitForEvent('popup')</code> for popups opened via
        <code>window.open()</code>:
      </KBP>

      <KBCode language="typescript">{`const popupPromise = page.waitForEvent('popup');
await page.getByRole('button', { name: 'Preview' }).click();
const popup = await popupPromise;
await popup.waitForLoadState();
await expect(popup).toHaveURL(/preview/);`}</KBCode>

      <KBH2 id="iframes">Working with iframes</KBH2>

      <KBP>
        Content inside an <code>&lt;iframe&gt;</code> is isolated from the parent page.
        Use <code>frameLocator()</code> to scope a locator to a specific iframe:
      </KBP>

      <KBCode language="typescript">{`// Scope all locators to the iframe
const frame = page.frameLocator('iframe[title="Payment form"]');

await frame.getByLabel('Card number').fill('4111111111111111');
await frame.getByLabel('Expiry').fill('12/26');
await frame.getByLabel('CVC').fill('123');`}</KBCode>

      <KBH2 id="file-uploads-and-downloads">File uploads and downloads</KBH2>

      <KBH3 id="file-uploads">File uploads</KBH3>

      <KBP>
        Use <code>setInputFiles()</code> to attach files to a file input:
      </KBP>

      <KBCode language="typescript">{`// Single file
await page.getByLabel('Upload document').setInputFiles('path/to/document.pdf');

// Multiple files
await page.getByLabel('Upload images').setInputFiles([
  'path/to/image1.jpg',
  'path/to/image2.jpg',
]);`}</KBCode>

      <KBH3 id="file-downloads">File downloads</KBH3>

      <KBP>
        Use <code>page.waitForDownload()</code> to intercept a file download:
      </KBP>

      <KBCode language="typescript">{`const downloadPromise = page.waitForEvent('download');
await page.getByRole('button', { name: 'Export CSV' }).click();
const download = await downloadPromise;

// Save the file to a specific path
await download.saveAs('./test-results/export.csv');

// Or just verify the suggested filename
expect(download.suggestedFilename()).toBe('orders.csv');`}</KBCode>

      <KBH2 id="accessibility-testing">Accessibility testing</KBH2>

      <KBP>
        Playwright integrates with <code>@axe-core/playwright</code>, a library that runs
        automated accessibility checks against your pages. It checks for common WCAG
        violations and provides detailed reports.
      </KBP>

      <KBP>
        Install the package:
      </KBP>

      <KBCode language="bash">{`npm install @axe-core/playwright --save-dev`}</KBCode>

      <KBP>
        Add an accessibility check to a test:
      </KBP>

      <KBCode language="typescript">{`import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});`}</KBCode>

      <KBP>
        If violations are found, the test fails with a detailed list of each violation,
        including the affected elements, the WCAG rule that was broken and guidance on
        how to fix it.
      </KBP>

      <KBP>
        You can scope the analysis to a specific part of the page, exclude known violations
        temporarily or filter by WCAG level:
      </KBP>

      <KBCode language="typescript">{`const results = await new AxeBuilder({ page })
  .include('#main-content')           // Analyse only this element
  .exclude('#third-party-widget')     // Exclude elements outside your control
  .withTags(['wcag2a', 'wcag2aa'])    // Only check against these standards
  .analyze();`}</KBCode>

      <KBNote variant="warning">
        Automated accessibility testing catches a meaningful but limited subset of
        accessibility issues. axe-core typically identifies around 30–40% of WCAG
        violations automatically. Manual testing with a screen reader and keyboard-only
        navigation is required for comprehensive accessibility coverage.
      </KBNote>

      <KBH2 id="global-setup-and-teardown">Global setup and teardown</KBH2>

      <KBP>
        The <code>globalSetup</code> and <code>globalTeardown</code> options in
        <code>playwright.config.ts</code> point to files that run once before and after the
        entire test suite respectively. They are appropriate for operations that are too
        expensive to run per test and do not fit the per-worker fixture model:
      </KBP>

      <KBCode language="typescript">{`// playwright.config.ts
export default defineConfig({
  globalSetup: './global-setup',
  globalTeardown: './global-teardown',
});`}</KBCode>

      <KBCode language="typescript">{`// global-setup.ts
import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // Seed the database, start a test server, authenticate and save state
}

export default globalSetup;`}</KBCode>

      <KBCode language="typescript">{`// global-teardown.ts
import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  // Clean up the database, stop the test server
}

export default globalTeardown;`}</KBCode>

      <KBNote variant="blue">
        The full documentation for fixtures is at{' '}
        <a
          href="https://playwright.dev/docs/test-fixtures"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link/80 transition-colors duration-150"
        >
          playwright.dev/docs/test-fixtures
        </a>
        {' '}and for API mocking at{' '}
        <a
          href="https://playwright.dev/docs/mock"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link/80 transition-colors duration-150"
        >
          playwright.dev/docs/mock
        </a>.
      </KBNote>

      <KBH2 id="guide-complete">Guide complete</KBH2>

      <KBP>
        You have reached the end of the Playwright guide. You now have the knowledge to
        build and maintain a professional Playwright test suite: from first installation
        through to advanced patterns used in production testing teams.
      </KBP>

      <KBP>
        The official Playwright documentation at{' '}
        <a
          href="https://playwright.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link/80 transition-colors duration-150"
        >
          playwright.dev
        </a>
        {' '}is an excellent ongoing reference. The API evolves with each release,
        and the changelog is worth following to stay current with new capabilities as they
        ship.
      </KBP>
    </>
  )
}

import{a as e}from"./markdown-hfXSdh9Q.js";import{t}from"./KBCode-C2513JFu.js";import{t as n}from"./KBNote-CaRhdL4n.js";import{n as r,r as i,t as a}from"./KBHeading-DROUfOXR.js";import{t as o}from"./KBBanner-Nh3F7juW.js";import{t as s}from"./KBVideo-CvFC_4kB.js";var c=e();function l(){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(o,{variant:`info`,children:`This article covers advanced usage patterns. Work through the earlier articles in this guide before reading this one, as it builds on concepts introduced throughout.`}),(0,c.jsx)(i,{children:`The earlier articles in this guide cover the fundamentals: writing tests, locating elements, making assertions, structuring your code and running in CI. This article covers the patterns that become necessary as your test suite matures: mocking network requests, managing authentication state efficiently, composing tests with fixtures, handling multiple tabs and testing accessibility.`}),(0,c.jsx)(a,{id:`api-mocking`,children:`API mocking with page.route()`}),(0,c.jsx)(s,{videoId:`kvGszYAYQ6M`,title:`How to test dynamic content in Playwright with API mocking`,caption:`Mocking API responses in Playwright tests`}),(0,c.jsxs)(i,{children:[(0,c.jsx)(`code`,{children:`page.route()`}),` intercepts network requests that match a URL pattern and allows you to return a mock response, modify the real response or abort the request entirely. This is useful when you want to test how your application handles specific API responses without depending on a live backend.`]}),(0,c.jsx)(r,{id:`returning-a-mock-response`,children:`Returning a mock response`}),(0,c.jsx)(i,{children:`The following example intercepts a GET request and returns a fixed JSON payload:`}),(0,c.jsx)(t,{language:`typescript`,children:`test('displays products from API', async ({ page }) => {
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
});`}),(0,c.jsx)(r,{id:`modifying-a-real-response`,children:`Modifying a real response`}),(0,c.jsx)(i,{children:`You can fetch the real response and modify it before returning it to the page. This is useful for adding edge-case data to a real response without fully mocking the endpoint:`}),(0,c.jsx)(t,{language:`typescript`,children:`await page.route('**/api/products', async (route) => {
  const response = await route.fetch();
  const json = await response.json();

  // Add a product the real API does not return
  json.push({ id: 99, name: 'Test Product', price: 0.01 });

  await route.fulfill({ response, json });
});`}),(0,c.jsx)(r,{id:`simulating-errors`,children:`Simulating error responses`}),(0,c.jsxs)(i,{children:[`Testing how your application handles API errors is important and difficult to do reliably against a live backend. With `,(0,c.jsx)(`code`,{children:`page.route()`}),` you can return any status code on demand:`]}),(0,c.jsx)(t,{language:`typescript`,children:`await page.route('**/api/products', async (route) => {
  await route.fulfill({ status: 500 });
});

await page.goto('/products');
await expect(page.getByText('Something went wrong')).toBeVisible();`}),(0,c.jsx)(r,{id:`aborting-requests`,children:`Aborting requests`}),(0,c.jsxs)(i,{children:[`Use `,(0,c.jsx)(`code`,{children:`route.abort()`}),` to simulate a network failure:`]}),(0,c.jsx)(t,{language:`typescript`,children:`await page.route('**/api/products', (route) => route.abort());`}),(0,c.jsx)(n,{variant:`warning`,children:`Mocking is appropriate for testing specific edge cases and error conditions. Do not use it as the default approach for all tests. Tests that run against real API responses provide more genuine coverage of your application's behaviour and catch integration problems that mocked tests will never see.`}),(0,c.jsx)(r,{id:`waiting-for-requests`,children:`Waiting for requests and responses`}),(0,c.jsxs)(i,{children:[(0,c.jsx)(`code`,{children:`page.waitForRequest()`}),` and `,(0,c.jsx)(`code`,{children:`page.waitForResponse()`}),` allow you to synchronise a test with network activity. This is useful when a user action triggers a request and you want to wait for the response before making an assertion:`]}),(0,c.jsx)(t,{language:`typescript`,children:`// Start waiting for the response before triggering the action
const responsePromise = page.waitForResponse('**/api/orders');

await page.getByRole('button', { name: 'Place order' }).click();

const response = await responsePromise;
expect(response.status()).toBe(201);`}),(0,c.jsx)(a,{id:`authentication`,children:`Authentication state with storageState`}),(0,c.jsxs)(i,{children:[`Most test suites need to test authenticated pages. If every test logs in through the UI, you spend a significant fraction of your total test time repeating a login flow that you are not actually testing. `,(0,c.jsx)(`code`,{children:`storageState`}),` solves this by saving and reusing browser state across tests.`]}),(0,c.jsx)(r,{id:`saving-authentication-state`,children:`Saving authentication state`}),(0,c.jsxs)(i,{children:[`Create a `,(0,c.jsx)(`code`,{children:`global-setup.ts`}),` file that logs in once and saves the resulting browser storage to a file:`]}),(0,c.jsx)(t,{language:`typescript`,children:`// global-setup.ts
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

export default globalSetup;`}),(0,c.jsxs)(i,{children:[`Register the global setup file in `,(0,c.jsx)(`code`,{children:`playwright.config.ts`}),` and configure projects to use the saved state:`]}),(0,c.jsx)(t,{language:`typescript`,children:`export default defineConfig({
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
});`}),(0,c.jsx)(i,{children:`Every test in the authenticated project starts with the saved cookies and local storage already in place. The login flow runs once before the entire suite rather than once per test, which can save minutes on large suites.`}),(0,c.jsxs)(n,{variant:`warning`,children:[`Add `,(0,c.jsx)(`code`,{children:`.auth/`}),` to your `,(0,c.jsx)(`code`,{children:`.gitignore`}),`. The saved state file contains session tokens and should not be committed to version control.`]}),(0,c.jsx)(a,{id:`fixtures`,children:`Fixtures`}),(0,c.jsxs)(i,{children:[`Fixtures are Playwright's built-in system for sharing setup and teardown logic between tests. You have already used fixtures without realising it: `,(0,c.jsx)(`code`,{children:`page`}),`,`,(0,c.jsx)(`code`,{children:`browser`}),` and `,(0,c.jsx)(`code`,{children:`context`}),` are all fixtures that Playwright provides automatically.`]}),(0,c.jsx)(i,{children:`You can define your own fixtures to share page objects, test data or any other setup logic across tests without repeating it in every test file.`}),(0,c.jsx)(r,{id:`defining-custom-fixtures`,children:`Defining custom fixtures`}),(0,c.jsxs)(i,{children:[`Extend the base `,(0,c.jsx)(`code`,{children:`test`}),` object with custom fixtures:`]}),(0,c.jsx)(t,{language:`typescript`,children:`// fixtures.ts
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

export { expect } from '@playwright/test';`}),(0,c.jsxs)(i,{children:[`Import `,(0,c.jsx)(`code`,{children:`test`}),` and `,(0,c.jsx)(`code`,{children:`expect`}),` from your fixtures file instead of from `,(0,c.jsx)(`code`,{children:`@playwright/test`}),`:`]}),(0,c.jsx)(t,{language:`typescript`,children:`// tests/login.spec.ts
import { test, expect } from '../fixtures';

test('user can log in', async ({ loginPage, page }) => {
  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');
  await expect(page).toHaveURL('/dashboard');
});`}),(0,c.jsx)(r,{id:`fixture-scope`,children:`Fixture scope`}),(0,c.jsxs)(i,{children:[`By default, fixtures are scoped to a single test: they are created fresh for each test and torn down afterwards. You can change this to `,(0,c.jsx)(`code`,{children:`'worker'`}),` scope, which creates the fixture once per worker process and shares it across all tests that run in that worker:`]}),(0,c.jsx)(t,{language:`typescript`,children:`export const test = base.extend<{}, { sharedData: SomeExpensiveType }>({
  sharedData: [async ({}, use) => {
    const data = await buildExpensiveTestData();
    await use(data);
    await data.cleanup();
  }, { scope: 'worker' }],
});`}),(0,c.jsx)(i,{children:`Worker-scoped fixtures are useful for expensive operations that are safe to share, such as database seeding or starting a test server. They should not be used for anything that modifies shared state, as this would introduce the test pollution problem discussed in the debugging article.`}),(0,c.jsx)(a,{id:`test-annotations`,children:`Test annotations and tags`}),(0,c.jsx)(i,{children:`Playwright provides several built-in annotations for managing test execution:`}),(0,c.jsx)(t,{language:`typescript`,children:`// Skip a test unconditionally
test.skip('this feature is not yet implemented', async ({ page }) => {});

// Skip conditionally
test.skip(process.env.CI === 'true', 'Not supported in CI');

// Mark a test as expected to fail — it passes if it fails, fails if it passes
test.fail('known bug - see ticket #123', async ({ page }) => {});

// Mark a test as broken without skipping it entirely
test.fixme('needs attention', async ({ page }) => {});`}),(0,c.jsx)(i,{children:`You can also add custom tags to tests and filter by them when running:`}),(0,c.jsx)(t,{language:`typescript`,children:`test('checkout flow @smoke', async ({ page }) => {
  // ...
});

test('order history @regression', async ({ page }) => {
  // ...
});`}),(0,c.jsx)(t,{language:`bash`,children:`# Run only tests tagged @smoke
npx playwright test --grep @smoke

# Run everything except @slow tests
npx playwright test --grep-invert @slow`}),(0,c.jsx)(a,{id:`serial-tests`,children:`Sequential tests with test.describe.serial()`}),(0,c.jsxs)(i,{children:[`Playwright runs tests in parallel by default, but some scenarios require a defined execution order. For example, a multi-step onboarding flow where each step depends on the previous one completing successfully. Use `,(0,c.jsx)(`code`,{children:`test.describe.serial()`}),`to enforce sequential execution within a group:`]}),(0,c.jsx)(t,{language:`typescript`,children:`test.describe.serial('onboarding flow', () => {
  test('step 1: create account', async ({ page }) => { /* ... */ });
  test('step 2: verify email', async ({ page }) => { /* ... */ });
  test('step 3: complete profile', async ({ page }) => { /* ... */ });
});`}),(0,c.jsx)(n,{variant:`warning`,children:`Prefer independent tests wherever possible. Serial test groups are harder to debug because a failure in an early step causes all subsequent steps to be skipped, making it less clear what the root cause was.`}),(0,c.jsx)(a,{id:`multiple-tabs`,children:`Handling multiple tabs and popups`}),(0,c.jsx)(i,{children:`When a user action opens a new browser tab or window, Playwright provides a way to obtain the new page object and continue testing in it:`}),(0,c.jsx)(t,{language:`typescript`,children:`// Start waiting for the new page before triggering the action that opens it
const pagePromise = context.waitForEvent('page');
await page.getByRole('link', { name: 'Open in new tab' }).click();
const newPage = await pagePromise;

// Wait for the new page to load
await newPage.waitForLoadState();

// Continue testing in the new page
await expect(newPage).toHaveTitle('New Page Title');`}),(0,c.jsxs)(i,{children:[`Similarly, use `,(0,c.jsx)(`code`,{children:`page.waitForEvent('popup')`}),` for popups opened via`,(0,c.jsx)(`code`,{children:`window.open()`}),`:`]}),(0,c.jsx)(t,{language:`typescript`,children:`const popupPromise = page.waitForEvent('popup');
await page.getByRole('button', { name: 'Preview' }).click();
const popup = await popupPromise;
await popup.waitForLoadState();
await expect(popup).toHaveURL(/preview/);`}),(0,c.jsx)(a,{id:`iframes`,children:`Working with iframes`}),(0,c.jsxs)(i,{children:[`Content inside an `,(0,c.jsx)(`code`,{children:`<iframe>`}),` is isolated from the parent page. Use `,(0,c.jsx)(`code`,{children:`frameLocator()`}),` to scope a locator to a specific iframe:`]}),(0,c.jsx)(t,{language:`typescript`,children:`// Scope all locators to the iframe
const frame = page.frameLocator('iframe[title="Payment form"]');

await frame.getByLabel('Card number').fill('4111111111111111');
await frame.getByLabel('Expiry').fill('12/26');
await frame.getByLabel('CVC').fill('123');`}),(0,c.jsx)(a,{id:`file-uploads-and-downloads`,children:`File uploads and downloads`}),(0,c.jsx)(r,{id:`file-uploads`,children:`File uploads`}),(0,c.jsxs)(i,{children:[`Use `,(0,c.jsx)(`code`,{children:`setInputFiles()`}),` to attach files to a file input:`]}),(0,c.jsx)(t,{language:`typescript`,children:`// Single file
await page.getByLabel('Upload document').setInputFiles('path/to/document.pdf');

// Multiple files
await page.getByLabel('Upload images').setInputFiles([
  'path/to/image1.jpg',
  'path/to/image2.jpg',
]);`}),(0,c.jsx)(r,{id:`file-downloads`,children:`File downloads`}),(0,c.jsxs)(i,{children:[`Use `,(0,c.jsx)(`code`,{children:`page.waitForDownload()`}),` to intercept a file download:`]}),(0,c.jsx)(t,{language:`typescript`,children:`const downloadPromise = page.waitForEvent('download');
await page.getByRole('button', { name: 'Export CSV' }).click();
const download = await downloadPromise;

// Save the file to a specific path
await download.saveAs('./test-results/export.csv');

// Or just verify the suggested filename
expect(download.suggestedFilename()).toBe('orders.csv');`}),(0,c.jsx)(a,{id:`accessibility-testing`,children:`Accessibility testing`}),(0,c.jsxs)(i,{children:[`Playwright integrates with `,(0,c.jsx)(`code`,{children:`@axe-core/playwright`}),`, a library that runs automated accessibility checks against your pages. It checks for common WCAG violations and provides detailed reports.`]}),(0,c.jsx)(i,{children:`Install the package:`}),(0,c.jsx)(t,{language:`bash`,children:`npm install @axe-core/playwright --save-dev`}),(0,c.jsx)(i,{children:`Add an accessibility check to a test:`}),(0,c.jsx)(t,{language:`typescript`,children:`import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/');

  const results = await new AxeBuilder({ page }).analyze();

  expect(results.violations).toEqual([]);
});`}),(0,c.jsx)(i,{children:`If violations are found, the test fails with a detailed list of each violation, including the affected elements, the WCAG rule that was broken and guidance on how to fix it.`}),(0,c.jsx)(i,{children:`You can scope the analysis to a specific part of the page, exclude known violations temporarily or filter by WCAG level:`}),(0,c.jsx)(t,{language:`typescript`,children:`const results = await new AxeBuilder({ page })
  .include('#main-content')           // Analyse only this element
  .exclude('#third-party-widget')     // Exclude elements outside your control
  .withTags(['wcag2a', 'wcag2aa'])    // Only check against these standards
  .analyze();`}),(0,c.jsx)(n,{variant:`warning`,children:`Automated accessibility testing catches a meaningful but limited subset of accessibility issues. axe-core typically identifies around 30–40% of WCAG violations automatically. Manual testing with a screen reader and keyboard-only navigation is required for comprehensive accessibility coverage.`}),(0,c.jsx)(a,{id:`global-setup-and-teardown`,children:`Global setup and teardown`}),(0,c.jsxs)(i,{children:[`The `,(0,c.jsx)(`code`,{children:`globalSetup`}),` and `,(0,c.jsx)(`code`,{children:`globalTeardown`}),` options in`,(0,c.jsx)(`code`,{children:`playwright.config.ts`}),` point to files that run once before and after the entire test suite respectively. They are appropriate for operations that are too expensive to run per test and do not fit the per-worker fixture model:`]}),(0,c.jsx)(t,{language:`typescript`,children:`// playwright.config.ts
export default defineConfig({
  globalSetup: './global-setup',
  globalTeardown: './global-teardown',
});`}),(0,c.jsx)(t,{language:`typescript`,children:`// global-setup.ts
import { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  // Seed the database, start a test server, authenticate and save state
}

export default globalSetup;`}),(0,c.jsx)(t,{language:`typescript`,children:`// global-teardown.ts
import { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  // Clean up the database, stop the test server
}

export default globalTeardown;`}),(0,c.jsxs)(n,{variant:`blue`,children:[`The full documentation for fixtures is at`,` `,(0,c.jsx)(`a`,{href:`https://playwright.dev/docs/test-fixtures`,target:`_blank`,rel:`noopener noreferrer`,className:`text-link hover:text-link/80 transition-colors duration-150`,children:`playwright.dev/docs/test-fixtures`}),` `,`and for API mocking at`,` `,(0,c.jsx)(`a`,{href:`https://playwright.dev/docs/mock`,target:`_blank`,rel:`noopener noreferrer`,className:`text-link hover:text-link/80 transition-colors duration-150`,children:`playwright.dev/docs/mock`}),`.`]}),(0,c.jsx)(a,{id:`guide-complete`,children:`Guide complete`}),(0,c.jsx)(i,{children:`You have reached the end of the Playwright guide. You now have the knowledge to build and maintain a professional Playwright test suite: from first installation through to advanced patterns used in production testing teams.`}),(0,c.jsxs)(i,{children:[`The official Playwright documentation at`,` `,(0,c.jsx)(`a`,{href:`https://playwright.dev`,target:`_blank`,rel:`noopener noreferrer`,className:`text-link hover:text-link/80 transition-colors duration-150`,children:`playwright.dev`}),` `,`is an excellent ongoing reference. The API evolves with each release, and the changelog is worth following to stay current with new capabilities as they ship.`]})]})}export{l as default};
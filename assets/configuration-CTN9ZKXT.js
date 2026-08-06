import{a as e}from"./markdown-hfXSdh9Q.js";import{t}from"./KBCode-C2513JFu.js";import{t as n}from"./KBNote-CaRhdL4n.js";import{n as r,r as i,t as a}from"./KBHeading-DROUfOXR.js";import{t as o}from"./KBBanner-Nh3F7juW.js";import{t as s}from"./KBVideo-CvFC_4kB.js";var c=e();function l(){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsxs)(o,{variant:`info`,children:[`This article covers `,(0,c.jsx)(`code`,{children:`playwright.config.ts`}),` in detail. You do not need to understand every option before writing tests, but this reference becomes essential as your suite grows.`]}),(0,c.jsx)(s,{videoId:`DcVYaZ8QDsw`,title:`Get started with end-to-end testing: Playwright | Episode 3 - Running Tests`,caption:`Running and configuring tests with Playwright`}),(0,c.jsxs)(i,{children:[`The `,(0,c.jsx)(`code`,{children:`playwright.config.ts`}),` file is the central point of control for your entire test suite. It determines which browsers your tests run on, how long they have to complete, how many run in parallel, what happens when they fail and how results are presented. Understanding it thoroughly makes the difference between a fragile, hard-to-run suite and a fast, predictable one.`]}),(0,c.jsx)(a,{id:`the-config-file-structure`,children:`The config file structure`}),(0,c.jsx)(i,{children:`A fully annotated configuration file looks like this. The sections below explain each field in detail:`}),(0,c.jsx)(t,{language:`typescript`,children:`import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
  ],
});`}),(0,c.jsx)(a,{id:`testdir`,children:`testDir`}),(0,c.jsxs)(i,{children:[`Specifies the directory where Playwright looks for test files. The default is`,(0,c.jsx)(`code`,{children:`./tests`}),`. Playwright searches recursively for files matching the`,(0,c.jsx)(`code`,{children:`testMatch`}),` pattern, which defaults to `,(0,c.jsx)(`code`,{children:`**/*.spec.ts`}),`:`]}),(0,c.jsx)(t,{language:`typescript`,children:`testDir: './tests',`}),(0,c.jsx)(a,{id:`timeouts`,children:`Timeouts`}),(0,c.jsx)(i,{children:`Playwright has three distinct timeouts that are easy to confuse:`}),(0,c.jsxs)(`ul`,{className:`my-4 space-y-4 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed`,children:[(0,c.jsxs)(`li`,{children:[(0,c.jsxs)(`strong`,{className:`text-text-primary`,children:[`Test timeout (`,(0,c.jsx)(`code`,{children:`timeout`}),`).`]}),` `,`The maximum time a single test is allowed to run from start to finish. If a test exceeds this limit, it fails with a timeout error. Default is 30 seconds.`]}),(0,c.jsxs)(`li`,{children:[(0,c.jsxs)(`strong`,{className:`text-text-primary`,children:[`Action timeout (`,(0,c.jsx)(`code`,{children:`use.actionTimeout`}),`).`]}),` `,`The maximum time each individual Playwright action (click, fill, navigate) is allowed to take. If not set, actions share the remaining test timeout. Setting this explicitly prevents a single slow action from consuming the entire test budget.`]}),(0,c.jsxs)(`li`,{children:[(0,c.jsxs)(`strong`,{className:`text-text-primary`,children:[`Assertion timeout (`,(0,c.jsx)(`code`,{children:`expect.timeout`}),`).`]}),` `,`The maximum time an auto-retrying assertion will wait for its condition to become true. Default is 5 seconds.`]})]}),(0,c.jsx)(t,{language:`typescript`,children:`timeout: 30_000,          // 30 second test timeout
expect: {
  timeout: 5_000,         // 5 second assertion timeout
},
use: {
  actionTimeout: 10_000,  // 10 second per-action timeout
},`}),(0,c.jsx)(n,{variant:`warning`,children:`Increasing timeouts should not be your first response to flaky tests. A test that only passes because it has a very generous timeout is hiding a real problem. Investigate why actions are taking longer than expected before raising the limit.`}),(0,c.jsx)(a,{id:`retries`,children:`retries`}),(0,c.jsx)(i,{children:`Configures how many times Playwright retries a failing test before marking it as failed. Retries are most useful in CI where environmental factors such as network latency or resource contention can cause tests to fail intermittently:`}),(0,c.jsx)(t,{language:`typescript`,children:`retries: process.env.CI ? 2 : 0,`}),(0,c.jsx)(i,{children:`The pattern above (two retries in CI, none locally) is a widely used convention. Retrying locally can mask genuine failures that you should investigate and fix immediately. In CI, two retries give confidence that a third consecutive failure is a real problem rather than an environmental one.`}),(0,c.jsx)(n,{variant:`warning`,children:`Retries should supplement good test design, not replace it. A test that only passes on its third attempt is a flaky test. Use traces and the debugging tools from the previous article to identify and fix the underlying cause.`}),(0,c.jsx)(a,{id:`workers`,children:`workers`}),(0,c.jsx)(i,{children:`Controls how many tests run in parallel. By default Playwright uses half the number of available CPU cores. You can override this:`}),(0,c.jsx)(t,{language:`typescript`,children:`workers: process.env.CI ? 1 : undefined,`}),(0,c.jsxs)(i,{children:[`Setting `,(0,c.jsx)(`code`,{children:`workers: 1`}),` in CI is common when tests share state through a database or external service that cannot handle concurrent writes safely. If your tests are properly isolated, you can increase the worker count in CI to reduce total run time.`]}),(0,c.jsx)(r,{id:`fully-parallel`,children:`fullyParallel`}),(0,c.jsxs)(i,{children:[`By default, Playwright runs tests within a single file sequentially but runs different files in parallel. Setting `,(0,c.jsx)(`code`,{children:`fullyParallel: true`}),` allows individual tests within a file to also run in parallel:`]}),(0,c.jsx)(t,{language:`typescript`,children:`fullyParallel: true,`}),(0,c.jsx)(a,{id:`use-block`,children:`The use block`}),(0,c.jsxs)(i,{children:[`The `,(0,c.jsx)(`code`,{children:`use`}),` block defines default options that apply to every test unless overridden at the project or test level.`]}),(0,c.jsx)(r,{id:`base-url`,children:`baseURL`}),(0,c.jsxs)(i,{children:[`Setting `,(0,c.jsx)(`code`,{children:`baseURL`}),` allows you to use relative paths in`,(0,c.jsx)(`code`,{children:`page.goto()`}),` throughout your tests. This makes it simple to run the same tests against different environments by changing a single value:`]}),(0,c.jsx)(t,{language:`typescript`,children:`use: {
  baseURL: 'http://localhost:3000',
},`}),(0,c.jsx)(t,{language:`typescript`,children:`// With baseURL set, this navigates to http://localhost:3000/dashboard
await page.goto('/dashboard');`}),(0,c.jsx)(r,{id:`headless`,children:`headless`}),(0,c.jsxs)(i,{children:[`Controls whether the browser runs with a visible window (`,(0,c.jsx)(`code`,{children:`false`}),`) or without one (`,(0,c.jsx)(`code`,{children:`true`}),`). Defaults to `,(0,c.jsx)(`code`,{children:`true`}),`. Headless mode is faster and required in most CI environments:`]}),(0,c.jsx)(t,{language:`typescript`,children:`use: {
  headless: false, // set to false to watch tests run locally
},`}),(0,c.jsx)(r,{id:`viewport`,children:`viewport`}),(0,c.jsx)(i,{children:`Sets the default browser viewport size. If not set, the default viewport is 1280×720 pixels:`}),(0,c.jsx)(t,{language:`typescript`,children:`use: {
  viewport: { width: 1280, height: 720 },
},`}),(0,c.jsx)(r,{id:`locale-and-timezone`,children:`locale and timezoneId`}),(0,c.jsx)(i,{children:`Simulates a specific locale and timezone. Useful for testing date formatting, number formatting and content that varies by region:`}),(0,c.jsx)(t,{language:`typescript`,children:`use: {
  locale: 'en-GB',
  timezoneId: 'Europe/London',
},`}),(0,c.jsx)(a,{id:`projects`,children:`projects`}),(0,c.jsxs)(i,{children:[`The `,(0,c.jsx)(`code`,{children:`projects`}),` array defines the browser configurations your tests run against. Each project can override any `,(0,c.jsx)(`code`,{children:`use`}),` option. This is how multi-browser testing works in Playwright:`]}),(0,c.jsx)(t,{language:`typescript`,children:`projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
],`}),(0,c.jsxs)(i,{children:[`The `,(0,c.jsx)(`code`,{children:`devices`}),` object from `,(0,c.jsx)(`code`,{children:`@playwright/test`}),` provides pre-configured viewport, user agent and other settings for a wide range of real devices. Spreading a device configuration into a project's `,(0,c.jsx)(`code`,{children:`use`}),` block sets all those properties automatically.`]}),(0,c.jsx)(r,{id:`running-a-specific-project`,children:`Running a specific project`}),(0,c.jsxs)(i,{children:[`Use the `,(0,c.jsx)(`code`,{children:`--project`}),` flag to run tests against a single browser:`]}),(0,c.jsx)(t,{language:`bash`,children:`npx playwright test --project=chromium`}),(0,c.jsx)(a,{id:`device-emulation`,children:`Device emulation`}),(0,c.jsx)(i,{children:`Playwright can emulate mobile devices, including their viewport, user agent, touch events and pixel density. Add a mobile project to test against a mobile browser experience:`}),(0,c.jsx)(t,{language:`typescript`,children:`projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'mobile-chrome',
    use: { ...devices['Pixel 7'] },
  },
  {
    name: 'mobile-safari',
    use: { ...devices['iPhone 15'] },
  },
],`}),(0,c.jsx)(i,{children:`Emulation sets the viewport and user agent to match the real device but runs on the host machine's browser engine. It is not a substitute for testing on a real physical device, particularly for touch interactions and iOS-specific behaviour, but it is a practical and fast way to catch the most common responsive design issues.`}),(0,c.jsx)(a,{id:`environment-variables`,children:`Environment variables`}),(0,c.jsx)(i,{children:`Hard-coding URLs, credentials or environment-specific values in your configuration file causes problems when the same suite needs to run against staging and production environments. Use environment variables instead:`}),(0,c.jsx)(t,{language:`typescript`,children:`use: {
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
},`}),(0,c.jsxs)(i,{children:[`For local development, store environment variables in a `,(0,c.jsx)(`code`,{children:`.env`}),` file and load them with the `,(0,c.jsx)(`code`,{children:`dotenv`}),` package:`]}),(0,c.jsx)(t,{language:`bash`,children:`npm install dotenv --save-dev`}),(0,c.jsx)(t,{language:`typescript`,children:`// playwright.config.ts
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },
});`}),(0,c.jsxs)(n,{variant:`warning`,children:[`Never commit a `,(0,c.jsx)(`code`,{children:`.env`}),` file containing real credentials to version control. Add it to your `,(0,c.jsx)(`code`,{children:`.gitignore`}),` immediately. In CI, inject environment variables through the CI platform's secrets mechanism rather than a file.`]}),(0,c.jsx)(a,{id:`forbid-only`,children:`forbidOnly`}),(0,c.jsxs)(i,{children:[(0,c.jsx)(`code`,{children:`test.only()`}),` is a useful tool for focusing on a single test locally, but it is easy to accidentally commit to version control, which would cause your CI pipeline to run only that one test. Setting `,(0,c.jsx)(`code`,{children:`forbidOnly: true`}),` makes Playwright fail immediately if it finds any `,(0,c.jsx)(`code`,{children:`.only`}),` calls in the test suite:`]}),(0,c.jsx)(t,{language:`typescript`,children:`forbidOnly: !!process.env.CI,`}),(0,c.jsxs)(i,{children:[`The standard pattern sets this to `,(0,c.jsx)(`code`,{children:`true`}),` only in CI, so you can still use `,(0,c.jsx)(`code`,{children:`test.only()`}),` locally without issue, but a forgotten`,(0,c.jsx)(`code`,{children:`.only`}),` will cause the CI job to fail with a clear error before any tests run.`]}),(0,c.jsxs)(n,{variant:`blue`,children:[`The full configuration reference is at`,` `,(0,c.jsx)(`a`,{href:`https://playwright.dev/docs/test-configuration`,target:`_blank`,rel:`noopener noreferrer`,className:`text-link hover:text-link/80 transition-colors duration-150`,children:`playwright.dev/docs/test-configuration`}),`.`]}),(0,c.jsx)(a,{id:`next-steps`,children:`Next steps`}),(0,c.jsx)(i,{children:`Your configuration is now well-understood and well-structured. The next article covers CI/CD integration: running your Playwright suite automatically on every push using GitHub Actions.`})]})}export{l as default};
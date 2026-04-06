import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBBanner from '../../../components/kb/KBBanner'
import KBCode from '../../../components/kb/KBCode'
import KBVideo from '../../../components/kb/KBVideo'

export default function PlaywrightConfiguration() {
  return (
    <>
      <KBBanner variant="info">
        This article covers <code>playwright.config.ts</code> in detail. You do not need to
        understand every option before writing tests, but this reference becomes essential as
        your suite grows.
      </KBBanner>

      <KBVideo
        videoId="DcVYaZ8QDsw"
        title="Get started with end-to-end testing: Playwright | Episode 3 - Running Tests"
        caption="Running and configuring tests with Playwright"
      />

      <KBP>
        The <code>playwright.config.ts</code> file is the central point of control for your
        entire test suite. It determines which browsers your tests run on, how long they have
        to complete, how many run in parallel, what happens when they fail and how results are
        presented. Understanding it thoroughly makes the difference between a fragile,
        hard-to-run suite and a fast, predictable one.
      </KBP>

      <KBH2 id="the-config-file-structure">The config file structure</KBH2>

      <KBP>
        A fully annotated configuration file looks like this. The sections below explain
        each field in detail:
      </KBP>

      <KBCode language="typescript">{`import { defineConfig, devices } from '@playwright/test';

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
});`}</KBCode>

      <KBH2 id="testdir">testDir</KBH2>

      <KBP>
        Specifies the directory where Playwright looks for test files. The default is
        <code>./tests</code>. Playwright searches recursively for files matching the
        <code>testMatch</code> pattern, which defaults to <code>**/*.spec.ts</code>:
      </KBP>

      <KBCode language="typescript">{`testDir: './tests',`}</KBCode>

      <KBH2 id="timeouts">Timeouts</KBH2>

      <KBP>
        Playwright has three distinct timeouts that are easy to confuse:
      </KBP>

      <ul className="my-4 space-y-4 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>
          <strong className="text-text-primary">Test timeout (<code>timeout</code>).</strong>
          {' '}The maximum time a single test is allowed to run from start to finish.
          If a test exceeds this limit, it fails with a timeout error. Default is 30 seconds.
        </li>
        <li>
          <strong className="text-text-primary">Action timeout (<code>use.actionTimeout</code>).</strong>
          {' '}The maximum time each individual Playwright action (click, fill, navigate)
          is allowed to take. If not set, actions share the remaining test timeout. Setting
          this explicitly prevents a single slow action from consuming the entire test budget.
        </li>
        <li>
          <strong className="text-text-primary">Assertion timeout (<code>expect.timeout</code>).</strong>
          {' '}The maximum time an auto-retrying assertion will wait for its condition to
          become true. Default is 5 seconds.
        </li>
      </ul>

      <KBCode language="typescript">{`timeout: 30_000,          // 30 second test timeout
expect: {
  timeout: 5_000,         // 5 second assertion timeout
},
use: {
  actionTimeout: 10_000,  // 10 second per-action timeout
},`}</KBCode>

      <KBNote variant="warning">
        Increasing timeouts should not be your first response to flaky tests. A test that
        only passes because it has a very generous timeout is hiding a real problem. Investigate
        why actions are taking longer than expected before raising the limit.
      </KBNote>

      <KBH2 id="retries">retries</KBH2>

      <KBP>
        Configures how many times Playwright retries a failing test before marking it as
        failed. Retries are most useful in CI where environmental factors such as network
        latency or resource contention can cause tests to fail intermittently:
      </KBP>

      <KBCode language="typescript">{`retries: process.env.CI ? 2 : 0,`}</KBCode>

      <KBP>
        The pattern above (two retries in CI, none locally) is a widely used convention.
        Retrying locally can mask genuine failures that you should investigate and fix
        immediately. In CI, two retries give confidence that a third consecutive failure
        is a real problem rather than an environmental one.
      </KBP>

      <KBNote variant="warning">
        Retries should supplement good test design, not replace it. A test that only passes
        on its third attempt is a flaky test. Use traces and the debugging tools from the
        previous article to identify and fix the underlying cause.
      </KBNote>

      <KBH2 id="workers">workers</KBH2>

      <KBP>
        Controls how many tests run in parallel. By default Playwright uses half the number
        of available CPU cores. You can override this:
      </KBP>

      <KBCode language="typescript">{`workers: process.env.CI ? 1 : undefined,`}</KBCode>

      <KBP>
        Setting <code>workers: 1</code> in CI is common when tests share state through a
        database or external service that cannot handle concurrent writes safely. If your
        tests are properly isolated, you can increase the worker count in CI to reduce total
        run time.
      </KBP>

      <KBH3 id="fully-parallel">fullyParallel</KBH3>

      <KBP>
        By default, Playwright runs tests within a single file sequentially but runs
        different files in parallel. Setting <code>fullyParallel: true</code> allows
        individual tests within a file to also run in parallel:
      </KBP>

      <KBCode language="typescript">{`fullyParallel: true,`}</KBCode>

      <KBH2 id="use-block">The use block</KBH2>

      <KBP>
        The <code>use</code> block defines default options that apply to every test unless
        overridden at the project or test level.
      </KBP>

      <KBH3 id="base-url">baseURL</KBH3>

      <KBP>
        Setting <code>baseURL</code> allows you to use relative paths in
        <code>page.goto()</code> throughout your tests. This makes it simple to run the same
        tests against different environments by changing a single value:
      </KBP>

      <KBCode language="typescript">{`use: {
  baseURL: 'http://localhost:3000',
},`}</KBCode>

      <KBCode language="typescript">{`// With baseURL set, this navigates to http://localhost:3000/dashboard
await page.goto('/dashboard');`}</KBCode>

      <KBH3 id="headless">headless</KBH3>

      <KBP>
        Controls whether the browser runs with a visible window (<code>false</code>) or
        without one (<code>true</code>). Defaults to <code>true</code>. Headless mode is
        faster and required in most CI environments:
      </KBP>

      <KBCode language="typescript">{`use: {
  headless: false, // set to false to watch tests run locally
},`}</KBCode>

      <KBH3 id="viewport">viewport</KBH3>

      <KBP>
        Sets the default browser viewport size. If not set, the default viewport is
        1280×720 pixels:
      </KBP>

      <KBCode language="typescript">{`use: {
  viewport: { width: 1280, height: 720 },
},`}</KBCode>

      <KBH3 id="locale-and-timezone">locale and timezoneId</KBH3>

      <KBP>
        Simulates a specific locale and timezone. Useful for testing date formatting,
        number formatting and content that varies by region:
      </KBP>

      <KBCode language="typescript">{`use: {
  locale: 'en-GB',
  timezoneId: 'Europe/London',
},`}</KBCode>

      <KBH2 id="projects">projects</KBH2>

      <KBP>
        The <code>projects</code> array defines the browser configurations your tests run
        against. Each project can override any <code>use</code> option. This is how
        multi-browser testing works in Playwright:
      </KBP>

      <KBCode language="typescript">{`projects: [
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
],`}</KBCode>

      <KBP>
        The <code>devices</code> object from <code>@playwright/test</code> provides
        pre-configured viewport, user agent and other settings for a wide range of real
        devices. Spreading a device configuration into a project's <code>use</code> block
        sets all those properties automatically.
      </KBP>

      <KBH3 id="running-a-specific-project">Running a specific project</KBH3>

      <KBP>
        Use the <code>--project</code> flag to run tests against a single browser:
      </KBP>

      <KBCode language="bash">{`npx playwright test --project=chromium`}</KBCode>

      <KBH2 id="device-emulation">Device emulation</KBH2>

      <KBP>
        Playwright can emulate mobile devices, including their viewport, user agent, touch
        events and pixel density. Add a mobile project to test against a mobile browser
        experience:
      </KBP>

      <KBCode language="typescript">{`projects: [
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
],`}</KBCode>

      <KBP>
        Emulation sets the viewport and user agent to match the real device but runs on
        the host machine's browser engine. It is not a substitute for testing on a real
        physical device, particularly for touch interactions and iOS-specific behaviour,
        but it is a practical and fast way to catch the most common responsive design issues.
      </KBP>

      <KBH2 id="environment-variables">Environment variables</KBH2>

      <KBP>
        Hard-coding URLs, credentials or environment-specific values in your configuration
        file causes problems when the same suite needs to run against staging and production
        environments. Use environment variables instead:
      </KBP>

      <KBCode language="typescript">{`use: {
  baseURL: process.env.BASE_URL || 'http://localhost:3000',
},`}</KBCode>

      <KBP>
        For local development, store environment variables in a <code>.env</code> file and
        load them with the <code>dotenv</code> package:
      </KBP>

      <KBCode language="bash">{`npm install dotenv --save-dev`}</KBCode>

      <KBCode language="typescript">{`// playwright.config.ts
import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
  },
});`}</KBCode>

      <KBNote variant="warning">
        Never commit a <code>.env</code> file containing real credentials to version control.
        Add it to your <code>.gitignore</code> immediately. In CI, inject environment
        variables through the CI platform's secrets mechanism rather than a file.
      </KBNote>

      <KBH2 id="forbid-only">forbidOnly</KBH2>

      <KBP>
        <code>test.only()</code> is a useful tool for focusing on a single test locally, but
        it is easy to accidentally commit to version control, which would cause your CI
        pipeline to run only that one test. Setting <code>forbidOnly: true</code> makes
        Playwright fail immediately if it finds any <code>.only</code> calls in the test
        suite:
      </KBP>

      <KBCode language="typescript">{`forbidOnly: !!process.env.CI,`}</KBCode>

      <KBP>
        The standard pattern sets this to <code>true</code> only in CI, so you can still
        use <code>test.only()</code> locally without issue, but a forgotten
        <code>.only</code> will cause the CI job to fail with a clear error before any tests
        run.
      </KBP>

      <KBNote variant="blue">
        The full configuration reference is at{' '}
        <a
          href="https://playwright.dev/docs/test-configuration"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link/80 transition-colors duration-150"
        >
          playwright.dev/docs/test-configuration
        </a>.
      </KBNote>

      <KBH2 id="next-steps">Next steps</KBH2>

      <KBP>
        Your configuration is now well-understood and well-structured. The next article
        covers CI/CD integration: running your Playwright suite automatically on every push
        using GitHub Actions.
      </KBP>
    </>
  )
}

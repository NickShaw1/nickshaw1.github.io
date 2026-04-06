import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBBanner from '../../../components/kb/KBBanner'
import KBCode from '../../../components/kb/KBCode'
import KBVideo from '../../../components/kb/KBVideo'

export default function PlaywrightDebuggingReportingAndResults() {
  return (
    <>
      <KBBanner variant="info">
        This article assumes you have a working test suite. The debugging tools described here
        are most useful once you have tests that are failing or behaving unexpectedly.
      </KBBanner>

      <KBP>
        Understanding why a test fails is as important as writing the test in the first place.
        Playwright provides a comprehensive set of tools for investigating failures: an
        interactive debugger, a full trace viewer, UI Mode for watching and replaying test
        runs, and a range of reporters for presenting results. This article covers all of them.
      </KBP>

      <KBH2 id="headed-mode-and-slow-motion">Headed mode and slow motion</KBH2>

      <KBP>
        The simplest way to investigate a failure is to watch the test run in a real browser.
        Add the <code>--headed</code> flag to see the browser window as the test executes:
      </KBP>

      <KBCode language="bash">{`npx playwright test --headed`}</KBCode>

      <KBP>
        By default tests run at full speed, which can make it difficult to see what is
        happening. Add <code>slowMo</code> to your project configuration to slow down every
        action by a specified number of milliseconds:
      </KBP>

      <KBCode language="typescript">{`// playwright.config.ts
export default defineConfig({
  use: {
    launchOptions: {
      slowMo: 500, // 500ms delay between each action
    },
  },
});`}</KBCode>

      <KBNote variant="warning">
        Do not commit <code>slowMo</code> to your configuration permanently. It dramatically
        increases test run time and is only useful during local investigation.
      </KBNote>

      <KBH2 id="the-debug-flag">The --debug flag and Playwright Inspector</KBH2>

      <KBP>
        The <code>--debug</code> flag opens the Playwright Inspector alongside the browser.
        The Inspector lets you step through test actions one at a time, inspect the current
        state of the page and try locators interactively:
      </KBP>

      <KBCode language="bash">{`npx playwright test --debug`}</KBCode>

      <KBP>
        To open the Inspector at a specific point in your test rather than at the beginning,
        add <code>await page.pause()</code> to your test code at the line where you want
        execution to pause:
      </KBP>

      <KBCode language="typescript">{`test('investigate a specific step', async ({ page }) => {
  await page.goto('/checkout');
  await page.getByRole('button', { name: 'Add to basket' }).click();

  await page.pause(); // Inspector opens here

  await page.getByRole('link', { name: 'View basket' }).click();
});`}</KBCode>

      <KBP>
        Once the Inspector is open, use the toolbar to step forward through actions, resume
        execution or record new actions. The locator bar at the bottom lets you type a
        locator and immediately see which elements on the page it matches, highlighted in
        the browser. This is one of the fastest ways to find the right locator for a
        stubborn element.
      </KBP>

      <KBNote variant="warning">
        Remove all <code>page.pause()</code> calls before committing your code. A test with
        a pause will hang in CI because there is no inspector to interact with.
      </KBNote>

      <KBH2 id="vs-code-debugging">Debugging in VS Code</KBH2>

      <KBP>
        The Playwright VS Code extension integrates with VS Code's built-in debugger. You
        can set breakpoints in your test files by clicking in the gutter to the left of a
        line number. Then, rather than running the test normally, right-click the test in
        the Testing panel and select <strong>Debug Test</strong>.
      </KBP>

      <KBP>
        The test will pause at each breakpoint and you can inspect variables in the Variables
        panel, step through code using the debug toolbar and hover over expressions in the
        editor to see their current values. The browser opens in headed mode automatically
        during debug runs.
      </KBP>

      <KBH2 id="ui-mode">UI Mode</KBH2>

      <KBVideo
        videoId="d0u6XhXknzU"
        title="Playwright's UI Mode: Watch mode and time travel debugging"
        caption="A walkthrough of UI Mode from the official Playwright team"
      />

      <KBP>
        UI Mode is the most feature-rich debugging environment Playwright offers. Open it
        with:
      </KBP>

      <KBCode language="bash">{`npx playwright test --ui`}</KBCode>

      <KBP>
        A browser window opens showing a panel on the left listing all your tests, grouped
        by file and describe block. Click any test to run it and watch it execute in the
        built-in browser on the right.
      </KBP>

      <KBP>
        The key features of UI Mode are:
      </KBP>

      <ul className="my-4 space-y-4 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>
          <strong className="text-text-primary">Watch mode.</strong> Toggle the watch icon
          next to a test file and UI Mode will re-run that test automatically whenever you
          save the file. This gives you a tight feedback loop while writing or fixing tests.
        </li>
        <li>
          <strong className="text-text-primary">Timeline.</strong> After a test run, a
          timeline shows every action that was performed, with timestamps. Click any action
          to travel back to that exact point in time and see the state of the page as it
          was at that moment.
        </li>
        <li>
          <strong className="text-text-primary">Actions panel.</strong> Lists every
          Playwright call made during the test, the locator used and how long it took.
          Hovering over an action highlights the corresponding element in the browser
          snapshot.
        </li>
        <li>
          <strong className="text-text-primary">Network panel.</strong> Shows all network
          requests made during the test, including their status codes, request bodies and
          response payloads.
        </li>
        <li>
          <strong className="text-text-primary">Console panel.</strong> Shows
          <code>console.log</code> output from the page as well as any JavaScript errors
          that occurred.
        </li>
        <li>
          <strong className="text-text-primary">Source panel.</strong> Shows the test source
          code with the currently selected action highlighted.
        </li>
        <li>
          <strong className="text-text-primary">Pick locator.</strong> Click the crosshair
          icon to enter locator pick mode. Click any element in the live browser and UI Mode
          will suggest the best locator for it.
        </li>
      </ul>

      <KBH2 id="trace-viewer">Trace Viewer</KBH2>

      <KBVideo
        videoId="yP6AnTxC34s"
        title="Exploring Playwright's Trace Viewer for debugging locally and on CI"
        caption="Using Trace Viewer to diagnose test failures"
      />

      <KBP>
        A trace is a complete recording of a test run: every action, every DOM snapshot at
        each step, every network request and every console message. Traces are particularly
        valuable for diagnosing failures that occur in CI, where you cannot watch the test
        run interactively.
      </KBP>

      <KBH3 id="enabling-traces">Enabling traces</KBH3>

      <KBP>
        Configure trace recording in <code>playwright.config.ts</code>. The
        <code>trace</code> option accepts several values:
      </KBP>

      <ul className="my-4 space-y-2 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li><code>'off'</code>: no traces recorded (default)</li>
        <li><code>'on'</code>: always record traces</li>
        <li><code>'retain-on-failure'</code>: record traces but only keep them for failing tests</li>
        <li><code>'on-first-retry'</code>: record a trace on the first retry of a failing test</li>
      </ul>

      <KBCode language="typescript">{`// playwright.config.ts
export default defineConfig({
  use: {
    trace: 'retain-on-failure',
  },
});`}</KBCode>

      <KBP>
        The <code>retain-on-failure</code> setting is the recommended starting point. It
        records traces for all tests but discards them for tests that pass, keeping storage
        usage low while ensuring you always have a trace for any failure.
      </KBP>

      <KBH3 id="opening-a-trace">Opening a trace</KBH3>

      <KBP>
        After a test run, traces are saved to the <code>test-results/</code> folder as
        <code>.zip</code> files. Open one with:
      </KBP>

      <KBCode language="bash">{`npx playwright show-trace test-results/my-test/trace.zip`}</KBCode>

      <KBP>
        Alternatively, open the HTML report with <code>npx playwright show-report</code> and
        click the trace icon next to any failing test.
      </KBP>

      <KBH3 id="reading-a-trace">Reading a trace</KBH3>

      <KBP>
        The Trace Viewer interface is similar to UI Mode. The left panel shows the list of
        actions. Clicking an action shows the DOM snapshot of the page at that exact moment
        in the central panel. The right panel shows details including the network request
        log, console output and any screenshots or videos captured.
      </KBP>

      <KBP>
        To understand a failure, click through the actions leading up to the error. The DOM
        snapshot tells you what was on the page when the action was attempted, which is
        often enough to explain why a locator failed to find its element.
      </KBP>

      <KBH2 id="screenshots-and-video">Screenshots and video on failure</KBH2>

      <KBP>
        In addition to traces, Playwright can capture screenshots and video recordings of
        test runs. Configure both in <code>playwright.config.ts</code>:
      </KBP>

      <KBCode language="typescript">{`export default defineConfig({
  use: {
    screenshot: 'only-on-failure', // 'off' | 'on' | 'only-on-failure'
    video: 'retain-on-failure',    // 'off' | 'on' | 'retain-on-failure' | 'on-first-retry'
  },
});`}</KBCode>

      <KBP>
        Screenshots and video files are saved alongside traces in <code>test-results/</code>
        and are accessible from the HTML report. Video recordings are useful when a trace
        alone does not fully convey what the user experience was during the failure.
      </KBP>

      <KBH2 id="reporters">Reporters</KBH2>

      <KBP>
        A reporter determines how Playwright presents test results. Reporters are configured
        in <code>playwright.config.ts</code> and multiple reporters can be active at once:
      </KBP>

      <KBCode language="typescript">{`export default defineConfig({
  reporter: [
    ['html'],          // Generates the HTML report in playwright-report/
    ['list'],          // Prints results to the terminal as they complete
  ],
});`}</KBCode>

      <KBH3 id="html-reporter">HTML reporter</KBH3>

      <KBP>
        The HTML reporter generates a rich, interactive report at
        <code>playwright-report/index.html</code>. It is the most useful reporter for
        reviewing results after a run because it includes:
      </KBP>

      <ul className="my-4 space-y-2 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>A summary of all tests grouped by file and status</li>
        <li>Duration for each test and each action</li>
        <li>Screenshots, videos and trace links for failing tests</li>
        <li>Filtering by status, browser and test file</li>
      </ul>

      <KBP>
        Open it after a run with:
      </KBP>

      <KBCode language="bash">{`npx playwright show-report`}</KBCode>

      <KBH3 id="list-reporter">List reporter</KBH3>

      <KBP>
        The list reporter prints each test result to the terminal as it completes, showing
        the test name, browser and duration. It is the default reporter when no other is
        configured and is well suited to local development where you want immediate feedback.
      </KBP>

      <KBH3 id="dot-reporter">Dot reporter</KBH3>

      <KBP>
        The dot reporter prints a single character per test: a dot for a pass and an F for
        a failure. It produces the most compact output, which is useful in CI pipelines where
        log space is limited:
      </KBP>

      <KBCode language="typescript">{`reporter: [['dot'], ['html']]`}</KBCode>

      <KBH3 id="json-reporter">JSON reporter</KBH3>

      <KBP>
        The JSON reporter writes results to a JSON file that can be consumed by external
        tools, dashboards or custom scripts:
      </KBP>

      <KBCode language="typescript">{`reporter: [['json', { outputFile: 'results.json' }]]`}</KBCode>

      <KBH3 id="junit-reporter">JUnit reporter</KBH3>

      <KBP>
        The JUnit reporter writes results in JUnit XML format. Many CI platforms, including
        Jenkins and Azure DevOps, can parse this format and display test results natively in
        their dashboards:
      </KBP>

      <KBCode language="typescript">{`reporter: [['junit', { outputFile: 'results.xml' }]]`}</KBCode>

      <KBH2 id="diagnosing-common-failures">Diagnosing common failure patterns</KBH2>

      <KBH3 id="element-not-found">Element not found / timeout</KBH3>

      <KBP>
        The most common failure. Playwright waited for the element to appear but it never
        did. Open the trace and look at the DOM snapshot at the moment of failure. Common
        causes are: the locator does not match any element, the page navigated away
        unexpectedly, the element is inside an iframe that was not accounted for or the
        application state that makes the element appear was not set up correctly.
      </KBP>

      <KBH3 id="wrong-element">Correct locator, wrong element</KBH3>

      <KBP>
        The locator matches multiple elements and Playwright acts on the wrong one. Use
        <code>filter()</code> or a more specific locator to narrow it down. The
        <code>toHaveCount(1)</code> assertion is useful for verifying that a locator matches
        exactly the number of elements you expect before interacting.
      </KBP>

      <KBH3 id="test-pollution">Test pollution from shared state</KBH3>

      <KBP>
        Tests pass individually but fail when run together. This usually means tests are
        sharing state through the database, external API or some other resource outside the
        browser. Each test should set up and clean up its own state, or tests should be
        designed to be independent of the data created by other tests.
      </KBP>

      <KBNote variant="blue">
        The official debugging documentation is at{' '}
        <a
          href="https://playwright.dev/docs/debug"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link/80 transition-colors duration-150"
        >
          playwright.dev/docs/debug
        </a>
        {' '}and the Trace Viewer guide is at{' '}
        <a
          href="https://playwright.dev/docs/trace-viewer"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link/80 transition-colors duration-150"
        >
          playwright.dev/docs/trace-viewer
        </a>.
      </KBNote>

      <KBH2 id="next-steps">Next steps</KBH2>

      <KBP>
        You now have the tools to investigate any test failure thoroughly. The next article
        covers the Playwright configuration file in full: how to control which browsers your
        tests run on, timeouts, retries, reporters and the many options in the
        <code>use</code> block.
      </KBP>
    </>
  )
}

import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBCode from '../../../components/kb/KBCode'
import KBVideo from '../../../components/kb/KBVideo'

export default function DebuggingTestsWithAi() {
  return (
    <>
      <KBVideo
        videoId="Ec_3h5Q8RHY"
        title="Debug Playwright Tests with AI - Fix Failures Instantly"
        caption="Using AI to diagnose and fix Playwright test failures"
      />

      <KBP>
        Debugging a failing Playwright test can take time. Reading error messages,
        re-running in headed mode, opening Trace Viewer and reasoning about what the
        application was doing at the point of failure are all steps that benefit from a
        second perspective. AI is well suited to this: it can read error output, inspect
        trace data and suggest specific fixes faster than manual investigation in many
        cases. This article covers how to use AI effectively for debugging and where its
        suggestions require scepticism.
      </KBP>

      <KBH2 id="feeding-failure-output">Feeding failure output to an AI</KBH2>

      <KBP>
        The starting point for AI-assisted debugging is the test failure output. When a
        Playwright test fails, the runner prints an error message that includes the test
        name, the assertion that failed, the expected value, the received value and a
        stack trace. This output contains most of what the AI needs to diagnose common
        failures.
      </KBP>

      <KBP>
        Copy the full failure output and paste it to your AI assistant:
      </KBP>

      <KBCode>{`This Playwright test is failing. Here is the full error output. Please explain
what caused the failure and suggest a specific fix.

[paste error output]

Here is the relevant test code:

[paste test function]`}</KBCode>

      <KBP>
        Always include both the error and the test code. The AI can sometimes diagnose the
        problem from the error alone, but having the code removes ambiguity and produces
        more precise suggestions.
      </KBP>

      <KBH3>Common failure types and what AI does with them</KBH3>

      <KBP>
        <strong className="text-text-primary">Timeout errors</strong> - When a locator
        times out, the error includes the selector that failed to match. AI will typically
        suggest checking whether the element exists on the page at that point in the test,
        whether the locator strategy is correct and whether there is a preceding action
        that should have made the element appear but did not.
      </KBP>

      <KBP>
        <strong className="text-text-primary">Strict mode violations</strong> - When a
        locator matches more than one element, the error says so explicitly. AI will suggest
        narrowing the locator - using a more specific role, adding a filter or scoping the
        locator to a parent element.
      </KBP>

      <KBP>
        <strong className="text-text-primary">Assertion failures</strong> - When an
        assertion fails on a specific value, AI will reason about why the expected and
        received values differ. It might identify a timing issue (the value was correct
        momentarily but then changed), a data issue (the test data was not what the test
        expected) or an assertion that is simply wrong (the expected value in the test does
        not match the actual application behaviour).
      </KBP>

      <KBH2 id="trace-files">Trace files</KBH2>

      <KBP>
        Playwright's Trace Viewer captures screenshots, DOM snapshots, network requests and
        console output at every step of a test. When a test fails in CI, the trace is the
        primary diagnostic tool. You can open a trace file locally with:
      </KBP>

      <KBCode language="bash">{`npx playwright show-trace path/to/trace.zip`}</KBCode>

      <KBP>
        The trace viewer is a visual tool that you navigate yourself. However, you can use
        the Playwright MCP server to have the AI navigate your application in parallel with
        your investigation, and you can share what you observe in the trace with the AI in
        text form.
      </KBP>

      <KBP>
        Describe what you see in the trace to the AI:
      </KBP>

      <KBCode>{`I have the trace open for a failing test. At the step where it clicks "Submit",
the DOM snapshot shows the button is disabled. The previous step was supposed to
fill in the form fields. Looking at the network tab, I can see the form was
making a validation request to /api/validate that returned a 422 error.

Here is the test code. Why might the button be disabled at that point?

[paste test code]`}</KBCode>

      <KBH2 id="flaky-tests">Fixing flaky tests with AI assistance</KBH2>

      <KBP>
        Flaky tests are tests that sometimes pass and sometimes fail without any change to
        the code or the application. They are among the most damaging things in a test
        suite because they erode trust in the entire suite. AI can help identify the cause
        of flakiness when the pattern is not obvious.
      </KBP>

      <KBH3>Share the intermittent failure pattern</KBH3>

      <KBCode>{`This test fails intermittently in CI but always passes locally. It fails roughly
1 in 5 runs. When it fails, the error is always a timeout waiting for the
getByText('Payment confirmed') element. The test is a checkout flow. Here is the
code. What are the most likely causes of this kind of intermittent failure and
what would you change?

[paste test code]`}</KBCode>

      <KBP>
        AI is good at suggesting the common causes of flakiness in browser tests:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>Race conditions between a user action and an asynchronous operation completing.</li>
        <li>Missing <code>await</code> before an action that is being treated as synchronous.</li>
        <li>Hardcoded timeouts (<code>waitForTimeout</code>) that are too short in CI where the machine is slower.</li>
        <li>Assertions that check state before an API response has arrived.</li>
        <li>Test ordering dependencies - the test assumes state set up by a previous test.</li>
        <li>Network conditions in CI being different from local.</li>
      </ul>

      <KBH3>Asking for specific fixes</KBH3>

      <KBCode language="typescript">{`// Flaky: clicks the button before the form is ready
await page.getByRole('button', { name: 'Submit' }).click()
await expect(page.getByText('Success')).toBeVisible()

// AI suggestion: wait for the button to be enabled first
await expect(page.getByRole('button', { name: 'Submit' })).toBeEnabled()
await page.getByRole('button', { name: 'Submit' }).click()
await expect(page.getByText('Success')).toBeVisible()`}</KBCode>

      <KBH2 id="explaining-code">Using AI to explain unfamiliar or inherited test code</KBH2>

      <KBP>
        When you join a new team or take over a codebase, test files can be opaque. Custom
        fixtures, unusual patterns and undocumented helper functions all create overhead.
        AI is good at explaining what code does and why it might be structured the way it
        is.
      </KBP>

      <KBCode>{`I have inherited this Playwright test file. Please explain:
1. What each test is verifying
2. What the custom fixture 'authedPage' is likely doing based on its name and usage
3. Why the test uses test.step() calls - is this a standard pattern?
4. Any potential issues you can identify from reading the code

[paste test file]`}</KBCode>

      <KBP>
        AI can also explain specific Playwright APIs you are unfamiliar with. Rather than
        reading the documentation, you can paste the code and ask what it does:
      </KBP>

      <KBCode>{`What does page.waitForResponse('**/api/checkout') do and when should I use
it rather than just asserting on the UI state after clicking?`}</KBCode>

      <KBH2 id="reliability-of-ai-debugging">When AI debugging help is reliable</KBH2>

      <KBP>
        AI debugging suggestions are most reliable when:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>The failure is a well-known Playwright pattern - timeout on a locator, strict mode violation, missing await.</li>
        <li>The error message is specific and the AI has both the error and the code to reason about.</li>
        <li>The issue is in the test code rather than the application. AI cannot debug application bugs it cannot see.</li>
      </ul>

      <KBP>
        AI debugging suggestions are less reliable when:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>The failure depends on application state that is not visible from the test code alone.</li>
        <li>The issue is environmental - specific to a browser version, a CI configuration or a network condition.</li>
        <li>The AI suggests a fix and you apply it without understanding why it works. If the AI cannot explain why the fix addresses the root cause, the fix may be masking the problem rather than solving it.</li>
      </ul>

      <KBNote variant="warning">
        Never apply an AI-suggested fix to a test without understanding it. A fix that makes
        a test pass by weakening an assertion, removing a check or adding a long timeout is
        not a fix - it is a suppression. If you cannot explain why the AI's suggestion works,
        investigate further before committing it.
      </KBNote>

      <KBH2 id="debugging-workflow">A practical debugging workflow</KBH2>

      <KBP>
        The following workflow combines Playwright's built-in debugging tools with AI
        assistance:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>Run the failing test in headed mode with <code>--debug</code> to use the Playwright Inspector. Step through the test to identify exactly which action or assertion fails.</li>
        <li>If the failure is not immediately obvious, enable traces and run again: <code>npx playwright test --trace on</code>.</li>
        <li>Open the trace. Note what the page state was at the point of failure - screenshot, DOM, network.</li>
        <li>Share the error output, the test code and your observations from the trace with the AI.</li>
        <li>Apply the suggested fix, run again and confirm the failure is resolved rather than suppressed.</li>
      </ul>
    </>
  )
}

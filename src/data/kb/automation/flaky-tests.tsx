import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function FlakyTests() {
  return (
    <>
      <KBP>
        A flaky test is one that produces inconsistent results without any change to the code
        under test: it passes sometimes and fails sometimes, for reasons that are not immediately
        obvious. Flakiness is one of the most damaging properties a test suite can have. A test
        that fails intermittently trains the team to ignore failures, which means that when a
        genuine defect causes the same test to fail, it may be dismissed as another false alarm.
        Addressing flakiness promptly is one of the more important habits a team can develop
        around its automation suite.
      </KBP>

      <KBH2 id="what-makes-a-test-flaky">What makes a test flaky</KBH2>

      <KBP>
        Flakiness arises when a test's result depends on something external to the code it is
        testing: timing, network conditions, the state left by other tests, environmental
        configuration or non-deterministic behaviour in the system itself. A test that passes
        reliably in isolation but fails intermittently in CI is often a sign that it is
        sensitive to execution order or to resource contention introduced by running tests in
        parallel.
      </KBP>

      <KBH2 id="common-causes">Common causes</KBH2>

      <KBH3>Timing and asynchrony</KBH3>

      <KBP>
        The most common cause of flakiness in end-to-end and integration tests is timing:
        a test that waits a fixed amount of time for an action to complete will fail on slow
        machines or under load, and pass reliably on fast machines. Fixed-time waits such as
        <code>sleep(500)</code> are a red flag. The correct approach is to wait for the
        specific condition the test needs, not for an arbitrary amount of time. Modern
        end-to-end frameworks provide utilities for waiting until an element is visible, a
        network request completes or an assertion becomes true.
      </KBP>

      <KBH3>Shared state and test order dependency</KBH3>

      <KBP>
        A test that relies on state created by a previous test will fail if that previous test
        is skipped, reordered or does not run. Similarly, a test that leaves state in a database
        or cache may cause subsequent tests to fail when they encounter data they did not create.
        Each test must be responsible for its own setup and cleanup.
      </KBP>

      <KBH3>External dependencies</KBH3>

      <KBP>
        Tests that depend on external services, real network calls or third-party APIs are
        inherently unreliable because those dependencies introduce failure modes outside the
        team's control. A rate-limited API, a staging environment with intermittent availability
        or a clock drift between services can all cause consistent test code to produce
        inconsistent results. External dependencies should be stubbed or controlled in automated
        tests wherever the goal is to test the application rather than the external service.
      </KBP>

      <KBH3>Race conditions</KBH3>

      <KBP>
        Race conditions occur when the outcome of a test depends on the relative timing of two
        concurrent operations. If a test triggers an asynchronous operation and then immediately
        checks its result, the check may run before the operation completes on a slow machine.
        The fix is to wait for the operation to complete before asserting, not to assume that
        it has.
      </KBP>

      <KBAside label="Quarantine, do not delete" variant="gold">
        When a flaky test is identified, the best immediate response is to quarantine it: move
        it to a separate suite that runs separately and does not block the main build. This
        removes the noise from the main suite while keeping the test in scope for investigation.
        Deleting a flaky test removes coverage without fixing the underlying problem.
      </KBAside>

      <KBH2 id="fixing-strategies">Fixing strategies</KBH2>

      <KBP>
        The first step in fixing a flaky test is diagnosing the cause. Run the test in
        isolation and in the full suite. Run it multiple times. Check whether it fails
        consistently in one environment but not another. Look at what the test is waiting for
        and whether those waits are condition-based or time-based. Review the test's setup and
        teardown to ensure it is not leaking state.
      </KBP>

      <KBP>
        Once the cause is identified, the fix depends on the cause. Replace fixed waits with
        condition-based waits. Add proper setup and teardown for shared resources. Stub external
        dependencies. Ensure concurrent operations are awaited before asserting. In some cases,
        the root cause is in the production code rather than the test code: a genuine race
        condition in the application will produce a flaky test that correctly reflects a real
        defect.
      </KBP>

      <KBH2 id="prevention">Prevention</KBH2>

      <KBP>
        The best approach to flakiness is to design tests that are structurally resistant to it
        from the start. Use condition-based waits rather than fixed delays. Ensure each test is
        fully independent. Stub non-deterministic dependencies. Run tests against clean state.
        Review new tests for patterns known to introduce flakiness before they are merged.
      </KBP>

      <KBNote variant="blue">
        Track flakiness over time. A test that has failed non-deterministically three times in
        the past week is a different kind of problem from one that has failed once in three
        months. Measuring the flakiness rate of individual tests, and prioritising fixes by
        rate and impact, turns an amorphous problem into a managed one.
      </KBNote>
    </>
  )
}

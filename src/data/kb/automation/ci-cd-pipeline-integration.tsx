import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function CiCdPipelineIntegration() {
  return (
    <>
      <KBP>
        Integrating automated tests into a CI/CD pipeline transforms testing from a periodic
        activity into a continuous one. Rather than running tests at the end of a development
        cycle, the pipeline runs them automatically on every code change, every pull request and
        every deployment. This shift changes the economics of quality: defects are caught
        minutes after they are introduced rather than days or weeks later, when the cost to fix
        them is considerably higher.
      </KBP>

      <KBH2 id="why-automation-belongs-in-ci">Why automation belongs in CI</KBH2>

      <KBP>
        The value of automated tests is directly proportional to how quickly their results
        are available. A test suite that runs once a week provides a weekly safety net. The
        same suite running on every pull request provides a per-commit safety net. The more
        frequently tests run, the smaller the gap between when a defect is introduced and when
        it is discovered, which simplifies both investigation and fix.
      </KBP>

      <KBP>
        Running tests in CI also eliminates the "works on my machine" problem. A CI environment
        is consistent, clean and independent of any individual developer's local setup. If a
        test passes locally but fails in CI, the difference in environments is a diagnostic
        signal rather than a mystery. Over time, a CI environment also provides a historical
        record of test results that makes trends, regressions and flakiness visible.
      </KBP>

      <KBH2 id="pipeline-stages">Pipeline stages and test placement</KBH2>

      <KBP>
        A well-structured pipeline runs tests in order of increasing cost. Cheap, fast tests
        run first; expensive, slow tests run later. This ordering ensures that the pipeline
        fails quickly when a common problem is present, without waiting for the full suite to
        complete. Typical stages include:
      </KBP>

      <KBH3>Unit and lint checks</KBH3>

      <KBP>
        These run on every commit, including commits to feature branches. They should complete
        in under a minute. Static analysis, linting and unit tests run at this stage because
        they are the cheapest way to catch the most common classes of defect. A developer
        should be able to get feedback from this stage before they have finished their next
        task.
      </KBP>

      <KBH3>Integration tests</KBH3>

      <KBP>
        Integration tests typically run on every pull request. They are slower than unit tests
        because they involve real infrastructure, but they should still complete within a few
        minutes. Parallelisation can help here: running integration tests across multiple workers
        reduces the total wall-clock time significantly for larger suites.
      </KBP>

      <KBH3>End-to-end tests</KBH3>

      <KBP>
        End-to-end tests run less frequently, typically on merges to the main branch or as
        part of deployment verification. Because they interact with a deployed application,
        they require a running environment and take longer to complete. Limiting end-to-end
        tests to the most critical journeys keeps this stage manageable.
      </KBP>

      <KBAside label="Blocking vs non-blocking stages" variant="gold">
        Not every test stage needs to block deployment. A long-running performance test suite
        may run as a non-blocking stage that reports results without preventing a deployment
        from proceeding. Define clearly which stages are gates (failures that must be fixed
        before a merge or deployment) and which are advisory. Most functional test stages
        should be gates.
      </KBAside>

      <KBH2 id="fail-fast">Fail-fast strategies</KBH2>

      <KBP>
        A pipeline that waits for every test to complete before reporting a failure is slow to
        provide feedback. Fail-fast strategies report failures immediately and, where possible,
        stop executing further tests once a failure is detected. At the unit test stage, most
        frameworks support exiting on first failure. At the integration and end-to-end stages,
        failing fast is a balance: stopping too early may miss additional failures that would
        be useful for diagnosis.
      </KBP>

      <KBP>
        Grouping tests by criticality and running critical tests first enables a fast signal
        on the most important checks without waiting for lower-priority checks to complete.
        A pipeline that runs smoke tests first and reports a failure within thirty seconds
        provides a much faster development loop than one that runs all tests sequentially.
      </KBP>

      <KBH2 id="reporting-and-feedback">Reporting and feedback</KBH2>

      <KBP>
        The output of a CI test run should make it straightforward to identify what failed,
        why it failed and which change caused it. Test reports should include failure messages,
        stack traces and, for end-to-end failures, screenshots or video recordings of the
        failing test. The information a developer needs to reproduce and fix the failure
        should be available from the CI report without requiring the test to be run locally.
      </KBP>

      <KBP>
        Integrating test results into pull request checks, so that failures are visible
        directly in the code review interface, reduces the friction of acting on test feedback.
        A developer who sees a failing check on their pull request can address it immediately
        rather than discovering it after the review has been approved.
      </KBP>

      <KBNote variant="blue">
        Test infrastructure (the CI runners, test environments and dependencies required to
        run the suite) is as important as the tests themselves. A pipeline that is consistently
        slow, frequently unavailable or expensive to run will be bypassed or worked around.
        Invest in keeping the pipeline fast, reliable and cheap to operate, not just in writing
        the tests that run within it.
      </KBNote>
    </>
  )
}

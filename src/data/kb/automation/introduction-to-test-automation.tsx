import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function IntroductionToTestAutomation() {
  return (
    <>
      <KBP>
        Test automation is the practice of using software to execute tests and verify outcomes
        that would otherwise require manual effort. When applied thoughtfully, it accelerates
        feedback, increases coverage and frees testers to focus on work that genuinely requires
        human judgement. When applied carelessly, it produces suites that are expensive to
        maintain, slow to run and trusted by nobody. Understanding what automation actually is,
        and what it is not, matters before a team writes a single automated test.
      </KBP>

      <KBH2 id="what-automation-is-and-is-not">What automation is and is not</KBH2>

      <KBP>
        Automation executes predefined checks against known expectations. A test is automated by
        defining the steps to take and the expected outcome in code, then running that code against
        the system whenever needed. The value is in repeatability: the same check runs in the same
        way every time, in seconds rather than minutes, without attention or memory lapses.
      </KBP>

      <KBP>
        What automation does not do is explore, investigate or discover the unexpected. A test
        can only find a failure if it was written to look for that failure. It cannot notice that
        a UI element looks slightly wrong, that a journey that is technically correct feels
        confusing to use, or that a new feature has an edge case the team had not considered.
        These are the things a skilled human tester finds. Automation and manual testing are
        complementary, not competitive. Teams that treat automation as a replacement for manual
        testing rather than a complement to it tend to end up with high automation coverage and
        significant quality gaps.
      </KBP>

      <KBAside label="Automation is part of QA, not all of it" variant="blue">
        Automation verifies known expectations. Quality assurance is the broader practice of
        building confidence that a product meets its requirements and serves its users. A team
        can have extensive automation and poor quality if the wrong things are automated, the
        tests are not maintained or the coverage does not reflect actual user risk.
      </KBAside>

      <KBH2 id="why-automate">Why automate</KBH2>

      <KBP>
        The most immediate value of automation is speed. A regression suite that would take a
        tester two days to execute manually can run in minutes when automated, and it can run
        on every pull request rather than once per release. This changes the economics of
        regression testing fundamentally: instead of a periodic, expensive activity, it becomes
        a continuous, low-cost safety net.
      </KBP>

      <KBP>
        The second value is consistency. Humans make mistakes during long, repetitive test
        execution cycles, particularly towards the end of a release when pressure is highest.
        Automated tests make the same checks in the same sequence every time. They do not skip
        steps, make assumptions or become fatigued. For regression coverage of stable
        functionality, this consistency is more reliable than manual re-execution.
      </KBP>

      <KBP>
        The third value is feedback latency. When automated tests run in a CI/CD pipeline, a
        developer introducing a regression finds out about it in minutes rather than days. The
        cost of fixing a defect discovered immediately is far lower than the cost of fixing one
        discovered after it has been built on top of. This shift-left effect is one of the most
        compelling reasons to invest in automation at the unit and integration levels in
        particular.
      </KBP>

      <KBH2 id="the-cost-of-automation">The cost of automation</KBH2>

      <KBP>
        Automation has upfront and ongoing costs that teams sometimes underestimate when making
        the case for it. Writing a test takes time. An end-to-end test covering a complex user
        journey can take considerably more time to write reliably than it would take to execute
        manually once. The upfront investment only becomes worthwhile if the test will be run
        enough times for the cumulative saving to exceed the cost of writing and maintaining it.
      </KBP>

      <KBP>
        Maintenance is the ongoing cost that most catches teams out. A test written against the
        current state of the system needs to be updated when the system changes. If the
        application UI changes, end-to-end tests need updating. If an API contract changes,
        integration tests need updating. If business logic changes, unit tests need updating.
        A suite that is not maintained becomes a liability: it takes time to run, produces noise
        and eventually stops being trusted. Teams that underinvest in maintenance often end up
        disabling tests rather than fixing them, at which point the suite provides no safety net
        at all.
      </KBP>

      <KBNote variant="green">
        The cost of automation is not just writing tests. It includes reviewing them, refactoring
        them as the codebase evolves, investigating failures, maintaining test infrastructure and
        managing test data. A realistic automation budget accounts for all of these, not just the
        initial build.
      </KBNote>

      <KBH2 id="starting-out">Starting out</KBH2>

      <KBP>
        Teams new to automation often make the mistake of trying to automate everything at once,
        or of starting with end-to-end tests because they are the most visible and feel the most
        valuable. A more durable approach is to start at the unit level, where tests are fast,
        reliable and cheap to maintain, and to build upward. The testing pyramid provides a
        useful shape: many unit tests, fewer integration tests and a small number of end-to-end
        tests covering the most critical journeys.
      </KBP>

      <KBH3>Choose a small, high-value target</KBH3>

      <KBP>
        Rather than attempting broad coverage from the start, identify the area of the system
        where automated tests would add the most value immediately. This is often the
        functionality that is changed most frequently, that has the highest business risk or
        that is currently causing the most manual regression effort. Starting there produces a
        working suite quickly and demonstrates value before expanding.
      </KBP>

      <KBH3>Establish conventions early</KBH3>

      <KBP>
        Conventions around test structure, naming, file organisation and the use of shared
        utilities are much easier to establish at the start of an automation effort than to
        retrofit later. A suite of a hundred tests written without conventions will be harder
        to navigate and maintain than a suite of a thousand written to a consistent standard.
        Agree these decisions with the team before writing tests in volume, and capture them
        somewhere the team can refer to.
      </KBP>
    </>
  )
}

import KBNote from '../../../components/kb/KBNote'
import KBAside from '../../../components/kb/KBAside'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function TestingMetrics() {
  return (
    <>
      <KBP>
        The previous article on testing culture made the case that metrics should be used for
        learning rather than evaluation, and that measures become gameable once they are treated
        as targets. This article takes that as given and goes deeper: which metrics are actually
        worth tracking, what each one tells you and what it does not. No single metric tells the
        full story. The value is in using them as a system, where each one illuminates a different
        dimension of quality.
      </KBP>

      <KBH2 id="quality-metrics">Quality metrics</KBH2>

      <KBH3>Defect escape rate</KBH3>
      <KBP>
        Defect escape rate measures the proportion of defects found by users in production
        relative to all defects found. A high escape rate means the team's testing is not catching
        problems before they reach the people who depend on the software. It is one of the most
        direct signals of testing effectiveness available, because it measures what actually
        reached users rather than what happened in a controlled environment. Tracking escape rate
        over time shows whether testing improvements are having real-world impact.
      </KBP>

      <KBH3>Defect density</KBH3>
      <KBP>
        Defect density measures the number of confirmed defects relative to a unit of scope,
        typically a feature, a module or a volume of code. It helps teams identify which parts
        of the system produce disproportionate numbers of defects. A module with consistently
        high defect density is a signal of structural problems: insufficient test coverage,
        high complexity, unclear requirements or all three. Defect density is most useful as a
        relative measure across the codebase rather than as an absolute target.
      </KBP>

      <KBH3>Defect age</KBH3>
      <KBP>
        Defect age tracks how long defects remain open from discovery to resolution. A rising
        average defect age indicates that the team is finding more problems than it is fixing,
        or that triage and prioritisation are not functioning effectively. Segmenting defect age
        by severity is particularly useful: critical defects with high age represent unresolved
        risk that is actively present in the system.
      </KBP>

      <KBH3>Mean time to detect and mean time to repair</KBH3>
      <KBP>
        Mean time to detect (MTTD) measures the average time between a defect being introduced
        into the codebase and it being discovered. A low MTTD indicates that testing is catching
        problems quickly, close to where they were introduced. A high MTTD suggests defects are
        surviving through multiple stages before surfacing, which typically means more context
        has been lost and the fix is harder. Mean time to repair (MTTR) measures how long it
        takes to fix a defect once it has been found. Both metrics are particularly informative
        in production monitoring contexts, where they are standard reliability engineering
        measures.
      </KBP>

      <KBH2 id="process-metrics">Process metrics</KBH2>

      <KBH3>Test execution time</KBH3>
      <KBP>
        Test execution time measures how long the automated test suite takes to run. It matters
        because a slow test suite degrades the feedback loop. A suite that takes forty minutes
        to run will not be run on every commit; developers will batch changes, defer the run or
        work around it. The result is that the suite provides less frequent feedback precisely
        when feedback is most valuable. Tracking execution time over time catches gradual
        degradation before it becomes a workflow problem.
      </KBP>

      <KBH3>Flakiness rate</KBH3>
      <KBP>
        A flaky test is one that produces inconsistent results without any change to the code
        it is testing: passing on one run and failing on the next for reasons unrelated to the
        software under test. Flakiness rate measures the proportion of test runs that include
        at least one flaky failure. High flakiness erodes trust in the test suite. When
        developers learn to assume that a failing test is probably flaky rather than genuinely
        failing, they stop treating failures as actionable. The suite becomes noise rather than
        signal.
      </KBP>

      <KBAside label="The cost of flakiness" variant="gold">
        Flaky tests are rarely harmless. Beyond the immediate cost of re-running a pipeline,
        they create a habit of ignoring failures that will eventually cause a real defect to
        be dismissed as flakiness. A small number of persistently flaky tests can undermine
        confidence in an entire suite. Teams that do not actively track and address flakiness
        tend to find it accumulates until the suite is effectively unreliable.
      </KBAside>

      <KBH3>Automation coverage</KBH3>
      <KBP>
        Automation coverage measures the proportion of test cases or test scenarios that are
        executed by automated tests rather than manually. It is a process efficiency metric
        rather than a quality metric: high automation coverage means the team can run more
        tests more frequently at lower marginal cost. It says nothing about whether those
        automated tests are well-designed or whether the right things are being tested. Used
        alongside quality metrics, it helps explain capacity: a team with low automation
        coverage that has high escape rates has a different problem from a team with high
        automation coverage and the same escape rates.
      </KBP>

      <KBH2 id="coverage-metrics">Coverage metrics</KBH2>

      <KBH3>Code coverage</KBH3>
      <KBP>
        Code coverage measures the percentage of lines, branches or paths in the codebase
        that are exercised by the test suite. Its limitations as a target are well established
        and covered in the testing culture article. As a diagnostic tool, it is legitimately
        useful: a module sitting at 12% branch coverage warrants investigation. The question
        it answers is narrow: was this code executed during testing? It cannot answer whether
        the execution tested the right conditions or whether the assertions were meaningful.
      </KBP>

      <KBH3>Requirements coverage</KBH3>
      <KBP>
        Requirements coverage measures the proportion of documented requirements or acceptance
        criteria that have corresponding tests. It is a different question from code coverage
        and often a more useful one. A codebase can have high code coverage and low requirements
        coverage if tests exercise implementation detail rather than specified behaviour. Teams
        with formal requirements, particularly in regulated industries, use requirements coverage
        as a traceability mechanism: every requirement maps to a test, and every test maps back
        to a requirement.
      </KBP>

      <KBH3>Risk coverage</KBH3>
      <KBP>
        Risk coverage measures the proportion of identified risks that have corresponding test
        coverage. It is the natural companion to risk-based testing: if testing effort is
        allocated according to risk, then risk coverage tracks whether that allocation has been
        executed. A high-risk area with low risk coverage is an explicit, documented gap rather
        than an unknown one. Making that gap visible is itself a quality activity, because it
        allows informed decisions about whether the risk is acceptable.
      </KBP>

      <KBH2 id="using-metrics-well">Using metrics well</KBH2>

      <KBP>
        Each metric in this article answers a specific question. None of them answers all the
        questions worth asking about quality. A team with a low escape rate might achieve it by
        delaying releases until everything is tested exhaustively, which would show up as high
        cycle time. A team with fast execution time might achieve it by running a thin suite that
        misses significant coverage. Metrics should be read in combination, with each one
        providing context for the others.
      </KBP>

      <KBNote variant="blue">
        Different metrics serve different audiences. Defect escape rate and MTTR are meaningful
        to stakeholders because they describe what users experience. Flakiness rate and test
        execution time are meaningful to engineering teams because they describe the health of
        the development process. Presenting the wrong metrics to the wrong audience produces
        either disengagement or decisions based on misunderstood data.
      </KBNote>

      <KBP>
        The most important discipline in using testing metrics is maintaining scepticism about
        improvement. When a metric trends consistently in the desired direction, the first
        question is whether quality has actually improved or whether the metric has been
        optimised. The answer usually requires looking at a second metric that is harder to
        game. Escape rate is difficult to improve artificially; if it is falling alongside
        rising code coverage, the coverage improvement is probably real. If escape rate is
        static while coverage rises, the coverage number is telling a story that the data does
        not support.
      </KBP>
    </>
  )
}

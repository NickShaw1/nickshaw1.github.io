import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function AbTestingAsEngineering() {
  return (
    <>
      <KBP>
        A/B testing exposes different variants of a feature to different segments of users
        simultaneously, measures how each variant affects a defined outcome and uses the results
        to make a data-informed decision. In product and marketing contexts, A/B testing is
        often treated as a tool for optimising conversion rates and copy. As an engineering
        discipline, it is something more rigorous: a controlled experiment run in production
        with statistical validity requirements, infrastructure implications and quality
        considerations that are easy to underestimate when the tooling makes running experiments
        look simple.
      </KBP>

      <KBH2 id="the-engineering-requirements">The engineering requirements</KBH2>

      <KBP>
        Running a valid A/B test requires more than pointing different users at different code
        paths. The assignment of users to variants must be consistent: a user assigned to
        variant B must see variant B on every visit for the duration of the experiment, not
        a random variant on each page load. The split must be random at the population level
        to avoid selection bias. The instrumentation that records which variant a user saw
        and what they subsequently did must be reliable: if event tracking drops ten percent
        of conversions, the results will be wrong in ways that are difficult to detect.
      </KBP>

      <KBP>
        The metric being optimised must be defined before the experiment starts. Choosing the
        metric after observing results, or switching to a different metric because the original
        one did not reach significance, invalidates the statistical conclusions. This practice
        (sometimes called HARKing: Hypothesising After Results are Known) is a common source
        of false positives in experimentation programmes. A well-run experiment
        has a primary metric, one or more guardrail metrics (metrics that should not degrade
        even if the primary metric improves) and a minimum detectable effect size that
        determines the sample size required to reach a valid conclusion.
      </KBP>

      <KBH2 id="testing-experiments">Testing experiments</KBH2>

      <KBH3>Both variants must be tested</KBH3>

      <KBP>
        An A/B experiment introduces two (or more) code paths that must both work correctly.
        Functional tests that only cover the control variant will miss regressions in the
        treatment variant. The test plan should explicitly cover both variants, and automated
        tests should verify that the experiment assignment mechanism is working correctly:
        that users assigned to variant A see variant A and that users assigned to variant B
        see variant B.
      </KBP>

      <KBH3>Instrumentation testing</KBH3>

      <KBP>
        The tracking events that record experiment exposure and conversion are part of the
        feature and must be tested. An experiment that assigns users to variants correctly
        but fails to record conversions accurately will produce results that do not reflect
        reality. Verifying that the correct events fire, with the correct properties, for
        each variant is quality work that belongs in the test plan alongside functional
        verification.
      </KBP>

      <KBAside label="Sample ratio mismatch is a sign of a broken experiment" variant="blue">
        A sample ratio mismatch (SRM) occurs when the actual proportion of users assigned to
        each variant differs significantly from the intended split. If an experiment is designed
        to split 50/50 but the control receives 60 percent of users, the assignment mechanism
        is broken and the results are invalid. SRM detection should be part of the experiment
        monitoring setup and should trigger an automatic pause if the ratio strays outside
        an acceptable range.
      </KBAside>

      <KBH2 id="statistical-validity">Statistical validity</KBH2>

      <KBP>
        A/B test results are only meaningful if the experiment ran long enough and with a
        large enough sample to reach statistical significance. Stopping an experiment early
        because the results look promising (sometimes called peeking) produces false positives
        at a much higher rate than the stated significance level suggests. Experiments should
        run for their pre-determined duration, and results should be evaluated at the end of
        that period rather than continuously during the run.
      </KBP>

      <KBP>
        Statistical significance confirms that the observed difference between variants is
        unlikely to be due to chance, but it does not confirm that the difference is
        practically meaningful. An experiment that reaches significance with a 0.1 percent
        improvement in conversion rate has produced a valid result that may not justify the
        cost of keeping the feature. Practical significance (the minimum effect size the
        business actually cares about) is as important as statistical significance.
      </KBP>

      <KBH2 id="quality-considerations">Quality considerations</KBH2>

      <KBP>
        Running multiple experiments simultaneously can produce interaction effects: a user
        assigned to experiment A's treatment and experiment B's treatment may behave differently
        from a user in either experiment alone. Most mature experimentation platforms address
        this through exclusion layers or mutual exclusivity constraints. Understanding how
        the platform handles concurrent experiments is important before concluding that
        experiments running at the same time are independent of one another.
      </KBP>

      <KBNote variant="green">
        Experiments should have an owner and a defined end date. An experiment that runs
        indefinitely, with its variants serving different users for months, accumulates
        technical debt in the form of multiple code paths, potential interaction effects with
        other experiments and an ever-larger proportion of users who have never experienced
        the original control. Clean up experiments promptly once a decision has been made.
      </KBNote>
    </>
  )
}

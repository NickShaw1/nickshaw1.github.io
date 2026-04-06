import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function WhatToAutomate() {
  return (
    <>
      <KBP>
        Deciding what to automate is as important as knowing how to automate it. Not everything
        that can be automated should be, and not everything that would be valuable to automate is
        practical to automate reliably. The automation decision is a cost-benefit judgement made
        at the level of individual tests or groups of tests, and getting it right shapes the
        long-term health of an automation suite more than any technical choice about tools or
        frameworks.
      </KBP>

      <KBH2 id="the-automation-decision">The automation decision</KBH2>

      <KBP>
        The core question for any potential automated test is whether the cumulative time saved
        by running it repeatedly will exceed the time spent writing, maintaining and investigating
        it. A test that takes four hours to write, runs reliably in two seconds and saves fifteen
        minutes of manual effort per release is worthwhile if the release cadence is high enough.
        The same test against an interface that changes every sprint may spend more time being
        updated than it saves.
      </KBP>

      <KBP>
        A secondary question is reliability. An automated test that passes and fails
        intermittently (a flaky test) is worse than no test at all. It erodes trust in the
        entire suite, consumes investigation time and produces noise that obscures real failures.
        Before committing to automating something, consider whether it can be done reliably. If
        it cannot, a manual check or a different approach to the automation may be preferable.
      </KBP>

      <KBH2 id="good-candidates">Good candidates for automation</KBH2>

      <KBH3>Repetitive regression checks</KBH3>

      <KBP>
        Functionality that is stable, well-understood and checked on every release is the
        strongest candidate for automation. If a tester is executing the same sequence of steps
        against the same screens every sprint, that effort is both expensive and dull. Automating
        it frees the tester for exploratory and investigative work while the routine checks run
        unattended.
      </KBP>

      <KBH3>Smoke and sanity checks</KBH3>

      <KBP>
        A small suite of smoke tests that verify the system's core functions are operational is
        one of the most immediately valuable automation investments. These tests run quickly,
        gate deployments and give the team confidence that a new build is worth testing further.
        They are typically stable because they target the fundamental, rarely-changing parts of
        the application.
      </KBP>

      <KBH3>Data-driven scenarios</KBH3>

      <KBP>
        Tests that verify the same logic across many combinations of input data are well-suited
        to automation. Verifying a calculation rule against fifty different input combinations is
        tedious and error-prone manually but trivial with a parameterised test. The automation
        handles the repetition while the tester defines the data and expected outcomes.
      </KBP>

      <KBH3>Performance and load scenarios</KBH3>

      <KBP>
        Generating meaningful load against a system is impractical manually. Performance tests
        simulate concurrent users, measure response times and identify degradation under load in
        ways that require automation by their nature. These tests run less frequently than
        functional checks but require automation to be meaningful at all.
      </KBP>

      <KBH2 id="poor-candidates">Poor candidates for automation</KBH2>

      <KBH3>Exploratory and investigative testing</KBH3>

      <KBP>
        Exploratory testing relies on the tester's ability to notice unexpected things, follow
        hunches and investigate anomalies. These activities cannot be scripted in advance because
        the path through the system is determined by what is found along the way. Attempts to
        automate exploratory testing tend to produce scripted tests that miss the point of
        exploration entirely.
      </KBP>

      <KBH3>One-time tests</KBH3>

      <KBP>
        A test that will only be run once, or a handful of times, rarely justifies the effort of
        automation. If a feature is being removed in the next release, writing automation for it
        during this one is wasted effort. Short-lived tests, or tests tied to temporary
        functionality, are better executed manually.
      </KBP>

      <KBH3>Highly volatile areas</KBH3>

      <KBP>
        If a part of the application is changing substantially every sprint (the UI is being
        redesigned, workflows are being restructured or the underlying implementation is
        experimental), automation written against it now will need rewriting imminently. In these
        cases, holding off on automation until the area stabilises is often more efficient than
        writing tests that are immediately out of date.
      </KBP>

      <KBAside label="The usability gap" variant="gold">
        Automated tests can verify that a user journey completes without error. They cannot verify
        that it is intuitive, efficient or satisfying to use. Usability testing, accessibility
        reviews and design feedback sessions are not replaceable by automation, regardless of how
        extensive a test suite becomes.
      </KBAside>

      <KBH2 id="the-shifting-boundary">The shifting boundary</KBH2>

      <KBP>
        The line between what is and is not worth automating shifts over time. A test that is
        not worth writing today because the feature is still changing may become a clear candidate
        for automation once the feature stabilises. Equally, an automated test that was worth
        maintaining last year may cease to be worth maintaining if the functionality it covers
        becomes less critical or less frequently changed.
      </KBP>

      <KBNote variant="blue">
        Review the automation suite periodically with the same critical eye you would apply to
        any other technical asset. Tests that have not been run in months, that cover deprecated
        functionality or that consistently require updates for reasons unrelated to defects are
        candidates for removal. A smaller, trusted suite is more valuable than a large one where
        nobody is sure what the tests are actually verifying.
      </KBNote>
    </>
  )
}

import KBNote from '../../../components/kb/KBNote'
import KBAside from '../../../components/kb/KBAside'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function BuildingATestingCulture() {
  return (
    <>
      <KBP>
        A testing culture is not a set of tools or a test coverage target. It is the set of
        shared assumptions a team holds about who is responsible for quality, when quality is
        considered and what happens when things go wrong. Those assumptions are mostly invisible
        until they are violated. Building a testing culture means making them explicit, then
        creating the conditions in which they can take hold.
      </KBP>

      <KBH2 id="what-a-testing-culture-is-not">What a testing culture is not</KBH2>

      <KBP>
        The most common failure mode is treating testing culture as a process problem rather than
        a people problem. Teams add test coverage requirements to their definition of done,
        mandate code review checklists and introduce automated quality gates, then wonder why
        defect rates do not improve. Process changes are necessary but not sufficient. A developer
        who views testing as a compliance activity will write tests that satisfy the metric without
        providing meaningful coverage. A QA engineer who is brought in only to sign off on
        completed work will never have the influence needed to prevent the defects they are
        expected to find.
      </KBP>

      <KBP>
        A testing culture is also not the same as a QA team. Organisations that consolidate all
        quality responsibility into a single function create a structural problem: the rest of the
        team is implicitly absolved. When something ships with defects, it is the QA team's fault
        for not catching them. That framing produces exactly the wrong incentives and is one of
        the reasons the previous article drew a careful distinction between what QA engineers,
        SDETs and developers each own.
      </KBP>

      <KBH2 id="psychological-safety">Psychological safety</KBH2>

      <KBP>
        Defects are information. A team that treats defect discovery as a failure to be ashamed of
        will suppress that information. Developers will be reluctant to raise concerns about the
        quality of their own code. QA engineers will feel pressure to approve releases they have
        doubts about. Bugs found in production will be fixed quietly rather than investigated for
        root cause. The result is a team that is systematically less informed about the quality of
        its own software.
      </KBP>

      <KBNote variant="blue">
        Blameless postmortems, a practice associated with site reliability engineering, apply
        equally well to quality culture. When a defect reaches production, the question worth
        asking is not who missed it but what conditions allowed it to exist and pass undetected.
        Systemic answers produce systemic improvements. Individual blame produces defensive
        behaviour and hidden information.
      </KBNote>

      <KBP>
        Psychological safety in a quality context means that raising a concern about a feature,
        pushing back on a release date or reporting a defect found in your own code is met with
        curiosity rather than blame. This is a leadership question as much as a team one. The
        signals that leaders send about how defects and delays are received determine whether
        teams are honest about quality or whether they manage appearances instead.
      </KBP>

      <KBH2 id="making-quality-visible">Making quality visible</KBH2>

      <KBP>
        Quality is often invisible until it fails. A codebase with declining test coverage, rising
        defect rates or increasing time-to-fix does not announce itself. The degradation happens
        gradually, absorbed into the background noise of delivery. Making quality visible means
        creating shared, honest representations of where the system stands.
      </KBP>

      <KBP>
        Defect trend data, reviewed regularly in retrospectives, gives teams a common picture of
        where problems are concentrated. Escape rates, which measure the proportion of defects
        found by users rather than the team, are a direct signal of how much is slipping through.
        Test execution time, tracked over time, indicates whether the automation suite is becoming
        a friction point. None of these metrics tells the whole story, but together they make
        quality legible to a team that would otherwise be navigating without instruments.
      </KBP>

      <KBP>
        Visibility also means sharing quality concerns across roles rather than containing them
        within the QA function. When defect trends are discussed in sprint reviews, when release
        readiness is a shared assessment rather than a sign-off from one person and when the
        consequences of technical debt are explained in terms the whole team understands, quality
        becomes a collective concern rather than a specialism.
      </KBP>

      <KBH2 id="metrics-that-harm-culture">Metrics that harm culture</KBH2>

      <KBP>
        Some metrics, used as targets, actively damage testing culture. Code coverage percentage
        is the most common example. A team chasing a coverage target will write tests that
        exercise code without asserting anything meaningful, producing a number that satisfies the
        metric while providing no actual quality signal. Coverage is useful as a diagnostic tool
        for identifying untested areas; it is harmful as a performance target.
      </KBP>

      <KBAside label="Goodhart's Law" variant="purple">
        When a measure becomes a target, it ceases to be a good measure. This principle applies
        consistently to quality metrics. Defect counts, test pass rates and coverage figures all
        become gameable once teams are held accountable to them as performance indicators. The
        solution is to use metrics for learning rather than evaluation, and to maintain scepticism
        about any number that is consistently trending in the desired direction.
      </KBAside>

      <KBP>
        Similarly, measuring developer productivity by features shipped per sprint creates
        implicit pressure to deprioritise the testing work that slows feature velocity in the
        short term. The defects that result appear later, in someone else's metric, usually
        incident count or time spent on unplanned work. Culture follows incentives. If the
        incentives reward speed over quality, speed will win until the cost becomes undeniable.
      </KBP>

      <KBH2 id="shifting-an-existing-culture">Shifting an existing culture</KBH2>

      <KBP>
        Building a testing culture from scratch is easier than changing an existing one, because
        existing cultures have inertia. Teams that have operated for years under the assumption
        that testing is a late-stage activity do not shift that assumption because a new process
        was introduced. The assumption has to be challenged repeatedly, in concrete situations,
        by people with enough standing to make the challenge credible.
      </KBP>

      <KBP>
        The most durable changes tend to start small. A team that introduces a blameless
        retrospective after a single significant production defect, and genuinely uses it to
        improve a process rather than assign responsibility, demonstrates what a different
        culture feels like. A QA engineer who attends sprint planning and contributes to story
        refinement, visibly adding value upstream, makes the case for shift-left more convincingly
        than any process document. Culture changes through demonstration, not declaration.
      </KBP>

      <KBP>
        Leadership sponsorship matters considerably. A testing culture that exists within a team
        but is not reflected in how the wider organisation sets priorities, measures success and
        responds to incidents will eventually be eroded by those pressures. Sustainable quality
        culture requires that the assumptions about quality being a shared, continuous concern are
        held not just by the people doing the testing but by the people making the decisions about
        what gets built and when it ships.
      </KBP>
    </>
  )
}

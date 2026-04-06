import KBBanner from '../../../components/kb/KBBanner'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function BugBashesAndStructuredSessions() {
  return (
    <>
      <KBP>
        A bug bash is a time-boxed, collaborative testing event in which a group of people,
        typically including testers, developers, product managers and designers, test a feature
        or product area together with the shared goal of finding as many problems as possible
        before a release. The format is widely associated with Microsoft's development culture and has become
        a recognised practice across the industry.
      </KBP>

      <KBP>
        The defining characteristic is breadth. Where a structured test plan pursues depth in
        specific areas, a bug bash covers as much surface area as possible in a short time by
        distributing attention across many participants. Ten people testing for two hours exposes
        a product to more varied usage patterns, mental models and assumptions than any single
        tester could provide in the same period. Different participants will take different paths
        through the same feature, and the overlaps and gaps in what they find are informative in
        themselves.
      </KBP>

      <KBH2 id="when-to-run-one">When to run one</KBH2>

      <KBP>
        Bug bashes are most effective at specific moments in a release cycle: before a significant
        public launch, at the end of a large feature build or when a major refactor has touched
        broad areas of the product. They are not a substitute for structured testing but a
        complement to it, used to surface issues that narrower and more systematic testing is
        likely to miss.
      </KBP>

      <KBP>
        Timing matters. Running a bug bash too early, before a feature is stable, wastes
        participants' time on known issues and erodes confidence in the format. Running one too
        late, after release decisions have already been made, reduces the impact of findings.
        The right moment is when the product is stable enough to test broadly but early enough
        that significant findings can still influence a release decision.
      </KBP>

      <KBH2 id="running-one-effectively">Running one effectively</KBH2>

      <KBP>
        Effective bug bashes require structure despite their open format. Before the session:
        define the scope clearly so participants know which areas are in bounds; provide test
        accounts, relevant background and access to any environments needed; and assign a
        facilitator whose role is to manage time and coordinate the logging of findings, not to
        direct what participants test.
      </KBP>

      <KBP>
        During the session, participants should log defects as they find them rather than
        accumulating them for later. Defect quality during a bug bash is often lower than in
        formal testing because participants are moving quickly and the focus is on volume.
        This is expected and is addressed in the debrief. The priority during the session is
        capturing findings, not perfecting reports.
      </KBP>

      <KBBanner>
        The debrief is the most important part of a bug bash. Without it, findings are a
        disorganised list. With it, the team can triage rapidly, identify patterns, consolidate
        duplicates and extract insights that individual participants would not have noticed working
        alone. A bug bash without a debrief returns far less value than the time invested.
      </KBBanner>

      <KBP>
        The debrief works best immediately after the session while findings are fresh. Each
        participant summarises what they tested and what they found. The facilitator drives
        triage of the top issues, distinguishes genuine defects from misunderstandings about
        expected behaviour and identifies any areas that were not covered.
      </KBP>

      <KBH2 id="what-makes-them-fail">What makes them fail</KBH2>

      <KBNote variant="warning">
        Bug bashes fail for predictable reasons. No defined scope means participants test whatever
        they find interesting, leaving critical areas untouched. No test account preparation means
        the first portion of the session is lost to setup. No logging discipline means findings
        are lost or duplicated in ways that cannot be resolved in the debrief. No debrief at all
        means the event produces a list of tickets with no context and no prioritisation. Each of
        these is a preparation failure rather than a format failure. The bug bash format works
        when the logistics support it.
      </KBNote>

      <KBP>
        A secondary failure mode is participant composition. A bug bash where only testers
        participate loses much of its value. The distinctive contribution of the format comes
        from the diversity of mental models that non-testers bring. A product manager who
        encounters an inconsistency between the feature and what was specified, or a developer
        who immediately recognises an output that indicates something unexpected in the backend,
        finds findings that a testing team working alone would not find in the same way or at the
        same speed.
      </KBP>
    </>
  )
}

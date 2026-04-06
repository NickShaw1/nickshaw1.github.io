import KBSteps from '../../../components/kb/KBSteps'
import KBAside from '../../../components/kb/KBAside'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function DefectLifecycleManagement() {
  return (
    <>
      <KBP>
        A defect does not cease to be relevant when it is found. Its value depends on what happens
        after discovery: how it is classified, who addresses it, how the fix is verified and
        whether it is closed when it should be or carried forward longer than necessary. Defect
        lifecycle management is the set of practices that keep this process orderly and useful.
      </KBP>

      <KBH2 id="the-standard-lifecycle">The standard lifecycle</KBH2>

      <KBSteps
        variant="blue"
        steps={[
          {
            title: 'New',
            body: 'The defect has been raised and is awaiting triage. It has not yet been assessed for validity, severity or priority. A defect in this state should not be assigned to a developer.',
          },
          {
            title: 'Triaged',
            body: 'The defect has been reviewed, confirmed as a genuine issue and assigned a severity, priority and owner. Triage may happen in a dedicated session or as part of a regular team ceremony. The output is a defect with enough information for a developer to act on.',
          },
          {
            title: 'In progress',
            body: 'A developer has taken ownership of the defect and is working on a fix. The defect should remain in this state until the fix is available in a testable environment.',
          },
          {
            title: 'Fixed',
            body: 'The developer believes the defect has been resolved. The fix is available for verification in an appropriate environment, and the report should note which build or version contains the change.',
          },
          {
            title: 'Verified',
            body: 'A tester has confirmed that the original defect is resolved and that no obvious regression has been introduced in the affected area. Verification is distinct from a full regression run; it is targeted confirmation that the specific fix works as intended.',
          },
          {
            title: 'Closed',
            body: 'The defect has been resolved and verified. It remains in the system for historical reference but is no longer active. Closed defects form part of the defect history that informs future risk assessment.',
          },
        ]}
      />

      <KBP>
        The states themselves are straightforward; the lifecycle most often breaks down at two
        points: triage, where defects are assessed and assigned, and verification, where fixes are
        confirmed. Both are covered below.
      </KBP>

      <KBH2 id="triage">Triage</KBH2>

      <KBP>
        Triage is where the lifecycle is most likely to go wrong. Without structured triage,
        defects accumulate, severity is applied inconsistently and important issues are buried
        alongside minor ones. Effective triage answers three questions for every defect: is this
        a genuine defect or expected behaviour, how serious is the impact on users and the system,
        and how urgently does it need to be addressed relative to current priorities?
      </KBP>

      <KBP>
        Triage should involve at least the tester who raised the defect and a developer who can
        assess the technical complexity of a fix. Product input is valuable when business context
        affects urgency, as it often does. The output should be a defect with a clear owner, a
        confirmed severity and a clear indication of when it will be picked up.
      </KBP>

      <KBP>
        The frequency of triage sessions depends on the team's release cadence. Teams shipping
        continuously may triage daily or as part of a standup. Teams working in longer release
        cycles may triage weekly or at sprint boundaries. What matters is that new defects do not
        sit unreviewed for extended periods, during which the context that made them actionable
        can fade.
      </KBP>

      <KBH2 id="verification-and-regression">Verification and regression</KBH2>

      <KBAside label="Verification is not simply re-testing" variant="gold">
        When a defect is marked fixed, the tester's job is not only to confirm that the original
        steps no longer produce the original result. It is to verify that the fix is complete,
        that the surrounding behaviour is unchanged and that the defect has not resurfaced in a
        related area. A fix that resolves the specific scenario in the report but introduces a
        regression in an adjacent flow has not closed the problem. The scope of verification
        should be proportional to the risk of the change: a fix touching core business logic
        warrants wider regression than a correction to a label or a layout adjustment.
      </KBAside>

      <KBP>
        Where automated regression exists for the affected area, it should be run as part of
        verification. Where it does not, targeted manual checks around the fix provide a
        reasonable safety net. The goal is not to re-run the entire test suite for every fix but
        to apply informed judgement about what else the change might have touched.
      </KBP>

      <KBH2 id="non-standard-outcomes">Non-standard outcomes</KBH2>

      <KBP>
        Not every defect follows the standard path to closed. Several alternative outcomes are
        legitimate but require care to apply correctly.
      </KBP>

      <KBP>
        Cannot reproduce means the defect could not be observed under the conditions described.
        Before closing a defect on this basis, the team should verify that the environment, test
        data and steps were applied correctly, and consider whether the defect may be intermittent
        rather than absent. Closing legitimate defects as cannot reproduce wastes the effort of
        finding them and risks the same issue surfacing later under different conditions.
      </KBP>

      <KBP>
        Won't fix means the defect has been reviewed and accepted as a known limitation. This is
        a legitimate outcome but should be accompanied by a documented reason, an assessment of
        user impact and explicit awareness from the relevant stakeholders. A defect closed as
        won't fix without discussion is a decision that has been made without being made.
      </KBP>

      <KBP>
        Deferred means the defect is genuine, will be addressed, but not in the current cycle.
        Deferral is a scheduling decision, not a quality one. A growing list of deferred defects
        is a signal worth examining in retrospectives: it indicates either that severity is being
        over-assigned or that the team is consistently taking on more than it can resolve within
        a cycle.
      </KBP>
    </>
  )
}

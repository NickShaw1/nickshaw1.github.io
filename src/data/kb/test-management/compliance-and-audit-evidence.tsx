import KBSteps from '../../../components/kb/KBSteps'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function ComplianceAndAuditEvidence() {
  return (
    <>
      <KBP>
        Compliance in a software quality context means demonstrating, to an external standard or
        auditor, that defined processes were followed and defined outcomes were achieved. For teams
        new to regulated environments, the prospect of an audit can feel daunting. In practice,
        the discipline it requires is a natural extension of good testing habits: documenting
        decisions as they are made, keeping records current and maintaining a clear line from
        requirements through to results. Teams that build this into their working process find
        audits straightforward. Teams that treat documentation as a separate activity, done
        before an audit rather than during the cycle, find them harder than they need to be.
      </KBP>

      <KBH2 id="what-auditors-look-for">What auditors look for</KBH2>

      <KBP>
        Auditors assess whether the processes a team claims to follow are reflected in the
        evidence they have produced. The three things they look for consistently are completeness,
        consistency and traceability. Completeness asks whether all required artefacts are present.
        Consistency asks whether the evidence is internally coherent: do test results reference
        the test cases they relate to and do defect records link to the tests that found them?
        Traceability asks whether there is a clear chain from requirements through test cases to
        execution results and release decisions.
      </KBP>

      <KBP>
        Auditors work from evidence rather than assertion. A team that can produce complete,
        well-maintained records gives the auditor what they need to complete their assessment
        efficiently. The quality of the evidence reflects the quality of the process, and teams
        that have maintained good records throughout the cycle tend to find the audit itself
        unremarkable.
      </KBP>

      <KBH2 id="traceability">Traceability</KBH2>

      <KBSteps
        variant="blue"
        steps={[
          {
            title: 'Requirements to test cases',
            body: 'Each requirement or user story should be traceable to one or more test cases that verify it. Requirements with no corresponding test cases represent a coverage gap that auditors will flag. Requirements traced to test cases that do not actually verify the stated requirement are a more subtle gap that experienced auditors will also identify.',
          },
          {
            title: 'Test cases to execution records',
            body: 'Each test case should be traceable to an execution record that captures when it was run, by whom and what the result was. A test case with no execution record is, from an audit perspective, a test case that was not run.',
          },
          {
            title: 'Defects to resolution evidence',
            body: 'Defects found during testing should be traceable to their resolution: either a confirmed fix with a re-test result, a documented risk acceptance decision or an explicit deferral with approval from the appropriate stakeholder.',
          },
          {
            title: 'Release decisions to evidence',
            body: 'The decision to release should be traceable to the evidence that justified it: exit criteria met, outstanding defects reviewed and accepted and approval from the relevant authority. A release made without documented justification is a compliance gap regardless of the actual quality of the software.',
          },
        ]}
      />

      <KBH2 id="maintaining-evidence">Maintaining evidence</KBH2>

      <KBH3>During the cycle, not before the audit</KBH3>

      <KBP>
        The most reliable audit evidence accumulates naturally as work progresses. Test execution
        records created at the moment of execution are more complete and more credible than records
        produced afterwards. Defect reports raised when defects are found contain the context that
        matters: what the tester observed, what the environment was and what steps they had taken.
        Building documentation into the working process rather than treating it as a separate
        activity means the records are there when they are needed, without requiring a significant
        effort before an audit begins.
      </KBP>

      <KBNote variant="green">
        Contemporaneous records are more useful than retrospective ones regardless of audit
        requirements. A defect report written at the time of discovery is more accurate than one
        reconstructed from memory at the end of a cycle. An execution record completed during
        testing captures detail that is easily forgotten an hour later. Maintaining evidence as
        work happens is both the compliance-correct approach and the practically better one.
      </KBNote>

      <KBH3>Retention and access</KBH3>

      <KBP>
        Most regulatory frameworks specify how long compliance documentation must be retained. In
        medical devices, retention periods are often tied to the product lifecycle and may extend
        to ten years or more beyond the last date of manufacture. In financial services, retention
        requirements vary by document type and regulation. Understanding the applicable retention
        requirements early means documentation can be stored in an appropriate system from the
        outset, rather than migrated under pressure when an audit is announced or the product
        reaches end of life.
      </KBP>

      <KBP>
        Access is as important as retention. Documentation that exists but cannot be retrieved
        efficiently does not serve its purpose. A well-organised archive with clear naming
        conventions and version control is far easier to present to an auditor than a collection
        of files assembled at short notice. The investment in keeping records organised throughout
        the product's life pays dividends when it is needed.
      </KBP>
    </>
  )
}

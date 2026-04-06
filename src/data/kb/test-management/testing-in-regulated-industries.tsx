import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function TestingInRegulatedIndustries() {
  return (
    <>
      <KBP>
        In most software development contexts, testing is a quality practice: it reduces risk,
        improves confidence and catches defects before they reach users. In regulated industries,
        testing acquires an additional character. It becomes a compliance obligation. The evidence
        that testing occurred, what it covered and what the outcomes were is subject to inspection
        by external bodies, and the absence of that evidence can have legal and operational
        consequences.
      </KBP>

      <KBH2 id="what-regulation-changes">What regulation changes</KBH2>

      <KBP>
        Regulation does not change what good testing looks like. It changes what must be
        demonstrated about testing. An unregulated team can rely on shared understanding within
        the team that certain areas were tested and found acceptable. A regulated team must
        document that testing in a way that an independent auditor, with no prior knowledge of
        the product or the team, can assess and verify.
      </KBP>

      <KBP>
        This documentation requirement affects almost every aspect of the testing process. Test
        plans must be written and retained. Test cases must be formally documented with their
        expected results. Test execution must be recorded, including who executed each case, when
        and what the actual result was. Defects found during testing must be tracked through to
        resolution and their resolution verified. The entire chain of evidence must be traceable
        from requirements through to test results.
      </KBP>

      <KBH2 id="common-regulatory-frameworks">Common regulatory frameworks</KBH2>

      <KBH3>Medical devices: IEC 62304 and FDA guidance</KBH3>

      <KBP>
        Software used in or as medical devices is subject to IEC 62304, an international standard
        for the software lifecycle of medical device software. It classifies software into safety
        classes based on the severity of harm that could result from a failure and requires
        progressively more rigorous development and verification activities at higher classes.
        Testing at Class C, the highest risk class, requires comprehensive unit, integration and
        system testing with documented evidence of each activity.
      </KBP>

      <KBP>
        In the United States, the FDA issues guidance on software development for medical devices,
        including specific expectations for verification and validation activities. Verification
        confirms that the software was built correctly; validation confirms that the right software
        was built for its intended use. Both require documented evidence.
      </KBP>

      <KBH3>Finance: FCA and PCI DSS</KBH3>

      <KBP>
        Financial services software in the UK operates under oversight from the Financial Conduct
        Authority, which expects firms to demonstrate operational resilience and adequate testing
        of systems that support regulated activities. The Payment Card Industry Data Security
        Standard applies to systems that handle payment card data and includes specific
        requirements for penetration testing, vulnerability scanning and access control testing at
        defined intervals.
      </KBP>

      <KBH3>Pharmaceuticals: GAMP 5</KBH3>

      <KBP>
        The pharmaceutical industry uses GAMP 5, a framework published by the International
        Society for Pharmaceutical Engineering, to guide validation of computerised systems used
        in regulated environments. GAMP 5 categorises software and specifies the validation
        activities required for each category. Validation packages comprising documentation of all
        testing and verification activities are a standard deliverable in this context.
      </KBP>

      <KBAside label="Aviation: DO-178C" variant="blue">
        Aviation software is governed by DO-178C, the standard for software considerations in
        airborne systems. It defines five software levels based on the severity of failure
        conditions, from catastrophic to no safety effect. At the highest levels, every
        requirement must be traced to a test, every test must have documented results and
        independent verification of the testing process is required. DO-178C is among the most
        demanding software quality standards in any industry.
      </KBAside>

      <KBH2 id="documentation-requirements">Documentation requirements</KBH2>

      <KBP>
        The documentation requirements in regulated industries are extensive. From a compliance
        perspective, an activity that is not documented cannot be verified as having occurred,
        which is why documentation is treated as part of the deliverable rather than as overhead.
        Teams that build this into their working process find it becomes routine rather than
        burdensome.
      </KBP>

      <KBP>
        Standard documentation artefacts include the master test plan, which describes the overall
        testing approach; individual test protocols or test case specifications; test execution
        records, which capture the results of each execution with date, tester identity and actual
        results; and defect reports linked to the relevant test cases. Traceability between
        requirements, test cases and test results is expected to be demonstrable on demand.
      </KBP>

      <KBH2 id="validation-and-qualification">Validation and qualification</KBH2>

      <KBNote variant="green">
        Validation and qualification are terms with specific meanings in regulated contexts that
        differ from their everyday usage. Validation is the process of demonstrating that a system
        meets its intended use in its actual operating environment. Qualification applies to tools,
        equipment and infrastructure used in the development and testing process: a testing tool
        used in a regulated environment may itself need to be qualified before its outputs can be
        relied upon as compliance evidence. Teams new to regulated development sometimes overlook
        this second dimension and encounter qualification gaps during audits.
      </KBNote>

      <KBP>
        The traceability requirement that connects requirements to test cases and test results to
        release decisions is often implemented through a Requirements Traceability Matrix. This
        document maps each requirement to the test cases that verify it and each test case to the
        execution record that demonstrates it was run and what the outcome was. Maintaining this
        matrix is ongoing work throughout the development cycle rather than a one-time activity
        before audit.
      </KBP>
    </>
  )
}

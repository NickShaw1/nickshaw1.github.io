import KBBanner from '../../../components/kb/KBBanner'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function SellingTestingToStakeholders() {
  return (
    <>
      <KBP>
        Testing teams often operate in organisations where the value of their work is not well
        understood by the people who fund and oversee it. Development produces visible output:
        features, screens, functions. Testing produces confidence, risk reduction and, most
        visibly, bugs — which are sometimes perceived as the team's problem rather than the team's
        contribution. Communicating the value of testing in terms that stakeholders respond to is
        not a peripheral concern; it is a core part of operating effectively as a QA function.
      </KBP>

      <KBH2 id="the-framing-problem">The framing problem</KBH2>

      <KBP>
        Testing is often framed, by testers and stakeholders alike, as a cost centre: a necessary
        activity that takes time, requires resource and delays releases. This framing is accurate
        but incomplete. Testing that finds a critical defect before release prevents the cost of
        an incident: engineering time to diagnose and fix the issue in production, customer support
        burden, reputational damage and, in some contexts, regulatory exposure. The cost of testing
        is visible; the cost it prevents is hypothetical and therefore harder to argue.
      </KBP>

      <KBP>
        The more useful framing is that testing provides decision support. Stakeholders make
        release decisions, prioritisation decisions and investment decisions. Testing provides the
        information those decisions require. A release report that shows a pass rate against
        critical scenarios and a count of open defects by severity gives a stakeholder everything
        they need to make an informed release decision. A team that provides that information
        reliably is not a cost centre; it is a decision-making resource.
      </KBP>

      <KBBanner>
        The language used in test reporting shapes how testing is perceived. "We found 14 bugs"
        positions the team as an obstacle. "Testing identified 14 defects, of which 3 were
        critical and have been resolved prior to release" positions the team as a safeguard. The
        facts are the same; the framing determines how they land.
      </KBBanner>

      <KBH2 id="language-that-works">Language that works</KBH2>

      <KBP>
        Stakeholders respond to the language of risk, cost, confidence and user impact. Testers
        who communicate in terms of test case counts, pass rates and defect severities are speaking
        accurately but not necessarily in a language their audience finds meaningful. Translating
        those metrics into business terms makes the communication more effective.
      </KBP>

      <KBP>
        Describing a critical defect as one that would have prevented users from completing a
        purchase, rather than one that caused an unhandled exception on the checkout endpoint,
        gives a stakeholder the information that is relevant to them. Describing coverage in terms
        of the user journeys verified, rather than the number of test cases executed, connects the
        testing activity to outcomes the stakeholder cares about.
      </KBP>

      <KBH2 id="metrics-that-resonate">Metrics that resonate</KBH2>

      <KBH3>Defect escape rate</KBH3>

      <KBP>
        The proportion of defects found in production compared to the total defects found is a
        measure of testing effectiveness that most stakeholders find immediately meaningful. A
        falling escape rate over successive releases is a clear indicator that testing quality is
        improving. A rising rate is a signal that warrants investigation and provides a concrete
        basis for a conversation about testing investment.
      </KBP>

      <KBH3>Coverage against critical journeys</KBH3>

      <KBP>
        Reporting coverage in terms of the critical user journeys verified, rather than lines of
        code or test case counts, gives stakeholders a way to assess what confidence the testing
        provides. A statement that all five critical checkout journeys have been verified across
        the supported browser configurations is more meaningful to a product stakeholder than a
        statement that 320 test cases were executed with a 97% pass rate.
      </KBP>

      <KBNote variant="blue">
        The most persuasive testing advocates are not those who argue for testing in the abstract
        but those who consistently deliver useful information at the right moment. A team that
        provides a clear, readable test summary before every release decision, that flags risks in
        plain language and that maintains a visible record of defects prevented from reaching
        users builds credibility over time. Credibility is the foundation of influence, and
        influence is what allows testing to be appropriately resourced and valued.
      </KBNote>
    </>
  )
}

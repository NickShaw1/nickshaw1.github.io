import KBSteps from '../../../components/kb/KBSteps'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function RiskBasedTestPrioritisation() {
  return (
    <>
      <KBP>
        No test effort covers everything. There is always more to test than time allows, and every
        team makes trade-offs about what to prioritise. Risk-based test prioritisation makes those
        trade-offs explicit rather than implicit. Instead of testing in the order cases appear in
        a list or in the order features were built, the team identifies the areas where failure
        would cause the greatest harm and tests those first.
      </KBP>

      <KBH2 id="what-risk-based-testing-means">What risk-based testing means</KBH2>

      <KBP>
        Risk in this context has two components: the likelihood that something will fail and the
        impact if it does. A feature that was recently refactored by an engineer unfamiliar with
        the codebase carries higher failure likelihood than a stable feature that has not been
        touched. A payment flow carries higher impact if it fails than a preferences page that
        affects no financial or data-integrity concern. Combining these two assessments produces a
        risk score that guides where testing effort is directed.
      </KBP>

      <KBP>
        Risk-based testing does not mean ignoring low-risk areas. It means reducing the time
        spent on them relative to high-risk areas and accepting explicitly that some scenarios
        will receive less coverage. That acceptance should be documented so that the decision is
        visible and can be revisited if circumstances change.
      </KBP>

      <KBH2 id="identifying-and-scoring-risk">Identifying and scoring risk</KBH2>

      <KBSteps
        variant="blue"
        steps={[
          {
            title: 'Identify areas of change',
            body: 'Features that have been modified in this cycle carry higher failure likelihood than features that have not been touched. Version control history is a reliable source for this: areas with recent commits, particularly large or complex ones, warrant more attention.',
          },
          {
            title: 'Assess business impact',
            body: 'For each area, consider the consequence of a defect reaching production. Core user journeys, payment flows, data integrity operations and security-sensitive functionality all carry high impact. Cosmetic elements, low-traffic pages and administrative tools generally carry lower impact.',
          },
          {
            title: 'Weight by exposure',
            body: 'Exposure amplifies impact. A cosmetic defect on a page visited by thousands of users daily may warrant more attention than a functional defect in a rarely accessed administrative function. Volume of use and visibility to users are part of the risk calculation.',
          },
          {
            title: 'Combine into a priority order',
            body: 'The combination of likelihood, impact and exposure produces a rough ordering. High likelihood and high impact areas are tested first, in depth. Low likelihood and low impact areas are tested last, at a surface level, or deferred explicitly.',
          },
        ]}
      />

      <KBH2 id="applying-the-prioritisation">Applying the prioritisation</KBH2>

      <KBH3>Within a sprint or release</KBH3>

      <KBP>
        Risk-based prioritisation is most practically applied by ordering the test execution
        sequence so that the highest-risk scenarios are completed first. If the testing window is
        compressed, the team can stop with confidence that the most important areas have been
        covered rather than stopping partway through a list and not knowing what risk remains.
      </KBP>

      <KBP>
        The depth of testing in each area should also reflect risk. High-risk areas deserve
        boundary testing, negative testing and investigation of edge cases. Low-risk areas may
        require only a basic verification that the primary happy path works.
      </KBP>

      <KBH3>Documenting the decisions</KBH3>

      <KBNote variant="green">
        When areas are deliberately given reduced coverage, that decision should be recorded. A
        log of what was tested thoroughly, what was tested at a surface level and what was
        excluded entirely provides a clear picture of the risk accepted at release. If a defect
        later surfaces in an area that was deprioritised, the team can assess whether the
        prioritisation decision was reasonable or whether the risk was misjudged. Without
        documentation, the same misjudgements tend to repeat.
      </KBNote>
    </>
  )
}

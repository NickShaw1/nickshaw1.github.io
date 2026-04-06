import KBBanner from '../../../components/kb/KBBanner'
import KBSteps from '../../../components/kb/KBSteps'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function WhyTestingMatters() {
  return (
    <>
      <KBP>
        The case for testing is sometimes framed as a technical argument. It should not be. The
        consequences of inadequate testing are organisational: slower delivery, eroded user trust,
        regulatory exposure and, in high-stakes systems, direct harm to the people who depend on
        the software. This article looks at what testing actually protects and what the absence of
        it costs.
      </KBP>

      <KBH2 id="when-it-goes-wrong">When it goes wrong</KBH2>

      <KBP>
        The Therac-25 radiation therapy machine, used in cancer treatment throughout the 1980s,
        caused at least six patients to receive massive radiation overdoses due to software faults
        including concurrent programming errors and the removal of hardware safety interlocks. The fault had existed in earlier versions of the machine but had been
        masked by hardware interlocks that were removed in the Therac-25. No adequate software
        testing replaced them. In 2012, Knight Capital's automated trading system lost $440 million
        in 45 minutes after a deployment error activated untested legacy code. The firm did not
        survive it.
      </KBP>

      <KBP>
        Undetected defects cause consequences proportional to the stakes of the system they live in.
        The same failure modes that caused Therac-25's harm exist in smaller form in every
        application that skips edge case testing or ships without regression coverage.
      </KBP>

      <KBH2 id="what-testing-actually-protects">What testing actually protects</KBH2>

      <KBP>
        Testing is often discussed in terms of finding bugs. The organisational benefits are broader
        than that:
      </KBP>

      <KBSteps
        variant="green"
        steps={[
          {
            title: 'User trust',
            body: 'Users who encounter defects lose confidence quickly. Repeated failures push them to alternatives. Testing reduces the frequency and severity of what users actually experience.',
          },
          {
            title: 'Developer velocity',
            body: 'Codebases with good test coverage are faster to change safely. Without coverage, every modification carries the risk of silent regression. That fear accumulates into paralysis.',
          },
          {
            title: 'Release confidence',
            body: 'Teams that test thoroughly can release more frequently because each release carries less uncertainty. The test suite becomes a safety net that enables speed, not a gate that limits it.',
          },
          {
            title: 'Regulatory standing',
            body: 'In healthcare, finance and other regulated industries, demonstrable testing processes are not optional. Audit trails, traceability and documented verification are legal requirements.',
          },
        ]}
      />

      <KBP>
        Each test added to a suite increases the value of all the others. A single test confirms
        one behaviour. A suite confirms that behaviours hold together as the system changes. That
        compounding return is why testing investment pays off over the lifetime of a codebase rather
        than immediately.
      </KBP>

      <KBH2 id="the-deferred-cost-argument">The deferred cost argument</KBH2>

      <KBBanner>
        Skipping tests does not remove the work of finding defects. It transfers that work to
        users, support teams and developers pulled away from new features to fix production incidents.
      </KBBanner>

      <KBP>
        The choice is not between testing and not testing. It is between finding problems in a
        controlled environment, where fixing them is cheap, or finding them in production, where
        the damage is already done.
      </KBP>

      <KBP>
        Technical debt accumulates fastest in untested code. Without tests, there is no reliable
        way to know whether a change has introduced a regression, so teams grow progressively more
        cautious about modifying older parts of the system. Velocity drops without any single
        identifiable cause.
      </KBP>

      <KBP>
        Organisations that treat testing as an overhead to be minimised typically find the savings
        are illusory. The time not spent testing is spent on incident response, hotfixes, rollbacks
        and the slower releases that result from low confidence in the codebase. The cost does not
        disappear. It shifts.
      </KBP>
    </>
  )
}

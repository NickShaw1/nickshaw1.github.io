import KBNote from '../../../components/kb/KBNote'
import KBAside from '../../../components/kb/KBAside'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function PairTesting() {
  return (
    <>
      <KBP>
        Pair testing is the practice of two people testing the same feature simultaneously,
        working together at a single workstation or shared screen. The approach is borrowed
        from pair programming, based on the observation that two people working on the same problem
        together tend to produce better outcomes than two people working on separate problems
        independently.
      </KBP>

      <KBP>
        The basic model involves a driver and an observer. The driver operates the system,
        executes actions and logs findings. The observer watches, suggests directions to explore,
        asks questions and thinks ahead about where to look next. Roles rotate, either on a
        fixed schedule or organically as the session develops. Neither role is passive: the
        observer's contribution is to hold the broader picture while the driver works through
        individual scenarios.
      </KBP>

      <KBH2 id="pairing-models">Pairing models</KBH2>

      <KBP>
        The most productive pairing in testing is not always two testers working together.
        Different role combinations surface different kinds of finding and serve different
        purposes within a team. In each case the driver/observer dynamic applies, but what the
        observer contributes changes depending on what they bring to the session.
      </KBP>

      <KBAside label="QA engineer and developer" variant="gold">
        Pairing between a QA engineer and a developer is particularly effective for new features
        and for investigating complex defects. The developer knows where the code is fragile or
        complex, where shortcuts were taken under time pressure and which code paths are covered
        by existing unit tests. The tester brings a user perspective, test design instincts and
        the habit of questioning assumptions. Rather than black-box testing a feature from the
        outside, the tester can ask the developer directly where the interesting boundary
        conditions are, what inputs stress the logic and what they were not confident about when
        building it. The result is targeted exploration that finds more relevant issues in the
        same time.
      </KBAside>

      <KBP>
        A QA engineer paired with a product manager focuses attention on intent rather than
        implementation. The product manager can clarify ambiguous requirements in real time,
        confirm whether observed behaviour matches expectations and identify gaps between what
        was specified and what was built. This combination is particularly useful for acceptance
        testing, where the most important question is whether the right thing was built rather
        than whether the thing that was built is technically correct.
      </KBP>

      <KBP>
        Two QA engineers pairing applies where independent verification adds value: high-risk
        features, regulated environments or scenarios where a single tester is likely to carry
        assumptions that a second perspective would challenge. The second tester provides the
        adversarial viewpoint rather than the technical context.
      </KBP>

      <KBH2 id="when-it-adds-value">When it adds value</KBH2>

      <KBP>
        Pair testing is not always worth the investment of two people's simultaneous attention.
        It pays off most clearly in specific situations: when a feature is technically complex
        and the tester lacks the context to know where to probe effectively; when a defect is
        difficult to reproduce and the developer's knowledge is needed to isolate the conditions;
        when a new team member is being onboarded and knowledge transfer is as valuable as
        defect finding; and when a high-risk area warrants a second perspective before a release.
      </KBP>

      <KBP>
        The knowledge transfer benefit is worth noting independently. A tester who pairs with a
        developer on an unfamiliar part of the codebase will understand it better after the
        session than before, which makes all subsequent testing of that area more targeted.
        Equally, a developer who observes a tester working through a feature often develops a
        stronger intuition for how users approach the system, which influences how they think
        about testability in future builds.
      </KBP>

      <KBNote variant="blue">
        Remote pair testing is effective with the right setup. Screen sharing, with the driver
        sharing their full environment and the observer able to see and communicate in real time,
        replicates most of the value of in-person sessions. The main thing lost is peripheral
        context: the driver cannot easily show tool state, browser history or network activity
        without deliberate effort. A short setup routine that establishes what both participants
        can see, and a communication channel with low enough latency to feel conversational,
        makes remote sessions work well for most pairing purposes.
      </KBNote>
    </>
  )
}

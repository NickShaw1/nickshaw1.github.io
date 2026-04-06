import KBSteps from '../../../components/kb/KBSteps'
import KBAside from '../../../components/kb/KBAside'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function IntroductionToManualTesting() {
  return (
    <>
      <KBP>
        Manual testing is the practice of evaluating software through direct human interaction,
        without automation driving the execution. A tester works with the system as a user would,
        applying judgement, curiosity and domain knowledge to determine whether it behaves
        correctly, usefully and safely.
      </KBP>

      <KBP>
        The distinction from automated testing matters but is easily misread. Manual testing is not
        the forerunner to automation, waiting to be replaced as tooling matures. It is a
        complementary discipline with a different set of strengths, suited to problems that
        automation handles poorly. Understanding where each excels is more useful than treating
        them as alternatives competing for the same work.
      </KBP>

      <KBH2 id="what-manual-testing-does-well">What manual testing does well</KBH2>

      <KBP>
        The core value of manual testing is the human judgement it applies to the experience of
        using software, not only to its correctness. An automated test can confirm that a checkout
        flow completes without error. It cannot judge whether the flow is confusing, whether error
        messages communicate helpfully or whether the interface makes the most important action
        obvious. These are experiential concerns that require a person to evaluate.
      </KBP>

      <KBSteps
        variant="green"
        steps={[
          {
            title: 'New and unstable features',
            body: 'Before an interface has settled, writing reliable automation is impractical. Manual testing lets teams verify behaviour during development without the maintenance burden of automating against code that is still changing rapidly.',
          },
          {
            title: 'Experiential and visual concerns',
            body: 'Whether a flow feels intuitive, whether a layout holds up on small screens or whether an error message communicates clearly to a user requires a person to judge. Assertions cannot capture these concerns.',
          },
          {
            title: 'Investigative follow-up',
            body: 'When something unexpected surfaces during testing, or when a defect suggests a wider problem, manual investigation is how teams understand what is actually happening and determine where else to look.',
          },
          {
            title: 'Qualitative acceptance criteria',
            body: 'Features defined by how they feel or how easily they can be used cannot be verified by asserting an expected value. Manual evaluation is the primary method for criteria of this kind.',
          },
        ]}
      />

      <KBP>
        Manual testing is also well suited to any area where the cost of automating exceeds the
        benefit. A feature that changes frequently, a workflow that depends on complex test data
        or a scenario that requires real external systems may all be cheaper to test manually than
        to maintain automation for.
      </KBP>

      <KBH2 id="where-it-is-less-suitable">Where it is less suitable</KBH2>

      <KBAside label="A persistent misconception" variant="gold">
        Manual testing is sometimes framed as a less skilled activity than automation: the work
        testers do before they learn to code. This misunderstands both disciplines. Good manual
        testing requires deep product knowledge, structured thinking, clear communication and the
        ability to form and test hypotheses quickly under pressure. Writing a strong exploratory
        charter, producing a reproducible bug report and knowing where in a complex system to look
        for problems are skills that take time and experience to develop.
      </KBAside>

      <KBP>
        Repeatability is where manual testing weakens. Running the same regression suite across
        hundreds of test cases after every deployment is slow, expensive and prone to human error.
        As a codebase grows, manually verifying all existing behaviour at each release becomes
        untenable. This is the domain where automation justifies its investment: tests that execute
        the same steps exactly, every time, at machine speed.
      </KBP>

      <KBP>
        Manual testing is also inconsistent under time pressure. When release cadence increases,
        manual verification compresses first. Automated tests do not suffer from fatigue or the
        temptation to skip a step when a sprint is ending. Teams that reserve manual testing for
        the work it is genuinely better suited to, and automate the remainder, get the most from
        both approaches.
      </KBP>

      <KBH2 id="in-practice">In practice</KBH2>

      <KBP>
        In most modern teams, manual testing is not a fixed script executed in sequence. It is
        investigative and judgement-driven: a tester picks up a feature, understands its intent,
        exercises it in realistic conditions and uses each finding to guide where to look next.
        This applies to structured sessions with defined objectives and to the open-ended
        investigation that exploratory testing formalises, which the Exploratory Testing article
        covers in depth.
      </KBP>

      <KBP>
        The documentation dimension matters equally. Manual testing generates findings that need to
        be recorded, communicated and tracked. A tester who discovers defects but reports them
        vaguely, or who covers a feature thoroughly but leaves no record of what was tested,
        produces less durable value than one whose work is reproducible and communicable. Good
        manual testing leaves a trace that others can understand and act on.
      </KBP>

      <KBP>
        The articles in this section move from the broad picture of manual testing into its
        specific practices: exploratory investigation, defect reporting, lifecycle management,
        collaborative formats such as bug bashes and pair testing, and usability testing.
      </KBP>
    </>
  )
}

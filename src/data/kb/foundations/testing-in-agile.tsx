import KBNote from '../../../components/kb/KBNote'
import KBAside from '../../../components/kb/KBAside'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function TestingInAgile() {
  return (
    <>
      <KBP>
        Agile methods do not come with a built-in testing strategy. They create a delivery cadence
        and a set of values, then leave teams to work out how quality fits in. That gap is where
        most agile testing problems originate. The practices in this article are not prescribed by
        Scrum or Kanban; they are the patterns that teams have developed to make testing work
        within these frameworks rather than around them.
      </KBP>

      <KBH2 id="testing-in-scrum">Testing in Scrum</KBH2>

      <KBP>
        Scrum organises work into fixed-length sprints, typically one to four weeks. The
        expectation is that each sprint produces a potentially shippable increment. That word
        "potentially" is doing significant work. For an increment to be shippable, it must be
        tested. Testing cannot be deferred to a later sprint without breaking the model; a backlog
        of untested work is not a series of increments, it is a waterfall project with shorter
        planning cycles.
      </KBP>

      <KBP>
        The practical implication is that testing must complete within the same sprint as
        development. This creates a compression problem that teams frequently underestimate.
        A story that takes three days to develop may take two days to test thoroughly, leaving
        little margin for defect cycles. Teams that do not account for testing effort in sprint
        planning consistently find that work carries over, testing lags behind and the sprint
        goal becomes theoretical.
      </KBP>

      <KBH2 id="scrum-ceremonies">Scrum ceremonies</KBH2>

      <KBP>
        Each Scrum ceremony has a quality dimension that is often underused.
      </KBP>

      <KBH3>Sprint planning</KBH3>
      <KBP>
        Sprint planning is where testing effort should be estimated alongside development effort.
        A story is not fully planned until someone has considered how it will be tested, what
        data it requires, what environments are needed and how long verification is likely to take.
        Testers who are excluded from or passive in sprint planning produce estimates that do not
        reflect reality.
      </KBP>

      <KBH3>Backlog refinement</KBH3>
      <KBP>
        Refinement sessions, sometimes called grooming, are where stories are clarified before
        they enter a sprint. This is where the Three Amigos practice fits naturally: a developer,
        a tester and a product owner review a story together, each bringing a different
        perspective. The developer considers implementation, the product owner considers intent
        and the tester considers how to verify both. Stories that pass through this conversation
        tend to have clearer acceptance criteria and fewer surprises during development.
      </KBP>

      <KBAside label="Three Amigos" variant="gold">
        Three Amigos is not a formal Scrum ceremony. It is a collaborative refinement technique
        that emerged from BDD practice and is widely used alongside Scrum. The three roles are
        illustrative rather than prescriptive; the point is that multiple perspectives review a
        story before work begins. Some teams include additional roles such as UX designers or
        security engineers depending on the nature of the work.
      </KBAside>

      <KBH3>Sprint review and retrospective</KBH3>
      <KBP>
        The sprint review is typically treated as a feature demonstration, but it is also a
        quality checkpoint. Defects found during the sprint, test coverage achieved and any
        known risks in the increment are all relevant to the review audience's assessment of
        whether the increment is genuinely shippable. The retrospective is the appropriate place
        to examine quality process: where testing created friction, what slipped through and what
        the team would do differently.
      </KBP>

      <KBH2 id="the-definition-of-done">The definition of done</KBH2>

      <KBP>
        The definition of done is a shared agreement about what criteria must be met before a
        story is considered complete. It is one of the most important quality mechanisms available
        to a Scrum team and one of the most commonly weakened in practice. A definition of done
        that includes only "code reviewed and merged" is not a quality standard; it is a
        development standard.
      </KBP>

      <KBP>
        A meaningful definition of done for most teams includes: acceptance criteria verified,
        relevant automated tests written and passing, no known critical defects outstanding,
        code reviewed, documentation updated where required and the feature tested in an
        environment representative of production. Teams that treat the definition of done as
        aspirational rather than mandatory accumulate undone work that surfaces as defects and
        rework later in the release cycle.
      </KBP>

      <KBH2 id="testing-in-kanban">Testing in Kanban</KBH2>

      <KBP>
        Kanban does not use sprints. Work flows continuously through a series of stages, with
        work-in-progress limits applied at each stage to prevent bottlenecks from building up
        invisibly. Testing is typically represented as one or more columns on the Kanban board,
        and WIP limits force the team to address testing before pulling new work into development.
        If the testing column is full, developers stop starting new work and help clear the
        testing backlog instead.
      </KBP>

      <KBP>
        This is a significant difference from Scrum. In Scrum, testing pressure is most acute
        at the end of a sprint. In Kanban, the WIP limit mechanism is designed to distribute
        that pressure continuously. A team that sets its testing WIP limit correctly will never
        accumulate more work awaiting testing than the testers can address in a short period.
        A team that sets it too high, or ignores it, reproduces the same end-of-cycle compression
        that Scrum teams experience.
      </KBP>

      <KBP>
        Kanban's primary quality metrics are cycle time, the time from a story being started to
        being done, and lead time, the time from a story being requested to being done. Both are
        sensitive to testing bottlenecks. A rising cycle time in the testing column is a visible,
        quantified signal that the team's testing capacity is misaligned with its development
        throughput.
      </KBP>

      <KBH2 id="failure-modes">Common failure modes</KBH2>

      <KBNote variant="warning">
        The most common agile testing failure mode is treating the sprint boundary as a testing
        boundary. Stories completed on the last day of a sprint that have not been tested are not
        done. Carrying them into the next sprint as "just needs testing" is a sign that the sprint
        capacity model is broken, not that the stories are nearly finished.
      </KBNote>

      <KBP>
        A related failure is the testing role becoming a bottleneck at the end of every sprint
        because testing was not considered during planning. This pattern, sometimes called the
        "testing crunch", is self-reinforcing: testers rushing to clear a backlog at the end of
        a sprint test less thoroughly, more defects escape, confidence in releases drops and
        stakeholders lose trust in the cadence. The fix is upstream: testing effort must be part
        of the conversation when work is estimated and planned, not an afterthought when
        development is complete.
      </KBP>
    </>
  )
}

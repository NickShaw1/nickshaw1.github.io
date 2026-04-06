import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function AiGeneratedTests() {
  return (
    <>
      <KBP>
        AI tools can now produce test code (unit tests, integration tests, end-to-end scripts)
        from a description of what should be tested or from inspection of existing source code.
        The capability is real and the output can be genuinely useful. So are the risks, which
        are specific enough to be worth understanding clearly before incorporating AI-generated
        tests into a suite that will be maintained, relied upon and used to make release
        decisions.
      </KBP>

      <KBH2 id="what-ai-generated-tests-can-do-well">What AI-generated tests can do well</KBH2>

      <KBP>
        AI tools perform best on test generation tasks that are high in volume, low in
        contextual subtlety and well-defined in structure. Producing parameterised test tables
        for boundary value analysis, generating happy path tests for CRUD operations, creating
        a first-pass skeleton of test coverage for a new module: these are tasks where AI
        assistance reduces time without introducing significant risk, provided the output is
        reviewed before it is committed.
      </KBP>

      <KBP>
        For developers writing unit tests alongside new code, AI tools are effective at
        generating the boilerplate that makes test writing feel slow: the setup code, the
        assertion scaffolding, the repetitive variations of a single test with different
        inputs. The substantive work of deciding what needs testing, what constitutes a
        meaningful assertion and what scenarios represent genuine risk still requires the
        developer's knowledge of the code and the feature.
      </KBP>

      <KBH3>Format and naming consistency</KBH3>

      <KBP>
        AI tools also tend to produce consistently formatted output that follows the naming
        and structural conventions of the codebase it is given as context. For teams without
        strong test conventions, this can improve consistency. For teams with well-established
        standards, it means generated tests slot in without requiring reformatting.
      </KBP>

      <KBH2 id="the-risks">The risks</KBH2>

      <KBP>
        The most significant risk with AI-generated tests is not that they fail to run; it
        is that they run, pass and provide no useful assurance. A test that calls the right
        method but asserts on a value that happens to match regardless of the outcome is a
        passing test that catches no defects. A test that verifies a function returns a
        non-null value when the real concern is whether the returned value has the correct
        structure has the same problem.
      </KBP>

      <KBP>
        This pattern, a test that appears to verify behaviour but is actually vacuous, is
        among the hardest test quality problems to detect, because it does not surface until
        a real defect is introduced and the test fails to catch it. AI tools are more likely
        to produce this pattern than human testers because they are optimising for syntactic
        plausibility rather than meaningful assurance.
      </KBP>

      <KBP>
        A second risk is implementation coupling. AI-generated tests frequently reflect the
        implementation they are shown rather than the behaviour it is supposed to produce.
        A test written by inspecting the source code will tend to test how the code works
        rather than what it does. These tests break on refactoring even when the behaviour
        is unchanged, creating maintenance burden without quality benefit.
      </KBP>

      <KBP>
        Edge cases are a third concern. AI tools tend to generate the cases that are common
        and obvious. The less-obvious boundary conditions, those that require domain
        knowledge or understanding of how the system is actually used, are exactly the
        cases that AI generation is least likely to produce and that matter most for
        catching real defects.
      </KBP>

      <KBH2 id="reviewing-and-owning-ai-generated-tests">Reviewing and owning AI-generated tests</KBH2>

      <KBP>
        Every AI-generated test must be reviewed by a person who understands what is being
        tested. The review is not a formality; it is the step that determines whether the
        generated test has any value. The relevant questions are: does the assertion verify
        a meaningful property of the system? Would this test fail if the behaviour it is
        supposed to test broke? Is the test name an accurate description of what the test
        actually does?
      </KBP>

      <KBP>
        Generated tests should go through the same review process as any other code. That
        means pull request review, automated quality gates and the same standards for what
        constitutes an acceptable test. Relaxing review standards for AI-generated tests
        because they were produced quickly defeats the purpose of having standards.
      </KBP>

      <KBAside label="Deleting a bad test is better than keeping it" variant="gold">
        A test that is wrong is worse than no test. It consumes maintenance effort, creates
        false confidence in coverage and, most critically, fails to catch the defect it
        appears to cover. An AI-generated test that does not meet the standard for a good
        test should be deleted, not committed. Quantity of tests is not the goal; quality
        of assurance is.
      </KBAside>

      <KBP>
        Once a generated test is committed, it carries the same maintenance obligation as
        a manually written test. The fact that AI produced the initial version does not
        make the test disposable or lower the standard for keeping it accurate and up to
        date as the system evolves. Ownership transfers to the team at the moment of commit.
      </KBP>

      <KBH2 id="when-to-use-them">When to use them</KBH2>

      <KBP>
        AI-generated tests are most appropriate as the starting point for a testing effort
        rather than its conclusion. They are well suited to generating a skeleton that a
        tester or developer then iterates on: adding the cases that the AI did not think to
        include, tightening the assertions, removing the ones that do not test anything useful.
      </KBP>

      <KBP>
        The paths where AI generation carries the most risk are those that require deep domain
        knowledge, contain subtle state management, involve security or safety-critical logic
        or have compliance implications. These are precisely the paths where the AI is most
        likely to produce confident, plausible and incorrect tests. For these areas, AI
        assistance in test generation should be treated with greater scepticism or avoided
        in favour of tests that are explicitly designed by someone who understands the
        requirements and the risks.
      </KBP>

      <KBNote variant="warning">
        Treat AI-generated test generation as drafting, not as delivery. The output of an AI
        test generation tool is the equivalent of a rough first draft: it establishes a shape
        and reduces the blank-page problem, but it needs substantial review, editing and in
        some cases wholesale replacement before it is ready to be relied upon. The investment
        in review does not disappear; it shifts from initial writing to assessment and
        refinement.
      </KBNote>
    </>
  )
}

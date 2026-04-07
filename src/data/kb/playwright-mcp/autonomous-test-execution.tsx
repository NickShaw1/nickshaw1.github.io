import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBVideo from '../../../components/kb/KBVideo'

export default function AutonomousTestExecution() {
  return (
    <>
      <KBVideo
        videoId="HLegcP8qxVY"
        title="Playwright Testing Agents: under the hood"
        caption="How Playwright testing agents work and what they can do in practice today"
      />

      <KBP>
        The phrase "autonomous AI testing" appears frequently in product announcements and
        conference talks. It conjures an image of an AI that needs no human involvement:
        it explores your application, generates tests, runs them, interprets failures and
        fixes them, all without anyone watching. This article examines what autonomous
        execution actually looks like in practice, what the reliable use cases are today,
        and where the technology genuinely cannot be trusted without human oversight.
      </KBP>

      <KBH2 id="what-autonomous-means">What autonomous AI test execution looks like in practice</KBH2>

      <KBP>
        Fully autonomous testing means an AI agent that can complete the entire testing
        workflow without human input: navigate an application, decide what to test, generate
        test code, run it, read the results and iterate on failures until the tests pass.
      </KBP>

      <KBP>
        This is possible today in narrow, controlled scenarios. An AI agent with access to
        the Playwright MCP server can:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>Navigate to a given URL and explore the accessible elements on the page.</li>
        <li>Generate a test file for a described flow and write it to disk.</li>
        <li>Run the test using the CLI and read the output.</li>
        <li>Interpret a failure and attempt a fix.</li>
        <li>Repeat the run-interpret-fix loop several times.</li>
      </ul>

      <KBP>
        What this does not produce reliably is a test suite you can trust. The AI makes
        the right tests pass, but it may do so by writing tests that assert on things that
        are incidentally true rather than things that actually matter, by weakening
        assertions when they fail, or by fixing a symptom rather than a root cause. The
        output of an autonomous run needs human review before it can be considered a
        meaningful addition to your test suite.
      </KBP>

      <KBH2 id="human-in-the-loop">Human-in-the-loop vs fully autonomous</KBH2>

      <KBP>
        The human-in-the-loop approach keeps a human at key decision points in the testing
        workflow. The AI handles the mechanical work - generating code, running tests,
        identifying candidate fixes - while the human reviews outputs, approves changes and
        makes judgement calls about whether a test is actually testing the right thing.
      </KBP>

      <KBP>
        This is the approach that produces reliable results today. It is significantly
        faster than doing the same work entirely by hand, but it is not zero-touch. The
        human's role shifts from writing boilerplate to reviewing and directing.
      </KBP>

      <KBH3>What the human reviews</KBH3>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>Whether the generated tests cover the scenarios that matter, not just the scenarios the AI found easy to test.</li>
        <li>Whether the assertions are meaningful - verifying the right outcomes, not just that something appeared on the page.</li>
        <li>Whether the locators are resilient and will survive normal UI changes.</li>
        <li>Whether fixes applied to failing tests address the root cause rather than suppress the failure.</li>
        <li>Whether the overall test strategy makes sense for the feature being tested.</li>
      </ul>

      <KBP>
        Fully autonomous approaches - where the AI generates, runs and fixes tests with no
        human review - are appropriate only for low-stakes scenarios where a false positive
        (a test that passes but does not actually verify anything useful) carries low cost.
        They are not appropriate as the primary source of test coverage for production
        software.
      </KBP>

      <KBH2 id="ci-integration">Integrating AI-assisted execution into CI</KBH2>

      <KBP>
        The Playwright test runner runs the same way in CI whether the tests were written
        by hand or generated with AI assistance. From the CI pipeline's perspective, they
        are just test files. The MCP server is not involved in CI - it is a tool for
        writing and maintaining tests, not for running them.
      </KBP>

      <KBP>
        Where AI can assist at the CI layer is in interpreting failures. Some CI platforms
        and third-party services can send test failure output to an AI for analysis, with
        the AI generating a summary of what failed and why. This is useful for keeping the
        signal-to-noise ratio high in CI notifications: instead of a raw failure log, a
        developer gets a sentence explaining that three tests failed because a locator
        referencing a button that was renamed in the latest commit did not resolve.
      </KBP>

      <KBH2 id="feedback-loop">The feedback loop: AI runs, AI interprets, human reviews</KBH2>

      <KBP>
        The most mature model for AI-assisted execution involves three stages in a loop,
        with a human at the exit gate.
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>
          <strong className="text-text-primary">AI runs the tests.</strong> This is straightforward - the Playwright CLI runs in the same environment it always has.
        </li>
        <li>
          <strong className="text-text-primary">AI interprets the results.</strong> The AI reads the failure output, traces if available, and produces an explanation: which tests failed, what the failures indicate about the application or the tests, and what the likely fixes are.
        </li>
        <li>
          <strong className="text-text-primary">Human reviews and approves.</strong> The human reads the AI's interpretation, applies judgement about whether the proposed fixes are correct and appropriate, and decides which changes to commit.
        </li>
      </ul>

      <KBP>
        This loop is faster than the equivalent manual workflow because the AI handles the
        time-consuming work of reading and parsing failure output. The human focuses on
        higher-order decisions rather than raw diagnostic work.
      </KBP>

      <KBH2 id="where-the-technology-actually-is">Where the technology actually is in 2025 vs the hype</KBH2>

      <KBP>
        Marketing material for AI testing tools often describes fully autonomous testing as
        if it were a solved problem. It is not. The gap between "the AI can perform an
        action" and "the AI can be trusted to decide what to test and verify that it is
        correct" is large.
      </KBP>

      <KBH3>What works reliably</KBH3>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>Generating test skeletons for well-defined, explicitly described flows.</li>
        <li>Updating locators after a UI change when given both the old code and access to the new UI.</li>
        <li>Diagnosing common, well-patterned failures like timeout errors and strict mode violations.</li>
        <li>Explaining what existing test code does.</li>
        <li>Reducing the time spent on boilerplate and mechanical pattern-matching in test maintenance.</li>
      </ul>

      <KBH3>What does not work reliably without human oversight</KBH3>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>Deciding independently what scenarios are worth testing for a given feature.</li>
        <li>Ensuring that assertions verify meaningful application behaviour rather than incidental properties.</li>
        <li>Distinguishing between a test that passes because the feature works and a test that passes because the assertion is too weak to catch the bug.</li>
        <li>Reasoning about security, data integrity or edge cases that require domain knowledge.</li>
        <li>Producing a complete test suite from scratch for a complex feature without significant direction and review.</li>
      </ul>

      <KBNote variant="purple">
        The engineers getting the most value from AI-assisted testing in 2025 are treating
        it as a skilled assistant with a tendency to be overconfident, not as an autonomous
        professional. They direct the work, set clear expectations, review every output and
        take personal accountability for the quality of what they commit. The AI saves time
        on the mechanical parts of the job; it does not replace the judgement required to
        do the job well.
      </KBNote>

      <KBH2 id="practical-starting-point">A practical starting point</KBH2>

      <KBP>
        If you are new to AI-assisted testing and want a sensible starting point, begin with
        a single, well-understood flow in your application. Use the MCP server to generate
        tests for it, review the output carefully, run it and iterate until you are satisfied
        with the quality. This gives you a grounded understanding of what the AI does well
        and where it needs guidance before you scale the approach to your entire suite.
      </KBP>

      <KBP>
        Avoid starting with your most complex or most critical test scenarios. Start with
        something you know well so that you can evaluate the AI's output from a position of
        confidence rather than uncertainty.
      </KBP>
    </>
  )
}

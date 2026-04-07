import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBCode from '../../../components/kb/KBCode'
import KBVideo from '../../../components/kb/KBVideo'

export default function GeneratingTestsWithAi() {
  return (
    <>
      <KBVideo
        videoId="AaCj939XIQ4"
        title="How to Generate Playwright Tests using MCP + Copilot"
        caption="Generating Playwright tests from a live application using MCP and an AI coding assistant"
      />

      <KBP>
        With the Playwright MCP server connected, your AI assistant can navigate your
        application, observe its structure and generate test code based on what it finds.
        The quality of the output depends substantially on the quality of the prompts you
        provide and the review you apply to the result. This article covers prompting
        strategies, how to iterate on generated output and what to expect AI to get right
        and wrong.
      </KBP>

      <KBH2 id="what-the-ai-can-see">What the AI can see</KBH2>

      <KBP>
        When the Playwright MCP server is active, the AI can call browser tools that
        capture a snapshot of the current page as an accessibility tree. This snapshot
        includes every interactive element on the page - buttons, links, form fields, ARIA
        labels and roles. The AI uses this snapshot to identify elements and generate
        locators.
      </KBP>

      <KBP>
        It is important to understand that the AI does not have continuous vision. It
        requests a snapshot, processes it and then acts. If the page changes after a
        snapshot - for example, a modal opens or a validation message appears - the AI
        needs to request another snapshot to see the new state. This means the AI's
        understanding of your application's dynamic behaviour is built up incrementally
        through multiple interactions.
      </KBP>

      <KBH2 id="prompting-strategies">Prompting strategies for test generation</KBH2>

      <KBH3>Be specific about the flow</KBH3>

      <KBP>
        Vague prompts produce vague tests. Instead of asking "write tests for my
        application", describe the exact flow you want tested:
      </KBP>

      <KBCode>{`Navigate to http://localhost:3000/signup. Fill in the registration form with
a unique email address, a display name of "Test User" and a password of your
choice. Submit the form. Tell me what happens and then write a Playwright test
that verifies the successful registration flow, including any success message
or redirect that occurs.`}</KBCode>

      <KBH3>Tell the AI what constitutes success</KBH3>

      <KBP>
        An AI left to decide what to assert on may assert on things that are visible but not
        meaningful. Be explicit about what the test should verify:
      </KBP>

      <KBCode>{`After submitting the form, the test should assert that:
- The URL changes to /dashboard
- A heading containing the user's display name is visible
- There is no error message visible on the page`}</KBCode>

      <KBH3>Ask for specific locator strategies</KBH3>

      <KBP>
        Playwright has a preferred locator priority order. Telling the AI which strategies
        to use produces more resilient output:
      </KBP>

      <KBCode>{`Use getByRole() for buttons and headings, getByLabel() for form fields and
getByText() only when there is no accessible role or label available. Avoid
CSS selectors and data-testid unless nothing else works.`}</KBCode>

      <KBH3>Ask for TypeScript with the correct imports</KBH3>

      <KBCode>{`Write the test in TypeScript. Import test and expect from '@playwright/test'.
Use async/await throughout. Do not use callbacks.`}</KBCode>

      <KBH3>Specify your test file conventions</KBH3>

      <KBP>
        If your project has naming conventions, file structure or testing patterns the AI
        should follow, include them:
      </KBP>

      <KBCode>{`Place the test inside a test.describe block named 'Registration'. Follow the
Arrange-Act-Assert pattern. Each test should test a single behaviour.`}</KBCode>

      <KBH2 id="reviewing-output">Reviewing and correcting AI-generated output</KBH2>

      <KBP>
        Never commit AI-generated test code without reviewing it. Review the output against
        the following checklist before deciding whether to use it.
      </KBP>

      <KBH3>Does it actually run?</KBH3>

      <KBP>
        Run the generated test before anything else. AI-generated code sometimes contains
        syntax errors, incorrect method signatures or imports that do not exist. If it does
        not run, fix the obvious errors first before evaluating the content.
      </KBP>

      <KBH3>Does it test what it claims to test?</KBH3>

      <KBP>
        Read the assertions carefully. A test that navigates to a page and asserts that a
        heading is visible might pass even if the form submission failed, because the
        heading was already there before the form was submitted. Check that each assertion
        is actually verifying the consequence of the action that preceded it.
      </KBP>

      <KBH3>Are the locators resilient?</KBH3>

      <KBP>
        Look for locators that are likely to break when the UI changes. CSS class selectors,
        XPath expressions and <code>nth-child</code> combinators are red flags. Replace them
        with role-based or label-based locators.
      </KBP>

      <KBH3>Is there unnecessary waiting?</KBH3>

      <KBP>
        AI-generated tests sometimes include explicit <code>waitForTimeout</code> calls.
        These are almost always wrong. Playwright's locators and assertions have built-in
        auto-waiting. Replace fixed waits with specific assertions on the state you are
        waiting for.
      </KBP>

      <KBH2 id="using-ai-alongside-codegen">Using AI alongside codegen</KBH2>

      <KBP>
        Playwright's built-in code generator (<code>npx playwright codegen</code>) is a
        recording tool: you interact with the browser and it generates code from your
        actions. The MCP-based approach is an observation tool: the AI interacts with the
        browser and generates code from what it observes.
      </KBP>

      <KBP>
        The two approaches complement each other. Use <code>codegen</code> when you want to
        rapidly capture a specific interaction as code - particularly for complex mouse
        interactions or keyboard sequences that are difficult to describe in prose. Use the
        MCP approach when you want the AI to explore a flow you have not scripted yourself,
        or when you want it to suggest both the interactions and the assertions in a single
        pass.
      </KBP>

      <KBP>
        A common workflow is to record the skeleton of a test with <code>codegen</code>,
        then paste that code to the AI and ask it to improve the locators, add assertions
        and handle waiting correctly:
      </KBP>

      <KBCode>{`Here is a Playwright test I recorded with codegen. Please:
1. Replace any CSS selectors with role-based or label-based locators
2. Remove all waitForTimeout calls and replace them with proper assertions
3. Add meaningful assertions that verify the right things
4. Add a descriptive name and a test.describe block

[paste codegen output here]`}</KBCode>

      <KBH2 id="iterating">Iterating on a generated test</KBH2>

      <KBP>
        A single prompt rarely produces production-ready test code. Expect to iterate.
        The pattern that works best is:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>Generate a first version and run it.</li>
        <li>If it fails, share the error with the AI and ask it to fix it.</li>
        <li>If it passes but has issues (brittle locators, weak assertions), describe the issue and ask for a revision.</li>
        <li>Repeat until the test is solid, then review the final version yourself before committing.</li>
      </ul>

      <KBP>
        When the AI fixes a failure, ask it to explain what was wrong. This helps you
        understand whether the fix is correct or whether the AI is patching a symptom
        rather than the root cause.
      </KBP>

      <KBH2 id="what-ai-gets-right">What AI gets right</KBH2>

      <KBP>
        AI does well on the structural and boilerplate aspects of test generation:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>Setting up the imports, describe block and test function correctly.</li>
        <li>Identifying form elements by label when the page has good accessibility markup.</li>
        <li>Generating the sequence of interactions for a straightforward form submission.</li>
        <li>Using the correct Playwright API for common operations - <code>fill</code>, <code>click</code>, <code>goto</code>.</li>
        <li>Applying the correct assertion syntax.</li>
      </ul>

      <KBH2 id="what-ai-gets-wrong">Where AI needs human correction</KBH2>

      <KBP>
        AI makes consistent, predictable mistakes in certain areas. Knowing them in advance
        means you can catch them quickly in review.
      </KBP>

      <KBH3>Incorrect assumptions about application state</KBH3>

      <KBP>
        The AI sees the page at the moment it snapshots it. It does not know what state the
        application was in before it navigated to the page. If a test requires the user to
        be logged in, the AI may generate a test that navigates to a protected page and then
        be confused when it sees a login form. Always tell the AI explicitly what state the
        application should be in at the start of the test.
      </KBP>

      <KBH3>Hallucinated locators</KBH3>

      <KBP>
        Occasionally the AI generates a locator that refers to an element that does not
        actually exist on the page. This happens more often with role-based locators on
        pages with poor accessibility markup, where the AI guesses at roles that are not
        present. Always run the generated test and verify that each locator resolves to the
        expected element.
      </KBP>

      <KBH3>Missing negative assertions</KBH3>

      <KBP>
        AI tends to assert that things are visible, not that they are absent. A test for a
        successful form submission may check that the success message appears but not check
        that the error message is absent. Add negative assertions manually where they matter.
      </KBP>

      <KBH3>Overly broad URL assertions</KBH3>

      <KBP>
        Generated tests often check <code>expect(page.url()).toContain('/dashboard')</code>
        rather than the more precise <code>expect(page).toHaveURL('/dashboard')</code>. The
        former passes if the URL contains the string anywhere - including in a query
        parameter. Prefer <code>toHaveURL</code> with a specific value.
      </KBP>

      <KBNote variant="green">
        The most productive approach is to treat the AI as a pair programmer who is fast but
        needs supervision. Set clear expectations in your prompts, run the output immediately
        and provide specific feedback when something is wrong. The quality of the output
        improves significantly with each round of feedback in a single session.
      </KBNote>
    </>
  )
}

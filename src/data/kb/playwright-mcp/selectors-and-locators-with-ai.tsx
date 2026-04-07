import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBCode from '../../../components/kb/KBCode'

export default function SelectorsAndLocatorsWithAi() {
  return (
    <>
      <KBP>
        Locators are the part of a Playwright test most likely to break as your application
        evolves. A brittle locator - one that depends on a CSS class, a DOM position or an
        auto-generated attribute - fails the moment a developer touches the surrounding
        code, even if the user-facing behaviour has not changed. AI can help with both
        writing resilient locators from the start and repairing brittle ones in existing
        tests. This article covers how to use AI for both tasks effectively.
      </KBP>

      <KBH2 id="how-ai-generates-locators">How AI generates locators</KBH2>

      <KBP>
        When the Playwright MCP server is connected, the AI has access to the page's
        accessibility tree. This is the same tree that screen readers use to navigate a
        page, and it reflects the semantic structure of the content rather than the visual
        layout or the underlying CSS.
      </KBP>

      <KBP>
        When you ask the AI to locate an element, it examines the accessibility tree and
        looks for properties that uniquely identify the element: its role, its accessible
        name, its label, its placeholder text. If those properties exist and are unique on
        the page, the AI generates a locator using the appropriate Playwright method. This
        is exactly the process a skilled human tester follows when writing a good locator.
      </KBP>

      <KBP>
        The AI falls back to less resilient strategies - CSS selectors or data attributes -
        when the semantic properties are absent or ambiguous. This is a signal about your
        application's accessibility rather than a limitation of the AI: if the AI cannot
        find a good semantic locator, a screen reader user would have the same difficulty.
      </KBP>

      <KBH2 id="asking-for-locators">Using AI to suggest resilient locators</KBH2>

      <KBP>
        The most direct approach is to describe the element you want to locate and ask the
        AI to suggest a locator:
      </KBP>

      <KBCode>{`Navigate to http://localhost:3000/checkout.
Find the "Place order" button and suggest the most resilient
Playwright locator for it. Explain why you chose that strategy.`}</KBCode>

      <KBP>
        Asking the AI to explain its choice is important. If the explanation reveals that
        it is relying on a CSS class or a generated attribute, you know the locator is
        fragile even if it works today.
      </KBP>

      <KBH3>For a form with multiple fields</KBH3>

      <KBCode>{`Navigate to http://localhost:3000/register.
List every form field and suggest the best Playwright locator for each one.
For each locator, state the method you used (getByLabel, getByRole, etc.)
and explain what makes each choice more or less resilient.`}</KBCode>

      <KBH2 id="fixing-brittle-selectors">Fixing brittle selectors with AI assistance</KBH2>

      <KBP>
        If you have an existing test suite with locators that break frequently, AI can help
        you upgrade them systematically. Paste the test code and ask for a review:
      </KBP>

      <KBCode>{`Here is a Playwright test. Identify every locator that is likely to be brittle:
CSS class selectors, nth-child combinators, XPath expressions and any selector
that references auto-generated IDs. For each brittle locator, navigate to the
page and suggest a resilient replacement using Playwright's recommended strategies.

[paste test code]`}</KBCode>

      <KBP>
        A typical before-and-after comparison shows the difference clearly:
      </KBP>

      <KBCode language="typescript">{`// Before - brittle selectors that break when styles or structure change
await page.locator('.btn.btn-primary.submit-btn').click()
await page.locator('#app > div:nth-child(3) > input').fill('test@example.com')
await page.locator('[data-v-3f4a1b]').click()

// After - semantic locators that reflect user-visible properties
await page.getByRole('button', { name: 'Place order' }).click()
await page.getByLabel('Email address').fill('test@example.com')
await page.getByRole('checkbox', { name: 'I agree to the terms' }).click()`}</KBCode>

      <KBH2 id="why-ai-needs-review">Why AI recommendations still need review</KBH2>

      <KBP>
        AI-suggested locators are often good but not always correct. There are several
        reasons why human review is non-negotiable.
      </KBP>

      <KBH3>The page may have multiple matching elements</KBH3>

      <KBP>
        If a page contains two buttons with the role "button" and the name "Submit", a
        locator using <code>{'getByRole(\'button\', { name: \'Submit\' })'}</code> matches both.
        Playwright will throw a "strict mode violation" error rather than silently picking
        one. The AI may not notice this ambiguity if it only snapshotted the page once and
        the second button was not visible in that snapshot.
      </KBP>

      <KBH3>Accessible names can be fragile too</KBH3>

      <KBP>
        A button whose accessible name comes from its text content is resilient to CSS
        changes but will break if the text is changed. Whether this is acceptable depends
        on whether the text is a stable part of the UI specification or likely to be
        updated during localisation or copy editing. Ask yourself: if this text changed,
        should the test break? If yes, the locator is correct. If no, consider a
        <code>data-testid</code> instead.
      </KBP>

      <KBH3>The accessibility tree may not reflect all elements</KBH3>

      <KBP>
        Some applications render content in ways that produce a poor accessibility tree.
        Canvas elements, custom web components without ARIA attributes and some animation
        libraries produce nodes that the AI cannot identify meaningfully. In these cases
        the AI may fall back to fragile locators or fail to locate the element at all.
        You need to add ARIA attributes to the element or use a <code>data-testid</code>.
      </KBP>

      <KBH2 id="comparing">Comparing AI-suggested vs manually written locators</KBH2>

      <KBP>
        In practice, AI-suggested locators and those written by an experienced tester
        converge on the same methods. Both should reach for <code>getByRole</code> and
        <code>getByLabel</code> first. Where they differ is in the handling of edge cases.
      </KBP>

      <KBP>
        A human tester knows the application's history - which labels have changed, which
        elements have known accessibility issues, which parts of the UI are stable and
        which are in flux. An AI has none of this context unless you provide it. This is
        why the best results come from a collaboration: AI does the mechanical work of
        identifying available properties and generating the locator syntax, while the human
        applies domain knowledge to validate the choice.
      </KBP>

      <KBCode language="typescript">{`// AI tends to produce this - technically correct but the label may change
await page.getByLabel('Email').fill(email)

// A human who knows this label changes between locales might prefer
await page.getByTestId('email-input').fill(email)

// Or, if the input has a stable aria-label that won't change
await page.getByRole('textbox', { name: 'Email address' }).fill(email)`}</KBCode>

      <KBH2 id="when-to-trust">When to trust the AI and when to override it</KBH2>

      <KBP>
        Trust the AI when:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>The element has a clear, stable accessible name and the AI has used a role-based or label-based locator.</li>
        <li>The AI's explanation of its choice references the semantic properties it found in the accessibility tree.</li>
        <li>You have run the test and the locator resolves to the correct element without ambiguity.</li>
        <li>The locator survives a minor UI refactor in your next sprint without breaking.</li>
      </ul>

      <KBP>
        Override the AI when:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>The AI has used a CSS selector or XPath because no semantic property was available. The right fix is to add accessibility attributes to the element, not to accept the brittle locator.</li>
        <li>The AI's locator is ambiguous - more than one element matches.</li>
        <li>You know from experience that the accessible name the AI is relying on changes frequently.</li>
        <li>The locator works now but relies on text that will be translated or updated by a content editor.</li>
      </ul>

      <KBNote variant="purple">
        A good rule of thumb: if an AI-suggested locator cannot be explained in plain
        English - "find the button labelled 'Submit'" or "find the checkbox labelled
        'I agree to the terms'" - it is probably fragile. Resilient locators map directly
        to user-visible, semantically meaningful properties.
      </KBNote>

      <KBH2 id="improving-accessibility">Locator quality as an accessibility signal</KBH2>

      <KBP>
        A persistent pattern of the AI falling back to CSS selectors or failing to identify
        elements is a useful diagnostic. It means your application's accessibility markup is
        weak. Form fields without labels, buttons without accessible names and custom
        components without ARIA roles are all problems for screen reader users as well as
        for AI-generated locators.
      </KBP>

      <KBP>
        When the AI cannot find a good locator, the right response is not to accept the
        fragile locator it falls back to. The right response is to fix the accessibility
        issue in the application and then generate the locator again. This produces a
        better test and a more accessible application at the same time.
      </KBP>
    </>
  )
}

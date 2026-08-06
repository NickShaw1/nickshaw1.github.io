import{a as e}from"./markdown-hfXSdh9Q.js";import{t}from"./KBCode-C2513JFu.js";import{t as n}from"./KBNote-CaRhdL4n.js";import{n as r,r as i,t as a}from"./KBHeading-DROUfOXR.js";var o=e();function s(){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i,{children:`A growing category of application involves UI that is itself generated or heavily influenced by AI. Chat interfaces, AI writing assistants, content generation tools, summary panels and personalised dashboards all produce output that varies between runs. Testing these applications requires a different approach from testing deterministic UIs, because the traditional assumption - "assert that the element with this exact text is visible" - breaks when the text changes every time.`}),(0,o.jsx)(a,{id:`the-challenge`,children:`The unique challenge of testing non-deterministic output`}),(0,o.jsx)(i,{children:`Most testing asserts on exact values: the button text is "Submit", the heading says "Your account", the success message reads "Item added to cart". These assertions work because the application behaves the same way every time for the same input.`}),(0,o.jsx)(i,{children:`AI-generated content breaks this assumption. An LLM asked to "summarise this article in two sentences" produces different sentences each time. A chatbot's response to "how do I reset my password?" is semantically similar across runs but not lexically identical. An AI that rewrites product descriptions for different audiences produces content that cannot be asserted against a fixed expected value.`}),(0,o.jsx)(i,{children:`The challenge is not that the application is broken - it is working as intended. The challenge is that your test assertions need to reflect the intent of the feature rather than the exact output of any given run.`}),(0,o.jsx)(a,{id:`snapshot-strategies`,children:`Snapshot strategies for AI content`}),(0,o.jsx)(i,{children:`Traditional snapshot testing takes the exact rendered output of a component and stores it as a reference. Any change to the output - even adding a comma - fails the test. This approach is incompatible with AI-generated content.`}),(0,o.jsx)(r,{children:`Structural snapshots`}),(0,o.jsx)(i,{children:`Instead of snapshotting the content, snapshot the structure. If an AI generates a product description, the structure should be consistent even if the content varies: a heading, one or two paragraphs, a list of features. You can assert on the presence and structure of these elements without asserting on their exact text.`}),(0,o.jsx)(t,{language:`typescript`,children:`test('AI product description has the expected structure', async ({ page }) => {
  await page.goto('/products/42')
  await page.getByRole('button', { name: 'Generate description' }).click()

  // Wait for the AI response to appear
  const description = page.getByTestId('ai-product-description')
  await expect(description).toBeVisible()

  // Assert on structure, not content
  await expect(description.getByRole('heading', { level: 2 })).toBeVisible()
  await expect(description.locator('p')).toHaveCount(2)
  await expect(description).not.toBeEmpty()
  // The description should be a reasonable length
  const text = await description.innerText()
  expect(text.length).toBeGreaterThan(50)
  expect(text.length).toBeLessThan(2000)
})`}),(0,o.jsx)(r,{children:`ARIA snapshot testing`}),(0,o.jsx)(i,{children:`Playwright v1.49 introduced ARIA snapshots: a way to capture the accessibility tree of an element and assert on it. ARIA snapshots are more flexible than pixel or DOM snapshots because they describe the semantic structure rather than the exact visual state. For AI-generated content this is useful: you can assert that a response contains a paragraph with some text without specifying what the text must be.`}),(0,o.jsx)(t,{language:`typescript`,children:`test('chat response has expected structure', async ({ page }) => {
  await page.goto('/chat')
  const input = page.getByRole('textbox', { name: 'Message' })
  await input.fill('How do I reset my password?')
  await page.getByRole('button', { name: 'Send' }).click()

  const response = page.getByTestId('assistant-response')
  await expect(response).toBeVisible({ timeout: 30_000 })

  // Assert on structure without specifying exact text
  await expect(response).toMatchAriaSnapshot(\`
    - paragraph: /reset/i
  \`)
})`}),(0,o.jsx)(a,{id:`testing-llm-outputs`,children:`Testing LLM outputs without brittle assertions`}),(0,o.jsx)(i,{children:`For applications that display LLM output to users, there are several assertion strategies that are more robust than exact text matching.`}),(0,o.jsx)(r,{children:`Presence and non-emptiness`}),(0,o.jsx)(t,{language:`typescript`,children:`// Assert the response appeared and has content
await expect(page.getByTestId('ai-response')).toBeVisible()
await expect(page.getByTestId('ai-response')).not.toBeEmpty()

// Assert it is not an error message
await expect(page.getByTestId('ai-response')).not.toContainText('error')
await expect(page.getByTestId('ai-response')).not.toContainText('sorry, I cannot')`}),(0,o.jsx)(r,{children:`Regex matching for semantic content`}),(0,o.jsx)(t,{language:`typescript`,children:`// The response should mention the concept we asked about
const response = page.getByTestId('ai-response')
await expect(response).toContainText(/password/i)

// Date formatting should be consistent even if the content varies
const date = page.getByTestId('ai-generated-date')
await expect(date).toContainText(/\\d{1,2} \\w+ \\d{4}/)`}),(0,o.jsx)(r,{children:`Length bounds`}),(0,o.jsx)(t,{language:`typescript`,children:`const el = page.getByTestId('ai-response')
const responseText = await el.innerText()

// A summary should not be trivially short or unexpectedly long
expect(responseText.trim().length).toBeGreaterThan(20)
expect(responseText.trim().length).toBeLessThan(5000)`}),(0,o.jsx)(r,{children:`Using AI to evaluate AI output`}),(0,o.jsx)(i,{children:`For more sophisticated evaluation of LLM output quality, some teams use a separate LLM call as part of the test to evaluate whether the response meets the expected standard. Rather than asserting on exact text, you ask a second model: "Does this response correctly answer the question 'How do I reset my password?' with actionable steps? Answer yes or no."`}),(0,o.jsx)(n,{variant:`blue`,children:`LLM-based evaluation in tests is powerful but adds complexity and cost. Use it for high-value acceptance criteria on features where the quality of the AI output is the core product value, not for routine structural checks.`}),(0,o.jsx)(a,{id:`structural-vs-content-assertions`,children:`Separating structural assertions from content assertions`}),(0,o.jsx)(i,{children:`A practical framework for testing AI-generated UIs is to separate what you are testing into two categories and write different assertions for each.`}),(0,o.jsx)(r,{children:`Structural assertions - always use these`}),(0,o.jsx)(i,{children:`Structural assertions check properties that should be consistent regardless of what the AI generates:`}),(0,o.jsxs)(`ul`,{className:`my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed`,children:[(0,o.jsx)(`li`,{children:`The response appeared within an acceptable time.`}),(0,o.jsx)(`li`,{children:`The response is non-empty and within reasonable length bounds.`}),(0,o.jsx)(`li`,{children:`The expected UI elements (headings, paragraphs, lists) are present.`}),(0,o.jsx)(`li`,{children:`The UI is in the correct state (loading spinner is gone, error state is absent).`}),(0,o.jsx)(`li`,{children:`Accessibility structure is intact - elements have the correct roles and labels.`})]}),(0,o.jsx)(r,{children:`Content assertions - use sparingly and carefully`}),(0,o.jsx)(i,{children:`Content assertions check what the AI actually said. Use these only when the content must contain specific information:`}),(0,o.jsxs)(`ul`,{className:`my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed`,children:[(0,o.jsx)(`li`,{children:`For safety-critical features: the response must not contain prohibited content.`}),(0,o.jsx)(`li`,{children:`For factual features: the response must reference the data the user provided.`}),(0,o.jsx)(`li`,{children:`For format requirements: the response must include a certain structural element (a link, a code block).`})]}),(0,o.jsx)(t,{language:`typescript`,children:`test.describe('AI chat feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/chat')
  })

  // Structural - always test these
  test('shows a response to any message', async ({ page }) => {
    await page.getByRole('textbox').fill('hello')
    await page.getByRole('button', { name: 'Send' }).click()
    const response = page.getByTestId('assistant-message').last()
    await expect(response).toBeVisible({ timeout: 15_000 })
    await expect(response).not.toBeEmpty()
  })

  test('shows a loading indicator while generating', async ({ page }) => {
    await page.getByRole('textbox').fill('Tell me about testing')
    await page.getByRole('button', { name: 'Send' }).click()
    const indicator = page.getByTestId('loading-indicator')
    await expect(indicator).toBeVisible()
    await expect(indicator).not.toBeVisible({ timeout: 30_000 })
  })

  // Content - only when the content is specifically required
  test('references the topic in the response', async ({ page }) => {
    await page.getByRole('textbox').fill('How do I reset my password?')
    await page.getByRole('button', { name: 'Send' }).click()
    const response = page.getByTestId('assistant-message').last()
    await expect(response).toBeVisible({ timeout: 15_000 })
    // Mention the topic - not the exact phrasing
    await expect(response).toContainText(/password/i)
  })
})`}),(0,o.jsx)(a,{id:`testing-the-feature-not-the-model`,children:`Testing the feature, not the model`}),(0,o.jsx)(i,{children:`A key mindset shift for testing AI-powered features: you are testing your product's behaviour, not the LLM's output quality. Your tests should verify that:`}),(0,o.jsxs)(`ul`,{className:`my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed`,children:[(0,o.jsx)(`li`,{children:`The feature works - the user can send a message and receive a response.`}),(0,o.jsx)(`li`,{children:`The integration is correct - the response is displayed in the right place, the loading state behaves correctly and errors are handled.`}),(0,o.jsx)(`li`,{children:`The constraints are enforced - rate limiting, content moderation and length limits work as intended.`})]}),(0,o.jsx)(i,{children:`The quality of the LLM's responses is a separate concern, evaluated through different means - user feedback, offline evaluation datasets and dedicated LLM evaluation tooling. Your Playwright tests are not the right tool for evaluating whether the AI sounds natural or gives good advice.`})]})}export{s as default};
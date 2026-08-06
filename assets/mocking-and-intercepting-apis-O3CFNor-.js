import{a as e}from"./markdown-hfXSdh9Q.js";import{t}from"./KBCode-C2513JFu.js";import{t as n}from"./KBNote-CaRhdL4n.js";import{n as r,r as i,t as a}from"./KBHeading-DROUfOXR.js";import{t as o}from"./KBVideo-CvFC_4kB.js";var s=e();function c(){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o,{videoId:`kvGszYAYQ6M`,title:`How to test dynamic content in Playwright with API mocking`,caption:`Mocking and intercepting API calls in Playwright browser tests`}),(0,s.jsxs)(i,{children:[`The previous articles covered using Playwright's `,(0,s.jsx)(`code`,{children:`request`}),` fixture to test an API directly. This article covers the complementary capability: intercepting the HTTP requests that your `,(0,s.jsx)(`em`,{children:`application`}),` makes in the browser and controlling what the server appears to return. This is useful for testing how your UI behaves under specific conditions without depending on a live backend to reproduce them.`]}),(0,s.jsx)(a,{id:`page-route`,children:`page.route() for mocking`}),(0,s.jsxs)(i,{children:[(0,s.jsx)(`code`,{children:`page.route()`}),` registers an intercept on requests that match a URL pattern. When a matching request is made, Playwright calls your handler function instead of letting the request reach the network. You can return a mock response, modify a real response or abort the request entirely.`]}),(0,s.jsx)(r,{children:`Returning a mock response`}),(0,s.jsx)(t,{language:`typescript`,children:`test('shows a loading error when the API is unavailable', async ({ page }) => {
  // Intercept the API call and return a 503
  await page.route('**/api/todos', async (route) => {
    await route.fulfill({
      status: 503,
      contentType: 'application/json',
      body: JSON.stringify({ message: 'Service unavailable' }),
    })
  })

  await page.goto('/todos')
  await expect(page.getByText('Something went wrong')).toBeVisible()
})

test('renders a list of to-dos from a mocked response', async ({ page }) => {
  await page.route('**/api/todos', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify([
        { id: 1, title: 'First item', status: 'pending' },
        { id: 2, title: 'Second item', status: 'complete' },
      ]),
    })
  })

  await page.goto('/todos')

  await expect(page.getByText('First item')).toBeVisible()
  await expect(page.getByText('Second item')).toBeVisible()
})`}),(0,s.jsx)(r,{children:`URL patterns`}),(0,s.jsxs)(i,{children:[`The URL pattern in `,(0,s.jsx)(`code`,{children:`page.route()`}),` can be a string with a glob pattern, a regular expression or a predicate function. The glob syntax supports `,(0,s.jsx)(`code`,{children:`*`}),`to match within a path segment and `,(0,s.jsx)(`code`,{children:`**`}),` to match across segments:`]}),(0,s.jsx)(t,{language:`typescript`,children:`// Match any URL containing /api/todos anywhere in the path
await page.route('**/api/todos', handler)

// Match a specific URL exactly
await page.route('https://api.example.com/todos', handler)

// Match using a regular expression
await page.route(/\\/api\\/todos(\\/\\d+)?$/, handler)

// Match using a predicate function
await page.route(
  (url) => url.pathname.startsWith('/api/') && url.searchParams.has('filter'),
  handler
)`}),(0,s.jsx)(r,{children:`Aborting requests`}),(0,s.jsx)(t,{language:`typescript`,children:`// Simulate a network failure
await page.route('**/api/todos', async (route) => {
  await route.abort('failed')
})`}),(0,s.jsx)(r,{children:`Modifying a real response`}),(0,s.jsx)(i,{children:`Rather than replacing the response entirely, you can fetch the real response from the server and then modify it before returning it to the page. This is useful for adding edge-case data to a real response without fully mocking the endpoint:`}),(0,s.jsx)(t,{language:`typescript`,children:`await page.route('**/api/todos', async (route) => {
  // Let the real request happen
  const response = await route.fetch()
  const todos = await response.json()

  // Add an extra item the real API does not return
  todos.push({ id: 999, title: 'Injected test item', status: 'pending' })

  // Return the modified response to the page
  await route.fulfill({ response, json: todos })
})`}),(0,s.jsx)(a,{id:`route-from-har`,children:`page.routeFromHAR()`}),(0,s.jsx)(i,{children:`A HAR file (HTTP Archive) is a JSON file that records real network traffic: every request made and every response received during a browser session. Playwright can record a HAR file and then replay it in tests, returning the recorded responses instead of making real network calls.`}),(0,s.jsx)(i,{children:`This is useful when your application depends on a third-party API that you cannot control in tests. You capture a real session once, save it as a HAR file and commit it to your repository. Future test runs replay the recorded traffic deterministically without hitting the third-party server.`}),(0,s.jsx)(r,{children:`Recording a HAR file`}),(0,s.jsx)(t,{language:`typescript`,children:`test('record HAR for later replay', async ({ page }) => {
  // Start recording - all network traffic will be saved to the HAR file
  await page.routeFromHAR('./hars/api-responses.har', { update: true })

  await page.goto('/todos')
  // Interact with the page to capture the requests you need
  await page.getByRole('button', { name: 'Load more' }).click()

  // The HAR file is written when the test completes
})`}),(0,s.jsx)(r,{children:`Replaying a HAR file`}),(0,s.jsx)(t,{language:`typescript`,children:`test('renders correctly with recorded responses', async ({ page }) => {
  // Replay the recorded traffic instead of making real requests
  await page.routeFromHAR('./hars/api-responses.har', {
    update: false,
    // Only intercept requests matching this pattern
    url: '**/api/**',
    // Decide what to do with requests that are not in the HAR
    notFound: 'fallback', // or 'abort'
  })

  await page.goto('/todos')
  await expect(page.getByRole('list')).toBeVisible()
})`}),(0,s.jsx)(n,{variant:`warning`,children:`HAR files contain real response data including authentication tokens, cookies and potentially sensitive user data. Review HAR files before committing them to source control and use a dedicated test account when recording them.`}),(0,s.jsx)(a,{id:`when-to-mock`,children:`When mocking is appropriate`}),(0,s.jsx)(i,{children:`Mocking is appropriate in the following situations:`}),(0,s.jsxs)(`ul`,{className:`my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed`,children:[(0,s.jsxs)(`li`,{children:[(0,s.jsx)(`strong`,{className:`text-text-primary`,children:`Testing error states`}),` - It is impractical to make a real backend return a 503 or a network timeout on demand. Mocking is the only reliable way to test how your UI handles these conditions.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(`strong`,{className:`text-text-primary`,children:`Third-party dependencies`}),` - If your application calls a payment gateway, a mapping service or an external API, you cannot control what it returns in a test. Mocking or recording with HAR gives you control.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(`strong`,{className:`text-text-primary`,children:`Slow or rate-limited APIs`}),` - If calling a real API adds several seconds to each test or risks hitting rate limits in CI, mocking eliminates both problems.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(`strong`,{className:`text-text-primary`,children:`Specific data scenarios`}),` - Some data states are hard to create through the application itself. Mocking lets you return exactly the payload shape you need to exercise a particular UI branch.`]})]}),(0,s.jsx)(a,{id:`when-not-to-mock`,children:`Pitfalls of over-mocking`}),(0,s.jsx)(i,{children:`Mocking carries a significant risk: your mocks can diverge from reality. If you mock an API response and the API later changes its schema, your tests will continue to pass against the stale mock while the real integration is broken.`}),(0,s.jsx)(i,{children:`Avoid mocking in these situations:`}),(0,s.jsxs)(`ul`,{className:`my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed`,children:[(0,s.jsxs)(`li`,{children:[(0,s.jsx)(`strong`,{className:`text-text-primary`,children:`Your own backend`}),` - If you control the API, test against a real instance in a test environment. Mocking your own backend defeats the purpose of integration testing and removes all confidence that the front end and back end actually work together.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(`strong`,{className:`text-text-primary`,children:`Happy path coverage`}),` - Use mocks to test exceptional conditions, not the normal flow. Your primary test coverage should run against real services wherever possible.`]}),(0,s.jsxs)(`li`,{children:[(0,s.jsx)(`strong`,{className:`text-text-primary`,children:`Contract verification`}),` - A mock does not verify that the real API behaves as expected. Use dedicated API tests against the real endpoint for that.`]})]}),(0,s.jsx)(n,{variant:`green`,children:`A practical division: use real requests for your API tests and for the primary happy-path browser tests, and use mocking for the browser tests that verify error handling, loading states and edge-case UI behaviour that would be impractical to trigger reliably against a real backend.`}),(0,s.jsx)(a,{id:`route-in-beforeeach`,children:`Registering routes in beforeEach`}),(0,s.jsxs)(i,{children:[`If multiple tests in a describe block need the same mock, register it in`,(0,s.jsx)(`code`,{children:`beforeEach`}),` rather than repeating it in every test:`]}),(0,s.jsx)(t,{language:`typescript`,children:`test.describe('to-do list with mocked API', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/todos', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          { id: 1, title: 'Buy milk', status: 'pending' },
          { id: 2, title: 'Walk dog', status: 'complete' },
        ]),
      })
    })
  })

  test('shows all items', async ({ page }) => {
    await page.goto('/todos')
    await expect(page.getByText('Buy milk')).toBeVisible()
    await expect(page.getByText('Walk dog')).toBeVisible()
  })

  test('shows pending count', async ({ page }) => {
    await page.goto('/todos')
    await expect(page.getByText('1 pending')).toBeVisible()
  })
})`}),(0,s.jsx)(a,{id:`unrouting`,children:`Removing route handlers`}),(0,s.jsxs)(i,{children:[`Route handlers registered with `,(0,s.jsx)(`code`,{children:`page.route()`}),` persist for the lifetime of the page. To remove a handler partway through a test, use `,(0,s.jsx)(`code`,{children:`page.unroute()`}),`with the same pattern:`]}),(0,s.jsx)(t,{language:`typescript`,children:`import type { Route } from '@playwright/test'

test('shows error then recovers', async ({ page }) => {
  const handler = async (route: Route) => {
    await route.fulfill({ status: 503 })
  }

  // First request returns an error
  await page.route('**/api/todos', handler)
  await page.goto('/todos')
  await expect(page.getByText('Something went wrong')).toBeVisible()

  // Remove the mock - subsequent requests go to the real server
  await page.unroute('**/api/todos', handler)
  await page.getByRole('button', { name: 'Retry' }).click()
  await expect(page.getByRole('list')).toBeVisible()
})`})]})}export{c as default};
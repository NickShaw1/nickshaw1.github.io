import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBCode from '../../../components/kb/KBCode'
import KBVideo from '../../../components/kb/KBVideo'

export default function MockingAndInterceptingApis() {
  return (
    <>
      <KBVideo
        videoId="kvGszYAYQ6M"
        title="How to test dynamic content in Playwright with API mocking"
        caption="Mocking and intercepting API calls in Playwright browser tests"
      />

      <KBP>
        The previous articles covered using Playwright's <code>request</code> fixture to
        test an API directly. This article covers the complementary capability: intercepting
        the HTTP requests that your <em>application</em> makes in the browser and controlling
        what the server appears to return. This is useful for testing how your UI behaves
        under specific conditions without depending on a live backend to reproduce them.
      </KBP>

      <KBH2 id="page-route">page.route() for mocking</KBH2>

      <KBP>
        <code>page.route()</code> registers an intercept on requests that match a URL
        pattern. When a matching request is made, Playwright calls your handler function
        instead of letting the request reach the network. You can return a mock response,
        modify a real response or abort the request entirely.
      </KBP>

      <KBH3>Returning a mock response</KBH3>

      <KBCode language="typescript">{`test('shows a loading error when the API is unavailable', async ({ page }) => {
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
})`}</KBCode>

      <KBH3>URL patterns</KBH3>

      <KBP>
        The URL pattern in <code>page.route()</code> can be a string with a glob pattern, a
        regular expression or a predicate function. The glob syntax supports <code>*</code>
        to match within a path segment and <code>**</code> to match across segments:
      </KBP>

      <KBCode language="typescript">{`// Match any URL containing /api/todos anywhere in the path
await page.route('**/api/todos', handler)

// Match a specific URL exactly
await page.route('https://api.example.com/todos', handler)

// Match using a regular expression
await page.route(/\\/api\\/todos(\\/\\d+)?$/, handler)

// Match using a predicate function
await page.route(
  (url) => url.pathname.startsWith('/api/') && url.searchParams.has('filter'),
  handler
)`}</KBCode>

      <KBH3>Aborting requests</KBH3>

      <KBCode language="typescript">{`// Simulate a network failure
await page.route('**/api/todos', async (route) => {
  await route.abort('failed')
})`}</KBCode>

      <KBH3>Modifying a real response</KBH3>

      <KBP>
        Rather than replacing the response entirely, you can fetch the real response from the
        server and then modify it before returning it to the page. This is useful for adding
        edge-case data to a real response without fully mocking the endpoint:
      </KBP>

      <KBCode language="typescript">{`await page.route('**/api/todos', async (route) => {
  // Let the real request happen
  const response = await route.fetch()
  const todos = await response.json()

  // Add an extra item the real API does not return
  todos.push({ id: 999, title: 'Injected test item', status: 'pending' })

  // Return the modified response to the page
  await route.fulfill({ response, json: todos })
})`}</KBCode>

      <KBH2 id="route-from-har">page.routeFromHAR()</KBH2>

      <KBP>
        A HAR file (HTTP Archive) is a JSON file that records real network traffic: every
        request made and every response received during a browser session. Playwright can
        record a HAR file and then replay it in tests, returning the recorded responses
        instead of making real network calls.
      </KBP>

      <KBP>
        This is useful when your application depends on a third-party API that you cannot
        control in tests. You capture a real session once, save it as a HAR file and commit
        it to your repository. Future test runs replay the recorded traffic deterministically
        without hitting the third-party server.
      </KBP>

      <KBH3>Recording a HAR file</KBH3>

      <KBCode language="typescript">{`test('record HAR for later replay', async ({ page }) => {
  // Start recording - all network traffic will be saved to the HAR file
  await page.routeFromHAR('./hars/api-responses.har', { update: true })

  await page.goto('/todos')
  // Interact with the page to capture the requests you need
  await page.getByRole('button', { name: 'Load more' }).click()

  // The HAR file is written when the test completes
})`}</KBCode>

      <KBH3>Replaying a HAR file</KBH3>

      <KBCode language="typescript">{`test('renders correctly with recorded responses', async ({ page }) => {
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
})`}</KBCode>

      <KBNote variant="warning">
        HAR files contain real response data including authentication tokens, cookies and
        potentially sensitive user data. Review HAR files before committing them to source
        control and use a dedicated test account when recording them.
      </KBNote>

      <KBH2 id="when-to-mock">When mocking is appropriate</KBH2>

      <KBP>
        Mocking is appropriate in the following situations:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li><strong className="text-text-primary">Testing error states</strong> - It is impractical to make a real backend return a 503 or a network timeout on demand. Mocking is the only reliable way to test how your UI handles these conditions.</li>
        <li><strong className="text-text-primary">Third-party dependencies</strong> - If your application calls a payment gateway, a mapping service or an external API, you cannot control what it returns in a test. Mocking or recording with HAR gives you control.</li>
        <li><strong className="text-text-primary">Slow or rate-limited APIs</strong> - If calling a real API adds several seconds to each test or risks hitting rate limits in CI, mocking eliminates both problems.</li>
        <li><strong className="text-text-primary">Specific data scenarios</strong> - Some data states are hard to create through the application itself. Mocking lets you return exactly the payload shape you need to exercise a particular UI branch.</li>
      </ul>

      <KBH2 id="when-not-to-mock">Pitfalls of over-mocking</KBH2>

      <KBP>
        Mocking carries a significant risk: your mocks can diverge from reality. If you mock
        an API response and the API later changes its schema, your tests will continue to
        pass against the stale mock while the real integration is broken.
      </KBP>

      <KBP>
        Avoid mocking in these situations:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li><strong className="text-text-primary">Your own backend</strong> - If you control the API, test against a real instance in a test environment. Mocking your own backend defeats the purpose of integration testing and removes all confidence that the front end and back end actually work together.</li>
        <li><strong className="text-text-primary">Happy path coverage</strong> - Use mocks to test exceptional conditions, not the normal flow. Your primary test coverage should run against real services wherever possible.</li>
        <li><strong className="text-text-primary">Contract verification</strong> - A mock does not verify that the real API behaves as expected. Use dedicated API tests against the real endpoint for that.</li>
      </ul>

      <KBNote variant="green">
        A practical division: use real requests for your API tests and for the primary
        happy-path browser tests, and use mocking for the browser tests that verify error
        handling, loading states and edge-case UI behaviour that would be impractical to
        trigger reliably against a real backend.
      </KBNote>

      <KBH2 id="route-in-beforeeach">Registering routes in beforeEach</KBH2>

      <KBP>
        If multiple tests in a describe block need the same mock, register it in
        <code>beforeEach</code> rather than repeating it in every test:
      </KBP>

      <KBCode language="typescript">{`test.describe('to-do list with mocked API', () => {
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
})`}</KBCode>

      <KBH2 id="unrouting">Removing route handlers</KBH2>

      <KBP>
        Route handlers registered with <code>page.route()</code> persist for the lifetime of
        the page. To remove a handler partway through a test, use <code>page.unroute()</code>
        with the same pattern:
      </KBP>

      <KBCode language="typescript">{`import type { Route } from '@playwright/test'

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
})`}</KBCode>
    </>
  )
}

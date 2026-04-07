import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBCode from '../../../components/kb/KBCode'

export default function WhatIsApiTesting() {
  return (
    <>
      <KBP>
        Playwright is known primarily as a browser automation framework, but it also ships a
        first-class API for making HTTP requests directly. This capability is built into the
        framework through a class called <code>APIRequestContext</code>, which lets you send
        GET, POST, PUT, DELETE and other requests without opening a browser at all. The same
        test runner, the same configuration file, the same assertion library and the same CI
        pipeline that serve your end-to-end tests also serve your API tests.
      </KBP>

      <KBP>
        This guide covers API testing in Playwright from first principles. By the end of it
        you will know how to make requests, assert on responses, handle authentication, set up
        and tear down test data programmatically, mock and intercept network calls and
        structure a full REST API test suite.
      </KBP>

      <KBH2 id="what-is-api-testing">What API testing is</KBH2>

      <KBP>
        API testing means verifying the behaviour of an HTTP interface directly. Rather than
        driving a browser to a page and clicking through a UI, you send an HTTP request to an
        endpoint and assert that the response has the correct status code, the correct body
        shape and the correct data. The application under test is the server, not the rendered
        page.
      </KBP>

      <KBP>
        A typical API test checks one or more of the following:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>The response status code matches the expectation (200, 201, 400, 404 and so on).</li>
        <li>The response body contains the expected fields and values.</li>
        <li>The response conforms to a defined schema.</li>
        <li>The correct HTTP headers are returned.</li>
        <li>Creating, reading, updating and deleting a resource all work correctly.</li>
        <li>The API returns appropriate error responses for invalid input.</li>
        <li>Authentication and authorisation are enforced correctly.</li>
      </ul>

      <KBP>
        API tests sit at the integration layer of the testing pyramid. They are faster than
        full end-to-end browser tests because there is no browser to launch and no rendering
        to wait for, but they provide more confidence than unit tests because they test the
        actual HTTP interface your clients will use.
      </KBP>

      <KBH2 id="what-is-apirequestcontext">What APIRequestContext does</KBH2>

      <KBP>
        <code>APIRequestContext</code> is the Playwright class that handles HTTP communication.
        It is a full-featured HTTP client with support for all standard HTTP methods, custom
        headers, query parameters, request bodies, cookies, authentication and response
        inspection. It is available in two ways inside Playwright tests.
      </KBP>

      <KBP>
        The first is through the <code>request</code> fixture, which is injected automatically
        into every test function just like <code>page</code> or <code>context</code>. You do
        not need to import or construct anything to use it:
      </KBP>

      <KBCode language="typescript">{`import { test, expect } from '@playwright/test'

test('GET /users returns a list', async ({ request }) => {
  const response = await request.get('https://api.example.com/users')
  expect(response.status()).toBe(200)
  const body = await response.json()
  expect(body).toHaveLength(3)
})`}</KBCode>

      <KBP>
        The second is through <code>playwright.request.newContext()</code>, which gives you
        more control over the context configuration. This is useful for global setup scripts
        where you do not have access to a test fixture, or when you need multiple contexts
        with different base URLs or authentication state in the same test.
      </KBP>

      <KBCode language="typescript">{`import { request } from '@playwright/test'

async function globalSetup() {
  const apiContext = await request.newContext({
    baseURL: 'https://api.example.com',
    extraHTTPHeaders: {
      'Accept': 'application/json',
    },
  })

  const response = await apiContext.post('/auth/token', {
    data: { username: 'admin', password: process.env.ADMIN_PASSWORD },
  })

  const { token } = await response.json()
  process.env.API_TOKEN = token
  await apiContext.dispose()
}`}</KBCode>

      <KBNote variant="blue">
        Both the <code>request</code> fixture and <code>request.newContext()</code> use the
        same underlying <code>APIRequestContext</code> class. The fixture is the right choice
        for most tests. The manual context is the right choice when you need it in setup or
        teardown scripts that run outside of individual test functions.
      </KBNote>

      <KBH2 id="api-vs-e2e">API testing vs E2E browser testing</KBH2>

      <KBP>
        End-to-end browser tests and API tests are both forms of integration testing, but
        they operate at different levels and have different trade-offs.
      </KBP>

      <KBH3>Speed</KBH3>

      <KBP>
        Browser tests launch a browser, load a page, parse HTML, execute JavaScript, render
        CSS and wait for the DOM to settle. A typical browser test takes anywhere from one to
        several seconds per test. An API test does none of this. It opens an HTTP connection,
        sends a request, receives a response and asserts on it. Fast API tests run in tens of
        milliseconds. This makes a significant difference at scale: a suite of five hundred
        API tests may complete faster than fifty browser tests.
      </KBP>

      <KBH3>Coupling to the UI</KBH3>

      <KBP>
        Browser tests couple your test suite to the structure of your user interface. When a
        developer renames a button, moves a form or refactors a page layout, browser tests
        break even if the underlying behaviour has not changed. API tests are decoupled from
        the UI entirely. They break only when the API contract changes, which is usually a
        more deliberate and controlled event.
      </KBP>

      <KBH3>What each type misses</KBH3>

      <KBP>
        API tests cannot verify that the UI renders data correctly. They cannot check that a
        form submission sends the right payload, that a loading state appears while a request
        is in flight or that an error message is displayed when the server returns a 422. For
        any of that, you need a browser test.
      </KBP>

      <KBP>
        Browser tests can miss problems in the API itself. If the UI constructs a request
        incorrectly but the server happens to be lenient, a browser test may pass even though
        the API contract is being violated. A dedicated API test against the raw endpoint
        would catch this.
      </KBP>

      <KBH2 id="when-to-use-each">When to use API tests vs E2E tests</KBH2>

      <KBP>
        The two approaches complement each other and work best together. A practical guideline
        is to test the contract and the logic at the API layer, and to test the user experience
        at the browser layer.
      </KBP>

      <KBP>
        Use API tests when you want to:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>Verify that all CRUD operations on a resource work correctly.</li>
        <li>Check authentication and authorisation rules across multiple roles.</li>
        <li>Test error responses, edge cases and boundary conditions exhaustively.</li>
        <li>Validate that the response schema matches the documented contract.</li>
        <li>Set up or tear down test data before and after browser tests.</li>
        <li>Cover a large number of scenarios quickly without the overhead of a browser.</li>
      </ul>

      <KBP>
        Use E2E browser tests when you want to:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>Verify that a user can complete a critical workflow from start to finish.</li>
        <li>Check that UI state updates correctly in response to API calls.</li>
        <li>Test client-side validation, animations, focus management and accessibility.</li>
        <li>Verify behaviour that depends on browser APIs like cookies, localStorage or service workers.</li>
        <li>Catch visual regressions in rendered output.</li>
      </ul>

      <KBNote variant="green">
        One of the most powerful patterns in Playwright is using the <code>request</code>
        fixture inside a browser test. You can create a user account and log in via the API,
        then use that session in a browser test - skipping the login UI entirely and making
        your browser tests significantly faster.
      </KBNote>

      <KBH2 id="playwright-advantage">The Playwright advantage for API testing</KBH2>

      <KBP>
        Dedicated API testing tools like Postman, Insomnia and REST-assured are excellent in
        their own right, but Playwright's API client has a distinct advantage: it lives inside
        your test suite. There is no separate tool to learn, no separate configuration to
        maintain and no import/export step required when you want to use API calls alongside
        browser interactions.
      </KBP>

      <KBP>
        Because <code>APIRequestContext</code> is part of the Playwright test runner, it
        participates fully in the fixture system. You can create a custom fixture that
        authenticates against your API and injects an authenticated client into every test
        that needs it, exactly as you would with a custom <code>page</code> fixture. The
        request context also shares state with the browser context by default, which means
        that cookies set via the API are available to the browser and vice versa.
      </KBP>

      <KBP>
        The <code>request</code> fixture also integrates with Playwright's reporting. Requests
        made through it appear in Trace Viewer, which gives you a full picture of what HTTP
        calls were made during a test failure. This is not available when using a standalone
        API testing tool alongside Playwright.
      </KBP>

      <KBH2 id="what-this-guide-covers">What this guide covers</KBH2>

      <KBP>
        The articles in this section build on each other from first principles. The next
        article walks through making your first API requests using every HTTP method and
        reading response data. Subsequent articles cover authentication, common API testing
        patterns, mocking and intercepting network calls, and a complete worked example of a
        full CRUD REST API test suite.
      </KBP>

      <KBP>
        If you are new to Playwright entirely, work through the main Playwright guide before
        starting here. This section assumes familiarity with the basic concepts of tests,
        fixtures and assertions.
      </KBP>
    </>
  )
}

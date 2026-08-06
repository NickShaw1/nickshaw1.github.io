import{a as e}from"./markdown-hfXSdh9Q.js";import{t}from"./KBCode-C2513JFu.js";import{t as n}from"./KBNote-CaRhdL4n.js";import{n as r,r as i,t as a}from"./KBHeading-DROUfOXR.js";var o=e();function s(){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i,{children:`Most real-world APIs require authentication. Without it, requests return 401 or 403 responses and your tests cannot exercise the parts of the system that matter. This article covers the authentication strategies you will encounter most often: bearer tokens, API keys, cookies and custom headers. It also covers how to avoid repeating authentication logic in every test by sharing state across a test file or an entire suite.`}),(0,o.jsx)(a,{id:`bearer-tokens`,children:`Bearer tokens`}),(0,o.jsxs)(i,{children:[`Bearer token authentication is the most common pattern in modern REST APIs. After a successful login, the API returns a token. You include that token in an`,(0,o.jsx)(`code`,{children:`Authorization`}),` header on every subsequent request:`]}),(0,o.jsx)(t,{language:`typescript`,children:`test('creates a to-do item when authenticated', async ({ request }) => {
  // Step 1: authenticate and get a token
  const loginResponse = await request.post('/auth/login', {
    data: { username: 'testuser', password: process.env.TEST_PASSWORD },
  })
  expect(loginResponse.status()).toBe(200)
  const { token } = await loginResponse.json()

  // Step 2: use the token on subsequent requests
  const createResponse = await request.post('/todos', {
    data: { title: 'Authenticated request' },
    headers: {
      'Authorization': \`Bearer \${token}\`,
    },
  })
  expect(createResponse.status()).toBe(201)
})`}),(0,o.jsx)(i,{children:`Repeating the login step inside every test is wasteful. The sections below cover how to authenticate once and reuse that state across all tests in a file.`}),(0,o.jsx)(a,{id:`api-keys`,children:`API keys`}),(0,o.jsxs)(i,{children:[`Some APIs use a static API key rather than a session token. The key is typically passed in a header whose name is defined by the API - common names include`,(0,o.jsx)(`code`,{children:`X-Api-Key`}),`, `,(0,o.jsx)(`code`,{children:`Authorization`}),` and `,(0,o.jsx)(`code`,{children:`Api-Key`}),`:`]}),(0,o.jsx)(t,{language:`typescript`,children:`const response = await request.get('/data', {
  headers: {
    'X-Api-Key': process.env.API_KEY!,
  },
})`}),(0,o.jsxs)(i,{children:[`For API keys that apply to every request in your test suite, set them in`,(0,o.jsx)(`code`,{children:`extraHTTPHeaders`}),` in your Playwright config. This saves you from repeating the header on every call:`]}),(0,o.jsx)(t,{language:`typescript`,children:`// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  use: {
    baseURL: 'https://api.example.com',
    extraHTTPHeaders: {
      'X-Api-Key': process.env.API_KEY!,
      'Accept': 'application/json',
    },
  },
})`}),(0,o.jsxs)(n,{variant:`warning`,children:[`Never commit API keys, passwords or tokens to source control. Store them in environment variables and load them at runtime using `,(0,o.jsx)(`code`,{children:`process.env`}),`. Use a`,(0,o.jsx)(`code`,{children:`.env`}),` file locally and CI secrets in your pipeline.`]}),(0,o.jsx)(a,{id:`cookies`,children:`Setting cookies`}),(0,o.jsxs)(i,{children:[`Some APIs use session cookies rather than tokens. You can set cookies on an`,(0,o.jsx)(`code`,{children:`APIRequestContext`}),` the same way you set them on a browser context: by making a login request that sets cookies in the response, which the context stores and sends automatically on subsequent requests.`]}),(0,o.jsx)(t,{language:`typescript`,children:`test('cookie-based session', async ({ request }) => {
  // The login endpoint sets a session cookie in the response
  const loginResponse = await request.post('/auth/session', {
    data: { username: 'testuser', password: process.env.TEST_PASSWORD },
  })
  expect(loginResponse.status()).toBe(200)

  // Subsequent requests automatically include the session cookie
  const profileResponse = await request.get('/me')
  expect(profileResponse.status()).toBe(200)
})`}),(0,o.jsxs)(i,{children:[`You can also set cookies explicitly using `,(0,o.jsx)(`code`,{children:`storageState`}),` or by passing them as request headers:`]}),(0,o.jsx)(t,{language:`typescript`,children:`const response = await request.get('/dashboard', {
  headers: {
    'Cookie': 'session_id=abc123; user_id=42',
  },
})`}),(0,o.jsx)(a,{id:`reusing-auth-state`,children:`Reusing auth state across tests`}),(0,o.jsxs)(i,{children:[`The most common approach to sharing authentication state is to authenticate in a`,(0,o.jsx)(`code`,{children:`beforeAll`}),` block, store the token in a variable scoped to the`,(0,o.jsx)(`code`,{children:`describe`}),` block and use it in every test. Because `,(0,o.jsx)(`code`,{children:`beforeAll`}),`runs once before any test in the block, you pay the cost of authentication only once:`]}),(0,o.jsx)(t,{language:`typescript`,children:`import { test, expect } from '@playwright/test'

test.describe('authenticated API tests', () => {
  let authToken: string

  test.beforeAll(async ({ request }) => {
    const response = await request.post('/auth/login', {
      data: {
        username: process.env.TEST_USER!,
        password: process.env.TEST_PASSWORD!,
      },
    })
    expect(response.status()).toBe(200)
    const body = await response.json()
    authToken = body.token
  })

  test('can fetch user profile', async ({ request }) => {
    const response = await request.get('/me', {
      headers: { 'Authorization': \`Bearer \${authToken}\` },
    })
    expect(response.status()).toBe(200)
  })

  test('can create a resource', async ({ request }) => {
    const response = await request.post('/todos', {
      data: { title: 'Test item' },
      headers: { 'Authorization': \`Bearer \${authToken}\` },
    })
    expect(response.status()).toBe(201)
  })
})`}),(0,o.jsx)(a,{id:`storage-state`,children:`storageState for API sessions`}),(0,o.jsxs)(i,{children:[`For suites with many test files that all need authentication, repeating the`,(0,o.jsx)(`code`,{children:`beforeAll`}),` pattern in every file adds up. Playwright's`,(0,o.jsx)(`code`,{children:`storageState`}),` feature provides a better solution: authenticate once in a global setup script and save the state to a JSON file that every subsequent test loads automatically. `,(0,o.jsx)(`code`,{children:`storageState`}),` captures cookies set during the session. If your API uses Bearer tokens rather than cookies, those tokens live only in memory and must be written to a separate file alongside the storage state, as the example below shows.`]}),(0,o.jsx)(t,{language:`typescript`,children:`// global-setup.ts
import { request } from '@playwright/test'
import fs from 'fs'

async function globalSetup() {
  const apiContext = await request.newContext({
    baseURL: 'https://api.example.com',
  })

  const response = await apiContext.post('/auth/login', {
    data: {
      username: process.env.TEST_USER!,
      password: process.env.TEST_PASSWORD!,
    },
  })

  const { token } = await response.json()

  // Save storage state - this captures cookies set by the login
  await apiContext.storageState({ path: '.auth/api-state.json' })

  // You can also save the token separately if needed
  fs.writeFileSync('.auth/token.json', JSON.stringify({ token }))

  await apiContext.dispose()
}

export default globalSetup`}),(0,o.jsx)(t,{language:`typescript`,children:`// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  globalSetup: './global-setup.ts',
  use: {
    baseURL: 'https://api.example.com',
    storageState: '.auth/api-state.json',
  },
})`}),(0,o.jsx)(i,{children:`With this configuration, every test file starts with the saved authentication state already loaded. You do not need to log in manually in any test.`}),(0,o.jsxs)(n,{variant:`blue`,children:[`Add `,(0,o.jsx)(`code`,{children:`.auth/`}),` to your `,(0,o.jsx)(`code`,{children:`.gitignore`}),` file. Authentication state files contain session cookies and tokens that should not be committed to source control.`]}),(0,o.jsx)(a,{id:`custom-fixtures`,children:`A custom authenticated request fixture`}),(0,o.jsxs)(i,{children:[`The cleanest approach for a team working on a large API test suite is to create a custom fixture that injects an already-authenticated `,(0,o.jsx)(`code`,{children:`APIRequestContext`}),`. This approach removes all authentication boilerplate from individual test files:`]}),(0,o.jsx)(t,{language:`typescript`,children:`// fixtures.ts
import { test as base, APIRequestContext } from '@playwright/test'

type Fixtures = {
  authedRequest: APIRequestContext
}

export const test = base.extend<Fixtures>({
  authedRequest: async ({ playwright }, use) => {
    // Create a fresh context for this test
    const context = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL!,
    })

    // Authenticate
    const loginResponse = await context.post('/auth/login', {
      data: {
        username: process.env.TEST_USER!,
        password: process.env.TEST_PASSWORD!,
      },
    })
    const { token } = await loginResponse.json()

    // Attach the token to all subsequent requests from this context
    const authedContext = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL!,
      extraHTTPHeaders: {
        'Authorization': \`Bearer \${token}\`,
      },
    })

    await context.dispose()

    // Provide the authenticated context to the test
    await use(authedContext)

    // Clean up after the test
    await authedContext.dispose()
  },
})

export { expect } from '@playwright/test'`}),(0,o.jsx)(t,{language:`typescript`,children:`// todos.test.ts
import { test, expect } from './fixtures'

test('can create a to-do item', async ({ authedRequest }) => {
  const response = await authedRequest.post('/todos', {
    data: { title: 'Test item' },
  })
  expect(response.status()).toBe(201)
})`}),(0,o.jsx)(a,{id:`base-url-configuration`,children:`Base URL configuration`}),(0,o.jsx)(i,{children:`Hardcoding URLs in tests makes it difficult to run the same suite against different environments - your local development server, a staging environment and production may all have different base URLs.`}),(0,o.jsxs)(i,{children:[`The standard approach is to set `,(0,o.jsx)(`code`,{children:`baseURL`}),` in your Playwright config and populate it from an environment variable:`]}),(0,o.jsx)(t,{language:`typescript`,children:`// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  use: {
    baseURL: process.env.API_BASE_URL ?? 'https://api.staging.example.com',
  },
})`}),(0,o.jsx)(i,{children:`Now you can run your suite against any environment by passing the environment variable at the command line:`}),(0,o.jsx)(t,{language:`bash`,children:`# Run against local dev server
API_BASE_URL=http://localhost:3000 npx playwright test

# Run against staging (default if var is unset)
npx playwright test

# Run against production
API_BASE_URL=https://api.example.com npx playwright test`}),(0,o.jsx)(r,{children:`Multiple environments in the config`}),(0,o.jsxs)(i,{children:[`If you regularly run the same tests against multiple environments, you can define them as separate projects in `,(0,o.jsx)(`code`,{children:`playwright.config.ts`}),`:`]}),(0,o.jsx)(t,{language:`typescript`,children:`export default defineConfig({
  projects: [
    {
      name: 'staging',
      use: { baseURL: 'https://api.staging.example.com' },
    },
    {
      name: 'production',
      use: { baseURL: 'https://api.example.com' },
    },
  ],
})`}),(0,o.jsx)(t,{language:`bash`,children:`# Run against staging only
npx playwright test --project=staging

# Run against production only
npx playwright test --project=production`}),(0,o.jsx)(n,{variant:`green`,children:`Be cautious about running destructive tests (POST, PUT, DELETE) against production. API test suites that create and delete resources should typically only run against non-production environments, or should use data that is clearly marked as test data and cleaned up reliably after every run.`})]})}export{s as default};
import{a as e}from"./markdown-hfXSdh9Q.js";import{t}from"./KBCode-C2513JFu.js";import{t as n}from"./KBNote-CaRhdL4n.js";import{n as r,r as i,t as a}from"./KBHeading-DROUfOXR.js";var o=e();function s(){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(i,{children:`The previous articles covered the mechanics of making API requests and handling authentication. This article covers the patterns that make those capabilities genuinely useful in a real test suite: seeding test data via API before browser tests, tearing down data after tests, combining API and browser interactions in the same test for speed and validating that response shapes match your documented contract.`}),(0,o.jsx)(a,{id:`seeding-test-data`,children:`Setting up test data via API`}),(0,o.jsx)(i,{children:`Browser tests often need the application to be in a specific state before they run. A test that verifies a user can edit their profile needs a user to exist. A test that verifies a shopping cart total needs products in the catalogue. The most common approach is to click through the UI to create that data - but this is slow, brittle and couples your setup to the UI in a way that is fragile when the UI changes.`}),(0,o.jsxs)(i,{children:[`A better approach is to create the data directly via the API in a`,(0,o.jsx)(`code`,{children:`beforeEach`}),` or `,(0,o.jsx)(`code`,{children:`beforeAll`}),` block. This is faster, more explicit and independent of any UI behaviour:`]}),(0,o.jsx)(t,{language:`typescript`,children:`import { test, expect } from '@playwright/test'

test.describe('to-do list page', () => {
  let todoId: number

  test.beforeEach(async ({ request }) => {
    // Create a known item in the database before each test
    const response = await request.post('/todos', {
      data: { title: 'Item seeded by API', status: 'pending' },
      headers: { 'Authorization': \`Bearer \${process.env.API_TOKEN}\` },
    })
    expect(response.status()).toBe(201)
    const body = await response.json()
    todoId = body.id
  })

  test('shows the item in the list', async ({ page }) => {
    await page.goto('/todos')
    await expect(page.getByText('Item seeded by API')).toBeVisible()
  })

  test('can mark the item as complete', async ({ page }) => {
    await page.goto(\`/todos/\${todoId}\`)
    await page.getByRole('button', { name: 'Mark complete' }).click()
    await expect(page.getByText('Complete')).toBeVisible()
  })
})`}),(0,o.jsxs)(i,{children:[`Using `,(0,o.jsx)(`code`,{children:`beforeEach`}),` here ensures each test starts with a fresh, known item rather than depending on leftover state from the previous test. If your test suite runs in parallel (which is Playwright's default), each test file gets its own isolated state.`]}),(0,o.jsx)(a,{id:`tearing-down`,children:`Tearing down via API after tests`}),(0,o.jsx)(i,{children:`Tests that create resources should clean up after themselves. Without cleanup, a test suite that runs repeatedly will accumulate test data in your database, which can slow down list endpoints, cause assertion failures on count-based checks and make debugging harder because the database is never in a known clean state.`}),(0,o.jsx)(t,{language:`typescript`,children:`test.describe('to-do CRUD', () => {
  let createdIds: number[] = []

  test.afterEach(async ({ request }) => {
    // Delete all resources created during the test
    for (const id of createdIds) {
      await request.delete(\`/todos/\${id}\`, {
        headers: { 'Authorization': \`Bearer \${process.env.API_TOKEN}\` },
      })
    }
    createdIds = []
  })

  test('creates multiple items', async ({ request }) => {
    const titles = ['Item A', 'Item B', 'Item C']

    for (const title of titles) {
      const response = await request.post('/todos', {
        data: { title },
        headers: { 'Authorization': \`Bearer \${process.env.API_TOKEN}\` },
      })
      const { id } = await response.json()
      createdIds.push(id)
    }

    expect(createdIds).toHaveLength(3)
  })
})`}),(0,o.jsxs)(n,{variant:`blue`,children:[`If your API supports bulk operations or a dedicated test data reset endpoint, prefer those over individual deletes. A single `,(0,o.jsx)(`code`,{children:`DELETE /test-data?run=xyz`}),` call is faster and more reliable than many individual deletes, especially for large datasets.`]}),(0,o.jsx)(a,{id:`combining-api-and-browser`,children:`Combining request and page in the same test`}),(0,o.jsx)(i,{children:`One of the most powerful things Playwright enables is combining API calls and browser interactions in a single test. This pattern is particularly useful for skipping slow UI flows that are not the subject of the test you are writing.`}),(0,o.jsx)(r,{children:`Logging in via API`}),(0,o.jsxs)(i,{children:[`If your application requires users to be logged in to see the content you want to test, logging in via the UI takes several seconds per test. Logging in via the API takes a fraction of that time. When both the `,(0,o.jsx)(`code`,{children:`request`}),` and `,(0,o.jsx)(`code`,{children:`page`}),`fixtures are used in the same test function, they share the same browser context. Cookies set by the API response are automatically sent by the browser on subsequent navigations:`]}),(0,o.jsx)(t,{language:`typescript`,children:`test('dashboard shows user name after login via API', async ({ request, page }) => {
  // Log in via API - much faster than clicking through the login form
  const loginResponse = await request.post('/auth/login', {
    data: {
      username: 'testuser',
      password: process.env.TEST_PASSWORD,
    },
  })
  expect(loginResponse.status()).toBe(200)

  // The session cookie from the login response is now in the shared context
  // Navigate directly to the protected page
  await page.goto('/dashboard')

  // The browser is already authenticated - no redirect to /login
  await expect(page.getByText('Welcome, testuser')).toBeVisible()
})`}),(0,o.jsx)(r,{children:`Creating test data via API then verifying via browser`}),(0,o.jsx)(t,{language:`typescript`,children:`test('newly created product appears in the storefront', async ({ request, page }) => {
  // Create a product via the admin API
  const createResponse = await request.post('/admin/products', {
    data: {
      name: 'Blue Ceramic Mug',
      price: 1299,
      sku: 'MUG-BLUE-01',
    },
    headers: { 'Authorization': \`Bearer \${process.env.ADMIN_TOKEN}\` },
  })
  expect(createResponse.status()).toBe(201)
  const { id } = await createResponse.json()

  // Verify the product appears in the public-facing storefront
  await page.goto('/shop')
  await expect(page.getByText('Blue Ceramic Mug')).toBeVisible()
  await expect(page.getByText('£12.99')).toBeVisible()

  // Clean up
  await request.delete(\`/admin/products/\${id}\`, {
    headers: { 'Authorization': \`Bearer \${process.env.ADMIN_TOKEN}\` },
  })
})`}),(0,o.jsx)(r,{children:`Verifying browser actions via API`}),(0,o.jsx)(i,{children:`You can also go in the opposite direction: drive the UI and then verify the outcome by checking the API. This is useful when the UI does not display all the data that the action created or modified:`}),(0,o.jsx)(t,{language:`typescript`,children:`test('checkout creates an order record in the database', async ({ request, page }) => {
  // Perform a checkout via the browser UI
  await page.goto('/cart')
  await page.getByRole('button', { name: 'Checkout' }).click()
  await page.getByLabel('Card number').fill('4242 4242 4242 4242')
  // ... complete checkout form ...
  await page.getByRole('button', { name: 'Place order' }).click()

  // Extract the order ID from the confirmation page
  const confirmationText = await page.getByTestId('order-id').textContent()
  const orderId = confirmationText?.replace('Order #', '')

  // Verify the order in the database via API
  const orderResponse = await request.get(\`/orders/\${orderId}\`, {
    headers: { 'Authorization': \`Bearer \${process.env.API_TOKEN}\` },
  })
  expect(orderResponse.status()).toBe(200)
  const order = await orderResponse.json()
  expect(order.status).toBe('confirmed')
  expect(order.items).toHaveLength(1)
})`}),(0,o.jsx)(a,{id:`schema-validation`,children:`Response schema validation`}),(0,o.jsx)(i,{children:`Asserting on individual fields is useful, but it does not protect you against breaking changes to the shape of a response. If a developer renames a field or removes a property that your clients depend on, individual field assertions may still pass because they only check the fields they explicitly reference.`}),(0,o.jsxs)(i,{children:[`Schema validation lets you assert that the entire response conforms to a defined contract. Playwright does not ship a built-in schema validator, but it works seamlessly with libraries like `,(0,o.jsx)(`code`,{children:`zod`}),` and `,(0,o.jsx)(`code`,{children:`ajv`}),`.`]}),(0,o.jsx)(r,{children:`Using zod`}),(0,o.jsx)(t,{language:`typescript`,children:`import { test, expect } from '@playwright/test'
import { z } from 'zod'

const TodoSchema = z.object({
  id: z.number(),
  title: z.string().min(1),
  status: z.enum(['pending', 'complete']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

const TodoListSchema = z.array(TodoSchema)

test('GET /todos response matches schema', async ({ request }) => {
  const response = await request.get('/todos')
  expect(response.status()).toBe(200)

  const body = await response.json()

  // This throws a ZodError if the shape does not match
  const result = TodoListSchema.safeParse(body)
  expect(result.success).toBe(true)

  if (!result.success) {
    console.error('Schema validation errors:', result.error.errors)
  }
})`}),(0,o.jsx)(r,{children:`Using expect.toMatchObject for partial validation`}),(0,o.jsxs)(i,{children:[`For a lighter-weight approach that does not require an additional dependency,`,(0,o.jsx)(`code`,{children:`toMatchObject`}),` lets you assert that a response contains at least the fields you care about with the correct types. It does not fail if the response contains additional fields:`]}),(0,o.jsx)(t,{language:`typescript`,children:`test('to-do response has required fields', async ({ request }) => {
  const response = await request.get('/todos/1')
  const todo = await response.json()

  expect(todo).toMatchObject({
    id: expect.any(Number),
    title: expect.any(String),
    status: expect.stringMatching(/^(pending|complete)$/),
    createdAt: expect.any(String),
  })
})`}),(0,o.jsx)(n,{variant:`green`,children:`Schema validation becomes most valuable as your API grows and when multiple teams or services depend on the same endpoints. Even a simple zod schema for each resource type pays dividends when a refactor accidentally removes a required field that a consuming client depends on.`}),(0,o.jsx)(a,{id:`error-response-testing`,children:`Testing error responses`}),(0,o.jsx)(i,{children:`Testing the happy path is essential but not sufficient. Your API's error handling is equally important: clients that depend on your API need to know that a 400 means bad input, a 401 means unauthenticated, a 403 means forbidden and a 404 means not found.`}),(0,o.jsx)(t,{language:`typescript`,children:`test.describe('input validation', () => {
  test('returns 400 when title is missing', async ({ request }) => {
    const response = await request.post('/todos', {
      data: { status: 'pending' }, // title is required
      headers: { 'Authorization': \`Bearer \${process.env.API_TOKEN}\` },
    })
    expect(response.status()).toBe(400)
    const error = await response.json()
    expect(error.message).toContain('title')
  })

  test('returns 401 without authentication', async ({ request }) => {
    const response = await request.get('/todos')
    expect(response.status()).toBe(401)
  })

  test('returns 404 for a missing resource', async ({ request }) => {
    const response = await request.get('/todos/99999', {
      headers: { 'Authorization': \`Bearer \${process.env.API_TOKEN}\` },
    })
    expect(response.status()).toBe(404)
  })

  test('returns 422 for an invalid status value', async ({ request }) => {
    const response = await request.post('/todos', {
      data: { title: 'Test', status: 'invalid-status' },
      headers: { 'Authorization': \`Bearer \${process.env.API_TOKEN}\` },
    })
    expect(response.status()).toBe(422)
    const error = await response.json()
    expect(error.fields).toContain('status')
  })
})`}),(0,o.jsx)(i,{children:`Thorough error coverage at the API layer is far cheaper to maintain than trying to trigger these same error conditions through a browser UI, and it gives you precise assertions about the exact error response your clients will receive.`})]})}export{s as default};
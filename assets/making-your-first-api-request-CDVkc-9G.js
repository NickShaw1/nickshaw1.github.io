import{a as e}from"./markdown-hfXSdh9Q.js";import{t}from"./KBCode-C2513JFu.js";import{t as n}from"./KBNote-CaRhdL4n.js";import{n as r,r as i,t as a}from"./KBHeading-DROUfOXR.js";var o=e();function s(){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(i,{children:[`The `,(0,o.jsx)(`code`,{children:`request`}),` fixture gives you an `,(0,o.jsx)(`code`,{children:`APIRequestContext`}),` instance that is ready to use immediately. This article walks through every common HTTP method, shows you how to read response data and demonstrates how to write assertions that verify API behaviour. The examples use a simple hypothetical REST API for managing a to-do list, but the patterns apply to any HTTP endpoint.`]}),(0,o.jsx)(a,{id:`the-request-fixture`,children:`The request fixture`}),(0,o.jsxs)(i,{children:[`When you add `,(0,o.jsx)(`code`,{children:`request`}),` to your test function's argument list, Playwright injects a pre-configured `,(0,o.jsx)(`code`,{children:`APIRequestContext`}),`. If you have set a`,(0,o.jsx)(`code`,{children:`baseURL`}),` in your Playwright config, you can use relative paths in all your requests. If you have not, you must provide the full URL each time.`]}),(0,o.jsx)(t,{language:`typescript`,children:`// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  use: {
    baseURL: 'https://api.example.com',
  },
})`}),(0,o.jsx)(t,{language:`typescript`,children:`// With baseURL set, use relative paths
test('fetches users', async ({ request }) => {
  const response = await request.get('/users')
  // ...
})

// Without baseURL, use the full URL
test('fetches users', async ({ request }) => {
  const response = await request.get('https://api.example.com/users')
  // ...
})`}),(0,o.jsxs)(n,{variant:`blue`,children:[`Setting `,(0,o.jsx)(`code`,{children:`baseURL`}),` in your config is strongly recommended. It makes tests shorter, removes duplication and makes it trivial to point your suite at a different environment by changing a single value or environment variable.`]}),(0,o.jsx)(a,{id:`get-requests`,children:`GET requests`}),(0,o.jsxs)(i,{children:[(0,o.jsx)(`code`,{children:`request.get()`}),` sends an HTTP GET request. It accepts the URL as its first argument and an optional options object as the second. It returns an`,(0,o.jsx)(`code`,{children:`APIResponse`}),` object that you can inspect for status, headers and body.`]}),(0,o.jsx)(t,{language:`typescript`,children:`test('GET /todos returns all items', async ({ request }) => {
  const response = await request.get('/todos')

  expect(response.status()).toBe(200)
  expect(response.ok()).toBeTruthy()

  const todos = await response.json()
  expect(todos).toBeInstanceOf(Array)
  expect(todos.length).toBeGreaterThan(0)
})`}),(0,o.jsxs)(i,{children:[`You can pass query parameters using the `,(0,o.jsx)(`code`,{children:`params`}),` option. Playwright serialises the object into the query string for you:`]}),(0,o.jsx)(t,{language:`typescript`,children:`test('GET /todos supports filtering by status', async ({ request }) => {
  const response = await request.get('/todos', {
    params: {
      status: 'complete',
      page: 1,
      limit: 10,
    },
  })

  // Sends: GET /todos?status=complete&page=1&limit=10
  expect(response.status()).toBe(200)

  const todos = await response.json()
  expect(todos.every((t: { status: string }) => t.status === 'complete')).toBe(true)
})`}),(0,o.jsx)(a,{id:`post-requests`,children:`POST requests`}),(0,o.jsxs)(i,{children:[(0,o.jsx)(`code`,{children:`request.post()`}),` sends an HTTP POST request. For JSON payloads, pass your data as the `,(0,o.jsx)(`code`,{children:`data`}),` option and Playwright will serialise it and set the correct `,(0,o.jsx)(`code`,{children:`Content-Type`}),` header automatically.`]}),(0,o.jsx)(t,{language:`typescript`,children:`test('POST /todos creates a new item', async ({ request }) => {
  const response = await request.post('/todos', {
    data: {
      title: 'Buy oat milk',
      status: 'pending',
    },
  })

  expect(response.status()).toBe(201)

  const created = await response.json()
  expect(created.id).toBeDefined()
  expect(created.title).toBe('Buy oat milk')
  expect(created.status).toBe('pending')
})`}),(0,o.jsx)(r,{children:`Sending form data`}),(0,o.jsxs)(i,{children:[`For endpoints that expect `,(0,o.jsx)(`code`,{children:`application/x-www-form-urlencoded`}),` data, use the `,(0,o.jsx)(`code`,{children:`form`}),` option instead of `,(0,o.jsx)(`code`,{children:`data`}),`:`]}),(0,o.jsx)(t,{language:`typescript`,children:`const response = await request.post('/login', {
  form: {
    username: 'testuser',
    password: 'secret',
  },
})`}),(0,o.jsx)(r,{children:`Sending multipart form data`}),(0,o.jsxs)(i,{children:[`For file uploads and `,(0,o.jsx)(`code`,{children:`multipart/form-data`}),` requests, use the`,(0,o.jsx)(`code`,{children:`multipart`}),` option:`]}),(0,o.jsx)(t,{language:`typescript`,children:`const response = await request.post('/upload', {
  multipart: {
    file: {
      name: 'report.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('PDF content'),
    },
    description: 'Monthly report',
  },
})`}),(0,o.jsx)(a,{id:`put-and-patch-requests`,children:`PUT and PATCH requests`}),(0,o.jsxs)(i,{children:[(0,o.jsx)(`code`,{children:`request.put()`}),` and `,(0,o.jsx)(`code`,{children:`request.patch()`}),` work identically to POST in terms of the options they accept. The difference is semantic: PUT typically replaces a resource entirely, while PATCH applies a partial update.`]}),(0,o.jsx)(t,{language:`typescript`,children:`test('PUT /todos/:id replaces a to-do item', async ({ request }) => {
  const response = await request.put('/todos/42', {
    data: {
      title: 'Buy oat milk - updated',
      status: 'complete',
    },
  })

  expect(response.status()).toBe(200)

  const updated = await response.json()
  expect(updated.title).toBe('Buy oat milk - updated')
  expect(updated.status).toBe('complete')
})

test('PATCH /todos/:id updates a single field', async ({ request }) => {
  const response = await request.patch('/todos/42', {
    data: { status: 'complete' },
  })

  expect(response.status()).toBe(200)

  const updated = await response.json()
  expect(updated.status).toBe('complete')
})`}),(0,o.jsx)(a,{id:`delete-requests`,children:`DELETE requests`}),(0,o.jsx)(t,{language:`typescript`,children:`test('DELETE /todos/:id removes an item', async ({ request }) => {
  const response = await request.delete('/todos/42')

  expect(response.status()).toBe(204)
  expect(await response.body()).toHaveLength(0)

  // Confirm it is actually gone
  const getResponse = await request.get('/todos/42')
  expect(getResponse.status()).toBe(404)
})`}),(0,o.jsx)(a,{id:`reading-response-data`,children:`Reading response data`}),(0,o.jsxs)(i,{children:[`The `,(0,o.jsx)(`code`,{children:`APIResponse`}),` object returned by every request method has several properties and methods for inspecting the result.`]}),(0,o.jsx)(r,{children:`Status and headers`}),(0,o.jsx)(t,{language:`typescript`,children:`const response = await request.get('/todos')

// Status code as a number
console.log(response.status())       // 200

// Status text
console.log(response.statusText())   // 'OK'

// Shorthand: true if status is in the 200-299 range
console.log(response.ok())           // true

// A single header value
console.log(response.headers()['content-type'])  // 'application/json; charset=utf-8'

// All headers as an object
console.log(response.headersArray())  // [{ name: 'content-type', value: '...' }, ...]

// The final URL after any redirects
console.log(response.url())          // 'https://api.example.com/todos'`}),(0,o.jsx)(r,{children:`Reading the body`}),(0,o.jsx)(t,{language:`typescript`,children:`const response = await request.get('/todos')

// Parse as JSON - throws if the body is not valid JSON
const data = await response.json()

// Read as a string
const text = await response.text()

// Read as a raw Buffer
const buffer = await response.body()`}),(0,o.jsxs)(n,{variant:`warning`,children:[`You can only read the response body once using a given method. If you call`,(0,o.jsx)(`code`,{children:`response.json()`}),` and then call `,(0,o.jsx)(`code`,{children:`response.text()`}),`, the second call returns an empty string. Read the body once, store the result in a variable and assert on the variable.`]}),(0,o.jsx)(a,{id:`assertions`,children:`Making assertions on API responses`}),(0,o.jsxs)(i,{children:[`Playwright provides the standard `,(0,o.jsx)(`code`,{children:`expect`}),` API for asserting on response data. Unlike browser element assertions, API response assertions are not automatically retried, so they are evaluated once at the time they are called. This is appropriate because HTTP responses are synchronous: either the response arrived or it did not.`]}),(0,o.jsx)(r,{children:`Status assertions`}),(0,o.jsx)(t,{language:`typescript`,children:`expect(response.status()).toBe(200)
expect(response.ok()).toBeTruthy()

// Check for a range of acceptable status codes
expect([200, 201]).toContain(response.status())`}),(0,o.jsx)(r,{children:`Body assertions`}),(0,o.jsx)(t,{language:`typescript`,children:`const todo = await response.json()

// Exact value
expect(todo.title).toBe('Buy oat milk')

// Partial match - passes as long as the object has these keys with these values
expect(todo).toMatchObject({
  title: 'Buy oat milk',
  status: 'pending',
})

// Type checks
expect(todo.id).toEqual(expect.any(Number))
expect(todo.createdAt).toEqual(expect.any(String))

// Presence only
expect(todo.id).toBeDefined()
expect(todo.deletedAt).toBeNull()`}),(0,o.jsx)(r,{children:`Array assertions`}),(0,o.jsx)(t,{language:`typescript`,children:`const todos = await response.json()

expect(todos).toHaveLength(5)
expect(todos).toBeInstanceOf(Array)

// Check every element satisfies a condition
expect(todos.every((t: { status: string }) => t.status !== undefined)).toBe(true)

// Check the array contains an item matching a partial object
expect(todos).toEqual(
  expect.arrayContaining([
    expect.objectContaining({ title: 'Buy oat milk' })
  ])
)`}),(0,o.jsx)(a,{id:`complete-example`,children:`A complete worked example`}),(0,o.jsx)(i,{children:`The following example covers the full lifecycle of a to-do item: creating it, reading it back, updating it and deleting it. Each step asserts on both the response from the action and the subsequent state of the resource.`}),(0,o.jsx)(t,{language:`typescript`,children:`import { test, expect } from '@playwright/test'

test('to-do item lifecycle', async ({ request }) => {
  // 1. Create a new item
  const createResponse = await request.post('/todos', {
    data: { title: 'Learn Playwright API testing', status: 'pending' },
  })
  expect(createResponse.status()).toBe(201)
  const created = await createResponse.json()
  const id = created.id

  // 2. Read it back
  const getResponse = await request.get(\`/todos/\${id}\`)
  expect(getResponse.status()).toBe(200)
  const fetched = await getResponse.json()
  expect(fetched).toMatchObject({
    id,
    title: 'Learn Playwright API testing',
    status: 'pending',
  })

  // 3. Update it
  const patchResponse = await request.patch(\`/todos/\${id}\`, {
    data: { status: 'complete' },
  })
  expect(patchResponse.status()).toBe(200)
  const updated = await patchResponse.json()
  expect(updated.status).toBe('complete')

  // 4. Delete it
  const deleteResponse = await request.delete(\`/todos/\${id}\`)
  expect(deleteResponse.status()).toBe(204)

  // 5. Confirm it is gone
  const confirmResponse = await request.get(\`/todos/\${id}\`)
  expect(confirmResponse.status()).toBe(404)
})`}),(0,o.jsxs)(n,{variant:`green`,children:[`This pattern of chaining requests through a test is covered in more detail in the final article in this section, which walks through structuring a full REST API test suite. For now, the key point is that you can use the response from one call to drive the next: extract the `,(0,o.jsx)(`code`,{children:`id`}),` from a creation response and use it in subsequent read, update and delete calls.`]}),(0,o.jsx)(a,{id:`custom-headers`,children:`Sending custom headers`}),(0,o.jsxs)(i,{children:[`You can send custom headers with any request using the `,(0,o.jsx)(`code`,{children:`headers`}),` option. This is commonly used for API keys, content negotiation and correlation IDs:`]}),(0,o.jsx)(t,{language:`typescript`,children:`const response = await request.get('/todos', {
  headers: {
    'X-Api-Key': process.env.API_KEY!,
    'X-Correlation-Id': 'test-run-' + Date.now(),
    'Accept': 'application/json',
  },
})`}),(0,o.jsxs)(i,{children:[`To set headers that should apply to every request in a test file or test suite, set them in `,(0,o.jsx)(`code`,{children:`extraHTTPHeaders`}),` in the Playwright config or in a custom fixture. Both approaches are covered in the authentication article.`]})]})}export{s as default};
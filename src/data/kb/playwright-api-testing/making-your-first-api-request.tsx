import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBCode from '../../../components/kb/KBCode'

export default function MakingYourFirstApiRequest() {
  return (
    <>
      <KBP>
        The <code>request</code> fixture gives you an <code>APIRequestContext</code> instance
        that is ready to use immediately. This article walks through every common HTTP method,
        shows you how to read response data and demonstrates how to write assertions that
        verify API behaviour. The examples use a simple hypothetical REST API for managing a
        to-do list, but the patterns apply to any HTTP endpoint.
      </KBP>

      <KBH2 id="the-request-fixture">The request fixture</KBH2>

      <KBP>
        When you add <code>request</code> to your test function's argument list, Playwright
        injects a pre-configured <code>APIRequestContext</code>. If you have set a
        <code>baseURL</code> in your Playwright config, you can use relative paths in all
        your requests. If you have not, you must provide the full URL each time.
      </KBP>

      <KBCode language="typescript">{`// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  use: {
    baseURL: 'https://api.example.com',
  },
})`}</KBCode>

      <KBCode language="typescript">{`// With baseURL set, use relative paths
test('fetches users', async ({ request }) => {
  const response = await request.get('/users')
  // ...
})

// Without baseURL, use the full URL
test('fetches users', async ({ request }) => {
  const response = await request.get('https://api.example.com/users')
  // ...
})`}</KBCode>

      <KBNote variant="blue">
        Setting <code>baseURL</code> in your config is strongly recommended. It makes tests
        shorter, removes duplication and makes it trivial to point your suite at a different
        environment by changing a single value or environment variable.
      </KBNote>

      <KBH2 id="get-requests">GET requests</KBH2>

      <KBP>
        <code>request.get()</code> sends an HTTP GET request. It accepts the URL as its first
        argument and an optional options object as the second. It returns an
        <code>APIResponse</code> object that you can inspect for status, headers and body.
      </KBP>

      <KBCode language="typescript">{`test('GET /todos returns all items', async ({ request }) => {
  const response = await request.get('/todos')

  expect(response.status()).toBe(200)
  expect(response.ok()).toBeTruthy()

  const todos = await response.json()
  expect(todos).toBeInstanceOf(Array)
  expect(todos.length).toBeGreaterThan(0)
})`}</KBCode>

      <KBP>
        You can pass query parameters using the <code>params</code> option. Playwright
        serialises the object into the query string for you:
      </KBP>

      <KBCode language="typescript">{`test('GET /todos supports filtering by status', async ({ request }) => {
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
})`}</KBCode>

      <KBH2 id="post-requests">POST requests</KBH2>

      <KBP>
        <code>request.post()</code> sends an HTTP POST request. For JSON payloads, pass your
        data as the <code>data</code> option and Playwright will serialise it and set the
        correct <code>Content-Type</code> header automatically.
      </KBP>

      <KBCode language="typescript">{`test('POST /todos creates a new item', async ({ request }) => {
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
})`}</KBCode>

      <KBH3>Sending form data</KBH3>

      <KBP>
        For endpoints that expect <code>application/x-www-form-urlencoded</code> data, use
        the <code>form</code> option instead of <code>data</code>:
      </KBP>

      <KBCode language="typescript">{`const response = await request.post('/login', {
  form: {
    username: 'testuser',
    password: 'secret',
  },
})`}</KBCode>

      <KBH3>Sending multipart form data</KBH3>

      <KBP>
        For file uploads and <code>multipart/form-data</code> requests, use the
        <code>multipart</code> option:
      </KBP>

      <KBCode language="typescript">{`const response = await request.post('/upload', {
  multipart: {
    file: {
      name: 'report.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('PDF content'),
    },
    description: 'Monthly report',
  },
})`}</KBCode>

      <KBH2 id="put-and-patch-requests">PUT and PATCH requests</KBH2>

      <KBP>
        <code>request.put()</code> and <code>request.patch()</code> work identically to POST
        in terms of the options they accept. The difference is semantic: PUT typically
        replaces a resource entirely, while PATCH applies a partial update.
      </KBP>

      <KBCode language="typescript">{`test('PUT /todos/:id replaces a to-do item', async ({ request }) => {
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
})`}</KBCode>

      <KBH2 id="delete-requests">DELETE requests</KBH2>

      <KBCode language="typescript">{`test('DELETE /todos/:id removes an item', async ({ request }) => {
  const response = await request.delete('/todos/42')

  expect(response.status()).toBe(204)
  expect(await response.body()).toHaveLength(0)

  // Confirm it is actually gone
  const getResponse = await request.get('/todos/42')
  expect(getResponse.status()).toBe(404)
})`}</KBCode>

      <KBH2 id="reading-response-data">Reading response data</KBH2>

      <KBP>
        The <code>APIResponse</code> object returned by every request method has several
        properties and methods for inspecting the result.
      </KBP>

      <KBH3>Status and headers</KBH3>

      <KBCode language="typescript">{`const response = await request.get('/todos')

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
console.log(response.url())          // 'https://api.example.com/todos'`}</KBCode>

      <KBH3>Reading the body</KBH3>

      <KBCode language="typescript">{`const response = await request.get('/todos')

// Parse as JSON - throws if the body is not valid JSON
const data = await response.json()

// Read as a string
const text = await response.text()

// Read as a raw Buffer
const buffer = await response.body()`}</KBCode>

      <KBNote variant="warning">
        You can only read the response body once using a given method. If you call
        <code>response.json()</code> and then call <code>response.text()</code>, the second
        call returns an empty string. Read the body once, store the result in a variable and
        assert on the variable.
      </KBNote>

      <KBH2 id="assertions">Making assertions on API responses</KBH2>

      <KBP>
        Playwright provides the standard <code>expect</code> API for asserting on response
        data. Unlike browser element assertions, API response assertions are not automatically
        retried, so they are evaluated once at the time they are called. This is appropriate
        because HTTP responses are synchronous: either the response arrived or it did not.
      </KBP>

      <KBH3>Status assertions</KBH3>

      <KBCode language="typescript">{`expect(response.status()).toBe(200)
expect(response.ok()).toBeTruthy()

// Check for a range of acceptable status codes
expect([200, 201]).toContain(response.status())`}</KBCode>

      <KBH3>Body assertions</KBH3>

      <KBCode language="typescript">{`const todo = await response.json()

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
expect(todo.deletedAt).toBeNull()`}</KBCode>

      <KBH3>Array assertions</KBH3>

      <KBCode language="typescript">{`const todos = await response.json()

expect(todos).toHaveLength(5)
expect(todos).toBeInstanceOf(Array)

// Check every element satisfies a condition
expect(todos.every((t: { status: string }) => t.status !== undefined)).toBe(true)

// Check the array contains an item matching a partial object
expect(todos).toEqual(
  expect.arrayContaining([
    expect.objectContaining({ title: 'Buy oat milk' })
  ])
)`}</KBCode>

      <KBH2 id="complete-example">A complete worked example</KBH2>

      <KBP>
        The following example covers the full lifecycle of a to-do item: creating it,
        reading it back, updating it and deleting it. Each step asserts on both the response
        from the action and the subsequent state of the resource.
      </KBP>

      <KBCode language="typescript">{`import { test, expect } from '@playwright/test'

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
})`}</KBCode>

      <KBNote variant="green">
        This pattern of chaining requests through a test is covered in more detail in the
        final article in this section, which walks through structuring a full REST API test
        suite. For now, the key point is that you can use the response from one call to drive
        the next: extract the <code>id</code> from a creation response and use it in
        subsequent read, update and delete calls.
      </KBNote>

      <KBH2 id="custom-headers">Sending custom headers</KBH2>

      <KBP>
        You can send custom headers with any request using the <code>headers</code> option.
        This is commonly used for API keys, content negotiation and correlation IDs:
      </KBP>

      <KBCode language="typescript">{`const response = await request.get('/todos', {
  headers: {
    'X-Api-Key': process.env.API_KEY!,
    'X-Correlation-Id': 'test-run-' + Date.now(),
    'Accept': 'application/json',
  },
})`}</KBCode>

      <KBP>
        To set headers that should apply to every request in a test file or test suite, set
        them in <code>extraHTTPHeaders</code> in the Playwright config or in a custom fixture.
        Both approaches are covered in the authentication article.
      </KBP>
    </>
  )
}

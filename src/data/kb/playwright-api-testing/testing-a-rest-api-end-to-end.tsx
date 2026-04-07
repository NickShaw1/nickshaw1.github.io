import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBCode from '../../../components/kb/KBCode'

export default function TestingARestApiEndToEnd() {
  return (
    <>
      <KBP>
        The previous articles in this section covered individual techniques in isolation. This
        article puts them together into a complete worked example: a full CRUD test suite for
        a REST API, with chained requests, error coverage, schema validation and a folder
        structure you can use as a starting point for a real project.
      </KBP>

      <KBP>
        The API under test is a simple task management service with endpoints for creating,
        reading, updating and deleting tasks. The suite covers the full lifecycle of a task,
        tests all error conditions and validates that the response shapes match the
        documented contract.
      </KBP>

      <KBH2 id="project-structure">Project structure</KBH2>

      <KBP>
        Before writing tests, think about how to organise the files. A structure that works
        well for API test suites separates concerns into three layers: the Playwright config,
        shared fixtures and the test files themselves.
      </KBP>

      <KBCode language="bash">{`api-tests/
├── playwright.config.ts
├── fixtures/
│   ├── auth.ts
│   └── tasks.ts
├── schemas/
│   └── task.ts
└── tests/
    ├── tasks.crud.test.ts
    ├── tasks.auth.test.ts
    └── tasks.validation.test.ts`}</KBCode>

      <KBH2 id="the-config">The config</KBH2>

      <KBCode language="typescript">{`// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 15_000,
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  use: {
    baseURL: process.env.API_BASE_URL ?? 'http://localhost:3000',
    extraHTTPHeaders: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  },
})`}</KBCode>

      <KBH2 id="shared-fixtures">Shared fixtures</KBH2>

      <KBP>
        The auth fixture authenticates once and provides an
        <code>APIRequestContext</code> with the token already attached. The task fixture
        builds on top of it and provides a <code>createTask</code> helper that tracks every
        created ID and deletes those resources automatically after each test. If you are new
        to Playwright fixtures, the Fixtures article in the main Playwright guide covers the
        concept in full before you continue here.
      </KBP>

      <KBCode language="typescript">{`// fixtures/auth.ts
import { test as base, APIRequestContext } from '@playwright/test'

type AuthFixtures = {
  authedRequest: APIRequestContext
}

export const test = base.extend<AuthFixtures>({
  authedRequest: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL ?? 'http://localhost:3000',
      extraHTTPHeaders: { 'Accept': 'application/json' },
    })

    const res = await context.post('/auth/login', {
      data: {
        email: process.env.TEST_EMAIL!,
        password: process.env.TEST_PASSWORD!,
      },
    })
    const { token } = await res.json()

    await context.dispose()

    const authed = await playwright.request.newContext({
      baseURL: process.env.API_BASE_URL ?? 'http://localhost:3000',
      extraHTTPHeaders: {
        'Accept': 'application/json',
        'Authorization': \`Bearer \${token}\`,
      },
    })

    await use(authed)
    await authed.dispose()
  },
})

export { expect } from '@playwright/test'`}</KBCode>

      <KBCode language="typescript">{`// fixtures/tasks.ts
import { test as authTest, expect } from './auth'

type Task = { id: number; title: string; status: string }

type TaskFixtures = {
  createTask: (data: Partial<Task>) => Promise<Task>
}

export const test = authTest.extend<TaskFixtures>({
  createTask: async ({ authedRequest }, use) => {
    const created: number[] = []

    const createTask = async (data: Partial<Task> = {}): Promise<Task> => {
      const res = await authedRequest.post('/tasks', {
        data: {
          title: data.title ?? 'Default test task',
          status: data.status ?? 'pending',
        },
      })
      expect(res.status()).toBe(201)
      const task = await res.json()
      created.push(task.id)
      return task
    }

    await use(createTask)

    // Clean up all tasks created during this test
    for (const id of created) {
      await authedRequest.delete(\`/tasks/\${id}\`)
    }
  },
})

export { expect } from './auth'`}</KBCode>

      <KBH2 id="schemas">Schemas</KBH2>

      <KBCode language="typescript">{`// schemas/task.ts
import { z } from 'zod'

export const TaskSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1).max(255),
  status: z.enum(['pending', 'in_progress', 'complete']),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
})

export const TaskListSchema = z.array(TaskSchema)

export type Task = z.infer<typeof TaskSchema>`}</KBCode>

      <KBH2 id="crud-tests">The CRUD test suite</KBH2>

      <KBP>
        The CRUD test file covers the full lifecycle of a task. Each test is independent:
        it creates its own data, asserts on it and cleans up after itself.
      </KBP>

      <KBCode language="typescript">{`// tests/tasks.crud.test.ts
import { test, expect } from '../fixtures/tasks'
import { TaskSchema, TaskListSchema } from '../schemas/task'

test.describe('Tasks CRUD', () => {
  test('GET /tasks returns a list of tasks', async ({ authedRequest, createTask }) => {
    // Seed two known tasks
    await createTask({ title: 'Task A' })
    await createTask({ title: 'Task B' })

    const res = await authedRequest.get('/tasks')
    expect(res.status()).toBe(200)

    const body = await res.json()
    const result = TaskListSchema.safeParse(body)
    expect(result.success).toBe(true)
  })

  test('POST /tasks creates a task and returns it', async ({ authedRequest, createTask }) => {
    const task = await createTask({ title: 'New task from test', status: 'pending' })

    expect(task.id).toEqual(expect.any(Number))
    expect(task.title).toBe('New task from test')
    expect(task.status).toBe('pending')

    const result = TaskSchema.safeParse(task)
    expect(result.success).toBe(true)
  })

  test('GET /tasks/:id returns a single task', async ({ authedRequest, createTask }) => {
    const created = await createTask({ title: 'Fetchable task' })

    const res = await authedRequest.get(\`/tasks/\${created.id}\`)
    expect(res.status()).toBe(200)

    const task = await res.json()
    expect(task).toMatchObject({
      id: created.id,
      title: 'Fetchable task',
      status: 'pending',
    })
  })

  test('PATCH /tasks/:id updates task status', async ({ authedRequest, createTask }) => {
    const created = await createTask({ title: 'Task to update' })

    const res = await authedRequest.patch(\`/tasks/\${created.id}\`, {
      data: { status: 'complete' },
    })
    expect(res.status()).toBe(200)

    const updated = await res.json()
    expect(updated.status).toBe('complete')
    expect(updated.title).toBe('Task to update') // title unchanged
  })

  test('PUT /tasks/:id replaces a task', async ({ authedRequest, createTask }) => {
    const created = await createTask({ title: 'Task to replace' })

    const res = await authedRequest.put(\`/tasks/\${created.id}\`, {
      data: { title: 'Replacement title', status: 'in_progress' },
    })
    expect(res.status()).toBe(200)

    const replaced = await res.json()
    expect(replaced.title).toBe('Replacement title')
    expect(replaced.status).toBe('in_progress')
  })

  test('DELETE /tasks/:id removes the task', async ({ authedRequest, createTask }) => {
    const created = await createTask({ title: 'Task to delete' })

    const deleteRes = await authedRequest.delete(\`/tasks/\${created.id}\`)
    expect(deleteRes.status()).toBe(204)

    // Confirm the task is gone
    const getRes = await authedRequest.get(\`/tasks/\${created.id}\`)
    expect(getRes.status()).toBe(404)
  })
})`}</KBCode>

      <KBH2 id="chaining-requests">Chaining requests</KBH2>

      <KBP>
        Many API workflows require the output of one request to drive the next. The pattern
        is straightforward: store the relevant data from the response in a variable and
        reference it in subsequent calls.
      </KBP>

      <KBCode language="typescript">{`test('moves a task through the full workflow', async ({ authedRequest, createTask }) => {
  // 1. Create a task
  const task = await createTask({ title: 'Workflow task', status: 'pending' })
  expect(task.status).toBe('pending')

  // 2. Start it
  const startRes = await authedRequest.patch(\`/tasks/\${task.id}\`, {
    data: { status: 'in_progress' },
  })
  expect(startRes.status()).toBe(200)
  const started = await startRes.json()
  expect(started.status).toBe('in_progress')

  // 3. Add a comment
  const commentRes = await authedRequest.post(\`/tasks/\${task.id}/comments\`, {
    data: { body: 'Making good progress' },
  })
  expect(commentRes.status()).toBe(201)
  const comment = await commentRes.json()
  const commentId = comment.id

  // 4. Complete the task
  const completeRes = await authedRequest.patch(\`/tasks/\${task.id}\`, {
    data: { status: 'complete' },
  })
  expect(completeRes.status()).toBe(200)

  // 5. Verify the full state
  const finalRes = await authedRequest.get(\`/tasks/\${task.id}\`)
  const final = await finalRes.json()
  expect(final.status).toBe('complete')
  expect(final.commentCount).toBe(1)

  // Clean up the comment (task cleanup handled by fixture)
  await authedRequest.delete(\`/tasks/\${task.id}/comments/\${commentId}\`)
})`}</KBCode>

      <KBH2 id="error-and-edge-cases">Testing error responses and edge cases</KBH2>

      <KBCode language="typescript">{`// tests/tasks.validation.test.ts
import { test, expect } from '../fixtures/auth'

test.describe('Task validation', () => {
  test('returns 400 when title is missing', async ({ authedRequest }) => {
    const res = await authedRequest.post('/tasks', {
      data: { status: 'pending' },
    })
    expect(res.status()).toBe(400)
    const error = await res.json()
    expect(error).toMatchObject({
      code: 'VALIDATION_ERROR',
      fields: expect.arrayContaining([
        expect.objectContaining({ field: 'title' })
      ]),
    })
  })

  test('returns 400 when title exceeds max length', async ({ authedRequest }) => {
    const res = await authedRequest.post('/tasks', {
      data: { title: 'x'.repeat(256), status: 'pending' },
    })
    expect(res.status()).toBe(400)
  })

  test('returns 422 for an invalid status value', async ({ authedRequest }) => {
    const res = await authedRequest.post('/tasks', {
      data: { title: 'Valid title', status: 'not-a-real-status' },
    })
    expect(res.status()).toBe(422)
  })

  test('returns 404 for a non-existent task ID', async ({ authedRequest }) => {
    const res = await authedRequest.get('/tasks/999999999')
    expect(res.status()).toBe(404)
  })

  test('returns 409 when creating a duplicate', async ({ authedRequest }) => {
    // Some APIs enforce uniqueness on title - check yours
    const data = { title: 'Unique task ' + Date.now(), status: 'pending' }

    const first = await authedRequest.post('/tasks', { data })
    expect(first.status()).toBe(201)
    const { id } = await first.json()

    const second = await authedRequest.post('/tasks', { data })
    expect(second.status()).toBe(409)

    // Clean up
    await authedRequest.delete(\`/tasks/\${id}\`)
  })
})`}</KBCode>

      <KBH2 id="pagination">Pagination and query parameters</KBH2>

      <KBCode language="typescript">{`test('pagination returns the correct subset of results', async ({ authedRequest, createTask }) => {
  // Create 5 tasks with known titles
  for (let i = 1; i <= 5; i++) {
    await createTask({ title: \`Pagination test \${i}\` })
  }

  // Request the first page of 2 results
  const page1Res = await authedRequest.get('/tasks', {
    params: { page: 1, limit: 2 },
  })
  expect(page1Res.status()).toBe(200)
  const page1 = await page1Res.json()
  expect(page1.items).toHaveLength(2)
  expect(page1.total).toBeGreaterThanOrEqual(5)
  expect(page1.page).toBe(1)

  // Request the second page
  const page2Res = await authedRequest.get('/tasks', {
    params: { page: 2, limit: 2 },
  })
  expect(page2Res.status()).toBe(200)
  const page2 = await page2Res.json()
  expect(page2.items).toHaveLength(2)

  // Confirm no overlap between pages
  const page1Ids = page1.items.map((t: { id: number }) => t.id)
  const page2Ids = page2.items.map((t: { id: number }) => t.id)
  const overlap = page1Ids.filter((id: number) => page2Ids.includes(id))
  expect(overlap).toHaveLength(0)
})`}</KBCode>

      <KBNote variant="green">
        Use <code>Date.now()</code> or a UUID library to generate unique titles and
        identifiers in tests. This prevents collisions when tests run concurrently and makes
        it easier to identify test-created data in logs and databases.
      </KBNote>

      <KBH2 id="auth-tests">Authentication and authorisation tests</KBH2>

      <KBCode language="typescript">{`// tests/tasks.auth.test.ts
import { test, expect } from '@playwright/test'

test.describe('Task authentication', () => {
  test('returns 401 without a token', async ({ request }) => {
    const res = await request.get('/tasks')
    expect(res.status()).toBe(401)
  })

  test('returns 401 with an invalid token', async ({ request }) => {
    const res = await request.get('/tasks', {
      headers: { 'Authorization': 'Bearer not-a-valid-token' },
    })
    expect(res.status()).toBe(401)
  })

  test('returns 403 when accessing another user task', async ({ request }) => {
    // Log in as user A and create a task
    const loginA = await request.post('/auth/login', {
      data: { email: process.env.USER_A_EMAIL!, password: process.env.USER_A_PASSWORD! },
    })
    const { token: tokenA } = await loginA.json()

    const createRes = await request.post('/tasks', {
      data: { title: 'User A task' },
      headers: { 'Authorization': \`Bearer \${tokenA}\` },
    })
    const { id } = await createRes.json()

    // Log in as user B and try to access user A's task
    const loginB = await request.post('/auth/login', {
      data: { email: process.env.USER_B_EMAIL!, password: process.env.USER_B_PASSWORD! },
    })
    const { token: tokenB } = await loginB.json()

    const accessRes = await request.get(\`/tasks/\${id}\`, {
      headers: { 'Authorization': \`Bearer \${tokenB}\` },
    })
    expect(accessRes.status()).toBe(403)

    // Clean up as user A
    await request.delete(\`/tasks/\${id}\`, {
      headers: { 'Authorization': \`Bearer \${tokenA}\` },
    })
  })
})`}</KBCode>

      <KBNote variant="warning">
        Authorisation tests are among the most valuable API tests you can write. A missed
        authorisation check is a security vulnerability. Testing that one user cannot read
        or modify another user's data is not optional for production APIs.
      </KBNote>
    </>
  )
}

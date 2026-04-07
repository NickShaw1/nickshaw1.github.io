import { KBH2, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBBanner from '../../../components/kb/KBBanner'
import KBCode from '../../../components/kb/KBCode'

export default function PlaywrightPageObjectModel() {
  return (
    <>
      <KBBanner variant="info">
        This article assumes you are comfortable writing and running Playwright tests. If not,
        work through the earlier articles in this guide first.
      </KBBanner>

      <KBP>
        As a test suite grows, a problem emerges. The same locators appear across multiple
        test files. The same sequences of actions (logging in, navigating to a page,
        submitting a form) are repeated in test after test. When the application changes,
        every test that references the affected element must be updated individually.
      </KBP>

      <KBP>
        The Page Object Model (POM) is a design pattern that solves this problem. It
        separates the details of how to interact with a page from the logic of what a test
        is verifying. Page objects become the single place where locators and actions are
        defined, so when the application changes, you update the page object once and every
        test that uses it continues to work.
      </KBP>

      <KBH2 id="the-maintenance-problem">The maintenance problem illustrated</KBH2>

      <KBP>
        Consider a login form that appears across five different test files. Each test
        navigates to the login page, fills in the email and password fields and clicks Submit.
        The test files might look something like this:
      </KBP>

      <KBCode language="typescript">{`// tests/checkout.spec.ts
test('guest can complete checkout after login', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  // ... rest of checkout test
});

// tests/account.spec.ts
test('user can update their profile', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill('user@example.com');
  await page.getByLabel('Password').fill('password123');
  await page.getByRole('button', { name: 'Sign in' }).click();
  // ... rest of account test
});`}</KBCode>

      <KBP>
        Now suppose the development team renames the button from "Sign in" to "Log in". Every
        test file that contains that locator must be updated. With five files, that is
        manageable. With fifty, it becomes a significant maintenance burden, and it is easy
        to miss one.
      </KBP>

      <KBH2 id="what-a-page-object-is">What a page object is</KBH2>

      <KBP>
        A page object is a TypeScript class that represents a page or a significant section
        of a page. It has two responsibilities:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>
          <strong className="text-text-primary">Properties for locators</strong>: the
          elements on the page that tests need to interact with or assert on.
        </li>
        <li>
          <strong className="text-text-primary">Methods for actions</strong>: sequences of
          interactions that represent meaningful user actions, such as filling in and
          submitting a form.
        </li>
      </ul>

      <KBNote variant="warning">
        Assertions do not belong in page objects. A page object describes how to interact
        with a page, not what is correct about it. Keeping assertions in tests and actions
        in page objects makes both easier to read and easier to maintain.
      </KBNote>

      <KBH2 id="building-a-page-object">Building a page object from scratch</KBH2>

      <KBP>
        Create a <code>pages/</code> folder at the root of your project to keep page objects
        separate from test files. Inside it, create <code>login-page.ts</code>:
      </KBP>

      <KBCode language="typescript">{`// pages/login-page.ts
import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByLabel('Email');
    this.passwordInput = page.getByLabel('Password');
    this.submitButton = page.getByRole('button', { name: 'Sign in' });
    this.errorMessage = page.getByRole('alert');
  }

  async goto() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}`}</KBCode>

      <KBP>
        The constructor receives the <code>page</code> object from the test and uses it to
        define locators. Locators are defined as class properties so they can be used both
        in the action methods and directly in tests when you need to assert on them.
      </KBP>

      <KBH2 id="using-a-page-object-in-tests">Using a page object in tests</KBH2>

      <KBP>
        In your test file, import the page object class, create an instance and use it:
      </KBP>

      <KBCode language="typescript">{`// tests/login.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';

test.describe('Login', () => {
  test('user can log in with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('user@example.com', 'password123');

    // The assertion lives in the test, not the page object
    await expect(page).toHaveURL('/dashboard');
  });

  test('shows an error with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login('user@example.com', 'wrongpassword');

    // Assert on the locator property directly
    await expect(loginPage.errorMessage).toHaveText('Invalid email or password');
  });
});`}</KBCode>

      <KBP>
        Notice how much cleaner the tests are. The mechanics of finding and interacting with
        elements are in the page object. The tests describe what they are verifying in plain
        language. If the "Sign in" button is renamed to "Log in", you update it in one place
        in <code>login-page.ts</code> and every test continues to pass.
      </KBP>

      <KBH2 id="multiple-page-objects">Working with multiple page objects</KBH2>

      <KBP>
        A real test suite will have many page objects. Create one per page or per major
        section of the application. Here is a <code>DashboardPage</code> that represents
        the page a user lands on after logging in:
      </KBP>

      <KBCode language="typescript">{`// pages/dashboard-page.ts
import { type Page, type Locator } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly welcomeHeading: Locator;
  readonly newOrderButton: Locator;
  readonly ordersList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.welcomeHeading = page.getByRole('heading', { name: /Welcome/ });
    this.newOrderButton = page.getByRole('link', { name: 'New order' });
    this.ordersList = page.getByRole('list', { name: 'Recent orders' });
  }

  async goto() {
    await this.page.goto('/dashboard');
  }
}`}</KBCode>

      <KBP>
        A test that spans the full login-to-dashboard flow uses both:
      </KBP>

      <KBCode language="typescript">{`// tests/login-flow.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';

test('user lands on dashboard after logging in', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashboardPage = new DashboardPage(page);

  await loginPage.goto();
  await loginPage.login('user@example.com', 'password123');

  await expect(dashboardPage.welcomeHeading).toBeVisible();
  await expect(page).toHaveURL('/dashboard');
});`}</KBCode>

      <KBH2 id="a-base-page-class">A base page class for shared behaviour</KBH2>

      <KBP>
        If several page objects share common behaviour, such as a navigation menu or a header
        component, you can extract this into a base class:
      </KBP>

      <KBCode language="typescript">{`// pages/base-page.ts
import { type Page, type Locator } from '@playwright/test';

export class BasePage {
  readonly page: Page;
  readonly navHome: Locator;
  readonly navOrders: Locator;
  readonly navAccount: Locator;

  constructor(page: Page) {
    this.page = page;
    this.navHome = page.getByRole('link', { name: 'Home' });
    this.navOrders = page.getByRole('link', { name: 'Orders' });
    this.navAccount = page.getByRole('link', { name: 'Account' });
  }
}

// pages/dashboard-page.ts
import { BasePage } from './base-page';
import { type Page, type Locator } from '@playwright/test';

export class DashboardPage extends BasePage {
  readonly welcomeHeading: Locator;

  constructor(page: Page) {
    super(page);
    this.welcomeHeading = page.getByRole('heading', { name: /Welcome/ });
  }
}`}</KBCode>

      <KBNote variant="warning">
        Base classes are useful but easy to overuse. Only put behaviour in a base class if it
        genuinely appears on every page that extends it. A sprawling base class full of
        rarely-used locators is harder to maintain than a small, focused one.
      </KBNote>

      <KBH2 id="component-objects">Component objects</KBH2>

      <KBP>
        Some UI components are complex enough and reused frequently enough to warrant their
        own object, separate from any specific page. A reusable data table, a date picker
        or a multi-step form might each justify a component object:
      </KBP>

      <KBCode language="typescript">{`// pages/components/data-table.ts
import { type Page, type Locator } from '@playwright/test';

export class DataTable {
  readonly table: Locator;

  constructor(page: Page, tableLabel: string) {
    this.table = page.getByRole('table', { name: tableLabel });
  }

  row(text: string): Locator {
    return this.table.getByRole('row').filter({ hasText: text });
  }

  async deleteRow(text: string) {
    await this.row(text).getByRole('button', { name: 'Delete' }).click();
  }
}`}</KBCode>

      <KBH2 id="what-not-to-put-in-a-page-object">What not to put in a page object</KBH2>

      <KBP>
        A few things make page objects harder to work with:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>
          <strong className="text-text-primary">Assertions.</strong> If an assertion fails
          inside a page object, the error message points to the page object file rather than
          the test, making it harder to understand which test scenario failed.
        </li>
        <li>
          <strong className="text-text-primary">Test data.</strong> Hard-coding usernames
          or passwords inside a page object ties it to a specific scenario. Pass test data
          as arguments to action methods instead.
        </li>
        <li>
          <strong className="text-text-primary">Business logic.</strong> Page objects should
          represent the UI layer, not make decisions about what the application should do.
        </li>
      </ul>

      <KBH2 id="when-pom-is-overkill">When POM is overkill</KBH2>

      <KBP>
        The Page Object Model adds a layer of abstraction. For very small projects with only
        a handful of tests, that abstraction may not be worth the overhead. If you have fewer
        than ten tests and your application is unlikely to grow significantly, writing tests
        directly without page objects is a reasonable choice.
      </KBP>

      <KBP>
        As soon as you find yourself copying and pasting the same locator or action sequence
        across multiple test files, it is time to introduce page objects.
      </KBP>

      <KBNote variant="blue">
        The official Playwright documentation covers page objects at{' '}
        <a
          href="https://playwright.dev/docs/pom"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link/80 transition-colors duration-150"
        >
          playwright.dev/docs/pom
        </a>.
      </KBNote>

      <KBH2 id="next-steps">Next steps</KBH2>

      <KBP>
        Your test suite now has a maintainable structure. The next article covers debugging
        and reporting: how to understand why tests fail, how to use Playwright's tooling to
        investigate failures and how to read and share test results.
      </KBP>
    </>
  )
}

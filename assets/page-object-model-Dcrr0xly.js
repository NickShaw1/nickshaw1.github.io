import{a as e}from"./markdown-hfXSdh9Q.js";import{t}from"./KBCode-C2513JFu.js";import{t as n}from"./KBNote-CaRhdL4n.js";import{r,t as i}from"./KBHeading-DROUfOXR.js";import{t as a}from"./KBBanner-Nh3F7juW.js";var o=e();function s(){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(a,{variant:`info`,children:`This article assumes you are comfortable writing and running Playwright tests. If not, work through the earlier articles in this guide first.`}),(0,o.jsx)(r,{children:`As a test suite grows, a problem emerges. The same locators appear across multiple test files. The same sequences of actions (logging in, navigating to a page, submitting a form) are repeated in test after test. When the application changes, every test that references the affected element must be updated individually.`}),(0,o.jsx)(r,{children:`The Page Object Model (POM) is a design pattern that solves this problem. It separates the details of how to interact with a page from the logic of what a test is verifying. Page objects become the single place where locators and actions are defined, so when the application changes, you update the page object once and every test that uses it continues to work.`}),(0,o.jsx)(i,{id:`the-maintenance-problem`,children:`The maintenance problem illustrated`}),(0,o.jsx)(r,{children:`Consider a login form that appears across five different test files. Each test navigates to the login page, fills in the email and password fields and clicks Submit. The test files might look something like this:`}),(0,o.jsx)(t,{language:`typescript`,children:`// tests/checkout.spec.ts
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
});`}),(0,o.jsx)(r,{children:`Now suppose the development team renames the button from "Sign in" to "Log in". Every test file that contains that locator must be updated. With five files, that is manageable. With fifty, it becomes a significant maintenance burden, and it is easy to miss one.`}),(0,o.jsx)(i,{id:`what-a-page-object-is`,children:`What a page object is`}),(0,o.jsx)(r,{children:`A page object is a TypeScript class that represents a page or a significant section of a page. It has two responsibilities:`}),(0,o.jsxs)(`ul`,{className:`my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed`,children:[(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{className:`text-text-primary`,children:`Properties for locators`}),`: the elements on the page that tests need to interact with or assert on.`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{className:`text-text-primary`,children:`Methods for actions`}),`: sequences of interactions that represent meaningful user actions, such as filling in and submitting a form.`]})]}),(0,o.jsx)(n,{variant:`warning`,children:`Assertions do not belong in page objects. A page object describes how to interact with a page, not what is correct about it. Keeping assertions in tests and actions in page objects makes both easier to read and easier to maintain.`}),(0,o.jsx)(i,{id:`building-a-page-object`,children:`Building a page object from scratch`}),(0,o.jsxs)(r,{children:[`Create a `,(0,o.jsx)(`code`,{children:`pages/`}),` folder at the root of your project to keep page objects separate from test files. Inside it, create `,(0,o.jsx)(`code`,{children:`login-page.ts`}),`:`]}),(0,o.jsx)(t,{language:`typescript`,children:`// pages/login-page.ts
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
}`}),(0,o.jsxs)(r,{children:[`The constructor receives the `,(0,o.jsx)(`code`,{children:`page`}),` object from the test and uses it to define locators. Locators are defined as class properties so they can be used both in the action methods and directly in tests when you need to assert on them.`]}),(0,o.jsx)(i,{id:`using-a-page-object-in-tests`,children:`Using a page object in tests`}),(0,o.jsx)(r,{children:`In your test file, import the page object class, create an instance and use it:`}),(0,o.jsx)(t,{language:`typescript`,children:`// tests/login.spec.ts
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
});`}),(0,o.jsxs)(r,{children:[`Notice how much cleaner the tests are. The mechanics of finding and interacting with elements are in the page object. The tests describe what they are verifying in plain language. If the "Sign in" button is renamed to "Log in", you update it in one place in `,(0,o.jsx)(`code`,{children:`login-page.ts`}),` and every test continues to pass.`]}),(0,o.jsx)(i,{id:`multiple-page-objects`,children:`Working with multiple page objects`}),(0,o.jsxs)(r,{children:[`A real test suite will have many page objects. Create one per page or per major section of the application. Here is a `,(0,o.jsx)(`code`,{children:`DashboardPage`}),` that represents the page a user lands on after logging in:`]}),(0,o.jsx)(t,{language:`typescript`,children:`// pages/dashboard-page.ts
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
}`}),(0,o.jsx)(r,{children:`A test that spans the full login-to-dashboard flow uses both:`}),(0,o.jsx)(t,{language:`typescript`,children:`// tests/login-flow.spec.ts
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
});`}),(0,o.jsx)(i,{id:`a-base-page-class`,children:`A base page class for shared behaviour`}),(0,o.jsx)(r,{children:`If several page objects share common behaviour, such as a navigation menu or a header component, you can extract this into a base class:`}),(0,o.jsx)(t,{language:`typescript`,children:`// pages/base-page.ts
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
}`}),(0,o.jsx)(n,{variant:`warning`,children:`Base classes are useful but easy to overuse. Only put behaviour in a base class if it genuinely appears on every page that extends it. A sprawling base class full of rarely-used locators is harder to maintain than a small, focused one.`}),(0,o.jsx)(i,{id:`component-objects`,children:`Component objects`}),(0,o.jsx)(r,{children:`Some UI components are complex enough and reused frequently enough to warrant their own object, separate from any specific page. A reusable data table, a date picker or a multi-step form might each justify a component object:`}),(0,o.jsx)(t,{language:`typescript`,children:`// pages/components/data-table.ts
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
}`}),(0,o.jsx)(i,{id:`what-not-to-put-in-a-page-object`,children:`What not to put in a page object`}),(0,o.jsx)(r,{children:`A few things make page objects harder to work with:`}),(0,o.jsxs)(`ul`,{className:`my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed`,children:[(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{className:`text-text-primary`,children:`Assertions.`}),` If an assertion fails inside a page object, the error message points to the page object file rather than the test, making it harder to understand which test scenario failed.`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{className:`text-text-primary`,children:`Test data.`}),` Hard-coding usernames or passwords inside a page object ties it to a specific scenario. Pass test data as arguments to action methods instead.`]}),(0,o.jsxs)(`li`,{children:[(0,o.jsx)(`strong`,{className:`text-text-primary`,children:`Business logic.`}),` Page objects should represent the UI layer, not make decisions about what the application should do.`]})]}),(0,o.jsx)(i,{id:`when-pom-is-overkill`,children:`When POM is overkill`}),(0,o.jsx)(r,{children:`The Page Object Model adds a layer of abstraction. For very small projects with only a handful of tests, that abstraction may not be worth the overhead. If you have fewer than ten tests and your application is unlikely to grow significantly, writing tests directly without page objects is a reasonable choice.`}),(0,o.jsx)(r,{children:`As soon as you find yourself copying and pasting the same locator or action sequence across multiple test files, it is time to introduce page objects.`}),(0,o.jsxs)(n,{variant:`blue`,children:[`The official Playwright documentation covers page objects at`,` `,(0,o.jsx)(`a`,{href:`https://playwright.dev/docs/pom`,target:`_blank`,rel:`noopener noreferrer`,className:`text-link hover:text-link/80 transition-colors duration-150`,children:`playwright.dev/docs/pom`}),`.`]}),(0,o.jsx)(i,{id:`next-steps`,children:`Next steps`}),(0,o.jsx)(r,{children:`Your test suite now has a maintainable structure. The next article covers debugging and reporting: how to understand why tests fail, how to use Playwright's tooling to investigate failures and how to read and share test results.`})]})}export{s as default};
---
title: "Setting up Playwright in VS Code for automated testing"
date: "2024-12-12"
slug: "setting-up-playwright-in-vs-code"
excerpt: "A step-by-step guide to setting up Playwright for automated testing in VS Code, covering installation of Node.js, Git, VS Code extensions and running your first tests."
category: "Testing"
readingTime: "6 min read"
---

> **Note:** the Knowledge Base now includes a dedicated [Playwright installation and setup guide](/knowledge-base/playwright/installation-and-setup) with more comprehensive coverage. This post remains a useful starting point.

This is a guide on setting up Playwright for test automation using VS Code, covering the installation of essential tools like Node.js, VS Code and the necessary extensions, along with configuring and running your first Playwright tests.

## Step 1: Sign up for a GitHub account

Creating a GitHub account gives you access to a platform for hosting, sharing and collaborating on code repositories.

1. Open your browser and go to [github.com](https://github.com).
2. Click **Sign Up** in the top-right corner.
3. Follow the on-screen sign-up process.

## Step 2: Install Git

To use GitHub from the command line, you need Git installed on your machine. Git is the version control system that GitHub is built on top of.

Download Git from the [official Git website](https://git-scm.com/downloads) and run the installer. The default options are suitable for most users.

Once installed, verify it worked by opening a terminal and running:

```bash
git --version
```

**Note**: during installation, ensure the option to add Git to your system's PATH is selected. This allows you to run `git` commands from any terminal window.

## Step 3: Install VS Code

Visual Studio Code (VS Code) is a lightweight, open-source code editor developed by Microsoft. It is the recommended editor for working with Playwright.

Download the latest version from the [official VS Code website](https://code.visualstudio.com/download).

**Note**: during installation, check the option to **Add VS Code to your system's PATH**. This lets you open any folder directly in VS Code from the terminal using the `code .` command.

## Step 4: Install Node.js

Node.js is a runtime environment that allows JavaScript to run outside the browser. Playwright requires it to install packages and run tests from the command line.

Download the LTS release from the [official Node.js website](https://nodejs.org/en).

**Note**: during installation, make sure the option to **add Node.js to your system's PATH** is checked. This allows you to run `node` and `npm` commands from any terminal window.

Once installed, open a terminal and run:

```bash
node -v
npm -v
```

Both commands should return a version number. If they do, you're good to go.

## Step 5: Install VS Code extensions

The following extensions are useful when writing and running Playwright tests in VS Code. They are all available from the Extensions panel (Ctrl + Shift + X).

- **Playwright Test for VS Code**: the official Microsoft extension. Integrates Playwright directly into VS Code with test discovery, one-click test execution and a built-in debugger.
- **ESLint**: flags JavaScript and TypeScript issues as you type, keeping your test scripts consistent and error-free.
- **Prettier – Code Formatter**: automatically formats your code on save, helping keep scripts readable across a team.
- **Playwright Snippets**: provides common Playwright code snippets to speed up test script creation.

**Note**: the built-in JavaScript Debugger that ships with VS Code handles browser debugging natively; no additional debugger extension is required.

## Step 6: Create a project and install Playwright

Open a terminal in VS Code (Ctrl + ` on Windows) and create a new project folder:

```bash
mkdir playwright-project
cd playwright-project
```

Then run the Playwright initialisation command:

```bash
npm init playwright@latest
```

This single command handles everything: it creates a `package.json`, installs the `@playwright/test` package, downloads the Chromium, Firefox and WebKit browser binaries and generates a `playwright.config.ts` configuration file along with an example test.

During the setup you will be prompted to choose between TypeScript and JavaScript and where to place your test files. The defaults are sensible; press Enter to accept them.

The resulting folder structure:

```
playwright-project/
├── tests/
│   └── example.spec.ts
├── playwright.config.ts
├── package.json
└── .gitignore
```

The initialisation creates an example test you can run straight away:

```typescript
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://example.com');
  await expect(page).toHaveTitle('Example Domain');
});
```

To run the tests:

```bash
npx playwright test
```

To view a detailed HTML report of the results:

```bash
npx playwright show-report
```

## Step 7: Official documentation and alternative approach

The official Playwright documentation is excellent and kept up to date. The VS Code-specific getting-started guide is [available here](https://playwright.dev/docs/getting-started-vscode).

Alternatively, once you have the Playwright Test for VS Code extension installed, you can initialise a project entirely from within the editor: open the Command Palette (Ctrl + Shift + P) and select **Install Playwright**. This runs the same initialisation process without needing the terminal.

## Conclusion

With Git, VS Code and Node.js installed, with their paths correctly added to your environment variables, you have everything you need to get started with Playwright.

The **Playwright Test for VS Code** extension ties everything together, and a single `npm init playwright@latest` command is all it takes to scaffold a working project. From there, you can begin writing and running automated tests immediately.

With a bit of practice, you'll be writing and running automated tests in no time.

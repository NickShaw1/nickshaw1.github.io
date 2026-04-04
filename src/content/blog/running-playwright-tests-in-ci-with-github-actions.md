---
title: "Running Playwright tests in CI with GitHub Actions"
date: "2026-04-04"
slug: "running-playwright-tests-in-ci-with-github-actions"
excerpt: "A step-by-step guide to running your Playwright tests automatically on every push using GitHub Actions, so bugs are caught before they reach production."
category: "Testing"
readingTime: "7 min read"
---

Once you have Playwright set up locally, the next step is making your tests run automatically on every push or pull request. This guide covers setting up a GitHub Actions workflow to run your Playwright test suite in CI, so broken tests are caught before code is merged.

This guide assumes you already have a Playwright project set up. If not, see [Setting up Playwright in VS Code for automated testing](/blog/setting-up-playwright-in-vs-code) first.

## What is CI and why does it matter?

CI stands for Continuous Integration. The idea is simple: every time code is pushed, an automated pipeline runs your tests and reports back. If tests pass, the code is safe to merge. If they fail, you know immediately, before anyone else is affected.

GitHub Actions is GitHub's built-in CI/CD platform. It is free for public repositories and has a generous free tier for private ones. No third-party account is needed; it runs directly in your GitHub repository.

## Step 1: Push your project to GitHub

If your project is not already on GitHub, initialise a repository and push it:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main
```

Make sure your `playwright.config.ts` and `package.json` are committed. The `node_modules` folder should be in your `.gitignore`, as Playwright's init command adds this automatically.

## Step 2: Create the workflow file

GitHub Actions workflows are defined in YAML files stored in `.github/workflows/`. Create that folder and add a file called `playwright.yml`:

```
your-project/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── tests/
├── playwright.config.ts
└── package.json
```

## Step 3: Write the workflow

Paste the following into `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test

      - name: Upload test report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

This workflow does the following:

- **Triggers** on every push and pull request to `main`
- **Checks out** your code onto the CI runner
- **Installs Node.js** and your project dependencies
- **Installs Playwright browsers** along with their system dependencies (`--with-deps` handles OS-level packages that the browsers need)
- **Runs your tests** with `npx playwright test`
- **Uploads the HTML report** as a downloadable artifact, even if tests fail, so you can inspect what went wrong

## Step 4: Push the workflow and watch it run

Commit and push the new file:

```bash
git add .github/workflows/playwright.yml
git commit -m "Add Playwright CI workflow"
git push
```

Head to your repository on GitHub and click the **Actions** tab. You should see your workflow running. Click into it to follow the live output of each step.

Once complete, if any tests failed you will see a red cross next to the run. Click **playwright-report** under Artifacts to download the full HTML report with screenshots and traces for each failure.

## Step 5: Make tests required on pull requests

To enforce that tests must pass before a PR can be merged:

1. Go to your repository **Settings** → **Branches**
2. Click **Add branch protection rule** for `main`
3. Enable **Require status checks to pass before merging**
4. Search for and select the **test** job from your workflow
5. Save the rule

From now on, GitHub will block any PR where the Playwright job fails.

## Tip: Caching dependencies

Every time your workflow runs, the `npm ci` step downloads and installs all of your project's dependencies from the internet from scratch. For a Playwright project this can mean dozens of packages, and on a slow runner it may take a minute or more just to get to the point where tests can actually start.

Caching solves this by saving a copy of your installed dependencies on GitHub's servers after the first run. On every subsequent run, instead of downloading everything again, GitHub restores that saved copy directly onto the runner. The `npm ci` step becomes near-instant because the packages are already there.

GitHub knows when to use the cache and when to rebuild it by generating a key based on the contents of your `package-lock.json`. If `package-lock.json` has not changed since the last run, the cached copy is used. If you have added, removed, or updated any packages (which changes `package-lock.json`), the cache key no longer matches and GitHub runs a fresh install, then saves a new cache for future runs.

To enable it, replace the Node.js setup step with:

```yaml
      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
```

The only change is adding `cache: 'npm'`. GitHub Actions handles everything else automatically.

This is particularly worthwhile for Playwright projects because the test suite itself is often fast, but setup time without caching can dwarf the actual test run. Caching keeps the feedback loop tight, which matters when you are pushing frequently or waiting on a PR to go green.

## Conclusion

With a single workflow file, every push to your repository now runs your full Playwright suite automatically. Failed tests surface immediately in the Actions tab, and the uploaded HTML report gives you the context to diagnose them quickly.

Combined with branch protection rules, this setup ensures broken tests can never be merged into `main` unnoticed, making it a simple but powerful safety net for any project.

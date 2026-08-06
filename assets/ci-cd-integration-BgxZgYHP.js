import{a as e}from"./markdown-hfXSdh9Q.js";import{t}from"./KBCode-C2513JFu.js";import{t as n}from"./KBNote-CaRhdL4n.js";import{n as r,r as i,t as a}from"./KBHeading-DROUfOXR.js";import{t as o}from"./KBBanner-Nh3F7juW.js";import{t as s}from"./KBVideo-CvFC_4kB.js";var c=e();function l(){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(o,{variant:`info`,children:`This article assumes your Playwright project runs locally. If not, complete the Installation and Project Setup article first.`}),(0,c.jsx)(s,{videoId:`gRXPp6RuExU`,title:`Get started with end-to-end testing: Playwright | Episode 6 - Running Tests on CI`,caption:`Running Playwright tests in CI`}),(0,c.jsx)(i,{children:`A test suite that only runs on a developer's machine provides limited value. Tests should run automatically on every push and pull request, catching regressions before code is merged. This is the purpose of Continuous Integration (CI).`}),(0,c.jsx)(i,{children:`Playwright is designed to run well in CI environments. It runs headless by default, produces machine-readable output and integrates cleanly with every major CI platform. This article covers the concepts that apply everywhere, then shows how to implement them in the most widely used platforms.`}),(0,c.jsx)(a,{id:`what-is-ci`,children:`What is CI/CD?`}),(0,c.jsx)(i,{children:`Continuous Integration (CI) is the practice of merging code changes frequently and verifying each merge with an automated build and test process. The goal is to detect failures as close to the moment they are introduced as possible, when they are cheapest to fix.`}),(0,c.jsx)(i,{children:`Continuous Delivery (CD) extends CI by automatically deploying code that has passed all tests to a staging or production environment. Together, CI/CD replaces manual release processes with a repeatable, auditable pipeline.`}),(0,c.jsx)(i,{children:`Without CI, a familiar pattern emerges: tests pass locally but fail in production, failures accumulate before anyone notices, and it becomes difficult to identify which change caused a problem. CI breaks this cycle by making test execution automatic, consistent and visible to the whole team.`}),(0,c.jsx)(a,{id:`playwright-in-ci`,children:`How Playwright behaves in CI`}),(0,c.jsxs)(i,{children:[`Playwright detects when it is running in a CI environment automatically by reading the `,(0,c.jsx)(`code`,{children:`CI`}),` environment variable, which every major CI platform sets. When this variable is present, Playwright adjusts its defaults:`]}),(0,c.jsxs)(`ul`,{className:`my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed`,children:[(0,c.jsxs)(`li`,{children:[(0,c.jsx)(`strong`,{className:`text-text-primary`,children:`Headless by default.`}),` Browsers run without a visible window, which is required on CI runners that have no display server.`]}),(0,c.jsxs)(`li`,{children:[(0,c.jsx)(`strong`,{className:`text-text-primary`,children:`No interactive prompts.`}),` Playwright never waits for user input.`]}),(0,c.jsxs)(`li`,{children:[(0,c.jsx)(`strong`,{className:`text-text-primary`,children:`Strict output.`}),` Exit codes are non-zero on any failure, which CI platforms interpret as a failed step.`]})]}),(0,c.jsx)(i,{children:`One thing CI runners do not include by default is the browser binaries Playwright needs. You must install them explicitly as part of your pipeline. The standard command is:`}),(0,c.jsx)(t,{language:`bash`,children:`npx playwright install --with-deps`}),(0,c.jsxs)(i,{children:[`The `,(0,c.jsx)(`code`,{children:`--with-deps`}),` flag also installs the operating system libraries that Chromium, Firefox and WebKit depend on. These are present on a developer's machine but not on a fresh CI runner.`]}),(0,c.jsx)(a,{id:`playwright-config-for-ci`,children:`Configuring Playwright for CI`}),(0,c.jsxs)(i,{children:[`Several `,(0,c.jsx)(`code`,{children:`playwright.config.ts`}),` settings are worth setting explicitly for CI rather than relying on defaults.`]}),(0,c.jsx)(t,{language:`typescript`,children:`import { defineConfig } from '@playwright/test'

export default defineConfig({
  // Fail the run if test.only() was accidentally committed
  forbidOnly: !!process.env.CI,

  // Retry failing tests once on CI to reduce flake noise
  retries: process.env.CI ? 1 : 0,

  // Use fewer workers on CI to avoid resource contention
  workers: process.env.CI ? 2 : undefined,

  reporter: [
    ['html', { open: 'never' }],
    ['junit', { outputFile: 'results.xml' }],
  ],
})`}),(0,c.jsxs)(i,{children:[`The `,(0,c.jsx)(`code`,{children:`!!process.env.CI`}),` pattern evaluates to `,(0,c.jsx)(`code`,{children:`true`}),` when the`,(0,c.jsx)(`code`,{children:`CI`}),` variable is set and `,(0,c.jsx)(`code`,{children:`false`}),` otherwise, so the same config file works in both local and CI contexts.`]}),(0,c.jsx)(n,{variant:`blue`,children:`The JUnit reporter produces an XML file that most CI platforms can parse to display per-test results directly in the pipeline UI, without requiring the HTML report to be downloaded.`}),(0,c.jsx)(a,{id:`github-actions`,children:`GitHub Actions`}),(0,c.jsxs)(i,{children:[`GitHub Actions is GitHub's built-in CI/CD platform. Workflows are defined in YAML files stored in a `,(0,c.jsx)(`code`,{children:`.github/workflows/`}),` folder in your repository.`]}),(0,c.jsx)(t,{language:`yaml`,children:`name: Playwright Tests

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
          cache: 'npm'

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
          retention-days: 30`}),(0,c.jsxs)(i,{children:[`The `,(0,c.jsx)(`code`,{children:`if: always()`}),` condition on the upload step ensures the report is uploaded regardless of whether tests passed or failed. Without it, the artifact would only be available on successful runs, which is exactly when you need it least.`]}),(0,c.jsxs)(i,{children:[`To require tests to pass before a pull request can be merged, go to your repository`,(0,c.jsx)(`strong`,{children:` Settings`}),`, open `,(0,c.jsx)(`strong`,{children:`Branches`}),`, add a protection rule for `,(0,c.jsx)(`code`,{children:`main`}),` and enable `,(0,c.jsx)(`strong`,{children:`Require status checks to pass before merging`}),`. Select the `,(0,c.jsx)(`code`,{children:`test`}),` job from your workflow.`]}),(0,c.jsx)(i,{children:`To pass secrets to your tests in GitHub Actions:`}),(0,c.jsx)(t,{language:`yaml`,children:`- name: Run Playwright tests
  run: npx playwright test
  env:
    BASE_URL: \${{ secrets.STAGING_URL }}
    TEST_PASSWORD: \${{ secrets.TEST_USER_PASSWORD }}`}),(0,c.jsxs)(i,{children:[`Add secrets under repository `,(0,c.jsx)(`strong`,{children:`Settings`}),`, then`,(0,c.jsx)(`strong`,{children:` Secrets and variables`}),`, then `,(0,c.jsx)(`strong`,{children:`Actions`}),`. Secrets are stored encrypted and are never visible in workflow logs.`]}),(0,c.jsx)(r,{id:`github-actions-sharding`,children:`Sharding in GitHub Actions`}),(0,c.jsx)(i,{children:`For large suites, sharding splits tests across multiple parallel runners. Each runner handles a fraction of the suite simultaneously, reducing total run time proportionally.`}),(0,c.jsx)(t,{language:`yaml`,children:`jobs:
  test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        shard: [1/4, 2/4, 3/4, 4/4]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=\${{ matrix.shard }}
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: blob-report-\${{ matrix.shard }}
          path: blob-report/
          retention-days: 1

  merge-reports:
    if: always()
    needs: [test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - uses: actions/download-artifact@v4
        with:
          path: all-blob-reports
          pattern: blob-report-*
          merge-multiple: true
      - run: npx playwright merge-reports --reporter html ./all-blob-reports
      - uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30`}),(0,c.jsx)(a,{id:`gitlab-ci`,children:`GitLab CI`}),(0,c.jsxs)(i,{children:[`GitLab CI/CD is configured through a `,(0,c.jsx)(`code`,{children:`.gitlab-ci.yml`}),` file in the root of your repository. GitLab provides its own runner infrastructure and also supports self-hosted runners.`]}),(0,c.jsx)(t,{language:`yaml`,children:`image: mcr.microsoft.com/playwright:v1.44.0-jammy

stages:
  - test

playwright:
  stage: test
  script:
    - npm ci
    - npx playwright test
  artifacts:
    when: always
    paths:
      - playwright-report/
    expire_in: 1 week`}),(0,c.jsxs)(i,{children:[`The `,(0,c.jsx)(`code`,{children:`mcr.microsoft.com/playwright`}),` Docker image is the official Microsoft image that includes all required browser dependencies pre-installed. Using it means you do not need to run `,(0,c.jsx)(`code`,{children:`npx playwright install --with-deps`}),` as the browsers are already present in the image.`]}),(0,c.jsxs)(i,{children:[`Pass secrets using GitLab CI/CD variables, which you add under`,(0,c.jsx)(`strong`,{children:` Settings > CI/CD > Variables`}),` in your project:`]}),(0,c.jsx)(t,{language:`yaml`,children:`playwright:
  stage: test
  script:
    - npm ci
    - npx playwright test
  variables:
    BASE_URL: $STAGING_URL
    TEST_PASSWORD: $TEST_USER_PASSWORD`}),(0,c.jsxs)(n,{variant:`warning`,children:[`The image tag `,(0,c.jsx)(`code`,{children:`v1.44.0-jammy`}),` is used as an example. Always use the tag that matches your installed Playwright version. Check the latest available tags at`,` `,(0,c.jsx)(`a`,{href:`https://mcr.microsoft.com/en-us/artifact/mar/playwright`,target:`_blank`,rel:`noopener noreferrer`,className:`text-link hover:text-link/80 transition-colors duration-150`,children:`mcr.microsoft.com`}),`.`]}),(0,c.jsxs)(n,{variant:`blue`,children:[`GitLab CI uses `,(0,c.jsx)(`code`,{children:`$VARIABLE_NAME`}),` syntax rather than the`,(0,c.jsx)(`code`,{children:"${{ secrets.NAME }}"}),` syntax used by GitHub Actions.`]}),(0,c.jsx)(a,{id:`azure-pipelines`,children:`Azure Pipelines`}),(0,c.jsxs)(i,{children:[`Azure Pipelines is Microsoft's CI/CD platform, part of Azure DevOps. It is configured through an `,(0,c.jsx)(`code`,{children:`azure-pipelines.yml`}),` file in your repository root. It integrates directly with Azure Repos but also supports GitHub repositories.`]}),(0,c.jsx)(t,{language:`yaml`,children:`trigger:
  branches:
    include:
      - main

pool:
  vmImage: ubuntu-latest

steps:
  - task: NodeTool@0
    inputs:
      versionSpec: '20.x'
    displayName: 'Install Node.js'

  - script: npm ci
    displayName: 'Install dependencies'

  - script: npx playwright install --with-deps
    displayName: 'Install Playwright browsers'

  - script: npx playwright test
    displayName: 'Run Playwright tests'
    env:
      BASE_URL: $(STAGING_URL)
      TEST_PASSWORD: $(TEST_USER_PASSWORD)

  - task: PublishTestResults@2
    condition: always()
    inputs:
      testResultsFormat: 'JUnit'
      testResultsFiles: 'results.xml'
      testRunTitle: 'Playwright Tests'

  - task: PublishPipelineArtifact@1
    condition: always()
    inputs:
      targetPath: playwright-report
      artifact: playwright-report`}),(0,c.jsxs)(i,{children:[`Azure Pipelines has a dedicated `,(0,c.jsx)(`code`,{children:`PublishTestResults`}),` task that reads the JUnit XML file and renders per-test results directly in the pipeline run UI. This is particularly useful for identifying individual failing tests without downloading the full HTML report.`]}),(0,c.jsxs)(i,{children:[`Store secrets as pipeline variables under`,(0,c.jsx)(`strong`,{children:` Pipelines > Library > Variable groups`}),` in Azure DevOps. Reference them with `,(0,c.jsx)(`code`,{children:`$(VARIABLE_NAME)`}),` syntax.`]}),(0,c.jsx)(a,{id:`circleci`,children:`CircleCI`}),(0,c.jsxs)(i,{children:[`CircleCI is configured through a `,(0,c.jsx)(`code`,{children:`.circleci/config.yml`}),` file. It supports Docker executors natively and has a library of reusable config packages called orbs.`]}),(0,c.jsx)(t,{language:`yaml`,children:`version: 2.1

jobs:
  playwright:
    docker:
      - image: mcr.microsoft.com/playwright:v1.44.0-jammy
    steps:
      - checkout
      - run:
          name: Install dependencies
          command: npm ci
      - run:
          name: Run Playwright tests
          command: npx playwright test
          environment:
            BASE_URL: $STAGING_URL
            TEST_PASSWORD: $TEST_USER_PASSWORD
      - store_artifacts:
          path: playwright-report
      - store_test_results:
          path: results.xml

workflows:
  test:
    jobs:
      - playwright`}),(0,c.jsxs)(i,{children:[`Like GitLab CI, this uses the official Playwright Docker image so browser installation is handled by the image. The `,(0,c.jsx)(`code`,{children:`store_test_results`}),` step sends the JUnit XML to CircleCI's test insights dashboard.`]}),(0,c.jsxs)(i,{children:[`Store sensitive values as environment variables under`,(0,c.jsx)(`strong`,{children:` Project Settings > Environment Variables`}),` in the CircleCI UI. They are injected automatically into the build environment and referenced with standard `,(0,c.jsx)(`code`,{children:`$VARIABLE_NAME`}),` syntax.`]}),(0,c.jsx)(a,{id:`jenkins`,children:`Jenkins`}),(0,c.jsxs)(i,{children:[`Jenkins is a self-hosted automation server. Pipelines are defined in a`,(0,c.jsx)(`code`,{children:`Jenkinsfile`}),` at the root of your repository using either declarative or scripted syntax.`]}),(0,c.jsx)(t,{language:`groovy`,children:`pipeline {
  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.44.0-jammy'
    }
  }

  environment {
    BASE_URL     = credentials('staging-url')
    TEST_PASSWORD = credentials('test-user-password')
  }

  stages {
    stage('Install') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Test') {
      steps {
        sh 'npx playwright test'
      }
    }
  }

  post {
    always {
      junit 'results.xml'
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}`}),(0,c.jsxs)(i,{children:[`The `,(0,c.jsx)(`code`,{children:`credentials()`}),` function reads secrets from Jenkins' built-in credentials store. Add credentials under`,(0,c.jsx)(`strong`,{children:` Manage Jenkins > Credentials`}),`. The `,(0,c.jsx)(`code`,{children:`junit`}),` post-step publishes the test results to Jenkins' test trend graphs.`]}),(0,c.jsx)(n,{variant:`warning`,children:`Jenkins requires the Pipeline, JUnit and Docker Pipeline plugins to use the syntax above. Ensure these are installed before adding your Jenkinsfile.`}),(0,c.jsx)(a,{id:`common-patterns`,children:`Patterns that apply everywhere`}),(0,c.jsx)(i,{children:`Regardless of which CI platform you use, several practices apply universally:`}),(0,c.jsxs)(`ul`,{className:`my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed`,children:[(0,c.jsxs)(`li`,{children:[(0,c.jsx)(`strong`,{className:`text-text-primary`,children:`Never store secrets in code.`}),` Every platform provides a secrets or credentials store. Use it. Credentials committed to a repository are compromised the moment the repository is shared or made public.`]}),(0,c.jsxs)(`li`,{children:[(0,c.jsx)(`strong`,{className:`text-text-primary`,children:`Upload artifacts unconditionally.`}),` The test report is most valuable when tests fail. Ensure your artifact upload step runs regardless of test outcome using the platform's equivalent of `,(0,c.jsx)(`code`,{children:`always()`}),`.`]}),(0,c.jsxs)(`li`,{children:[(0,c.jsx)(`strong`,{className:`text-text-primary`,children:`Use the official Playwright Docker image.`}),` On platforms that support Docker executors, `,(0,c.jsx)(`code`,{children:`mcr.microsoft.com/playwright`}),`eliminates browser installation steps and produces consistent, reproducible environments.`]}),(0,c.jsxs)(`li`,{children:[(0,c.jsx)(`strong`,{className:`text-text-primary`,children:`Cache dependencies.`}),` Installing node_modules from scratch on every run adds unnecessary time. Most platforms offer dependency caching keyed to your lock file.`]}),(0,c.jsxs)(`li`,{children:[(0,c.jsx)(`strong`,{className:`text-text-primary`,children:`Enforce tests as a merge gate.`}),` CI only prevents regressions if failing tests can block a merge. Configure branch protection or equivalent rules on your main branch.`]})]}),(0,c.jsx)(a,{id:`next-steps`,children:`Next steps`}),(0,c.jsx)(i,{children:`Your tests now run automatically in CI on every push and pull request. The final article in this guide covers advanced patterns: API mocking, authentication state, fixtures, multiple tabs, iframes, file handling and accessibility testing.`})]})}export{l as default};
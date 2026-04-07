import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBBanner from '../../../components/kb/KBBanner'
import KBCode from '../../../components/kb/KBCode'
import KBVideo from '../../../components/kb/KBVideo'

export default function PlaywrightCiCdIntegration() {
  return (
    <>
      <KBBanner variant="info">
        This article assumes your Playwright project runs locally. If not, complete the
        Installation and Project Setup article first.
      </KBBanner>

      <KBVideo
        videoId="gRXPp6RuExU"
        title="Get started with end-to-end testing: Playwright | Episode 6 - Running Tests on CI"
        caption="Running Playwright tests in CI"
      />

      <KBP>
        A test suite that only runs on a developer's machine provides limited value. Tests
        should run automatically on every push and pull request, catching regressions before
        code is merged. This is the purpose of Continuous Integration (CI).
      </KBP>

      <KBP>
        Playwright is designed to run well in CI environments. It runs headless by default,
        produces machine-readable output and integrates cleanly with every major CI platform.
        This article covers the concepts that apply everywhere, then shows how to implement
        them in the most widely used platforms.
      </KBP>

      <KBH2 id="what-is-ci">What is CI/CD?</KBH2>

      <KBP>
        Continuous Integration (CI) is the practice of merging code changes frequently and
        verifying each merge with an automated build and test process. The goal is to detect
        failures as close to the moment they are introduced as possible, when they are
        cheapest to fix.
      </KBP>

      <KBP>
        Continuous Delivery (CD) extends CI by automatically deploying code that has passed
        all tests to a staging or production environment. Together, CI/CD replaces manual
        release processes with a repeatable, auditable pipeline.
      </KBP>

      <KBP>
        Without CI, a familiar pattern emerges: tests pass locally but fail in production,
        failures accumulate before anyone notices, and it becomes difficult to identify which
        change caused a problem. CI breaks this cycle by making test execution automatic,
        consistent and visible to the whole team.
      </KBP>

      <KBH2 id="playwright-in-ci">How Playwright behaves in CI</KBH2>

      <KBP>
        Playwright detects when it is running in a CI environment automatically by reading
        the <code>CI</code> environment variable, which every major CI platform sets. When
        this variable is present, Playwright adjusts its defaults:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>
          <strong className="text-text-primary">Headless by default.</strong> Browsers run
          without a visible window, which is required on CI runners that have no display
          server.
        </li>
        <li>
          <strong className="text-text-primary">No interactive prompts.</strong> Playwright
          never waits for user input.
        </li>
        <li>
          <strong className="text-text-primary">Strict output.</strong> Exit codes are
          non-zero on any failure, which CI platforms interpret as a failed step.
        </li>
      </ul>

      <KBP>
        One thing CI runners do not include by default is the browser binaries Playwright
        needs. You must install them explicitly as part of your pipeline. The standard
        command is:
      </KBP>

      <KBCode language="bash">{`npx playwright install --with-deps`}</KBCode>

      <KBP>
        The <code>--with-deps</code> flag also installs the operating system libraries that
        Chromium, Firefox and WebKit depend on. These are present on a developer's machine
        but not on a fresh CI runner.
      </KBP>

      <KBH2 id="playwright-config-for-ci">Configuring Playwright for CI</KBH2>

      <KBP>
        Several <code>playwright.config.ts</code> settings are worth setting explicitly
        for CI rather than relying on defaults.
      </KBP>

      <KBCode language="typescript">{`import { defineConfig } from '@playwright/test'

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
})`}</KBCode>

      <KBP>
        The <code>!!process.env.CI</code> pattern evaluates to <code>true</code> when the
        <code>CI</code> variable is set and <code>false</code> otherwise, so the same config
        file works in both local and CI contexts.
      </KBP>

      <KBNote variant="blue">
        The JUnit reporter produces an XML file that most CI platforms can parse to display
        per-test results directly in the pipeline UI, without requiring the HTML report to
        be downloaded.
      </KBNote>

      <KBH2 id="github-actions">GitHub Actions</KBH2>

      <KBP>
        GitHub Actions is GitHub's built-in CI/CD platform. Workflows are defined in YAML
        files stored in a <code>.github/workflows/</code> folder in your repository.
      </KBP>

      <KBCode language="yaml">{`name: Playwright Tests

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
          retention-days: 30`}</KBCode>

      <KBP>
        The <code>if: always()</code> condition on the upload step ensures the report is
        uploaded regardless of whether tests passed or failed. Without it, the artifact
        would only be available on successful runs, which is exactly when you need it least.
      </KBP>

      <KBP>
        To require tests to pass before a pull request can be merged, go to your repository
        <strong> Settings</strong>, open <strong>Branches</strong>, add a protection rule
        for <code>main</code> and enable <strong>Require status checks to pass before
        merging</strong>. Select the <code>test</code> job from your workflow.
      </KBP>

      <KBP>
        To pass secrets to your tests in GitHub Actions:
      </KBP>

      <KBCode language="yaml">{`- name: Run Playwright tests
  run: npx playwright test
  env:
    BASE_URL: \${{ secrets.STAGING_URL }}
    TEST_PASSWORD: \${{ secrets.TEST_USER_PASSWORD }}`}</KBCode>

      <KBP>
        Add secrets under repository <strong>Settings</strong>, then
        <strong> Secrets and variables</strong>, then <strong>Actions</strong>. Secrets are
        stored encrypted and are never visible in workflow logs.
      </KBP>

      <KBH3 id="github-actions-sharding">Sharding in GitHub Actions</KBH3>

      <KBP>
        For large suites, sharding splits tests across multiple parallel runners. Each runner
        handles a fraction of the suite simultaneously, reducing total run time proportionally.
      </KBP>

      <KBCode language="yaml">{`jobs:
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
          retention-days: 30`}</KBCode>

      <KBH2 id="gitlab-ci">GitLab CI</KBH2>

      <KBP>
        GitLab CI/CD is configured through a <code>.gitlab-ci.yml</code> file in the root
        of your repository. GitLab provides its own runner infrastructure and also supports
        self-hosted runners.
      </KBP>

      <KBCode language="yaml">{`image: mcr.microsoft.com/playwright:v1.44.0-jammy

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
    expire_in: 1 week`}</KBCode>

      <KBP>
        The <code>mcr.microsoft.com/playwright</code> Docker image is the official Microsoft
        image that includes all required browser dependencies pre-installed. Using it means
        you do not need to run <code>npx playwright install --with-deps</code> as the browsers
        are already present in the image.
      </KBP>

      <KBP>
        Pass secrets using GitLab CI/CD variables, which you add under
        <strong> Settings &gt; CI/CD &gt; Variables</strong> in your project:
      </KBP>

      <KBCode language="yaml">{`playwright:
  stage: test
  script:
    - npm ci
    - npx playwright test
  variables:
    BASE_URL: $STAGING_URL
    TEST_PASSWORD: $TEST_USER_PASSWORD`}</KBCode>

      <KBNote variant="warning">
        The image tag <code>v1.44.0-jammy</code> is used as an example. Always use the tag
        that matches your installed Playwright version. Check the latest available tags at{' '}
        <a
          href="https://mcr.microsoft.com/en-us/artifact/mar/playwright"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link/80 transition-colors duration-150"
        >
          mcr.microsoft.com
        </a>.
      </KBNote>

      <KBNote variant="blue">
        GitLab CI uses <code>$VARIABLE_NAME</code> syntax rather than the
        <code>{`\${{ secrets.NAME }}`}</code> syntax used by GitHub Actions.
      </KBNote>

      <KBH2 id="azure-pipelines">Azure Pipelines</KBH2>

      <KBP>
        Azure Pipelines is Microsoft's CI/CD platform, part of Azure DevOps. It is
        configured through an <code>azure-pipelines.yml</code> file in your repository root.
        It integrates directly with Azure Repos but also supports GitHub repositories.
      </KBP>

      <KBCode language="yaml">{`trigger:
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
      artifact: playwright-report`}</KBCode>

      <KBP>
        Azure Pipelines has a dedicated <code>PublishTestResults</code> task that reads the
        JUnit XML file and renders per-test results directly in the pipeline run UI. This
        is particularly useful for identifying individual failing tests without downloading
        the full HTML report.
      </KBP>

      <KBP>
        Store secrets as pipeline variables under
        <strong> Pipelines &gt; Library &gt; Variable groups</strong> in Azure DevOps.
        Reference them with <code>$(VARIABLE_NAME)</code> syntax.
      </KBP>

      <KBH2 id="circleci">CircleCI</KBH2>

      <KBP>
        CircleCI is configured through a <code>.circleci/config.yml</code> file. It supports
        Docker executors natively and has a library of reusable config packages called orbs.
      </KBP>

      <KBCode language="yaml">{`version: 2.1

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
      - playwright`}</KBCode>

      <KBP>
        Like GitLab CI, this uses the official Playwright Docker image so browser
        installation is handled by the image. The <code>store_test_results</code> step
        sends the JUnit XML to CircleCI's test insights dashboard.
      </KBP>

      <KBP>
        Store sensitive values as environment variables under
        <strong> Project Settings &gt; Environment Variables</strong> in the CircleCI UI.
        They are injected automatically into the build environment and referenced with
        standard <code>$VARIABLE_NAME</code> syntax.
      </KBP>

      <KBH2 id="jenkins">Jenkins</KBH2>

      <KBP>
        Jenkins is a self-hosted automation server. Pipelines are defined in a
        <code>Jenkinsfile</code> at the root of your repository using either declarative
        or scripted syntax.
      </KBP>

      <KBCode language="groovy">{`pipeline {
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
}`}</KBCode>

      <KBP>
        The <code>credentials()</code> function reads secrets from Jenkins' built-in
        credentials store. Add credentials under
        <strong> Manage Jenkins &gt; Credentials</strong>. The <code>junit</code> post-step
        publishes the test results to Jenkins' test trend graphs.
      </KBP>

      <KBNote variant="warning">
        Jenkins requires the Pipeline, JUnit and Docker Pipeline plugins to use the syntax
        above. Ensure these are installed before adding your Jenkinsfile.
      </KBNote>

      <KBH2 id="common-patterns">Patterns that apply everywhere</KBH2>

      <KBP>
        Regardless of which CI platform you use, several practices apply universally:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>
          <strong className="text-text-primary">Never store secrets in code.</strong> Every
          platform provides a secrets or credentials store. Use it. Credentials committed
          to a repository are compromised the moment the repository is shared or made public.
        </li>
        <li>
          <strong className="text-text-primary">Upload artifacts unconditionally.</strong> The
          test report is most valuable when tests fail. Ensure your artifact upload step runs
          regardless of test outcome using the platform's equivalent of <code>always()</code>.
        </li>
        <li>
          <strong className="text-text-primary">Use the official Playwright Docker image.</strong> On
          platforms that support Docker executors, <code>mcr.microsoft.com/playwright</code>
          eliminates browser installation steps and produces consistent, reproducible
          environments.
        </li>
        <li>
          <strong className="text-text-primary">Cache dependencies.</strong> Installing
          node_modules from scratch on every run adds unnecessary time. Most platforms offer
          dependency caching keyed to your lock file.
        </li>
        <li>
          <strong className="text-text-primary">Enforce tests as a merge gate.</strong> CI
          only prevents regressions if failing tests can block a merge. Configure branch
          protection or equivalent rules on your main branch.
        </li>
      </ul>

      <KBH2 id="next-steps">Next steps</KBH2>

      <KBP>
        Your tests now run automatically in CI on every push and pull request. The final
        article in this guide covers advanced patterns: API mocking, authentication state,
        fixtures, multiple tabs, iframes, file handling and accessibility testing.
      </KBP>
    </>
  )
}

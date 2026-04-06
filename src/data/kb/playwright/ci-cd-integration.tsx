import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBBanner from '../../../components/kb/KBBanner'
import KBCode from '../../../components/kb/KBCode'
import KBSteps from '../../../components/kb/KBSteps'
import KBVideo from '../../../components/kb/KBVideo'

export default function PlaywrightCiCdIntegration() {
  return (
    <>
      <KBBanner variant="info">
        This article assumes your Playwright project is ready to run locally and that you
        have a GitHub account. If not, complete the Installation and Project Setup article
        first.
      </KBBanner>

      <KBVideo
        videoId="gRXPp6RuExU"
        title="Get started with end-to-end testing: Playwright | Episode 6 - Running Tests on CI"
        caption="Running Playwright tests automatically in CI with GitHub Actions"
      />

      <KBP>
        A test suite that only runs locally provides limited value. Tests should run
        automatically on every push and on every pull request, catching failures before
        code is merged. This is the core idea behind Continuous Integration (CI).
      </KBP>

      <KBP>
        GitHub Actions is GitHub's built-in CI/CD platform. It is free for public
        repositories and has a generous free tier for private ones. It requires no
        third-party account and is configured through YAML files stored directly in your
        repository.
      </KBP>

      <KBH2 id="what-is-ci">What is CI and why does it matter?</KBH2>

      <KBP>
        CI stands for Continuous Integration. The principle is that every code change is
        integrated into the main branch frequently, and every integration is verified by
        an automated build and test process. When a test fails, the team knows immediately
        and can fix the problem before it affects anyone else.
      </KBP>

      <KBP>
        Without CI, a common pattern emerges: developers run tests locally before pushing,
        but only some of the time, and not always against the same environment. Tests that
        pass locally fail in production. Failures pile up and become harder to attribute to
        a specific change. CI breaks this pattern by making test execution automatic,
        consistent and visible to the whole team.
      </KBP>

      <KBH2 id="github-actions-concepts">GitHub Actions concepts</KBH2>

      <KBP>
        Before writing the workflow file, it helps to understand the key terms:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>
          <strong className="text-text-primary">Workflow.</strong> A workflow is an automated
          process defined in a YAML file. A repository can have multiple workflows, each
          triggered independently.
        </li>
        <li>
          <strong className="text-text-primary">Trigger.</strong> The event that starts a
          workflow, such as a push to a branch or the opening of a pull request.
        </li>
        <li>
          <strong className="text-text-primary">Job.</strong> A workflow contains one or
          more jobs. Each job runs on a fresh virtual machine called a runner.
        </li>
        <li>
          <strong className="text-text-primary">Step.</strong> Each job contains a sequence
          of steps. Each step either runs a shell command or uses a pre-built action from
          the GitHub Actions marketplace.
        </li>
        <li>
          <strong className="text-text-primary">Runner.</strong> A virtual machine provided
          by GitHub that executes the steps in a job. The most commonly used runner is
          <code>ubuntu-latest</code>.
        </li>
      </ul>

      <KBH2 id="pushing-your-project-to-github">Pushing your project to GitHub</KBH2>

      <KBP>
        If your project is not already on GitHub, initialise a repository and push it.
        First, create a new repository on GitHub through the website, then run the
        following in your project folder:
      </KBP>

      <KBCode language="bash">{`git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/your-username/your-repo.git
git push -u origin main`}</KBCode>

      <KBP>
        Before pushing, verify that your <code>.gitignore</code> file includes
        <code>node_modules/</code>. The Playwright initialisation command adds this
        automatically. You should also ensure <code>playwright.config.ts</code>,
        <code>package.json</code> and <code>package-lock.json</code> are all committed,
        as the CI workflow depends on them.
      </KBP>

      <KBH2 id="creating-the-workflow-file">Creating the workflow file</KBH2>

      <KBP>
        GitHub Actions workflows are stored in a <code>.github/workflows/</code> folder in
        your repository root. Create that folder and add a file called
        <code>playwright.yml</code>:
      </KBP>

      <KBCode language="text">{`your-project/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── tests/
├── playwright.config.ts
└── package.json`}</KBCode>

      <KBH2 id="writing-the-workflow">Writing the workflow</KBH2>

      <KBP>
        Add the following to <code>.github/workflows/playwright.yml</code>:
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

      <KBH2 id="workflow-explained">The workflow explained step by step</KBH2>

      <KBSteps variant="green" steps={[
        {
          title: 'Trigger',
          body: 'The workflow runs on any push to main and on any pull request targeting main. This means every proposed change is tested before it is merged.',
        },
        {
          title: 'Checkout repository',
          body: 'The actions/checkout action downloads your repository code onto the runner. Without this step, the runner would have an empty workspace.',
        },
        {
          title: 'Set up Node.js',
          body: 'The actions/setup-node action installs Node.js version 20 on the runner. The cache: \'npm\' option caches your installed node_modules between runs, which is explained in detail below.',
        },
        {
          title: 'Install dependencies',
          body: 'npm ci installs your dependencies exactly as specified in package-lock.json. Unlike npm install, it never modifies package-lock.json and will fail if there is any discrepancy between the lock file and package.json. This ensures CI always installs the exact same dependency versions as your team.',
        },
        {
          title: 'Install Playwright browsers',
          body: 'npx playwright install downloads the browser binaries Playwright needs. The --with-deps flag also installs the operating system level dependencies required by those browsers, such as shared libraries that Chromium depends on. These are not installed on the runner by default.',
        },
        {
          title: 'Run Playwright tests',
          body: 'npx playwright test executes the full test suite. If any test fails, the step exits with a non-zero code and GitHub marks the job as failed.',
        },
        {
          title: 'Upload test report',
          body: 'The if: always() condition means this step runs whether the tests passed or failed. It uploads the playwright-report/ folder as a downloadable artifact, available for 30 days. This allows you to download and open the HTML report to investigate failures without needing to reproduce them locally.',
        },
      ]} />

      <KBH2 id="dependency-caching">Dependency caching</KBH2>

      <KBP>
        Without caching, every workflow run downloads and installs all your project's
        dependencies from scratch. For a Playwright project this includes dozens of packages
        and can take a minute or more before any test code runs.
      </KBP>

      <KBP>
        Adding <code>cache: 'npm'</code> to the <code>actions/setup-node</code> step
        instructs GitHub to save a copy of your <code>node_modules</code> after the first
        run. On subsequent runs, GitHub restores the saved copy instead of downloading
        everything again, making <code>npm ci</code> near-instant.
      </KBP>

      <KBP>
        GitHub derives the cache key from the contents of your <code>package-lock.json</code>
        file. If the lock file has not changed since the last run, the cache is used. If you
        have added, removed or updated any packages, the lock file changes and GitHub runs
        a fresh install, then saves a new cache for future runs.
      </KBP>

      <KBNote variant="green">
        Caching is particularly valuable for Playwright projects because the browser binary
        downloads alone can take 30 to 60 seconds. The combination of caching
        <code>node_modules</code> and the browser binaries (via the
        <code>PLAYWRIGHT_BROWSERS_PATH</code> environment variable if you choose to go
        further) can reduce setup time significantly on projects with large suites.
      </KBNote>

      <KBH2 id="pushing-the-workflow">Pushing the workflow and watching it run</KBH2>

      <KBP>
        Commit the workflow file and push it:
      </KBP>

      <KBCode language="bash">{`git add .github/workflows/playwright.yml
git commit -m "Add Playwright CI workflow"
git push`}</KBCode>

      <KBP>
        Navigate to your repository on GitHub and click the <strong>Actions</strong> tab.
        You should see a workflow run in progress. Click into it to follow the live output
        of each step. Each step's logs expand to show exactly what was printed to the
        terminal.
      </KBP>

      <KBP>
        Once complete, if any tests failed you will see a red cross next to the run. Click
        <strong>playwright-report</strong> under Artifacts to download the full HTML report.
        Unzip it and open <code>index.html</code> in your browser to see the complete
        results, including screenshots and traces for any failures.
      </KBP>

      <KBH2 id="branch-protection-rules">Requiring tests to pass before merging</KBH2>

      <KBP>
        Uploading a report is useful, but tests only become a genuine gate on quality if
        failing tests prevent code from being merged. GitHub's branch protection rules
        enforce this.
      </KBP>

      <KBSteps variant="green" steps={[
        {
          title: 'Open repository settings',
          body: 'Go to your repository on GitHub and click Settings in the top navigation.',
        },
        {
          title: 'Open branch rules',
          body: 'In the left sidebar, click Branches under the Code and automation section.',
        },
        {
          title: 'Add a rule for main',
          body: 'Click Add branch protection rule. In the Branch name pattern field, enter main.',
        },
        {
          title: 'Require status checks',
          body: 'Enable Require status checks to pass before merging. Search for and select the test job from your Playwright workflow.',
        },
        {
          title: 'Save the rule',
          body: 'Click Create or Save changes. From now on, GitHub will block any pull request where the Playwright job has not passed.',
        },
      ]} />

      <KBH2 id="running-on-pull-requests">Running tests on pull requests</KBH2>

      <KBP>
        The workflow as written already runs on pull requests targeting <code>main</code>.
        When a developer opens a pull request, GitHub runs the workflow automatically and
        shows the result in the pull request's Checks section. A green tick means all tests
        passed. A red cross provides a link directly to the failing workflow run.
      </KBP>

      <KBH2 id="filtering-by-path">Skipping CI for irrelevant changes</KBH2>

      <KBP>
        If your repository contains documentation, configuration files or other content that
        cannot affect your application's behaviour, you can skip the CI run when only those
        files change. Add a <code>paths</code> filter to the trigger:
      </KBP>

      <KBCode language="yaml">{`on:
  push:
    branches: [main]
    paths:
      - 'src/**'
      - 'tests/**'
      - 'playwright.config.ts'
      - 'package*.json'
  pull_request:
    branches: [main]
    paths:
      - 'src/**'
      - 'tests/**'
      - 'playwright.config.ts'
      - 'package*.json'`}</KBCode>

      <KBH2 id="sharding">Sharding for large test suites</KBH2>

      <KBP>
        As your suite grows, total run time in CI grows with it. Sharding splits your tests
        across multiple parallel runners. Each runner handles a fraction of the suite and
        they all run simultaneously, reducing the wall-clock time proportionally.
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
          name: playwright-report-\${{ matrix.shard }}
          path: playwright-report/
          retention-days: 30`}</KBCode>

      <KBP>
        This example splits the suite into four shards. With four runners each handling
        25% of the tests, a suite that takes 20 minutes to run sequentially finishes in
        approximately 5 minutes.
      </KBP>

      <KBP>
        To merge the reports from all shards into a single HTML report, add a merge step
        after all shards complete:
      </KBP>

      <KBCode language="yaml">{`  merge-reports:
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
          pattern: playwright-report-*
          merge-multiple: true
      - run: npx playwright merge-reports --reporter html ./all-blob-reports
      - uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30`}</KBCode>

      <KBNote variant="warning">
        Sharding is worth introducing only when your suite takes long enough to justify the
        additional workflow complexity. For most projects, sharding becomes relevant when
        the suite takes more than five to ten minutes on a single runner.
      </KBNote>

      <KBH2 id="secrets-and-environment-variables">Secrets and environment variables</KBH2>

      <KBP>
        If your tests require credentials such as an API key, a test user password or a
        staging environment URL, do not put them in your workflow file. Store them as GitHub
        repository secrets and reference them in the workflow:
      </KBP>

      <KBCode language="yaml">{`- name: Run Playwright tests
  run: npx playwright test
  env:
    BASE_URL: \${{ secrets.STAGING_URL }}
    TEST_PASSWORD: \${{ secrets.TEST_USER_PASSWORD }}`}</KBCode>

      <KBP>
        Secrets are stored encrypted by GitHub and are not visible in workflow logs. Add
        them by going to your repository <strong>Settings</strong>, then
        <strong>Secrets and variables</strong>, then <strong>Actions</strong>.
      </KBP>

      <KBNote variant="blue">
        The official Playwright CI documentation covers additional CI providers including
        Azure Pipelines, CircleCI and Jenkins at{' '}
        <a
          href="https://playwright.dev/docs/ci"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link/80 transition-colors duration-150"
        >
          playwright.dev/docs/ci
        </a>.
      </KBNote>

      <KBH2 id="next-steps">Next steps</KBH2>

      <KBP>
        Your tests now run automatically on every push and pull request. The final article
        in this guide covers advanced patterns: API mocking, authentication state, fixtures,
        parallel execution strategies and accessibility testing.
      </KBP>
    </>
  )
}

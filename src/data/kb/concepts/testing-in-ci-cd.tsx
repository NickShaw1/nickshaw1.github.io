import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import KBSteps from '../../../components/kb/KBSteps'
import KBBanner from '../../../components/kb/KBBanner'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function TestingInCiCd() {
  return (
    <>
      <KBP>
        Continuous integration and continuous delivery pipelines are where a test suite earns
        its value. Tests that only run locally, or only run before a release, provide far weaker
        protection than tests that run automatically on every change. A well-configured CI/CD
        pipeline catches regressions before they reach the main branch, gives developers fast
        feedback on the impact of their changes and builds the confidence needed to deploy
        frequently without manual verification gates.
      </KBP>

      <KBP>
        Setting up testing in a pipeline for the first time involves more than adding a test
        command to a YAML file. Decisions about pipeline structure, environment management,
        parallelisation, failure policy and reporting all have a significant effect on how
        useful the resulting system is in practice.
      </KBP>

      <KBH2 id="what-ci-cd-means-for-testing">What CI/CD means for testing</KBH2>

      <KBP>
        Continuous integration is the practice of merging code changes into a shared branch
        frequently — typically several times a day — and running an automated build and test
        suite on each merge. The purpose is to surface integration failures quickly, while the
        change that caused them is still fresh in the developer's memory. CI does not guarantee
        quality, but it makes quality problems visible earlier in the process, where they are
        cheaper to fix.
      </KBP>

      <KBP>
        Continuous delivery extends this: every change that passes the CI pipeline is in a
        deployable state. Continuous deployment goes a step further, automatically deploying
        every green build to production. The distinction matters for testing because it changes
        the consequences of a test failure. In a continuous deployment environment, a passing
        test suite is the only gate between a code change and production, which raises the stakes
        for both test coverage and test reliability.
      </KBP>

      <KBH2 id="structuring-your-pipeline">Structuring your pipeline</KBH2>

      <KBP>
        A well-structured pipeline is layered: fast, cheap tests run first and slower, more
        expensive tests run later. A developer should not have to wait fifteen minutes to find
        out their change broke a unit test. The typical structure is three stages running in
        sequence, with each stage only running if the previous one passed.
      </KBP>

      <KBSteps variant="blue" steps={[
        {
          title: 'Fast feedback stage',
          body: 'Run linting, type checks and unit tests. This stage should complete in under two minutes. If it fails, the pipeline stops immediately and the developer receives feedback before the slower stages have consumed any resources.',
        },
        {
          title: 'Integration stage',
          body: 'Run integration tests that require a running application, database or external service dependencies. Use service containers or Docker Compose within the CI environment to provide these dependencies. This stage typically takes two to ten minutes depending on the number of tests and the startup time of the services involved.',
        },
        {
          title: 'End-to-end stage',
          body: 'Run end-to-end or browser tests against a deployed environment. These are the slowest and most expensive tests to run, so they should be reserved for the critical user journeys that justify the cost. On pull request pipelines, consider running a subset; run the full suite on merges to the main branch.',
        },
      ]} />

      <KBP>
        Not every pipeline needs all three stages from the start. A new project with only unit
        tests has a single-stage pipeline. Add stages as the test suite grows and as the costs
        and risks justify it. The goal is the right structure for the current state of the
        project, not a complete pipeline built speculatively.
      </KBP>

      <KBH2 id="test-environment-management">Test environment management</KBH2>

      <KBP>
        One of the most common sources of CI failures is environment inconsistency: tests pass
        locally but fail in CI because the environment is different in some way. Managing this
        requires making the test environment explicit and reproducible.
      </KBP>

      <KBH3>Use containers for dependencies</KBH3>

      <KBP>
        Database, cache and messaging service dependencies should be provisioned by the CI
        environment itself, not shared between pipelines or pointed at persistent external
        instances. Most CI platforms support service containers — lightweight Docker containers
        that start alongside the build and are torn down when it finishes. A PostgreSQL service
        container gives each pipeline run a fresh, isolated database with no state carried over
        from previous runs.
      </KBP>

      <KBH3>Pin dependency versions</KBH3>

      <KBP>
        Lock files (<code>package-lock.json</code>, <code>poetry.lock</code>,
        <code>Gemfile.lock</code> and their equivalents) should be committed and used by CI without modification.
        Install dependencies with the equivalent of <code>npm ci</code> rather than
        <code>npm install</code> to ensure the exact versions in the lock file are used.
        Unpinned dependencies are a frequent cause of mysterious CI failures after a transitive
        dependency updates.
      </KBP>

      <KBH3>Separate test data from environment configuration</KBH3>

      <KBP>
        Test data should be created and torn down within the test itself, not seeded into a
        shared environment before the pipeline runs. A test that assumes a specific user record
        exists in the database will fail intermittently whenever the seed data is out of sync,
        which is a form of environmental flakiness that is difficult to diagnose.
      </KBP>

      <KBH2 id="parallelisation-and-speed">Parallelisation and speed</KBH2>

      <KBP>
        Pipeline speed is a quality-of-life issue that directly affects how often developers
        run tests and how quickly they respond to failures. A pipeline that takes forty minutes
        encourages developers to batch changes, which increases the blast radius of each failure.
        A pipeline that takes five minutes encourages frequent, small commits with fast feedback.
      </KBP>

      <KBP>
        The two main levers for improving pipeline speed are parallelisation and test selection.
        Parallelisation splits the test suite across multiple machines or workers, running
        different test files simultaneously. Most CI platforms support this natively: you define
        a matrix of workers and assign test files or test groups to each. The overall pipeline
        time drops to approximately the time of the slowest worker rather than the sum of all
        workers.
      </KBP>

      <KBP>
        Test selection runs only the tests relevant to the files changed in a given pull request.
        This requires tooling that can map test files to the source files they cover, which adds
        some setup complexity. For large suites where full runs take tens of minutes, the
        investment pays off quickly. For smaller suites, parallelisation alone is usually
        sufficient.
      </KBP>

      <KBAside label="Caching dependencies" variant="blue">
        Dependency installation is often the slowest part of a short pipeline. Most CI platforms
        provide a cache mechanism that stores the <code>node_modules</code> or equivalent
        directory between runs and restores it when the lock file has not changed. A cache hit
        can reduce dependency installation from two minutes to a few seconds. Configure caching
        on the lock file as the cache key so the cache is invalidated whenever dependencies change
        but reused for all runs with the same dependency set.
      </KBAside>

      <KBH2 id="handling-flaky-tests">Handling flaky tests</KBH2>

      <KBP>
        Flaky tests, which pass and fail non-deterministically without any code change,
        are one of the most damaging problems a CI pipeline can have. Each false failure trains
        developers to distrust the pipeline and re-run jobs rather than investigate failures.
        Once re-running becomes routine, genuine failures get re-run too, and the pipeline loses
        its authority as a signal of code quality.
      </KBP>

      <KBP>
        The correct response to a flaky test is to fix it, not to tolerate it. Common causes
        include shared mutable state between tests, timing dependencies in asynchronous code,
        network calls to external services and tests that rely on the current time or date.
        Each of these has a deterministic fix: isolate state, use explicit waits rather than
        sleep calls, mock external services and inject a fixed time reference.
      </KBP>

      <KBNote variant="warning">
        Automatic retry logic is a short-term sticking plaster, not a solution. Configuring a
        CI platform to retry failed tests up to three times masks the underlying flakiness and
        makes it harder to measure the true failure rate. If a test suite requires retries to
        pass reliably, it has a flakiness problem that retries are hiding. Track the retry rate
        as a metric and treat a rising retry rate as a signal that flakiness is increasing.
      </KBNote>

      <KBH2 id="gates-and-failure-policies">Gates and failure policies</KBH2>

      <KBP>
        A gate is a pipeline rule that prevents a code change from proceeding if a condition
        is not met. The most basic gate is a required status check on a pull request: the PR
        cannot be merged unless the pipeline passes. This is the minimum viable quality gate
        and should be in place from the start.
      </KBP>

      <KBP>
        More sophisticated gates include coverage thresholds, performance budgets and static
        analysis checks. A coverage threshold fails the build if coverage drops below a defined
        percentage; a performance budget fails the build if a key metric exceeds a defined limit.
        These gates are useful when they are calibrated to meaningful thresholds, but they
        require maintenance as the codebase evolves. A coverage threshold set too low provides
        false reassurance; one set too high generates friction without proportional quality benefit.
      </KBP>

      <KBP>
        Decide in advance how the team will respond to a failing pipeline on the main branch.
        The standard response should be to stop merging further changes until the failure is
        resolved, not to investigate while continuing to merge. A broken main branch accumulates
        changes that cannot be safely deployed, which undermines the purpose of continuous
        integration entirely.
      </KBP>

      <KBH2 id="reporting-and-visibility">Reporting and visibility</KBH2>

      <KBP>
        A passing or failing pipeline status is necessary but not sufficient. The most useful
        CI setups surface detailed test results, trend data and coverage information in a form
        that is easy to act on.
      </KBP>

      <KBSteps variant="green" steps={[
        {
          title: 'Publish test results',
          body: 'Configure your test runner to output results in JUnit XML format, which most CI platforms can parse to display a structured breakdown of passed, failed and skipped tests by name. This makes it possible to identify failing tests at a glance without reading raw logs.',
        },
        {
          title: 'Publish coverage reports',
          body: 'Tools such as Istanbul (JavaScript), Coverage.py (Python) and JaCoCo (Java) produce HTML coverage reports that can be published as pipeline artefacts. Some teams also post coverage summaries as pull request comments, making coverage changes visible in the code review process.',
        },
        {
          title: 'Track trends over time',
          body: 'Single-run metrics are less useful than trends. A test suite with 60% coverage that is growing is in better shape than one with 80% coverage that is declining. Platforms such as Codecov and SonarCloud aggregate coverage and quality data across runs and provide trend views that reveal whether quality is improving or deteriorating.',
        },
        {
          title: 'Alert on regressions',
          body: 'Configure notifications for pipeline failures on the main branch through the communication channel the team already uses: Slack, Teams or email. The failure should be visible immediately to the people who can act on it, not buried in a CI dashboard that nobody checks proactively.',
        },
      ]} />

      <KBBanner variant="info">
        The goal of a CI/CD testing setup is not the pipeline itself but the feedback loop it
        creates. A pipeline that gives developers accurate, fast, actionable information about
        the impact of their changes makes the team more effective. One that is slow, unreliable
        or produces noisy output gradually gets ignored. Invest in the experience of the pipeline
        as actively as you invest in the tests it runs.
      </KBBanner>
    </>
  )
}

import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function UnitAndIntegrationTools() {
  return (
    <>
      <KBP>
        Unit and integration testing frameworks form the foundation of an automated test
        suite. They execute fast, isolated tests that verify the behaviour of individual
        functions, classes or modules, and broader integration tests that verify how those
        modules interact without the overhead of a browser or network stack. The choice of
        framework is largely determined by the project's primary language: each ecosystem
        has clear defaults, and switching between them for the sake of consistency is rarely
        worth the disruption.
      </KBP>

      <KBH2 id="jest">Jest</KBH2>

      <KBP>
        <a href="https://jestjs.io" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">Jest</a> was
        created by Facebook and is now the default test runner for the majority of JavaScript
        and TypeScript projects. It ships with a test runner, assertion library, mocking system
        and code coverage tool in a single package, requiring no additional configuration to
        get started in a standard Node.js or React project. Popular toolchains such as Create
        React App and Next.js include Jest by default.
      </KBP>

      <KBP>
        Jest uses jsdom to simulate a browser environment in Node.js, allowing DOM manipulation
        and event handling to be tested without launching a real browser. Its mocking system
        is comprehensive: <code>jest.fn()</code> creates mock functions, <code>jest.mock()</code>
        replaces modules at the module system level and <code>jest.spyOn()</code> wraps
        existing functions to observe calls and return values. Snapshot testing captures a serialised representation of a
        component or value and fails the test if that representation changes unexpectedly.
      </KBP>

      <KBP>
        Jest's main limitation in modern projects is its handling of ES modules. Its
        CommonJS-first architecture requires transpilation configuration for projects that
        use native ESM, which adds build complexity. For projects using Vite or other
        ESM-native toolchains, Vitest is often a more natural fit.
      </KBP>

      <KBH2 id="vitest">Vitest</KBH2>

      <KBP>
        <a href="https://vitest.dev" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">Vitest</a> is
        a test framework built on Vite, designed to share the same configuration, module
        resolution and transformation pipeline as the application it tests. Because it reuses
        the Vite dev server, startup time is significantly faster than Jest in Vite-based
        projects, and tests run with native ESM support without additional transpilation.
        Its API is intentionally compatible with Jest, meaning most Jest test files can be
        run under Vitest with minimal or no changes.
      </KBP>

      <KBP>
        Vitest includes a watch mode that re-runs only the tests affected by a file change,
        a built-in UI for browsing results and an in-source testing feature that allows test
        cases to be written directly alongside the code they test. For teams already using
        Vite, the elimination of a separate build configuration for tests is a practical
        advantage that compounds over time as the project grows.
      </KBP>

      <KBH2 id="pytest">Pytest</KBH2>

      <KBP>
        <a href="https://docs.pytest.org" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">Pytest</a> is
        the dominant testing framework in the Python ecosystem. It discovers tests by
        convention: any function prefixed with <code>test_</code> in any file matching
        <code>test_*.py</code> is treated as a test case, with no class inheritance or
        method decoration required. Assertions use plain Python comparison operators, and
        pytest produces detailed failure output showing the exact values that did not match.
      </KBP>

      <KBP>
        Pytest's fixture system is its most powerful feature. Fixtures are functions that
        provide test dependencies, such as database connections, temporary files or
        pre-configured objects, and are injected into test functions by parameter name.
        Fixtures can depend on other fixtures, be scoped to a single test or an entire
        session and be shared across test modules. The <code>@pytest.mark.parametrize</code>
        decorator runs the same test function against multiple input sets without
        duplication. The plugin ecosystem is extensive: pytest-cov adds coverage, pytest-mock
        wraps unittest.mock, and pytest-asyncio handles async test functions.
      </KBP>

      <KBH2 id="junit">JUnit</KBH2>

      <KBP>
        <a href="https://junit.org/junit5" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">JUnit</a> is
        the foundational testing framework for the Java ecosystem and one of the most widely
        used testing frameworks in any language. JUnit 5, known as Jupiter, is the current
        version and a significant departure from JUnit 4. It introduces a modular architecture,
        an extension model that replaces the older Rules API and a richer set of built-in
        annotations for test lifecycle management.
      </KBP>

      <KBP>
        Test methods are annotated with <code>@Test</code>, and lifecycle methods use
        <code>@BeforeEach</code>, <code>@AfterEach</code>, <code>@BeforeAll</code> and
        <code>@AfterAll</code>. Parameterised tests are supported natively via
        <code>@ParameterizedTest</code> with a range of argument sources including CSV,
        method references and value arrays. JUnit 5 integrates with Maven and Gradle out
        of the box and is supported by all major Java IDEs. It serves as the test runner
        for most Java-based Selenium, REST Assured and Spring Boot integration test suites.
      </KBP>

      <KBH2 id="testng">TestNG</KBH2>

      <KBP>
        <a href="https://testng.org" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">TestNG</a> was
        created by Cédric Beust as an alternative to JUnit with a greater emphasis on
        configuration flexibility and test organisation. Its key differentiators are group-based
        test selection, explicit dependency declarations between test methods and a rich
        XML-based configuration file that controls which tests run, in what order and with
        what parallelism settings.
      </KBP>

      <KBP>
        TestNG's <code>@DataProvider</code> annotation supplies multiple sets of input data
        to a test method, and its parallel execution configuration allows tests to run
        concurrently at the method, class or suite level without additional tooling. It is
        particularly common in enterprise Java environments and in Selenium-based suites,
        where its group and dependency features provide fine-grained control over large
        test suites that JUnit 5's model does not match as naturally.
      </KBP>

      <KBAside label="JUnit or TestNG?" variant="blue">
        For most new Java projects, JUnit 5 is the default. Its extension model is flexible,
        its integration with build tools and IDEs is excellent and the community around it
        is larger. TestNG is worth choosing when the test suite requires explicit method-level
        dependencies, group-based execution strategies or the specific parallelism
        configuration that its XML suite files provide. Teams with an existing TestNG suite
        have little reason to migrate unless they have specific unmet needs.
      </KBAside>

      <KBNote variant="green">
        Regardless of framework, test isolation is the most important design principle for
        unit and integration tests. A test that depends on the order of execution, shares
        mutable state with other tests or relies on external services is not a unit test.
        It is a liability: it produces false failures when run in parallel, obscures real
        failures through state contamination and slows the test suite by introducing
        unpredictable waits. Framework choice cannot compensate for poor isolation.
      </KBNote>
    </>
  )
}

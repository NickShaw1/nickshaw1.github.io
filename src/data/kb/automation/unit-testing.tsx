import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function UnitTesting() {
  return (
    <>
      <KBP>
        Unit testing is the practice of verifying individual units of code in isolation. A unit
        is typically the smallest testable piece of logic: a function, a method or a class.
        Unit tests sit at the base of the testing pyramid, and for good reason. They run in
        milliseconds, require no external infrastructure and provide precise, immediately
        actionable feedback when they fail. A well-maintained unit test suite is one of the
        most cost-effective quality investments a development team can make.
      </KBP>

      <KBH2 id="what-a-unit-test-covers">What a unit test covers</KBH2>

      <KBP>
        A unit test verifies that a specific piece of logic produces the expected output for a
        given input, under conditions that are entirely controlled by the test. It tests the
        behaviour of the unit in isolation from its dependencies, which means those dependencies
        are either absent or replaced with controlled substitutes. The test does not interact
        with databases, network services, the file system or any other external system.
      </KBP>

      <KBP>
        This isolation is what makes unit tests fast and reliable. A test that talks to a
        database is not a unit test; it is an integration test. The distinction matters because
        the two types of test serve different purposes and have different cost profiles. Unit
        tests answer the question of whether a piece of logic is correct in principle. Integration
        tests answer the question of whether components work correctly together in practice.
      </KBP>

      <KBH2 id="good-unit-test-qualities">Qualities of good unit tests</KBH2>

      <KBH3>Fast</KBH3>

      <KBP>
        A unit test suite should run in seconds. If running the suite takes more than a minute,
        it will not be run as part of every commit cycle, and the feedback loop that makes unit
        tests valuable starts to erode. Speed comes naturally from genuine isolation. A slow unit
        test suite is often a sign that tests are not as isolated as they appear.
      </KBP>

      <KBH3>Deterministic</KBH3>

      <KBP>
        A unit test should produce the same result every time it runs against the same code.
        Tests that depend on the system clock, random number generators or global shared state
        can fail intermittently, which makes them difficult to trust and costly to investigate.
        Dependencies that introduce non-determinism should be controlled through test doubles
        or injected as parameters.
      </KBP>

      <KBH3>Focused</KBH3>

      <KBP>
        Each unit test should verify one behaviour. When a test fails, the test name and the
        assertion message should make it immediately clear what was expected and what was
        received. A test that verifies three or four things at once tends to fail for ambiguous
        reasons and takes longer to diagnose. The discipline of one assertion per test (or one
        logical group of assertions) pays dividends at failure investigation time.
      </KBP>

      <KBH2 id="test-doubles">Test doubles</KBH2>

      <KBP>
        A test double is any object that stands in for a real dependency during a test. The
        term covers several distinct types that are often conflated. The three most commonly
        encountered are stubs, mocks and fakes; spies and dummies appear in some frameworks
        and taxonomies as well.
      </KBP>

      <KBP>
        A <strong>stub</strong> replaces a dependency with a simplified version that returns
        predefined values. If a function under test calls a service that retrieves a user from a
        database, a stub replaces that service and returns a hardcoded user object. The stub
        does not verify whether it was called; it simply provides a controlled return value.
      </KBP>

      <KBP>
        A <strong>mock</strong> is a stub with expectations. As well as returning a value, a
        mock verifies that it was called in the expected way. If the test expects the service
        to be called exactly once with a specific argument, the mock enforces that expectation
        and fails the test if it is not met. Mocks are useful for verifying interactions, but
        overuse leads to tests that are tightly coupled to implementation details rather than
        observable behaviour.
      </KBP>

      <KBP>
        A <strong>fake</strong> is a working but simplified implementation of a dependency.
        An in-memory database that implements the same interface as a real database is a fake.
        Fakes are more complex to build but more robust than mocks because they behave like the
        real thing rather than prescribing how the real thing will be called.
      </KBP>

      <KBAside label="Prefer testing behaviour over implementation" variant="gold">
        Tests that assert on how a function interacts with its dependencies tend to break when
        the implementation changes even if the observable behaviour is unchanged. Tests that
        assert on the output or side effect of the function are more durable. Where possible,
        test what a function does rather than how it does it.
      </KBAside>

      <KBH2 id="coverage-and-its-limits">Coverage and its limits</KBH2>

      <KBP>
        Code coverage measures what percentage of the production code is executed by the test
        suite. It is a useful signal: very low coverage is a clear indicator of under-tested
        code, and coverage tools can identify specific paths that no test exercises. It is also
        a measure that is easily gamed and dangerously easy to misinterpret as a measure of
        quality.
      </KBP>

      <KBP>
        A test that exercises a line of code but makes no assertions about its outcome
        contributes to coverage without verifying anything. A function with 100% line coverage
        can still have defects in branches not reached by the existing inputs. And coverage
        says nothing at all about whether the right things are being tested, whether the tests
        are testing the right behaviours or whether the assertions are correct.
      </KBP>

      <KBNote variant="blue">
        Coverage targets are useful as a minimum quality gate but not as a goal in themselves.
        A team chasing a specific coverage percentage tends to write tests designed to hit lines
        rather than tests designed to catch regressions. The goal is a test suite that would
        catch a real defect, not a coverage report that reads well.
      </KBNote>
    </>
  )
}

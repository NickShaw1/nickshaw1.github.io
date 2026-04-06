import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function IntegrationTesting() {
  return (
    <>
      <KBP>
        Integration testing verifies that separate components or systems work correctly together.
        Where unit tests confirm that individual pieces of logic are correct in isolation,
        integration tests confirm that those pieces behave correctly when connected to their real
        dependencies. The distinction matters because many defects only surface at the boundary
        between components, not within any single component in isolation.
      </KBP>

      <KBH2 id="what-integration-testing-covers">What integration testing covers</KBH2>

      <KBP>
        An integration test exercises at least two real components interacting with each other.
        Common examples include a service calling a real database, an API handler processing a
        real HTTP request, or a module consuming a real message queue. The test verifies that
        the interaction produces the expected outcome: that data is stored correctly, that the
        response is structured as expected, that a message triggers the right downstream action.
      </KBP>

      <KBP>
        Integration tests tolerate more complexity and slower execution than unit tests because
        they are testing things that unit tests cannot: the correctness of database queries, the
        handling of serialisation and deserialisation, the behaviour of authentication middleware
        and the accuracy of third-party API integrations. These concerns are invisible to unit
        tests that replace dependencies with stubs.
      </KBP>

      <KBH2 id="types-of-integration-test">Types of integration test</KBH2>

      <KBH3>Component integration tests</KBH3>

      <KBP>
        These tests verify that a specific component integrates correctly with one or more of its
        immediate dependencies. A typical example is testing that a data access layer correctly
        reads and writes to a database. The test uses a real database connection, executes the
        code under test and verifies that the state of the database matches expectations after
        the operation completes. Other external dependencies may still be stubbed.
      </KBP>

      <KBH3>API integration tests</KBH3>

      <KBP>
        These tests drive the application through its external API, verifying that the entire
        request-handling stack works correctly end to end within the service. They exercise
        routing, request parsing, business logic, database interaction and response formatting as
        an integrated whole. They provide broader coverage than component tests but run more
        slowly and are harder to isolate when they fail.
      </KBP>

      <KBH3>Contract tests</KBH3>

      <KBP>
        Contract tests are a distinct category that verifies the interface between a service and
        its consumers. Rather than testing the full behaviour of an integration, they verify that
        a provider service continues to fulfil the expectations documented by each consumer. They
        are covered in more detail in the contract testing article.
      </KBP>

      <KBH2 id="scope-decisions">Scope and boundary decisions</KBH2>

      <KBP>
        A key decision in integration testing is how much of the system to include in each test.
        Broader scope means more realistic coverage but slower, harder-to-diagnose tests. Narrower
        scope means faster, more focused tests but more reliance on stubs that may not accurately
        represent the real dependency.
      </KBP>

      <KBP>
        A common approach is to draw the boundary at the service level for most integration tests,
        using a real database and real internal components but stubbing external services, queues
        and third-party APIs. This provides meaningful integration coverage for the areas the
        team controls while keeping the tests fast enough to run in a CI pipeline.
      </KBP>

      <KBAside label="Test containers" variant="blue">
        Tools such as Testcontainers allow integration tests to spin up real database or
        message broker instances in Docker containers as part of the test run. This gives each
        test run a clean, isolated environment without requiring a shared test database. The
        containers start before the tests and are discarded afterwards, making the tests
        self-contained and avoiding state leakage between runs.
      </KBAside>

      <KBH2 id="integration-vs-unit">Integration tests vs unit tests</KBH2>

      <KBP>
        Integration tests and unit tests are not alternatives; they test different things and
        both are necessary in a mature test suite. Unit tests verify logic; integration tests
        verify connectivity. A unit test can confirm that a function correctly builds a database
        query string. Only an integration test can confirm that the query actually works against
        the database and returns the expected results.
      </KBP>

      <KBP>
        The relative proportion of each depends on the nature of the application. Systems with
        complex business logic benefit more from extensive unit test coverage. Systems that are
        primarily about data flow and external integrations benefit more from integration test
        coverage. Most real applications benefit from both, with the testing pyramid providing
        a reasonable default: more unit tests than integration tests because unit tests are
        faster and cheaper to maintain.
      </KBP>

      <KBNote variant="green">
        Integration tests that share state between runs are a common source of unreliable test
        results. If one test inserts a record into a database and a subsequent test expects an
        empty table, the order of execution determines whether the second test passes. Ensuring
        each test either cleans up after itself or runs against a fresh state is foundational to
        a reliable integration test suite.
      </KBNote>
    </>
  )
}

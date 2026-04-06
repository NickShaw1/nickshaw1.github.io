import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function ApiTesting() {
  return (
    <>
      <KBP>
        API testing verifies the interfaces that connect software components, services and systems.
        Where end-to-end tests exercise the full stack from the browser downward, API tests work
        directly at the HTTP or messaging layer, bypassing the user interface entirely. This gives
        them a significant advantage in speed, reliability and precision: a failure in an API test
        points immediately to the layer it is testing rather than requiring investigation through
        multiple application tiers. For most modern applications, a strong API test layer is one
        of the most efficient investments a team can make in coverage.
      </KBP>

      <KBH2 id="what-api-testing-covers">What API testing covers</KBH2>

      <KBP>
        API testing validates that an interface behaves correctly across its full range of inputs
        and conditions. This includes verifying that valid requests return the correct response
        codes, response bodies and headers; that invalid or malformed requests are rejected with
        appropriate error responses; that authentication and authorisation rules are enforced; and
        that the interface handles edge cases such as empty collections, maximum payload sizes and
        concurrent requests without unexpected behaviour.
      </KBP>

      <KBP>
        Beyond functional correctness, API tests can verify performance characteristics, checking
        that response times remain within acceptable bounds under normal and elevated load. They can
        also confirm that responses conform to a documented schema, catching structural changes
        that would break consumers even when the functional behaviour appears unchanged.
      </KBP>

      <KBH2 id="testing-strategies">Testing strategies</KBH2>

      <KBH3>Functional testing</KBH3>

      <KBP>
        Functional API tests verify that each endpoint does what it is documented to do. A test
        might create a resource, retrieve it, update it and delete it, asserting on the response
        at each stage. These tests form the core of an API test suite and cover the happy-path
        journeys that the API exists to support.
      </KBP>

      <KBH3>Negative testing</KBH3>

      <KBP>
        Negative tests verify how the API responds to invalid inputs. What happens when a required
        field is absent? What is returned when a resource identifier does not exist? Does the API
        return a 400 for a malformed request or does it silently ignore the invalid data and
        produce incorrect results? Negative testing is often under-invested in relative to its
        value. The most common real-world defects in APIs are not in the happy path but in the
        error handling.
      </KBP>

      <KBH3>Contract testing</KBH3>

      <KBP>
        Contract testing verifies that an API continues to honour the expectations of its
        consumers. This is distinct from functional testing: contract tests do not verify that
        the API is doing the right thing internally, only that its external interface has not
        changed in a way that would break a dependent service. Contract testing is particularly
        valuable in microservice architectures where many teams own separate services and deploy
        independently.
      </KBP>

      <KBH3>Security testing</KBH3>

      <KBP>
        API security testing checks that the interface does not expose data or functionality
        beyond what is intended. This includes testing that unauthenticated requests are rejected,
        that authorisation rules prevent users from accessing resources they do not own and that
        the API is not vulnerable to injection attacks through its inputs. Basic security checks
        can be included in an API test suite, though deeper security analysis typically requires
        dedicated tooling.
      </KBP>

      <KBAside label="Test the API, not the UI" variant="blue">
        Many teams write end-to-end tests through the browser because the UI is the most visible
        part of the system. For functionality that is primarily API-driven, testing at the API
        layer directly is faster, more reliable and more precise. A test that creates a record
        through a POST request and retrieves it through a GET is far more stable than the same
        journey driven through a web form.
      </KBAside>

      <KBH2 id="common-challenges">Common challenges</KBH2>

      <KBH3>Authentication</KBH3>

      <KBP>
        Most production APIs require authentication, and setting up valid tokens or session
        credentials in an automated test suite requires care. Tokens may expire during a long
        test run. Credentials hardcoded in tests create security risks. The cleanest approach
        is to treat authentication as a test fixture: obtain a token once at the start of a
        test run (or per test if necessary) through a dedicated mechanism rather than embedding
        credentials directly.
      </KBP>

      <KBH3>State and ordering</KBH3>

      <KBP>
        APIs that operate on resources introduce state. A test that deletes a resource must have
        created that resource first. A test that retrieves a resource must know its identifier.
        Managing this dependency is one of the trickier aspects of API test design. The cleanest
        approach is for each test to set up and clean up its own data, avoiding dependencies on
        shared resources that other tests may have modified or deleted.
      </KBP>

      <KBH3>Versioning</KBH3>

      <KBP>
        APIs that support multiple versions require test suites that account for which version
        is being tested and what differences in behaviour are expected between them. When a new
        version is introduced, existing tests for the previous version should continue to pass
        until that version is deprecated, giving consumers confidence that the older interface
        remains stable.
      </KBP>

      <KBH2 id="tooling-and-integration">Tooling and integration</KBH2>

      <KBP>
        A wide range of tools support API testing. Tools such as Postman and Insomnia support
        manual exploration and can also run automated collections. Libraries such as REST Assured
        (Java) and Supertest (JavaScript) integrate directly with test frameworks and are well-suited
        to writing maintainable automated API tests as code. For schema validation, OpenAPI
        (Swagger) specifications can be used to validate that responses conform to a documented
        contract automatically.
      </KBP>

      <KBP>
        API tests should run in CI on every pull request. They are fast enough to include in
        the early stages of a pipeline and precise enough to provide actionable feedback without
        requiring a full environment. Tests that require a running service can use a test
        instance, a sandbox environment or a locally started server depending on the architecture.
      </KBP>

      <KBNote variant="green">
        Document what each API test covers and why. API test suites can grow large quickly, and
        without clear naming and organisation it becomes difficult to know whether a gap in
        coverage is an oversight or a deliberate choice. A test named after the scenario it
        exercises (for example, returns 403 when authenticated user requests another user's
        resource) is far more informative than one named after the endpoint it calls.
      </KBNote>
    </>
  )
}

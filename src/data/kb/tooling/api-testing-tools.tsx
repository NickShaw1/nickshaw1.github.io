import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function ApiTestingTools() {
  return (
    <>
      <KBP>
        API testing tools verify HTTP services directly, without the overhead of a browser
        or user interface. They operate at the network layer, sending requests and asserting
        on responses: status codes, response bodies, headers, latency and error handling.
        Testing at this level is faster and more stable than end-to-end tests, and catches
        a broad class of integration and contract failures before they reach a full system
        test. The tools in this category serve different roles: Postman as a collaborative
        platform, REST Assured as a fluent Java library and Mock Service Worker as a
        network-level interceptor for frontend test isolation.
      </KBP>

      <KBH2 id="postman">Postman</KBH2>

      <KBP>
        <a href="https://www.postman.com" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">Postman</a> is
        the most widely used API testing platform, combining a request client, a test
        scripting environment, a mock server and API documentation tooling in a single
        application. Requests are organised into collections, which can represent an entire
        API surface or a specific test scenario. Test scripts are written in JavaScript within
        a sandboxed runtime and can assert on any aspect of the response, chain requests
        together and extract values for use in subsequent requests.
      </KBP>

      <KBP>
        Environments and variables allow the same collection to run against different targets,
        such as a local development server, a staging environment and production, without
        modifying the requests. Newman, Postman's command-line runner, executes collections
        in CI pipelines and outputs results in formats including JUnit XML, which integrates
        with most CI reporting tools.
      </KBP>

      <KBP>
        Postman is particularly useful for exploratory API testing and for teams that include
        non-developers in the testing process. Its visual interface makes it accessible without
        code, and the ability to share collections and environments across a team reduces the
        duplication of request setup. Its scripting model, however, is less structured than
        a code-first testing approach, and large collections can become difficult to maintain
        without consistent naming and folder organisation conventions.
      </KBP>

      <KBH2 id="rest-assured">REST Assured</KBH2>

      <KBP>
        <a href="https://rest-assured.io" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">REST Assured</a> is
        a Java library for testing REST APIs using a fluent, domain-specific language designed
        to read like a natural language specification. A typical test follows a
        given/when/then structure: the given block sets up request headers, authentication
        and body; the when block performs the HTTP request; the then block asserts on the
        response. This structure maps cleanly onto the standard Java testing frameworks,
        and REST Assured integrates directly with JUnit and TestNG.
      </KBP>

      <KBP>
        JSON and XML path expressions allow assertions to target specific fields in a
        response body without deserialising the entire payload into an object. Response
        specifications can be extracted and reused across tests, reducing duplication in
        suites that test multiple endpoints with similar response shapes. REST Assured
        supports OAuth 1 and 2, basic authentication and custom authentication schemes,
        and it handles multipart requests, file uploads and form data natively.
      </KBP>

      <KBP>
        REST Assured is the natural choice for Java teams building API test suites alongside
        Selenium or other Java-based automation. Its fluent API produces tests that are
        readable without requiring familiarity with the library itself, which makes them
        accessible during code review and useful as living documentation of expected
        API behaviour.
      </KBP>

      <KBH2 id="msw">Mock Service Worker</KBH2>

      <KBP>
        <a href="https://mswjs.io" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">Mock Service Worker</a> (MSW)
        takes a fundamentally different approach to API mocking. Rather than intercepting
        requests at the application level, it operates at the network level: in the browser,
        it uses a registered Service Worker to intercept outbound requests before they reach
        the network; in Node.js, it intercepts requests using a low-level request interception
        library. The application code under test makes real fetch or XHR calls and receives
        mocked responses without any modification to the application itself.
      </KBP>

      <KBP>
        Request handlers are defined once and shared between the browser and Node.js
        environments, meaning the same handlers used in integration tests under Jest or
        Vitest can also be used in browser-based development with Storybook or during
        local development. This eliminates the divergence between test mocks and
        development mocks that commonly leads to tests that pass but do not reflect
        real-world behaviour.
      </KBP>

      <KBAside label="MSW's key advantage" variant="purple">
        Most API mocking approaches patch the fetch or axios function inside the application.
        This means the mock is coupled to the HTTP library in use and the test fails
        if the application switches libraries. MSW operates below the application layer,
        intercepting at the network boundary regardless of which HTTP library makes the
        request. Tests written with MSW remain valid through refactors and library changes
        that do not alter the API contract.
      </KBAside>

      <KBNote variant="green">
        Postman and REST Assured are complementary rather than competing tools. Postman
        is well suited to exploratory work, early API validation and collaborative sharing
        of request collections. REST Assured is better suited to automated regression suites
        in Java projects, where its integration with JUnit or TestNG and its code-first
        approach make it easier to maintain at scale. Teams in mixed environments often
        use both.
      </KBNote>
    </>
  )
}

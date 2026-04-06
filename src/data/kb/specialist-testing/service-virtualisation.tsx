import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function ServiceVirtualisation() {
  return (
    <>
      <KBP>
        Service virtualisation simulates the behaviour of components or systems that a team
        either does not control or cannot easily use in testing: third-party APIs, downstream
        microservices, mainframe systems or payment gateways. Where simple mocking replaces
        a dependency with a hand-crafted substitute within a test, service virtualisation
        creates a persistent, configurable simulation that can be shared across tests, teams
        and environments. It is the approach of choice when a dependency is unavailable,
        unstable, expensive to use in testing or when the team needs to simulate specific
        scenarios (error conditions, latency, edge cases) that the real system cannot
        be made to produce on demand.
      </KBP>

      <KBH2 id="service-virtualisation-vs-mocking">Service virtualisation vs mocking</KBH2>

      <KBP>
        The distinction between service virtualisation and mocking is primarily one of scope
        and persistence. A mock exists within a single test or test file: it is set up in code,
        used in the test and torn down when the test ends. It is not visible outside the test
        process and cannot be shared. A virtual service runs as a separate process that listens
        on a network port and responds to requests according to configured rules. It can be
        used by automated tests, manual testers and a CI environment simultaneously.
      </KBP>

      <KBP>
        Mocking is the right choice for unit and integration tests within a single service,
        where the mock is simple, close to the code and maintained alongside it. Service
        virtualisation is the right choice when multiple teams or processes need to use the
        same simulation, when the simulation needs to be realistic enough to drive a full
        test environment or when the system under test expects to communicate over an actual
        network connection rather than a code-level interface.
      </KBP>

      <KBH2 id="when-to-use-service-virtualisation">When to use service virtualisation</KBH2>

      <KBH3>Unavailable dependencies</KBH3>

      <KBP>
        Development and testing may need to begin before all dependencies are available. A team
        building a service that integrates with a third-party payment provider or a partner
        organisation's API cannot wait for those dependencies to be ready before starting
        testing. A virtual service that simulates the expected behaviour of the dependency
        allows development and testing to proceed independently, with the integration to the
        real dependency validated later.
      </KBP>

      <KBH3>Unstable or constrained environments</KBH3>

      <KBP>
        Shared test environments that depend on real downstream services are subject to the
        availability and stability of those services. If a shared staging environment's payment
        gateway is down, every team that depends on it is blocked. A virtual service that
        simulates the gateway removes that dependency and allows testing to continue regardless
        of the real service's availability.
      </KBP>

      <KBH3>Controlled scenario testing</KBH3>

      <KBP>
        Some scenarios are difficult or impossible to trigger through the real system: payment
        declines, network timeouts, specific error codes, responses with malformed data or
        extreme latency. A virtual service can be configured to return any response for any
        request, making it straightforward to test error handling and edge cases that would
        require specific conditions in the real system.
      </KBP>

      <KBAside label="Record and replay reduces maintenance burden" variant="blue">
        Many service virtualisation tools support record-and-replay: the tool intercepts real
        calls to the actual service, records the requests and responses and then replays those
        responses when the same request is made in testing. This dramatically reduces the effort
        of creating a realistic simulation and keeps the virtual service aligned with the real
        service's actual behaviour, provided the recordings are refreshed when the real service
        changes.
      </KBAside>

      <KBH2 id="tools-and-approaches">Tools and approaches</KBH2>

      <KBP>
        WireMock is one of the most widely used service virtualisation tools for HTTP-based
        dependencies. It can be run as a standalone server or embedded in a test suite and
        supports flexible request matching and response configuration, including delays and
        fault simulation. Hoverfly is a similar tool with a focus on performance and a
        record-and-replay workflow. For teams using the Pact framework for consumer-driven
        contract testing, the Pact mock server provides service virtualisation as part of
        the contract workflow.
      </KBP>

      <KBP>
        Mountebank extends service virtualisation beyond HTTP to other protocols including
        TCP and SMTP, which is useful in environments where dependencies communicate over
        non-HTTP interfaces. Cloud platforms also offer their own simulation tools: LocalStack
        provides local simulations of AWS services, allowing code that depends on S3, SQS,
        Lambda and other AWS services to be tested without cloud access.
      </KBP>

      <KBH2 id="limitations-and-maintenance">Limitations and maintenance</KBH2>

      <KBP>
        Service virtualisation introduces a maintenance burden that mocks within tests do not.
        A virtual service must be updated when the real service's behaviour changes, or tests
        will pass against the virtual service and fail against the real one. If the virtual
        service is not kept in sync with the real service, it provides false confidence: a
        green test run that masks a real integration problem.
      </KBP>

      <KBNote variant="green">
        Validate virtual services against the real service periodically. Running the same test
        suite against both the virtual service and the real service in a controlled environment
        confirms that they produce the same results for the same inputs. Any divergence indicates
        that the virtual service has drifted from the real behaviour and needs updating before
        it can be trusted.
      </KBNote>
    </>
  )
}

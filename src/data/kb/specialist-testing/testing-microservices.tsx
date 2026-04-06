import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function TestingMicroservices() {
  return (
    <>
      <KBP>
        Microservice architectures decompose applications into small, independently deployable
        services that communicate over networks. Each service owns its own data, has its own
        deployment lifecycle and can be developed by a separate team. This architecture delivers
        real benefits in scalability, deployment flexibility and organisational autonomy, but it
        creates a testing challenge that is qualitatively different from testing a monolith.
        When a system is distributed across many services, verifying that it works correctly
        as a whole requires deliberate strategy: simply scaling up the same testing approach
        that works for a single application does not address the new class of problems that
        emerge at the boundaries between services.
      </KBP>

      <KBH2 id="the-microservices-testing-challenge">The microservices testing challenge</KBH2>

      <KBP>
        In a monolith, integration is immediate: a call from one module to another happens in
        process and any type error or interface mismatch is caught at compile time or at the
        point of integration within a single codebase. In a microservice architecture, integration
        failures only manifest when services are deployed and talking to each other over the
        network. A service that has never been deployed with its dependencies before may work
        correctly in isolation and fail completely when first integrated, for reasons that would
        have been obvious in a monolith.
      </KBP>

      <KBP>
        End-to-end tests in a shared environment can catch integration failures, but shared
        environments for microservice systems are expensive to maintain, slow to refresh after
        deployments and difficult to keep stable. A test that requires ten services to be running
        in known states is far more fragile than one that requires one. The cost of maintaining
        a shared environment grows with the number of services, and the feedback loop lengthens
        as deployments become more complex.
      </KBP>

      <KBH2 id="testing-each-service-in-isolation">Testing each service in isolation</KBH2>

      <KBP>
        Each service should be thoroughly tested in isolation before integration. Unit tests
        verify business logic within the service. Integration tests verify that the service
        interacts correctly with its own database and other infrastructure it owns directly.
        API or interface tests verify that the service's external interface (its API or message
        schema) behaves as documented.
      </KBP>

      <KBP>
        Testing a service in isolation requires that its external dependencies are replaced with
        controlled substitutes: stubs or mocks of other services it calls, or service virtualisation
        tools that simulate the behaviour of downstream dependencies. This allows thorough testing
        of the service's own logic without requiring the real dependencies to be available.
      </KBP>

      <KBH3>Consumer-driven contracts</KBH3>

      <KBP>
        Consumer-driven contract testing is the most effective technique for verifying integration
        in a microservice architecture without requiring all services to be deployed simultaneously.
        The consumer of a service defines its expectations (the contract) and the provider verifies
        that it meets those expectations in its own CI pipeline. This means integration failures
        are caught early, close to the change that caused them, rather than in a shared environment
        that may be difficult to reproduce or debug.
      </KBP>

      <KBAside label="Own your service's test environment" variant="blue">
        A service team should control everything needed to run their tests: their own test
        database, their own stubs for dependencies and their own CI pipeline. Depending on a
        shared test environment maintained by another team introduces a coupling that undermines
        the independence that microservices exist to provide. Teams that cannot run their full
        test suite without coordinating with another team have an ownership problem, not just
        a testing problem.
      </KBAside>

      <KBH2 id="integration-and-end-to-end-testing">Integration and end-to-end testing</KBH2>

      <KBP>
        Despite the limitations of shared environments, some degree of integration and end-to-end
        testing across services remains necessary. Contract tests verify interfaces but do not
        verify that the overall system does what users need it to do. A small number of
        end-to-end tests covering the most critical user journeys provide confidence that the
        deployed system works as a whole. These tests should be few, focused on genuinely
        critical paths and maintained with the same care as any other high-value test.
      </KBP>

      <KBP>
        The environment for integration tests should be as close to production as practical
        while being isolated enough to be stable and reproducible. Tools such as Docker Compose
        and Kubernetes allow multiple services to be run locally or in CI with controlled
        versions, avoiding the instability of a shared staging environment.
      </KBP>

      <KBH2 id="observability-and-production-testing">Observability and production testing</KBH2>

      <KBP>
        In a distributed system, observability is both a production operations concern and a
        testing one. Distributed tracing, which follows a request across service boundaries
        and records the time spent in each service, is essential for diagnosing failures that
        span multiple services. Without tracing, a slow or failed end-to-end test in an
        integrated environment may reveal only that something went wrong, not where.
      </KBP>

      <KBNote variant="green">
        Blue-green deployments and canary releases allow new versions of a service to be
        exposed to a fraction of production traffic while the old version continues to serve
        the majority. This is a form of production testing: real user behaviour on the new
        version reveals issues that no pre-production test environment will surface, with the
        risk limited by the size of the canary. Treating deployment strategy as part of the
        testing strategy is a mature position for microservice teams to take.
      </KBNote>
    </>
  )
}

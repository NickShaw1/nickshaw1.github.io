import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function ContractTesting() {
  return (
    <>
      <KBP>
        Contract testing verifies the interface between services by checking that a provider
        continues to fulfil the expectations of each of its consumers. It is particularly
        valuable in microservice architectures, where many independent services communicate over
        APIs and changes to one service can break another without any compile-time or static
        analysis warning. Contract testing catches these integration failures early, before
        services are deployed together, without requiring a full end-to-end environment.
      </KBP>

      <KBH2 id="the-integration-problem">The integration problem</KBH2>

      <KBP>
        In a system of independent services, each service is developed and deployed separately.
        A provider team may change an API response structure without realising that a consumer
        team depends on a field they are removing. The consumer team may build functionality
        against an API that behaves differently in production than it does in the stub they
        tested against locally. Both of these failures are only discovered when the services are
        run together, typically in an integrated test environment or in production.
      </KBP>

      <KBP>
        End-to-end tests in a shared environment can catch these failures, but they are
        expensive to maintain, slow to run and require all services to be deployed and stable
        simultaneously. They also tend to provide poor feedback when they fail: a failure in an
        end-to-end test that exercises ten services does not immediately indicate which service
        is the source of the problem.
      </KBP>

      <KBH2 id="what-a-contract-test-verifies">What a contract test verifies</KBH2>

      <KBP>
        A contract is a documented set of expectations that a consumer has of a provider: the
        shape of the request it will send and the shape of the response it expects to receive.
        A contract test has two sides. On the consumer side, the test records the interactions
        the consumer makes against a mock provider and the responses it expects. On the provider
        side, the test verifies that the real provider produces responses that satisfy those
        expectations.
      </KBP>

      <KBP>
        The key insight is that each side can run independently. The consumer tests do not
        require the real provider to be running. The provider tests do not require the real
        consumer to be deployed. Each team can run its side of the contract in CI independently,
        and failures in either direction surface quickly and precisely.
      </KBP>

      <KBH3>Provider states</KBH3>

      <KBP>
        Provider states allow contracts to specify the data conditions that must be set up
        on the provider side before a particular interaction is verified. If a consumer test
        expects to retrieve a specific user by ID, the contract can specify that the provider
        must have that user in its data store before the verification test runs. Provider state
        handlers in the provider's test setup create this data, ensuring the verification test
        runs against realistic conditions.
      </KBP>

      <KBH2 id="consumer-driven-contracts">Consumer-driven contracts</KBH2>

      <KBP>
        Consumer-driven contract testing is the most widely adopted approach, popularised by the
        Pact framework. In this model, the consumer defines the contract. The consumer team
        writes tests that describe what they need from the provider, and those expectations are
        published as a contract file. The provider team then runs verification tests against
        that published contract to confirm that their service satisfies it.
      </KBP>

      <KBP>
        This inversion of the traditional API ownership model is deliberate. Provider teams
        often define their API from the inside out, based on what is convenient to implement.
        Consumer-driven contracts force the conversation about what consumers actually need,
        which tends to produce interfaces that are more useful and to surface breaking changes
        before they are deployed.
      </KBP>

      <KBAside label="Pact Broker" variant="blue">
        Pact Broker is a service for storing and sharing contract files between consumer and
        provider teams. In a CI pipeline, the consumer publishes a new contract whenever tests
        run, and the provider retrieves the latest contracts from the broker during its own CI
        run. This creates an automated feedback loop: if a provider change would break a
        consumer, the provider's CI run fails before the change is deployed.
      </KBAside>

      <KBH2 id="where-contract-testing-fits">Where contract testing fits</KBH2>

      <KBP>
        Contract testing is not a replacement for integration testing or end-to-end testing.
        It verifies the interface between services, not the behaviour of either service in
        isolation. A contract test that confirms a provider returns the expected response shape
        does not verify that the data in that response is correct, that the provider handles
        edge cases properly or that the consumer uses the response appropriately.
      </KBP>

      <KBP>
        Contract testing is also most valuable in contexts where multiple teams own separate
        services and those services change independently. In a monolith or a small system where
        a single team owns all the components, the overhead of maintaining explicit contracts
        may not be justified. The value scales with the number of integration points and the
        independence of the teams involved.
      </KBP>

      <KBNote variant="green">
        A contract test failure means a provider change would break a consumer, not that the
        provider is broken. The distinction matters for how the failure is handled. The
        provider team should not simply update the contract to make it pass; they should
        communicate with the consumer team about whether the change is intentional and what
        the migration path is for consumers that depend on the previous behaviour.
      </KBNote>
    </>
  )
}

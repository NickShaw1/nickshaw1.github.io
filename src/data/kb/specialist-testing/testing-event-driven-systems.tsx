import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function TestingEventDrivenSystems() {
  return (
    <>
      <KBP>
        Event-driven architectures communicate through messages or events rather than direct
        synchronous calls. A service publishes an event when something significant happens; other
        services that care about that event consume it and react accordingly. This model decouples
        services from each other in time and space: the publisher does not know which services
        will consume its event, and consumers do not need to be available when the event is
        published. This loose coupling is one of the main benefits of event-driven design, but
        it also makes testing harder. The indirect, asynchronous nature of event communication
        does not fit naturally into the request-response patterns that most testing tools
        assume.
      </KBP>

      <KBH2 id="the-testing-challenges">The testing challenges</KBH2>

      <KBH3>Asynchrony</KBH3>

      <KBP>
        In a synchronous system, a test triggers an action and immediately asserts on the result.
        In an event-driven system, an action may trigger an event that is processed asynchronously,
        potentially after a variable delay. A test that asserts on the outcome of event processing
        must account for this delay: it cannot simply assert immediately after triggering the
        action but must wait until the processing has completed. Tests that use fixed waits
        are fragile; tests that poll for a condition to become true are more robust but require
        care in design to avoid tests that hang indefinitely.
      </KBP>

      <KBH3>Event ordering</KBH3>

      <KBP>
        Event-driven systems often make assumptions about the order in which events arrive.
        Messaging systems typically provide ordering guarantees within a partition or topic,
        but not necessarily across them. Testing should verify that the system handles events
        in the expected order and, where ordering cannot be guaranteed, that it handles
        out-of-order events correctly rather than entering an inconsistent state.
      </KBP>

      <KBH3>Idempotency</KBH3>

      <KBP>
        Messaging systems may deliver events more than once in the event of failures or retries.
        A well-designed event handler is idempotent: processing the same event twice produces
        the same outcome as processing it once. Testing idempotency requires deliberately
        delivering the same event multiple times and verifying that the resulting state is
        correct. Handlers that are not idempotent can produce duplicate records, incorrect
        aggregations or other data integrity problems in production.
      </KBP>

      <KBH2 id="testing-strategies">Testing strategies</KBH2>

      <KBP>
        The most effective approach to testing event-driven systems is to test the producer
        and consumer logic separately at the unit and integration level, and to test the
        message schema as a contract between the two.
      </KBP>

      <KBP>
        Producer tests verify that the correct events are published in response to actions,
        with the correct payload structure and the correct routing. Consumer tests verify that
        a service handles incoming events correctly, typically by providing the event payload
        directly to the consumer's handler function without involving the actual messaging
        infrastructure. This approach is fast and deterministic, but it requires that the
        event schema shared between producer and consumer is treated carefully.
      </KBP>

      <KBAside label="Treat event schemas as contracts" variant="blue">
        An event published by one service and consumed by another is an interface, with all
        the stability concerns that implies. Changes to an event schema that are not backwards
        compatible will break consumers. Tools such as JSON Schema, Avro and Protobuf provide
        schema definitions that can be validated on both sides. Consumer-driven contract testing
        techniques (as used for REST APIs) can also be applied to event schemas, with the
        consumer defining what fields it requires and the producer verifying that it publishes
        them.
      </KBAside>

      <KBH2 id="integration-testing-with-real-brokers">Integration testing with real brokers</KBH2>

      <KBP>
        At the integration level, tests that involve a real message broker (Kafka, RabbitMQ,
        SNS/SQS or similar) provide confidence that the system interacts with the messaging
        infrastructure correctly. Testcontainers can run a real broker instance in a Docker
        container during the test run, allowing integration tests to publish and consume real
        messages without depending on a shared infrastructure environment.
      </KBP>

      <KBP>
        Integration tests with a real broker should cover the end-to-end flow from event
        publication through to consumer processing and assert on the final state of the system
        rather than on intermediate steps. They will be slower than unit tests and should be
        designed to run in parallel where possible to keep the overall feedback time acceptable.
      </KBP>

      <KBH2 id="monitoring-and-observability">Monitoring and observability in production</KBH2>

      <KBP>
        Consumer lag (the delay between event publication and event processing) is a critical
        operational metric for event-driven systems and also a useful signal in testing. An
        integration test that publishes an event and then monitors consumer lag until it reaches
        zero is testing both the processing logic and the operational health of the consumer.
        In production, consumer lag alerts provide an early warning that consumers are falling
        behind, which may indicate a processing bottleneck or a downstream failure.
      </KBP>

      <KBNote variant="green">
        Dead-letter queues capture events that could not be processed successfully. Testing
        should include scenarios that cause events to fail processing and verify that they are
        correctly routed to the dead-letter queue rather than dropped silently. Equally important
        is verifying that the team has a process for inspecting and reprocessing messages from
        the dead-letter queue, since unprocessed events represent lost work or data.
      </KBNote>
    </>
  )
}

import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function LogsMetricsAndTraces() {
  return (
    <>
      <KBP>
        Logs, metrics and traces are the three primary signals that give a team visibility into
        how a system is behaving. Together they are often referred to as the three pillars of
        observability. For QA engineers, understanding these signals is increasingly important:
        as software delivery moves towards continuous deployment and shorter feedback cycles,
        the ability to interpret production behaviour and tie it back to specific releases or
        test coverage gaps becomes part of the quality role. A tester who can read a distributed
        trace, understand a metric spike and correlate both with a recent deployment is
        significantly more effective than one who can only assess behaviour through the UI.
      </KBP>

      <KBH2 id="logs">Logs</KBH2>

      <KBP>
        A log is a timestamped record of something that happened in a system. At its simplest,
        a log entry records an event: a request was received, a payment was processed, an error
        was thrown. Logs are the most familiar signal to most developers and testers because
        they are easy to produce and can be read directly. They are also the most voluminous
        and the least structured in many systems, which makes them difficult to search and
        aggregate at scale.
      </KBP>

      <KBH3>Structured logging</KBH3>

      <KBP>
        Structured logs record events as key-value pairs or JSON objects rather than free-form
        text strings. A structured log entry for a failed payment might include the event type,
        the user identifier, the amount, the error code and the timestamp as distinct fields
        rather than embedding them in a sentence. This makes the log searchable, filterable
        and aggregatable in ways that plain text logs are not. Modern logging platforms such
        as Datadog, Elasticsearch and Splunk are built around structured logs and provide little
        value when fed unstructured text.
      </KBP>

      <KBH3>Log levels</KBH3>

      <KBP>
        Log levels (typically DEBUG, INFO, WARN, ERROR and FATAL) control the verbosity of
        logging output. In a QA context, the levels in use during a test run can significantly
        affect the usefulness of the output. DEBUG-level logging in automated tests can reveal
        exactly what the system was doing when a test failed. ERROR-level logging in a production
        environment surfaces genuine failures without being buried in informational noise.
        Understanding which level to expect and how to filter logs to the relevant level is
        a practical skill for any tester working with automated test output or production
        investigations.
      </KBP>

      <KBH2 id="metrics">Metrics</KBH2>

      <KBP>
        A metric is a numeric measurement sampled or aggregated over time: request rate, error
        rate, response time, memory usage, queue depth, active connections. Metrics are cheap
        to collect and store compared with logs and lend themselves naturally to visualisation,
        alerting and trend analysis. Where a log records what happened, a metric records how
        much or how fast.
      </KBP>

      <KBP>
        The RED method (Rate, Errors, Duration) is a widely used framework for defining the
        core metrics to track for any service: how many requests per second it is handling,
        what proportion are returning errors and how long each request takes to complete.
        These three metrics, monitored together, capture the basic health of a service from
        a user perspective and are a useful starting point when instrumenting a new service
        or reviewing the monitoring coverage of an existing one.
      </KBP>

      <KBH3>Metrics in QA</KBH3>

      <KBP>
        Metrics are useful to QA beyond production monitoring. Performance test results are
        fundamentally metrics: response time at the 95th percentile, throughput in requests
        per second, error rate under load. Comparing metrics across test runs reveals regressions
        in performance that would not be visible in a simple pass or fail result. Tracking
        metrics from automated test runs over time (test duration, flakiness rate, failure
        count) turns the test suite itself into a monitored system with observable health.
      </KBP>

      <KBAside label="Use the RED method as a monitoring baseline" variant="blue">
        When reviewing whether a service is adequately monitored, Rate, Errors and Duration
        provide a minimum viable starting point. If a service does not have alerts on all three,
        it is possible for it to degrade significantly without anyone knowing until a user
        reports a problem. QA engineers embedded in product teams are well placed to flag
        monitoring gaps as part of a definition of done.
      </KBAside>

      <KBH2 id="traces">Traces</KBH2>

      <KBP>
        A distributed trace follows a single request as it travels across multiple services,
        recording the time spent in each service and each operation within that service. A
        trace is composed of spans: each span represents a unit of work (a database query,
        an outbound HTTP call, a queue operation) and records its start time, duration and
        any errors that occurred within it.
      </KBP>

      <KBP>
        Traces are particularly valuable in microservice architectures, where a single user
        action may touch ten or more services and a slow response may be caused by any one
        of them. Without tracing, diagnosing the source of a slow request requires correlating
        log entries across multiple services manually, which is time-consuming and often
        inconclusive. With tracing, a waterfall view of the request shows exactly where time
        is being spent and which span is the source of the latency.
      </KBP>

      <KBH3>Traces and testing</KBH3>

      <KBP>
        Traces generated during test runs are useful diagnostic tools when tests fail in
        integration or end-to-end environments. If an end-to-end test times out, a trace from
        the failing request can reveal whether the bottleneck is in the application service,
        a downstream service or a database query. This turns a vague timeout failure into a
        specific, actionable investigation target. Some teams instrument their test environments
        with the same tracing tooling used in production specifically to get this level of
        diagnostic visibility.
      </KBP>

      <KBH2 id="correlating-the-three-signals">Correlating the three signals</KBH2>

      <KBP>
        The three signals are most powerful in combination. A metric alert fires because error
        rates have exceeded a threshold. The trace for one of those errors shows that the failure
        is in a downstream payment service. The logs from that service show a specific exception
        being thrown for a subset of currency codes. Each signal narrows the investigation:
        metrics surface the symptom, traces locate the service boundary where the problem
        occurs and logs reveal the specific cause.
      </KBP>

      <KBNote variant="green">
        Good observability is not the same as lots of logging. A system with thousands of
        unstructured log lines, no metrics and no tracing is harder to debug than one with
        focused structured logs, meaningful metrics and trace context on every request.
        Quality in observability is about signal clarity rather than volume. Reviewing
        observability coverage as part of feature testing, not just production operations,
        builds it into the product rather than retrofitting it after incidents.
      </KBNote>
    </>
  )
}

import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function PerformanceAndLoadTools() {
  return (
    <>
      <KBP>
        Performance and load testing tools simulate multiple concurrent users making
        requests to a system, measuring how it behaves under sustained traffic, sudden
        spikes and boundary conditions. The outputs, typically response times, error
        rates, throughput and resource utilisation, reveal whether the system meets its
        performance requirements and where it begins to degrade. Three tools dominate
        this space: JMeter, k6 and Gatling. Each approaches test authoring and execution
        differently, and the choice between them often comes down to the team's technical
        background.
      </KBP>

      <KBH2 id="jmeter">Apache JMeter</KBH2>

      <KBP>
        <a href="https://jmeter.apache.org" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">Apache JMeter</a> is
        a Java-based load testing tool that has been in active use since 1998. It provides
        a graphical test plan editor for building test scenarios without writing code,
        making it accessible to testers who are not comfortable working in a
        programming language. Test plans are composed of thread groups, which define the
        number of virtual users and ramp-up period, and samplers, which define the
        requests those users make. Samplers cover HTTP, FTP, JDBC database queries,
        message queues and more, making JMeter applicable beyond web APIs.
      </KBP>

      <KBP>
        Listeners capture and display results in various formats during a test run, though
        JMeter's guidance is to avoid adding multiple listeners during high-load tests,
        as they consume resources and can distort results. The recommended approach is to
        run JMeter in headless non-GUI mode for actual load tests and use the GUI only
        for test plan development. Results are written to a log file and can be analysed
        afterwards or fed into Grafana via a backend listener. The plugin ecosystem extends
        JMeter with additional samplers, listeners and timers.
      </KBP>

      <KBP>
        JMeter's longevity means it is deeply embedded in many testing organisations and
        benefits from extensive documentation and community knowledge. Its main limitations
        are its Java thread-per-user model, which makes it less efficient than newer tools
        at simulating very large numbers of concurrent users, and its XML-based test plan
        format, which is difficult to manage in version control compared to code-based
        approaches.
      </KBP>

      <KBH2 id="k6">k6</KBH2>

      <KBP>
        <a href="https://k6.io" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">k6</a> is a
        developer-oriented load testing tool now maintained by Grafana Labs, who acquired
        it in 2021. Tests are written in
        JavaScript, with a clean API that defines virtual user behaviour as a default
        exported function. Load profiles are configured declaratively using the options
        object, which sets stages, virtual user counts and thresholds. Thresholds are
        pass/fail criteria defined in the test: a test fails if the 95th percentile
        response time exceeds 500 ms, for example, making k6 suitable as an automated
        gate in a CI pipeline.
      </KBP>

      <KBP>
        k6 is built on a Go runtime and uses a lightweight goroutine model rather than
        threads, allowing it to simulate significantly higher concurrency per machine
        than JMeter for HTTP-focused tests. It outputs metrics in real time to the
        terminal and can stream results to Grafana Cloud, InfluxDB, Prometheus and other
        backends for dashboarding and alerting. The Grafana Cloud k6 extension provides
        cloud-based distributed execution for tests that require traffic from multiple
        geographic regions or volumes beyond a single machine.
      </KBP>

      <KBP>
        k6 does not run in a browser environment by default, which means it cannot execute
        JavaScript in a page or interact with rendered UI. It tests protocols and HTTP
        endpoints rather than user journeys through a browser. A browser module does exist
        for scenarios where browser-level behaviour needs to be included in a load test,
        but it is a separate capability.
      </KBP>

      <KBH2 id="gatling">Gatling</KBH2>

      <KBP>
        <a href="https://gatling.io" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">Gatling</a> is
        a load testing tool with a strongly typed simulation DSL available in Scala, Java
        and Kotlin. Simulations define scenarios as chains of HTTP requests with think times,
        pauses and conditional logic. The DSL is expressive and produces readable test code
        that reflects the load profile precisely. Gatling's asynchronous, non-blocking
        architecture based on the Akka framework handles high concurrency efficiently on
        a single machine.
      </KBP>

      <KBP>
        Gatling's standout feature is its HTML report. After each test run it generates a
        detailed report showing response time distributions, percentile breakdowns, request
        counts and error summaries with charts and tables that make the results immediately
        interpretable without a separate analytics tool. This makes Gatling particularly
        useful for performance baselines and release comparisons where the report itself
        serves as the deliverable.
      </KBP>

      <KBP>
        Gatling Enterprise, the commercial offering, adds distributed load generation,
        team collaboration features and CI integration with additional reporting capabilities.
        The open-source version is fully functional for most use cases and has no restriction
        on virtual user counts.
      </KBP>

      <KBAside label="Interpreting results" variant="blue">
        The most common mistake in load testing is optimising for average response time.
        Average latency hides the tail: a system where 95% of requests complete in 100 ms
        but 5% take 10 seconds has an acceptable average but an unacceptable user experience
        for a significant proportion of users. All three tools can report percentile metrics.
        Setting thresholds or acceptance criteria at the 95th or 99th percentile gives a
        more honest picture of system behaviour under load.
      </KBAside>

      <KBNote variant="warning">
        Load tests send real traffic to real systems and can cause outages if run against
        the wrong target. Always confirm the target environment before running a load test,
        use separate test accounts and data, notify infrastructure and operations teams in
        advance and have a clear plan for stopping the test if the system shows signs of
        failure. Running load tests against production without appropriate safeguards is a
        significant operational risk.
      </KBNote>
    </>
  )
}

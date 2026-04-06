import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function PerformanceAndLoadTesting() {
  return (
    <>
      <KBP>
        Performance testing assesses how a system behaves under realistic and extreme conditions.
        Where functional tests verify correctness, performance tests verify speed, stability and
        capacity. A system that produces the right answers too slowly, degrades under concurrent
        usage or collapses under brief bursts of traffic is failing its users regardless of
        whether every functional test passes. Performance problems are also among the most
        expensive to discover late: a fundamental architectural bottleneck found in production
        is far harder to address than one identified during development.
      </KBP>

      <KBH2 id="types-of-performance-test">Types of performance test</KBH2>

      <KBP>
        There are several recognised types of performance test. The four most commonly used
        are load, stress, soak and spike testing, though volume and scalability testing are
        also distinct approaches in some contexts.
      </KBP>

      <KBH3>Load testing</KBH3>

      <KBP>
        Load testing simulates the expected volume of users or transactions that a system will
        encounter under normal operating conditions. The aim is to verify that the system meets
        its performance requirements (typically expressed as response time targets at a given
        throughput) and to identify how it behaves as load approaches its designed capacity.
        Load tests establish a performance baseline and are the most commonly run type of
        performance test.
      </KBP>

      <KBH3>Stress testing</KBH3>

      <KBP>
        Stress testing pushes a system beyond its designed capacity to understand how it fails
        and where. The goal is not to confirm that the system handles more than it should; it
        is to understand the failure mode. Does the system degrade gracefully when it is
        overloaded, or does it fail catastrophically? Do errors cascade to affect unrelated
        components? Stress tests reveal the system's breaking point and the nature of the break.
      </KBP>

      <KBH3>Soak testing</KBH3>

      <KBP>
        Soak testing runs the system at a sustained load for an extended period, typically hours
        or days. It is designed to surface problems that do not manifest immediately: memory
        leaks that grow gradually, connection pool exhaustion from handles that are not properly
        released, cache invalidation issues or log files that fill available disk space. These
        problems would not appear in a load test that runs for ten minutes but become critical
        in a system running continuously in production.
      </KBP>

      <KBH3>Spike testing</KBH3>

      <KBP>
        Spike testing examines what happens when load increases rapidly and dramatically over a
        short period: a news event driving traffic to a media site, a sale event on an e-commerce
        platform or a marketing campaign driving sign-ups. The test verifies that the system can
        scale to meet the spike, absorb it without degrading for existing users and return to
        normal operation once the spike subsides.
      </KBP>

      <KBH2 id="designing-meaningful-tests">Designing meaningful tests</KBH2>

      <KBP>
        A performance test is only as useful as the workload it simulates. Tests built around
        artificial or unrealistic scenarios may pass while the system fails under actual usage
        patterns. Designing meaningful tests requires understanding how the system is actually
        used: which journeys are most frequent, what the peak concurrent user count looks like,
        what the read-to-write ratio of database operations is and whether load is distributed
        evenly across time or concentrated in predictable bursts.
      </KBP>

      <KBP>
        Define performance requirements before running tests, not after. A target such as the
        95th percentile response time for the checkout journey must remain below 800 milliseconds
        at 500 concurrent users is testable and objectively pass or fail. A target such as the
        system should feel fast is not. Without documented requirements, there is no basis for
        determining whether a result represents a pass, a concern or a failure.
      </KBP>

      <KBAside label="Use production traffic patterns" variant="blue">
        The most realistic load test scenarios are derived from production access logs, which
        reveal the actual distribution of requests across endpoints, the ratio of reads to
        writes and the timing patterns of real usage. Even an approximation of this distribution
        produces far more meaningful results than a test that simply hammers a single endpoint
        at a uniform rate.
      </KBAside>

      <KBH2 id="interpreting-results">Interpreting results</KBH2>

      <KBP>
        Performance test results require careful interpretation. Average response time is one of
        the least useful metrics because it can mask significant variation. A test reporting an
        average response time of 200 milliseconds might include a substantial number of requests
        taking two seconds or more. Percentile metrics (particularly the 95th and 99th percentile)
        give a much clearer picture of the actual user experience.
      </KBP>

      <KBP>
        Error rates matter as much as response times. A system that responds quickly but returns
        errors for a significant proportion of requests under load is not performing well. Monitor
        error rates, timeout rates and the specific error types that appear as load increases.
        The point at which errors begin to appear is as important a signal as the point at which
        response times degrade.
      </KBP>

      <KBP>
        System-level metrics complement the test results. CPU utilisation, memory usage, database
        connection pool saturation, garbage collection frequency and network throughput all
        contribute to understanding why the system is behaving as it is. A high response time
        paired with high CPU usage points in a different direction to the same response time
        paired with a saturated database connection pool.
      </KBP>

      <KBH2 id="integrating-performance-testing">Integrating performance testing into delivery</KBH2>

      <KBP>
        Full performance tests are typically too expensive to run on every pull request, but
        leaving them entirely outside CI means that performance regressions accumulate unseen
        until a scheduled test run or a production incident. A practical approach is a tiered
        strategy: a small, fast performance smoke test (a few critical journeys at modest load)
        runs in CI on every merge to the main branch, while comprehensive load and stress tests
        run on a schedule or before significant releases.
      </KBP>

      <KBP>
        Compare results against the established baseline rather than against an absolute target
        alone. A response time that is within specification but 40% worse than last week warrants
        investigation even if it has not breached a threshold. Tracking trends over time turns
        performance testing from a point-in-time verdict into an ongoing quality signal.
      </KBP>

      <KBNote variant="green">
        Performance testing should include the database in scope. Many application-level
        performance problems are caused by slow queries, missing indexes or inefficient ORM
        behaviour rather than application code. Run slow query logging during performance tests
        to identify database bottlenecks that would not be visible from application metrics alone.
      </KBNote>
    </>
  )
}

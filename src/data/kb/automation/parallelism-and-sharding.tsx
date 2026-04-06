import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function ParallelismAndSharding() {
  return (
    <>
      <KBP>
        As a test suite grows, the time it takes to run becomes a practical constraint on how
        often it can be run. A suite that takes twenty minutes to complete cannot provide fast
        feedback in a CI pipeline designed to gate every pull request. Parallelism and test
        sharding are two complementary techniques for reducing the wall-clock time of a test
        run by distributing work across multiple workers running simultaneously.
      </KBP>

      <KBH2 id="why-parallel-execution-matters">Why parallel execution matters</KBH2>

      <KBP>
        The total execution time of a test suite when run sequentially is the sum of every
        test's individual execution time. When tests run in parallel, the wall-clock time
        approaches the duration of the longest individual test, not the sum of all tests. A
        suite of a thousand tests taking one second each takes over sixteen minutes sequentially.
        Spread across sixteen parallel workers, the same suite completes in roughly one minute.
      </KBP>

      <KBP>
        For CI pipelines, faster feedback changes team behaviour. Developers are more likely
        to wait for and act on test results that arrive in two minutes than in twenty. A slow
        pipeline that developers work around provides significantly weaker quality assurance than
        a fast one that is integrated into the natural development flow.
      </KBP>

      <KBH2 id="how-sharding-works">How sharding works</KBH2>

      <KBP>
        Test sharding divides a test suite into subsets, called shards, that can be assigned
        to separate workers. Each worker runs its assigned shard independently, and the results
        are aggregated when all workers complete. The simplest approach is to divide tests
        evenly: if there are four workers and one hundred tests, each worker receives
        twenty-five tests. More sophisticated approaches weight the division by estimated
        execution time so that each worker finishes in roughly the same amount of time,
        avoiding idle workers waiting for a single slow shard to complete.
      </KBP>

      <KBH3>Static vs dynamic sharding</KBH3>

      <KBP>
        Static sharding assigns tests to shards by a fixed rule, such as test file name or
        index. Dynamic sharding assigns tests to workers as each worker becomes available,
        dispatching the next queued test to the first idle worker. Dynamic sharding tends to
        produce better load balancing because it adapts to the actual execution time of each
        test rather than relying on predictions, but it requires a test orchestration layer
        that static sharding does not.
      </KBP>

      <KBH2 id="trade-offs-and-gotchas">Trade-offs and gotchas</KBH2>

      <KBH3>Test isolation is mandatory</KBH3>

      <KBP>
        Parallel execution exposes test isolation problems that sequential execution conceals.
        If two tests share a database record, a file or any mutable resource, running them
        simultaneously can cause them to interfere with each other in ways that produce
        intermittent failures. Parallel execution should not be added to a test suite that is
        not already isolated; it will make existing isolation problems worse and harder to
        diagnose.
      </KBP>

      <KBH3>Resource contention</KBH3>

      <KBP>
        Many parallel workers hitting a single database or external service simultaneously
        creates load that may not be representative of the production system and may cause
        failures unrelated to the code under test. Database connection pools exhaust quickly
        under high concurrency, and a shared test environment may not be provisioned to handle
        the throughput of a fully parallelised suite.
      </KBP>

      <KBAside label="Parallel workers vs threads" variant="gold">
        Parallelism in test suites is typically achieved either through separate processes or
        through threads within a single process. Process-level parallelism provides stronger
        isolation because each worker has its own memory space, but uses more resources.
        Thread-level parallelism is lighter but requires the test code to be thread-safe.
        Most CI-oriented test frameworks default to process-level parallelism for reliability.
      </KBAside>

      <KBH2 id="practical-considerations">Practical considerations</KBH2>

      <KBP>
        Before parallelising a suite, confirm that tests are fully isolated. Run the suite in
        random order to surface order dependencies. Then introduce parallelism incrementally,
        starting with a small number of workers and increasing as stability is confirmed.
      </KBP>

      <KBP>
        End-to-end tests that require a browser instance per worker need one browser process
        per parallel worker. Most end-to-end frameworks manage this automatically, but the
        infrastructure must be provisioned accordingly. Running ten parallel end-to-end workers
        on a machine provisioned for two will produce slower results than running them
        sequentially, not faster.
      </KBP>

      <KBNote variant="blue">
        Diminishing returns apply to parallelism. Adding more workers reduces wall-clock time
        up to the point where the bottleneck is no longer test execution but rather setup,
        teardown, result aggregation or infrastructure overhead. Profile the pipeline before
        scaling the number of workers, and confirm that additional workers are producing
        proportional speed improvements.
      </KBNote>
    </>
  )
}

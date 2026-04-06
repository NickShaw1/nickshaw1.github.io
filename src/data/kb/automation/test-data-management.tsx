import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function TestDataManagement() {
  return (
    <>
      <KBP>
        Test data management is the practice of providing automated tests with the data they
        need to run, in a controlled, consistent and isolated way. It is one of the most
        consistently underestimated challenges in automation. Tests that produce reliable results
        on a clean environment often fail on a shared environment because the data is in an
        unexpected state. Tests that run cleanly in sequence fail in parallel because they
        share data they both modify. A coherent approach to test data is foundational to a
        test suite that behaves predictably.
      </KBP>

      <KBH2 id="the-test-data-problem">The test data problem</KBH2>

      <KBP>
        Tests require specific data conditions to exercise specific behaviours. A test that
        verifies a user can edit their profile needs a user to exist. A test that verifies
        the checkout flow works needs products in a catalogue, a user with a payment method
        and potentially items already in a basket. This data must exist before the test runs,
        must be in the correct state and must not be affected by other tests running at the
        same time.
      </KBP>

      <KBP>
        In practice, managing this is complex. Shared test environments accumulate data from
        previous runs. Tests that were written when data was clean begin failing when prior
        runs leave the environment in an unexpected state. Parallel test runs modify the same
        records simultaneously. Manual setup of test data is inconsistent and time-consuming.
        Without a systematic approach, test data becomes the primary source of instability in
        the suite.
      </KBP>

      <KBH2 id="strategies">Strategies for managing test data</KBH2>

      <KBH3>Data factories</KBH3>

      <KBP>
        A data factory is code that creates test data on demand. Rather than relying on
        pre-existing records, each test calls the factory to create exactly the data it needs,
        typically through an API or by inserting directly into the database. The factory
        produces realistic, valid data with sensible defaults while allowing the test to
        override specific attributes relevant to what is being tested.
      </KBP>

      <KBP>
        Factories make tests self-describing: the data created at the top of a test tells the
        reader exactly what conditions the test requires. They also make tests portable across
        environments because the test carries its own setup rather than depending on data
        someone has configured manually.
      </KBP>

      <KBH3>Database seeding</KBH3>

      <KBP>
        Seeding populates a database with a known dataset before a test run begins. A seed
        script inserts the records needed for the suite to run and is executed as part of the
        test setup phase. Seeding is appropriate for data that is read-only during the tests
        or for reference data that many tests share, such as configuration records, product
        catalogues or lookup tables.
      </KBP>

      <KBH3>Synthetic data generation</KBH3>

      <KBP>
        For tests that require large volumes of data, such as performance or load tests,
        generating synthetic data programmatically is more practical than maintaining it
        manually. Libraries in most languages can produce realistic-looking names, addresses,
        numbers and other attribute values at scale. Synthetic data avoids the risk of using
        real customer data in a test environment.
      </KBP>

      <KBAside label="Production data in testing" variant="gold">
        Using copies of production data in test environments is tempting because it is
        realistic, but it introduces significant risks. Production data may contain personal
        or sensitive information that should not be accessible outside production. It changes
        over time, meaning tests that pass today against one snapshot may fail against next
        month's. And it may include edge cases that break tests written against cleaner data.
        Where production data is used, it should be anonymised and refreshed on a controlled
        schedule.
      </KBAside>

      <KBH2 id="isolation">Data isolation</KBH2>

      <KBP>
        Each test should work with data that is independent of every other test. Two common
        approaches achieve this. The first is to give each test its own data: the test creates
        what it needs, uses it and deletes it. The second is to give each test its own database
        schema or instance, so that tests never share data at all.
      </KBP>

      <KBP>
        Schema-per-test-run isolation is practical with tools such as Testcontainers, which
        can spin up a fresh database container for each test run. This approach provides the
        strongest possible isolation, where no test can affect any other, at the cost of longer
        setup times and greater resource consumption.
      </KBP>

      <KBH2 id="seeding-and-teardown">Seeding and teardown</KBH2>

      <KBP>
        Setup and teardown are the bookends of any test that works with persistent data. Setup
        creates the data the test needs; teardown removes it. Both must be reliable for the
        test to be reliable.
      </KBP>

      <KBH3>Teardown is not optional</KBH3>

      <KBP>
        A test that creates data but does not clean it up leaves state that may affect
        subsequent tests. If the test fails mid-execution before reaching the teardown step,
        the cleanup does not run. Using a finally block, an after-each hook or a framework-
        provided cleanup mechanism ensures teardown runs regardless of whether the test passed
        or failed.
      </KBP>

      <KBNote variant="blue">
        Creating data through the application's own API rather than inserting directly into
        the database is generally more robust. Direct database insertion bypasses validation,
        business logic and any other constraints enforced by the application layer. Data
        created through the API is guaranteed to be in a valid state that the application
        can work with.
      </KBNote>
    </>
  )
}

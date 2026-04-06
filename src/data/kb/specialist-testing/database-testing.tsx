import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function DatabaseTesting() {
  return (
    <>
      <KBP>
        Database testing verifies that a system's data layer behaves correctly: that data is
        stored, retrieved, updated and deleted as intended; that the schema correctly represents
        the domain; that constraints enforce data integrity; and that queries perform acceptably
        under realistic conditions. Many application defects originate in the data layer, and
        many of these defects are not caught by application-level tests because those tests do
        not verify the state of the database directly. A comprehensive testing strategy treats
        the database as a first-class part of the system rather than a passive store that can
        be assumed to work correctly.
      </KBP>

      <KBH2 id="schema-and-migration-testing">Schema and migration testing</KBH2>

      <KBP>
        Database schemas change over time as the application evolves, and those changes must
        be managed through migrations: scripts that alter the schema in a controlled, repeatable
        way. Schema migration testing verifies that migrations apply correctly to a clean
        database, that they can be applied to a database in its previous state and, where
        rollback migrations exist, that they reverse the change cleanly.
      </KBP>

      <KBP>
        A common failure mode is a migration that works correctly in development (where the
        database is freshly created and sparsely populated) but fails against a production
        database that has years of data with edge cases the migration did not account for.
        Testing migrations against a representative dataset, or a production snapshot, before
        deployment significantly reduces this risk.
      </KBP>

      <KBH3>Constraints and referential integrity</KBH3>

      <KBP>
        Database constraints such as foreign keys, unique constraints and check constraints
        are part of the schema and should be tested. Verify that the constraints reject the
        data they are designed to reject and that the application handles constraint violations
        correctly (returning an appropriate error rather than propagating a raw database
        exception to the user). Constraints that exist in the schema but are not enforced
        by the application are a source of subtle data quality problems over time.
      </KBP>

      <KBH2 id="data-integrity-testing">Data integrity testing</KBH2>

      <KBP>
        Data integrity testing verifies that the data in the database is consistent and correct
        over time. This includes checking that business rules reflected in the data are enforced
        (for example, that an order cannot exist without a valid customer, or that a financial
        transaction's debits and credits balance), that duplicate records are not created through
        concurrent operations and that data is not silently corrupted by application bugs or
        by partial failures in multi-step operations.
      </KBP>

      <KBP>
        For systems with complex business rules, integrity assertions can be written as queries
        that run against the database directly and verify conditions that the application should
        maintain. Running these assertions after test scenarios or as part of a periodic check
        in staging can surface integrity problems that would not be visible at the application
        layer until they caused a visible failure.
      </KBP>

      <KBAside label="Test your queries, not just your ORM" variant="blue">
        Object-relational mappers (ORMs) abstract away the SQL layer, which can make it easy
        to forget that the queries they generate need testing too. Complex ORM queries can
        produce unexpected SQL, return incorrect results for edge case inputs or generate N+1
        query patterns that are functionally correct but catastrophically slow at scale. Include
        query behaviour (including the SQL generated) in the scope of database testing.
      </KBAside>

      <KBH2 id="query-and-performance-testing">Query and performance testing</KBH2>

      <KBP>
        Slow database queries are one of the most common sources of application performance
        problems and one of the most overlooked areas of testing. A query that returns results
        in 20 milliseconds against a development database with a few hundred rows may take
        several seconds against a production database with millions of rows, particularly if
        it lacks an appropriate index.
      </KBP>

      <KBP>
        Query performance testing involves verifying that queries perform acceptably against
        a database at realistic scale. This requires a test database with a volume of data
        that approximates production, or at least enough data to reveal indexing failures.
        The execution plan of a query (obtained through EXPLAIN or its equivalent in the target
        database) reveals whether indexes are being used, where full table scans are occurring
        and where the query optimiser is making decisions that may not serve it well at scale.
      </KBP>

      <KBH2 id="testing-transactions-and-concurrency">Testing transactions and concurrency</KBH2>

      <KBP>
        Applications that allow concurrent access to the same data must handle concurrent
        operations correctly. Without proper transaction isolation, two concurrent processes
        reading and then writing the same record can produce inconsistent results (a classic
        read-modify-write race). Testing concurrent scenarios requires either purpose-built
        concurrency tests or careful analysis of transaction isolation levels and locking
        behaviour to confirm that the application's assumptions are met by the database
        configuration.
      </KBP>

      <KBNote variant="green">
        Use a separate, isolated test database rather than a shared development or staging
        database for automated tests. Tests that modify data will interfere with each other
        and with manual exploratory sessions if they share a database. Automated database
        tests should be able to create, modify and destroy data freely without affecting
        anything or anyone else.
      </KBNote>
    </>
  )
}

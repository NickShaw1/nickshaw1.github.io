import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function GraphqlTesting() {
  return (
    <>
      <KBP>
        GraphQL is a query language for APIs that gives clients control over the shape of the
        data they request. Rather than consuming fixed endpoints that return predetermined
        response structures, clients send queries describing exactly the fields they need and
        receive exactly those fields. This flexibility is one of GraphQL's main advantages, but
        it also changes the testing challenge in important ways: the surface area is no longer
        a finite list of endpoints but a schema that can be queried in a very large number of
        combinations. Testing a GraphQL API requires understanding both what the schema exposes
        and how it is actually used.
      </KBP>

      <KBH2 id="what-makes-graphql-different">What makes GraphQL different</KBH2>

      <KBP>
        In a REST API, each endpoint has a defined input and output. Testing it means verifying
        those inputs and outputs. In a GraphQL API, a single endpoint (typically <code>/graphql</code>)
        accepts queries that can request any combination of fields from the schema. A single
        type might be queried alone, nested within another type or as part of a complex query
        that traverses multiple relationships. This means that exhaustive testing of all possible
        queries is not practical; testing must be prioritised around the queries that clients
        actually send and the scenarios that carry the most risk.
      </KBP>

      <KBP>
        GraphQL also introduces specific mechanisms that have their own testing considerations:
        mutations (operations that change data), subscriptions (operations that push updates
        over a long-lived connection), directives (instructions that modify query execution)
        and fragments (reusable selections of fields). Each of these has distinct behaviour
        that should be part of the test plan for a GraphQL implementation.
      </KBP>

      <KBH2 id="testing-queries-and-mutations">Testing queries and mutations</KBH2>

      <KBH3>Query testing</KBH3>

      <KBP>
        Query tests verify that a GraphQL query returns the expected data in the expected shape.
        A query test sends a specific query with specific variables, sets up the necessary data
        state on the server and asserts on the response. Tests should cover the queries that
        application clients actually send, including queries with nested relationships, pagination
        arguments and filter variables. Testing only simple top-level field retrieval may leave
        significant behaviour unverified.
      </KBP>

      <KBH3>Mutation testing</KBH3>

      <KBP>
        Mutations create, update or delete data. Mutation tests verify that the data state
        changes correctly, that the returned data reflects the new state and that error cases
        (invalid input, constraint violations, unauthorised operations) are handled and returned
        in the appropriate GraphQL error format. GraphQL returns errors differently from REST:
        a mutation that partially fails may return a 200 status with errors in the response
        body rather than an HTTP error code, which means tests must check the response body
        for errors rather than relying on HTTP status codes alone.
      </KBP>

      <KBH2 id="schema-testing">Schema testing</KBH2>

      <KBP>
        The schema is the contract for a GraphQL API. Schema testing verifies that the schema
        itself is correct and that it has not changed in a way that would break existing clients.
        Schema introspection allows the schema to be queried programmatically, making it possible
        to write tests that assert on the presence of specific types, fields and their nullability.
        Schema diff tooling can detect breaking changes automatically: removing a field, changing
        a field's type or making a nullable field required are all breaking changes that would
        cause client queries to fail.
      </KBP>

      <KBAside label="Treat schema changes as breaking changes by default" variant="blue">
        Adding fields to a GraphQL schema is non-breaking. Removing or renaming fields, changing
        argument types or altering nullability are breaking changes for any client that uses the
        affected fields. Introduce a schema change review process that requires explicit approval
        for potentially breaking changes, and use deprecation directives to give clients time
        to migrate before fields are removed.
      </KBAside>

      <KBH2 id="authorisation-and-security">Authorisation and security</KBH2>

      <KBP>
        GraphQL's flexibility creates specific security considerations. Field-level authorisation
        is more complex than endpoint-level authorisation: a user may be permitted to query a
        type but not to access certain fields within it, or may be allowed to see their own
        records within a type but not those of other users. Tests should verify that
        authorisation rules are enforced at the field level, not just the query level.
      </KBP>

      <KBP>
        Query depth and complexity attacks are also worth testing. A deeply nested query
        that requests many levels of related objects can generate a very large number of
        resolver calls and put significant load on the server. GraphQL servers should implement
        query depth and complexity limits, and tests should verify that queries exceeding those
        limits are rejected rather than executed.
      </KBP>

      <KBH2 id="performance-considerations">Performance considerations</KBH2>

      <KBP>
        The N+1 query problem is a common performance issue in GraphQL implementations where
        a query that returns a list of objects triggers a separate database query for each
        object to resolve a related field. If a query returns a hundred orders and each order
        requires a separate query to resolve its customer, one query becomes a hundred and one.
        This problem is typically solved using a DataLoader pattern, which batches and caches
        resolver calls. Testing should include scenarios that would trigger N+1 behaviour and
        verify, through query logging or metrics, that batching is working correctly.
      </KBP>

      <KBNote variant="green">
        Use a real GraphQL client in tests rather than sending raw HTTP requests. A client
        that understands the GraphQL protocol can handle query parsing, variable serialisation
        and response error handling correctly, producing tests that better reflect how real
        clients will interact with the API. Many GraphQL testing libraries provide utilities
        for sending queries and asserting on responses in a readable, maintainable way.
      </KBNote>
    </>
  )
}

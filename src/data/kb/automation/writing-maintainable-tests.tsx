import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function WritingMaintainableTests() {
  return (
    <>
      <KBP>
        A test suite is a long-term asset, not a one-time deliverable. Tests written without
        thought for maintenance will, over time, become a burden rather than a benefit: slow to
        update, hard to understand and disconnected from the behaviour they were written to
        verify. Writing tests that remain useful as the codebase evolves requires deliberate
        choices at the level of structure, naming, isolation and abstraction. These choices
        matter more in automation than in any other area of testing, because the cumulative
        cost of a poorly written test suite compounds with every change made to the system.
      </KBP>

      <KBH2 id="the-maintenance-problem">The maintenance problem</KBH2>

      <KBP>
        A test fails for one of two reasons: the code has a defect, or the test is wrong.
        The second is far more common than teams new to automation expect. Tests break because
        the application changes and the tests are not updated, because the test was fragile to
        begin with, because shared state between tests causes interference or because the test
        was tied to implementation details rather than observable behaviour. Each of these
        causes a legitimate test failure that the team must investigate, distinguish from a
        real defect and resolve.
      </KBP>

      <KBP>
        The maintenance cost of a test suite is the time spent updating, investigating and
        fixing tests for reasons unrelated to genuine defects in the application. In a well-
        written suite, this cost is low: tests break when behaviour changes, and the change
        required to fix them is obvious. In a poorly written suite, this cost can exceed the
        value the tests provide, leading teams to disable tests they cannot afford to maintain.
      </KBP>

      <KBH2 id="naming-and-structure">Naming and structure</KBH2>

      <KBP>
        A test name should describe the behaviour being verified in enough detail that the name
        alone explains why the test failed when a failure occurs. Names such as
        <em> test1</em> or <em>it works</em> provide no diagnostic value. A name such as
        <em> returns a 404 when a user requests a resource that does not exist</em> tells the
        reader exactly what was expected and points directly to where to look when it fails.
      </KBP>

      <KBP>
        The structure of a test should follow a consistent pattern that makes it readable at a
        glance. The arrange-act-assert pattern (sometimes called given-when-then) separates the
        three concerns of a test: setting up the conditions, executing the code under test and
        verifying the outcome. Tests written to this structure are easier to read, easier to
        debug and easier to update when the behaviour they verify changes.
      </KBP>

      <KBAside label="One assertion per test" variant="gold">
        A test with multiple assertions fails at the first assertion that does not pass, leaving
        the remaining assertions unexecuted. This means a single failing test can hide multiple
        failures. Where possible, keep each test focused on a single observable outcome. When
        multiple related assertions genuinely belong together, group them logically and give the
        test a name that describes the full outcome being verified.
      </KBAside>

      <KBH2 id="test-isolation">Test isolation</KBH2>

      <KBP>
        Each test should be able to run independently of every other test in the suite, in any
        order. Tests that share state, whether through global variables, a shared database or
        cached objects, produce results that depend on execution order. A test that passes when
        run in isolation but fails when run as part of the full suite is a sign of state leakage
        from another test.
      </KBP>

      <KBP>
        Isolation requires each test to be responsible for its own setup and teardown. If a
        test requires a particular record in the database, it should create that record at the
        start of the test and remove it at the end. If a test requires a particular environment
        variable, it should set that variable for the duration of the test and restore the
        previous value afterwards. The test should not rely on a previous test to have created
        the conditions it needs.
      </KBP>

      <KBH3>Avoiding shared mutable state</KBH3>

      <KBP>
        Shared mutable state is the most common source of test interference. A singleton
        instance shared across tests, a module-level cache that is not reset between tests or
        a static variable that accumulates state over multiple calls can all cause tests to
        affect each other in ways that are difficult to diagnose. Designing units to receive
        their dependencies explicitly, rather than relying on module-level state, makes both
        the production code and the tests more predictable.
      </KBP>

      <KBH2 id="the-right-abstraction">The right level of abstraction</KBH2>

      <KBP>
        Tests that interact directly with implementation details, such as internal function
        calls, private methods or the specific structure of an object's internal state, break
        whenever the implementation changes even if the observable behaviour is unchanged.
        Tests that interact with the public interface of a unit, module or system are more
        durable because they are not affected by implementation changes that do not alter
        observable behaviour.
      </KBP>

      <KBP>
        The right level of abstraction also applies to helper functions and shared utilities
        in the test code itself. A helper that sets up a complex object for testing can
        eliminate repetition and make tests more readable. But helpers that do too much obscure
        what a test is actually verifying, making it harder to understand failures. The goal
        is to abstract away noise while keeping the test's intent visible.
      </KBP>

      <KBNote variant="blue">
        Tests should be treated as first-class code, subject to the same standards of
        readability and review as production code. A test that cannot be understood by a
        developer who did not write it is a test that will be broken, misinterpreted or
        deleted when it inconveniently fails.
      </KBNote>
    </>
  )
}

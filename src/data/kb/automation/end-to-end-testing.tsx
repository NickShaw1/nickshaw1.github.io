import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function EndToEndTesting() {
  return (
    <>
      <KBP>
        End-to-end testing verifies complete user journeys through a system, from the user
        interface down through every layer to the backing data store and back. An end-to-end
        test simulates what a real user does: it opens a browser, navigates to the application
        and interacts with it in the way a user would. The test passes only if every part of the
        system involved in that journey functions correctly together. This breadth of coverage
        is both the strength and the cost of end-to-end testing.
      </KBP>

      <KBH2 id="what-e2e-covers">What end-to-end testing covers</KBH2>

      <KBP>
        End-to-end tests are the only form of automated testing that exercises the full stack
        in a realistic way. Unit and integration tests verify individual components and their
        interactions, but they cannot detect problems that emerge when every layer of the system
        is connected: a database that responds correctly in isolation but produces unexpected
        results when queried by the real API handler, or a frontend component that renders
        correctly in isolation but breaks when consuming real API responses.
      </KBP>

      <KBP>
        This full-stack coverage is most valuable for the critical user journeys that represent
        the highest business risk. A checkout flow, a user registration journey, a document
        submission process: these are the journeys where a failure is most costly and where
        confidence in the system is most important.
      </KBP>

      <KBH2 id="design-principles">Design principles</KBH2>

      <KBH3>Test journeys, not features</KBH3>

      <KBP>
        An end-to-end test should represent a meaningful user journey rather than a mechanical
        check of a feature. The distinction matters because journeys have defined start and end
        states and produce observable outcomes that map clearly to business value. A test that
        navigates to a form, completes it and verifies the confirmation message is a journey.
        A test that clicks every button on a page to confirm none of them throw an error is not.
      </KBP>

      <KBH3>Keep tests independent</KBH3>

      <KBP>
        Each end-to-end test should be able to run independently of every other test in the
        suite. Tests that depend on the state left by a previous test create fragile chains
        where a single failure causes multiple subsequent tests to fail, and where the order of
        execution affects results. Independence typically requires each test to set up its own
        preconditions, whether by using an API to create the necessary data, by seeding the
        database directly or by logging in through the API rather than through the UI.
      </KBP>

      <KBH3>Avoid testing through the UI what can be tested at a lower level</KBH3>

      <KBP>
        End-to-end tests are expensive. They run slowly, fail intermittently and require
        significant maintenance. A validation rule that can be tested with a unit test should
        be tested with a unit test. An API response that can be tested with an integration test
        should be tested with an integration test. End-to-end tests should be reserved for the
        things only they can verify: the full user journey, the integrated system behaviour and
        the critical paths that must be confirmed to work before a release.
      </KBP>

      <KBH2 id="keeping-suites-stable">Keeping suites stable</KBH2>

      <KBP>
        End-to-end test suites have a reputation for instability, and not without reason. They
        interact with real browsers, real network requests and real UI elements, all of which
        introduce timing variability and environmental unpredictability. A suite that fails
        intermittently is one that the team stops trusting, and a suite that is not trusted
        provides no safety net.
      </KBP>

      <KBP>
        Stability comes from deliberate design choices. Prefer waiting for elements to be in
        the expected state over fixed-time waits. Use stable selectors, such as test-specific
        data attributes, rather than brittle ones such as CSS class names or text content that
        may be translated. Ensure tests clean up after themselves so failures do not leave
        the system in a state that affects subsequent tests. Run the suite against a stable,
        dedicated test environment rather than one shared with development or manual testing.
      </KBP>

      <KBAside label="Data attributes for selectors" variant="blue">
        Selectors based on visual attributes such as CSS classes or element text are fragile.
        A class name change for styling reasons or a copy change will break the test without
        any change to the underlying behaviour. Adding a <code>data-testid</code> attribute to
        elements that tests need to target decouples the test from visual implementation details
        and makes the intent of the selector explicit.
      </KBAside>

      <KBH2 id="trade-offs">Trade-offs</KBH2>

      <KBP>
        End-to-end tests are the most expensive tests to write, run and maintain. They are slow
        compared to unit and integration tests, typically taking seconds or minutes per test
        rather than milliseconds. They fail more often for reasons unrelated to the code under
        test: network timeouts, environment flakiness, timing issues and external service
        dependencies all introduce failure modes that unit tests never encounter.
      </KBP>

      <KBP>
        The implication is that end-to-end suites should be kept deliberately small. A large
        end-to-end suite that takes forty minutes to run and fails intermittently on every CI
        run is worse than a small suite that covers only the ten most critical journeys, runs
        in five minutes and passes reliably. Quality over quantity applies with particular force
        at this level of the pyramid.
      </KBP>

      <KBNote variant="green">
        If an end-to-end test fails, the first question to answer is whether the failure is
        in the application or in the test itself. Infrastructure issues, race conditions in the
        test code and environment instability are all common causes of failure that have nothing
        to do with the feature under test. Before investigating a product defect, confirm that
        the failure is genuine by re-running the test and checking recent infrastructure changes.
      </KBNote>
    </>
  )
}

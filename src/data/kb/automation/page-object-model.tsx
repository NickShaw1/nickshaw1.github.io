import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function PageObjectModel() {
  return (
    <>
      <KBP>
        The page object model is a design pattern for end-to-end test automation that separates
        the representation of application pages from the test logic that exercises them. Rather
        than embedding selectors, navigation steps and interaction code directly in test files,
        a page object encapsulates everything needed to interact with a page or component into
        a single class or object. Tests then call methods on that object rather than manipulating
        the browser directly. The result is test code that is more readable, easier to maintain
        and resilient to changes in the application's UI.
      </KBP>

      <KBH2 id="what-the-pom-is">What the page object model is</KBH2>

      <KBP>
        A page object is a representation of a page or a significant part of a page. It exposes
        high-level methods corresponding to the actions a user can take, such as
        <code>login(username, password)</code>, <code>submitOrder()</code> or
        <code>selectDeliveryOption(option)</code>, and hides the selector logic, waiting and
        interaction mechanics behind those methods. The test code reads like a description of
        user behaviour rather than a sequence of browser API calls.
      </KBP>

      <KBP>
        The principal maintenance benefit is that selector changes only need to be made in one
        place. If a developer changes the ID of a login button, the page object is the only
        file that needs to be updated. Without the page object model, every test that interacts
        with the login button would need individual updates.
      </KBP>

      <KBH2 id="implementing-page-objects">Implementing page objects</KBH2>

      <KBP>
        A page object class typically contains locators as properties and actions as methods.
        Locators identify the elements the page object interacts with. Actions perform the
        interactions and may return values or other page objects representing the result of
        the navigation. Assertions generally do not belong in page objects; keeping them in
        the test file preserves the separation between "how to interact with the page" and
        "what the test expects".
      </KBP>

      <KBH3>Returning page objects from methods</KBH3>

      <KBP>
        When an action results in navigation to a new page, the corresponding method can return
        an instance of the page object for the destination. A
        <code> login(username, password)</code> method that navigates to the dashboard on
        success can return a <code>DashboardPage</code> object, allowing the test to chain
        directly into interactions with the dashboard. This pattern makes the flow of the test
        legible and reduces the boilerplate of instantiating page objects in the test itself.
      </KBP>

      <KBH2 id="alternatives">Alternatives and variants</KBH2>

      <KBH3>Component objects</KBH3>

      <KBP>
        In applications with a component-based architecture, a component object pattern maps
        more naturally than a page object. Rather than modelling a full page, a component
        object models a reusable UI component that appears on multiple pages: a navigation menu,
        a data table or a modal dialogue. Tests compose component objects as needed rather than
        extending large page objects for every page that shares a component.
      </KBP>

      <KBH3>Screenplay pattern</KBH3>

      <KBP>
        The screenplay pattern is a more structured alternative to the page object model that
        models actors, tasks and interactions rather than pages. An actor has abilities (such
        as the ability to browse the web), performs tasks (composed sequences of interactions)
        and asks questions (assertions about the current state). The screenplay pattern tends
        to produce more reusable, compositional test code but requires more upfront design and
        is less immediately intuitive than the page object model for teams new to automation.
      </KBP>

      <KBH3>App actions</KBH3>

      <KBP>
        Some frameworks allow tests to bypass the UI for certain setup steps, invoking
        application code or API endpoints directly to create state rather than navigating
        through the interface to create it. This approach, sometimes called app actions, keeps
        tests fast and stable by reserving UI interactions for the specific behaviour being
        tested rather than using them for setup.
      </KBP>

      <KBAside label="Page objects vs utility functions" variant="gold">
        For small or early-stage test suites, a set of utility functions may be sufficient
        without the overhead of a full page object model. The page object model adds most value
        when the test suite is large enough that duplicated selector logic is a maintenance
        problem. Introduce the pattern when the pain is real, not preemptively.
      </KBAside>

      <KBH2 id="when-patterns-help">When patterns help</KBH2>

      <KBP>
        Design patterns for automation, like design patterns in production code, are solutions
        to recurring problems rather than requirements to apply in all circumstances. The page
        object model solves the problem of duplicated selector logic and test code that is
        difficult to read. If a test suite is small enough that duplication is not yet a
        problem, applying the pattern may add complexity without adding value.
      </KBP>

      <KBNote variant="blue">
        Whichever pattern a team adopts, consistency matters more than the specific choice.
        A test suite where half the tests use page objects and half embed selectors directly
        is harder to navigate and maintain than one that consistently applies either approach.
        Agree a pattern early, document it and apply it uniformly.
      </KBNote>
    </>
  )
}

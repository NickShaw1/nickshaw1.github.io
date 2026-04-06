import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function BddTools() {
  return (
    <>
      <KBP>
        Behaviour-driven development (BDD) is a practice in which acceptance criteria are
        expressed in a structured natural language format that both technical and non-technical
        team members can read and contribute to. Cucumber is the most widely adopted tool
        for implementing BDD, providing a framework for writing feature files in the Gherkin
        language and connecting those files to executable test code through step definitions.
        Its implementations span most major languages, making it applicable across a wide
        range of team environments.
      </KBP>

      <KBH2 id="gherkin-and-feature-files">Gherkin and feature files</KBH2>

      <KBP>
        <a href="https://cucumber.io" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">Cucumber</a> uses
        the Gherkin syntax to describe application behaviour in terms of scenarios. Each
        scenario follows a Given/When/Then structure: the Given steps establish preconditions,
        the When steps describe an action or event and the Then steps assert on the expected
        outcome. Scenarios are grouped into feature files, plain text documents with a
        <code>.feature</code> extension that describe a specific area of the application's
        behaviour.
      </KBP>

      <KBP>
        Feature files serve two purposes. They are executable: Cucumber parses them and
        runs the associated step definitions. They are also readable by anyone on the team,
        regardless of technical background, which makes them useful as shared documentation
        of how the system is supposed to behave. When a scenario fails, the failure appears
        against a named scenario in plain language, which helps developers, testers and
        product managers understand what broke without reading code.
      </KBP>

      <KBP>
        The <code>Scenario Outline</code> keyword allows the same scenario to be run against
        multiple sets of input data defined in an <code>Examples</code> table. This is
        Cucumber's equivalent of parameterised testing and is particularly useful for
        validating boundary conditions and multiple valid or invalid input combinations
        without duplicating the scenario structure.
      </KBP>

      <KBH2 id="step-definitions">Step definitions</KBH2>

      <KBP>
        Step definitions are the code that connects Gherkin steps to test logic. Each
        definition matches one or more step patterns using a regular expression or Cucumber
        expression, and contains the implementation: setting up a browser session, calling
        an API, interacting with a database or asserting on a response. Step definitions
        are reusable across scenarios: a Given step that authenticates a user can be shared
        by every scenario that requires an authenticated session.
      </KBP>

      <KBP>
        The quality of step definitions determines whether a Cucumber suite is maintainable.
        Steps that are too specific duplicate logic unnecessarily and are brittle in the
        face of UI changes. Steps that are too abstract hide important behaviour and make
        failing tests difficult to diagnose. The target is steps at the level of user intent:
        "when the user submits the registration form" rather than "when the user clicks the
        button with id submit-btn".
      </KBP>

      <KBH2 id="tooling-across-languages">Tooling across languages</KBH2>

      <KBP>
        Cucumber's Gherkin format is language-agnostic, and implementations exist for all
        major languages. Cucumber-JVM covers Java, Kotlin and Scala and integrates with
        JUnit and TestNG. Cucumber-JS covers JavaScript and TypeScript and integrates with
        the browsers through Playwright, Selenium or WebdriverIO. Behave provides Gherkin
        support for Python. SpecFlow is the .NET implementation, tightly integrated with
        Visual Studio and the NUnit and xUnit test frameworks.
      </KBP>

      <KBP>
        All implementations share the same Gherkin feature file format, which means feature
        files written for one implementation can be read and understood by teams using
        another. The step definition code is language-specific and does not transfer, but
        the shared vocabulary created by common feature files can be valuable in organisations
        where multiple services with different technology stacks are tested against the same
        acceptance criteria.
      </KBP>

      <KBH2 id="bdd-in-practice">BDD in practice</KBH2>

      <KBP>
        The intended workflow for BDD is collaborative: product managers, developers and
        testers write feature files together before implementation begins, using the scenarios
        as a shared definition of done. In practice, feature files are often written by
        testers after the fact, either to document existing behaviour or to automate manual
        test scripts. The tool supports both approaches, but only the collaborative approach
        delivers BDD's core proposition: a shared language that reduces ambiguity in
        requirements before development starts.
      </KBP>

      <KBAside label="The value of Gherkin as shared language" variant="purple">
        The most significant benefit Cucumber offers is not the automation but the discipline
        of expressing acceptance criteria in a format that non-developers can review and
        challenge. A product manager reading a feature file can identify missing scenarios,
        incorrect assumptions or misunderstood requirements before a line of implementation
        code is written. This shifts defect discovery earlier in the process, where the
        cost of correction is lowest.
      </KBAside>

      <KBNote variant="blue">
        A common BDD antipattern is writing scenarios that describe implementation rather
        than behaviour. Steps that reference specific UI elements, database tables, CSS
        class names or API field names couple the feature files to implementation details
        and make them fragile. Scenarios should describe what the system does for the user,
        not how it does it. When a scenario requires UI-specific wording to make sense, it
        is usually a signal that it belongs in a lower-level technical test rather than a
        Gherkin feature file.
      </KBNote>
    </>
  )
}

import KBNote from '../../../components/kb/KBNote'
import KBAside from '../../../components/kb/KBAside'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function TestingPhilosophies() {
  return (
    <>
      <KBP>
        A testing technique describes what you do. A philosophy describes when, why and from whose
        perspective quality is approached. The three philosophies covered here are not mutually
        exclusive and most teams apply elements of all of them, selecting emphasis based on
        context, risk and how the development process is structured.
      </KBP>

      <KBH2 id="shift-left">Shift-left</KBH2>

      <KBP>
        Shift-left is the practice of involving quality activities earlier in the development
        process than they would traditionally occur. The name refers to moving testing toward the
        left of a timeline that runs from requirements through to production. The previous articles
        in this section introduced the term. What they did not cover is what shift-left actually
        requires in practice.
      </KBP>

      <KBP>
        The most common misapplication of shift-left is treating it as a directive for developers
        to write more unit tests. That is one part of it. The fuller version involves testers
        joining conversations during requirements gathering, reviewing acceptance criteria before
        stories are picked up, identifying ambiguity in specifications and raising testability
        concerns during design. By the time code is being written, the shape of the tests should
        largely be known.
      </KBP>

      <KBAside label="What shifts, and what does not" variant="gold">
        Shift-left moves testing activity earlier. It does not move testing responsibility
        exclusively onto developers. The tester's role upstream is analytical and interrogative:
        finding gaps in requirements, questioning assumptions and defining what done actually means
        before work begins rather than after it is delivered.
      </KBAside>

      <KBP>
        The organisational implication is significant. Shift-left requires testers to have access
        to product managers, designers and developers early in the cycle. Teams structured so that
        testers only receive finished work cannot shift left in any meaningful sense, regardless of
        how many automated tests they write.
      </KBP>

      <KBH2 id="risk-based-testing">Risk-based testing</KBH2>

      <KBP>
        Not all parts of a system carry equal risk. A payment processing flow, an authentication
        mechanism and a data export function carry fundamentally different consequences if they
        fail. Risk-based testing is the practice of allocating test effort in proportion to those
        consequences rather than distributing it evenly across the codebase.
      </KBP>

      <KBP>
        Risk is assessed along two dimensions: the probability that a failure will occur, and the
        impact if it does. Areas of high probability and high impact receive the deepest test
        coverage. Areas of low probability and low impact may receive minimal coverage or be
        explicitly accepted as untested. The important distinction is that the decision is
        deliberate rather than accidental.
      </KBP>

      <KBP>
        In practice, risk analysis draws on domain knowledge, historical defect data, complexity
        metrics and input from subject matter experts. A tester working on a financial system will
        weight calculation logic differently from a tester working on a content management tool.
        The technique is the same; the inputs differ.
      </KBP>

      <KBNote variant="warning">
        Risk-based testing is only as reliable as the analysis behind it. Misjudging where risk
        sits leads to over-testing low-consequence areas while leaving high-consequence areas
        under-covered. Risk assessment should be revisited as the system evolves, not treated as a
        one-time exercise at the start of a project.
      </KBNote>

      <KBH2 id="tdd-bdd-and-atdd">TDD, BDD and ATDD</KBH2>

      <KBP>
        These three practices share a common principle: defining expected behaviour before writing
        the code that produces it. They differ in who is involved, at what level of abstraction
        and what the primary benefit is intended to be.
      </KBP>

      <KBP>
        Test-driven development is primarily a developer practice, applied most often at the unit level.
        The cycle is short: write a failing test, write the minimum code to make it pass, then
        refactor without changing behaviour. Repeat. The design benefit of TDD is its primary
        value. Code written to satisfy a test first tends to be more modular, because tightly
        coupled code is difficult to test in isolation. Coverage is a byproduct of good TDD, not
        the goal.
      </KBP>

      <KBP>
        Behaviour-driven development extends the test-first principle into the language of product
        requirements. Tests are expressed in structured natural language, typically following a
        Given-When-Then format: given a particular context, when an action occurs, then a specific
        outcome is expected. This format is readable by non-technical stakeholders, which makes it
        a tool for collaboration as much as verification. BDD works best when product owners and
        testers contribute to writing the scenarios, not just developers.
      </KBP>

      <KBP>
        Acceptance test-driven development operates at the highest level of abstraction. Acceptance
        criteria are agreed between developers, testers and business stakeholders before any
        implementation begins. Those criteria become the tests. Done well, ATDD eliminates the
        defects that arise from the gap between what was specified and what was built, because the
        specification and the test are the same document.
      </KBP>

      <KBAside label="How they relate" variant="blue">
        TDD, BDD and ATDD are often conflated. TDD is a development technique. BDD is a
        collaboration and communication technique that borrows TDD's test-first structure. ATDD is
        a requirements technique that uses acceptance tests as the definition of done. All three
        can coexist within the same team and the same codebase, operating at different levels of
        the system.
      </KBAside>
    </>
  )
}

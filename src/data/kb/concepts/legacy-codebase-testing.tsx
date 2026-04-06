import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function LegacyCodebaseTesting() {
  return (
    <>
      <KBP>
        Most working software is legacy software. Code that has been in production for years,
        been modified by dozens of developers and accumulated years of undocumented decisions is
        the normal environment for a working engineer, not the exception. Introducing meaningful
        test coverage to a codebase like this is a different challenge from building a test suite
        greenfield. The code was not written with testability in mind, dependencies are often
        deeply entangled, and the business logic may not be fully understood by anyone currently
        on the team.
      </KBP>

      <KBH2 id="the-challenge">The challenge</KBH2>

      <KBP>
        Legacy code resists testing for structural reasons. Functions that do too much, global
        state, direct dependencies on databases or external services and classes with no clear
        interfaces all make it difficult to isolate a unit under test. Attempting to write unit
        tests against tightly coupled legacy code often means spending most of the effort on
        mocking infrastructure rather than testing behaviour, and the resulting tests tend to be
        fragile and difficult to understand.
      </KBP>

      <KBP>
        The other challenge is confidence. When you do not fully understand what a piece of code
        is supposed to do, it is difficult to write meaningful assertions. A test that passes is
        not evidence that the code is correct; it may simply be evidence that the test was written
        to match the current behaviour, whether or not that behaviour is right.
      </KBP>

      <KBH2 id="where-to-start">Where to start</KBH2>

      <KBP>
        Start where the risk is highest, not where the code is easiest to test. The areas that
        matter most for coverage are the ones that change frequently, the ones that handle core
        business logic and the ones where failures have the greatest user impact. Low-risk,
        stable code that rarely changes is a poor use of the effort required to retrofit tests
        to difficult legacy code.
      </KBP>

      <KBP>
        Before writing a single test, spend time understanding the code. Read the git history for
        the files you are targeting. Which areas change most often? Which have had the most bug
        fixes? Where do incidents tend to originate? This exercise provides the prioritisation
        signal that coverage metrics cannot: not just where the code is, but where the risk is.
      </KBP>

      <KBH2 id="characterisation-tests">Characterisation tests</KBH2>

      <KBP>
        A characterisation test, a term coined by Michael Feathers in <em>Working Effectively
        with Legacy Code</em>, is a test that documents the current behaviour of a piece of code
        without making a judgement about whether that behaviour is correct. The purpose is not to
        verify that the code does the right thing, but to create a safety net that detects any
        change in behaviour before you begin modifying the code.
      </KBP>

      <KBP>
        The process is straightforward: run the code with a given input and observe the output,
        then write a test that asserts on that output. If you are uncertain whether the output
        is correct, note that uncertainty in the test or in comments alongside it. The safety net
        is useful even when the tested behaviour is wrong, because it prevents you from
        accidentally changing behaviour that other parts of the system may depend on while you
        are focused elsewhere.
      </KBP>

      <KBAside label="Working Effectively with Legacy Code" variant="gold">
        Michael Feathers' book remains the most practical guide to working with untestable code.
        Its core concept is the legacy code change algorithm: identify the change point, find test
        points, break dependencies, write tests, then make the change. The book's catalogue of
        dependency-breaking techniques, including extract and override, parameterise constructor
        and extract interface, provides a vocabulary and a set of safe refactoring moves for
        making code testable without changing its behaviour.
      </KBAside>

      <KBH2 id="making-code-testable">Making code testable</KBH2>

      <KBP>
        Introducing tests to legacy code often requires modest structural changes to make the
        code testable at all. These refactors should be small, safe and focused solely on
        improving testability rather than improving the code in a broader sense. Common moves
        include extracting a hard-coded dependency into a parameter so it can be replaced in
        tests, pulling business logic out of a controller or handler into a function that can
        be tested in isolation and introducing an interface over a concrete class so the
        dependency can be swapped for a test double.
      </KBP>

      <KBP>
        The discipline here is to make only the changes necessary to write the next test, and
        no more. It is tempting, when working with messy code, to refactor broadly while the
        file is open. Broad refactors without test coverage are how new bugs are introduced to
        systems that were at least stable before you touched them.
      </KBP>

      <KBH2 id="avoiding-the-rewrite-trap">Avoiding the rewrite trap</KBH2>

      <KBP>
        A common response to difficult legacy code is to propose a rewrite. Rewrites are
        appealing because they promise a clean slate, but they are consistently more expensive,
        slower and riskier than the incremental approach. The existing code, however messy,
        encodes years of learned business logic, edge cases and hard-won fixes. A rewrite starts
        from scratch without that knowledge, and the team typically spends its first year
        rediscovering problems that the old code already knew about.
      </KBP>

      <KBP>
        The incremental approach (characterise, make testable, refactor safely, repeat) is
        slower to show results but far more likely to succeed. Over time, the areas that receive
        the most attention become progressively more testable and more clearly understood, and
        the overall quality of the codebase improves without the risks of a big-bang replacement.
      </KBP>

      <KBNote variant="blue">
        Progress on a legacy codebase is measured in reduced incident rates, shorter debugging
        sessions and increased developer confidence, not in coverage percentage. Coverage is easy
        to game and poor characterisation tests can push it upward without providing meaningful
        protection. Track the outcomes that matter: how often does this area cause production
        issues, and is that trend improving?
      </KBNote>
    </>
  )
}

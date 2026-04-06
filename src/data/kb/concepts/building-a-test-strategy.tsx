import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function BuildingATestStrategy() {
  return (
    <>
      <KBP>
        A test strategy is a set of deliberate decisions about what to test, how to test it,
        who is responsible and how the results will be used. It is not a document for its own
        sake, and it is not a coverage target. A strategy that exists only on paper, or one that
        was written at the start of a project and never revisited, provides very little practical
        value. An effective strategy shapes day-to-day decisions about where effort is directed
        and why.
      </KBP>

      <KBH2 id="what-a-strategy-is-not">What a strategy is not</KBH2>

      <KBP>
        A test strategy is not a test plan. A plan describes the specific tests that will be run
        for a given release or feature. A strategy operates at a higher level, describing the
        principles and priorities that inform all planning decisions over time. Confusing the two
        leads to strategies that are too prescriptive and plans that are too vague.
      </KBP>

      <KBP>
        A strategy is also not a framework selection. Choosing between Playwright and Selenium,
        or between Jest and Vitest, is a tooling decision. Tooling follows strategy; strategy
        does not follow tooling. A team that picks a framework before deciding what problems
        it is trying to solve will find the framework constrains their options before they have
        fully understood what they need.
      </KBP>

      <KBH2 id="understanding-risk">Understanding risk</KBH2>

      <KBP>
        Risk is the foundation of any useful test strategy. The goal of testing is to manage the
        risk that software will behave incorrectly in ways that matter. Not all incorrect behaviour
        matters equally: a cosmetic misalignment in a rarely visited settings screen carries very
        different risk from an incorrect total in a payment flow. A strategy that applies the same
        testing effort uniformly across both is misallocating resources.
      </KBP>

      <KBP>
        Assessing risk requires input from outside the test team. Product managers know which
        features are business-critical. Developers know which parts of the codebase are fragile or
        frequently changed. Operations teams know which failures cause the most production incidents.
        A strategy built on this combined knowledge will target effort at the areas where failures
        have real consequences, rather than the areas that happen to be easy to cover.
      </KBP>

      <KBH2 id="choosing-the-right-coverage">Choosing the right coverage</KBH2>

      <KBP>
        Different test types serve different purposes and carry different costs. Unit tests are
        fast and cheap to write and run, but they only verify small units in isolation and can
        miss integration failures. End-to-end tests provide the highest confidence that the
        system works as a whole, but they are slow, expensive to maintain and prone to flakiness.
        A good strategy chooses the right type of test for each risk, rather than defaulting to
        one approach for everything.
      </KBP>

      <KBP>
        The testing pyramid, trophy and honeycomb models each represent a different view of how
        to distribute testing effort. The right distribution depends on the architecture of the
        system, the nature of its risks and the maturity of the team. A microservices product with
        many independently deployed services has different coverage priorities than a monolithic
        web application, and a team new to automation has different constraints than one with years
        of investment in its test infrastructure.
      </KBP>

      <KBAside label="Coverage targets are a proxy, not a goal" variant="purple">
        A target of, say, 80% line coverage sounds concrete, but it measures the proportion of
        code that some test has exercised, not the proportion of meaningful behaviour that is
        actually protected. Teams that optimise for coverage targets tend to produce tests that
        exercise code without asserting on outcomes. A more useful framing is: which failure modes
        would be unacceptable in production, and do we have tests that would catch them before
        deployment?
      </KBAside>

      <KBH2 id="tooling-and-infrastructure">Tooling and infrastructure</KBH2>

      <KBP>
        Tooling decisions should be conservative. Every additional framework, test runner or
        infrastructure dependency adds complexity to the test environment and creates a surface
        area for maintenance. A team running three different test frameworks because each was added
        for a specific purpose without considering the overall landscape will spend a meaningful
        fraction of its time on tool-related problems rather than quality problems.
      </KBP>

      <KBP>
        Prefer tools that are well-supported in your language and framework ecosystem, that have
        active communities and that your team already has some familiarity with. The best tool is
        often the one that requires the least context-switching, not the one with the most features.
        Standardise early and deviate only when there is a specific, justified need that the
        standard toolset cannot meet.
      </KBP>

      <KBH2 id="making-it-stick">Making it stick</KBH2>

      <KBP>
        A strategy that is not followed is not a strategy. The practical question is how to
        make the strategy the path of least resistance for the team. Tests should be easy to
        write: if setting up a test environment requires half a day of configuration, fewer tests
        will be written. Test runs should be fast enough to fit in a development loop. Failures
        should be informative and actionable rather than requiring deep investigation before their
        meaning is clear.
      </KBP>

      <KBP>
        Strategy also needs to evolve. The risks, architecture and team composition of a product
        change over time, and a strategy written at launch may be actively misleading two years
        later. Regular retrospectives on what the test suite is and is not catching, combined with
        deliberate decisions about where to invest or disinvest in coverage, keep the strategy
        grounded in current reality rather than historical assumptions.
      </KBP>

      <KBNote variant="green">
        The most durable test strategies are written collaboratively with developers, not handed
        to them. When developers have input into where tests are written and what tools are used,
        they are more likely to maintain those tests and to write new ones in the same style. A
        strategy imposed from outside the team tends to generate compliance at best and resentment
        at worst, neither of which produces a healthy test suite.
      </KBNote>
    </>
  )
}

import KBBanner from '../../../components/kb/KBBanner'
import KBAside from '../../../components/kb/KBAside'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function HistoryOfSoftwareTesting() {
  return (
    <>
      <KBP>
        Software testing did not begin with a manifesto or a methodology. It began with engineers
        staring at machines that did not behave as expected, trying to work out why. The discipline
        has evolved considerably since then, but that fundamental activity, comparing expected
        behaviour against actual behaviour and investigating the difference, has remained constant
        throughout.
      </KBP>

      <KBH2 id="the-debugging-era">The debugging era</KBH2>

      <KBP>
        In the 1940s and 1950s, software and hardware were so tightly coupled that it was difficult
        to separate a program fault from a machine fault. Early programmers tested by running
        programs and observing results, often using paper tape and plugboards. The term "bug" entered
        popular use after a moth was found lodged in a relay of the Harvard Mark II computer in 1947,
        though the word had been used informally in engineering for decades before that.
      </KBP>

      <KBP>
        The log entry was made by operators working under Grace Hopper at Harvard and signed by
        multiple members of the team. Hopper, one of the most significant figures in early
        computing, helped bring the terminology into wider circulation across the industry.
      </KBP>

      <KBP>
        During this period, testing and debugging were not meaningfully distinguished. Writing a
        program and verifying it worked were the same activity, performed by the same person. There
        was no separate testing function, no structured process and no expectation that verification
        required dedicated effort.
      </KBP>

      <KBH2 id="the-software-crisis">The software crisis</KBH2>

      <KBP>
        By the mid-1960s, as software systems grew more complex, the gap between what programs were
        supposed to do and what they actually did became a serious commercial and safety concern. At
        the NATO Software Engineering Conference in 1968, researchers and practitioners described
        what they called the "software crisis": projects were routinely delivered late, over budget
        and full of defects. Some failed entirely.
      </KBP>

      <KBBanner>
        The 1968 NATO conference gave the field its name. "Software engineering" was coined
        deliberately to suggest that building software should be disciplined, systematic and
        measurable, in the same way that other engineering disciplines were.
      </KBBanner>

      <KBP>
        This period forced a reckoning with the idea that testing had to become something more
        deliberate. Code review, structured walkthroughs and formal inspections began to emerge as
        recognised practices, separate from the act of writing the code itself.
      </KBP>

      <KBH2 id="testing-becomes-a-discipline">Testing becomes a discipline</KBH2>

      <KBP>
        The 1970s produced the intellectual foundations that still underpin software testing today.
        Glenford Myers published <em>The Art of Software Testing</em> in 1979, one of the first
        books to treat testing as a discipline in its own right. Myers introduced the principle that
        testing is the process of executing a program with the intent of finding errors, not
        confirming that it works. That reframing was significant. It meant testing required a
        genuinely adversarial mindset, not optimism.
      </KBP>

      <KBP>
        Myers also formalised the concepts of black-box and white-box testing as distinct
        approaches. The ideas predated his book but his treatment of them gave practitioners a
        shared vocabulary that remains fundamental to how test design is discussed today.
      </KBP>

      <KBP>
        Through the 1980s, dedicated QA departments began to appear in larger organisations.
        Testing was increasingly recognised as a separate function with its own career path,
        tooling and body of knowledge. The V-model of development, which mapped testing activities
        directly to development phases, gave teams a structured way to think about when and how
        testing should happen.
      </KBP>

      <KBH2 id="commercial-software-and-automation">Commercial software and automation</KBH2>

      <KBP>
        The 1990s brought mass-market software and, with it, a scale of user diversity that manual
        testing alone could not address. Graphical interfaces, multiple operating systems and
        millions of users with unpredictable behaviour created an enormous combinatorial testing
        problem. Commercial test automation tools began to emerge: Mercury's WinRunner appeared in
        the early 1990s, followed by tools that would eventually become industry standards across
        web and desktop testing.
      </KBP>

      <KBP>
        Automation promised efficiency but introduced new problems. Record-and-playback tools
        produced brittle scripts that broke with every interface change. Teams discovered that
        automation required the same care in design and maintenance as production code, a lesson
        many had to learn more than once.
      </KBP>

      <KBH2 id="agile-and-the-testing-reset">Agile and the testing reset</KBH2>

      <KBP>
        The Agile Manifesto in 2001 disrupted the assumptions testing had been built on. Waterfall
        development had positioned testing at the end of a long cycle. Agile compressed that cycle
        to weeks or days. A dedicated testing phase at the end of a two-week sprint was not viable.
        Testing had to move earlier, become continuous and be owned more broadly across the team.
      </KBP>

      <KBAside label="TDD" variant="gold">
        Test-driven development, popularised by Kent Beck through Extreme Programming, inverted the
        traditional order entirely. Writing tests before code forced developers to think about
        expected behaviour as the first design act, not the last verification one.
      </KBAside>

      <KBP>
        The same decade saw the rise of open-source testing frameworks. JUnit, Selenium and their
        successors made automated testing accessible without commercial tooling budgets. Testing
        became a practice developers could own directly, which shifted expectations around where
        quality responsibility sat in a team.
      </KBP>

      <KBH2 id="devops-and-continuous-testing">DevOps and continuous testing</KBH2>

      <KBP>
        DevOps, which emerged as a movement in the late 2000s and matured through the 2010s,
        extended the integration of testing further still. Continuous integration meant tests ran
        on every commit. Continuous delivery pipelines made a passing test suite the gate between
        code and production. Testing was no longer a phase or even a function; it became
        infrastructure.
      </KBP>

      <KBP>
        Shift-left testing, the practice of moving quality activities earlier in the development
        process, became standard vocabulary. Shift-right testing, which extended quality work into
        production through monitoring, canary releases and chaos engineering, completed the
        picture. For the first time, teams had a coherent model of testing that spanned the entire
        software lifecycle.
      </KBP>

      <KBH2 id="ai-and-the-next-shift">AI and the next shift</KBH2>

      <KBP>
        The 2020s have brought AI into the testing workflow in ways that are still being understood.
        Large language models can generate test cases, suggest edge cases from requirements, produce
        synthetic test data and summarise defect patterns across large test suites. Tools like
        GitHub Copilot, Testim and newer AI-native platforms have made these capabilities
        accessible to teams without specialist machine learning knowledge.
      </KBP>

      <KBBanner>
        AI changes what is cheap to produce. It does not change what is important to test.
        The judgements about risk, coverage and what constitutes acceptable behaviour still require
        human understanding of the system and its users.
      </KBBanner>

      <KBP>
        Visual testing tools have adopted AI to detect unintended UI changes without brittle pixel
        comparisons. Self-healing automation frameworks can identify when a selector has changed
        and update it without manual intervention. These are genuine improvements to the maintenance
        burden that has plagued automated test suites since the record-and-playback era.
      </KBP>

      <KBP>
        AI-generated tests are only as good as the context they are given. A model prompted with
        a feature description will produce plausible-looking tests that may miss the unstated
        assumptions and edge cases a human tester would think to probe. Generated coverage is not
        the same as considered coverage.
      </KBP>

      <KBP>
        The more fundamental question is whether AI changes the role of the tester. The evidence so
        far suggests it changes what is cheap to produce, not what requires judgement. Deciding what
        to test, how much confidence is enough and where the real risks lie in a system are
        questions that depend on understanding users and context, not pattern-matching against a
        training corpus. That is where the tester's value continues to sit.
      </KBP>
    </>
  )
}

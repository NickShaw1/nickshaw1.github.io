import KBBanner from '../../../components/kb/KBBanner'
import KBAside from '../../../components/kb/KBAside'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function TestSuiteManagement() {
  return (
    <>
      <KBP>
        A test suite is a collection of test cases organised to be executed together for a defined
        purpose. Suites range from small, focused sets covering a single feature to comprehensive
        regression libraries covering an entire product. Managing a suite well means keeping it
        organised, accurate and appropriately scoped so that the time spent executing it returns
        meaningful results.
      </KBP>

      <KBH2 id="organising-suites">Organising suites</KBH2>

      <KBP>
        Test suites can be organised by feature area, by user journey, by risk level or by
        execution frequency. None of these structures is universally correct; the right
        organisation depends on how the suite will be used. A suite run in its entirety before
        every release is organised differently from one run selectively based on what has changed.
      </KBP>

      <KBP>
        Feature-based organisation groups cases by the part of the product they cover. This makes
        it easy to run all tests for a specific area after a change and to identify which areas
        are well covered and which are not. Journey-based organisation groups cases by the
        end-to-end paths that users take through the product, which makes it easier to verify
        complete workflows but harder to isolate coverage for individual components.
      </KBP>

      <KBAside label="Priority tiers" variant="blue">
        Many teams organise suites into priority tiers: a smoke suite of critical-path cases that
        can be executed in minutes to verify basic stability, a core regression suite covering the
        most important functionality and a full regression suite covering everything. Running the
        smoke suite after every build and the full suite before a release is a practical way to
        balance coverage against execution time.
      </KBAside>

      <KBH2 id="suite-health-and-decay">Suite health and decay</KBH2>

      <KBBanner>
        A suite that grows without being reviewed becomes progressively harder to trust. Obsolete
        or inaccurate cases consume execution time and produce noise in results, and over time
        they erode confidence in the suite's value. Keeping a suite focused and current is as
        important as keeping it comprehensive.
      </KBBanner>

      <KBP>
        Suite health degrades for several predictable reasons. Features change and the cases
        covering them are not updated. New cases are added for new features but old cases for
        deprecated features are not removed. Cases written at a high level of specificity become
        invalid as the interface evolves. Cases are duplicated across different suites without a
        single canonical version being maintained.
      </KBP>

      <KBP>
        A measurable indicator of suite health is the flakiness rate: cases that sometimes pass
        and sometimes fail without the underlying behaviour having changed. Flaky cases are worse
        than absent cases. They produce results that cannot be trusted, they require investigation
        time and they cause teams to start ignoring failures, which defeats the purpose of running
        the suite.
      </KBP>

      <KBH2 id="review-and-pruning">Review and pruning</KBH2>

      <KBP>
        Suite review should be a scheduled activity, not something that happens when the suite
        becomes visibly unmanageable. A review at the end of each major release cycle is a
        practical cadence for most teams. The review assesses three questions: are there cases
        that should be removed because they cover functionality that no longer exists or is now
        fully automated; are there cases that need to be updated because the expected behaviour
        has changed; and are there gaps where new coverage should be added?
      </KBP>

      <KBP>
        Pruning decisions should be logged. Removing a case is a decision that may need to be
        revisited, and a record of why it was removed is more useful than a blank history. A case
        removed because its feature was deprecated is different from one removed because it was
        considered redundant with another case, and treating both identically in future reviews
        leads to poorer decisions.
      </KBP>

      <KBH3>Ownership</KBH3>

      <KBP>
        Suites without owners decay faster than suites with them. When everyone is responsible for
        suite quality, no one is. Assigning ownership of specific suites or feature areas to named
        testers creates accountability and a point of contact when questions arise about what a
        suite covers or why a case is written the way it is.
      </KBP>
    </>
  )
}

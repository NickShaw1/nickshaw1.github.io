import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function VisualRegressionTesting() {
  return (
    <>
      <KBP>
        Visual regression testing detects unintended changes to the visual appearance of an
        application by comparing screenshots taken during a test run against stored baseline
        images. When pixels differ between the current run and the baseline, the test flags the
        change for review. This approach catches a category of defect that functional tests cannot
        detect: layout shifts, colour changes, font rendering issues and component overlap.
        Functional tests verify behaviour rather than appearance, so these visual problems pass
        straight through them.
      </KBP>

      <KBH2 id="what-visual-regression-covers">What visual regression covers</KBH2>

      <KBP>
        Visual regression testing is concerned with how things look rather than what they do.
        A button that functions correctly but appears in the wrong position, a text field that
        accepts input but has a broken border, a modal that opens but obscures content behind
        it: these are the kinds of defect that visual regression testing finds. They are often
        introduced by CSS changes with unintended side effects, by library upgrades that alter
        default styles or by layout changes that break in viewports not tested manually.
      </KBP>

      <KBP>
        Visual regression is particularly valuable in design systems and component libraries,
        where a change to a shared component can affect every consumer of that component across
        the application. Catching these changes before they reach production is difficult without
        automated visual comparison.
      </KBP>

      <KBH2 id="how-it-works">How it works</KBH2>

      <KBP>
        The process involves two phases. In the baseline phase, the test suite captures
        screenshots of pages or components in a known-good state and stores them as reference
        images. In the comparison phase, the same screenshots are taken during a test run and
        compared pixel by pixel against the baseline. Any pixel difference above a configured
        threshold is flagged as a visual change.
      </KBP>

      <KBP>
        Most visual regression tools produce a diff image that highlights the changed pixels,
        making it straightforward to see at a glance what has changed. The test does not
        automatically fail for every pixel difference because some variation is expected,
        particularly in rendering environments that use anti-aliasing or font hinting. A
        configurable threshold determines how much difference is tolerated before a change is
        flagged.
      </KBP>

      <KBH3>Cloud versus local rendering</KBH3>

      <KBP>
        Screenshots taken in different environments may differ for reasons unrelated to the
        application: different operating systems render fonts differently, different GPU drivers
        produce slightly different anti-aliasing and different browser versions can produce
        different output for the same CSS. Running visual regression tests in a consistent,
        controlled environment, such as a dedicated CI runner or a cloud visual testing service,
        eliminates this source of false positives.
      </KBP>

      <KBH2 id="managing-baselines">Managing baselines</KBH2>

      <KBP>
        Baseline images must be updated whenever an intentional visual change is made. If a
        designer changes the background colour of a button, the baseline for every screenshot
        that includes that button must be updated to reflect the new expected appearance.
        Failure to update baselines causes the tests to flag genuine changes as regressions,
        which trains the team to approve diffs without looking at them carefully.
      </KBP>

      <KBP>
        Baselines should be stored in version control alongside the code so that they travel
        with the branch, are reviewed as part of pull requests and are traceable to the changes
        that produced them. Storing baselines outside version control creates synchronisation
        problems and makes it difficult to understand why a baseline looks the way it does.
      </KBP>

      <KBAside label="Component-level testing" variant="gold">
        Testing at the page level produces large screenshots that are sensitive to changes in
        any part of the page. Testing at the component level, using a tool such as Storybook
        with a visual regression plugin, produces smaller, more focused screenshots that are
        easier to review and that fail for more specific, actionable reasons.
      </KBAside>

      <KBH2 id="limitations">Limitations</KBH2>

      <KBP>
        Visual regression testing generates noise. Any change to the visual appearance of the
        application, whether intentional or not, produces a diff that requires human review.
        In a rapidly changing codebase, the volume of changes to approve can become burdensome
        and the team may begin approving diffs without reviewing them, which defeats the purpose
        of the tests.
      </KBP>

      <KBNote variant="blue">
        Visual regression is a complement to functional testing, not a substitute for it. A
        pixel-perfect screenshot of a broken form field is not a passing test. Use visual
        regression for what it does well (catching unintended visual changes) and rely on
        functional tests to verify that interactions produce correct outcomes.
      </KBNote>
    </>
  )
}

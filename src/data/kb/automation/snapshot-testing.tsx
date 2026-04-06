import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function SnapshotTesting() {
  return (
    <>
      <KBP>
        Snapshot testing records the rendered output of a component or function at a point in
        time and fails if that output changes in subsequent test runs. The first time a snapshot
        test runs, it serialises the output and saves it as a reference file. On subsequent
        runs, it serialises the output again and compares it to the stored snapshot. Any
        difference causes the test to fail, prompting a developer to review whether the change
        was intentional and update the snapshot if it was.
      </KBP>

      <KBH2 id="what-snapshot-testing-is">What snapshot testing is</KBH2>

      <KBP>
        Snapshot tests are most commonly used with UI components, where the snapshot captures
        the rendered HTML or component tree. A snapshot of a button component records its
        structure, class names, attributes and text content. If a future code change alters
        any of these, the snapshot comparison fails and the developer is alerted.
      </KBP>

      <KBP>
        Snapshot testing can also be applied to non-UI outputs: the shape of an API response,
        the output of a serialisation function or the structure of a generated configuration
        file. Any deterministic output that can be serialised to text is a candidate for a
        snapshot test.
      </KBP>

      <KBH2 id="when-snapshots-help">When snapshots help</KBH2>

      <KBP>
        Snapshots are useful as a lightweight safety net for outputs that are complex and
        difficult to assert against explicitly. A component that renders a complex tree of
        elements with many attributes would require a significant number of individual
        assertions to verify exhaustively. A snapshot test captures all of that structure
        in a single test and detects any change to any part of it.
      </KBP>

      <KBP>
        They are also useful during refactoring. When restructuring implementation code without
        intending to change visible output, snapshot tests provide a quick confirmation that
        the rendered result is unchanged. If a snapshot fails during a refactor, it is an
        immediate signal that the change affected the output in some way that requires review.
      </KBP>

      <KBAside label="Inline snapshots" variant="gold">
        Some testing frameworks support inline snapshots, where the serialised output is stored
        directly in the test file rather than in a separate snapshot file. This makes the
        expected value visible alongside the test code, which aids reviewability. Inline
        snapshots work well for small outputs. For large or frequently changing outputs, a
        separate snapshot file is easier to manage.
      </KBAside>

      <KBH2 id="the-staleness-problem">The staleness problem</KBH2>

      <KBP>
        The most significant weakness of snapshot testing is the ease with which snapshots
        become stale. When a snapshot test fails, the developer must decide whether the change
        is intentional or a regression. If the change is intentional, the developer updates
        the snapshot. Over time, in a codebase where snapshots are updated routinely, developers
        begin updating them reflexively rather than reviewing them carefully.
      </KBP>

      <KBP>
        A snapshot that is always updated when it fails provides no safety net. It documents
        what the output was, but it does not enforce what the output should be. The discipline
        of reviewing snapshot diffs before updating them is essential to maintaining their
        value, and it is a discipline that requires active attention.
      </KBP>

      <KBNote variant="blue">
        Large snapshots are a warning sign. A snapshot that is hundreds of lines long is
        difficult to review meaningfully when it changes. Where possible, test components at
        a granular level, keeping snapshots small enough that a change in the diff is
        immediately interpretable.
      </KBNote>

      <KBH2 id="snapshot-vs-visual">Snapshot vs visual regression</KBH2>

      <KBP>
        Snapshot testing and visual regression testing are often confused because both detect
        changes to rendered output. The difference is in what they capture. Snapshot tests
        capture the logical structure of rendered output as serialised text: the component tree,
        HTML markup or function output. Visual regression tests capture the pixel-level
        appearance of rendered UI in a real browser.
      </KBP>

      <KBP>
        A snapshot test will detect a structural change, such as a class name being removed
        or an element being replaced with a different type, but it will not detect a visual
        change that results from a CSS rule change applied to an existing class. A visual
        regression test will detect the CSS change but will not flag a structural change that
        has no visible effect. The two approaches are complementary rather than interchangeable.
      </KBP>
    </>
  )
}

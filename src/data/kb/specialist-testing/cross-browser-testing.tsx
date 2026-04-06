import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function CrossBrowserTesting() {
  return (
    <>
      <KBP>
        Cross-browser and cross-device testing verifies that an application delivers a consistent
        and correct experience across the range of browsers, operating systems and device types
        its users actually use. Despite years of progress in web standards, browsers continue
        to differ in their support for CSS features, JavaScript APIs, font rendering, form
        controls and security policies. A layout that renders correctly in Chrome may break
        in Safari, a JavaScript feature available in Firefox may be absent in an older
        Android WebView and a design that works well on a desktop monitor may be unusable on
        a small phone screen in portrait orientation.
      </KBP>

      <KBH2 id="why-browsers-still-differ">Why browsers still differ</KBH2>

      <KBP>
        Modern browsers share far more common ground than they did a decade ago, but meaningful
        differences remain. Safari's slower adoption of newer web APIs is a common source of
        compatibility issues, particularly on iOS where all browsers (regardless of brand)
        use the WebKit engine. Chromium-based browsers (Chrome, Edge, Opera and others) share
        an engine and behave very similarly, but that similarity can create a false sense of
        broad coverage when testing only within the Chromium family. Firefox retains its own
        engine with its own quirks, and its developer user base makes it important despite a
        smaller overall share.
      </KBP>

      <KBP>
        Operating system matters too. The same browser can render content differently on
        Windows, macOS and Linux due to differences in font rendering, colour management and
        system-level UI conventions. Safari on macOS and Safari on iOS share an engine but
        have different form control appearances and different permission models for features
        such as camera and microphone access.
      </KBP>

      <KBH2 id="defining-a-coverage-matrix">Defining a coverage matrix</KBH2>

      <KBP>
        A coverage matrix defines which browser, operating system and device combinations are
        in scope for testing. Analytics data is the essential input: the matrix should reflect
        where the actual user base is, not the browsers the development team happens to use.
        A product used primarily by enterprise customers on Windows may need significantly
        different coverage from a consumer application with a large iOS user base.
      </KBP>

      <KBP>
        Prioritise combinations by usage share and by risk. The browsers used by the largest
        proportion of users should receive the most thorough testing. Combinations used by
        smaller but commercially significant segments (a major corporate client on a specific
        browser version, for instance) may warrant inclusion despite a small usage share.
        Combinations used by fewer than one or two percent of users may be excluded from
        systematic testing with a documented decision, while remaining eligible for
        compatibility monitoring.
      </KBP>

      <KBH2 id="testing-strategies">Testing strategies</KBH2>

      <KBH3>Automated cross-browser testing</KBH3>

      <KBP>
        End-to-end automation frameworks such as Playwright and Selenium support running the
        same tests across multiple browsers from a single test suite. Playwright's native support
        for Chromium, Firefox and WebKit makes it practical to run the same critical-path tests
        across all three engines with minimal additional overhead. This is most efficient for
        functional tests: verifying that key journeys complete correctly in each browser.
      </KBP>

      <KBH3>Visual cross-browser testing</KBH3>

      <KBP>
        Visual regression testing across browsers checks not just that journeys complete but
        that they look correct. Cloud-based visual testing services capture screenshots across
        a wide range of browser and operating system combinations and compare them against
        approved baselines. This approach is particularly effective for catching CSS rendering
        differences that functional tests would miss entirely.
      </KBP>

      <KBH3>Manual verification</KBH3>

      <KBP>
        Some cross-browser issues, particularly those involving layout, rendering subtlety or
        platform-specific interaction behaviour, are best caught through manual review. Structured
        exploratory sessions on devices and browsers that are in the coverage matrix, particularly
        around significant changes, complement automated coverage and catch issues that automation
        would not notice.
      </KBP>

      <KBAside label="Safari on iOS is its own challenge" variant="gold">
        Because Apple requires all iOS browsers to use WebKit, a bug in WebKit affects Chrome,
        Firefox, Brave and every other iOS browser identically. Testing on a physical iOS device
        (or a reliable iOS simulator) is essential for any product with significant iOS usage,
        and issues found on iOS cannot be assumed to be present on macOS Safari or to be
        fixed by updating the browser.
      </KBAside>

      <KBH2 id="cloud-services-and-tooling">Cloud services and tooling</KBH2>

      <KBP>
        Maintaining a local collection of devices and browser versions is impractical for most
        teams. Cloud services such as BrowserStack and Sauce Labs provide access to large
        numbers of real device and browser combinations through a remote automation interface,
        integrating with standard Selenium and WebDriver-based test suites. They support both
        automated test runs and manual live sessions, making them useful for both CI integration
        and exploratory testing.
      </KBP>

      <KBNote variant="blue">
        Focus automated cross-browser testing on the highest-risk journeys rather than attempting
        full suite coverage across every combination. Running the full test suite across ten
        browser and device combinations multiplies the execution cost by ten. A targeted approach
        that runs the most critical tests on all supported browsers and the full suite only on
        the primary browser is more practical and sustainable.
      </KBNote>
    </>
  )
}

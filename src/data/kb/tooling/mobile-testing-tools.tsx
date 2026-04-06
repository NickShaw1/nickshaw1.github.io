import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function MobileTestingTools() {
  return (
    <>
      <KBP>
        Mobile testing tools automate interactions with applications running on iOS and
        Android devices and simulators. The requirements differ from web automation in
        important ways: apps may be native, hybrid or built with cross-platform frameworks,
        gesture support is essential, and test execution must account for device-specific
        behaviour, OS version fragmentation and the slower feedback cycles that come with
        building and installing an app before each test run. Two tools are most widely
        used: Appium for broad platform coverage and Detox for React Native applications.
      </KBP>

      <KBH2 id="appium">Appium</KBH2>

      <KBP>
        <a href="https://appium.io" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">Appium</a> extends
        the WebDriver protocol to mobile applications, exposing a unified API for automating
        native iOS and Android apps, hybrid apps built on web views and mobile browsers. On
        iOS, Appium uses Apple's XCUITest framework as its underlying driver. On Android,
        it uses UIAutomator2. This means Appium talks to the platform's own automation
        interfaces rather than injecting code into the application, making it applicable to
        apps built in any technology.
      </KBP>

      <KBP>
        Because Appium is WebDriver-based, it supports the same language bindings as Selenium:
        Java, Python, JavaScript, C#, Ruby and others. Teams with existing Selenium expertise
        can apply the same patterns to mobile automation with a relatively shallow learning
        curve. Appium Inspector provides a GUI for exploring the element hierarchy of a
        running app, which is the mobile equivalent of a browser's developer tools and an
        essential tool for writing reliable element locators.
      </KBP>

      <KBP>
        Appium supports execution against local simulators and emulators, locally connected
        physical devices and cloud device farms including BrowserStack and Sauce Labs.
        Cloud execution is valuable for coverage across a range of device models and OS
        versions, which is difficult to replicate with a local device estate. The trade-off
        is cost and the additional latency introduced by cloud-based test execution.
      </KBP>

      <KBH2 id="detox">Detox</KBH2>

      <KBP>
        <a href="https://wix.github.io/Detox" target="_blank" rel="noopener noreferrer" className="text-link hover:underline">Detox</a> was
        built by Wix specifically for end-to-end testing of React Native applications. It
        operates as a grey-box testing tool: it has visibility into the React Native
        JavaScript thread and uses that visibility to synchronise with the application's
        state before proceeding with each action. When the application is idle, Detox acts.
        This eliminates the arbitrary sleep calls and explicit waits that are the primary
        source of flakiness in mobile automation.
      </KBP>

      <KBP>
        Tests are written in JavaScript or TypeScript using Jest as the test runner. Detox
        compiles the app in a test build that includes a synchronisation layer, which is
        the mechanism that allows it to observe the application's internal state. Actions
        include tapping, swiping, scrolling, typing and expecting elements to be visible,
        focused or toggled. The API is intentionally simple, keeping test code readable
        without deep knowledge of the underlying platform internals.
      </KBP>

      <KBP>
        Detox runs primarily on iOS and Android simulators and emulators, with support for
        physical devices available but requiring more setup. Its tight coupling to React
        Native means it is not applicable to native iOS or Android apps written in Swift,
        Kotlin or Java.
      </KBP>

      <KBAside label="Grey-box vs black-box mobile testing" variant="purple">
        Appium treats the application as a black box, interacting with it only through the
        platform's accessibility layer. This makes it applicable to any app regardless of
        how it was built, but it also means Appium cannot know when the application is truly
        ready for the next action without explicit waits. Detox's grey-box approach trades
        generality for reliability: by observing the application's internals, it knows when
        to act without guessing. If the application is React Native, Detox's synchronisation
        model produces significantly more stable tests than Appium's black-box approach.
      </KBAside>

      <KBNote variant="green">
        Mobile CI setup is more involved than web CI. iOS builds require macOS runners,
        Android builds can run on Linux. Simulator and emulator startup times add to pipeline
        duration and must be accounted for in parallel execution strategies. Most teams run
        a limited suite of high-value end-to-end mobile tests in CI rather than the full
        suite, with the full suite reserved for scheduled overnight runs or pre-release
        validation.
      </KBNote>
    </>
  )
}

import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function MobileTesting() {
  return (
    <>
      <KBP>
        Mobile testing verifies that an application works correctly across the diverse and
        fragmented landscape of mobile devices, operating systems and usage contexts. The mobile
        environment introduces challenges that simply do not exist in desktop or web testing:
        a vast matrix of hardware specifications, operating system versions, screen sizes, input
        methods, connectivity conditions and platform-specific behaviours. Getting mobile testing
        right requires a clear strategy about where to invest, what to automate and how to make
        device coverage decisions that reflect actual user risk.
      </KBP>

      <KBH2 id="types-of-mobile-application">Types of mobile application</KBH2>

      <KBP>
        The testing approach depends significantly on what kind of application is being tested.
        Native applications are built specifically for a platform using its native SDK: Swift or
        Objective-C for iOS, Kotlin or Java for Android. They have full access to device hardware
        and APIs but require separate codebases (and separate test suites) for each platform.
      </KBP>

      <KBP>
        Cross-platform applications use frameworks such as React Native or Flutter to share code
        across platforms while producing an experience closer to native than a web wrapper.
        They reduce the amount of platform-specific testing required but still have platform-specific
        code paths that require verification on each target.
      </KBP>

      <KBP>
        Progressive web applications (PWAs) run in the mobile browser and are tested much like
        any web application, with additional attention to offline behaviour, home screen
        installation and mobile-specific browser features. They require no separate app distribution
        but cannot access all device capabilities.
      </KBP>

      <KBH2 id="device-coverage">Device coverage</KBH2>

      <KBP>
        No team can test on every device its users might have, and attempting to do so is neither
        practical nor necessary. The goal is to make coverage decisions that reflect where user
        risk is highest. Analytics data showing the operating system versions, device models and
        screen sizes of actual users is the most useful input to these decisions. A device matrix
        that represents the top 80 percent of the user base by usage covers the overwhelming
        majority of real-world risk without attempting exhaustive coverage.
      </KBP>

      <KBH3>Real devices vs emulators</KBH3>

      <KBP>
        Emulators and simulators are fast, cheap and sufficient for the majority of functional
        testing. They are the right choice for running automated test suites in CI and for
        exploratory testing of most features. Real devices are necessary for anything that
        depends on hardware behaviour: camera access, biometric authentication, Bluetooth,
        NFC, precise touch behaviour and performance testing. A strategy that uses emulators
        for automated and routine testing while reserving real devices for hardware-dependent
        and pre-release verification is practical and effective.
      </KBP>

      <KBH3>Cloud device farms</KBH3>

      <KBP>
        Cloud device farm services provide on-demand access to large numbers of real physical
        devices without the overhead of maintaining a physical device library. They integrate
        with automation frameworks and allow automated tests to run across a broad device matrix
        as part of a CI pipeline. The cost per device-minute is the main constraint; test
        suites should be designed to run efficiently and to prioritise the most valuable
        device-OS combinations.
      </KBP>

      <KBAside label="Check your analytics before building your device matrix" variant="gold">
        Device matrices built without analytics data tend to reflect assumptions about users
        rather than the actual distribution. In many markets, the most popular devices and
        operating system versions are different from what developers and testers use personally.
        Validate coverage decisions against real data before committing to a device strategy.
      </KBAside>

      <KBH2 id="mobile-specific-considerations">Mobile-specific considerations</KBH2>

      <KBH3>Gestures and interactions</KBH3>

      <KBP>
        Mobile interfaces rely on touch interactions that have no direct keyboard or mouse
        equivalent: swipes, pinches, long presses and multi-finger gestures. Automated test
        frameworks such as Appium and Detox support gesture simulation, but complex gesture
        sequences are worth manual verification on real devices to confirm that the interaction
        feels natural and registers reliably.
      </KBP>

      <KBH3>Interruptions and lifecycle events</KBH3>

      <KBP>
        Mobile applications are interrupted constantly: incoming calls, notifications, battery
        warnings, system popups asking for permissions. Testing how the application handles
        these interruptions is important and often overlooked. An application that loses user
        input when a notification appears, crashes when a permission dialogue is dismissed or
        fails to resume correctly after a phone call has a significant quality problem that
        functional happy-path tests will never surface.
      </KBP>

      <KBH3>Network conditions</KBH3>

      <KBP>
        Mobile users frequently experience poor, intermittent or absent connectivity. Testing
        how the application behaves on slow connections (3G, for instance), with connection
        drops mid-journey and in fully offline mode is important for any application that makes
        network requests. Tools that throttle network speed or simulate offline conditions
        during testing are valuable for this, particularly for applications that promise offline
        functionality.
      </KBP>

      <KBH2 id="automation-for-mobile">Automation for mobile</KBH2>

      <KBP>
        Mobile UI automation is more challenging than web automation: the tooling is more complex
        to set up, tests are slower to run and the element identification strategies differ by
        platform. Appium provides cross-platform automation using a WebDriver-based protocol and
        supports both native and hybrid applications. Detox is purpose-built for React Native
        and provides a more tightly integrated experience for that ecosystem.
      </KBP>

      <KBNote variant="blue">
        Mobile automation suites have a strong tendency to grow expensive and flaky over time.
        Invest in a solid, small suite of critical-path tests rather than attempting comprehensive
        automation coverage. Complement automated tests with structured exploratory testing on
        real devices before significant releases.
      </KBNote>
    </>
  )
}

import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function SyntheticMonitoring() {
  return (
    <>
      <KBP>
        Synthetic monitoring runs scripted interactions against a live system on a scheduled
        basis to verify that it is working correctly from the perspective of a user. Unlike
        passive monitoring (which observes real user traffic) or alerting on infrastructure
        metrics, synthetic monitoring actively simulates journeys and reports on their outcome:
        did the login page load, did the checkout journey complete, did the API return a valid
        response? This active probing means that problems are detected as soon as they occur,
        rather than waiting for a real user to encounter them and report them.
      </KBP>

      <KBH2 id="how-synthetic-monitoring-works">How synthetic monitoring works</KBH2>

      <KBP>
        A synthetic monitor is a test that runs on a timer rather than in a CI pipeline. It
        connects to a real environment, executes a predefined sequence of actions and reports
        a pass or fail result along with timing data. The monitor runs continuously (every
        minute, every five minutes or at whatever interval is appropriate for the criticality
        of the journey) and alerts on failures. The environment it runs against is typically
        production or a production-equivalent staging environment.
      </KBP>

      <KBP>
        Synthetic monitors range in complexity from simple HTTP checks (does this URL respond
        with a 200 status in under 500 milliseconds?) to full browser-based journey automation
        (navigate to the login page, enter credentials, complete a purchase and verify the
        confirmation screen). The complexity of the monitor should match the criticality of
        the journey it is protecting and the cost of maintaining it.
      </KBP>

      <KBH2 id="what-synthetic-monitoring-catches">What synthetic monitoring catches</KBH2>

      <KBH3>Availability failures</KBH3>

      <KBP>
        The most basic value of synthetic monitoring is availability detection. A monitor that
        checks the home page every minute will detect an outage within one minute of it
        occurring, regardless of whether any real user has hit the site in that window. For
        low-traffic periods (nights and weekends) where genuine user traffic is sparse,
        synthetic monitors are often the only proactive mechanism for detecting that a service
        has gone down.
      </KBP>

      <KBH3>Performance degradation</KBH3>

      <KBP>
        Synthetic monitors record the time taken to complete each step of a journey, making
        them an effective tool for detecting performance degradation over time. A journey that
        consistently completes in one second may begin taking four seconds after a deployment
        without producing any errors. Without a monitor tracking duration, this degradation
        would not be visible until users began complaining. Alerting on duration thresholds
        alongside success or failure catches this class of problem.
      </KBP>

      <KBH3>Third-party dependencies</KBH3>

      <KBP>
        Many applications depend on third-party services: payment gateways, identity providers,
        content delivery networks, analytics scripts. A synthetic monitor that exercises a
        journey touching one of these dependencies will detect failures in the dependency as
        well as in the core application. This is often the fastest way to know that a
        third-party service is affecting the user experience, ahead of the third party's own
        status page.
      </KBP>

      <KBAside label="Run monitors from multiple locations" variant="blue">
        A synthetic monitor running from a single location cannot distinguish between a
        genuine service failure and a network problem between the monitor and the service.
        Running the same monitor from multiple geographic regions identifies whether a failure
        is global or localised, which significantly changes the likely cause and the
        appropriate response. Most monitoring platforms support multi-region execution.
      </KBAside>

      <KBH2 id="the-relationship-to-automated-testing">The relationship to automated testing</KBH2>

      <KBP>
        Synthetic monitors and automated test suites are complementary but serve different
        purposes. An automated test suite runs in a controlled environment against a specific
        build, verifying that new code is correct before it reaches production. A synthetic
        monitor runs continuously against a live environment, verifying that what is already
        in production is working correctly right now.
      </KBP>

      <KBP>
        In practice, the scripts used in synthetic monitoring are often derived from existing
        end-to-end test automation. A Playwright or Selenium test that exercises a critical
        journey can frequently be adapted into a synthetic monitor with modest effort. This
        reuse avoids maintaining two separate codebases for the same journey and keeps the
        monitoring coverage aligned with what the test suite actually exercises.
      </KBP>

      <KBNote variant="green">
        Treat synthetic monitor failures with the same urgency as a production incident.
        A failing monitor means that a user trying the same journey right now is experiencing
        a failure. The instinct to investigate quietly before alerting may be appropriate for
        a metric trending in the wrong direction, but it is not appropriate for a monitor
        that is actively failing on a core user journey.
      </KBNote>
    </>
  )
}

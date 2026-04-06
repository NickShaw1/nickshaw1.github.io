import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function TestTypesTaxonomy() {
  return (
    <>
      <KBP>
        The previous articles in this section covered how many tests of each kind to write and
        when to write them. This one covers what the types actually are. Test types are not a
        hierarchy; they are a map. Understanding what each type verifies helps teams identify
        which types their system needs and where gaps in their current coverage exist.
      </KBP>

      <KBH2 id="by-scope">By scope</KBH2>

      <KBP>
        Scope describes how much of the system a test exercises at once. The four scope-based
        types form a spectrum from the smallest isolated unit to the full running system.
      </KBP>

      <KBH3>Unit testing</KBH3>
      <KBP>
        Unit tests verify the smallest independently testable piece of logic, typically a single
        function, method or class. They run against the code directly, with external dependencies
        such as databases, APIs and file systems replaced by controlled substitutes. The result is
        tests that run in milliseconds, fail with precise diagnostic information and require no
        infrastructure to execute. What they cannot verify is whether units work correctly in
        combination.
      </KBP>

      <KBH3>Integration testing</KBH3>
      <KBP>
        Integration tests exercise two or more components together to verify that their interfaces
        behave correctly. A typical integration test might confirm that a service writes a record
        to a real database, that an HTTP client receives the expected response from a real API or
        that two internal modules exchange data without loss. The key distinction from unit tests
        is that real dependencies are involved rather than substitutes.
      </KBP>

      <KBH3>System testing</KBH3>
      <KBP>
        System tests treat the entire deployed application as the subject. The system is started
        in a complete but controlled environment and exercised against its specified requirements.
        System testing verifies behaviour at the application boundary: how it responds to inputs,
        what it returns, how it handles errors. It does not require a real production environment
        but does require all major components to be present and running.
      </KBP>

      <KBH3>End-to-end testing</KBH3>
      <KBP>
        End-to-end tests exercise a complete user journey through the real system, including
        external dependencies such as payment providers, identity services and third-party APIs.
        They provide the highest confidence that the system works as users will experience it, at
        the cost of being the slowest, most fragile and most expensive tests to maintain. Failures
        in end-to-end tests can be caused by any component in the chain, making diagnosis
        significantly harder than for narrower test types.
      </KBP>

      <KBH2 id="by-purpose">By purpose</KBH2>

      <KBP>
        Some test types are defined not by scope but by the question they are trying to answer.
      </KBP>

      <KBH3>Regression testing</KBH3>
      <KBP>
        Regression tests verify that a change has not broken existing behaviour. They are not a
        distinct technique; any unit, integration or end-to-end test functions as a regression
        test once it is part of the suite. The term describes the intent: running existing tests
        after a change to confirm nothing that previously worked has stopped working. A regression
        suite is the primary defence against the cost of fixing problems introduced by new code.
      </KBP>

      <KBH3>Smoke testing</KBH3>
      <KBP>
        Smoke tests are a minimal subset run immediately after a build or deployment to confirm
        the system is fundamentally operational. They do not verify correctness in depth. They
        verify that the application starts, key routes respond and critical dependencies are
        reachable. A failing smoke test is grounds to halt a release before deeper testing begins,
        which saves the time of running a full suite against a broken deployment.
      </KBP>

      <KBH3>Sanity testing</KBH3>
      <KBP>
        Sanity tests verify that a specific fix or feature works as intended before wider testing
        continues. Where smoke testing is broad and shallow, sanity testing is narrow and focused.
        The two are often conflated. The distinction is that smoke tests confirm the system is
        alive; sanity tests confirm a particular change did what it was supposed to do.
      </KBP>

      <KBH3>Acceptance testing</KBH3>
      <KBP>
        Acceptance testing, often called user acceptance testing or UAT, verifies that the system
        meets the criteria agreed with the business or end users. It is typically the final
        quality gate before release and is often conducted by stakeholders rather than the
        development team. Where ATDD uses acceptance criteria as tests from the start of
        development, UAT is the validation that those criteria have been met in the delivered
        system.
      </KBP>

      <KBH2 id="by-approach">By approach</KBH2>

      <KBH3>Exploratory testing</KBH3>
      <KBP>
        Exploratory testing is defined by approach rather than scope or purpose. The tester
        investigates the system without a fixed script, using each finding to guide the next area
        of enquiry. It is particularly effective at surfacing defects that scripted tests miss:
        unexpected interactions between features, unusual user paths and emergent behaviour that
        only appears when multiple parts of the system are used together. Exploratory testing
        requires domain knowledge and analytical skill. It is not unstructured; it is
        unscripted.
      </KBP>

      <KBH3>Scripted testing</KBH3>
      <KBP>
        Scripted tests follow a defined set of steps with predetermined expected results. They
        provide consistency and repeatability, which makes them well suited to regression
        coverage and compliance verification where an audit trail is required. The limitation is
        that scripted tests only find what they were written to look for. They are complementary
        to exploratory testing, not a replacement for it.
      </KBP>

      <KBH2 id="non-functional">Non-functional types</KBH2>

      <KBH3>Performance testing</KBH3>
      <KBP>
        Performance testing covers several distinct concerns. Load testing verifies behaviour
        under expected concurrent usage. Stress testing pushes the system beyond its expected
        limits to observe how it fails. Endurance testing checks for degradation over sustained
        periods, catching issues such as memory leaks that do not appear in short test runs.
        These are separate activities that answer different questions and require different tooling.
      </KBP>

      <KBH3>Security testing</KBH3>
      <KBP>
        Security testing identifies vulnerabilities that could expose data or allow unauthorised
        access. It ranges from automated dependency scanning and static analysis at the cheaper
        end to manual penetration testing, in which a tester attempts to compromise the system
        using techniques a real attacker might employ. Security testing requires specialist
        knowledge and is frequently underinvested in teams that do not operate in explicitly
        regulated domains.
      </KBP>

      <KBH3>Accessibility testing</KBH3>
      <KBP>
        Accessibility testing verifies that the system is usable by people with disabilities.
        Automated tools can identify a subset of accessibility failures quickly, but they cannot
        catch everything. Manual testing with assistive technology such as screen readers,
        keyboard-only navigation and high-contrast modes is required to verify the actual
        experience. Compliance is typically assessed against WCAG standards, though compliance
        and usability are not the same thing.
      </KBP>

      <KBNote variant="blue">
        Non-functional requirements are frequently underspecified. "The system must be fast" is
        not a testable requirement. "The system must respond to 95% of requests within 300ms
        under a load of 500 concurrent users" is. Non-functional testing can only be meaningful
        when acceptance criteria are defined with the same precision as functional ones.
      </KBNote>
    </>
  )
}

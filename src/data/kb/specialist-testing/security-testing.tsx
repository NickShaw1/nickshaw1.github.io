import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function SecurityTesting() {
  return (
    <>
      <KBP>
        Security testing identifies weaknesses in a system that could allow it to be misused,
        compromised or made to behave in ways its designers did not intend. Where functional
        tests verify that a system does what it is supposed to do, security tests probe what
        it can be made to do. The distinction is important: a system can pass every functional
        test and still expose user data, allow privilege escalation or be vulnerable to
        injection attacks. Security is not a property that can be bolted on after a product
        is built; it must be considered throughout the development and testing process.
      </KBP>

      <KBH2 id="the-owasp-top-ten">The OWASP Top Ten</KBH2>

      <KBP>
        The Open Worldwide Application Security Project (OWASP) publishes the Top Ten, a
        regularly updated list of the most critical web application security risks. It is one
        of the most widely referenced frameworks in application security and provides a practical
        starting point for understanding which vulnerability classes are most likely to affect
        a web application. The current categories include broken access control, cryptographic
        failures, injection, insecure design, security misconfiguration, vulnerable and outdated
        components, identification and authentication failures, software and data integrity
        failures, security logging and monitoring failures and server-side request forgery.
      </KBP>

      <KBP>
        Familiarising the whole team with the OWASP Top Ten is one of the most cost-effective
        security investments available to a development organisation. Developers who understand
        what SQL injection is and why parameterised queries prevent it are less likely to
        introduce the vulnerability in the first place. Testers who understand what broken
        access control looks like know where to probe when reviewing a new feature.
      </KBP>

      <KBH2 id="testing-approaches">Testing approaches</KBH2>

      <KBH3>Static analysis (SAST)</KBH3>

      <KBP>
        Static application security testing analyses source code, bytecode or binaries for
        security vulnerabilities without executing the application. SAST tools can identify
        common patterns such as SQL query construction using string concatenation, use of
        deprecated cryptographic algorithms or hardcoded credentials. They run quickly and
        integrate naturally into a CI pipeline. Their limitation is false positives: SAST tools
        often flag code that is not actually exploitable in context, and teams must invest time
        in tuning and triaging results to avoid alert fatigue.
      </KBP>

      <KBH3>Dynamic analysis (DAST)</KBH3>

      <KBP>
        Dynamic application security testing interacts with a running application, sending
        crafted requests designed to probe for vulnerabilities. Tools such as OWASP ZAP and
        Burp Suite can crawl an application's interface and attempt common attack patterns
        including injection, path traversal and cross-site scripting. DAST tools test the
        application as an attacker would see it, from the outside, without knowledge of the
        source code. They are better at confirming exploitable vulnerabilities than SAST tools
        but require a deployed, running application and produce results that can be noisy.
      </KBP>

      <KBH3>Penetration testing</KBH3>

      <KBP>
        Penetration testing involves skilled security professionals attempting to compromise a
        system using the same techniques a malicious actor would use. Unlike automated scanning,
        penetration testing brings human creativity and judgement: a skilled tester can chain
        vulnerabilities that no automated tool would connect, explore unusual attack surfaces
        and identify business logic flaws that require understanding of the application's intent.
        Penetration tests are typically commissioned periodically rather than run continuously,
        and findings should feed directly back into the development backlog.
      </KBP>

      <KBAside label="Security is a shared responsibility" variant="gold">
        Security testing is most effective when it is not the sole responsibility of a security
        team. Developers who write security tests alongside functional tests, testers who include
        security scenarios in their exploratory sessions and architects who consider threat models
        during design all contribute to a more secure outcome. A security review performed only
        at the end of development catches far less than one embedded throughout it.
      </KBAside>

      <KBH2 id="specific-areas-to-test">Specific areas to test</KBH2>

      <KBH3>Authentication and authorisation</KBH3>

      <KBP>
        Broken access control is the top risk in the OWASP Top Ten for good reason. Testing
        should verify that unauthenticated users cannot access protected resources, that
        authenticated users cannot access other users' data, that role-based permissions are
        enforced correctly and that privilege escalation is not possible through parameter
        manipulation. These checks are straightforward to include in an API test suite and
        should be part of the standard test approach for any feature that involves user data.
      </KBP>

      <KBH3>Input validation and injection</KBH3>

      <KBP>
        Injection vulnerabilities arise when user-supplied input is used in queries, commands
        or templates without proper sanitisation. SQL injection, cross-site scripting and
        command injection are the most common forms. Testing should include attempts to supply
        payloads that would be harmful if interpreted by the application and verify that they
        are treated as data rather than as instructions.
      </KBP>

      <KBH3>Dependency and supply chain risks</KBH3>

      <KBP>
        Modern applications depend on large graphs of third-party packages, each of which may
        introduce its own vulnerabilities. Dependency scanning tools check installed packages
        against databases of known vulnerabilities and alert when a dependency with a disclosed
        vulnerability is in use. This type of scanning should run in CI and findings should be
        reviewed and acted on promptly: a known vulnerability left unpatched becomes a
        progressively easier target.
      </KBP>

      <KBH2 id="integrating-security-into-the-pipeline">Integrating security into the pipeline</KBH2>

      <KBP>
        The principle of shifting security left means introducing security checks as early in
        the development lifecycle as possible. Dependency scanning and SAST can run on every
        pull request at low cost. Basic security-focused API tests (checking that authentication
        is enforced, that error responses do not leak internal details, that HTTPS is required)
        can run alongside functional tests. DAST scans are more expensive and are better suited
        to a scheduled run against a staging environment.
      </KBP>

      <KBNote variant="warning">
        Security findings must be triaged and acted on in a structured way. A scan that produces
        hundreds of results and is never reviewed is worse than useless because it creates the
        impression of security activity without any actual improvement. Prioritise findings by
        exploitability and impact, address high-severity issues promptly and track progress
        against a defined remediation timeline.
      </KBNote>
    </>
  )
}

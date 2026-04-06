import KBNote from '../../../components/kb/KBNote'
import KBAside from '../../../components/kb/KBAside'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function RolesAndResponsibilities() {
  return (
    <>
      <KBP>
        Quality in software is not owned by a single role. It is distributed across a team in
        ways that vary significantly depending on how that team is structured, what kind of system
        it is building and how mature its engineering practices are. The three roles covered here,
        QA engineer, SDET and developer, represent distinct orientations toward quality rather
        than a fixed organisational hierarchy. In many teams, the boundaries between them are
        deliberately blurred.
      </KBP>

      <KBH2 id="the-qa-engineer">The QA engineer</KBH2>

      <KBP>
        The QA engineer's primary orientation is toward the product as a whole. Where a developer
        builds a feature and a tester verifies it, a QA engineer asks whether the right thing was
        built, whether it holds together under realistic conditions and whether the process that
        produced it is likely to produce similar results next time. Quality assurance, as the name
        implies, is concerned with the process as much as the output.
      </KBP>

      <KBP>
        In practice, the QA engineer role encompasses test planning, risk analysis, test design,
        execution, defect reporting and coverage review. A QA engineer working well upstream will
        be involved in requirements review before a line of code is written, identifying ambiguity
        and raising testability concerns during design. Downstream, they monitor defect trends,
        assess release readiness and provide the evidence that informs go or no-go decisions.
      </KBP>

      <KBAside label="QA vs QC" variant="gold">
        Quality assurance and quality control are related but distinct concepts. QA is process-oriented:
        it aims to prevent defects by improving how software is developed and tested. QC is
        product-oriented: it aims to identify defects in what has already been built. Most roles
        labelled QA in the industry involve a mix of both, with the balance depending on the
        organisation.
      </KBAside>

      <KBP>
        The QA engineer role has evolved considerably since dedicated testing functions first
        appeared in the 1980s. The modern QA engineer in an agile or DevOps team is not a
        gatekeeper at the end of a cycle. They are a quality advocate embedded throughout it,
        whose value lies as much in the questions they ask during development as in the tests they
        run after it.
      </KBP>

      <KBH2 id="the-sdet">The SDET</KBH2>

      <KBP>
        SDET stands for Software Development Engineer in Test. The role originated at Microsoft
        in the 1990s and has since been adopted across the industry, though the title means
        different things in different organisations. At its core, an SDET is an engineer whose
        specialism is the software that tests other software: automation frameworks, test
        infrastructure, tooling and the systems that support continuous testing in a delivery
        pipeline.
      </KBP>

      <KBP>
        The SDET writes production-quality code. Automation frameworks, test harnesses and
        custom tooling are engineering artefacts that require the same design discipline as the
        systems they test. An SDET who builds brittle, poorly structured automation produces a
        maintenance burden that eventually costs more than manual testing would have. The
        engineering rigour applied to test code is as important as the rigour applied to
        application code.
      </KBP>

      <KBP>
        SDETs typically work closely with QA engineers and developers, building the infrastructure
        that allows both to operate more effectively. They may design the CI pipeline's test
        execution strategy, implement test data management systems or build tooling that makes
        exploratory testing faster. The role is distinct from a QA engineer in its depth of
        engineering focus, and distinct from a developer in its specialism on testability and
        quality infrastructure.
      </KBP>

      <KBH2 id="the-developer">The developer</KBH2>

      <KBP>
        Developers have always written tests. Unit tests, written alongside or before production
        code, have been part of standard engineering practice since TDD became widely adopted in
        the early 2000s. What has shifted in modern teams is the expectation of how much testing
        responsibility sits with the developer and at what level.
      </KBP>

      <KBP>
        In teams practising DevOps or continuous delivery, developers are typically responsible
        for the unit and integration test coverage of the code they write, the behaviour of that
        code in the CI pipeline and the observability of their features in production. The
        principle that quality is everyone's responsibility tends, in practice, to mean that
        developers own quality at the code level while QA engineers own it at the product and
        process level.
      </KBP>

      <KBNote variant="blue">
        A common failure mode is the assumption that hiring QA engineers removes the developer's
        quality responsibility. It does not. It adds a layer of independent scrutiny. Teams where
        developers treat testing as someone else's problem produce more defects, not fewer, because
        defects that could have been caught in development reach the QA stage instead.
      </KBNote>

      <KBH2 id="how-they-work-together">How they work together</KBH2>

      <KBP>
        In a well-functioning team, these roles form a quality system rather than a quality
        handoff. The developer builds and tests at the code level. The SDET provides the
        infrastructure that makes automated testing fast, reliable and maintainable. The QA
        engineer takes a product-level view, verifying that the system as a whole meets its
        requirements and that the process producing it is sound.
      </KBP>

      <KBP>
        Not every team has all three roles, and not every team needs them. Smaller teams often
        have developers who cover SDET responsibilities and QA engineers who cover both testing
        and automation. Larger organisations may have dedicated platform engineering teams who own
        test infrastructure separately from QA. The labels matter less than the questions: is
        someone thinking about quality at the process level, the product level and the code level?
        If any of those perspectives is absent, the gaps it leaves tend to become visible in
        production.
      </KBP>
    </>
  )
}

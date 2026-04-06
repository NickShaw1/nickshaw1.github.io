import KBNote from '../../../components/kb/KBNote'
import KBAside from '../../../components/kb/KBAside'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function WhatIsSoftwareTesting() {
  return (
    <>
      <KBP>
        Software testing is the practice of evaluating a software system to determine whether it
        behaves as expected and meets its requirements. That definition is accurate but it
        undersells the discipline considerably. Testing is not a single activity; it is a
        collection of practices, techniques and responsibilities that run throughout the entire
        development lifecycle, from the first review of a requirement to the monitoring of a live
        production system.
      </KBP>

      <KBP>
        At its core, testing is about providing accurate, evidence-based information so that teams
        can make informed decisions about quality and readiness to ship. In practice, that means
        running software and comparing what it does against what it should do, but it encompasses
        considerably more: planning, analysis, requirement review, risk assessment and continuous
        collaboration with developers, designers and product owners. Execution is one part of the
        role, not the whole of it.
      </KBP>

      <KBH2 id="what-testing-is-not">What testing is not</KBH2>

      <KBNote variant="warning">
        Testing cannot prove that software has no defects. It can only demonstrate that defects
        exist or that none were found under the conditions tested. A passing test suite is evidence
        of quality, not a guarantee of it.
      </KBNote>

      <KBP>
        This distinction has real consequences. Teams that treat a green test suite as proof of
        correctness misunderstand what testing actually provides. The evidence is always bounded by
        the tests that were written and the conditions under which they ran. Untested paths remain
        unknown. Untested edge cases remain risks. The goal of testing is not to reach a state where
        all tests pass; it is to build an accurate picture of where confidence is justified and
        where it is not.
      </KBP>

      <KBH2 id="what-testers-actually-do">What testers actually do</KBH2>

      <KBP>
        A tester's job is to ask questions the system cannot answer for itself. Where are the edge
        cases? What happens when data is malformed, a connection drops or a user does something
        unexpected? How does the system behave under load? Is the interface usable by people with
        assistive technology? What does the application do when a dependency is unavailable?
      </KBP>

      <KBP>
        These questions require curiosity, scepticism and structured thinking. Good testers bring a
        different perspective from the developers who built the system. They approach software not
        with the intent of making it work but with the intent of finding out where it does not. That
        adversarial mindset, applied systematically, is what makes testing valuable.
      </KBP>

      <KBH2 id="functional-and-non-functional">Functional and non-functional testing</KBH2>

      <KBP>
        Testing divides broadly into two categories. Functional testing verifies that the software
        does what it is supposed to do: that features behave correctly, that business rules are
        enforced and that user journeys complete as intended. Non-functional testing addresses how
        well the software does it.
      </KBP>

      <KBP>
        Non-functional concerns include performance, which asks whether the system responds within
        acceptable time limits under expected load; security, which asks whether vulnerabilities
        exist that could expose data or allow unauthorised access; accessibility, which asks whether
        people with disabilities can use the product effectively; and reliability, which asks whether
        the system behaves consistently over time and recovers gracefully from failure.
      </KBP>

      <KBP>
        Both categories are essential. A system that functions correctly but performs poorly under
        load is not fit for production. A system that passes all functional tests but fails basic
        accessibility standards is not meeting the needs of all its users. Quality is the sum of
        these dimensions, not simply the absence of defects.
      </KBP>

      <KBH2 id="testing-vs-debugging">Testing vs debugging</KBH2>

      <KBAside label="Key distinction" variant="gold">
        Testing and debugging are related but distinct activities. Testing finds evidence that a
        problem exists. Debugging locates the root cause and corrects it. Testers find; developers
        fix. In practice the boundary blurs in teams where developers take ownership of their own
        quality, but the conceptual distinction remains useful when thinking about how to organise
        effort and responsibility within a team.
      </KBAside>

      <KBH2 id="a-continuous-discipline">A continuous discipline</KBH2>

      <KBP>
        The most persistent misconception about testing is that it is a phase, something that
        happens after development is complete. Modern practice treats it as a continuous thread
        woven throughout the entire lifecycle. Defects caught in requirements review cost far less
        to resolve than the same defects found in production. The later a problem surfaces, the more
        expensive it becomes to address, in time, in money and in user trust.
      </KBP>

      <KBP>
        Research into defect cost consistently shows that fixing a defect in production is
        significantly more expensive than fixing it during development. Estimates vary but the
        directional relationship is well established. This is why shift-left testing, which moves
        quality activities earlier in the development process, has become standard practice in
        agile and DevOps environments. It is not a new
        idea but it is a well-evidenced one, supported by decades of industry data. Shift-right
        testing, by contrast, extends quality into production through monitoring, feature flags and
        canary releases. Together they create a quality posture that spans the full lifecycle.
      </KBP>

      <KBH2 id="why-it-matters">Why it matters</KBH2>

      <KBP>
        Software is everywhere. It runs hospitals, banks, transport systems and the devices that
        people depend on every day. When it fails, the consequences range from minor inconvenience
        to serious harm. Testing is the primary mechanism by which teams understand and manage the
        risk of those failures before they reach the people who rely on the product.
      </KBP>

      <KBP>
        Beyond risk, testing provides information. It tells stakeholders whether the software is
        ready to ship, whether a change has introduced a regression and whether the system behaves
        correctly under conditions that users will actually encounter. That information supports
        better decisions, faster releases and greater confidence in what is being delivered.
      </KBP>

      <KBP>
        Software testing, done well, is not a bottleneck or a cost centre. It is the discipline
        that makes sustainable, trustworthy delivery possible.
      </KBP>
    </>
  )
}

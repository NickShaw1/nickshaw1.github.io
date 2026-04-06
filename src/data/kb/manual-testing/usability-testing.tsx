import KBNote from '../../../components/kb/KBNote'
import KBAside from '../../../components/kb/KBAside'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function UsabilityTesting() {
  return (
    <>
      <KBP>
        Functional testing asks whether a product works. Usability testing asks whether a product
        can be used. The two questions are related but distinct: a product can pass all its
        functional tests and still be confusing to navigate, exhausting to use or inconsistent
        in ways that erode user confidence over time. Usability testing is concerned with the
        experience of using software, not only its correctness.
      </KBP>

      <KBH2 id="what-usability-testing-examines">What usability testing examines</KBH2>

      <KBP>
        Usability testing evaluates how well users can accomplish tasks with a product. It
        considers whether users can find what they are looking for, whether they understand what
        actions are available at each stage, whether error states communicate what went wrong and
        what to do next, and whether the overall experience aligns with what users expect based
        on their prior knowledge and mental models.
      </KBP>

      <KBP>
        The scope is broader than navigation and layout. Error messages, onboarding flows,
        search behaviour, form design, feedback mechanisms and the language used throughout the
        product all fall within usability. A feature that works correctly but presents its output
        in a format that users consistently misread has a usability defect, even though it has
        no functional one.
      </KBP>

      <KBH2 id="moderated-and-unmoderated">Moderated and unmoderated</KBH2>

      <KBP>
        Moderated usability testing involves a facilitator who observes a participant completing
        defined tasks and asks questions in real time. The facilitator does not guide the
        participant toward correct actions; they observe and use the think-aloud protocol, asking
        the participant to narrate their thinking as they work. What users say while doing
        something frequently reveals assumptions, confusions and expectations that their actions
        alone would not surface.
      </KBP>

      <KBP>
        Unmoderated testing uses tools to record users completing tasks without a facilitator
        present. Participants follow instructions independently and the recordings are reviewed
        afterwards. Unmoderated sessions scale more easily and produce data from a wider pool of
        participants, but they cannot follow up on unexpected behaviour, ask clarifying questions
        or probe the reasoning behind a choice. Both formats produce useful data; they answer
        different questions.
      </KBP>

      <KBH3>Participant selection</KBH3>
      <KBP>
        The value of moderated usability testing depends heavily on who participates. Testing
        with people who already know the product well produces different findings from testing
        with new users. Both are useful at different stages: existing users reveal advanced
        workflow friction and inconsistencies that only become apparent with familiarity; new
        users reveal onboarding gaps, unclear terminology and assumptions that the design team
        did not realise they had made.
      </KBP>

      <KBH2 id="heuristic-evaluation">Heuristic evaluation</KBH2>

      <KBAside label="Nielsen's ten heuristics" variant="blue">
        Heuristic evaluation is a structured expert review in which evaluators assess an interface
        against a set of established usability principles. Jakob Nielsen's ten heuristics,
        established in their current form in 1994 and still widely applied, cover areas including: visibility of system
        status, match between system and the real world, user control and freedom, consistency
        and standards, error prevention, recognition rather than recall, flexibility and efficiency,
        aesthetic and minimalist design, help with error recovery and help and documentation.
        Heuristic evaluation does not require participant recruitment, can be completed quickly
        and produces findings that map directly to design decisions. It is most useful early in
        development or as a complement to user testing rather than a replacement for it.
      </KBAside>

      <KBP>
        Multiple evaluators working independently and then comparing findings produce more
        comprehensive results than a single reviewer. Different evaluators notice different
        issues, and the overlap between independent assessments provides a rough indication of
        which problems are most obvious and therefore most likely to affect users.
      </KBP>

      <KBH2 id="what-to-measure">What to measure</KBH2>

      <KBP>
        Usability testing produces both quantitative and qualitative data. Task completion rate
        measures the proportion of participants who successfully finish a defined task without
        assistance. Time on task indicates how long completion takes relative to a reasonable
        expectation. Error rate counts how often participants take incorrect actions, reach dead
        ends or need to backtrack. These numbers are most useful as comparisons over time or
        between design variants rather than as absolute targets.
      </KBP>

      <KBP>
        Post-session questionnaires provide standardised satisfaction scores. The System Usability
        Scale (SUS) is a ten-item questionnaire that produces a single score on a scale from zero
        to one hundred. It is quick to administer, well validated and produces scores that can be
        tracked across releases to detect whether usability is improving or degrading.
      </KBP>

      <KBP>
        Qualitative findings are equally important and often more actionable. The verbal output
        of a think-aloud session reveals the mental model participants bring to the product, which
        may differ substantially from the one the design team assumed. Gaps between how users
        think the product works and how it actually works are among the most valuable findings
        usability testing produces, because they explain why users make the choices they make
        rather than simply recording that they made them.
      </KBP>

      <KBH2 id="the-testers-role">The tester's role</KBH2>

      <KBNote variant="green">
        Usability testing and accessibility testing are related but distinct activities.
        Usability testing evaluates whether the product is easy for users to accomplish their
        goals. Accessibility testing evaluates whether users with disabilities can use the product
        at all. A product can be accessible without being usable, and usable without being fully
        accessible. In practice, improving usability often improves accessibility and vice versa,
        but the evaluation methods, tools and compliance criteria are different. The test types
        taxonomy article in the Foundations section covers accessibility testing in its
        non-functional section.
      </KBNote>

      <KBP>
        QA engineers contribute to usability testing through structured test sessions, heuristic
        reviews and participation in moderated studies as observers. The testing rigour that
        testers bring, defining tasks clearly, controlling variables and documenting findings
        systematically, makes usability evaluation more reliable and repeatable than informal
        feedback.
      </KBP>

      <KBP>
        In teams with dedicated UX researchers, the researcher leads participant recruitment,
        study design and analysis. In teams without that specialism, QA engineers often fill
        the gap. The key is to apply the same discipline that makes functional testing useful:
        clear objectives, consistent execution and findings recorded in a form that informs
        decisions rather than simply describing observations.
      </KBP>
    </>
  )
}

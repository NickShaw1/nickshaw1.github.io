import KBBanner from '../../../components/kb/KBBanner'
import KBAside from '../../../components/kb/KBAside'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function ExploratoryTesting() {
  return (
    <>
      <KBP>
        The test types taxonomy in the Foundations section defined exploratory testing as
        investigation without a fixed script. This article goes deeper: what structured exploration
        looks like in practice, what frameworks experienced practitioners use to direct it and
        where it provides the most value relative to other forms of testing.
      </KBP>

      <KBH2 id="charters-and-session-based-testing">Charters and session-based testing</KBH2>

      <KBP>
        Leaving a testing session entirely open produces inconsistent results. Most practitioners
        structure exploratory sessions around a charter: a brief statement that defines what will
        be investigated, within what scope and over what time period. A charter is not a script.
        It defines the territory to explore, not the path through it.
      </KBP>

      <KBP>
        A charter might be as simple as "explore the payment confirmation flow as a first-time
        user" or as specific as "investigate how the system handles concurrent sessions on the
        same account with conflicting state". It gives the session a purpose without prescribing
        steps, which preserves the freedom to follow unexpected findings while ensuring the
        session is not simply unfocused clicking.
      </KBP>

      <KBAside label="Session-based test management" variant="gold">
        Session-based test management (SBTM) was developed by Jonathan and James Bach to make
        exploratory work visible and trackable at scale. Sessions are time-boxed, typically to
        90 minutes, and each has a charter, an assigned tester and a debrief. SBTM allows teams
        to report how many sessions were completed, what areas were covered and what was found,
        without turning the work into rote execution. It is a framework for accountability, not
        a mechanism for scripting.
      </KBAside>

      <KBP>
        Session notes are a practical companion to the charter. During the session, the tester
        records what was tested, what was found and what was not covered within the time available.
        These notes form the raw material for the debrief and provide an audit trail that makes
        exploratory testing legible to the rest of the team.
      </KBP>

      <KBH2 id="heuristics-and-mental-models">Heuristics and mental models</KBH2>

      <KBP>
        Exploratory testers rely on heuristics: mental models and rules of thumb that guide where
        to look and what questions to ask. Unlike checklists, heuristics are not applied
        mechanically. They are prompts for thinking that a tester interprets based on context,
        experience and what the system under investigation is actually doing.
      </KBP>

      <KBH3>SFDPOT</KBH3>
      <KBP>
        SFDPOT, developed by James Bach, suggests examining a system through six lenses: Structure
        (how the product is built and organised), Function (what it does), Data (the information
        it stores, processes and outputs), Platform (the environment it runs in), Operations (how
        it will be used in practice) and Time (how it behaves across time, under load and in
        sequence). Each lens surfaces a different class of defect. A tester who only ever examines
        function will miss defects that only appear under certain platform conditions or when
        operations are performed in a particular sequence.
      </KBP>

      <KBH3>FEW HICCUPPS</KBH3>
      <KBP>
        FEW HICCUPPS, also from the context-driven testing community, provides a set of oracles:
        reference points against which the system under test can be compared to determine whether
        its behaviour is acceptable. The acronym covers Familiar products, Explicit requirements,
        World knowledge, History, Image, Claims, Comparable products, Users, Purpose and Standards.
        Rather than asking "what should this do?", FEW HICCUPPS asks "compared to what should
        this be evaluated?" Different oracles apply to different situations, and part of the skill
        is selecting which comparisons are most relevant.
      </KBP>

      <KBBanner>
        Heuristics are learned tools, not algorithms. A tester encountering SFDPOT for the first
        time will apply it less effectively than one who has used it across dozens of sessions and
        knows which lenses tend to surface problems in which kinds of system. The frameworks become
        more useful as experience accumulates. Treating them as checklists misses the point
        entirely.
      </KBBanner>

      <KBH2 id="when-it-matters-most">When it matters most</KBH2>

      <KBP>
        Exploratory testing provides the most value when the specification is incomplete, the
        system is complex or the test space is not well understood. A new feature with broad
        acceptance criteria and many possible user paths is well suited to exploration. A
        well-understood, stable function with precise inputs and defined expected outputs is
        better suited to scripted verification, where repeatability and traceability matter more
        than discovery.
      </KBP>

      <KBP>
        Exploratory testing is also particularly effective after automated testing has run.
        Automated tests confirm that known scenarios produce expected results. Exploration looks
        for the scenarios nobody thought to specify: unexpected interactions between features,
        emergent behaviours that arise from sequences of actions and conditions that only appear
        when multiple parts of the system are used together in realistic ways.
      </KBP>

      <KBP>
        Risk is another useful guide. Areas of a product that carry high consequence if they fail,
        that have been recently refactored or that have a history of defects warrant exploratory
        attention regardless of how well they are covered by automation. The exploratory tester
        asks not just "does this work?" but "what could go wrong here that we have not anticipated?"
      </KBP>

      <KBP>
        The two approaches, scripted and exploratory, cover different ground and are at their most
        powerful in combination. A team that automates its regression coverage and applies
        exploratory sessions to new and high-risk areas is not choosing between them. It is using
        each for what it is best suited to.
      </KBP>
    </>
  )
}

import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import KBSteps from '../../../components/kb/KBSteps'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function AccessibilityTesting() {
  return (
    <>
      <KBP>
        Accessibility testing verifies that a product can be used by people with a wide range
        of abilities and disabilities, including those who use assistive technologies such as
        screen readers, switch access devices or voice control software. In many jurisdictions
        accessibility is a legal requirement, not an optional enhancement, and the standards
        that define it (primarily the Web Content Accessibility Guidelines, known as WCAG) are
        detailed and precise. Beyond compliance, accessible products are simply better products:
        the design constraints that make a site usable with a keyboard tend to make it more
        usable for everyone.
      </KBP>

      <KBH2 id="wcag-and-the-four-principles">WCAG and the four principles</KBH2>

      <KBP>
        The Web Content Accessibility Guidelines are organised around four principles, often
        referred to by the acronym POUR.
      </KBP>

      <KBSteps variant="blue" steps={[
        {
          title: 'Perceivable',
          body: 'Information must be presentable in ways users can perceive, which means providing text alternatives for non-text content, captions for audio and ensuring content can be presented in different ways without losing meaning.',
        },
        {
          title: 'Operable',
          body: 'All functionality must be available via keyboard, users must have enough time to read and use content and nothing should be designed in a way known to cause seizures or physical reactions.',
        },
        {
          title: 'Understandable',
          body: 'Text must be readable, pages must behave predictably and users must be helped to avoid and correct mistakes.',
        },
        {
          title: 'Robust',
          body: 'Content must be interpretable reliably by a wide variety of user agents, including current and future assistive technologies, which is primarily achieved through correct, semantic HTML and proper use of ARIA where needed.',
        },
      ]} />

      <KBP>
        WCAG 2.2 is the current published standard, released in October 2023, adding nine new
        success criteria to the 2.1 baseline. In practice, WCAG 2.1 AA remains the conformance
        level referenced by most legal frameworks and accessibility regulations worldwide. Teams
        targeting compliance should verify which version is required by the relevant legislation
        or policy in their market, and consider adopting 2.2 AA as a forward-looking target.
      </KBP>

      <KBH2 id="automated-accessibility-testing">Automated accessibility testing</KBH2>

      <KBP>
        Automated tools such as Axe, Lighthouse and WAVE can detect a significant number of
        accessibility issues without human involvement. They check for things that can be
        determined programmatically: missing alt text on images, form inputs without labels,
        insufficient colour contrast ratios, incorrect ARIA attributes and missing landmark
        regions. These checks are fast, repeatable and easy to integrate into a CI pipeline.
      </KBP>

      <KBP>
        The important limitation of automated accessibility testing is that it can only catch
        a subset of WCAG failures. Estimates vary, but automated tools typically detect around
        30 to 40 percent of WCAG 2.1 AA issues. The remainder require human testing because
        they depend on judgement about meaning, context and actual usability. Automated testing
        is a floor, not a ceiling: it catches the most obvious and most measurable issues, but
        a passing automated check does not mean a product is accessible.
      </KBP>

      <KBAside label="Automate early, test with assistive technology too" variant="gold">
        Integrating an accessibility linter (such as eslint-plugin-jsx-a11y) into the development
        environment catches issues at the point of authoring. Adding Axe to component tests
        catches regressions during CI. Both of these complement, rather than replace, testing
        with actual assistive technology and with people who use those technologies day-to-day.
      </KBAside>

      <KBH2 id="manual-accessibility-testing">Manual accessibility testing</KBH2>

      <KBH3>Keyboard navigation</KBH3>

      <KBP>
        Testing keyboard navigation is one of the most accessible entry points into manual
        accessibility testing (requiring no specialist tools). Tab through every interactive
        element on the page. Verify that focus is visible throughout, that focus order is
        logical, that no focus traps exist (except in modal dialogues, where they are required)
        and that every action achievable with a mouse is also achievable with the keyboard. Many
        accessibility failures are discovered within minutes of picking up the keyboard.
      </KBP>

      <KBH3>Screen reader testing</KBH3>

      <KBP>
        Screen reader testing requires using the software that many users with visual impairments
        depend on: NVDA or JAWS on Windows, VoiceOver on macOS and iOS, TalkBack on Android.
        Each screen reader has its own interaction model and behaviour; testing with one is
        better than testing with none, but testing with the combination your users are most
        likely to use is preferable. Verify that all content is announced, that interactive
        elements have meaningful names and that complex components such as data tables, dialogs
        and carousels are navigable and announced correctly.
      </KBP>

      <KBH3>Colour and visual presentation</KBH3>

      <KBP>
        Colour contrast must meet the WCAG minimum ratios: 4.5:1 for normal text and 3:1 for
        large text and user interface components. Browser developer tools and dedicated checkers
        can measure contrast ratios. Testing should also consider that colour must not be the
        only means of conveying information: an error state indicated solely by a red border
        without accompanying text is inaccessible to users with colour vision deficiencies.
      </KBP>

      <KBH2 id="building-accessibility-in">Building accessibility in</KBH2>

      <KBP>
        Accessibility issues are cheapest to fix when they are caught early. A missing form
        label discovered in design review is fixed in minutes. The same issue discovered after
        a page has been built and tested requires revisiting the implementation, updating tests
        and potentially re-testing adjacent functionality. Accessibility review should be part
        of the definition of done for every user-facing feature, not a separate activity
        performed after development is complete.
      </KBP>

      <KBNote variant="green">
        Engaging users with disabilities in testing is the most direct way to understand whether
        a product is genuinely usable, not merely compliant. Automated tools and manual checklists
        can verify technical conformance, but they cannot replace the experience of someone who
        uses a screen reader daily and knows immediately whether a complex widget is navigable
        in practice.
      </KBNote>
    </>
  )
}

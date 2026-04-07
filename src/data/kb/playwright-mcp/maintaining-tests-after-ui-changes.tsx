import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBCode from '../../../components/kb/KBCode'
import KBVideo from '../../../components/kb/KBVideo'

export default function MaintainingTestsAfterUiChanges() {
  return (
    <>
      <KBVideo
        videoId="PKZsdyAuuPc"
        title="How to Heal Failing Playwright Tests Automatically with the Healer Agent"
        caption="Automated test maintenance using AI - keeping tests in sync with UI changes"
      />

      <KBP>
        UI changes are the most common cause of test failures in a mature test suite. A
        developer renames a button, restructures a form or introduces a new component, and
        a set of tests that were passing yesterday are now failing. Manually updating
        locators across dozens of test files is tedious work, and it is exactly the kind
        of pattern-matching and code-modification task that AI does well. This article
        covers how to use AI to manage test maintenance safely.
      </KBP>

      <KBH2 id="identifying-affected-tests">Using AI to identify which tests are affected</KBH2>

      <KBP>
        When a UI change is deployed, the first question is: which tests will break? If you
        know which page or component changed, AI can help you identify the test files that
        reference it.
      </KBP>

      <KBCode>{`The checkout page has been redesigned. The main changes are:
- The "Place order" button has been renamed to "Confirm and pay"
- The address fields are now in a separate component called AddressForm
- The order summary section has been moved to the right sidebar

Given these changes, which of the following test files are most likely to need
updating? [list test files or paste their contents]`}</KBCode>

      <KBP>
        You can also use the MCP server to have the AI navigate to the updated page and
        compare what it finds against the locators in your test files:
      </KBP>

      <KBCode>{`Navigate to http://localhost:3000/checkout. Here is a Playwright test file for
the checkout flow. For each locator in the test, tell me whether the element
it references is still present on the page, and if not, suggest what it should
be updated to.

[paste test file]`}</KBCode>

      <KBH2 id="bulk-updating-locators">Bulk-updating locators with AI assistance</KBH2>

      <KBP>
        For small changes - a renamed button or a new label - AI can suggest the updated
        locator and you apply it manually. For larger changes that affect many files, a
        more systematic approach is warranted.
      </KBP>

      <KBH3>Single file update</KBH3>

      <KBCode>{`The "Place order" button has been renamed to "Confirm and pay".
Please update every locator in this test file that references "Place order"
to use the new text, and check whether any other locators might be affected.

[paste test file]`}</KBCode>

      <KBH3>Multi-file update</KBH3>

      <KBP>
        For changes that span multiple files, provide all the affected files in a single
        prompt and ask the AI to update them consistently:
      </KBP>

      <KBCode>{`The following UI changes have been made to the checkout flow:
- "Place order" button renamed to "Confirm and pay"
- "Delivery address" field group now has a label of "Shipping address"
- The promo code input now has an aria-label of "Promotional code"

Please update the locators in all of the following test files to match these
changes. Show me the diff for each file.

[paste files]`}</KBCode>

      <KBH2 id="page-objects-in-sync">Keeping page objects in sync after refactors</KBH2>

      <KBP>
        If your test suite uses the Page Object Model, a UI change requires updating the
        page object as well as the tests that use it. AI can handle both steps in one pass:
      </KBP>

      <KBCode>{`Here is our CheckoutPage page object and the tests that use it. The checkout
page has been redesigned - I'll navigate to it now so you can see the current
state.

[navigate to page via MCP]

Please update the page object's locators to match the current page, then check
whether any of the test methods need updating to reflect the new UI structure.

[paste page object and tests]`}</KBCode>

      <KBH2 id="regression-risk">The risk of AI introducing regressions during maintenance</KBH2>

      <KBP>
        AI-assisted maintenance introduces a specific class of risk: the AI makes a change
        that appears correct but is subtly wrong. A renamed locator might resolve to a
        different element than intended. An assertion might be weakened in the process of
        being updated. A test might start passing for the wrong reason.
      </KBP>

      <KBH3>The silent pass problem</KBH3>

      <KBP>
        The most dangerous maintenance mistake is one that makes a broken test pass again
        by removing or weakening an assertion rather than by correctly updating the
        locator. For example:
      </KBP>

      <KBCode language="typescript">{`// Original - failing because 'Place order' no longer exists
await page.getByRole('button', { name: 'Place order' }).click()
await expect(page.getByText('Order confirmed')).toBeVisible()

// AI update - wrong approach, test now passes but doesn't verify the right thing
await page.getByRole('button', { name: 'Confirm and pay' }).click()
// AI removed the assertion because 'Order confirmed' text also changed,
// but forgot to add a replacement assertion
// Test passes but no longer verifies the outcome`}</KBCode>

      <KBCode language="typescript">{`// Correct update - both the action and the assertion are updated
await page.getByRole('button', { name: 'Confirm and pay' }).click()
await expect(page.getByText('Thank you for your order')).toBeVisible()`}</KBCode>

      <KBP>
        Always review AI-generated diffs line by line. Pay particular attention to any
        assertion that was removed or changed.
      </KBP>

      <KBH2 id="safe-workflow">A safe workflow for AI-assisted test maintenance</KBH2>

      <KBP>
        The following workflow minimises the risk of regressions when using AI for
        maintenance:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>
          <strong className="text-text-primary">Start from a known baseline.</strong> Before making any changes, run the full suite and confirm which tests are failing and which are passing. The failing tests are your target; the passing ones should remain passing after the update.
        </li>
        <li>
          <strong className="text-text-primary">Update one file at a time.</strong> Applying AI changes to many files simultaneously makes it hard to identify which change introduced a regression. Work through files one at a time.
        </li>
        <li>
          <strong className="text-text-primary">Run after each file.</strong> Run the updated tests immediately after each file change. A test that was failing should now pass. Any test that was passing before should still pass.
        </li>
        <li>
          <strong className="text-text-primary">Review the diff before committing.</strong> Read every change the AI made. Check that no assertions were removed or weakened. Check that every updated locator refers to the element you intend.
        </li>
        <li>
          <strong className="text-text-primary">Never accept a change you cannot explain.</strong> If the AI updated something and you do not understand why, ask it to explain. If the explanation does not make sense, investigate before committing.
        </li>
      </ul>

      <KBNote variant="warning">
        The most important rule of AI-assisted maintenance: a test suite that passes is
        not the same as a test suite that is correct. AI can make all your failing tests
        pass by removing assertions. Always verify that the passing tests are verifying
        the right things, not just that they pass.
      </KBNote>

      <KBH2 id="test-healing">Automated test healing</KBH2>

      <KBP>
        Playwright's own roadmap includes features for automatic test healing: detecting
        that a locator has failed to match and automatically trying alternative strategies
        to find the intended element. At the time of writing this is available as an
        experimental feature in some configurations.
      </KBP>

      <KBP>
        Automatic healing can be useful for keeping a large suite running through minor UI
        changes, but it comes with a caveat: a healed locator may not be the best locator.
        The framework picks the first thing that works, not necessarily the most resilient
        option. Treat healed locators as temporary patches and review them in your next
        sprint to ensure they have been replaced with deliberate choices.
      </KBP>

      <KBH2 id="proactive-maintenance">Proactive vs reactive maintenance</KBH2>

      <KBP>
        Reactive maintenance - fixing tests after they break - is the most common pattern
        but not the only option. AI can help with proactive maintenance too: reviewing a
        page object before a redesign and identifying which locators are likely to be
        affected, or reviewing newly merged code and flagging tests that reference
        components that have changed.
      </KBP>

      <KBP>
        A proactive approach requires more investment but reduces the size of the reactive
        maintenance burden. If you know that next week's sprint includes a redesign of the
        checkout page, a thirty-minute review of the checkout test files before the sprint
        starts costs less time than debugging a set of broken tests mid-sprint.
      </KBP>
    </>
  )
}

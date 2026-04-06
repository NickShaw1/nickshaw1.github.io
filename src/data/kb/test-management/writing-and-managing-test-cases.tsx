import type React from 'react'
import KBSteps from '../../../components/kb/KBSteps'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBP } from '../../../components/kb/KBHeading'

export default function WritingAndManagingTestCases() {
  return (
    <>
      <KBP>
        A test case is a documented specification of a condition to verify and the steps required
        to verify it. Its purpose is to allow a tester to execute a consistent check and record a
        clear outcome. The quality of test cases determines the quality of the coverage they
        provide: a poorly written case may be executed and passed without actually verifying
        anything meaningful.
      </KBP>

      <KBH2 id="anatomy-of-a-test-case">Anatomy of a test case</KBH2>

      <KBSteps
        variant="blue"
        steps={[
          {
            title: 'Title',
            body: 'A concise statement of what is being verified. Not a description of the steps but of the condition: "User cannot submit the registration form without a valid email address" rather than "Fill in registration form".',
          },
          {
            title: 'Preconditions',
            body: 'The state the system must be in before execution begins. This includes the user account type, any data that must exist, the environment and any setup actions that must have been completed.',
          },
          {
            title: 'Steps',
            body: 'Numbered, specific actions that the tester performs. Steps describe what to do, not what to observe. Observations belong in the expected result.',
          },
          {
            title: 'Expected result',
            body: 'A precise description of what the system should do in response to the steps. Vague expected results such as "it should work" are not verifiable. The expected result must be specific enough that two different testers reading it would reach the same conclusion about whether it has been met.',
          },
          {
            title: 'Pass or fail criteria',
            body: 'The explicit condition under which the case is marked passed or failed. For many cases this is simply whether the actual result matches the expected result, but for some scenarios it requires a tolerance or threshold to be defined.',
          },
        ]}
      />

      <KBH2 id="an-example-test-case">An example test case</KBH2>

      <KBP>
        The following illustrates what a well-formed test case looks like in practice.
      </KBP>

      {/* ── Test case card ──────────────────────────────────── */}
      <div className="my-6 border border-bg-border rounded-card overflow-hidden">

        {/* Header: ID + status badge */}
        <div className="flex flex-wrap items-center gap-2 px-4 py-3 border-b border-bg-border bg-bg-base">
          <span className="font-mono text-[11px] text-text-muted">TC-0047</span>
          <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border bg-[#0AFF9D]/10 text-[#0AFF9D] border-[#0AFF9D]/20">
            Pass
          </span>
        </div>

        {/* Rows */}
        {([
          {
            label: 'Title',
            content: (
              <p className="text-text-primary font-medium text-[13px] leading-snug">
                User cannot submit the registration form without a valid email address
              </p>
            ),
          },
          {
            label: 'Preconditions',
            content: (
              <p className="text-text-secondary text-[13px] leading-relaxed">
                The application is open on the registration page. No existing account uses the test email address.
              </p>
            ),
          },
          {
            label: 'Steps',
            content: (
              <ol className="space-y-1.5">
                {[
                  'Navigate to the registration page.',
                  'Complete all fields with valid data except the email field.',
                  'Enter an address without a domain, such as "user@".',
                  'Click the Submit button.',
                ].map((step, i) => (
                  <li key={i} className="flex gap-2.5 text-[13px] text-text-secondary leading-relaxed">
                    <span className="font-mono text-text-muted flex-shrink-0 select-none">{i + 1}.</span>
                    {step}
                  </li>
                ))}
              </ol>
            ),
          },
          {
            label: 'Expected result',
            content: (
              <p className="text-text-secondary text-[13px] leading-relaxed">
                The form is not submitted. An inline validation message indicating that a valid email address is required appears beneath the email field.
              </p>
            ),
          },
          {
            label: 'Actual result',
            content: (
              <p className="text-text-secondary text-[13px] leading-relaxed">
                The form was not submitted. The validation message "Please enter a valid email address" appeared beneath the email field immediately on submission attempt.
              </p>
            ),
          },
          {
            label: 'Pass / fail',
            content: (
              <p className="text-[#0AFF9D] text-[13px] leading-relaxed font-medium">
                Pass
              </p>
            ),
          },
        ] as { label: string; content: React.ReactNode }[]).map((row, i, arr) => (
          <div
            key={row.label}
            className={`flex flex-col sm:grid sm:grid-cols-[140px_1fr]${i < arr.length - 1 ? ' border-b border-bg-border' : ''}`}
          >
            <div className="px-4 pt-3 pb-1 sm:py-3 bg-bg-base sm:border-r border-bg-border">
              <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted whitespace-nowrap">
                {row.label}
              </p>
            </div>
            <div className="px-4 pb-3 pt-1.5 sm:py-3">
              {row.content}
            </div>
          </div>
        ))}

        {/* Footer: executor + date */}
        <div className="flex flex-wrap items-center gap-4 px-4 py-2.5 bg-bg-base border-t border-bg-border font-mono text-[11px] text-text-muted">
          <span>Executed by: <span className="text-text-secondary">QA Engineer</span></span>
          <span>Date: <span className="text-text-secondary">2026-04-06</span></span>
        </div>

      </div>

      <KBH2 id="conditions-not-scripts">Conditions, not scripts</KBH2>

      <KBP>
        A common failure mode in test case writing is confusing a test case with a script. A
        script records exactly what to click, in what order, on which screen. A test case records
        the condition being verified. The distinction matters because a script becomes invalid
        whenever the interface changes, while a condition remains valid as long as the behaviour
        it describes is still required.
      </KBP>

      <KBNote variant="warning">
        Over-specified test cases are a significant source of maintenance burden. When a test case
        describes the exact text of a button label, the precise layout of a form or the exact
        sequence of interface interactions, it will need to be updated every time the interface
        evolves, even when the underlying behaviour has not changed. The correct level of
        specificity is the minimum required to verify the condition consistently.
      </KBNote>

      <KBP>
        This does not mean test cases should be vague. The expected result must be precise. The
        distinction is between the steps, which should describe intent rather than exact mechanics
        where possible, and the outcome, which must be unambiguous.
      </KBP>

      <KBH2 id="test-case-maintenance">Test case maintenance</KBH2>

      <KBP>
        Test cases decay. A test case written against an initial specification will not necessarily
        reflect the current behaviour of the system after several months of development. Cases that
        are not reviewed and updated accumulate stale preconditions, obsolete steps and expected
        results that no longer match what the product actually does. Executing stale test cases
        produces meaningless results: a pass that means nothing because the condition being checked
        is no longer relevant.
      </KBP>

      <KBP>
        The most practical maintenance approach is to review cases at the point they are executed.
        A tester running a case that requires updating should update it immediately, not flag it
        for later. Deferred maintenance accumulates. A case that takes two minutes to update
        during execution will take considerably longer to update at the end of a cycle when the
        context has been lost.
      </KBP>

      <KBP>
        Test cases should also be reviewed when features change. When a developer implements a
        change to a feature, the associated test cases should be identified and assessed. Not all
        changes require updates to all related cases, but the assessment should be deliberate
        rather than skipped under time pressure.
      </KBP>

      <KBP>
        The other dimension of maintenance is pruning. Test suites grow naturally over time but
        they rarely shrink. Cases written for features that were subsequently removed, for
        scenarios now covered by automation or for conditions that no longer apply remain in the
        suite and consume time on every execution cycle. Periodic pruning of the case library is
        as important as keeping it current.
      </KBP>
    </>
  )
}

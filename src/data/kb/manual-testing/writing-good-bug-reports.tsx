import KBSteps from '../../../components/kb/KBSteps'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import { Paperclip } from 'lucide-react'

export default function WritingGoodBugReports() {
  return (
    <>
      <KBP>
        When a tester finds a defect, the value of that finding depends almost entirely on what
        happens next. A defect that is reproducible, clearly described and correctly categorised
        gets fixed. A defect that is vague, missing steps or assigned the wrong severity sits in
        a backlog, gets closed as "cannot reproduce" or is fixed for the wrong reason. The bug
        report is not administrative overhead. It is the mechanism by which a finding becomes a
        fix.
      </KBP>

      <KBH2 id="why-report-quality-matters">Why report quality matters</KBH2>

      <KBP>
        Bug reports are read by people who were not present when the defect was found. The
        developer who receives a report has no access to the tester's context, screen state,
        assumptions or observations at the time. Everything relevant to diagnosing and fixing
        the defect must exist within the report itself.
      </KBP>

      <KBP>
        A poorly written report transfers the diagnosis burden to the developer. They must
        reconstruct the issue from incomplete steps, infer expected behaviour from a vague
        description and guess at severity from tone rather than an explicit rating. This is
        slower, more expensive and more likely to produce a fix that resolves the symptom rather
        than the underlying cause. Time spent writing a thorough report is almost always less
        than the time lost to an incomplete one.
      </KBP>

      <KBH2 id="anatomy-of-a-good-report">Anatomy of a good report</KBH2>

      <KBSteps
        variant="blue"
        steps={[
          {
            title: 'Title',
            body: 'A precise, factual statement of the observable problem. Not "payment issue" but "Payment confirmation screen displayed after card authorisation fails". The title should tell a reader unfamiliar with the feature exactly what behaviour to look for without opening the full report.',
          },
          {
            title: 'Environment',
            body: 'The version, platform, browser, operating system and any other configuration required to reproduce the issue. A defect that only occurs on iOS 17 in Safari cannot be reproduced in Chrome on Windows. Missing environment information is one of the most common reasons valid defects are closed as cannot reproduce.',
          },
          {
            title: 'Steps to reproduce',
            body: 'Numbered, specific and minimal. Each step should describe exactly what action to take, not what you were trying to achieve. The goal is to allow someone who has never used the feature to reproduce the defect from the steps alone, without prior knowledge.',
          },
          {
            title: 'Expected result',
            body: 'What the system should have done, based on the specification, design documentation or reasonable user expectation. The expected result is not an opinion; it is a reference point against which the actual behaviour is measured.',
          },
          {
            title: 'Actual result',
            body: 'What the system did instead. This should describe observable behaviour, not inferred cause. "An error message appears" is a description. "The API is returning a 500 because the session token expires" is a diagnosis, which belongs in comments rather than the actual result field.',
          },
          {
            title: 'Severity and priority',
            body: 'How serious is the impact and how urgently does it need to be addressed? These are distinct assessments and are covered separately below.',
          },
          {
            title: 'Evidence',
            body: 'Screenshots, screen recordings, network traces, browser console output and log excerpts. Evidence removes ambiguity and frequently contains diagnostic information that the tester may not have noticed at the time. A recording that captures the moment a defect occurs is often more useful to a developer than a written description.',
          },
        ]}
      />

      <KBH2 id="example-bug-report">An example report</KBH2>

      <KBP>
        The fields above applied to a real scenario. This is what a well-formed report looks like
        in practice.
      </KBP>

      {/* ── Bug report card ─────────────────────────────────── */}
      <div className="my-6 border border-bg-border rounded-card overflow-hidden">

        {/* Header: ID + badges */}
        <div className="flex flex-col gap-2 px-4 py-3 border-b border-bg-border bg-bg-base">
          <span className="font-mono text-[11px] text-text-muted">BUG-1042</span>
          <div className="flex flex-wrap gap-2">
            <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border bg-[#0AFF9D]/10 text-[#0AFF9D] border-[#0AFF9D]/20">
              Open
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border bg-rose-500/10 text-rose-400 border-rose-500/20">
              Critical
            </span>
            <span className="font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border bg-[#F5A623]/10 text-[#F5A623] border-[#F5A623]/20">
              High priority
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="px-4 py-3 border-b border-bg-border">
          <p className="font-display font-semibold text-[15px] text-text-primary leading-snug">
            Payment confirmation screen shown after failed card authorisation
          </p>
        </div>

        {/* Environment */}
        <div className="px-4 py-3 border-b border-bg-border">
          <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-1.5">
            Environment
          </p>
          <p className="text-text-secondary text-[13px]">
            Chrome 124 &nbsp;·&nbsp; macOS 14.3 &nbsp;·&nbsp; v2.4.1-staging
          </p>
        </div>

        {/* Steps to reproduce */}
        <div className="px-4 py-3 border-b border-bg-border">
          <p className="font-mono text-[10px] tracking-widest uppercase text-text-muted mb-2">
            Steps to reproduce
          </p>
          <ol className="space-y-1.5">
            {[
              'Sign in as a standard user account.',
              'Add any item to the cart and proceed to checkout.',
              'Enter card number 4000 0000 0000 0002 (triggers a decline response).',
              'Submit the payment form.',
            ].map((step, i) => (
              <li key={i} className="flex gap-2.5 text-[13px] text-text-secondary leading-relaxed">
                <span className="font-mono text-text-muted flex-shrink-0 select-none">{i + 1}.</span>
                {step}
              </li>
            ))}
          </ol>
        </div>

        {/* Expected / Actual — side by side on sm+ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 border-b border-bg-border">
          <div className="px-4 py-3 sm:border-r border-b sm:border-b-0 border-bg-border">
            <p className="font-mono text-[10px] tracking-widest uppercase text-[#0AFF9D]/70 mb-1.5">
              Expected
            </p>
            <p className="text-text-secondary text-[13px] leading-relaxed">
              An error message is displayed informing the user the card was declined.
              The user remains on the payment screen and can re-enter their details.
            </p>
          </div>
          <div className="px-4 py-3">
            <p className="font-mono text-[10px] tracking-widest uppercase text-rose-400/70 mb-1.5">
              Actual
            </p>
            <p className="text-text-secondary text-[13px] leading-relaxed">
              The payment confirmation screen is shown as though the transaction succeeded.
              No error is displayed and no order record is created.
            </p>
          </div>
        </div>

        {/* Footer: meta + attachments */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-2.5 bg-bg-base">
          <div className="flex flex-wrap gap-4 font-mono text-[11px] text-text-muted">
            <span>Reporter: <span className="text-text-secondary">QA Engineer</span></span>
            <span>Assignee: <span className="text-text-secondary">Unassigned</span></span>
          </div>
          <span className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted">
            <Paperclip size={11} />
            2 attachments
          </span>
        </div>

      </div>

      <KBH2 id="reproducibility">Reproducibility</KBH2>

      <KBP>
        The single most valuable property of a bug report is reproducibility. A defect that can
        be consistently reproduced can be consistently fixed. A defect that is intermittent or
        depends on conditions that are difficult to establish reliably may never be addressed,
        not because developers do not want to fix it but because they cannot reliably observe it.
      </KBP>

      <KBP>
        When investigating a potential defect, testers should attempt to isolate the minimum
        conditions required to produce it before writing the report. Reducing the steps, varying
        the inputs and testing with different accounts or data configurations all help to
        establish what is actually causing the behaviour. A defect reproduced in three steps is
        significantly easier to fix than the same defect buried in twenty.
      </KBP>

      <KBP>
        When a defect is genuinely intermittent, the report should say so explicitly and provide
        as much context as possible: how often it occurs under what conditions, what the tester
        has already tried in order to isolate it and what varies between occurrences. Intermittent
        defects are harder to diagnose than consistent ones, and a report that acknowledges this
        honestly is more useful than one that presents uncertain reproduction as certain.
      </KBP>

      <KBH2 id="severity-and-priority">Severity and priority</KBH2>

      <KBNote variant="warning">
        Severity and priority are not the same thing, and conflating them produces poor triage
        decisions. Severity describes the impact on the system: how badly does the defect affect
        functionality, data or safety? Priority describes how urgently it should be addressed
        relative to other work. A cosmetic issue on the login page of a consumer product may be
        low severity but high priority because thousands of users see it every day. A data
        corruption defect in a rarely accessed admin function may be high severity but lower
        priority if the exposure is narrow. Both dimensions need to be assessed independently for
        triage to work correctly.
      </KBNote>

      <KBP>
        Common severity levels are critical (system unusable or data loss), major (significant
        functionality broken with no workaround), minor (functionality impaired but a workaround
        exists) and trivial (cosmetic or low-impact issues). Different organisations use different
        labels but the principle is consistent: severity is a measure of impact, not urgency.
      </KBP>

      <KBH2 id="evidence-and-context">Evidence and context</KBH2>

      <KBH3>Choosing the right evidence</KBH3>
      <KBP>
        Effective evidence does not require specialist tools. A screen recording made with the
        platform's built-in capture, a browser console screenshot showing a JavaScript error and
        a network request copied from the developer tools are often sufficient to give a developer
        everything they need. The goal is to provide material that reduces the time required to
        diagnose the defect, not to produce a comprehensive document.
      </KBP>

      <KBH3>Context beyond the obvious</KBH3>
      <KBP>
        Session context is frequently the difference between a defect that can be reproduced and
        one that cannot. Was the tester using a specific user role or permission level? Was there
        particular test data involved? Had they performed an unusual action earlier in the same
        session that might have affected the state of the system? Any of these can be the detail
        that unlocks reproduction.
      </KBP>

      <KBP>
        The habit of noting context as you test, rather than reconstructing it after finding a
        defect, makes reports significantly stronger. Many intermittent or hard-to-reproduce
        defects turn out to be entirely consistent once the relevant preconditions are understood.
        Capturing those conditions at the moment of discovery, before the session moves on, is
        one of the most useful disciplines a manual tester can develop.
      </KBP>
    </>
  )
}

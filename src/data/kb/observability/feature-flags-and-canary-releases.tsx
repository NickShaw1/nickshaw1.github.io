import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import KBSteps from '../../../components/kb/KBSteps'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function FeatureFlagsAndCanaryReleases() {
  return (
    <>
      <KBP>
        Feature flags and canary releases are techniques for controlling the exposure of new
        functionality to users, separating the act of deploying code from the act of releasing
        it. Rather than shipping a feature to all users simultaneously and relying entirely on
        pre-production testing to confirm its safety, these approaches allow teams to expose
        new behaviour incrementally, observe how it performs and roll back quickly if problems
        emerge. For QA engineers, understanding these techniques changes both the testing
        strategy and the definition of done: testing does not end when code is merged, and
        quality signals from controlled production exposure are part of the release validation.
      </KBP>

      <KBH2 id="feature-flags">Feature flags</KBH2>

      <KBP>
        A feature flag (also called a feature toggle or feature switch) is a conditional in
        the code that controls whether a block of functionality is active. The condition is
        evaluated at runtime against a configuration value, which can be changed without
        redeploying the application. This means new code can be deployed to production in a
        disabled state, enabled for a subset of users (internal testers, a specific beta group
        or a percentage of traffic) and ultimately enabled for everyone once confidence is
        established.
      </KBP>

      <KBH3>Types of flag</KBH3>

      <KBP>
        There are four main categories, though teams often blend them and some platforms
        define additional variants.
      </KBP>

      <KBSteps variant="blue" steps={[
        {
          title: 'Release flags',
          body: 'Control the gradual rollout of a feature. Temporary by nature, they should be removed once the feature has reached full availability.',
        },
        {
          title: 'Experiment flags',
          body: 'Gate A/B tests and multivariate experiments, enabling different variants for different user segments.',
        },
        {
          title: 'Ops flags',
          body: 'Control operational behaviour such as circuit breakers or performance-sensitive code paths. These may be permanent, acting as kill switches that can be toggled in response to production conditions.',
        },
        {
          title: 'Permission flags',
          body: 'Expose functionality to specific user roles or tiers. Typically long-lived, they are not tied to a feature rollout but to ongoing access control.',
        },
      ]} />

      <KBH3>Testing with flags</KBH3>

      <KBP>
        Feature flags introduce complexity into the test matrix. A feature that can be on or
        off means that both states need testing, and a suite of flags creates a combinatorial
        space that is impractical to cover exhaustively. The practical approach is to test the
        default production state (which flags will be active for which users at release), to
        test explicitly flag-on and flag-off scenarios for the flags that carry the most risk
        and to keep flag lifecycles short so the matrix does not grow indefinitely.
      </KBP>

      <KBAside label="Remove flags promptly" variant="gold">
        A flag that is never removed becomes permanent complexity in the codebase. Code paths
        guarded by old flags accumulate technical debt, and the assumptions behind them can
        become incorrect as the code around them evolves. Treating flag removal as part of
        the work of a feature, with a ticket and a timeline, keeps the codebase clean and
        the test matrix manageable.
      </KBAside>

      <KBH2 id="canary-releases">Canary releases</KBH2>

      <KBP>
        A canary release routes a small proportion of production traffic (typically one to five
        percent) to the new version of a service while the majority of traffic continues to
        go to the current version. The new version is observed under real production load:
        its error rate, response time and resource usage are compared against the current
        version. If the canary shows degraded behaviour, traffic is shifted back to the current
        version with minimal user impact. If it performs well, the proportion is gradually
        increased until the new version is serving all traffic.
      </KBP>

      <KBP>
        Canary releases are a form of production testing. They expose the new version to real
        user behaviour, real data distributions and real infrastructure conditions in a way that
        no pre-production test environment can fully replicate. Edge cases that only appear with
        specific combinations of user data, usage patterns or infrastructure load will surface
        in a canary that would not surface in a test environment, even a comprehensive one.
      </KBP>

      <KBH3>Blue-green deployments</KBH3>

      <KBP>
        A blue-green deployment maintains two production environments (blue and green) and
        switches all traffic from one to the other at release time. Unlike a canary, which
        gradually shifts traffic, a blue-green deployment shifts all traffic at once. The
        previous environment remains available and traffic can be switched back quickly if
        the new deployment has problems. Blue-green deployments are simpler to implement
        than canary releases but offer less protection against issues that only emerge under
        partial load, since there is no gradual exposure phase.
      </KBP>

      <KBH2 id="qa-in-a-progressive-delivery-model">QA in a progressive delivery model</KBH2>

      <KBP>
        In organisations that use feature flags and canary releases as standard practice, the
        quality role extends beyond the pull request. Monitoring the canary, reviewing error
        tracking after a flag is enabled for a new cohort, and defining the metrics that would
        indicate a problem are all quality activities. The question is not only whether the
        feature passed testing before deployment but whether production is behaving as expected
        after exposure.
      </KBP>

      <KBNote variant="green">
        Define the success and failure criteria for a canary or flag rollout before it begins,
        not after. Deciding in advance what error rate, latency increase or user-facing signal
        would trigger a rollback removes ambiguity from the decision when the canary is live
        and under pressure. Treating this definition as part of the release plan brings it
        into the same conversation as the pre-production test plan.
      </KBNote>
    </>
  )
}

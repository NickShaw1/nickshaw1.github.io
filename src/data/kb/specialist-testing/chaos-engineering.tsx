import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function ChaosEngineering() {
  return (
    <>
      <KBP>
        Chaos engineering is the practice of deliberately introducing failures and adverse
        conditions into a system to discover how it responds, validate the resilience of its
        design and build confidence that it can survive the unpredictable events that occur in
        production. The discipline emerged from the observation that complex distributed systems
        fail in ways that are impossible to predict through conventional testing. Rather than
        waiting for failures to happen in production and learning from them reactively, chaos
        engineering surfaces failures proactively in a controlled way, on the team's terms
        rather than the system's.
      </KBP>

      <KBH2 id="the-core-principle">The core principle</KBH2>

      <KBP>
        Chaos engineering is founded on a straightforward idea: if a system cannot survive a
        dependency failing, it will fail when that dependency fails in production. Production
        dependencies fail. Disks fill up. Network connections drop. Third-party services become
        unavailable. Database replicas fall behind their primary. Instances run out of memory
        and are restarted. Any of these events can cause a system with no resilience mechanisms
        to fail entirely, even if every individual component is working correctly under normal
        conditions.
      </KBP>

      <KBP>
        The purpose of chaos engineering is not to break things for its own sake but to discover
        failure modes before users do. A controlled experiment that reveals a cascading failure
        across three services when a single database times out is valuable information. The same
        cascade discovered through a production incident is a significantly more expensive lesson.
      </KBP>

      <KBH2 id="designing-experiments">Designing experiments</KBH2>

      <KBP>
        A chaos experiment begins with a hypothesis: a statement about how the system should
        behave when a specific failure is introduced. A well-formed hypothesis might be: when
        the recommendation service becomes unavailable, the checkout journey should complete
        normally with a fallback product list, and error rates across unaffected services should
        remain within normal bounds.
      </KBP>

      <KBP>
        Define the steady state before the experiment. Steady state is a set of measurable
        metrics (error rate, response time, throughput) that describe normal system behaviour.
        These metrics are monitored throughout the experiment. If the system returns to steady
        state after the failure is introduced and removed, the hypothesis holds. If it does not,
        the experiment has revealed something worth investigating.
      </KBP>

      <KBH3>Types of failure to introduce</KBH3>

      <KBP>
        Common chaos experiments include terminating instances or pods to test auto-recovery,
        introducing network latency between services to expose timeout and retry behaviour,
        saturating CPU or memory on specific nodes to test resource contention handling,
        disrupting DNS resolution to test service discovery resilience and causing a downstream
        dependency to return errors or slow responses. The choice of experiment depends on
        which failure modes are most plausible given the system's architecture and dependencies.
      </KBP>

      <KBAside label="Start in staging, not production" variant="gold">
        Chaos engineering in production is the most informative environment but carries real
        risk if the system is not resilient. Most teams begin in staging or a dedicated chaos
        environment, building confidence in both the system's resilience and their own ability
        to run experiments safely before moving to production. Some mature organisations run
        limited chaos experiments in production continuously; this is a goal to work towards,
        not a starting point.
      </KBAside>

      <KBH2 id="gamedays-and-runbooks">GameDays and runbooks</KBH2>

      <KBP>
        A GameDay is a structured exercise in which a team deliberately runs chaos experiments
        and responds to the failures as a team, using production-like conditions. The goal is
        not just to test the system but to test the team's ability to detect, understand and
        respond to failures. GameDays reveal gaps in monitoring (failures that went undetected
        until someone manually checked), gaps in runbooks (documented response procedures that
        turned out to be incorrect or incomplete) and gaps in the team's knowledge of how the
        system behaves under failure.
      </KBP>

      <KBP>
        Runbooks, or playbooks, are step-by-step guides for responding to known failure
        scenarios. Chaos experiments are an effective way to validate them: a runbook that has
        never been tested against a real failure may contain assumptions that prove incorrect
        when the failure actually occurs. Running a GameDay against a documented failure scenario
        and following the runbook reveals quickly whether the runbook is accurate and whether
        the team can execute it under pressure.
      </KBP>

      <KBH2 id="tooling">Tooling</KBH2>

      <KBP>
        Several tools support the practical execution of chaos experiments. Chaos Monkey,
        originally developed at Netflix, randomly terminates instances in a cloud environment
        to verify that the system survives instance loss. Chaos Toolkit provides a framework
        for defining experiments as code and integrates with cloud providers and Kubernetes.
        AWS Fault Injection Simulator and similar managed services allow controlled fault
        injection without requiring custom tooling.
      </KBP>

      <KBNote variant="blue">
        Chaos engineering is most effective in systems that already have good observability:
        meaningful metrics, structured logging and distributed tracing. Without these, it is
        difficult to determine the steady state, detect when the system has left it or understand
        the root cause of a failure surfaced by an experiment. Invest in observability before
        investing heavily in chaos experiments.
      </KBNote>
    </>
  )
}

import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function TestingAiAgents() {
  return (
    <>
      <KBP>
        AI agents are systems that use a language model to reason and plan, then take actions
        in pursuit of a goal: calling external APIs, executing code, reading and writing files
        or interacting with other services. Unlike a prompt-response interaction, an agent
        may take many steps, branch based on intermediate results and interact with multiple
        external systems before producing a final output. Testing these systems is harder than
        testing either conventional software or isolated LLM calls, because agents combine the
        non-determinism of language models with the state and side effects of real-world actions.
      </KBP>

      <KBH2 id="what-makes-agents-different">What makes agents different</KBH2>

      <KBP>
        An agent's behaviour emerges from the interaction of a language model, a set of
        available tools and the results of previous steps in the same run. The model decides
        which tool to call, with what arguments, based on its interpretation of the goal and
        the current context. Small differences in the model's interpretation at one step
        propagate through subsequent steps, which means the overall behaviour of an agent
        run is less predictable than the behaviour of a single model call.
      </KBP>

      <KBP>
        Agents also produce side effects. An agent with access to email, database writes,
        file system operations or external APIs can take actions that are difficult or
        impossible to reverse. Testing must account for these side effects both to prevent
        them from occurring unintentionally during test execution and to verify that the agent
        handles them correctly in production conditions.
      </KBP>

      <KBH3>Multi-step complexity</KBH3>

      <KBP>
        Each additional step an agent takes multiplies the number of paths through which the
        run can proceed. An agent that makes three tool calls in sequence, where each call
        could succeed, fail or return an unexpected result, has a large space of possible
        execution paths. Covering this space exhaustively is not feasible; testing must focus
        on the paths that carry the most risk, including the failure paths that are most likely
        to cause harmful or incorrect behaviour.
      </KBP>

      <KBH2 id="testing-tool-use">Testing tool use and function calling</KBH2>

      <KBP>
        Each tool the agent can call is a software function and should be tested independently
        of the agent, using conventional unit and integration tests. A tool that queries a
        database, calls an external API or transforms data has its own correctness requirements
        that can be verified without involving the agent at all. Defects in the tools are much
        cheaper to find at this level than through full agent runs.
      </KBP>

      <KBP>
        Tool call verification tests whether the agent selects the correct tool and constructs
        the correct arguments for a given scenario. Given a specific task and context, does
        the agent call the search tool before the write tool? Does it pass the user's specified
        date in the format the API expects? These are behavioural tests of the agent's
        decision-making, separate from whether the tool implementation is correct.
      </KBP>

      <KBP>
        Error handling tests verify that the agent responds appropriately when a tool fails.
        Does it retry with modified arguments? Does it fall back to an alternative approach?
        Does it surface a clear, useful error rather than silently continuing with incomplete
        information? Fault injection, the practice of deliberately returning errors, timeouts
        and malformed responses from tools, is the primary technique for testing these paths.
      </KBP>

      <KBNote variant="warning">
        Agents with access to write operations such as sending emails, modifying database
        records, deleting files or posting to external services require explicit testing of
        their guardrails. Verify that the agent does not invoke destructive or irreversible tools
        without the appropriate confirmation step, and that it correctly identifies when a
        requested action is outside the scope of what it is permitted to do. These tests
        should be run in isolated environments where side effects cannot reach production
        systems.
      </KBNote>

      <KBH2 id="non-determinism-and-reliability">Non-determinism and reliability</KBH2>

      <KBP>
        An agent run is non-deterministic: running the same task twice may produce different
        sequences of tool calls and, in some cases, different final outputs. Testing must
        account for this rather than treating any variation between runs as a failure. The
        relevant question is whether the agent reliably achieves the intended goal, not
        whether it takes the identical path each time.
      </KBP>

      <KBP>
        Reliability testing measures the success rate of a given task across multiple runs.
        An agent that succeeds on 60% of attempts at a representative task is not production-ready
        even if those successful runs produce excellent results. Establishing a minimum
        acceptable success rate and testing against it on a representative set of tasks is
        a more meaningful quality signal than verifying any individual run.
      </KBP>

      <KBP>
        Flakiness in agents, meaning runs that occasionally take a wrong branch, loop
        indefinitely or fail to use an available tool, is a first-class quality concern rather than an
        acceptable quirk of non-determinism. Systematic flakiness on a class of input is a
        signal of a defect in the agent's reasoning, the tool interface or the prompt, and
        should be investigated rather than tolerated.
      </KBP>

      <KBH2 id="observability-for-agents">Observability for agents</KBH2>

      <KBP>
        Diagnosing why an agent failed requires a structured trace of the run: each reasoning
        step the model took, the tool it selected, the arguments it passed, the result it
        received and how it interpreted that result before deciding on the next step. Without
        this trace, debugging an agent failure means attempting to reproduce the exact run
        conditions and hoping the agent takes the same path again. Tracing is not optional;
        it is a prerequisite for operating agents in production.
      </KBP>

      <KBAside label="Cost is a quality metric for agents" variant="blue">
        Multi-step agents can make many language model calls and tool invocations within a
        single task. Tracking per-task token usage, number of model calls and number of tool
        invocations is both a cost management concern and a quality signal. An agent that is
        taking significantly more steps than expected to complete a task is either encountering
        unexpected difficulty or is stuck in a loop. Cost metrics can surface behavioural
        problems that would not appear in a straightforward success or failure signal.
      </KBAside>

      <KBP>
        Alerting on patterns of failure rather than individual failures helps distinguish
        random non-determinism from systematic defects. An agent that consistently fails on
        inputs containing a particular date format, or on tasks that require more than four
        sequential tool calls, is exhibiting a repeatable problem that needs investigation.
        Aggregating failure logs by input characteristics is the first step in identifying
        these patterns.
      </KBP>
    </>
  )
}

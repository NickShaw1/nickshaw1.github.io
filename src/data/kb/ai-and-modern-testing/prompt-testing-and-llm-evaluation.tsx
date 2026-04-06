import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function PromptTestingAndLlmEvaluation() {
  return (
    <>
      <KBP>
        Testing a system that uses a large language model presents challenges that have no
        direct analogue in conventional software testing. The outputs are generative, variable
        and often impossible to evaluate mechanically against a single correct answer. A small
        change to a prompt can significantly alter the model's behaviour across a wide range
        of inputs in ways that are not immediately obvious. Effective evaluation requires a
        combination of automated checks, purpose-built infrastructure and human review —
        none of which replaces the others.
      </KBP>

      <KBH2 id="the-evaluation-challenge">The evaluation challenge</KBH2>

      <KBP>
        LLM outputs are rarely right or wrong in a binary sense. They exist on a spectrum
        of quality, relevance, accuracy and appropriateness that varies by task and context.
        The same prompt given to the same model twice may produce different outputs; evaluation
        must account for this non-determinism rather than treating any variation as a failure.
      </KBP>

      <KBP>
        Ground truth is harder to establish than in conventional software testing. For a
        classification or extraction task there may be a definitive correct answer. For a
        summarisation, a drafting or an explanation task, a reference answer is one of
        several valid responses, and the question of whether the model's output is good
        enough is inherently a matter of judgement.
      </KBP>

      <KBP>
        Evaluation criteria are often subjective: is this response helpful? Is it
        appropriately concise? Does it match the expected tone? Defining those criteria
        precisely enough to evaluate consistently is itself a substantial piece of work. Vague
        criteria produce inconsistent evaluations, which makes it impossible to detect whether
        a prompt change has improved or degraded the system.
      </KBP>

      <KBH2 id="prompt-testing-strategies">Prompt testing strategies</KBH2>

      <KBP>
        For tasks that have correct answers, equivalence checking is the most direct approach:
        the model's output should match a known reference regardless of surface-level variation.
        Extracting a specific date from a document, classifying a sentiment into one of three
        categories or returning a structured JSON object with specific fields are all tasks
        where exact or near-exact matching is appropriate.
      </KBP>

      <KBP>
        For tasks where exact matching is too strict, embedding-based semantic similarity
        provides a quantitative signal. The model's output is embedded and compared against
        a reference output using cosine similarity; outputs above a similarity threshold pass.
        This approach captures paraphrasing and minor variation without penalising outputs
        that are semantically equivalent but differ in wording.
      </KBP>

      <KBP>
        Constraint checking tests whether the output satisfies specific requirements regardless
        of its exact content: is the output within the specified length range? Does it contain
        the required disclaimer text? Is it written in the requested language? Does it avoid
        terms that are on an exclusion list? These structural constraints are often more
        tractable to automate than quality assessment and catch a distinct class of failures.
      </KBP>

      <KBH3>Negative and adversarial testing</KBH3>

      <KBP>
        Prompts designed to elicit harmful, inaccurate or off-topic responses test the
        system's guardrails and should be a deliberate part of the evaluation suite. Jailbreak
        attempts, inputs that try to extract the system prompt, requests that probe the model's
        handling of sensitive topics and inputs that test for hallucination on verifiable
        factual claims all belong in a systematic negative test set.
      </KBP>

      <KBH2 id="building-an-eval-suite">Building an eval suite</KBH2>

      <KBP>
        An eval suite is a curated collection of inputs paired with expected outputs, expected
        properties or evaluation criteria. It is the closest equivalent in LLM development
        to a test suite in conventional software: a structured set of cases that collectively
        represent the expected behaviour of the system and that can be run after any change
        to verify that behaviour is maintained.
      </KBP>

      <KBP>
        The inputs in the suite should cover: representative typical cases, edge cases that
        have been observed to cause problems, adversarial inputs that probe guardrails and
        cases that test specific capabilities the system is intended to have. A suite composed
        only of typical cases will not detect failures in the tail of the input distribution,
        which is often where the most significant quality problems lie.
      </KBP>

      <KBP>
        Evaluation functions determine how each case is assessed. Options include exact match,
        string contains, regex match, embedding similarity and LLM-as-judge, which uses a
        second language model to score the quality of the output against defined criteria. LLM-as-judge
        has become a standard approach for subjective quality evaluation because it can produce
        consistent ratings at scale for tasks that would be impractical to evaluate manually
        across hundreds of cases.
      </KBP>

      <KBAside label="Treat evals as code" variant="gold">
        An eval suite is a software artefact that needs the same maintenance discipline as
        any other code. Eval cases go stale as the system evolves, new coverage gaps emerge
        as the product's capabilities expand and evaluation functions need updating as the
        criteria for success change. An eval suite that is never updated eventually measures
        the wrong thing. Assigning ownership and reviewing the suite on a regular schedule
        prevents this.
      </KBAside>

      <KBH2 id="regression-testing-for-prompts">Regression testing for prompts</KBH2>

      <KBP>
        Prompt changes are changes to the system and should be treated with the same discipline
        as code changes. This means version control, review, and a regression test run before
        the change is deployed. A prompt change that improves performance on the target cases
        while degrading performance on others is a net regression, and detecting that requires
        running the full eval suite rather than testing only the cases the change was intended
        to address.
      </KBP>

      <KBP>
        Tracking metrics over time across a consistent eval set provides a longitudinal quality
        signal. A system whose quality score has declined by five percent over the past two
        months, through a series of individually small prompt adjustments, model version
        changes or infrastructure changes, has a quality problem that would not be visible
        from any single evaluation but is clear from the trend.
      </KBP>

      <KBP>
        Model version changes require particular attention. When the underlying model is
        updated by the provider, the system's prompts may behave differently even without
        any change to the prompt text itself. Running the full eval suite against a new
        model version before it is deployed to production is the equivalent of running
        regression tests after a dependency upgrade.
      </KBP>

      <KBNote variant="blue">
        LLM-as-judge evaluation is a practical approach to scaling quality assessment but
        has its own failure modes. The judge model has its own biases, preferring longer
        responses, responses that match its own style and responses that confidently assert
        rather than hedge. Calibrate the judge model's ratings against human annotation on
        a sample of cases, and monitor whether its assessments remain consistent as the judge
        model itself is updated over time.
      </KBNote>
    </>
  )
}

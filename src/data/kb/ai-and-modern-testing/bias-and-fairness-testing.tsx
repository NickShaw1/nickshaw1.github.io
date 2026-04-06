import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function BiasAndFairnessTesting() {
  return (
    <>
      <KBP>
        Bias in ML systems is not a hypothetical ethical concern; it is a quality defect that
        causes real harm and, in regulated contexts, legal liability. A model that performs
        differently across demographic groups is not a neutral tool applying consistent
        standards; it is applying different standards to different people in consequential
        decisions about credit, employment, healthcare or insurance. Testing for bias and
        fairness is a distinct discipline within ML quality assurance, with its own metrics,
        methods and tooling that sit alongside but are not replaceable by conventional
        accuracy testing.
      </KBP>

      <KBH2 id="what-bias-means-in-ml">What bias means in ML systems</KBH2>

      <KBP>
        In an ML context, bias refers to a systematic error that causes a model to produce
        outputs that are skewed in a predictable, directional way for certain groups. It is
        distinct from random error: a biased model does not just perform imperfectly; it
        performs imperfectly in a consistent direction for specific subpopulations. A credit
        scoring model that systematically underestimates the creditworthiness of applicants
        from a particular demographic is biased, regardless of its overall accuracy.
      </KBP>

      <KBP>
        Bias can exist even when aggregate accuracy is high. A model that is 94% accurate
        overall may be 75% accurate for a minority subgroup if that group represents a small
        proportion of the overall population. Aggregate metrics do not surface this. The
        relevant question is not how the model performs overall but how it performs on each
        population it will affect.
      </KBP>

      <KBH2 id="sources-of-bias">Sources of bias</KBH2>

      <KBP>
        <strong>Historical bias</strong> occurs when training data reflects past human
        decisions that were themselves discriminatory. A hiring model trained on historical
        recruitment decisions from an era when a demographic group was systematically excluded
        will encode that exclusion into its predictions. The data is an accurate record of
        what happened; the problem is that what happened was biased.
      </KBP>

      <KBP>
        <strong>Representation bias</strong> arises when certain groups are underrepresented
        in training data. A facial recognition model trained primarily on one demographic
        will perform better on that demographic and worse on others, not because of any
        intentional design choice but because the training data did not represent the full
        population the model will encounter in production.
      </KBP>

      <KBP>
        <strong>Measurement bias</strong> occurs when a proxy variable used to represent a
        concept correlates with protected characteristics. Using postcode as a feature in a
        loan application model is not facially discriminatory, but postcodes correlate strongly
        with race and socioeconomic status. The model effectively learns to discriminate on
        those characteristics through the proxy.
      </KBP>

      <KBP>
        <strong>Label bias</strong> arises when human annotators bring systematically different
        judgements to labelling tasks across demographic groups. Content moderation models
        trained on human-annotated labels may encode the annotators' own biases into what the
        model classifies as harmful or benign.
      </KBP>

      <KBH3>Feedback loops</KBH3>

      <KBP>
        Bias compounds over time through feedback loops. A model trained on biased historical
        decisions generates predictions that, when acted upon, produce more biased data for
        future training cycles. A predictive policing model that concentrates enforcement
        resources in certain neighbourhoods will produce arrest data from those neighbourhoods,
        which reinforces the model's predictions in subsequent training runs. Monitoring for
        feedback loop effects is part of long-term model quality assurance.
      </KBP>

      <KBH2 id="fairness-metrics">Fairness metrics</KBH2>

      <KBP>
        There is no single universally correct definition of fairness, and some formal fairness
        definitions are mathematically incompatible with each other. The choice of metric
        must be driven by the context and the consequences of different error types.
      </KBP>

      <KBP>
        <strong>Demographic parity</strong> requires that the model produces positive outcomes
        at equal rates across groups, regardless of differences in base rates. It is appropriate
        when equal representation in outcomes is the goal but can be problematic where groups
        genuinely differ in the attribute being predicted.
      </KBP>

      <KBP>
        <strong>Equal opportunity</strong> requires that the true positive rate (the rate at
        which qualified candidates, creditworthy applicants or legitimate users are correctly
        identified) is equal across groups. This is appropriate when false negatives are the
        most costly error type and when the focus is on ensuring that qualified individuals
        are not systematically missed.
      </KBP>

      <KBP>
        <strong>Predictive parity</strong> requires that the positive predictive value (the
        probability that a positive prediction is correct) is equal across groups. This is
        appropriate in contexts where the confidence of a positive prediction needs to be
        equally reliable for all groups.
      </KBP>

      <KBP>
        <strong>Individual fairness</strong> requires that similar individuals receive similar
        predictions. This moves the focus from group-level statistics to the consistency of
        treatment for comparable cases, and is relevant in contexts where individual-level
        justice is the primary concern.
      </KBP>

      <KBAside label="No metric is neutral" variant="blue">
        Choosing a fairness metric is a value judgement, not a technical one. Different metrics
        prioritise different notions of fairness and optimising for one often worsens another.
        The choice should involve the people affected by the system's decisions, not only the
        engineers building it. Documenting which metric was chosen and why is part of responsible
        ML development.
      </KBAside>

      <KBH2 id="testing-approaches">Testing approaches</KBH2>

      <KBP>
        Disaggregated evaluation is the foundation of bias testing: compute accuracy, precision,
        recall and any other relevant metrics separately for each meaningful subgroup rather
        than only in aggregate. The subgroups to evaluate should be defined before results
        are observed, based on the protected characteristics and user populations relevant
        to the system's deployment context.
      </KBP>

      <KBP>
        Counterfactual fairness testing generates pairs of inputs that differ only in a
        protected attribute, for example an otherwise identical loan application where only
        the applicant's stated gender changes, or two otherwise identical job descriptions
        where only the pronouns differ, and verifies that the model's prediction does not
        change. Where it does change, the model is encoding the protected attribute into
        its decision.
      </KBP>

      <KBP>
        Dataset audits should be conducted before training, not after deployment. Reviewing
        the training dataset for representation across relevant subgroups, checking label
        consistency across annotators and examining the proxy variables used as features
        can identify bias sources that are much cheaper to address before training than after.
      </KBP>

      <KBP>
        Red-teaming, which involves systematically attempting to elicit biased outputs through
        adversarial inputs, is particularly useful for natural language models, where bias may manifest
        through the specific wording, framing or completion the model produces in response
        to prompts that vary a protected characteristic.
      </KBP>

      <KBNote variant="green">
        Fairlearn, AI Fairness 360 and the Google What-If Tool provide quantitative bias
        analysis frameworks with built-in implementations of common fairness metrics and
        visualisations for disaggregated evaluation. None of them makes the choice of
        appropriate metric or the interpretation of results automatic; they are tools for
        measuring what the team has decided to measure, not for deciding what fairness means
        in a given context.
      </KBNote>
    </>
  )
}

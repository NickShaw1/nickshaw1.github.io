import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function TestingAiMlSystems() {
  return (
    <>
      <KBP>
        Testing a machine learning system is fundamentally different from testing deterministic
        software. A conventional application given the same inputs produces the same outputs
        every time. An ML model given the same inputs may produce different outputs depending
        on its version, its training data and, in some inference settings, random elements
        in the generation process. The outputs may be correct or incorrect in ways that are
        not immediately obvious, and the definition of correct is often probabilistic rather
        than absolute. Testing these systems requires a different mental model, different
        tooling and a scope broader than functional testing alone.
      </KBP>

      <KBH2 id="why-ml-systems-are-different">Why ML systems are different to test</KBH2>

      <KBP>
        In a conventional system, the logic that determines output is written explicitly in
        code. It can be read, reasoned about and tested against a specification. In an ML
        system, the logic emerges from the interaction of a model architecture, training data
        and a training process. The model is a learned artefact, not written logic. Its
        behaviour in edge cases is discovered empirically rather than derived from a
        specification.
      </KBP>

      <KBP>
        There is also no single correct answer for many ML tasks. A spam classifier need
        not agree with a reference label on every email to be a good classifier; it needs
        to achieve acceptable precision and recall across a representative population of
        inputs. A recommender system that produces a slightly different ranked list on each
        call may still be producing high-quality recommendations. Testing must account for
        this probabilistic nature rather than treating any deviation from a reference output
        as a failure.
      </KBP>

      <KBH3>The model is not the system</KBH3>

      <KBP>
        The ML model lives inside an application with APIs, data pipelines, feature extraction
        code, caching layers and user interfaces, all of which need testing independently of
        the model's predictive quality. A model that performs well in isolation can be served
        through a buggy API, receive incorrectly transformed features or return results that
        the UI displays in a misleading format. System testing must cover the whole stack, not
        only the model component.
      </KBP>

      <KBH2 id="testing-the-data">Testing the data</KBH2>

      <KBP>
        Data quality is a precondition for model quality. A model trained on incorrect,
        incomplete or biased data will produce incorrect, incomplete or biased predictions,
        and no amount of model tuning can fix a fundamental data problem. Testing the data
        pipeline is not a preliminary step before the real testing begins; it is a core
        part of ML system quality assurance.
      </KBP>

      <KBP>
        Schema validation verifies that incoming data matches the expected structure and
        types. A feature that the model expects as a float arriving as a string, a required
        field that is sometimes absent or a categorical variable that has acquired new values
        not present in the training distribution: these are data quality defects that will
        silently degrade model behaviour if they are not caught at the pipeline boundary.
      </KBP>

      <KBP>
        Distribution checks verify that the statistical properties of production data remain
        consistent with the training distribution. If the distribution of a key feature shifts
        significantly between training and serving time, a form of data drift, the model
        will be operating outside the conditions it was trained on. Detecting this requires
        monitoring feature distributions in production and alerting when they deviate beyond
        acceptable bounds.
      </KBP>

      <KBP>
        For supervised models, labelling quality is a testing concern. Incorrect labels in
        training data create systematic defects in the trained model that manifest as
        consistent errors on specific subpopulations. Label auditing, which involves reviewing
        a sample of training labels for correctness and consistency, is a testing activity that should
        happen before training, not after deploying the trained model and observing its errors.
      </KBP>

      <KBH2 id="testing-model-behaviour">Testing model behaviour</KBH2>

      <KBP>
        Aggregate accuracy metrics such as precision, recall, F1 score and AUC are the core
        quantitative signal for model quality but are not sufficient on their own. A model
        that achieves 92% accuracy overall may be performing at 60% accuracy for a specific
        subgroup of users. Aggregate metrics hide per-group disparities that matter both for
        product quality and, in many contexts, for legal compliance.
      </KBP>

      <KBP>
        Slice-based evaluation disaggregates performance metrics by meaningful subgroups:
        demographic groups, device types, geographic regions, input length ranges or any
        other characteristic that might produce different model behaviour. The goal is to
        surface cases where the model performs materially worse on a subset of the population
        than on the overall distribution.
      </KBP>

      <KBAside label="Metamorphic testing for non-deterministic systems" variant="blue">
        When there is no single correct output to assert against, metamorphic testing provides
        a way to verify model behaviour through relationships rather than exact values. Define
        a property the output should satisfy, then test that property across a range of inputs.
        Increasing years of experience should not decrease a predicted salary; swapping
        gender-neutral synonyms in a job description should not change the recommended candidate
        ranking. These relationships are often more stable and meaningful than
        any specific output value.
      </KBAside>

      <KBP>
        Invariance testing applies a similar principle to inputs that are semantically equivalent.
        Two input texts that express the same intent using different words should produce the
        same classification. An address with or without a trailing full stop should produce
        the same geocoding result. Invariance tests verify that the model's predictions are
        driven by meaningful features rather than surface-level noise.
      </KBP>

      <KBH2 id="testing-the-surrounding-system">Testing the surrounding system</KBH2>

      <KBP>
        The API or service interface that exposes the model should be tested like any other
        API: response format, error handling, latency under load, rate limiting and the
        behaviour of the system when the model returns a low-confidence or null prediction.
        Fallback handling, covering what the application does when the model is unavailable
        or produces a result below a confidence threshold, is particularly important and
        often under-tested.
      </KBP>

      <KBP>
        Feature extraction and transformation code is deterministic and should be unit tested
        thoroughly. This code converts raw inputs into the feature vectors the model expects,
        and errors here affect every prediction the model makes. Normalisation, encoding and
        missing value handling all contain logic that can be verified with conventional tests.
      </KBP>

      <KBP>
        Model versioning and loading should be explicitly tested. Does the correct model
        version get loaded at startup? Can an older version be loaded quickly in the event
        of a rollback? Is the model version logged with each prediction so that production
        incidents can be correlated with the specific model in use at the time?
      </KBP>

      <KBH2 id="regression-and-drift-monitoring">Regression and drift monitoring</KBH2>

      <KBP>
        Models degrade over time as the world changes and their training data becomes stale.
        A recommendation model trained on historical purchase patterns will perform worse
        as consumer behaviour evolves. A fraud detection model trained before a new fraud
        pattern emerged will miss that pattern. This degradation is silent: the model
        continues to return predictions, but those predictions are increasingly wrong.
      </KBP>

      <KBP>
        Establishing a baseline of key model metrics at the time of release and monitoring
        for deviation over time turns model quality into an ongoing signal rather than a
        point-in-time verdict. Significant deviation from the baseline, whether in accuracy,
        in the distribution of predictions or in the distribution of input features, should
        trigger investigation.
      </KBP>

      <KBNote variant="green">
        Scheduled evaluation against a held-out test set is the ML equivalent of a regression
        test run. Running the current production model against a fixed, representative dataset
        on a regular schedule and tracking the results over time catches silent degradation
        before it reaches the threshold at which users report problems. The test set needs
        periodic review to remain representative as the product and its users evolve.
      </KBNote>
    </>
  )
}

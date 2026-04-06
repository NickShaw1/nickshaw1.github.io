import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function TestingDataPipelines() {
  return (
    <>
      <KBP>
        Data pipelines ingest, transform and deliver data across systems. They might load raw
        events from a message broker into a data warehouse, apply transformations to clean and
        enrich records, join data from multiple sources or aggregate metrics for reporting. The
        quality of a data pipeline matters enormously because downstream decisions, analyses and
        products depend on the accuracy of its output. Yet data pipelines are among the most
        under-tested components in many organisations, often lacking the unit and integration
        test coverage that application code would receive. The consequences of untested pipeline
        failures range from incorrect analytics to financial reporting errors to downstream
        services receiving corrupt data.
      </KBP>

      <KBH2 id="what-makes-pipelines-hard-to-test">What makes pipelines hard to test</KBH2>

      <KBP>
        Data pipelines present several testing challenges that are not present in standard
        application testing. They often operate on large volumes of data, making it impractical
        to use production-scale datasets in testing. They may depend on infrastructure that is
        expensive or slow to provision locally: cloud storage, distributed query engines or
        managed streaming services. They are frequently stateful, with incremental processing
        that depends on what has previously been loaded, making it difficult to establish a
        clean, known starting state. And they often run on schedules, making it difficult to
        trigger them in a way that allows fast, automated test execution.
      </KBP>

      <KBH2 id="unit-testing-transformation-logic">Unit testing transformation logic</KBH2>

      <KBP>
        The transformation logic within a pipeline is often the most important and most
        testable part of it. Transformation functions (field mappings, type conversions,
        aggregations, business rule applications) can frequently be extracted and tested in
        isolation with small datasets, without requiring the full pipeline infrastructure.
      </KBP>

      <KBP>
        A transformation test provides a small, representative input dataset, runs the
        transformation function and asserts on the exact output. Edge cases are particularly
        important: null values, empty strings, out-of-range numbers, records with missing
        fields, duplicate records and records that do not match expected patterns. These are
        the inputs most likely to cause incorrect output in production and the inputs most
        likely to be absent from a sample production dataset used for informal testing.
      </KBP>

      <KBAside label="Test with representative edge cases, not just happy-path data" variant="gold">
        A pipeline tested only against clean, well-formed sample data provides false confidence.
        Production data is almost always dirtier than test data: it contains nulls, encoding
        problems, truncated records, duplicates and values that violate assumptions made during
        design. Build edge case fixtures deliberately, including the kinds of data that are
        known to have caused or could plausibly cause problems, and make them a permanent part
        of the test suite.
      </KBAside>

      <KBH2 id="integration-and-end-to-end-pipeline-testing">Integration and end-to-end pipeline testing</KBH2>

      <KBH3>Integration tests</KBH3>

      <KBP>
        Integration tests verify that pipeline stages work correctly together and that the
        pipeline interacts correctly with its external dependencies. A test that populates a
        source database, triggers the pipeline and asserts on the state of the destination
        covers the integration between stages while using a real (but small) dataset. These
        tests are slower than unit tests and require infrastructure, but they catch failures
        that would not be visible at the unit level: schema mismatches between stages,
        incorrect configuration of connections and behaviour differences between the mocked
        and real infrastructure.
      </KBP>

      <KBH3>End-to-end pipeline tests</KBH3>

      <KBP>
        End-to-end tests run the complete pipeline from source to destination with a controlled
        dataset and verify the final output. They are the most expensive tests to run and maintain
        but provide the highest confidence that the full pipeline produces correct results. They
        should be run before significant changes are promoted to production, against an environment
        that closely mirrors production infrastructure.
      </KBP>

      <KBH2 id="data-quality-and-schema-validation">Data quality and schema validation</KBH2>

      <KBP>
        Data quality checks verify properties of the pipeline's output beyond functional
        correctness: completeness (no records dropped unexpectedly), uniqueness (no duplicates
        introduced), referential integrity (foreign keys resolve correctly) and statistical
        properties (record counts, value distributions and null rates fall within expected ranges).
        Tools such as Great Expectations and dbt's test framework provide frameworks for defining
        and running these checks as part of the pipeline execution.
      </KBP>

      <KBP>
        Schema validation catches a common category of pipeline failure: a source system
        changing its data format without coordinating with downstream pipelines. If a column is
        renamed, a type is changed or a previously populated field becomes null, a pipeline that
        was working correctly may begin producing incorrect or empty output silently. Validating
        the schema of incoming data at the pipeline's source boundary makes these failures
        explicit rather than allowing them to propagate silently to the output.
      </KBP>

      <KBNote variant="blue">
        Monitor pipeline runs in production, not just in testing. Alerting on record count
        anomalies (the pipeline loaded 10,000 records today but typically loads 500,000),
        processing duration increases and error rates catches real failures that would otherwise
        go unnoticed until a downstream consumer notices that their data looks wrong. Tests
        establish what the pipeline should do; production monitoring confirms that it continues
        to do it.
      </KBNote>
    </>
  )
}

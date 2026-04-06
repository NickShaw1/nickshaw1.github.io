import KBAside from '../../../components/kb/KBAside'
import KBNote from '../../../components/kb/KBNote'
import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'

export default function TestingServerlessFunctions() {
  return (
    <>
      <KBP>
        Serverless computing allows code to be deployed and executed without managing the
        underlying server infrastructure. Functions are triggered by events (an HTTP request,
        a message on a queue, a scheduled timer, a file upload) and run in short-lived,
        managed execution environments provided by the cloud platform. AWS Lambda, Azure
        Functions and Google Cloud Functions are the most widely used implementations. The
        serverless model simplifies operations significantly, but it introduces testing
        challenges that are specific to how functions are packaged, deployed and executed.
      </KBP>

      <KBH2 id="the-serverless-testing-challenge">The serverless testing challenge</KBH2>

      <KBP>
        Serverless functions are tightly coupled to the platform they run on. A Lambda function
        receives an event object whose structure is defined by the trigger type, uses the AWS
        SDK to call other services and returns a response in a format the platform expects.
        Testing this function in complete isolation from the platform requires understanding
        and simulating the platform's contracts. Testing it on the real platform requires
        deployment, which introduces latency into the feedback loop.
      </KBP>

      <KBP>
        Cold starts are a characteristic of serverless execution that can cause performance
        issues but are difficult to reproduce reliably in testing. A cold start occurs when
        a function is invoked after a period of inactivity and the execution environment must
        be initialised from scratch. For latency-sensitive functions, cold start behaviour
        under realistic invocation patterns is worth testing explicitly.
      </KBP>

      <KBH2 id="unit-testing-functions">Unit testing functions</KBH2>

      <KBP>
        The business logic within a serverless function should be extracted from the handler
        and tested in isolation from any platform-specific concerns. A function that receives
        an S3 event, parses the file, transforms the data and writes a result to a database
        has distinct steps that can each be tested independently: parsing logic, transformation
        logic and database writing logic. The handler itself, which receives the event and
        orchestrates these steps, can then be tested with a minimal event fixture without
        requiring a real S3 trigger or a real deployment.
      </KBP>

      <KBP>
        This separation of concerns is the most important structural decision for testable
        serverless code. Functions written as a single block of logic that mixes event parsing,
        business logic and SDK calls are difficult to test at any level below full integration.
        Separating these concerns makes each piece individually testable and makes the handler
        itself a thin orchestration layer with minimal logic of its own.
      </KBP>

      <KBAside label="Write pure functions where possible" variant="gold">
        A pure function (one that takes inputs and returns outputs without side effects)
        requires no infrastructure to test. Serverless functions that are structured as
        compositions of pure transformation functions can be tested comprehensively with
        nothing more than a test runner. The side-effecting parts (SDK calls, database
        writes, API calls) can then be isolated to specific functions and tested with
        controlled substitutes.
      </KBAside>

      <KBH2 id="integration-testing-approaches">Integration testing approaches</KBH2>

      <KBH3>Local simulation</KBH3>

      <KBP>
        Tools such as the AWS SAM CLI and the Serverless Framework's offline plugin allow
        functions to be invoked locally without deployment. They simulate the event structures
        that the real platform would provide and can invoke functions in a local environment.
        This approach provides faster feedback than deploying to the cloud, but local simulation
        is always an approximation of the real environment and may not reproduce all platform
        behaviours accurately.
      </KBP>

      <KBH3>Deployed integration tests</KBH3>

      <KBP>
        Testing against a real deployed function in a cloud environment gives the highest
        confidence that the function behaves as expected on the actual platform. This means
        deploying the function (and its dependencies) to a dedicated test environment and
        invoking it with test inputs, asserting on the outputs or side effects. The feedback
        loop is slower than local testing but the results are more trustworthy for
        platform-specific behaviour such as IAM permission enforcement, service limits and
        SDK behaviour.
      </KBP>

      <KBH2 id="common-pitfalls">Common pitfalls</KBH2>

      <KBP>
        Execution timeouts are a common failure mode that are easy to overlook in testing.
        A function that processes a small test payload in 200 milliseconds may timeout when
        processing a large production payload, particularly if it calls multiple downstream
        services. Tests should include payloads at or near the maximum expected size to verify
        that processing completes within the configured timeout.
      </KBP>

      <KBP>
        Permission errors manifest at runtime rather than at deployment time. A function that
        lacks permission to read from a specific S3 bucket or write to a specific DynamoDB
        table will fail at the point the permission is exercised. Integration tests in the
        real cloud environment will surface these failures; local simulations typically will not.
      </KBP>

      <KBNote variant="blue">
        Treat the infrastructure that hosts serverless functions as part of what needs testing.
        Infrastructure-as-code tools such as AWS CDK and Terraform allow infrastructure to
        be tested alongside application code. Verifying that the correct triggers, permissions
        and environment variables are configured as part of the deployment pipeline prevents
        a category of integration failure that application tests alone would not detect.
      </KBNote>
    </>
  )
}

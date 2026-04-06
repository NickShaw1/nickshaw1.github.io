import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBVideo from '../../../components/kb/KBVideo'

export default function PlaywrightIntroduction() {
  return (
    <>
      <KBVideo
        videoId="4-LwodVujTg"
        title="Get started with end-to-end testing: Playwright | Episode 1 - Introduction"
        caption="An introduction to Playwright from the official team"
      />

      <KBP>
        Playwright is an open-source end-to-end testing framework developed by Microsoft. It
        allows you to write automated tests that control a real web browser, navigate pages,
        interact with elements and verify that your application behaves correctly from a user's
        perspective. It was released publicly in January 2020 and has since become one of the
        most widely adopted browser automation tools in the industry.
      </KBP>

      <KBP>
        Unlike unit tests, which verify isolated functions in isolation, or integration tests,
        which verify that components connect correctly, end-to-end tests exercise the full
        application. They open a browser, load your site, click buttons, fill in forms and check
        that the right things appear on screen. Playwright automates all of this in a way that is
        fast, reliable and reproducible.
      </KBP>

      <KBH2 id="how-playwright-works">How Playwright works</KBH2>

      <KBP>
        Playwright communicates with browsers through their native automation protocols rather
        than injecting JavaScript into the page. For Chromium-based browsers it uses the Chrome
        DevTools Protocol (CDP). For Firefox and WebKit it uses browser-specific protocols that
        the Playwright team maintains directly in collaboration with those browser engines.
      </KBP>

      <KBP>
        This architecture gives Playwright low-level access to the browser. It can intercept
        network requests, emulate devices, manipulate browser contexts and observe what the
        browser is doing in real time, without the limitations that come from operating purely
        inside the page's JavaScript environment.
      </KBP>

      <KBP>
        Each test runs inside a browser context, which is an isolated session equivalent to a
        fresh incognito window. Contexts share the same browser process, making them fast to
        create, but they have completely separate cookies, storage and authentication state.
        This means tests do not bleed state into one another by default.
      </KBP>

      <KBH2 id="supported-browsers-and-languages">Supported browsers and languages</KBH2>

      <KBP>
        Playwright supports three browser engines:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li><strong className="text-text-primary">Chromium</strong>: the open-source engine that powers Google Chrome and Microsoft Edge. This is the most widely used engine and the one most representative of your users' experience.</li>
        <li><strong className="text-text-primary">Firefox</strong>: Mozilla's browser engine, included to give coverage across a distinct rendering engine and JavaScript runtime.</li>
        <li><strong className="text-text-primary">WebKit</strong>: the engine that powers Safari on macOS and iOS. Running tests against WebKit on any operating system gives you meaningful coverage of Apple's browser behaviour without needing a Mac or a physical device.</li>
      </ul>

      <KBP>
        Playwright ships official libraries for TypeScript, JavaScript, Python, Java and C#.
        TypeScript is the recommended choice and the language used throughout this guide. It
        provides autocompletion, type safety and inline documentation that make working with
        the Playwright API significantly easier, particularly when building larger test suites.
      </KBP>

      <KBH2 id="playwright-vs-alternatives">Playwright vs alternatives</KBH2>

      <KBP>
        Several browser automation tools exist. Understanding where Playwright fits helps you
        make an informed decision before committing to it.
      </KBP>

      <KBH3 id="playwright-vs-selenium">Selenium</KBH3>

      <KBP>
        Selenium is the oldest and most established browser automation framework. It uses the
        WebDriver protocol, a W3C standard, to communicate with browsers. While this makes it
        broadly compatible, it also introduces a layer of indirection that results in slower
        test execution and more complex setup. Selenium requires a separate driver executable
        for each browser, and those drivers must be kept in sync with browser versions manually
        or via a dependency manager.
      </KBP>

      <KBP>
        Playwright's native protocol communication eliminates the WebDriver layer entirely.
        Browser binaries are bundled with the framework and downloaded automatically at install
        time, removing a significant source of setup friction and version mismatch errors.
        Playwright also has built-in auto-waiting, which reduces the need for explicit waits
        that are a common source of flakiness in Selenium suites.
      </KBP>

      <KBH3 id="playwright-vs-cypress">Cypress</KBH3>

      <KBP>
        Cypress is a popular testing framework that runs inside the browser rather than
        communicating with it from outside. This gives it excellent real-time feedback and
        a polished developer experience. However, its architecture imposes some meaningful
        constraints.
      </KBP>

      <KBP>
        Cypress tests run within the same origin as the application under test, which makes
        cross-origin navigation difficult. It has limited support for multiple tabs, browser
        windows and iframes. It does not natively support Firefox or WebKit to the same degree
        as Playwright. For applications that require any of these capabilities, Playwright is
        the more suitable choice.
      </KBP>

      <KBH3 id="playwright-vs-puppeteer">Puppeteer</KBH3>

      <KBP>
        Puppeteer is a Node.js library maintained by Google that provides a high-level API for
        controlling Chrome and Chromium via CDP. Playwright grew directly out of the work done
        on Puppeteer: several members of the Playwright team previously worked on Puppeteer at
        Google before moving to Microsoft.
      </KBP>

      <KBP>
        Puppeteer is a browser control library, not a test framework. It does not include a
        test runner, assertion library, parallelism support or a reporting system. It also
        supports only Chromium-based browsers. Playwright provides all of these features out of
        the box and supports all three major browser engines, making it the more complete
        solution for testing purposes.
      </KBP>

      <KBNote variant="blue">
        The right tool depends on your context. If your team has an established Selenium suite
        that is working well, the cost of migration may not be justified. If you are starting
        a new project or your current suite has reliability problems, Playwright is worth
        serious consideration.
      </KBNote>

      <KBH2 id="when-to-use-playwright">When to use Playwright</KBH2>

      <KBP>
        Playwright is a strong choice when you need to verify user-facing behaviour across the
        full application stack: when a button click triggers an API call, updates state and
        renders new content on screen, a Playwright test can verify the entire flow in one
        pass. It is also appropriate for testing authentication flows, multi-step forms,
        file uploads and downloads, and any feature that depends on real browser behaviour such
        as local storage, cookies or service workers.
      </KBP>

      <KBP>
        Playwright is not the right tool for everything. Unit tests are faster, cheaper to
        write and more precise for verifying logic in isolation. End-to-end tests are slower
        and more expensive to maintain, so they should be reserved for the flows that matter
        most to your users. A well-balanced test suite uses Playwright for critical paths and
        relies on unit and integration tests for the bulk of its coverage.
      </KBP>

      <KBH2 id="the-official-playwright-docs">The official Playwright docs</KBH2>

      <KBP>
        The official Playwright documentation lives at{' '}
        <a
          href="https://playwright.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link/80 transition-colors duration-150"
        >
          playwright.dev
        </a>
        . It is maintained by the Playwright team at Microsoft and kept up to date with every
        release. The docs are among the best in the testing ecosystem and should be your first
        point of reference whenever this guide does not cover something in the depth you need.
      </KBP>

      <KBP>
        The docs are structured around several areas worth knowing about:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li><strong className="text-text-primary">Getting Started</strong>: installation guides for VS Code, the command line and several frameworks including Next.js and Create React App.</li>
        <li><strong className="text-text-primary">Guides</strong>: in-depth articles on specific topics including locators, assertions, authentication, network interception and parallel execution.</li>
        <li><strong className="text-text-primary">API reference</strong>: a complete reference for every class and method in the Playwright API. When you need to know the exact parameters a method accepts or what it returns, this is where to look.</li>
        <li><strong className="text-text-primary">Release notes</strong>: a detailed changelog covering every version. New locator strategies, configuration options and tooling improvements are all documented here as they ship.</li>
      </ul>

      <KBP>
        The Playwright team also publishes content on the official{' '}
        <a
          href="https://www.youtube.com/@Playwrightdev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link/80 transition-colors duration-150"
        >
          Playwright YouTube channel
        </a>
        , including feature walkthroughs, tutorial series and conference talks. Videos from
        this channel are embedded throughout this guide at the points where they are most
        relevant.
      </KBP>

      <KBP>
        For questions and community discussion, the Playwright team and wider community are
        active on the{' '}
        <a
          href="https://aka.ms/playwright/discord"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link/80 transition-colors duration-150"
        >
          official Discord server
        </a>
        . GitHub issues and discussions are also monitored by the core team and are appropriate
        for bug reports and detailed technical questions.
      </KBP>

      <KBNote variant="green">
        This guide is designed to work alongside the official docs, not replace them. Each
        article links to the relevant sections of playwright.dev where appropriate. As
        Playwright evolves, the official docs will always reflect the latest behaviour.
      </KBNote>

      <KBH2 id="what-this-guide-covers">What this guide covers</KBH2>

      <KBP>
        This guide takes you from no prior knowledge of Playwright through to advanced usage
        patterns. The articles are designed to be read in sequence, with each one building on
        the last. By the end you will have the knowledge to set up a Playwright project, write
        a maintainable test suite, run it across multiple browsers, debug failures confidently
        and integrate your tests into a CI/CD pipeline.
      </KBP>

      <KBP>
        The next article covers installation and project setup in full, starting from the
        prerequisites and walking through every step to a running test.
      </KBP>
    </>
  )
}

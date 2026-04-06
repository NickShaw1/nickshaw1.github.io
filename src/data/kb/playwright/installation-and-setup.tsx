import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBBanner from '../../../components/kb/KBBanner'
import KBSteps from '../../../components/kb/KBSteps'
import KBCode from '../../../components/kb/KBCode'
import KBVideo from '../../../components/kb/KBVideo'

export default function PlaywrightInstallationAndSetup() {
  return (
    <>
      <KBBanner variant="info">
        This article assumes no prior knowledge of Playwright, Node.js or the command line.
        Every step is covered from scratch.
      </KBBanner>

      <KBVideo
        videoId="WvsLGZnHmzw"
        title="Get Started with Playwright and VS Code (2025 edition)"
        caption="Official setup walkthrough from the Playwright team"
      />

      <KBP>
        Getting Playwright running for the first time requires a handful of tools to be
        installed on your machine. This article walks through each prerequisite, explains what
        it is and why it is needed, then covers the Playwright installation itself and the
        folder structure it creates. By the end you will have a working project and a passing
        test.
      </KBP>

      <KBH2 id="prerequisites">Prerequisites</KBH2>

      <KBP>
        Before installing Playwright you need four things: a GitHub account, Git, Node.js and
        Visual Studio Code. Each is free and each plays a distinct role.
      </KBP>

      <KBH3 id="github-account">GitHub account</KBH3>

      <KBP>
        GitHub is a platform for hosting and collaborating on code. You will use it to store
        your Playwright project and, later in this guide, to run your tests automatically on
        every push via GitHub Actions. If you do not have an account, go to{' '}
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-link hover:text-link/80 transition-colors duration-150">github.com</a>
        , click <strong>Sign Up</strong> and follow the on-screen process.
      </KBP>

      <KBH3 id="git">Git</KBH3>

      <KBP>
        Git is the version control system that GitHub is built on. It tracks changes to your
        files over time and allows you to push your code to GitHub from the command line.
        Download the latest version from{' '}
        <a href="https://git-scm.com/downloads" target="_blank" rel="noopener noreferrer" className="text-link hover:text-link/80 transition-colors duration-150">git-scm.com/downloads</a>
        {' '}and run the installer. The default options are suitable for most users.
      </KBP>

      <KBNote variant="warning">
        During installation, ensure the option to add Git to your system PATH is selected.
        This allows you to run <code>git</code> commands from any terminal window. If you skip
        this, commands will not be recognised after installation.
      </KBNote>

      <KBP>
        Once installed, verify it worked by opening a terminal and running:
      </KBP>

      <KBCode language="bash">{`git --version`}</KBCode>

      <KBP>
        You should see a version number such as <code>git version 2.44.0</code>. If you see an
        error saying the command is not recognised, Git was not added to your PATH correctly.
        Re-run the installer and ensure that option is checked.
      </KBP>

      <KBH3 id="nodejs">Node.js</KBH3>

      <KBP>
        Node.js is a runtime environment that allows JavaScript to run outside the browser.
        Playwright is a Node.js package, so Node must be installed before you can install
        Playwright. Download the <strong>LTS (Long Term Support)</strong> release from{' '}
        <a href="https://nodejs.org/en" target="_blank" rel="noopener noreferrer" className="text-link hover:text-link/80 transition-colors duration-150">nodejs.org</a>.
        The LTS version is recommended over the current release because it is stable and
        supported for an extended period. Playwright requires Node.js version 18 or higher.
      </KBP>

      <KBNote variant="warning">
        During installation, ensure the option to add Node.js to your system PATH is checked.
        This allows you to run <code>node</code> and <code>npm</code> commands from any
        terminal window.
      </KBNote>

      <KBP>
        After installation, verify both Node.js and npm (the Node package manager, which is
        installed alongside Node) are available:
      </KBP>

      <KBCode language="bash">{`node -v
npm -v`}</KBCode>

      <KBP>
        Both commands should return version numbers. If they do not, close and reopen your
        terminal and try again. Changes to the PATH environment variable sometimes require a
        fresh terminal session to take effect.
      </KBP>

      <KBH3 id="vs-code">Visual Studio Code</KBH3>

      <KBP>
        Visual Studio Code (VS Code) is a free, open-source code editor developed by
        Microsoft. It is the recommended editor for Playwright development because Microsoft
        maintains an official Playwright extension for it that integrates directly with the
        test runner. Download the latest version from{' '}
        <a href="https://code.visualstudio.com/download" target="_blank" rel="noopener noreferrer" className="text-link hover:text-link/80 transition-colors duration-150">code.visualstudio.com/download</a>.
      </KBP>

      <KBNote variant="warning">
        During installation, check the option to add VS Code to your system PATH. This lets
        you open any folder in VS Code from the terminal by running <code>code .</code>
      </KBNote>

      <KBH2 id="vs-code-extensions">VS Code extensions</KBH2>

      <KBP>
        Once VS Code is installed, add the following extensions. Open the Extensions panel
        with <code>Ctrl + Shift + X</code> (Windows/Linux) or <code>Cmd + Shift + X</code>
        (macOS) and search for each by name.
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>
          <strong className="text-text-primary">Playwright Test for VS Code</strong>: the
          official Microsoft extension. It adds a Testing panel to VS Code with test discovery,
          one-click test execution, inline pass/fail indicators, a built-in debugger and a
          locator picker that lets you click elements on a live page to generate locator code
          automatically.
        </li>
        <li>
          <strong className="text-text-primary">ESLint</strong>: flags JavaScript and
          TypeScript issues as you type, keeping your test scripts consistent and catching
          common mistakes before you run anything.
        </li>
        <li>
          <strong className="text-text-primary">Prettier</strong>: automatically formats your
          code on save. This is particularly useful on teams where consistent code style
          reduces friction during code review.
        </li>
      </ul>

      <KBNote variant="green">
        VS Code includes a built-in JavaScript and TypeScript debugger. You do not need a
        separate debugger extension. The Playwright VS Code extension builds on this built-in
        debugger to provide its stepping and breakpoint features.
      </KBNote>

      <KBH2 id="creating-a-project">Creating a project and installing Playwright</KBH2>

      <KBP>
        With the prerequisites in place, you are ready to create a Playwright project. Open a
        terminal in VS Code with <code>Ctrl + `</code> (backtick) and create a new folder for
        your project:
      </KBP>

      <KBCode language="bash">{`mkdir playwright-project
cd playwright-project`}</KBCode>

      <KBP>
        Now run the Playwright initialisation command:
      </KBP>

      <KBCode language="bash">{`npm init playwright@latest`}</KBCode>

      <KBP>
        This single command does everything: it creates a <code>package.json</code>, installs
        the <code>@playwright/test</code> package, downloads the Chromium, Firefox and WebKit
        browser binaries, and generates a <code>playwright.config.ts</code> configuration file
        along with an example test file.
      </KBP>

      <KBP>
        During setup you will be asked a small number of questions:
      </KBP>

      <KBSteps variant="green" steps={[
        {
          title: 'TypeScript or JavaScript?',
          body: 'Select TypeScript. It provides autocompletion and type checking that make working with the Playwright API much easier.',
        },
        {
          title: 'Where to put your tests?',
          body: 'Accept the default of tests/. This is the conventional location and is what the configuration file expects.',
        },
        {
          title: 'Add a GitHub Actions workflow?',
          body: 'You can select yes here, but this guide covers the workflow file in detail in the CI/CD article. Either choice is fine.',
        },
        {
          title: 'Install Playwright browsers?',
          body: 'Select yes. This downloads the Chromium, Firefox and WebKit binaries that Playwright uses to run your tests.',
        },
      ]} />

      <KBNote variant="green">
        You can also initialise a Playwright project entirely from within VS Code without using
        the terminal. Open the Command Palette with <code>Ctrl + Shift + P</code>, type
        <strong> Install Playwright</strong> and select the option. This runs the same
        initialisation process through a graphical prompt.
      </KBNote>

      <KBH2 id="folder-structure">The generated folder structure</KBH2>

      <KBP>
        After initialisation, your project folder will contain the following:
      </KBP>

      <KBCode language="text">{`playwright-project/
├── tests/
│   └── example.spec.ts
├── tests-examples/
│   └── demo-todo-app.spec.ts
├── playwright.config.ts
├── package.json
├── package-lock.json
└── .gitignore`}</KBCode>

      <KBP>
        Here is what each file and folder is for:
      </KBP>

      <ul className="my-4 space-y-4 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>
          <strong className="text-text-primary">tests/</strong>: this is where you write your
          test files. By default Playwright looks here for any file matching
          <code>**/*.spec.ts</code>. You can change the location and the pattern in the
          configuration file.
        </li>
        <li>
          <strong className="text-text-primary">tests/example.spec.ts</strong>: a generated
          example test that opens the Playwright homepage and checks the page title. You can
          run it immediately to verify your installation worked.
        </li>
        <li>
          <strong className="text-text-primary">tests-examples/demo-todo-app.spec.ts</strong>
          {' '}is a more comprehensive example testing a to-do application. It demonstrates
          a wide range of Playwright features and is useful to browse, but you do not need to
          run it as part of this guide.
        </li>
        <li>
          <strong className="text-text-primary">playwright.config.ts</strong>: the central
          configuration file for your Playwright project. It controls which browsers to run,
          where to find tests, timeouts, retry behaviour, reporters and many other options.
          The configuration article covers this file in full.
        </li>
        <li>
          <strong className="text-text-primary">package.json</strong>: the Node.js project
          manifest. It lists your project's dependencies, including
          <code>@playwright/test</code>, and defines the scripts you can run with
          <code>npm run</code>.
        </li>
        <li>
          <strong className="text-text-primary">package-lock.json</strong>: a file generated
          automatically by npm that locks your dependencies to exact versions. You should
          commit this file to version control. It ensures everyone on your team installs
          exactly the same dependency versions.
        </li>
        <li>
          <strong className="text-text-primary">.gitignore</strong>: tells Git which files
          and folders to ignore. The initialisation command adds <code>node_modules/</code>
          to this file automatically. You should not commit <code>node_modules/</code> because
          it can be very large and is fully reproducible by running <code>npm install</code>.
        </li>
      </ul>

      <KBH2 id="running-your-first-test">Running your first test</KBH2>

      <KBP>
        Run the generated example test to confirm everything is installed correctly:
      </KBP>

      <KBCode language="bash">{`npx playwright test`}</KBCode>

      <KBP>
        Playwright will discover all test files in the <code>tests/</code> folder and run them
        across all three configured browser projects: Chromium, Firefox and WebKit. The default
        output in the terminal shows a dot for each passing test and a summary at the end:
      </KBP>

      <KBCode language="text">{`Running 6 tests using 3 workers

  ✓  [chromium] › example.spec.ts:3:5 › has title (1.2s)
  ✓  [chromium] › example.spec.ts:8:5 › get started link (2.1s)
  ✓  [firefox] › example.spec.ts:3:5 › has title (1.8s)
  ✓  [firefox] › example.spec.ts:8:5 › get started link (2.4s)
  ✓  [webkit] › example.spec.ts:3:5 › has title (1.5s)
  ✓  [webkit] › example.spec.ts:8:5 › get started link (2.3s)

  6 passed (8.3s)`}</KBCode>

      <KBP>
        Six tests pass because the two tests in <code>example.spec.ts</code> are run once per
        browser project (Chromium, Firefox, WebKit). This is how Playwright handles
        multi-browser coverage by default.
      </KBP>

      <KBH3 id="the-html-report">The HTML report</KBH3>

      <KBP>
        After a test run, Playwright generates an HTML report containing detailed results for
        every test. Open it with:
      </KBP>

      <KBCode language="bash">{`npx playwright show-report`}</KBCode>

      <KBP>
        This opens a browser window showing the full report. For each test you can see its
        duration, which browser it ran on and, if it failed, a screenshot and an error message.
        The report is saved to a <code>playwright-report/</code> folder in your project root.
      </KBP>

      <KBH3 id="headed-mode">Watching the tests run</KBH3>

      <KBP>
        By default Playwright runs tests in headless mode, meaning the browser opens but is
        not visible. To watch the browser as it runs your tests, use the <code>--headed</code>
        flag:
      </KBP>

      <KBCode language="bash">{`npx playwright test --headed`}</KBCode>

      <KBP>
        This is useful early on to understand what Playwright is doing. For most day-to-day
        development you will use UI Mode (covered in the debugging article) rather than headed
        mode, as it provides a much richer view of test execution.
      </KBP>

      <KBH2 id="common-first-run-errors">Common first-run errors</KBH2>

      <KBP>
        A few errors come up regularly when setting up Playwright for the first time:
      </KBP>

      <KBH3 id="error-command-not-found">Command not found: node / npm / git</KBH3>

      <KBP>
        This means the tool is not in your PATH. Close your terminal completely, reopen it
        and try again. If the error persists, the installer did not add the tool to your PATH
        correctly. Reinstall the affected tool and ensure the PATH option is selected during
        installation.
      </KBP>

      <KBH3 id="error-browser-download">Browser download fails</KBH3>

      <KBP>
        If the browser binary download fails during <code>npm init playwright@latest</code>,
        you can trigger it manually afterwards:
      </KBP>

      <KBCode language="bash">{`npx playwright install`}</KBCode>

      <KBP>
        If you are behind a corporate proxy or firewall, the download may be blocked. Your
        network or IT team will be able to advise on how to configure npm to use the proxy.
      </KBP>

      <KBH3 id="error-port-in-use">Error: listen EADDRINUSE</KBH3>

      <KBP>
        This error means a port that Playwright is trying to use is already occupied by
        another process. Restarting your machine will typically resolve it. If it persists,
        search for the process using the port and terminate it.
      </KBP>

      <KBNote variant="green">
        The official Playwright documentation includes a dedicated troubleshooting page at{' '}
        <a
          href="https://playwright.dev/docs/troubleshooting"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link hover:text-link/80 transition-colors duration-150"
        >
          playwright.dev/docs/troubleshooting
        </a>
        {' '}which covers a wider range of installation and runtime issues.
      </KBNote>

      <KBH2 id="next-steps">Next steps</KBH2>

      <KBP>
        Your project is set up and your first tests are passing. The next article looks inside
        a test file and explains exactly what each part does, then walks through writing a
        complete test from scratch.
      </KBP>
    </>
  )
}

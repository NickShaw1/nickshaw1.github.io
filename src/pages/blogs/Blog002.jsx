import nickImage from "../../assets/header.jpg";
import { Link } from "react-router-dom";

import "../../css/Home.css";
import "../../css/Blog.css";

const Blog002 = () => {
  return (
    <div className="overview">
      <div className="blog-main">
        <div className="blog-title">
          <h1>
            Setting up Playwright in VS Code for automated testing
            <span className="nickgreen">.</span>
          </h1>
        </div>
        <div className="blog-header">
          <div className="nick-img">
            <img src={nickImage} alt="Nick" />
          </div>
          <div className="date">
            <div className="date-img">
              <div className="date-img1">
                <svg
                  stroke="#eaeceb "
                  fill="#eaeceb"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1.5em"
                  width="1.5em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M7 11H9V13H7zM7 15H9V17H7zM11 11H13V13H11zM11 15H13V17H11zM15 11H17V13H15zM15 15H17V17H15z"></path>
                  <path d="M5,22h14c1.103,0,2-0.897,2-2V8V6c0-1.103-0.897-2-2-2h-2V2h-2v2H9V2H7v2H5C3.897,4,3,4.897,3,6v2v12 C3,21.103,3.897,22,5,22z M19,8l0.001,12H5V8H19z"></path>
                </svg>
              </div>
              <div className="date-img2">
                <p>12th December, 2024</p>
              </div>
            </div>
            <p>
              <Link to="/contact">Nick</Link>
            </p>
          </div>
        </div>
      </div>
      <div className="blog-container">
        <p>
          This is a guide on setting up Playwright for test automation using VS
          Code, covering the installation of essential tools like Node.js, VS
          Code, and necessary extensions, along with configuring and running
          Playwright tests.
        </p>
        <h2>Step 1: Sign up for a Github account</h2>
        <p>
          Creating a GitHub account is straightforward and gives you access to a
          platform for hosting, sharing, and collaborating on code repositories.
        </p>
        <p>Follow these steps:</p>
        <p>
          1. Visit GitHub&apos;s Website: Open your browser and go to&nbsp;
          <a href="https://github.com" target="_blank">
            Github
          </a>
          .
        </p>
        <p> 2. Click &quot;Sign Up&quot;:</p>
        <p>
          3. On the homepage, locate the &quot;Sign Up&quot; button (usually in
          the top-right corner) and click it.
        </p>
        <p>4. Go through the sign up process.</p>
        <h2>Step 2: Installing VS Code</h2>
        <p>
          Getting started required setting up several tools on my machine. First
          and foremost: Visual Studio Code (VS Code).
        </p>
        <h6>But what is VS Code?</h6>
        <p>
          VS Code is a lightweight, open-source code editor developed by
          Microsoft. It&apos;s tailored for building and debugging modern web
          and cloud applications, making it an indispensable tool for developers
          and testers alike.
        </p>
        <p>
          You can download the latest version of VS Code from the&nbsp;
          <a href="https://code.visualstudio.com/download" target="_blank">
           official website
          </a>
          .
        </p>
        <p>
          {" "}
          <strong>Note</strong>: During the Visual Studio Code installation,
          check the option to add VS Code to your system&apos;s PATH. This
          enables you to open folders or files directly in VS Code from the
          terminal using the code command. Without this, you&apos;ll need to
          manually navigate to files and folders within the VS Code interface,
          which can slow down your workflow.
        </p>
        <p>
          {" "}
          <strong>Helpful Resource</strong>:
        </p>
        <p>
          If you&apos;re new to the installation process, there is an extremely
          useful YouTube channel called ProgrammingKnowledge that (among other
          things) offers a detailed walkthrough:
        </p>
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/cu_ykIfBprI?si=VXcJ16ZQjA020S1u"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <h2>Step 3: Installing Node.js</h2>
        <p>
          To set up automated testing workflows, installing Node.js is
          essential. This tool enables JavaScript to run on servers, making it
          perfect for building fast, scalable applications.
        </p>
        <h6>What is Node.js?</h6>
        <p>
          Node.js is a runtime environment that allows you to execute JavaScript
          outside the browser. It&apos;s widely used in modern development for
          everything from backend services to automation tools.
        </p>
        <p>
          To download Node.js, visit the&nbsp;
          <a href="https://nodejs.org/en" target="_blank">
            official website
          </a>
          &nbsp;to download the latest version suitable for your system.
        </p>
        <p>
          {" "}
          <strong>Helpful Resource</strong>:
        </p>
        <p>
          If you prefer visual guidance, check out this detailed tutorial from
          ProgrammingKnowledge on YouTube:
        </p>
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/06X51c6WHsQ?si=6_yZ_6sfxuXKxgbq"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <h6> Verify the installation:</h6>
        <p>
          <strong>Note</strong>: Remember to click the &apos;Add to path&apos;
          checkbox. When installing Node.js, ensure you select the option to add
          it to your system&apos;s PATH. This allows you to run node and npm
          commands from any terminal window, ensuring that your Node.js
          installation is accessible globally. Without this, your system
          won&apos;t recognize these commands outside their installation
          directory, leading to errors and disruptions in your workflow.
        </p>{" "}
        <p>
          Once installed, you can confirm Node.js is set up correctly by opening
          your terminal and running the following commands:
        </p>
        <pre>
          <code>node -v</code>
        </pre>
        <pre>
          <code>npm -v</code>
        </pre>
        <p>
          These commands will display the installed versions of Node.js and npm
          (Node Package Manager). If both return version numbers, you&apos;re
          good to go!
        </p>
        <h2>Step 4: Installing VS Code extensions</h2>
        <p>
          To maximize productivity and streamline testing workflows with
          Playwright, installing the right VS Code extensions is key. Below is a
          curated list of some extensions that I found that have been helpful.
          They&apos;re all pretty standard, but can enhance Python, JavaScript,
          and TypeScript testing in Playwright.
        </p>
        <h6>
          JavaScript, TypeScript and Python extensions for Playwright testing in
          VS Code
        </h6>
        <p>
          {" "}
          <b>1. Playwright Test for VS Code</b>
        </p>
        <p>
          Integrates Playwright into VS Code, offering features like test
          discovery, debugging, and execution directly within the editor.
        </p>
        <p>
          {" "}
          <b>2. ESLint</b>{" "}
        </p>
        <p>
          Ensures your JavaScript and TypeScript code adheres to best practices,
          which is especially helpful for maintaining high-quality Playwright
          test scripts.
        </p>
        <p>
          {" "}
          <b>3. Prettier (Code Formatter)</b>{" "}
        </p>
        <p>
          Maintains consistent code formatting across Python, JavaScript, and
          TypeScript files, which is crucial for collaborative projects.
        </p>
        <p>
          <b>4. Snippets for Playwright</b>
        </p>
        <p>
          Provides common Playwright code snippets, speeding up test script
          creation with reusable patterns.
        </p>
        <p>
          <b>5. Debugger for Chrome</b>
        </p>
        <p>
          Enables you to debug Playwright tests running in the Chromium browser,
          helping to diagnose complex browser-specific issues effectively.
        </p>
        <p>
          {" "}
          <b>6. TypeScript Hero</b>
        </p>
        <p>
          {" "}
          Enhances TypeScript development with features like automatic import
          management and navigation helpers.
        </p>
        <p>
          <strong>Note</strong>: These extensions can collectively enhance your
          coding experience, improve productivity, and ensure a smoother
          workflow when testing with Playwright in VS Code. Ultimately,
          it&apos;s down to your preferences, but these are the extensions I
          started with.
        </p>
        <h2>Step 5: Set up a new project in VS Code</h2>
        <p>
          Open a terminal in VS Code (CTRL + ~ for Windows users) and create a
          new project directory:
        </p>
        <pre>
          <code>mkdir playwright-project</code>
        </pre>
        <pre>
          <code>cd playwright-project</code>
        </pre>
        <p>Initialize the project:</p>
        <pre>
          <code>npm init -y</code>
        </pre>
        <p>
          {" "}
          This generates a package.json file to manage project dependencies.
        </p>
        <h2>Step 6: Installing and configuring Playwright</h2>
        <h6>Install Playwright</h6>
        <p>
          In the VS Code terminal, navigate to the folder where you want to set
          up your Playwright project. Then execute the following commands step
          by step:
        </p>
        <p> Install Playwright and its test runner: </p>
        <pre>
          <code>npm install -D @playwright/test</code>
        </pre>
        <p> Install browser binaries: </p>
        <pre>
          <code>npx playwright install</code>
        </pre>
        <p> Initialize Playwright with default configurations:</p>
        <pre>
          <code>npx playwright init</code>
        </pre>
        <p>
          <strong>Note</strong>: on TypeScript Configuration, by default, when
          you initialize Playwright with the npx playwright init command, it
          generates a playwright.config.ts file, which is a TypeScript file.
        </p>{" "}
        <p>
          However, Playwright fully supports both JavaScript and TypeScript, so
          if you prefer to use JavaScript, you can easily do so by renaming the
          configuration file to playwright.config.js and writing your test
        </p>
        <h6>Folder Structure</h6>
        <p>
          After initialization, Playwright creates a folder structure like this:
        </p>
        <pre>
          <code>
            playwright-project/ <br />
            ├── tests/ <br />
            ├── .gitignore <br />
            ├── playwright.config.ts (or playwright.config.js if you renamed it)
          </code>
        </pre>
        <h6>Create a test file</h6>
        <pre>
          <code>
            {`import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://example.com');
  const title = await page.title();
  expect(title).toBe('Example Domain');
});`}
          </code>
        </pre>
        <h6>Run the test file</h6>
        <ul>
          <li>
            Run the test using Playwright&apos;s CLI:
            <pre>
              <code>npx playwright test</code>
            </pre>
          </li>
          <li>
            From here, you can view results in the terminal or a generated HTML
            report:
            <pre>
              <code>npx playwright show-report</code>
            </pre>
          </li>
        </ul>
        <h2>Step 7: Alternative approach</h2>
        <p>
          If the steps above seem too complicated or confusing, you can always
          refer to the official Playwright documentation for a clear,
          step-by-step guide, found&nbsp;
          <a
            href="https://playwright.dev/docs/getting-started-vscode"
            target="_blank"
          >
            here
          </a>
          .
        </p>
        <p>
          The Playwright team is incredibly helpful, with everything clearly
          explained. They even have a video that walks you through the process.
        </p>
        <div className="video-container">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/Xz6lhEzgI5I?si=8FOWS6ajQes_CCo2"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
        <p>
          Additionally, don&apos;t be afraid to use ChatGPT, Deepseek or the
          like to get used to the process outlined above. With a bit of fiddling
          around you should be able to get everything set up without any major
          issues.
        </p>
        <h2>Conclusion</h2>
        <p>
          As long as you have VS Code and Node.js installed, with both paths
          added to your environment variables, you&apos;re well on your way to
          getting started with Playwright.
        </p>
        <p>
          A few helpful extensions, particularly the &apos;Playwright Test for
          VS Code&apos;, will enhance your workflow, making testing more
          efficient. With just a few simple terminal commands, you can quickly
          set up Playwright and begin automating tests.
        </p>
        <p>
          Don&apos;t forget to reference the helpful videos above - they provide
          valuable insights and guidance as you navigate the setup process and
          dive into the world of test automation. With some drive and practice,
          you&apos;ll be up and running in no time. It works on my machine!
        </p>
      </div>
    </div>
  );
};

export default Blog002;

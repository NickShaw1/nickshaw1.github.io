import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBCode from '../../../components/kb/KBCode'
import KBVideo from '../../../components/kb/KBVideo'
import KBSteps from '../../../components/kb/KBSteps'

export default function SettingUpTheMcpServer() {
  return (
    <>
      <KBVideo
        videoId="IixdI2bTR1g"
        title="Let AI Explore Your Site and Write Tests with Playwright MCP"
        caption="Setting up Playwright MCP and using it to explore a site and generate tests"
      />

      <KBP>
        The Playwright MCP server is an npm package that runs as a local process. Your AI
        client connects to it and uses it to control a browser. This article covers
        installing the server and connecting it to Claude Desktop, Cursor and VS Code,
        followed by a first interaction walkthrough and troubleshooting guidance for common
        setup problems.
      </KBP>

      <KBH2 id="prerequisites">Prerequisites</KBH2>

      <KBP>
        Before setting up the Playwright MCP server you need:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>Node.js 18 or later. Run <code>node --version</code> to check your version.</li>
        <li>One or more of: Claude Desktop, Cursor or VS Code with an AI extension that supports MCP.</li>
        <li>A Playwright installation in your project, or the willingness to create one. The MCP server will use your project's Playwright installation if present.</li>
      </ul>

      <KBH2 id="installing">Installing the Playwright MCP server</KBH2>

      <KBP>
        The Playwright MCP server does not need to be added to your project's dependencies.
        It is designed to be run with <code>npx</code>, which downloads and executes it
        without a permanent installation. This is how all the AI client configurations below
        invoke it.
      </KBP>

      <KBP>
        If you prefer a permanent installation, you can add it globally:
      </KBP>

      <KBCode language="bash">{`npm install -g @playwright/mcp`}</KBCode>

      <KBP>
        Or as a dev dependency in your project:
      </KBP>

      <KBCode language="bash">{`npm install --save-dev @playwright/mcp`}</KBCode>

      <KBNote variant="blue">
        Running with <code>npx</code> is generally recommended. It ensures you always use
        a recent version without needing to manage upgrades manually. If your team pins
        versions carefully, installing as a dev dependency gives you more control.
      </KBNote>

      <KBH2 id="claude-desktop">Connecting to Claude Desktop</KBH2>

      <KBP>
        Claude Desktop supports MCP servers through a configuration file. The file location
        depends on your operating system.
      </KBP>

      <KBSteps
        variant="blue"
        steps={[
          {
            title: 'Open the Claude Desktop config file',
            body: (
              <p className="text-text-secondary text-[14px] leading-relaxed">
                On macOS the file is at{' '}
                <code>~/Library/Application Support/Claude/claude_desktop_config.json</code>.
                On Windows it is at{' '}
                <code>%APPDATA%\Claude\claude_desktop_config.json</code>.
                Create the file if it does not exist.
              </p>
            ),
          },
          {
            title: 'Add the Playwright MCP server configuration',
            body: (
              <p className="text-text-secondary text-[14px] leading-relaxed">
                Add the following to the config file, creating the{' '}
                <code>mcpServers</code> object if it is not already present.
              </p>
            ),
          },
          {
            title: 'Restart Claude Desktop',
            body: (
              <p className="text-text-secondary text-[14px] leading-relaxed">
                Quit Claude Desktop completely and relaunch it. The MCP server will not be
                available until you restart.
              </p>
            ),
          },
        ]}
      />

      <KBCode language="json">{`{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}`}</KBCode>

      <KBP>
        For a headless mode (no visible browser window), add the <code>--headless</code> flag:
      </KBP>

      <KBCode language="json">{`{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest", "--headless"]
    }
  }
}`}</KBCode>

      <KBH2 id="cursor">Connecting to Cursor</KBH2>

      <KBP>
        Cursor has a built-in MCP configuration panel. You do not need to edit a JSON file
        manually.
      </KBP>

      <KBSteps
        variant="blue"
        steps={[
          {
            title: 'Open Cursor Settings',
            body: (
              <p className="text-text-secondary text-[14px] leading-relaxed">
                Open the Command Palette and search for <strong>Cursor Settings</strong>,
                or navigate to <strong>Cursor &gt; Settings &gt; Cursor Settings</strong>
                from the menu bar.
              </p>
            ),
          },
          {
            title: 'Navigate to the MCP section',
            body: (
              <p className="text-text-secondary text-[14px] leading-relaxed">
                In the settings panel, find the <strong>MCP</strong> section. It lists all
                configured MCP servers.
              </p>
            ),
          },
          {
            title: 'Add a new server',
            body: (
              <p className="text-text-secondary text-[14px] leading-relaxed">
                Click <strong>Add new MCP server</strong>. Set the type to{' '}
                <code>stdio</code>, the name to <code>playwright</code> and the command to{' '}
                <code>npx @playwright/mcp@latest</code>.
              </p>
            ),
          },
          {
            title: 'Save and reload',
            body: (
              <p className="text-text-secondary text-[14px] leading-relaxed">
                Save the settings. Cursor will start the MCP server process. You should see
                the server listed as active in the MCP panel.
              </p>
            ),
          },
        ]}
      />

      <KBP>
        Alternatively, you can edit Cursor's MCP configuration file directly. On macOS it
        is at <code>~/.cursor/mcp.json</code>:
      </KBP>

      <KBCode language="json">{`{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}`}</KBCode>

      <KBH2 id="vscode">Connecting to VS Code</KBH2>

      <KBP>
        VS Code supports MCP through GitHub Copilot's agent mode. At the time of writing,
        MCP support in VS Code is available in VS Code 1.99 and later with the GitHub
        Copilot extension installed.
      </KBP>

      <KBSteps
        variant="blue"
        steps={[
          {
            title: 'Open or create the VS Code MCP config',
            body: (
              <p className="text-text-secondary text-[14px] leading-relaxed">
                You can configure MCP servers at the workspace level in{' '}
                <code>.vscode/mcp.json</code>, or at the user level via VS Code's user
                settings. The workspace config is recommended for team projects because it
                can be committed to version control.
              </p>
            ),
          },
          {
            title: 'Add the server configuration',
            body: (
              <p className="text-text-secondary text-[14px] leading-relaxed">
                Create or edit <code>.vscode/mcp.json</code> in your workspace root.
              </p>
            ),
          },
          {
            title: 'Switch Copilot to agent mode',
            body: (
              <p className="text-text-secondary text-[14px] leading-relaxed">
                Open the Copilot Chat panel and switch the mode selector from{' '}
                <strong>Ask</strong> to <strong>Agent</strong>. MCP tools are only available
                in agent mode.
              </p>
            ),
          },
        ]}
      />

      <KBCode language="json">{`// .vscode/mcp.json
{
  "servers": {
    "playwright": {
      "type": "stdio",
      "command": "npx",
      "args": ["@playwright/mcp@latest"]
    }
  }
}`}</KBCode>

      <KBH2 id="verifying">Verifying the connection</KBH2>

      <KBP>
        Once your AI client is configured and restarted, verify the connection by asking
        the AI to perform a simple browser action. In Claude Desktop:
      </KBP>

      <KBCode>{`Navigate to https://playwright.dev and tell me the title of the page.`}</KBCode>

      <KBP>
        The AI should use the Playwright MCP server's navigation tool to open the URL and
        then report back what it finds. If the response includes the actual page title
        retrieved from the browser, the connection is working.
      </KBP>

      <KBP>
        In Cursor, open a new Composer window in agent mode and send the same prompt. You
        should see the AI call the browser navigation tool and receive a response.
      </KBP>

      <KBH2 id="first-interaction">First interaction walkthrough</KBH2>

      <KBP>
        With the server connected, here is a simple workflow to explore your own application
        and generate a test for a login flow.
      </KBP>

      <KBSteps
        variant="green"
        steps={[
          {
            title: 'Ask the AI to navigate to your app',
            body: (
              <p className="text-text-secondary text-[14px] leading-relaxed">
                Send a prompt like: <em>"Navigate to http://localhost:3000 and describe
                what you see on the page."</em> The AI will use the MCP server to open
                the URL and snapshot the accessibility tree.
              </p>
            ),
          },
          {
            title: 'Ask it to explore a flow',
            body: (
              <p className="text-text-secondary text-[14px] leading-relaxed">
                Follow up with: <em>"Find the login form, fill it in with username
                'testuser' and password 'password123', submit it and tell me what happens."</em>
                The AI will locate the form elements, interact with them and report the
                result.
              </p>
            ),
          },
          {
            title: 'Ask it to generate a test',
            body: (
              <p className="text-text-secondary text-[14px] leading-relaxed">
                Send: <em>"Now write a Playwright test for the login flow you just
                performed, using best-practice locators."</em> The AI will generate
                TypeScript test code based on what it observed.
              </p>
            ),
          },
          {
            title: 'Review and refine',
            body: (
              <p className="text-text-secondary text-[14px] leading-relaxed">
                Copy the generated code into your test file. Run it with{' '}
                <code>npx playwright test</code>. Review what the AI produced and ask it
                to adjust anything that does not meet your standards.
              </p>
            ),
          },
        ]}
      />

      <KBH2 id="troubleshooting">Troubleshooting common setup issues</KBH2>

      <KBH3>The AI cannot use browser tools</KBH3>

      <KBP>
        If the AI reports that it does not have browser tools available, the MCP server
        connection has not been established. Check that:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>You restarted the AI client after adding the configuration.</li>
        <li>The JSON in your config file is valid - a missing comma or bracket will cause the entire file to fail silently.</li>
        <li>Node.js is on your PATH. Run <code>which node</code> (macOS/Linux) or <code>where node</code> (Windows) to confirm.</li>
        <li>You have network access to npm if using <code>npx</code>, since it needs to download the package on first run.</li>
      </ul>

      <KBH3>Browser does not open</KBH3>

      <KBP>
        If the MCP server connects but no browser window appears, check whether you have
        added <code>--headless</code> to the arguments. In headless mode the browser runs
        invisibly. Remove the flag if you want to see the browser.
      </KBP>

      <KBH3>Permission errors on macOS</KBH3>

      <KBP>
        On macOS, if the browser binary refuses to launch with a permission error, run:
      </KBP>

      <KBCode language="bash">{`npx playwright install chromium`}</KBCode>

      <KBP>
        This downloads the Playwright browser binaries to the correct location. The MCP
        server uses these binaries.
      </KBP>

      <KBH3>The server starts but immediately exits</KBH3>

      <KBP>
        Run the server manually to see its output:
      </KBP>

      <KBCode language="bash">{`npx @playwright/mcp@latest`}</KBCode>

      <KBP>
        The server should print a message indicating it is waiting for a connection. If it
        exits immediately, the error output will indicate what went wrong. Common causes are
        a missing Node.js installation or a conflict with an existing Playwright version.
      </KBP>

      <KBNote variant="green">
        If you are setting up the MCP server in a team environment, add the configuration
        to a shared <code>.vscode/mcp.json</code> file in your repository. This means every
        developer gets the same setup without having to configure it individually, and the
        configuration stays in sync with the rest of your tooling.
      </KBNote>
    </>
  )
}

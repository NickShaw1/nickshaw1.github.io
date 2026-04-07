import { KBH2, KBH3, KBP } from '../../../components/kb/KBHeading'
import KBNote from '../../../components/kb/KBNote'
import KBVideo from '../../../components/kb/KBVideo'

export default function WhatIsMcp() {
  return (
    <>
      <KBVideo
        videoId="2716IUeCIQo"
        title="Playwright MCP: How AI Agents Can Control Your Browser"
        caption="An introduction to the Playwright MCP server and how AI agents use it"
      />

      <KBP>
        The way engineers write and maintain tests is changing. AI coding assistants can now
        do more than suggest completions in an editor - they can operate a browser, observe
        what they see, generate test code from that observation and run it. This section
        covers the tools and techniques behind AI-assisted testing using Playwright, starting
        from the foundational concept that makes it possible: the Model Context Protocol.
      </KBP>

      <KBH2 id="what-is-mcp">What the Model Context Protocol is</KBH2>

      <KBP>
        The Model Context Protocol, known as MCP, is an open standard introduced by
        Anthropic in late 2024 for connecting AI language models to external tools and data
        sources. Before MCP, each AI tool integrated with external systems in its own way,
        requiring custom plugins and proprietary APIs for every connection. MCP defines a
        common interface so that a single tool can be written once and used by any AI client
        that implements the protocol.
      </KBP>

      <KBP>
        The architecture has three parts. An MCP host is the AI application the user
        interacts with - Claude Desktop, Cursor, VS Code with an AI extension or any other
        client that implements the protocol. An MCP server is a process that exposes a set
        of tools and resources through the MCP interface. The protocol defines how hosts
        discover what tools a server exposes, how they call those tools and how they receive
        results.
      </KBP>

      <KBP>
        From the perspective of a language model, MCP tools work the same way as function
        calling in any other context: the model receives a description of available tools,
        decides which one to call, calls it with arguments and receives the result. The
        difference is that the tool is running as a separate process on the user's machine
        or on a remote server, not as a function inside the model's own environment.
      </KBP>

      <KBNote variant="blue">
        MCP is an open standard. The specification is published at modelcontextprotocol.io.
        Servers exist for a wide range of tools - file systems, databases, web browsers,
        version control systems and many more. Any AI client that implements the protocol
        can use any MCP server.
      </KBNote>

      <KBH2 id="playwright-mcp-server">What the Playwright MCP server does</KBH2>

      <KBP>
        The Playwright MCP server is an official MCP server maintained by the Playwright
        team. It exposes a set of tools that allow an AI agent to control a browser using
        Playwright's automation capabilities. When an AI host like Claude or Cursor connects
        to the Playwright MCP server, it gains the ability to:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li>Navigate to URLs and wait for pages to load.</li>
        <li>Take screenshots and capture the accessibility tree of the current page.</li>
        <li>Click elements, fill in forms, press keys and scroll.</li>
        <li>Inspect network requests and console output.</li>
        <li>Generate Playwright test code based on the interactions it performs.</li>
        <li>Run existing Playwright tests and report the results.</li>
      </ul>

      <KBP>
        The key distinction from Playwright's built-in code generator (<code>npx playwright codegen</code>)
        is that the MCP server is not a recording tool you operate manually. It is a
        programmatic interface that an AI model operates autonomously based on natural
        language instructions. You describe what you want - "explore the checkout flow and
        write tests for it" - and the AI navigates the application, observes its behaviour
        and produces test code.
      </KBP>

      <KBH3>Accessibility-first interaction</KBH3>

      <KBP>
        By default the Playwright MCP server operates using the browser's accessibility
        tree rather than screenshots. This has important implications for test quality. When
        the AI sees a page as an accessibility tree, it identifies elements the same way a
        screen reader does - by their role, name and label. This naturally encourages the
        AI to generate locators using <code>getByRole</code>, <code>getByLabel</code> and
        <code>getByText</code>, which are the locator strategies Playwright recommends for
        their resilience to UI changes.
      </KBP>

      <KBP>
        A vision mode is also available, which works with screenshots. This is useful for
        applications that do not expose a complete accessibility tree, such as canvas-based
        interfaces. In vision mode the AI reasons about the visual layout rather than the
        semantic structure.
      </KBP>

      <KBH2 id="how-ai-tools-connect">How Claude, Cursor and other tools connect</KBH2>

      <KBP>
        Any AI client that implements the MCP protocol can connect to the Playwright MCP
        server. The connection is configured by telling the host where the server process
        lives and how to start it. The host then manages the lifecycle of the server process
        and communicates with it over standard input and output.
      </KBP>

      <KBP>
        Different AI clients have different configuration interfaces. Claude Desktop uses a
        JSON configuration file. Cursor has a settings panel for MCP servers. VS Code
        supports MCP natively through GitHub Copilot's agent mode. Despite the different interfaces, the
        underlying mechanism is the same: the host starts the server, the server advertises
        its tools, the host makes those tools available to the AI model.
      </KBP>

      <KBP>
        The Playwright MCP server itself is a Node.js package published on npm as
        <code>@playwright/mcp</code>. It can be run with <code>npx</code> without a
        permanent installation, which makes it easy to try without changing your project's
        dependencies.
      </KBP>

      <KBH2 id="what-ai-assisted-testing-means">What AI-assisted testing means in practice</KBH2>

      <KBP>
        "AI-assisted testing" covers a spectrum of involvement, from tools that suggest a
        locator as you type, all the way to autonomous agents that run a full test suite,
        interpret failures and propose fixes. In 2025, the practical reality sits somewhere
        in the middle.
      </KBP>

      <KBP>
        The most common and reliable uses today are:
      </KBP>

      <ul className="my-4 space-y-3 pl-5 list-disc text-text-secondary text-[14px] leading-relaxed">
        <li><strong className="text-text-primary">Test generation</strong> - Giving an AI agent access to your application and asking it to write tests for specific flows. The AI navigates the application, observes it and produces code. A human reviews and iterates on that code.</li>
        <li><strong className="text-text-primary">Locator assistance</strong> - Using AI to suggest or fix locators. Particularly useful when inheriting a large test suite with brittle CSS selectors.</li>
        <li><strong className="text-text-primary">Debugging help</strong> - Feeding failure output, error messages and trace files to an AI and asking it to explain what went wrong and suggest a fix.</li>
        <li><strong className="text-text-primary">Maintenance</strong> - Using AI to update tests after a UI change, particularly for bulk operations like updating locators across many files.</li>
      </ul>

      <KBP>
        Fully autonomous testing - where an AI generates, runs, interprets and fixes tests
        without any human review - is technically possible in limited scenarios but is not
        yet reliable enough to trust for production test coverage. The AI makes mistakes.
        It misidentifies elements, makes incorrect assumptions about application state and
        occasionally produces test code that passes without actually testing anything
        meaningful.
      </KBP>

      <KBNote variant="warning">
        AI-assisted testing is a force multiplier for experienced testers, not a replacement
        for understanding how to write good tests. The quality of what an AI produces
        depends heavily on the quality of the prompts and the review it receives. An AI that
        generates one hundred tests that do not actually verify the right things is worse
        than ten tests written by hand.
      </KBNote>

      <KBH2 id="landscape">The landscape of AI testing tools</KBH2>

      <KBP>
        Several categories of AI testing tools exist alongside the Playwright MCP server.
      </KBP>

      <KBH3>AI in test frameworks</KBH3>

      <KBP>
        Some testing frameworks are integrating AI directly. Playwright's own roadmap
        includes features for AI-based test healing - automatically updating broken locators
        when the UI changes. Cypress has similar ambitions. These features operate at the
        framework level and do not require a separate MCP setup.
      </KBP>

      <KBH3>Dedicated AI testing products</KBH3>

      <KBP>
        Products like Mabl, Testim and Reflect build an entire test automation platform
        around AI capabilities. They typically provide a cloud-based service with their own
        recorder, runner and reporting system. These are alternatives to Playwright for
        teams that want a complete managed solution rather than a code-first framework.
      </KBP>

      <KBH3>AI coding assistants</KBH3>

      <KBP>
        GitHub Copilot, Cursor and Claude in an editor can all assist with writing tests as
        part of a general coding workflow. They do not have browser access by default, but
        with the Playwright MCP server configured they can navigate and observe your
        application directly. This is the most flexible approach for teams already using
        these tools.
      </KBP>

      <KBH3>Where Playwright MCP fits</KBH3>

      <KBP>
        The Playwright MCP server is the right choice for teams that want to keep their
        test suite in code - in a repository, under version control, reviewed by developers -
        while using AI to accelerate the writing and maintenance of that code. It does not
        abstract away Playwright or replace your test runner. It gives your AI tools the
        ability to interact with your application so that the code they suggest is grounded
        in the actual behaviour of the UI rather than guesswork.
      </KBP>

      <KBH2 id="what-this-section-covers">What this section covers</KBH2>

      <KBP>
        The articles in this section progress from setup through to advanced usage. The next
        article covers installing and configuring the Playwright MCP server with Claude
        Desktop, Cursor and VS Code. Subsequent articles cover generating tests with AI,
        improving locators, debugging failures, maintaining tests through UI changes and
        the practical limits of what AI-assisted testing can do reliably today.
      </KBP>
    </>
  )
}

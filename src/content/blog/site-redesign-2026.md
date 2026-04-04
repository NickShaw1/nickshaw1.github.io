---
title: "Rebuilding the site with Claude Code"
date: "2026-04-04"
slug: "site-redesign-2026"
excerpt: "A full redesign and rebuild of this portfolio using React, TypeScript, Tailwind and Claude Code as a genuine development partner — what we built, how we worked, and what it felt like."
category: "AI"
readingTime: "5 min read"
---

The previous version of this site was a solid starting point. It had React components, some CSS animations and a reasonable structure. But the design was inconsistent, the code was getting difficult to maintain, and it did not reflect where I am now as a practitioner. It was time to start fresh.

This time, I did it in close collaboration with Claude Code.

## The stack

The rebuilt site runs on React with TypeScript, Vite as the build tool, Tailwind CSS for styling and Framer Motion for animations. Blog posts are written in Markdown and loaded at build time. The whole thing deploys from a single command.

The design system is defined in a Tailwind config: one background colour, a consistent surface colour, a set of text hierarchy tokens and two accent colours. Green is used for interactive elements, orange for links. Every component draws from this palette, which keeps things coherent without requiring much discipline to maintain.

Typography uses Space Grotesk for display text and Space Mono for metadata, tags and code. The contrast between the two fonts does a lot of visual work without needing much else.

## How we worked

Claude Code is an AI coding assistant that runs in the terminal. You describe what you want, or paste in a screenshot, a component or an error, and it reads the codebase, writes the code, edits the files and reports back. It has full access to the file system within the project and understands context across the whole codebase.

The workflow in practice looks like this: I describe a feature or a problem, Claude Code proposes an approach, I review and approve the relevant file changes, and the site updates in real time via Vite's hot reload. For most tasks, the first pass is accurate enough to ship. For design work, it usually takes two or three rounds of feedback.

It is a genuinely different way of working. The velocity is higher than coding solo. The bottleneck becomes taste and judgement, not implementation speed.

## What was built

The site has five sections: Home, About, Projects, Blog and a contact section. Each was designed and built iteratively.

**Projects** is the most involved page. Projects are grouped by category: Sites, Exercises, GitHub and Testing. Each card shows the stack, a short description and either a live link, a GitHub link or a detail modal. The modals include a live interactive demo where the project warrants it: a working synthesiser, a holiday cost planner, a weather widget, a currency converter and an ISS tracker. Each also includes a code snippet showing the core logic.

**Blog** posts are Markdown files with frontmatter for title, date, category, excerpt and reading time. The rendering pipeline parses the Markdown and applies a custom prose stylesheet that matches the site's visual language. Categories have their own icon and colour, similar to the project cards.

**Home** has a status strip showing current availability, a short introduction, a feature of recent work and a contact section. The copy is intentional: it says something about how I work and what I am looking for, rather than being a list of technologies.

## The interactive demos

The most enjoyable part of the build was the interactive demos embedded in the project modals. Each one is a small, self-contained React component.

The synthesiser uses the Web Audio API, with oscillators, gain nodes and filters wired up to a rendered keyboard. Knobs control waveform, reverb and filter cutoff. It works on desktop.

The holiday planner lets you enter a destination, start and end dates, a currency and a list of itinerary items with costs. It calculates a running total and the number of nights. The currency selector and all inputs are styled to match the rest of the site.

The ISS tracker fetches live position data and renders it on a world map. The weather app fetches real forecast data and caches it to avoid unnecessary requests.

Building these in one session each, covering design, layout, state management and edge cases, would not have been practical without an AI pair. The implementation overhead is low enough that the focus stays on what the demo should do, not on how to wire up the state.

## What it feels like

There is a version of AI-assisted development that feels like delegation: you describe something vague, it produces something vague, and you spend more time reviewing and correcting than you would have spent writing. That is not this.

When the context is clear, Claude Code is fast, accurate and consistent. It does not drift from the design system, it does not introduce patterns that are out of character with the rest of the codebase, and it does not ignore edge cases that have already been handled elsewhere.

The role shift is real. You spend less time in the implementation details and more time on decisions: what should this page feel like, is this information hierarchy right, does this interaction make sense. That is a better use of time.

## What's next

The site is live and stable. A few things remain on the list, including refining the About page, adding more posts and potentially adding further project demos. The infrastructure to do any of that is already in place.

The more interesting question is how this way of working extends into professional delivery contexts. That is something I have been exploring separately and something I expect to write more about here.

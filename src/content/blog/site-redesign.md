---
title: "Site redesign"
date: "2025-01-30"
slug: "site-redesign"
excerpt: "A total site rebuild in React, exploring component architecture, CSS keyframe animations and what it's like to dive into a React rabbit-hole during a widespread power outage."
category: "Development"
readingTime: "4 min read"
---

> **Note:** this post describes an earlier version of the site. The site has since been fully redesigned and rebuilt in conjunction with Claude Code, which has been a genuinely enjoyable experience. The React principles discussed here still apply.

The last few weeks were a little chaotic, thanks to a widespread power outage across much of Ireland. Being without power for nearly 5 days was a useful reminder of how reliant we are on electricity, particularly when in the middle of a site redesign.

With that resolved, here is what was actually achieved. I implemented a total redesign, overhauling the visual aesthetic and spending a good deal of time working with React and CSS keyframe animations. The goal was straightforward: get a proper handle on React by building something real.

React turned out to be a logical, well-structured tool for organising a site. Outside of a tricky initial deployment setup, it was not particularly difficult to pick up.

## React

React is a JavaScript library for building user interfaces, particularly for single-page applications. Developed by Meta, it allows developers to create reusable UI components, making it easier to build and maintain complex, dynamic interfaces. React uses a virtual DOM to efficiently update and render only the parts of the UI that change, which improves performance. Components are typically written using JSX, which allows HTML-like syntax within JavaScript.

React supports unidirectional data flow, making state and props management more predictable. It is widely adopted for building modern web applications.

## What I learned

Organising a site in plain HTML, CSS and JavaScript is straightforward and perfectly suitable at small scale. For anything larger, React becomes a significant time-saver.

A simple example: in a plain HTML site, updating the navigation bar means editing it individually on every page. In React, you update the component once and the change propagates everywhere it is used. It reduces repetition, encourages better organisation and does not add much complexity once you are familiar with the patterns.

It did take some getting used to, particularly around JSX syntax and component structure, but the learning curve flattens out quickly with consistent practice.

## CSS keyframe animations

Some time went into adding movement and energy to this version of the site through CSS keyframe animations. These allow elements to transition through a series of styles over time, and they are more capable than I initially expected. Slide-in effects, colour transitions and other subtle animations can go a long way in making a site feel polished. CSS is a genuinely flexible language and one I find enjoyable to work with.

## What's next?

A weather app had been on the list for a while, but this redesign took priority once the React rabbit-hole opened up. It remains on the to-do list.

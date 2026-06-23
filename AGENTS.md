# AGENTS.md

## Project

Build a one-page portfolio website with Vite, React, TypeScript, and SCSS.

## Goal

Create a clean, responsive, accessible portfolio website for a data/BI/data engineering profile.

## Tech Stack

* Vite
* React
* TypeScript
* SCSS
* HTML5
* npm

## Folder Structure

Use this structure:

* `src/components/` for React components
* `src/data/` for content/data arrays
* `src/styles/` for SCSS files
* `public/` for static assets

## Commands

Use npm only.

* Install: `npm install`
* Run locally: `npm run dev`
* Build: `npm run build`

## Agent Rules
- Keep the portfolio website one page only.
- The portfolio site itself should be static and deployable to GitHub Pages.
- Do not add a backend, database, login, or API to the portfolio website unless explicitly requested.
- Backend, API, database, Docker, and data engineering projects should be showcased through project cards, links, screenshots, and architecture descriptions.
- Use TypeScript for React components.
- Use explicit prop types.
- Avoid `any`.
- Use SCSS for styling.
- Keep code simple and beginner-friendly.
- Make small, safe changes.
- Do not install unnecessary packages.
- Prefer reusable components.
- Keep accessibility in mind.

## Website Sections

The page should include:

* Header
* Hero
* About
* Skills
* Projects
* Contact
* Footer

## Design Direction

Follow `DESIGN.md` for visual style.
Follow `CONTENT.md` for website text and content.

## Quality Checklist

Before saying a task is done, check:

* `npm run dev` works
* `npm run build` works
* no TypeScript errors
* layout works on mobile and desktop
* links are not broken
* code is organized clearly

## Deployment

The final site should be deployable to GitHub Pages.
Use GitHub Actions unless another method is requested.

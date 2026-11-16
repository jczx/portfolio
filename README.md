# Julio Caesar · Data & Analytics

A bilingual portfolio for my work in business intelligence, data engineering, and data science. Built as a static site with React, TypeScript, Vite, and SCSS.

[View the portfolio](https://julio-caesar.com/)

[![Deploy to GitHub Pages](https://github.com/jczx/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/jczx/portfolio/actions/workflows/deploy.yml)

![Portfolio preview](public/og-image.png)

## What is here

- A one-page portfolio with selected work, experience, skills, and contact details in English and German.
- EU sanctions name matching and pipeline monitoring, backed by saved public datasets.
- A fraud-detection case study with saved evaluation results.
- Fret Lab, a separate guitar-learning application.

The demos run in the browser. Dataset snapshots are not live feeds; the monitor distinguishes the saved run from current source freshness.

## Stack

- React 19
- TypeScript
- Vite
- SCSS

## Local development

Use Node.js 22.13 or newer and npm. CI uses Node.js 22.

```bash
npm ci
npm run dev
```

## Production checks

```bash
npm run lint
npm run test:portfolio
npm run test:guitar
npm run test:guitar-ui
npm run build
npm run test:portfolio-build
npm run test:guitar-build
```

The build runs TypeScript checking and prerenders the portfolio and case studies to static HTML. Build checks run after the build. Use `npm run preview` to inspect the production output. Check both languages at desktop and mobile widths when changing layout; markup tests do not replace visual review.

## Source map

| Path | Responsibility |
| --- | --- |
| `src/App.tsx` | Portfolio composition, language preference, and case-study selection |
| `src/components/` | Portfolio sections and case-study views |
| `src/data/` | Project content and site metadata |
| `src/i18n/` | English and German interface copy |
| `src/utils/` | Shared data utilities |
| `src/styles/portfolio/` | Monochrome presentation, grouped by area |
| `src/caesar-guitar-lab/` | Fret Lab application and music logic |
| `public/` | Fonts, images, and published dataset snapshots |
| `scripts/` | Asset preparation and static HTML generation |
| `tests/` | Behavior, keyboard interactions, and build checks |

## Styling

`src/main.tsx` loads base layouts from `main.scss`, the presentation entry point `redesign.scss`, and fraud case-study styles. `redesign.scss` defines the order of seven SCSS modules. Edit the relevant module rather than adding another override to the entry point.

Shared colours, radii, and section spacing live in `portfolio/_foundation.scss`. Navigation, hero, profile/skills, work previews, and experience each have a named module. Responsive rules and accessibility preferences load last in `_accessibility.scss`. Base layouts and case-study rules remain in `main.scss` to preserve their existing cascade.

The grayscale interface uses locally hosted Inter. A compact colour portrait sits beside the name in the navigation. Keyboard navigation, reduced motion, increased contrast, and small screens are supported.

## GitHub Pages

[The deployment workflow](.github/workflows/deploy.yml) installs dependencies, audits them, runs checks, builds the site, and publishes `dist/` on pushes to `main` or `master`. Pull requests run the same checks without deployment permissions. Manual runs publish only from `main` or `master`.

The production domain is `julio-caesar.com`. For another host, update the canonical metadata and domain configuration. For subpath hosting, also set Vite's `base` and verify generated asset and page links.

## Content

- English copy is the source of truth
- German copy mirrors the English version

## Contributing and security

See [CONTRIBUTING.md](CONTRIBUTING.md) for checks and change guidelines, and [SECURITY.md](SECURITY.md) to report a vulnerability privately. Offline analysis workspaces are kept outside the public repository; published snapshots and reproduction downloads live in `public/`.

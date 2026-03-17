# Julio Caesar Portfolio

Personal portfolio site built with React, TypeScript, Vite, and SCSS.

## Stack

- React 19
- TypeScript
- Vite
- SCSS

## Local development

```bash
npm install
npm run dev
```

## Production checks

```bash
npm run lint
npm run build
```

## Deployment notes

- Root-domain hosting works with the current `vite.config.ts`
- If you deploy under a subpath, set `base` in `vite.config.ts`
- After you buy the final domain, update social metadata and canonical URL in `index.html`

## GitHub Pages

- The repo is configured for GitHub Pages deployment via GitHub Actions
- Push to `main` or `master` to trigger deployment
- In GitHub repo settings, set Pages to use `GitHub Actions`
- If you add a custom domain later, configure it in Pages settings and then update `index.html`

## Content

- English copy is the source of truth
- German copy mirrors the English version

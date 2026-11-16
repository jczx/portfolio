# Contributing

Use Node.js 22.13 or newer and npm. Install the locked dependencies with `npm ci`, then run `npm run dev`.

Keep the portfolio static, accessible, and deployable to GitHub Pages. Use TypeScript for components, explicit prop types, and SCSS for styles. Keep English and German content aligned. Public case studies must distinguish measured results from examples and avoid private client information.

Before opening a pull request, run:

```bash
npm run lint
npm run test:portfolio
npm run test:guitar
npm run test:guitar-ui
npm run build
npm run test:portfolio-build
npm run test:guitar-build
npm audit
```

For UI changes, inspect desktop and mobile layouts, keyboard navigation, and both languages. Explain the problem, the change, and how you checked it. Include screenshots when the appearance changes.

Files in `public/`, including archives, are published verbatim. Inspect their contents before committing. See [SECURITY.md](SECURITY.md) for private vulnerability reporting and [docs/development.md](docs/development.md) for dataset and asset preparation.

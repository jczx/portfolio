# Security policy

Report suspected vulnerabilities privately to **julcsrdata@gmail.com** with the affected URL or file, reproduction steps, and likely impact. Do not include credentials or personal data, and do not post exploit details in a public issue.

Security fixes target the latest version on `main`. There is no guaranteed response time.

## Scope

This repository publishes a static portfolio and browser demos to GitHub Pages. It has no login, server API, or database. Sanctions searches run locally against a published dataset; the browser stores the language preference locally. Public assets and source downloads are accessible to everyone.

Never commit credentials, private client data, raw financial records, or trained model files. Anything placed in `public/` is copied into the deployed site. Vite environment variables included in browser code are public, even if their source file is ignored by Git.

## Maintenance

- Run `npm audit` and review both runtime and development dependencies.
- Review Dependabot updates and run the checks in [CONTRIBUTING.md](CONTRIBUTING.md).
- Keep Actions pinned to verified commit SHAs and grant deployment permissions only to the deployment job.
- Enable GitHub secret scanning, push protection, and branch protection where available. Repository files alone do not enable these account settings.

The production build sets a Content Security Policy through HTML metadata. Inline styles remain allowed for React's dynamic visual styles; inline scripts and evaluation are blocked. A meta policy cannot enforce `frame-ancestors`; anti-framing rules and other response headers must be configured at the hosting layer. A passing dependency audit is not a guarantee that the website has no vulnerabilities.

# Security review — 16 November 2026

Reviewed the portfolio at commit `8b83a699e439af62dccc185fb93010f4803f6fe6`, confirmed against GitHub `main`. The results below describe the remediation checks before publication; deployment status is recorded in the repository's GitHub Actions runs.

## Findings and changes

| Finding | Local remediation |
| --- | --- |
| npm reported 19 affected packages: 10 high and 9 moderate | Compatible dependency updates plus a scoped, documented minimatch override. The final online audit reported zero known vulnerabilities. |
| Build jobs inherited deployment permissions | Only the deploy job receives Pages write and OIDC permissions. Checkout no longer persists credentials. |
| Actions used mutable version tags | Pinned four Actions to commit SHAs verified against their upstream tags. Dependabot checks npm and Actions weekly. |
| Pull requests had no checks | Added PR validation without artifact publication or deployment. Dependency auditing now runs in CI. |
| No explicit browser content policy | Production HTML restricts scripts, connections, fonts and resources to the site, with data images and inline styles allowed for existing visuals. Objects, frames, forms and base overrides are blocked. Development HMR is unaffected. |
| Repository presentation and hygiene gaps | Added a README preview and status badge, contribution and private reporting instructions, and environment/key/output exclusions. Removed the placeholder `hello.md` and an npm command referencing unpublished analysis scripts. |

## Verification

- Online npm audit after updates: 0 known vulnerabilities, including development dependencies.
- Lint and TypeScript/production build passed.
- 42 tests passed: 16 portfolio, 15 music, 5 guitar UI, 4 portfolio build and 2 guitar build checks.
- All five generated HTML pages include the policy and resolve their referenced local assets. Tests also check existing relative portfolio links.
- Development server started successfully; its homepage returned HTTP 200.
- Workflow and Dependabot YAML parsed successfully; `git diff --check` passed.
- A targeted pattern scan of 298 blobs reachable from local Git refs, including entries inside the published source ZIP, found no private-key markers, GitHub tokens, AWS access-key IDs, Google API-key patterns, or credential-bearing database URLs. This is a limited pattern scan, not an exhaustive secret or personal-data audit.
- The live homepage returned HTTPS 200, and HTTP redirected to HTTPS with 301.

## Remaining limits

- No CSP, anti-framing, HSTS or MIME-sniffing protection header was present in the inspected live homepage response. The prepared meta policy adds content restrictions when published, but cannot set `frame-ancestors` or other HTTP headers. Those need hosting-layer support.
- Account-level secret scanning, push protection, branch rules and deployment-environment protection were not verified. GitHub CLI was unavailable, and connected repository metadata did not expose those settings.
- The browser access host was unavailable. Desktop/mobile rendering and browser enforcement of the policy were not visually verified. Markup tests do not replace those checks.
- The downloaded fraud project's Python dependency environment was not installed or audited; the ZIP was inspected for contents and credential patterns only. It does not execute on the portfolio host.
- No penetration test or guarantee of zero vulnerabilities is implied. New dependency advisories can appear after this review.

## References

- [GitHub Actions secure-use guidance](https://docs.github.com/en/actions/reference/security/secure-use)
- [MDN Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP)
- [MDN: frame-ancestors is not supported in meta policies](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors)
- [minimatch advisory and patched version](https://github.com/advisories/GHSA-g3hv-75wg-m249)

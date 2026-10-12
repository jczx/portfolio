# Portfolio development

The fraud case study uses `public/data/fraud-results.json`, exported from the completed
real-data evaluation. Its source download is `public/downloads/credit-fraud-source.zip`.
From the modelling project, run `python scripts/export_portfolio.py --output <portfolio>/public`
to refresh both files. The exporter checks the frozen manifest and rejects synthetic results;
it does not train a model. Keep raw data and model binaries outside this repository.

Use `npm run dev` for local development and `npm run build` for the static GitHub Pages output. The build generates HTML for the homepage, sanctions matcher, and pipeline monitor; interactive data loads from the bundled JSON files. The previous `?case=...` links still work.

Run `npm run test:portfolio` for name matching, data validation, load/retry states, and language/hydration checks. After building, run `npm run test:portfolio-build` to check static content, links, metadata, portraits, and published data. These checks do not inspect browser layout.

## Image assets

`npm run assets:optimize` regenerates three responsive WebP portraits and the PNG sharing previews. It reads the original colour photograph in `src/assets/julio_colour_blackedout.png` and the homepage preview in `public/og-image.svg`. The generated assets belong in `public/` and are copied into the build. Sharp is a development dependency; it adds no browser code.

## Sanctions data

The matcher reads `public/data/eu-sanctions-matcher.json`; the monitor reads `public/data/eu-sanctions-pipeline-status.json`. Neither demo runs the ingestion pipeline or contacts the EU source from the browser.

For the existing local analysis workflow, `analysis/scripts/build-eu-sanctions-data.mjs` accepts `FSF_XML_PATH` for an already downloaded official XML export or `FSF_XML_URL` for the official download URL. Keep download credentials in local process environment variables, never in source files, public assets, or Git. The analysis workspace is ignored by Git and is not included in the site build.

Before refreshing the public JSON files, validate the XML export date and entity count, keep copies of the previous files, and verify the generated data against the source. The source export timestamp describes data currency; `generatedAt` describes the saved pipeline run. The monitor displays the saved checks and recalculates source freshness when the page loads.

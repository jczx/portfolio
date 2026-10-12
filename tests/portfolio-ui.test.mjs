import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import { loadReactSource } from './helpers/load-react-source.mjs';

const dom = new JSDOM('<!doctype html><html lang="en"><head><meta name="description"><meta property="og:title"><meta property="og:description"><meta name="twitter:title"><meta name="twitter:description"></head><body><div id="root"></div></body></html>', { url: 'https://example.test/' });
globalThis.window = dom.window;
globalThis.document = dom.window.document;
globalThis.HTMLElement = dom.window.HTMLElement;
globalThis.MutationObserver = dom.window.MutationObserver;
globalThis.localStorage = dom.window.localStorage;
Object.defineProperty(globalThis, 'navigator', { value: dom.window.navigator, configurable: true });
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
window.matchMedia = () => ({ matches: true });
globalThis.requestAnimationFrame = callback => callback();
const { createElement, act } = await import('react');
const { createRoot, hydrateRoot } = await import('react-dom/client');
const { renderToString } = await import('react-dom/server');
const Matcher = loadReactSource('src/components/SanctionsMatcherPage.tsx').default;
const Monitor = loadReactSource('src/components/SanctionsPipelineMonitorPage.tsx').default;
const Fraud = loadReactSource('src/components/FraudDetectionPage.tsx').default;
const App = loadReactSource('src/App.tsx').default;
const dataset = JSON.parse(await readFile(new URL('../public/data/eu-sanctions-matcher.json', import.meta.url), 'utf8'));
const pipeline = JSON.parse(await readFile(new URL('../public/data/eu-sanctions-pipeline-status.json', import.meta.url), 'utf8'));
let root;
const originalFetch = globalThis.fetch;
async function mount(Component, language = 'en') {
  if (root) await act(() => root.unmount());
  root = createRoot(document.getElementById('root'));
  await act(async () => { root.render(createElement(Component, { language, homeHref: './' })); });
}
after(async () => {
  if (root) await act(() => root.unmount());
  globalThis.fetch = originalFetch;
  dom.window.close();
});

test('fraud case study shows measured results in both languages without a network request', async () => {
  globalThis.fetch = () => { throw new Error('Static case study must not fetch'); };
  for (const language of ['en', 'de']) {
    await mount(Fraud, language);
    assert.match(document.querySelector('.fraudCase__metrics').textContent, /41 \/ 52/);
    assert.match(document.querySelector('.fraudCase__metrics').textContent, /175/);
    assert.equal(document.querySelectorAll('tbody tr').length, 5);
    assert.match(document.querySelector('tbody .is-selected').textContent, /XGBoost/);
    assert.match(document.querySelector('h1').textContent, language === 'de' ? /Kreditkartenbetrug/ : /Credit card fraud/);
    assert.equal(document.querySelector('a[download]').getAttribute('href'), './downloads/credit-fraud-source.zip');
  }
});

test('matcher announces loading and hides results until the actual data arrives', async () => {
  globalThis.fetch = () => new Promise(() => {});
  await mount(Matcher);
  assert.match(document.querySelector('[role="status"]').textContent, /Loading the sanctions list/);
  assert(document.querySelector('input').disabled);
  assert.equal(document.querySelector('.sanctionsResultCard'), null);
  assert.doesNotMatch(document.body.textContent, /FSF_XML|analysis\/raw|fallback sample/);
});

test('a failed matcher download shows an error and retry loads the full list', async () => {
  globalThis.fetch = async () => ({ ok: false });
  await mount(Matcher, 'de');
  assert.match(document.querySelector('[role="alert"]').textContent, /nicht geladen/);
  globalThis.fetch = async () => ({ ok: true, json: async () => dataset });
  await act(async () => { document.querySelector('[role="alert"] button').click(); });
  assert.equal(document.querySelector('[role="alert"]'), null);
  assert.equal(document.querySelector('input').disabled, false);
  assert.match(document.querySelector('.sanctionsMatcher__helper').textContent, /6\.241/);
  assert(document.querySelector('.sanctionsResultCard'));
});

test('invalid data shows a download error rather than invented sample results', async () => {
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ entries: [] }) });
  await mount(Matcher);
  assert(document.querySelector('[role="alert"]'));
  assert.equal(document.querySelector('.sanctionsResultCard'), null);
});

test('monitor labels are German and stale data overrides a saved healthy freshness flag', async () => {
  const saved = structuredClone(pipeline);
  saved.meta.sourceDate = '2000-01-01T00:00:00Z';
  saved.checks.find(check => check.id === 'freshness').status = 'healthy';
  globalThis.fetch = async () => ({ ok: true, json: async () => saved });
  await mount(Monitor, 'de');
  assert.match(document.body.textContent, /Gespeicherter Lauf/);
  const cards = [...document.querySelectorAll('.monitorCheckCard')];
  assert(cards.some(card => card.textContent.includes('Quellenzugriff')));
  const freshness = cards.find(card => card.textContent.includes('Aktualität'));
  assert(freshness.querySelector('.monitorStatus--watch'));
  assert.doesNotMatch(document.body.textContent, /Health Checks|Source access|Publish step/);
});

test('failed monitor loads show an explicit error and retry restores real metrics', async () => {
  globalThis.fetch = async () => { throw new Error('offline'); };
  await mount(Monitor);
  assert(document.querySelector('[role="alert"]'));
  assert.equal(document.querySelector('.monitorMetricCard'), null);
  globalThis.fetch = async () => ({ ok: true, json: async () => pipeline });
  await act(async () => { document.querySelector('[role="alert"] button').click(); });
  assert.equal(document.querySelector('[role="alert"]'), null);
  assert.match(document.body.textContent, /6,241/);
});

test('static homepage hydrates, keeps projects before experience, and switches language', async () => {
  if (root) await act(() => root.unmount());
  window.localStorage.clear();
  const container = document.getElementById('root');
  container.innerHTML = renderToString(createElement(App, { initialLanguage: 'en', initialPage: 'home' }));
  const errors = [];
  await act(() => { root = hydrateRoot(container, createElement(App, { initialLanguage: 'en', initialPage: 'home' }), { onRecoverableError: error => errors.push(error.message) }); });
  assert.deepEqual(errors, []);
  const sections = [...document.querySelectorAll('main > section')].map(section => section.id);
  assert(sections.indexOf('case-studies') < sections.indexOf('experience'));
  assert(!sections.includes('what-i-do'));
  assert.equal(document.querySelectorAll('.portfolioProjectCard').length, 3);
  assert.equal(document.querySelectorAll('.personalProject').length, 1);
  assert(document.querySelector('a[href="./sanctions-monitor.html"]'));
  await act(() => [...document.querySelectorAll('.header__languageButton')].find(button => button.textContent === 'DE').click());
  assert.equal(document.documentElement.lang, 'de');
  assert.match(document.body.textContent, /Ausgewählte Arbeiten/);
  assert.match(document.querySelector('meta[name="description"]').content, /Business Analytics/);
  assert.equal(document.querySelectorAll('h1').length, 1);
});

test('hydration respects a stored German preference without markup mismatches', async () => {
  if (root) await act(() => root.unmount());
  window.localStorage.setItem('portfolio-language', 'de');
  const container = document.getElementById('root');
  container.innerHTML = renderToString(createElement(App, { initialLanguage: 'en', initialPage: 'home' }));
  const errors = [];
  await act(async () => { root = hydrateRoot(container, createElement(App, { initialLanguage: 'en', initialPage: 'home' }), { onRecoverableError: error => errors.push(error.message) }); });
  assert.deepEqual(errors, []);
  assert.equal(document.documentElement.lang, 'de');
  assert.match(document.body.textContent, /Ausgewählte Arbeiten/);
  window.localStorage.clear();
});

test('language switches still work when browser storage is blocked', async () => {
  const originalStorage = globalThis.localStorage;
  globalThis.localStorage = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  try {
    await mount(App);
    await act(async () => { [...document.querySelectorAll('.header__languageButton')].find(button => button.textContent === 'DE').click(); });
    assert.equal(document.documentElement.lang, 'de');
  } finally {
    globalThis.localStorage = originalStorage;
  }
});

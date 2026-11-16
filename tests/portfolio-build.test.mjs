import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import sharp from 'sharp';

const exists = async url => { try { await access(url); return true; } catch { return false; } };
const fromDist = path => new URL(`../dist/${path}`, import.meta.url);

test('all production pages restrict scripts and resolve local assets', async () => {
  for (const file of ['index.html', 'sanctions-matcher.html', 'sanctions-monitor.html', 'fraud-detection.html', 'caesar-guitar-lab/index.html']) {
    const dom = new JSDOM(await readFile(fromDist(file), 'utf8'));
    const document = dom.window.document;
    const policy = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    assert(policy, `Missing CSP: ${file}`);
    const directives = new Map(policy.content.split(';').map(item => {
      const [name, ...values] = item.trim().split(/\s+/);
      return [name, values];
    }));
    assert.deepEqual(directives.get('script-src'), ["'self'"]);
    assert.deepEqual(directives.get('connect-src'), ["'self'"]);
    for (const name of ['object-src', 'base-uri', 'form-action', 'frame-src']) {
      assert.deepEqual(directives.get(name), ["'none'"]);
    }
    for (const script of document.querySelectorAll('script')) {
      assert(script.src, `Inline script blocked by CSP: ${file}`);
    }
    for (const element of document.querySelectorAll('[src], link[href]')) {
      const path = element.getAttribute('src') ?? element.getAttribute('href');
      if (/^(?:https?:|data:)/.test(path)) continue;
      const target = path.startsWith('/') ? fromDist(path.slice(1)) : new URL(path, fromDist(file));
      target.search = '';
      target.hash = '';
      assert(await exists(target), `Missing asset: ${file}: ${path}`);
    }
    assert.equal(document.querySelector('meta[name="referrer"]').content, 'strict-origin-when-cross-origin');
    dom.window.close();
  }
});

test('homepage and demos ship static content and distinct sharing metadata', async () => {
  const urls = new Set();
  const titles = new Set();
  for (const file of ['index.html', 'sanctions-matcher.html', 'sanctions-monitor.html', 'fraud-detection.html']) {
    const dom = new JSDOM(await readFile(fromDist(file), 'utf8'));
    const document = dom.window.document;
    assert.equal(document.querySelectorAll('h1').length, 1);
    assert(document.querySelector('#root').dataset.page);
    assert(document.querySelector('#main-content'));
    titles.add(document.title);
    urls.add(document.querySelector('link[rel="canonical"]').href);
    assert(document.querySelector('meta[name="description"]').content.length > 60);
    const image = document.querySelector('meta[property="og:image"]').content.split('/').at(-1);
    assert(await exists(fromDist(image)));
    const dimensions = await sharp(await readFile(fromDist(image))).metadata();
    assert.equal(dimensions.format, 'png');
    assert.equal(dimensions.width, 1200);
    assert.equal(dimensions.height, 630);
    if (file === 'index.html') {
      const sections = [...document.querySelectorAll('main > section')].map(section => section.id);
      assert.deepEqual(sections, ['hero', 'about', 'case-studies', 'experience', 'skills', 'contact']);
      assert.equal(document.querySelectorAll('.portfolioProjectCard').length, 3);
      assert(document.querySelector('.personalProject'));
      assert.equal(document.querySelectorAll('.projectCard__clients').length, 1);
    } else if (file === 'fraud-detection.html') {
      assert.match(document.body.textContent, /41 \/ 52/);
      assert.match(document.body.textContent, /175/);
      assert.match(document.body.textContent, /Calibration|calibration/);
      assert(document.querySelector('a[download]'));
      assert.doesNotMatch(document.body.textContent, /Loading|coming soon/);
    } else {
      assert.match(document.body.textContent, /Loading/);
      assert.doesNotMatch(document.body.textContent, /FSF_XML|analysis\/raw/);
    }
    for (const link of document.querySelectorAll('a[href]')) {
      const href = link.getAttribute('href');
      if (href.startsWith('./') && href !== './') {
        const path = href.slice(2).split(/[?#]/)[0];
        assert(await exists(fromDist(path.endsWith('/') ? `${path}index.html` : path)), `Missing link target: ${href}`);
      }
    }
    dom.window.close();
  }
  assert.equal(titles.size, 4);
  assert.equal(urls.size, 4);
});

test('portrait assets retain colour and the homepage shows one compact navigation portrait', async () => {
  for (const width of [480, 800, 1254]) {
    const buffer = await readFile(fromDist(`images/julio-${width}.webp`));
    const image = sharp(buffer);
    const metadata = await image.metadata();
    assert.equal(metadata.width, width);
    assert.equal(metadata.format, 'webp');
    assert(buffer.length < 100_000);
    const stats = await image.stats();
    assert(Math.abs(stats.channels[0].mean - stats.channels[1].mean) > 0.5, 'Portrait lost its colour');
  }
  const dom = new JSDOM(await readFile(fromDist('index.html'), 'utf8'));
  const portrait = dom.window.document.querySelector('.header__brand img');
  assert(portrait);
  assert.match(portrait.getAttribute('src'), /images\/julio-480\.webp$/);
  assert.equal(portrait.getAttribute('width'), '80');
  assert.equal(portrait.getAttribute('height'), '80');
  assert.equal(dom.window.document.querySelectorAll('img[src*="julio-"]').length, 1);
  assert.equal(dom.window.document.querySelector('.hero img'), null);
  dom.window.close();
});

test('obsolete CV is absent and the refreshed sanctions dataset is included unchanged', async () => {
  assert.equal(await exists(new URL('../public/cv-julio-caesar.pdf', import.meta.url)), false);
  assert.equal(await exists(fromDist('cv-julio-caesar.pdf')), false);
  for (const file of ['eu-sanctions-matcher.json', 'eu-sanctions-pipeline-status.json']) {
    assert.equal(await readFile(fromDist(`data/${file}`), 'utf8'), await readFile(new URL(`../public/data/${file}`, import.meta.url), 'utf8'));
  }
});

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { JSDOM } from 'jsdom';
import sharp from 'sharp';

const exists = async url => { try { await access(url); return true; } catch { return false; } };
const fromDist = path => new URL(`../dist/${path}`, import.meta.url);

test('homepage and demos ship static content and distinct sharing metadata', async () => {
  const urls = new Set();
  const titles = new Set();
  for (const file of ['index.html', 'sanctions-matcher.html', 'sanctions-monitor.html']) {
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
  assert.equal(titles.size, 3);
  assert.equal(urls.size, 3);
});

test('responsive portraits are smaller, correctly sized, and retain colour', async () => {
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
  assert.match(dom.window.document.querySelector('.hero__portrait img').srcset, /480w.*800w.*1254w/);
  dom.window.close();
});

test('obsolete CV is absent and the refreshed sanctions dataset is included unchanged', async () => {
  assert.equal(await exists(new URL('../public/cv-julio-caesar.pdf', import.meta.url)), false);
  assert.equal(await exists(fromDist('cv-julio-caesar.pdf')), false);
  for (const file of ['eu-sanctions-matcher.json', 'eu-sanctions-pipeline-status.json']) {
    assert.equal(await readFile(fromDist(`data/${file}`), 'utf8'), await readFile(new URL(`../public/data/${file}`, import.meta.url), 'utf8'));
  }
});

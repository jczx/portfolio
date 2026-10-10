import { readFile, writeFile, access } from 'node:fs/promises';
import { PassThrough } from 'node:stream';
import { build } from 'vite';
import { renderToPipeableStream } from 'react-dom/server';
import { JSDOM } from 'jsdom';

// Compile the existing React app for Node; only the generated HTML goes into dist.
await build({
  logLevel: 'warn',
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'node_modules/.cache/portfolio-ssr',
    emptyOutDir: true,
    rolldownOptions: { input: 'src/entry-server.tsx', output: { entryFileNames: 'entry-server.js' } },
  },
});
const { createPage, getSiteMetadata, pageFiles } = await import('../node_modules/.cache/portfolio-ssr/entry-server.js');
const template = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');

const render = page => new Promise((resolve, reject) => {
  const output = new PassThrough();
  const chunks = [];
  output.on('data', chunk => chunks.push(chunk));
  output.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
  output.on('error', reject);
  const stream = renderToPipeableStream(createPage(page), {
    onAllReady() { stream.pipe(output); },
    onError(error) { reject(error); },
  });
});

for (const [page, file] of Object.entries(pageFiles)) {
  const metadata = getSiteMetadata(page, 'en');
  await access(new URL(`../public/${metadata.image.split('/').at(-1)}`, import.meta.url));
  const dom = new JSDOM(template);
  const document = dom.window.document;
  const root = document.getElementById('root');
  root.dataset.page = page;
  root.innerHTML = await render(page);
  document.title = metadata.title;
  document.querySelector('link[rel="canonical"]').href = metadata.url;
  for (const [selector, content] of [
    ['meta[name="description"]', metadata.description],
    ['meta[property="og:title"]', metadata.title],
    ['meta[property="og:description"]', metadata.description],
    ['meta[property="og:url"]', metadata.url],
    ['meta[property="og:image"]', metadata.image],
    ['meta[property="og:image:type"]', 'image/png'],
    ['meta[name="twitter:title"]', metadata.title],
    ['meta[name="twitter:description"]', metadata.description],
    ['meta[name="twitter:image"]', metadata.image],
  ]) document.querySelector(selector).setAttribute('content', content);
  await writeFile(new URL(`../dist/${file}`, import.meta.url), dom.serialize());
  dom.window.close();
  console.log(`Static HTML ready: ${file}`);
}

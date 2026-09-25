import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile,access} from 'node:fs/promises';
import {resolve,dirname,sep} from 'node:path';
import {fileURLToPath} from 'node:url';

const dist=fileURLToPath(new URL('../dist/',import.meta.url));
const guitar=resolve(dist,'caesar-guitar-lab/index.html');

async function localAsset(reference,from) {
  assert.ok(!reference.startsWith('/'),`Asset must support a relative base: ${reference}`);
  const destination=resolve(dirname(from),decodeURIComponent(reference.split(/[?#]/)[0]));
  assert.ok(destination.startsWith(dist.endsWith(sep)?dist:dist+sep),`Asset escapes dist: ${reference}`);
  await access(destination);
  return destination;
}

test('the guitar app has a direct HTML page and all its static assets',async()=>{
  const html=await readFile(guitar,'utf8');
  assert.match(html,/<title>Caesar’s Fret Lab \| Julio Caesar<\/title>/);
  assert.match(html,/https:\/\/julio-caesar\.com\/caesar-guitar-lab\//);
  const assets=[...html.matchAll(/(?:src|href)="([^"]+)"/g)]
    .map(match=>match[1]).filter(value=>!/^https?:/.test(value));
  assert.ok(assets.some(asset=>asset.endsWith('.js')));
  assert.ok(assets.some(asset=>asset.endsWith('.css')));
  for(const asset of assets) {
    const path=await localAsset(asset,guitar);
    if(path.endsWith('.css')) {
      const css=await readFile(path,'utf8');
      for(const match of css.matchAll(/url\(["']?([^"'()]+)["']?\)/g)) {
        if(!match[1].startsWith('data:')) await localAsset(match[1],path);
      }
    }
  }
  const font=await readFile(resolve(dist,'caesar-guitar-lab-assets/fonts/inter-latin-variable.woff2'));
  assert.equal(font.subarray(0,4).toString(),'wOF2');
  const scriptFont=await readFile(resolve(dist,'caesar-guitar-lab-assets/fonts/lobster-regular.ttf'));
  assert.equal(scriptFont.readUInt32BE(0),0x00010000);
});

test('the portfolio homepage stays separate and links to the guitar page in both languages',async()=>{
  const home=await readFile(resolve(dist,'index.html'),'utf8');
  const app=await readFile(guitar,'utf8');
  const appStyles=[...app.matchAll(/href="([^"]+\.css)"/g)].map(match=>match[1].split('/').at(-1));
  for(const stylesheet of appStyles) assert.ok(!home.includes(stylesheet),'Guitar styles leaked into the homepage');
  const data=await readFile(new URL('../src/data/portfolioProjects.ts',import.meta.url),'utf8');
  assert.equal((data.match(/title: "Caesar’s Fret Lab"/g)||[]).length,2);
  assert.equal((data.match(/href: "\.\/caesar-guitar-lab\/"/g)||[]).length,2);
  assert.ok(data.includes('?case=eu-sanctions-name-match'));
  assert.ok(data.includes('?case=sanctions-pipeline-monitor'));
});

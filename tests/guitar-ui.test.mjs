import test, {after} from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import ts from 'typescript';
import {JSDOM} from 'jsdom';

const dom=new JSDOM('<!doctype html><div id="root"></div>',{url:'https://example.test/caesar-guitar-lab/'});
globalThis.window=dom.window;
globalThis.document=dom.window.document;
globalThis.HTMLElement=dom.window.HTMLElement;
globalThis.IS_REACT_ACT_ENVIRONMENT=true;
const {createElement,act}=await import('react');
const {createRoot}=await import('react-dom/client');
const sourceUrl=new URL('../src/caesar-guitar-lab/CaesarGuitarLab.tsx',import.meta.url);
async function compileModule(url) {
  const source=await readFile(url,'utf8');
  let compiled=ts.transpileModule(source,{compilerOptions:{jsx:ts.JsxEmit.ReactJSX,module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2022}}).outputText;
  for(const match of [...compiled.matchAll(/from (["'])([^"']+)\1/g)]) {
    const id=match[2];
    const resolved=id.startsWith('.')?await compileModule(new URL(id+'.ts',url)):import.meta.resolve(id);
    compiled=compiled.replace(match[0],`from "${resolved}"`);
  }
  return 'data:text/javascript;base64,'+Buffer.from(compiled+'\n//# sourceURL='+url.href+'.test.js').toString('base64');
}
const {default:App}=await import(await compileModule(sourceUrl));
let root;
async function mount() {
  if(root) await act(()=>root.unmount());
  root=createRoot(document.getElementById('root'));
  await act(()=>root.render(createElement(App)));
  await act(()=>document.querySelector('.sound-toggle input').click());
}
async function mode(id) {await act(()=>document.querySelectorAll('.mode-tab')[id].click());}
async function change(selector,value) {
  const element=document.querySelector(selector);
  assert.ok(element,selector);
  const prototype=element.tagName==='SELECT'?dom.window.HTMLSelectElement.prototype:dom.window.HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(prototype,'value').set.call(element,String(value));
  await act(()=>{
    element.dispatchEvent(new dom.window.Event('input',{bubbles:true}));
    element.dispatchEvent(new dom.window.Event('change',{bubbles:true}));
  });
}
const fingering=()=>[0,1,2,3,4,5].map(string=>{
  const dot=document.querySelector(`.fret-cell.selected[data-string="${string}"]`);
  return dot?Number(dot.dataset.fret):null;
});

test('moving neck position selects and redraws a chord there',async()=>{
  await mount();
  await mode(1);
  const before=fingering();
  await change('.neck-position input',5);
  assert.equal(document.querySelector('.fret-number-row').children[3].textContent,'5');
  assert.notDeepEqual(fingering(),before);
  assert.ok(fingering().some(f=>f!==null&&f>=5),'Chord must be shown in the new view');
  assert.equal(document.querySelector('.offscreen-notice'),null);
  assert.ok(document.querySelector('.string-readout').textContent.includes('5'));
});

test('C minor at position 3 draws the conventional x35543 barre',async()=>{
  await mount();
  await mode(1);
  await change('.quality-select select','minor');
  await change('.neck-position input',3);
  assert.deepEqual(fingering(),[null,3,5,5,4,3]);
  assert.equal(document.querySelector('.chord-symbol').textContent,'Cm');
  assert.deepEqual([...document.querySelectorAll('.tone-chip strong')].map(e=>e.textContent),['C','E♭','G']);
  const active=document.querySelector('.voicing-card[aria-pressed="true"]');
  assert.ok(active);
  assert.ok(active.textContent.includes('Fret 3'));
  await change('.neck-position input',8);
  assert.deepEqual(fingering(),[8,10,10,8,8,8]);
});

test('identify mode pans without changing the notes the player entered',async()=>{
  await mount();
  const before=document.querySelector('.string-readout').textContent;
  await change('.neck-position input',9);
  assert.equal(document.querySelector('.string-readout').textContent,before);
  assert.equal(document.querySelector('.chord-symbol').textContent,'C');
  assert.ok(document.querySelector('.offscreen-notice'));
});

test('arrow controls, root changes, and shape cards keep diagram and readout synchronized',async()=>{
  await mount();
  await mode(1);
  await change('.quality-select select','minor');
  await change('.neck-position input',3);
  await act(()=>document.querySelector('[aria-label="Move toward the bridge"]').click());
  assert.equal(document.querySelector('.neck-position input').value,'4');
  await change('.selection-bar label:first-child select',4);
  await change('.neck-position input',5);
  assert.ok(fingering().some(f=>f!==null&&f>=5));
  const cards=document.querySelectorAll('.voicing-card');
  await act(()=>cards[1].click());
  const selected=document.querySelector('.voicing-card[aria-pressed="true"] .voicing-frets').textContent;
  assert.equal(document.querySelector('.string-readout strong').textContent,selected);
  assert.equal(document.querySelector('.offscreen-notice'),null);
});

test('major blues renders the correct notes and updates with the neck',async()=>{
  await mount();
  await mode(2);
  await change('.quality-select select','major-blues');
  assert.deepEqual([...document.querySelectorAll('.tone-chip strong')].map(e=>e.textContent),['C','D','E♭','E','G','A']);
  await change('.neck-position input',5);
  const selected=[...document.querySelectorAll('.fret-cell.selected')];
  assert.ok(selected.length>6);
  for(const cell of selected) {
    const midi=[40,45,50,55,59,64][Number(cell.dataset.string)]+Number(cell.dataset.fret);
    assert.ok([0,2,3,4,7,9].includes(midi%12));
  }
  assert.equal(document.querySelectorAll('.fret-cell[data-fret="1"]').length,0);
  assert.equal(document.querySelectorAll('.fret-cell[data-fret="16"]').length,6);
});

after(async()=>{if(root) await act(()=>root.unmount());dom.window.close();});

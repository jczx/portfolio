import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createSanctionsIndex, rankSanctionsMatches } from '../src/utils/sanctionsMatcher.ts';
import { getSourceFreshness, isSanctionsDataset, isPipelineStatus } from '../src/utils/sanctionsData.ts';
import { getPageFromLocation } from '../src/data/siteMetadata.ts';

const dataset = JSON.parse(await readFile(new URL('../public/data/eu-sanctions-matcher.json', import.meta.url), 'utf8'));
const pipeline = JSON.parse(await readFile(new URL('../public/data/eu-sanctions-pipeline-status.json', import.meta.url), 'utf8'));
const index = createSanctionsIndex(dataset.entries);

test('an official Cyrillic name and its Latin alias both find the same record', () => {
  const entry = dataset.entries.find(row => row.fsdId === 'EU.14412.86');
  assert(entry);
  for (const query of [entry.primaryName, entry.aliases[0]]) {
    const match = rankSanctionsMatches(query, index).find(row => row.entry.fsdId === entry.fsdId);
    assert(match && match.score >= 0.9, query);
  }
});

test('Arabic, Chinese, and Japanese names survive matching, including voiced kana', () => {
  const entries = ['أحمد علي', '王小明', 'ガク'].map((primaryName, id) => ({
    fsdId: String(id), type: 'P', primaryName, aliases: [], designationDate: '', regime: 'test',
  }));
  const localIndex = createSanctionsIndex(entries);
  for (const entry of entries) assert.equal(rankSanctionsMatches(entry.primaryName, localIndex)[0].entry.fsdId, entry.fsdId);
  assert.notEqual(localIndex[2].aliases[0].normalized, 'カク');
});

test('Latin accents, case, and punctuation still normalise; empty queries return nothing', () => {
  const entry = { fsdId: 'accent', type: 'P', primaryName: 'José Pérez', aliases: [], designationDate: '', regime: 'test' };
  const localIndex = createSanctionsIndex([entry]);
  assert(rankSanctionsMatches('  JOSE, PEREZ  ', localIndex)[0].score >= 0.9);
  assert.deepEqual(rankSanctionsMatches(' -- ', localIndex), []);
});

test('JSON validation accepts the current files and rejects corrupt payloads', () => {
  assert(isSanctionsDataset(dataset));
  assert(isPipelineStatus(pipeline));
  assert(!isSanctionsDataset({ ...dataset, entries: [] }));
  assert(!isSanctionsDataset({ ...dataset, meta: { ...dataset.meta, recordCount: 4 } }));
  assert(!isPipelineStatus({ ...pipeline, metrics: { ...pipeline.metrics, personCount: -1 } }));
  assert(!isPipelineStatus({ ...pipeline, checks: [{ id: 'parse', status: 'unknown' }] }));
});

test('freshness uses the present time rather than the status saved at build time', () => {
  const now = Date.parse('2026-10-10T12:00:00Z');
  assert.equal(getSourceFreshness('2026-10-09T12:00:00Z', now).status, 'healthy');
  assert.equal(getSourceFreshness('2026-10-08T12:00:00Z', now).status, 'healthy');
  assert.equal(getSourceFreshness('2026-10-08T11:00:00Z', now).status, 'watch');
  assert.equal(getSourceFreshness('invalid', now).status, 'watch');
  assert.equal(getSourceFreshness('2026-10-11T12:00:00Z', now).status, 'watch');
});

test('new static demo URLs and old query links work under a GitHub Pages prefix', () => {
  assert.equal(getPageFromLocation({ pathname: '/portfolio/sanctions-matcher.html', search: '' }), 'eu-sanctions-name-match');
  assert.equal(getPageFromLocation({ pathname: '/portfolio/sanctions-monitor.html', search: '' }), 'sanctions-pipeline-monitor');
  assert.equal(getPageFromLocation({ pathname: '/portfolio/', search: '?case=eu-sanctions-name-match' }), 'eu-sanctions-name-match');
  assert.equal(getPageFromLocation({ pathname: '/portfolio/', search: '?case=unknown' }), 'home');
});

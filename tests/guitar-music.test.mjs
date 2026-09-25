import test from 'node:test';
import assert from 'node:assert/strict';
import { CHORDS, SCALES, QUICK_CHORDS, TUNING, identifyChord, findVoicings, formulaNotes, pitchClasses, soundingNotes, spelledNotes, scaleSequence, scaleSteps, midiFrequency } from '../src/caesar-guitar-lab/lib/music.ts';

test('recognizes familiar open and barre chords', () => {
  for (const shape of QUICK_CHORDS) assert.equal(identifyChord(shape.frets)[0]?.symbol,shape.name,shape.name);
  assert.equal(identifyChord([null,2,4,4,3,2])[0].symbol,'Bm');
  assert.equal(identifyChord([0,2,0,1,0,0])[0].symbol,'E7');
});
test('uses the actual lowest pitch for inversion names', () => {
  assert.equal(identifyChord([0,3,2,0,1,0])[0].symbol,'C/E');
  // Low-E fret 24 sounds higher than A-string fret 3 (C3).
  assert.equal(identifyChord([24,3,5,null,null,null])[0].symbol,'C');
});
test('handles silence, octaves, dyads, and unknown pitch collections honestly', () => {
  assert.deepEqual(identifyChord([null,null,null,null,null,null]),[]);
  assert.deepEqual(identifyChord([0,null,null,null,null,0]),[]);
  assert.equal(identifyChord([3,5,null,null,null,null])[0].symbol,'G5');
  assert.deepEqual(identifyChord([0,0,0,0,0,0]),[]);
});
test('retains valid alternative chord names', () => {
  const names = identifyChord([null,0,2,0,1,0]).map(m=>m.symbol);
  assert.ok(names.includes('Am7'));
  assert.ok(names.includes('C6/A'));
  assert.equal(identifyChord([null,null,2,3,2,3]).filter(m=>m.formula.id==='dim7').length,4);
});
test('transposed chord formulas are recognized at every root', () => {
  for (const chord of CHORDS) for (let root=0;root<12;root++) {
    const frets = Array(6).fill(null);
    chord.intervals.forEach((interval,string) => {frets[string] = ((root+interval-TUNING[string])%12+12)%12;});
    assert.ok(identifyChord(frets).some(m=>m.root===root && m.formula.id===chord.id),`${root} ${chord.id}`);
  }
});
test('finder shapes contain the complete formula, valid frets, and a limited hand span', () => {
  for (const chord of CHORDS) for (let root=0;root<12;root++) {
    const voicings = findVoicings(root,chord);
    assert.ok(voicings.length>0,`Missing ${root} ${chord.id}`);
    for (const voicing of voicings) {
      assert.deepEqual(pitchClasses(soundingNotes(voicing.frets)),[...formulaNotes(root,chord)].sort((a,b)=>a-b));
      assert.ok(voicing.frets.every(f=>f===null || Number.isInteger(f) && f>=0 && f<=24));
      const pressed = voicing.frets.filter(f=>f!==null && f>0);
      assert.ok(!pressed.length || Math.max(...pressed)-Math.min(...pressed)<=3);
    }
  }
});
test('finder offers positions up the neck and does not duplicate shapes', () => {
  const voicings = findVoicings(0,CHORDS[0]);
  assert.ok(voicings.some(v=>v.position<=3));
  assert.ok(voicings.some(v=>v.position>=12));
  assert.equal(new Set(voicings.map(v=>v.frets.join(','))).size,voicings.length);
});
test('spells scale and chord degrees correctly, including enharmonic notes', () => {
  assert.deepEqual(spelledNotes(1,SCALES[0]),['C♯','D♯','E♯','F♯','G♯','A♯','B♯']);
  assert.deepEqual(spelledNotes(3,SCALES[0]),['E♭','F','G','A♭','B♭','C','D']);
  assert.deepEqual(spelledNotes(0,CHORDS.find(c=>c.id==='dim7')),['C','E♭','G♭','B♭♭']);
});
test('scale playback follows interval steps and includes the octave', () => {
  for (const scale of SCALES) {
    const up=scaleSequence(9,scale,'up');
    assert.equal(up[0],57);
    assert.equal(up.at(-1),69);
    assert.equal(up.length,scale.intervals.length+1);
    assert.deepEqual(scaleSequence(9,scale,'down'),[...up].reverse());
    assert.deepEqual(scaleSequence(9,scale,'both'),[...up,...up.slice(0,-1).reverse()]);
  }
  assert.deepEqual(scaleSteps(SCALES[0]),['W','W','H','W','W','W','H']);
  assert.equal(midiFrequency(69),440);
  assert.equal(midiFrequency(81),880);
});

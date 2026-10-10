import test from 'node:test';
import assert from 'node:assert/strict';
import { CHORDS, SCALES, QUICK_CHORDS, TUNING, identifyChord, findVoicings, voicingAtPosition, formulaNotes, pitchClasses, soundingNotes, spelledNotes, scaleSequence, scaleSteps, midiFrequency } from '../src/caesar-guitar-lab/lib/music.ts';

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

test('includes the standard third-fret C minor barre and its exact notes', () => {
  const shape=[null,3,5,5,4,3];
  assert.equal(identifyChord(shape)[0].symbol,'Cm');
  assert.deepEqual(soundingNotes(shape),[48,55,60,63,67]);
  assert.ok(findVoicings(0,CHORDS.find(c=>c.id==='minor')).some(v=>v.frets.join(',')===shape.join(',')));
});

test('keeps standard E and A major/minor barre shapes in every key', () => {
  for (const [id,shapes] of [
    ['major',[[0,2,2,1,0,0],[null,0,2,2,2,0]]],
    ['minor',[[0,2,2,0,0,0],[null,0,2,2,1,0]]],
  ]) for (const [index,shape] of shapes.entries()) for(let fret=1;fret<=12;fret++) {
    const root=((index===0?4:9)+fret)%12;
    const shifted=shape.map(f=>f===null?null:f+fret);
    assert.ok(findVoicings(root,CHORDS.find(c=>c.id===id)).some(v=>v.frets.join(',')===shifted.join(',')),`${id} ${root}: ${shifted}`);
  }
});

test('major blues uses 1, 2, flat 3, 3, 5, 6 in all keys', () => {
  const blues=SCALES.find(s=>s.id==='major-blues');
  assert.ok(blues,'Major blues must be available');
  assert.deepEqual(blues.intervals,[0,2,3,4,7,9]);
  assert.deepEqual(blues.degrees,['1','2','♭3','3','5','6']);
  assert.deepEqual(spelledNotes(0,blues),['C','D','E♭','E','G','A']);
  for(let root=0;root<12;root++) {
    assert.deepEqual(formulaNotes(root,blues),[0,2,3,4,7,9].map(i=>(root+i)%12));
    assert.equal(scaleSequence(root,blues,'up').at(-1)-scaleSequence(root,blues,'up')[0],12);
  }
});

test('position changes select a visible fretted shape for every chord and key',()=>{
  for(const chord of CHORDS) for(let root=0;root<12;root++) {
    const voicings=findVoicings(root,chord);
    for(let start=1;start<=13;start++) {
      const index=voicingAtPosition(voicings,start);
      assert.ok(index>=0,`${root} ${chord.id} at ${start}`);
      const shape=voicings[index];
      assert.ok(shape.frets.every(f=>f===null||f===0||f>=start&&f<=start+11));
      if(start>1) assert.ok(shape.frets.some(f=>f!==null&&f>=start));
    }
  }
  const em=findVoicings(4,CHORDS.find(c=>c.id==='minor'));
  assert.deepEqual(em[voicingAtPosition(em,1)].frets,[0,2,2,0,0,0]);
});
test('spells scale and chord degrees correctly, including enharmonic notes', () => {
  assert.deepEqual(spelledNotes(1,SCALES[0]),['C♯','D♯','E♯','F♯','G♯','A♯','B♯']);
  assert.deepEqual(spelledNotes(3,SCALES[0]),['E♭','F','G','A♭','B♭','C','D']);
  assert.deepEqual(spelledNotes(0,CHORDS.find(c=>c.id==='dim7')),['C','E♭','G♭','B♭♭']);
});

test('all chord and scale degree labels agree with the pitches they describe', () => {
  const majorDegrees=[0,2,4,5,7,9,11];
  const naturalPitches={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
  for(const formula of [...CHORDS,...SCALES]) {
    assert.equal(formula.degrees.length,formula.intervals.length,formula.id);
    assert.equal(new Set(formula.intervals).size,formula.intervals.length,formula.id);
    for(const [index,degree] of formula.degrees.entries()) {
      const number=Number(degree.replace(/[^0-9]/g,''));
      const offset=[...degree].filter(c=>c==='♯').length-[...degree].filter(c=>c==='♭').length;
      assert.equal((majorDegrees[(number-1)%7]+offset+12)%12,formula.intervals[index],formula.id+' '+degree);
    }
    for(let root=0;root<12;root++) for(const [index,name] of spelledNotes(root,formula).entries()) {
      const offset=[...name].filter(c=>c==='♯').length-[...name].filter(c=>c==='♭').length;
      assert.equal((naturalPitches[name[0]]+offset+12)%12,(root+formula.intervals[index])%12,name);
    }
  }
});

test('diatonic modes are rotations of major; minor variants and pentatonics retain their definitions', () => {
  const major=[0,2,4,5,7,9,11];
  for(const [rotation,id] of ['major','dorian','phrygian','lydian','mixolydian','minor','locrian'].entries()) {
    const expected=major.map(n=>(n-major[rotation]+12)%12).sort((a,b)=>a-b);
    assert.deepEqual(SCALES.find(s=>s.id===id).intervals,expected,id);
  }
  assert.deepEqual(SCALES.find(s=>s.id==='harmonic-minor').intervals,[0,2,3,5,7,8,11]);
  assert.deepEqual(SCALES.find(s=>s.id==='melodic-minor').intervals,[0,2,3,5,7,9,11]);
  assert.deepEqual(SCALES.find(s=>s.id==='major-pent').intervals,[0,2,4,7,9]);
  assert.deepEqual(SCALES.find(s=>s.id==='minor-pent').intervals,[0,3,5,7,10]);
  assert.deepEqual(SCALES.find(s=>s.id==='blues').intervals,[0,3,5,6,7,10]);
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

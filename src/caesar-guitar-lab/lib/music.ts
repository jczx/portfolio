/** Pitch classes use C = 0; string arrays always run low E to high e. */
export const TUNING = [40, 45, 50, 55, 59, 64] as const;
export const ROOT_NAMES = ['C', 'C♯', 'D', 'E♭', 'E', 'F', 'F♯', 'G', 'A♭', 'A', 'B♭', 'B'];
export type Fingering = (number | null)[];
export type Formula = { id: string; name: string; suffix: string; intervals: number[]; degrees: string[]; description: string };
export const CHORDS: Formula[] = [
  { id: 'major', name: 'Major', suffix: '', intervals: [0,4,7], degrees: ['1','3','5'], description: 'The root, a major third, and a perfect fifth. A bright, stable starting point.' },
  { id: 'minor', name: 'Minor', suffix: 'm', intervals: [0,3,7], degrees: ['1','♭3','5'], description: 'Lower the major third by one fret to hear the darker color of a minor chord.' },
  { id: '7', name: 'Dominant 7th', suffix: '7', intervals: [0,4,7,10], degrees: ['1','3','5','♭7'], description: 'A major chord with a minor seventh. Listen for the tension that wants to resolve.' },
  { id: 'maj7', name: 'Major 7th', suffix: 'maj7', intervals: [0,4,7,11], degrees: ['1','3','5','7'], description: 'A major chord with a major seventh: an open, mellow sound.' },
  { id: 'm7', name: 'Minor 7th', suffix: 'm7', intervals: [0,3,7,10], degrees: ['1','♭3','5','♭7'], description: 'A minor chord with a minor seventh. Common in jazz, soul, and pop.' },
  { id: 'sus2', name: 'Suspended 2nd', suffix: 'sus2', intervals: [0,2,7], degrees: ['1','2','5'], description: 'Replace the third with a second. With no third, it is neither major nor minor.' },
  { id: 'sus4', name: 'Suspended 4th', suffix: 'sus4', intervals: [0,5,7], degrees: ['1','4','5'], description: 'Replace the third with a fourth. Try moving the fourth down to the third.' },
  { id: '5', name: 'Power chord', suffix: '5', intervals: [0,7], degrees: ['1','5'], description: 'Just the root and fifth, often with a doubled root. No third means no major or minor quality.' },
  { id: 'dim', name: 'Diminished', suffix: 'dim', intervals: [0,3,6], degrees: ['1','♭3','♭5'], description: 'A minor third and diminished fifth give this triad its tense, unstable sound.' },
  { id: 'aug', name: 'Augmented', suffix: 'aug', intervals: [0,4,8], degrees: ['1','3','♯5'], description: 'A major chord with a raised fifth. Its symmetry allows more than one root interpretation.' },
  { id: '6', name: 'Major 6th', suffix: '6', intervals: [0,4,7,9], degrees: ['1','3','5','6'], description: 'A major triad with a sixth. The same notes can also form a minor seventh chord.' },
  { id: 'm6', name: 'Minor 6th', suffix: 'm6', intervals: [0,3,7,9], degrees: ['1','♭3','5','6'], description: 'A minor triad with a major sixth. A distinctive color in jazz and minor-key music.' },
  { id: 'add9', name: 'Add 9', suffix: 'add9', intervals: [0,2,4,7], degrees: ['1','9','3','5'], description: 'A major triad with an added ninth (the same pitch class as the second), without a seventh.' },
  { id: 'madd9', name: 'Minor add 9', suffix: 'm(add9)', intervals: [0,2,3,7], degrees: ['1','9','♭3','5'], description: 'A minor triad with an added ninth, without a seventh.' },
  { id: 'm7b5', name: 'Half-diminished 7th', suffix: 'm7♭5', intervals: [0,3,6,10], degrees: ['1','♭3','♭5','♭7'], description: 'A diminished triad with a minor seventh. Also called a half-diminished chord.' },
  { id: 'dim7', name: 'Diminished 7th', suffix: 'dim7', intervals: [0,3,6,9], degrees: ['1','♭3','♭5','♭♭7'], description: 'Four notes spaced in minor thirds. Multiple names are valid; the musical context decides the root.' },
  { id: 'mmaj7', name: 'Minor major 7th', suffix: 'm(maj7)', intervals: [0,3,7,11], degrees: ['1','♭3','5','7'], description: 'A minor triad with a major seventh: a tense, cinematic sound.' },
  { id: '9', name: 'Dominant 9th', suffix: '9', intervals: [0,2,4,7,10], degrees: ['1','9','3','5','♭7'], description: 'A dominant seventh with an added ninth. The finder includes every chord tone.' },
  { id: 'maj9', name: 'Major 9th', suffix: 'maj9', intervals: [0,2,4,7,11], degrees: ['1','9','3','5','7'], description: 'A major seventh with an added ninth. A rich, spacious harmony.' },
  { id: 'm9', name: 'Minor 9th', suffix: 'm9', intervals: [0,2,3,7,10], degrees: ['1','9','♭3','5','♭7'], description: 'A minor seventh with an added ninth. A warm, layered minor sound.' },
];
export const SCALES: Formula[] = [
  { id: 'major', name: 'Major', suffix: '', intervals: [0,2,4,5,7,9,11], degrees: ['1','2','3','4','5','6','7'], description: 'The foundation of major-key melodies. Start and finish on the root to hear the key clearly.' },
  { id: 'minor', name: 'Natural minor', suffix: '', intervals: [0,2,3,5,7,8,10], degrees: ['1','2','♭3','4','5','♭6','♭7'], description: 'A seven-note minor scale. Compare its third, sixth, and seventh with the major scale.' },
  { id: 'minor-pent', name: 'Minor pentatonic', suffix: '', intervals: [0,3,5,7,10], degrees: ['1','♭3','4','5','♭7'], description: 'Five notes used throughout rock, blues, and pop. A useful first scale for improvisation.' },
  { id: 'major-pent', name: 'Major pentatonic', suffix: '', intervals: [0,2,4,7,9], degrees: ['1','2','3','5','6'], description: 'Five notes with an open, melodic sound. Try short phrases that return to the root.' },
  { id: 'blues', name: 'Minor blues', suffix: '', intervals: [0,3,5,6,7,10], degrees: ['1','♭3','4','♭5','5','♭7'], description: 'The minor pentatonic plus a blue note: the flattened fifth. Use it as a passing tone.' },
  { id: 'major-blues', name: 'Major blues', suffix: '', intervals: [0,2,3,4,7,9], degrees: ['1','2','♭3','3','5','6'], description: 'Major pentatonic with a passing minor third.' },
  { id: 'dorian', name: 'Dorian', suffix: '', intervals: [0,2,3,5,7,9,10], degrees: ['1','2','♭3','4','5','6','♭7'], description: 'A minor mode with a natural sixth. Compare it with natural minor to hear the difference.' },
  { id: 'mixolydian', name: 'Mixolydian', suffix: '', intervals: [0,2,4,5,7,9,10], degrees: ['1','2','3','4','5','6','♭7'], description: 'A major mode with a flattened seventh. Try it alongside a dominant seventh chord.' },
  { id: 'phrygian', name: 'Phrygian', suffix: '', intervals: [0,1,3,5,7,8,10], degrees: ['1','♭2','♭3','4','5','♭6','♭7'], description: 'A minor mode with a flattened second. Hear the half-step between the root and second.' },
  { id: 'lydian', name: 'Lydian', suffix: '', intervals: [0,2,4,6,7,9,11], degrees: ['1','2','3','♯4','5','6','7'], description: 'A major mode with a raised fourth, creating its characteristic floating sound.' },
  { id: 'locrian', name: 'Locrian', suffix: '', intervals: [0,1,3,5,6,8,10], degrees: ['1','♭2','♭3','4','♭5','♭6','♭7'], description: 'A mode with a diminished fifth. Its root triad is diminished, giving it an unsettled sound.' },
  { id: 'harmonic-minor', name: 'Harmonic minor', suffix: '', intervals: [0,2,3,5,7,8,11], degrees: ['1','2','♭3','4','5','♭6','7'], description: 'Natural minor with a raised seventh, creating a strong pull back to the root.' },
  { id: 'melodic-minor', name: 'Melodic minor (jazz)', suffix: '', intervals: [0,2,3,5,7,9,11], degrees: ['1','2','♭3','4','5','6','7'], description: 'The jazz form uses the same notes in both directions: major with a minor third.' },
];
export const QUICK_CHORDS = [
  { name: 'C', frets: [null,3,2,0,1,0] },
  { name: 'G', frets: [3,2,0,0,0,3] },
  { name: 'D', frets: [null,null,0,2,3,2] },
  { name: 'Am', frets: [null,0,2,2,1,0] },
  { name: 'Em', frets: [0,2,2,0,0,0] },
  { name: 'F', frets: [1,3,3,2,1,1] },
  { name: 'A7', frets: [null,0,2,0,2,0] },
  { name: 'Cmaj7', frets: [null,3,2,0,0,0] },
  { name: 'Cm', frets: [null,3,5,5,4,3] },
] satisfies {name: string; frets: Fingering}[];
export const pc = (note: number) => ((note % 12) + 12) % 12;
export const noteName = (note: number) => ROOT_NAMES[pc(note)];
export const midiFrequency = (midi: number) => 440 * 2 ** ((midi - 69) / 12);
export function soundingNotes(frets: Fingering): number[] {
  return frets.flatMap((fret, string) => fret === null ? [] : [TUNING[string] + fret]);
}
export const pitchClasses = (notes: number[]) => [...new Set(notes.map(pc))].sort((a,b) => a-b);
export const formulaNotes = (root: number, formula: Formula) => formula.intervals.map(i => pc(root+i));
export function spelledNotes(root: number, formula: Formula): string[] {
  const naturals = [0,2,4,5,7,9,11];
  const letters = ['C','D','E','F','G','A','B'];
  const rootLetter = letters.indexOf(noteName(root)[0]);
  return formula.intervals.map((interval, index) => {
    const degree = Number(formula.degrees[index].replace(/[^0-9]/g, ''));
    const letter = (rootLetter + degree - 1) % 7;
    let alteration = pc(root + interval - naturals[letter]);
    if (alteration > 6) alteration -= 12;
    return letters[letter] + (alteration > 0 ? '♯'.repeat(alteration) : '♭'.repeat(-alteration));
  });
}
export type Match = {root: number; formula: Formula; bass: number; symbol: string; score: number};
export function chordSymbol(root: number, formula: Formula, bass = root): string {
  const bassIndex = formulaNotes(root, formula).indexOf(pc(bass));
  const bassName = bassIndex >= 0 ? spelledNotes(root, formula)[bassIndex] : noteName(bass);
  return noteName(root) + formula.suffix + (pc(bass) === pc(root) ? '' : `/${bassName}`);
}
/** Exact pitch-class matches only. Duplicates and octaves do not change quality. */
export function identifyChord(frets: Fingering): Match[] {
  const notes = soundingNotes(frets);
  const selected = pitchClasses(notes);
  if (selected.length < 2) return [];
  const bass = pc(Math.min(...notes));
  const matches: Match[] = [];
  for (let root=0; root<12; root++) {
    CHORDS.forEach((formula, order) => {
      const expected = formulaNotes(root, formula);
      if (selected.length === expected.length && selected.every(n => expected.includes(n))) {
        matches.push({root, formula, bass, symbol: chordSymbol(root, formula, bass), score: (root === bass ? 100 : 0) - order});
      }
    });
  }
  return matches.sort((a,b) => b.score-a.score);
}
export type Voicing = { frets: Fingering; position: number; score: number; bass: number; barre: boolean };
function rateVoicing(frets: Fingering, root: number): Voicing | null {
  const pressed = frets.filter((f): f is number => f !== null && f > 0);
  const position = pressed.length ? Math.min(...pressed) : 0;
  const span = pressed.length ? Math.max(...pressed)-position : 0;
  if (span > 3) return null;
  const sounding = frets.map((f,i) => f === null ? -1 : i).filter(i => i >= 0);
  if (sounding.length < 2) return null;
  // Keep all sounded strings contiguous so the suggested shape can be strummed.
  if (sounding[sounding.length-1]-sounding[0]+1 !== sounding.length) return null;
  // Estimate one lowest-fret barre only when no open/lower note crosses it.
  const lowestStrings = frets.map((f,i) => f === position && position > 0 ? i : -1).filter(i => i>=0);
  const canBarre = lowestStrings.length > 1 && frets.slice(lowestStrings[0], lowestStrings[lowestStrings.length-1]+1).every(f => f !== null && f >= position);
  const fingers = pressed.length - (canBarre ? lowestStrings.length - 1 : 0);
  if (fingers > 4) return null;
  const bass = pc(Math.min(...soundingNotes(frets)));
  const opens = frets.filter(f => f === 0).length;
  return {frets: [...frets], position, bass, barre: canBarre && opens===0,
    score: position*1.2 + span*1.4 + fingers*0.6 + (6-sounding.length)*1.5 + (bass===root ? 0 : 6) - opens*0.5};
}
/** Search all four-fret windows, retaining full formulas and plausible hand spans. */
export function findVoicings(root: number, formula: Formula): Voicing[] {
  const allowed = new Set(formulaNotes(root, formula));
  const candidates = new Map<string, Voicing>();
  for (let base=1; base<=21; base++) {
    const choices = TUNING.map(tuning => {
      const frets: (number|null)[] = [null];
      if (base <= 4 && allowed.has(pc(tuning))) frets.push(0);
      for (let fret=base; fret<=Math.min(base+3,24); fret++) if (allowed.has(pc(tuning+fret))) frets.push(fret);
      return frets;
    });
    function visit(frets: Fingering, mask: number) {
      if (frets.length === 6) {
        if (allowed.size !== pitchClasses(soundingNotes(frets)).length) return;
        const rated = rateVoicing(frets,root);
        if (rated) candidates.set(frets.join(','),rated);
        return;
      }
      // More missing tones than remaining strings cannot complete the chord.
      let covered = 0;
      for (const tone of allowed) if (mask & (1<<tone)) covered++;
      if (allowed.size-covered > 6-frets.length) return;
      const string = frets.length;
      for (const fret of choices[string]) visit([...frets,fret], fret===null ? mask : mask | (1<<pc(TUNING[string]+fret)));
    }
    visit([],0);
  }
  // Keep familiar movable E/A shapes ahead of the generated alternatives.
  // All templates still pass the pitch, span, and finger-count checks above.
  const templates: Record<string, {root: number; frets: Fingering}[]> = {
    major: [{root:4,frets:[0,2,2,1,0,0]},{root:9,frets:[null,0,2,2,2,0]}],
    minor: [{root:4,frets:[0,2,2,0,0,0]},{root:9,frets:[null,0,2,2,1,0]}],
    '7': [{root:4,frets:[0,2,0,1,0,0]},{root:9,frets:[null,0,2,0,2,0]}],
    m7: [{root:4,frets:[0,2,0,0,0,0]},{root:9,frets:[null,0,2,0,1,0]}],
    maj7: [{root:9,frets:[null,0,2,1,2,0]}],
  };
  for (const template of templates[formula.id] ?? []) {
    for(let offset=pc(root-template.root);offset<=24;offset+=12) {
      const frets=template.frets.map(f=>f===null?null:f+offset);
      if(frets.some(f=>f!==null&&f>24)) continue;
      const tones=pitchClasses(soundingNotes(frets));
      if(tones.length!==allowed.size||!tones.every(t=>allowed.has(t))) continue;
      const rated=rateVoicing(frets,root);
      if(rated) candidates.set(frets.join(','),{...rated,score:rated.score-30});
    }
  }
  for(const shape of QUICK_CHORDS) {
    const tones=pitchClasses(soundingNotes(shape.frets));
    if(tones.length!==allowed.size||!tones.every(t=>allowed.has(t))) continue;
    const rated=rateVoicing(shape.frets,root);
    if(rated) candidates.set(shape.frets.join(','),{...rated,score:rated.score-30});
  }
  // Retain each fret position instead of dropping whole positions in broad buckets.
  const sorted = [...candidates.values()].sort((a,b) => a.score-b.score);
  const result: Voicing[] = [];
  for (let position=0;position<=24;position++) {
    result.push(...sorted.filter(v => v.position===position).slice(0,3));
  }
  return result.sort((a,b) => a.position-b.position || a.score-b.score);
}

/** Prefer the requested fret, then the nearest higher position in the visible neck. */
export function voicingAtPosition(voicings: Voicing[], start: number): number {
  const end=Math.min(24,start+11);
  const visible=voicings.map((voicing,index)=>({voicing,index})).filter(({voicing})=>
    (voicing.position>=start||start===1&&voicing.position===0)&&
    voicing.frets.every(f=>f===null||f===0||f>=start&&f<=end));
  if(start===1) {
    const lower=visible.filter(({voicing})=>voicing.position<=3).sort((a,b)=>a.voicing.score-b.voicing.score);
    if(lower.length) return lower[0].index;
  }
  visible.sort((a,b)=>a.voicing.position-b.voicing.position||a.voicing.score-b.voicing.score);
  return visible[0]?.index ?? -1;
}
export function scaleSequence(root: number, formula: Formula, direction: 'up'|'down'|'both'): number[] {
  const ascending = [...formula.intervals.map(i => 48+pc(root)+i),60+pc(root)];
  if (direction === 'down') return ascending.reverse();
  return direction === 'both' ? [...ascending,...ascending.slice(0,-1).reverse()] : ascending;
}
export function scaleSteps(formula: Formula): string[] {
  return formula.intervals.map((i,index) => {
    const gap = (formula.intervals[index+1] ?? 12)-i;
    return gap === 1 ? 'H' : gap === 2 ? 'W' : `${gap}H`;
  });
}
export const fretNotation = (frets: Fingering) => frets.map(f => f === null ? '×' : String(f)).join(' · ');

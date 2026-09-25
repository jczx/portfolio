
import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { GuitarAudio } from './lib/audio';
import { CHORDS, SCALES, TUNING, ROOT_NAMES, QUICK_CHORDS, type Fingering, type Formula, pc, noteName, soundingNotes, pitchClasses, identifyChord, chordSymbol, findVoicings, formulaNotes, spelledNotes, scaleSequence, scaleSteps, fretNotation } from './lib/music';

type Mode = 'identify' | 'find' | 'scales';
type LabelMode = 'notes' | 'intervals' | 'none';
const MODES: {id: Mode; number: string; title: string; description: string}[] = [
  {id:'identify',number:'01',title:'Identify a chord',description:'Place your fingers. Discover the chord.'},
  {id:'find',number:'02',title:'Find a chord',description:'Choose a chord. Explore its possibilities.'},
  {id:'scales',number:'03',title:'Explore scales',description:'Connect the notes across the neck.'},
];
const EMPTY: Fingering = [null,null,null,null,null,null];

function MiniShape({frets}: {frets: Fingering}) {
  const pressed = frets.filter((f): f is number => f!==null && f>0);
  const start = pressed.length && Math.max(...pressed)>4 ? Math.min(...pressed) : 1;
  return <div className="mini-shape" aria-hidden="true">
    <span className="mini-position">{start>1 ? `${start}fr` : ''}</span>
    {frets.map((f,i) => <div className="mini-string" key={i}>
      <span className="mini-open">{f===null ? '×' : f===0 ? '○' : ''}</span>
      {[0,1,2,3].map(row=><span key={row} className={`mini-cell ${f===start+row ? 'mini-pressed' : ''}`} />)}
    </div>)}
  </div>;
}

export default function CaesarGuitarLab({portfolioHref = 'https://julio-caesar.com/#case-studies', brandHref = './'}: {portfolioHref?: string; brandHref?: string}) {
  const [mode,setMode] = useState<Mode>('identify');
  const [manual,setManual] = useState<Fingering>([...QUICK_CHORDS[0].frets]);
  const [root,setRoot] = useState(0);
  const [chordId,setChordId] = useState('major');
  const [scaleId,setScaleId] = useState('minor-pent');
  const [voicingIndex,setVoicingIndex] = useState(0);
  const [matchIndex,setMatchIndex] = useState(0);
  const [startFret,setStartFret] = useState(1);
  const [labels,setLabels] = useState<LabelMode>('notes');
  const [audition,setAudition] = useState(true);
  const [playStyle,setPlayStyle] = useState<'strum'|'arpeggio'>('strum');
  const [direction,setDirection] = useState<'up'|'down'|'both'>('both');
  const [tempo,setTempo] = useState(100);
  const [playing,setPlaying] = useState(false);
  const [audioError,setAudioError] = useState('');
  const [sounded,setSounded] = useState<{string: number; fret: number}|null>(null);
  const [focused,setFocused] = useState({string:5,fret:1});
  const [quiz,setQuiz] = useState<number|null>(null);
  const [quizFeedback,setQuizFeedback] = useState('');
  const audio = useRef<GuitarAudio|null>(null);
  const playTimer = useRef<ReturnType<typeof setTimeout>|null>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout>|null>(null);
  const focusTimer = useRef<ReturnType<typeof setTimeout>|null>(null);
  const playbackToken = useRef(0);
  const neck = useRef<HTMLDivElement>(null);
  const chord = CHORDS.find(c=>c.id===chordId)!;
  const scale = SCALES.find(s=>s.id===scaleId)!;
  const matches = useMemo(()=>identifyChord(manual),[manual]);
  const match = matches[matchIndex] ?? matches[0];
  const voicings = useMemo(()=>findVoicings(root,chord),[root,chord]);
  const voicing = voicings[voicingIndex] ?? voicings[0];
  const frets = mode==='find' ? voicing?.frets ?? EMPTY : manual;
  const activeRoot = mode==='identify' ? match?.root ?? null : root;
  const formula: Formula|undefined = mode==='scales' ? scale : mode==='find' ? chord : match?.formula;
  const tones = activeRoot!==null && formula ? formulaNotes(activeRoot,formula) : [];
  const names = activeRoot!==null && formula ? spelledNotes(activeRoot,formula) : [];
  const notes = soundingNotes(frets);
  const uniqueNotes = pitchClasses(notes);
  const symbol = mode==='find' ? voicing ? chordSymbol(root,chord,voicing.bass) : undefined : match?.symbol;
  const visibleFrets = Array.from({length:12},(_,i)=>startFret+i);
  const info = MODES.find(m=>m.id===mode)!;

  useEffect(()=>()=>{
    audio.current?.dispose();
    if(playTimer.current) clearTimeout(playTimer.current);
    if(flashTimer.current) clearTimeout(flashTimer.current);
    if(focusTimer.current) clearTimeout(focusTimer.current);
  },[]);

  function stop() {
    playbackToken.current++;
    audio.current?.stop();
    if(playTimer.current) clearTimeout(playTimer.current);
    setPlaying(false);
  }
  async function play(selected: number[], spacing=0.055, indicate=true) {
    stop();
    const token=playbackToken.current;
    setAudioError('');
    audio.current ??= new GuitarAudio();
    try {
      const duration = await audio.current.play(selected,spacing);
      if(token!==playbackToken.current) return;
      if(indicate && duration) {
        setPlaying(true);
        playTimer.current=setTimeout(()=>setPlaying(false),duration);
      }
    } catch(error) {
      setAudioError(error instanceof Error ? error.message : 'Sound could not start. Tap Play to try again.');
    }
  }
  function changeMode(next: Mode) {
    stop();
    setMode(next);
    setQuiz(null);
    setQuizFeedback('');
    if(next==='find') reveal(voicings[voicingIndex]?.frets ?? EMPTY);
  }
  function reveal(shape: Fingering) {
    const pressed=shape.filter((f):f is number=>f!==null && f>0);
    setStartFret(pressed.length ? Math.max(1,Math.min(13,Math.min(...pressed)-1)) : 1);
  }
  function selectVoicing(index: number) {
    stop();
    setVoicingIndex(index);
    reveal(voicings[index].frets);
  }
  function loadShape(shape: Fingering) {
    stop();
    setManual([...shape]);
    setMatchIndex(0);
    setMode('identify');
    setQuiz(null);
    reveal(shape);
  }
  function selectRoot(value: number) {
    stop();
    setRoot(value);
    setVoicingIndex(0);
    setStartFret(1);
    setQuiz(null);
    setQuizFeedback('');
  }
  function contextualName(midi: number) {
    const index=tones.indexOf(pc(midi));
    return index>=0 ? names[index] : noteName(midi);
  }
  function press(string: number, fret: number|null) {
    const midi=fret===null ? null : TUNING[string]+fret;
    if(mode==='scales') {
      if(midi===null) return;
      if(quiz!==null) {
        const target=names[tones.indexOf(quiz)];
        setQuizFeedback(pc(midi)===quiz ? `Correct — that’s ${target}. Try another location, or choose Next note.` : `That’s ${contextualName(midi)}. Keep looking for ${target}.`);
      }
      setSounded({string,fret:fret!});
      if(flashTimer.current) clearTimeout(flashTimer.current);
      flashTimer.current=setTimeout(()=>setSounded(null),650);
      if(audition) void play([midi],0,false);
      return;
    }
    stop();
    const next=[...frets];
    next[string]=next[string]===fret ? null : fret;
    setManual(next);
    setMatchIndex(0);
    if(mode==='find') setMode('identify');
    if(audition && midi!==null && next[string]!==null) void play([midi],0,false);
  }
  function moveFocus(event: KeyboardEvent<HTMLButtonElement>,string: number,fret: number) {
    let nextString=string, nextFret=fret;
    if(event.key==='ArrowRight') nextFret=Math.min(24,fret+1);
    else if(event.key==='ArrowLeft') nextFret=Math.max(0,fret-1);
    else if(event.key==='ArrowUp') nextString=Math.min(5,string+1);
    else if(event.key==='ArrowDown') nextString=Math.max(0,string-1);
    else if(event.key==='Home') nextFret=0;
    else if(event.key==='End') nextFret=24;
    else return;
    event.preventDefault();
    if(nextFret>0 && nextFret<startFret) setStartFret(nextFret);
    if(nextFret>startFret+11) setStartFret(nextFret-11);
    setFocused({string:nextString,fret:nextFret});
    focusTimer.current=setTimeout(()=>neck.current?.querySelector<HTMLButtonElement>(`[data-string="${nextString}"][data-fret="${nextFret}"]`)?.focus(),0);
  }
  function startQuiz() {
    setQuiz(tones[(tones.indexOf(quiz ?? -1)+1)%tones.length]);
    setQuizFeedback('Find the note anywhere on the neck. Tap a string to check your answer.');
  }
  function fretCell(string: number,fret: number) {
    const midi=TUNING[string]+fret;
    const index=tones.indexOf(pc(midi));
    const isRoot=activeRoot!==null && pc(midi)===activeRoot;
    const selected=mode==='scales' ? index>=0 && quiz===null : frets[string]===fret;
    const flashing=sounded?.string===string && sounded.fret===fret;
    const text=labels==='intervals' && index>=0 && formula ? formula.degrees[index] : contextualName(midi);
    const labelVisible=quiz===null && labels!=='none';
    const activeTab=focused.string===string && (focused.fret===fret || fret===startFret && (focused.fret>startFret+11 || focused.fret<startFret && focused.fret!==0));
    return <button type="button" key={fret} data-string={string} data-fret={fret}
      className={`fret-cell ${fret===0?'open-cell':''} ${selected?'selected':''} ${selected&&isRoot?'root-note':''} ${flashing?'sounded':''} ${[3,5,7,9,15,17,19,21].includes(fret)&&string===2?'has-inlay':''} ${[12,24].includes(fret)&&[1,4].includes(string)?'has-inlay':''}`}
      aria-label={`String ${6-string}, ${fret===0?'open':`fret ${fret}`}, ${quiz===null?contextualName(midi):'hidden note'}${isRoot&&quiz===null?', root':''}`}
      aria-pressed={mode==='scales'?undefined:selected} tabIndex={activeTab?0:-1}
      onFocus={()=>setFocused({string,fret})} onKeyDown={event=>moveFocus(event,string,fret)} onClick={()=>press(string,fret)}>
      <span className="note-dot">{labelVisible ? text : selected ? '•' : fret===0 ? '○' : ''}</span>
    </button>;
  }

  return <div className="app-shell">
    <header className="site-header">
      <a className="brand" href={brandHref} aria-label="Caesar Guitar Lab home"><span className="brand-mark" aria-hidden="true"><i/><i/><i/></span><span>Caesar<span className="brand-light"> Guitar Lab</span></span></a>
      <a className="portfolio-backlink" href={portfolioHref}>← Julio Caesar<span> / Portfolio</span></a>
    </header>
    <main>
      <section className="intro"><div><p className="eyebrow">CHORDS · SCALES · PRACTICE</p><h1>Caesar<span>Guitar Lab</span></h1><p className="intro-copy">Explore chords and scales on an interactive guitar neck.</p></div><div className="tuning-badge"><span>STANDARD TUNING</span><strong>E <b>A</b> D <b>G</b> B <b>E</b></strong><small>6 strings · 24 frets</small></div></section>
      <nav className="mode-nav" aria-label="Practice modes">
        {MODES.map(item=><button type="button" key={item.id} className={`mode-tab ${mode===item.id?'active':''}`} aria-pressed={mode===item.id} onClick={()=>changeMode(item.id)}><span className="tab-number">{item.number}</span><span><strong>{item.title}</strong><small>{item.description}</small></span><span className="tab-arrow" aria-hidden="true">↗</span></button>)}
      </nav>

      <section className="workspace" aria-label={info.title}>
        <div className="workspace-header"><div><p className="eyebrow">YOUR FRETBOARD</p><h2>{mode==='identify'?'What are you playing?':mode==='find'?'One chord. Many ways to play.':'Learn the notes. Then connect them.'}</h2></div><label className="sound-toggle"><input type="checkbox" checked={audition} onChange={e=>setAudition(e.target.checked)}/><span className="toggle-track" aria-hidden="true"/>Sound on tap</label></div>
        {mode!=='identify' && <div className="selection-bar">
          <label>Root note<select value={root} onChange={e=>selectRoot(Number(e.target.value))}>{ROOT_NAMES.map((name,i)=><option key={i} value={i}>{name}</option>)}</select></label>
          <label className="quality-select">{mode==='find'?'Chord type':'Scale'}<select value={mode==='find'?chordId:scaleId} onChange={e=>{stop();if(mode==='find'){setChordId(e.target.value);setVoicingIndex(0);setStartFret(1);}else{setScaleId(e.target.value);setQuiz(null);setQuizFeedback('');}}}>{(mode==='find'?CHORDS:SCALES).map(item=><option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
          <p>{mode==='find'?`${voicings.length} suggested shapes across the neck`:`${scale.intervals.length} notes. Every position. One connected neck.`}</p>
        </div>}
        <div className="fretboard-toolbar"><span><span className="tiny-dot root"/> Root <span className="tiny-dot tone"/> {mode==='scales'?'Scale note':'Chord tone'}</span><div className="label-controls" aria-label="Fretboard labels"><span>Labels</span>{(['notes','intervals','none'] as const).map(item=><button type="button" key={item} className={labels===item?'selected-label':''} aria-pressed={labels===item} onClick={()=>setLabels(item)}>{item==='none'?'Off':item[0].toUpperCase()+item.slice(1)}</button>)}</div></div>
        <div className="neck-scroll" ref={neck} role="group" aria-label="Interactive guitar neck. High E at top, low E at bottom. Use arrow keys to move and Enter or Space to play." tabIndex={-1}>
          <div className="neck-grid">
            <div className="fret-number-row"><span className="string-heading">STRING</span><span className="mute-heading">{mode==='scales'?'':'MUTE'}</span><span className="open-heading">OPEN</span>{visibleFrets.map(f=><span key={f} className={[12,24].includes(f)?'octave-number':''}>{f}</span>)}</div>
            {[5,4,3,2,1,0].map(string=><div className="string-row" key={string} style={{'--string-thickness':`${0.7+(5-string)*0.35}px`} as CSSProperties}>
              <span className="string-name"><small>{6-string}</small>{string===5?'e':noteName(TUNING[string])}</span>
              <span className="mute-slot">{mode!=='scales' && <button type="button" className={`mute-button ${frets[string]===null?'is-muted':''}`} aria-label={`Mute string ${6-string}`} aria-pressed={frets[string]===null} onClick={()=>press(string,null)}>×</button>}</span>
              {fretCell(string,0)}{visibleFrets.map(fret=>fretCell(string,fret))}
            </div>)}
          </div>
        </div>
        <div className="neck-footer"><div className="neck-position"><span>NECK POSITION</span><button type="button" aria-label="Move toward the nut" disabled={startFret===1} onClick={()=>setStartFret(Math.max(1,startFret-4))}>←</button><input type="range" min="1" max="13" value={startFret} aria-label="First visible fret" onChange={e=>setStartFret(Number(e.target.value))}/><button type="button" aria-label="Move toward the bridge" disabled={startFret===13} onClick={()=>setStartFret(Math.min(13,startFret+4))}>→</button><strong>{startFret}–{startFret+11}</strong></div><span className="orientation">Thin strings ↑ <span>↓ Thick strings</span></span></div>
        {mode!=='scales' && frets.some(f=>f!==null&&f>0&&(f<startFret||f>startFret+11)) && <p className="offscreen-notice">Some selected notes are outside this view. <button type="button" onClick={()=>reveal(frets)}>Show shape</button><span> Low E → high e: {fretNotation(frets)}</span></p>}
        <div className="board-hint"><span className="hint-icon" aria-hidden="true">i</span><p>{mode==='scales'?quiz===null?'Tap any note to hear it. White, outlined notes mark the root; gray notes belong to your scale.':'Quiz mode: the notes are hidden. Find the requested note anywhere on the neck.':mode==='find'?'Choose a shape below. Tap the neck to edit it and identify your new chord.':'Tap a fret to press a string. Tap again to mute it. Use OPEN for a ringing open string.'}</p>{mode==='identify'&&<button type="button" className="text-button" onClick={()=>{stop();setManual([...EMPTY]);setMatchIndex(0);}}>Clear neck <span aria-hidden="true">↺</span></button>}</div>
      </section>

      <div className="result-layout">
        <section className="result-card" aria-label={mode==='scales'?'Selected scale':'Chord result'}>
          <div className="result-main" aria-live="polite" aria-atomic="true"><p className="eyebrow">{mode==='scales'?'YOUR SCALE':mode==='find'?'CHORD VOICING':match?'CHORD IDENTIFIED':'YOUR NOTES'}</p>
            {mode==='scales'?<><h2 className="scale-title"><span>{noteName(root)}</span> {scale.name}</h2><p className="result-caption">{scale.intervals.length} notes · root highlighted in white</p></>:symbol?<><h2 className="chord-symbol">{symbol}</h2><p className="result-caption">{noteName(activeRoot!)} {formula!.name.toLowerCase()}{(mode==='find'?voicing?.bass:match?.bass)!==activeRoot?' · inversion':''}</p></>:<><h2 className="empty-title">{notes.length===0?'Your next chord starts here.':uniqueNotes.length===1?`${noteName(uniqueNotes[0])} — a single pitch class`:'An unexpected combination.'}</h2><p className="result-caption">{notes.length===0?'Press a few strings or try a quick-start chord.':uniqueNotes.length===1?'Add other notes to build a chord.':'No exact match in the chord library. Keep exploring.'}</p></>}
          </div>
          <div className="tone-list">{(formula?tones:uniqueNotes).map((tone,i)=><div className={`tone-chip ${tone===activeRoot?'root-chip':''}`} key={tone}><strong>{formula?names[i]:noteName(tone)}</strong><span>{formula?.degrees[i]??'note'}</span></div>)}</div>
          {mode!=='scales' && <div className="string-readout" aria-label={`Fingering from low E to high E: ${fretNotation(frets)}`}><span>LOW E → HIGH e</span><strong>{fretNotation(frets)}</strong></div>}
          <div className="play-controls"><button type="button" className={`primary-button ${playing?'is-playing':''}`} disabled={mode!=='scales'&&!notes.length} onClick={()=>playing?stop():void play(mode==='scales'?scaleSequence(root,scale,direction):notes,mode==='scales'?60/tempo:playStyle==='arpeggio'?0.3:0.055)}><span aria-hidden="true">{playing?'■':'▶'}</span>{playing?'Stop playback':mode==='scales'?'Play scale':'Play chord'}</button>{mode!=='scales'&&<select aria-label="Chord playback style" value={playStyle} onChange={e=>{stop();setPlayStyle(e.target.value as 'strum'|'arpeggio');}}><option value="strum">Strum</option><option value="arpeggio">Arpeggio</option></select>}</div>
          {mode==='scales'&&<div className="scale-playback"><label>Direction<select value={direction} onChange={e=>{stop();setDirection(e.target.value as 'up'|'down'|'both');}}><option value="both">Up & down</option><option value="up">Ascending</option><option value="down">Descending</option></select></label><label>Tempo <strong>{tempo} BPM</strong><input type="range" min="50" max="180" step="5" value={tempo} onChange={e=>{stop();setTempo(Number(e.target.value));}}/></label></div>}
          {audioError&&<p className="audio-error" role="alert">{audioError}</p>}
          <small className="sound-note">Synthesized plucked-string sound · no microphone needed</small>
          {mode==='identify'&&matches.length>1&&<div className="alternatives"><span>These notes also fit</span><div>{matches.map((alternative,i)=>i!==matchIndex&&<button type="button" key={alternative.symbol} onClick={()=>setMatchIndex(i)}>{alternative.symbol}</button>)}</div></div>}
        </section>

        <section className="learning-card">
          <div className="section-heading"><div><p className="eyebrow">{mode==='scales'?'CONNECT THE DOTS':mode==='find'?'EXPLORE THE NECK':'A LITTLE THEORY'}</p><h3>{mode==='scales'?'Hear it. See it. Learn it.':mode==='find'?'Pick a different position.':formula?'What makes this chord?':'Build it one note at a time.'}</h3></div><span className="learning-symbol" aria-hidden="true">{mode==='scales'?'♬':'♮'}</span></div>
          <p className="learning-copy">{formula?.description??'A chord name depends on the notes you play together. Try C, E, and G for a C major chord, then lower E to E♭ and listen to the difference.'}</p>
          {mode==='identify'&&<><div className="formula-row"><span>FORMULA</span><strong>{formula?.degrees.join('  ·  ')??'Root + chord tones'}</strong></div><p className="small-explainer">{match&&match.bass!==match.root?`The lowest note is ${contextualName(match.bass)}. The slash in ${match.symbol} tells you which note is in the bass.`:'The root gives the chord its name. The other intervals give it its character. Repeating a note in another octave keeps the same chord quality.'}</p><div className="learning-actions"><button type="button" className="secondary-button" disabled={!match} onClick={()=>{if(match){stop();setRoot(match.root);setChordId(match.formula.id);setVoicingIndex(0);setStartFret(1);setMode('find');setQuiz(null);}}}>Find more shapes <span aria-hidden="true">↗</span></button><span className="match-note">Exact matches · {CHORDS.length} chord types<br/>Musical context may suggest other names.</span></div></>}
          {mode==='find'&&<><div className="voicing-navigation"><button type="button" className="secondary-button" disabled={voicingIndex===0} onClick={()=>selectVoicing(voicingIndex-1)}>← Previous</button><span>Shape {voicings.length?voicingIndex+1:0} of {voicings.length}</span><button type="button" className="secondary-button" disabled={voicingIndex>=voicings.length-1} onClick={()=>selectVoicing(voicingIndex+1)}>Next →</button></div><div className="voicing-detail"><span className="detail-pill">{voicing?.position?`From fret ${voicing.position}`:'Open position'}</span>{voicing?.barre&&<span className="detail-pill">Barre shape</span>}<span className="detail-pill">{notes.length} strings</span></div><p className="small-explainer">Suggested shapes contain every chord tone and use a span of at most four frets. Comfort depends on your hand; try another shape if needed.</p><button type="button" className="secondary-button" disabled={!voicing} onClick={()=>loadShape(frets)}>Edit this shape <span aria-hidden="true">↗</span></button></>}
          {mode==='scales'&&<><div className="formula-row"><span>STEP PATTERN</span><strong>{scaleSteps(scale).join(' · ')}</strong></div><p className="small-explainer">W = whole step (2 frets) · H = half step (1 fret) · 3H = 3 frets. The pattern repeats every octave.</p><div className="quiz-box"><div><strong>{quiz===null?'Ready to find the notes yourself?':`Find ${names[tones.indexOf(quiz)]} on the neck`}</strong><p aria-live="polite">{quizFeedback||'Hide the labels and test your memory, one note at a time.'}</p></div><div className="quiz-actions"><button type="button" className="secondary-button" onClick={startQuiz}>{quiz===null?'Quiz me':'Next note'} →</button>{quiz!==null&&<button type="button" className="text-button" onClick={()=>{setQuiz(null);setQuizFeedback('');}}>End quiz</button>}</div></div></>}
        </section>
      </div>

      {mode==='identify'&&<section className="quick-start"><div className="section-heading"><div><p className="eyebrow">A GOOD PLACE TO START</p><h3>Familiar chords. New discoveries.</h3></div><span className="section-note">Pick a shape, then make it yours.</span></div><div className="quick-grid">{QUICK_CHORDS.map(item=><button type="button" key={item.name} className={`quick-card ${item.frets.join(',')===manual.join(',')?'current':''}`} onClick={()=>loadShape(item.frets)}><div><strong>{item.name}</strong><small>{item.name==='F'?'Barre chord':'Open chord'}</small></div><MiniShape frets={item.frets}/><span className="quick-arrow" aria-hidden="true">↗</span></button>)}</div></section>}
      {mode==='find'&&<section className="voicing-section"><div className="section-heading"><div><p className="eyebrow">SAME NOTES. DIFFERENT PLACES.</p><h3>Your chord, up and down the neck.</h3></div><span className="section-note">Diagrams run low E → high e.</span></div><div className="voicing-grid">{voicings.map((shape,i)=><button type="button" key={shape.frets.join(',')} aria-label={`${chordSymbol(root,chord,shape.bass)}, shape ${i+1}, ${fretNotation(shape.frets)}`} aria-pressed={voicingIndex===i} className={`voicing-card ${voicingIndex===i?'current':''}`} onClick={()=>selectVoicing(i)}><span className="voicing-card-title">{chordSymbol(root,chord,shape.bass)}<small>{shape.position<=3?'Lower neck':`Fret ${shape.position}`}</small></span><MiniShape frets={shape.frets}/><span className="voicing-frets">{fretNotation(shape.frets)}</span></button>)}</div>{!voicings.length&&<p>No full-tone shapes found in this range. Try another chord type.</p>}</section>}
      {mode==='scales'&&<section className="scale-starters"><div className="section-heading"><div><p className="eyebrow">BUILD YOUR VOCABULARY</p><h3>A few paths worth exploring.</h3></div></div><div className="scale-starter-grid">{[{root:9,id:'minor-pent',tag:'YOUR FIRST SOLO',title:'A minor pentatonic',copy:'Five notes. Countless riffs.'},{root:0,id:'major',tag:'THE FOUNDATION',title:'C major',copy:'Learn the seven natural notes.'},{root:4,id:'blues',tag:'ADD SOME COLOR',title:'E minor blues',copy:'Meet the expressive blue note.'}].map(item=><button type="button" className="scale-starter" key={item.id} onClick={()=>{selectRoot(item.root);setScaleId(item.id);setStartFret(item.id==='minor-pent'?5:1);}}><span className="eyebrow">{item.tag}</span><strong>{item.title}<span aria-hidden="true">↗</span></strong><small>{item.copy}</small></button>)}</div></section>}
      <details className="help-details"><summary>A quick guide to the fretboard <span aria-hidden="true">+</span></summary><div className="help-content"><p><strong>Read the neck.</strong> The thin high E string is at the top. The thick low E is at the bottom. Each fret raises the pitch by one semitone. The dots at frets 12 and 24 mark octaves.</p><p><strong>Read a shape.</strong> The six fingering numbers run from low E to high e. 0 means an open string; × means mute. A slash chord such as C/E is C major with E as the lowest note.</p><p><strong>Use the keyboard.</strong> Tab to the neck, move with arrow keys, then press Enter or Space to select a note. Home goes to the open string; End goes to fret 24. Chord recognition checks complete formulas; partial or unusual chords may have no exact match.</p></div></details>
    </main>
    <footer className="site-footer"><span>Caesar Guitar Lab</span><p>A guitar practice side project by Julio Caesar.</p><a href={portfolioHref}>Back to portfolio ↗</a></footer>
  </div>;
}

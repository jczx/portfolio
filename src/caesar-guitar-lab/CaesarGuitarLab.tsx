
import { useEffect, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';
import { GuitarAudio } from './lib/audio';
import { CHORDS, SCALES, TUNING, ROOT_NAMES, QUICK_CHORDS, type Fingering, type Formula, pc, noteName, soundingNotes, pitchClasses, identifyChord, chordSymbol, findVoicings, voicingAtPosition, formulaNotes, spelledNotes, scaleSequence, scaleSteps, fretNotation } from './lib/music';

type Mode = 'identify' | 'find' | 'scales';
type LabelMode = 'notes' | 'intervals' | 'none';
const MODES: {id: Mode; title: string}[] = [
  {id:'identify',title:'Identify'},
  {id:'find',title:'Chords'},
  {id:'scales',title:'Scales'},
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
  const voicing = voicings[voicingIndex];
  const frets = mode==='find' ? voicing?.frets ?? EMPTY : manual;
  const activeRoot = mode==='identify' ? match?.root ?? null : root;
  const formula: Formula|undefined = mode==='scales' ? scale : mode==='find' ? chord : match?.formula;
  const tones = activeRoot!==null && formula ? formulaNotes(activeRoot,formula) : [];
  const names = activeRoot!==null && formula ? spelledNotes(activeRoot,formula) : [];
  const notes = soundingNotes(frets);
  const uniqueNotes = pitchClasses(notes);
  const symbol = mode==='find' ? voicing ? chordSymbol(root,chord,voicing.bass) : undefined : match?.symbol;
  const visibleFrets = Array.from({length:12},(_,i)=>startFret+i);
  const visibleVoicings = voicings.map((shape,index)=>({shape,index})).filter(({shape})=>
    (shape.position>=startFret||startFret===1&&shape.position===0)&&
    shape.frets.every(f=>f===null||f===0||f>=startFret&&f<=startFret+11));
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
    if(next==='find') setVoicingIndex(voicingAtPosition(voicings,startFret));
  }
  function reveal(shape: Fingering) {
    const pressed=shape.filter((f):f is number=>f!==null && f>0);
    setStartFret(pressed.length ? Math.max(1,Math.min(13,Math.min(...pressed))) : 1);
    if(neck.current) neck.current.scrollLeft=0;
  }
  function moveNeck(position: number) {
    stop();
    const next=Math.max(1,Math.min(13,position));
    setStartFret(next);
    setSounded(null);
    if(mode==='find') setVoicingIndex(voicingAtPosition(voicings,next));
    if(neck.current) neck.current.scrollLeft=0;
  }
  function selectVoicing(index: number) {
    stop();
    setVoicingIndex(index);
    if(voicings[index].frets.some(f=>f!==null&&f>0&&(f<startFret||f>startFret+11))) reveal(voicings[index].frets);
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
    setVoicingIndex(voicingAtPosition(findVoicings(value,chord),startFret));
    setQuiz(null);
    setQuizFeedback('');
  }
  function selectQuality(value: string) {
    stop();
    if(mode==='find') {
      const next=CHORDS.find(item=>item.id===value)!;
      setChordId(value);
      setVoicingIndex(voicingAtPosition(findVoicings(root,next),startFret));
    } else {
      setScaleId(value);
      setQuiz(null);
      setQuizFeedback('');
    }
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
        setQuizFeedback(pc(midi)===quiz ? `Correct: ${target}.` : `That’s ${contextualName(midi)}. Find ${target}.`);
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
    setQuizFeedback('Tap the matching note.');
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
      <a className="brand" href={brandHref} aria-label="Caesar’s Fret Lab home"><span className="script-brand">Caesar’s</span><span className="brand-light">Fret Lab</span></a>
      <a className="portfolio-backlink" href={portfolioHref}>← Portfolio</a>
    </header>
    <main>
      <section className="intro">
        <h1 aria-label="Caesar’s Fret Lab"><span className="script-brand">Caesar’s</span><span className="lab-title">Fret Lab</span></h1>
        <div className="tuning-badge"><span>STANDARD TUNING</span><strong>E A D G B E</strong></div>
      </section>
      <nav className="mode-nav" aria-label="Practice modes">
        {MODES.map(item=><button type="button" key={item.id} className={'mode-tab '+(mode===item.id?'active':'')} aria-pressed={mode===item.id} onClick={()=>changeMode(item.id)}><strong>{item.title}</strong></button>)}
      </nav>
      <section className="workspace" aria-label={info.title}>
        <div className="workspace-header"><h2>{mode==='identify'?'Fretboard':mode==='find'?'Find a chord':'Explore scales'}</h2><label className="sound-toggle"><input type="checkbox" checked={audition} onChange={e=>setAudition(e.target.checked)}/><span className="toggle-track" aria-hidden="true"/>Sound</label></div>
        {mode!=='identify'&&<div className="selection-bar">
          <label>Root<select value={root} onChange={e=>selectRoot(Number(e.target.value))}>{ROOT_NAMES.map((name,i)=><option key={i} value={i}>{name}</option>)}</select></label>
          <label className="quality-select">{mode==='find'?'Chord':'Scale'}<select value={mode==='find'?chordId:scaleId} onChange={e=>selectQuality(e.target.value)}>{(mode==='find'?CHORDS:SCALES).map(item=><option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
        </div>}
        <div className="fretboard-toolbar"><span><span className="tiny-dot root"/> Root <span className="tiny-dot tone"/> {mode==='scales'?'Scale note':'Chord tone'}</span><div className="label-controls" aria-label="Fretboard labels">{(['notes','intervals','none'] as const).map(item=><button type="button" key={item} className={labels===item?'selected-label':''} aria-pressed={labels===item} onClick={()=>setLabels(item)}>{item==='none'?'Off':item==='notes'?'Notes':'Intervals'}</button>)}</div></div>
        <div className="neck-scroll" ref={neck} role="group" aria-label="Interactive guitar neck. High E at top, low E at bottom. Use arrow keys and Enter to play." tabIndex={-1}>
          <div className="neck-grid" data-start-fret={startFret}>
            <div className="fret-number-row"><span className="string-heading">STRING</span><span className="mute-heading">{mode==='scales'?'':'MUTE'}</span><span className="open-heading">OPEN</span>{visibleFrets.map(f=><span key={f} className={[12,24].includes(f)?'octave-number':''}>{f}</span>)}</div>
            {[5,4,3,2,1,0].map(string=><div className="string-row" key={string} style={{'--string-thickness':(0.7+(5-string)*0.35)+'px'} as CSSProperties}>
              <span className="string-name"><small>{6-string}</small>{string===5?'e':noteName(TUNING[string])}</span>
              <span className="mute-slot">{mode!=='scales'&&<button type="button" className={'mute-button '+(frets[string]===null?'is-muted':'')} aria-label={'Mute string '+(6-string)} aria-pressed={frets[string]===null} onClick={()=>press(string,null)}>×</button>}</span>
              {fretCell(string,0)}{visibleFrets.map(fret=>fretCell(string,fret))}
            </div>)}
          </div>
        </div>
        <div className="neck-footer"><div className="neck-position"><span>NECK POSITION</span><button type="button" aria-label="Move toward the nut" disabled={startFret===1} onClick={()=>moveNeck(startFret-1)}>←</button><input type="range" min="1" max="13" value={startFret} aria-label="First visible fret" onChange={e=>moveNeck(Number(e.target.value))}/><button type="button" aria-label="Move toward the bridge" disabled={startFret===13} onClick={()=>moveNeck(startFret+1)}>→</button><strong aria-live="polite">{startFret}–{startFret+11}</strong></div></div>
        {mode!=='scales'&&frets.some(f=>f!==null&&f>0&&(f<startFret||f>startFret+11))&&<p className="offscreen-notice">Notes outside this view. <button type="button" onClick={()=>reveal(frets)}>Show shape</button></p>}
        {mode==='identify'&&<div className="board-hint"><p>Tap a fret to select. Tap again to mute.</p><button type="button" className="text-button" onClick={()=>{stop();setManual([...EMPTY]);setMatchIndex(0);}}>Clear ↺</button></div>}
      </section>
      <div className="result-layout">
        <section className="result-card" aria-label={mode==='scales'?'Selected scale':'Chord result'}>
          <div className="result-main" aria-live="polite" aria-atomic="true">
            {mode==='scales'?<h2 className="scale-title"><span>{noteName(root)}</span> {scale.name}</h2>:symbol?<><h2 className="chord-symbol">{symbol}</h2><p className="result-caption">{noteName(activeRoot!)} {formula!.name.toLowerCase()}</p></>:<><h2 className="empty-title">{notes.length===0?'Select notes':uniqueNotes.length===1?noteName(uniqueNotes[0]):'No exact match'}</h2><p className="result-caption">{mode==='find'?'No shape in this view.':notes.length>0?'Try another note.':''}</p></>}
          </div>
          <div className="tone-list">{(formula?tones:uniqueNotes).map((tone,i)=><div className={'tone-chip '+(tone===activeRoot?'root-chip':'')} key={tone}><strong>{formula?names[i]:noteName(tone)}</strong><span>{formula?.degrees[i]??'note'}</span></div>)}</div>
          {mode!=='scales'&&<div className="string-readout" aria-label={'Fingering from low E to high E: '+fretNotation(frets)}><span>LOW E → HIGH e</span><strong>{fretNotation(frets)}</strong></div>}
          <div className="play-controls"><button type="button" className={'primary-button '+(playing?'is-playing':'')} disabled={mode!=='scales'&&!notes.length} onClick={()=>playing?stop():void play(mode==='scales'?scaleSequence(root,scale,direction):notes,mode==='scales'?60/tempo:playStyle==='arpeggio'?0.3:0.055)}><span aria-hidden="true">{playing?'■':'▶'}</span>{playing?'Stop':mode==='scales'?'Play scale':'Play chord'}</button>{mode!=='scales'&&<select aria-label="Chord playback style" value={playStyle} onChange={e=>{stop();setPlayStyle(e.target.value as 'strum'|'arpeggio');}}><option value="strum">Strum</option><option value="arpeggio">Arpeggio</option></select>}</div>
          {mode==='scales'&&<div className="scale-playback"><label>Direction<select value={direction} onChange={e=>{stop();setDirection(e.target.value as 'up'|'down'|'both');}}><option value="both">Up & down</option><option value="up">Ascending</option><option value="down">Descending</option></select></label><label>Tempo <strong>{tempo} BPM</strong><input type="range" min="50" max="180" step="5" value={tempo} onChange={e=>{stop();setTempo(Number(e.target.value));}}/></label></div>}
          {audioError&&<p className="audio-error" role="alert">{audioError}</p>}
          {mode==='identify'&&matches.length>1&&<div className="alternatives"><span>Also fits</span><div>{matches.map((alternative,i)=>i!==matchIndex&&<button type="button" key={alternative.symbol} onClick={()=>setMatchIndex(i)}>{alternative.symbol}</button>)}</div></div>}
        </section>
        <section className="learning-card">
          {mode==='identify'&&<><h3>Formula</h3><div className="formula-row"><strong>{formula?.degrees.join(' · ')??'—'}</strong></div>{match&&match.bass!==match.root&&<p className="result-caption">Bass: {contextualName(match.bass)}</p>}<button type="button" className="secondary-button" disabled={!match} onClick={()=>{if(match){stop();setRoot(match.root);setChordId(match.formula.id);setVoicingIndex(voicingAtPosition(findVoicings(match.root,match.formula),startFret));setMode('find');setQuiz(null);}}}>More shapes ↗</button></>}
          {mode==='find'&&<><h3>Position</h3><div className="voicing-detail"><span className="detail-pill">{voicing?.position?'Fret '+voicing.position:'Open'}</span>{voicing?.barre&&<span className="detail-pill">Barre</span>}</div><div className="voicing-navigation"><button type="button" className="secondary-button" disabled={voicingIndex<=0} onClick={()=>selectVoicing(voicingIndex-1)}>← Previous</button><button type="button" className="secondary-button" disabled={voicingIndex<0||voicingIndex>=voicings.length-1} onClick={()=>selectVoicing(voicingIndex+1)}>Next →</button></div><button type="button" className="text-button" disabled={!voicing} onClick={()=>loadShape(frets)}>Edit shape ↗</button></>}
          {mode==='scales'&&<><h3>Practice</h3><div className="formula-row"><span>STEPS</span><strong>{scaleSteps(scale).join(' · ')}</strong></div><div className="quiz-box"><div><strong>{quiz===null?'Find the notes':'Find '+names[tones.indexOf(quiz)]}</strong>{quizFeedback&&<p aria-live="polite">{quizFeedback}</p>}</div><div className="quiz-actions"><button type="button" className="secondary-button" onClick={startQuiz}>{quiz===null?'Start quiz':'Next note'} →</button>{quiz!==null&&<button type="button" className="text-button" onClick={()=>{setQuiz(null);setQuizFeedback('');}}>End</button>}</div></div></>}
        </section>
      </div>
      {mode==='identify'&&<section className="quick-start"><div className="section-heading"><h3>Quick chords</h3></div><div className="quick-grid">{QUICK_CHORDS.map(item=><button type="button" key={item.name} className={'quick-card '+(item.frets.join(',')===manual.join(',')?'current':'')} onClick={()=>loadShape(item.frets)}><strong>{item.name}</strong><MiniShape frets={item.frets}/></button>)}</div></section>}
      {mode==='find'&&<section className="voicing-section"><div className="section-heading"><h3>Shapes in view</h3></div><div className="voicing-grid">{visibleVoicings.map(({shape,index})=><button type="button" key={shape.frets.join(',')} aria-label={chordSymbol(root,chord,shape.bass)+', fret '+shape.position+', '+fretNotation(shape.frets)} aria-pressed={voicingIndex===index} className={'voicing-card '+(voicingIndex===index?'current':'')} onClick={()=>selectVoicing(index)}><span className="voicing-card-title">{chordSymbol(root,chord,shape.bass)}<small>{shape.position?'Fret '+shape.position:'Open'}</small></span><MiniShape frets={shape.frets}/><span className="voicing-frets">{fretNotation(shape.frets)}</span></button>)}</div>{!visibleVoicings.length&&<p>No shapes in this view.</p>}</section>}
      {mode==='scales'&&<section className="scale-starters"><div className="section-heading"><h3>Quick scales</h3></div><div className="scale-starter-grid">{[{root:9,id:'minor-pent',title:'A minor pentatonic'},{root:0,id:'major-blues',title:'C major blues'},{root:4,id:'blues',title:'E minor blues'}].map(item=><button type="button" className="scale-starter" key={item.id} onClick={()=>{selectRoot(item.root);setScaleId(item.id);setStartFret(item.id==='minor-pent'?5:1);}}><strong>{item.title}<span aria-hidden="true">↗</span></strong></button>)}</div></section>}
      <details className="help-details"><summary>Help <span aria-hidden="true">+</span></summary><div className="help-content"><p><strong>Neck.</strong> High e at the top. 0 = open; × = muted. In Chords, moving the neck selects a shape in that position.</p><p><strong>Notes.</strong> White = root; gray = chord or scale tone. W = 2 frets; H = 1 fret; 3H = 3 frets. Chord names require all formula notes.</p><p><strong>Keys.</strong> Arrows move between frets and strings. Enter selects. Home = open; End = fret 24.</p></div></details>
    </main>
    <footer className="site-footer"><span>Caesar’s Fret Lab</span><a href={portfolioHref}>Julio Caesar ↗</a></footer>
  </div>;
}

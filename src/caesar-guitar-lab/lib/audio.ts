import { midiFrequency } from './music';

/** Small additive pluck synthesizer; no microphone, downloads, or permissions needed. */
export class GuitarAudio {
  private context: AudioContext | null = null;
  private active = new Set<OscillatorNode>();
  private generation = 0;

  private async ready() {
    const Audio = window.AudioContext ?? (window as unknown as {webkitAudioContext?: typeof AudioContext}).webkitAudioContext;
    if (!Audio) throw new Error('Sound is unavailable in this browser. Try a current Chrome, Firefox, Safari, or Edge.');
    this.context ??= new Audio();
    if (this.context.state === 'suspended') await this.context.resume();
    if (this.context.state !== 'running') throw new Error('Sound is paused by your browser. Tap Play again to enable it.');
    return this.context;
  }

  private pluck(context: AudioContext, midi: number, start: number, volume: number) {
    const envelope = context.createGain();
    const filter = context.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(4200,start);
    filter.frequency.exponentialRampToValueAtTime(900,start+1.4);
    envelope.gain.setValueAtTime(0.0001,start);
    envelope.gain.exponentialRampToValueAtTime(volume,start+0.008);
    envelope.gain.exponentialRampToValueAtTime(0.0001,start+1.65);
    envelope.connect(filter);
    filter.connect(context.destination);
    let remaining = 4;
    for (let harmonic=1; harmonic<=4; harmonic++) {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = midiFrequency(midi)*harmonic;
      gain.gain.value = 1/(harmonic*harmonic);
      oscillator.connect(gain);
      gain.connect(envelope);
      this.active.add(oscillator);
      oscillator.onended = () => {
        this.active.delete(oscillator);
        oscillator.disconnect();
        gain.disconnect();
        if (--remaining === 0) {envelope.disconnect(); filter.disconnect();}
      };
      oscillator.start(start);
      oscillator.stop(start+1.7);
    }
  }

  async play(notes: number[], spacing=0.055): Promise<number> {
    this.stop();
    const token = this.generation;
    const context = await this.ready();
    if (token !== this.generation || !notes.length) return 0;
    const start = context.currentTime+0.025;
    const volume = spacing < 0.1 ? 0.12/Math.sqrt(notes.length) : 0.10;
    notes.forEach((note,i) => this.pluck(context,note,start+i*spacing,volume));
    return ((notes.length-1)*spacing+1.75)*1000;
  }

  stop() {
    this.generation++;
    for (const oscillator of this.active) {
      try { oscillator.stop(); } catch { /* Already ended. */ }
    }
    this.active.clear();
  }

  dispose() {
    this.stop();
    void this.context?.close();
    this.context = null;
  }
}

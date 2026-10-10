# Music validation

Standard tuning is E2–A2–D3–G3–B3–E4 (MIDI 40, 45, 50, 55, 59, 64). Each fret adds one semitone. Fingering arrays run from low E to high e; null means muted and 0 means open.

Reference checks:

- [Fender: C minor](https://www.fender.com/articles/chords/learn-how-to-play-c-minor-guitar-chord): the third-fret barre shape is x35543. Its pitches are C3, G3, C4, E-flat4, G4.
- [Fender: minor chords](https://www.fender.com/articles/chords/guitar-chords-minor-chord): minor triads use root, minor third, and perfect fifth.
- [Open Music Theory: blues scales](https://viva.pressbooks.pub/openmusictheory/chapter/blues-melodies-and-the-blues-scale/): major blues has semitone offsets 0, 2, 3, 4, 7, 9. The app labels the passing tone flat 3; sharp 2 is an enharmonic alternative used in the reference. Minor blues uses 0, 3, 5, 6, 7, 10.
- [Open Music Theory: chord symbols](https://viva.pressbooks.pub/openmusictheory/chapter/chord-symbols/) and [seventh chords](https://viva.pressbooks.pub/openmusictheory/chapter/seventh-chords/): triad qualities, seventh qualities, and extension naming.
- [Open Music Theory: modes](https://viva.pressbooks.pub/openmusictheory/chapter/intro-to-diatonic-modes-and-the-chromatic-scale/): the seven diatonic modes are rotations of the major scale.

Automated checks cover all 20 chord types and all 12 roots, every neck-window position, complete chord-tone coverage, note/degree spelling, known open and barre shapes, scale definitions, and octave playback. DOM interaction tests exercise the slider, arrows, root/quality selection, chord cards, and scale highlighting.

Recognition requires the complete pitch-class set of one of the supported formulas. Doubling and octaves do not change the chord quality; the lowest actual MIDI pitch determines the bass. Alternative names remain available where pitch-class sets coincide. Omitted-tone jazz voicings are outside this exact-match library.

The finder retains a few shapes at each fret and prioritizes familiar E/A forms. Generated shapes use a maximum four-fret window and a finger-count heuristic; this is a set of suggestions, not an exhaustive list or a guarantee of comfort for every hand.

The interface uses bundled Inter and Lobster fonts under their accompanying SIL Open Font Licenses.

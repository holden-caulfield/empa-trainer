import Soundfont from 'soundfont-player'

const AudioContext =
  window.AudioContext || // Default
  window.webkitAudioContext || // Safari and old versions of Chrome
  false

const ac = new AudioContext()

export const playInterval = interval => {
  Soundfont.instrument(ac, 'acoustic_grand_piano').then(piano => {
    piano.play(interval.noteFrom, ac.currentTime, { duration: 1 })
    piano.play(interval.noteTo, ac.currentTime + 1, { duration: 1 })
  })
}

export const playChord = (instrument, when, notes) => {
  notes.forEach(note => {
    instrument.play(note, when, { duration: 2 })
  })
}

export const playProgression = chords => {
  Soundfont.instrument(ac, 'acoustic_grand_piano').then(piano => {
    chords.forEach((chord, i) => {
      playChord(piano, ac.currentTime + i * 3, chord)
    })
  })
}

import Soundfont from 'soundfont-player'
import { notes } from 'tonal-chord'

const AudioContext =
  window.AudioContext || // Default
  window.webkitAudioContext || // Safari and old versions of Chrome
  false

const ac = new AudioContext()

let piano = false
const loadInstrument = new Promise((resolve, reject) => {
  if (piano) resolve(piano)
  else
    Soundfont.instrument(ac, 'acoustic_grand_piano').then(pianoFont => {
      piano = pianoFont
      resolve(piano)
    })
})

const playNotes = (notes, options = {}) => {
  const doPlay = (notes, { timeOffset = 0, duration = 1 }) => {
    loadInstrument.then(instrument => {
      notes.forEach(note => {
        instrument.play(note, ac.currentTime + timeOffset, { duration })
      })
    })
  }
  doPlay(notes, options)
}

const playNote = (note, options) => playNotes([note], options)

export const playInterval = (interval, duration = 1) => {
  playNote(interval.noteFrom, { duration })
  playNote(interval.noteTo, { duration, timeOffset: duration })
}

const liftArray = arrayOrValue =>
  Array.isArray(arrayOrValue) ? arrayOrValue : [arrayOrValue]

export const playChord = (chord, options) => {
  playNotes(notes(...liftArray(chord)), options)
}

export const playChords = (chords, duration = 2) => {
  chords.forEach((chord, index) => {
    playChord(chord, { timeOffset: index * duration, duration })
  })
}

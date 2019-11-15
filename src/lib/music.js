import { chromatic } from '@tonaljs/range'
import { shuffle } from '@tonaljs/array'
import { note, transpose, interval, distance } from '@tonaljs/tonal'
import { chord } from '@tonaljs/chord'
import { fromRomanNumerals } from '@tonaljs/progression'
import { chain, without, head, last, isEmpty } from 'ramda'
import progressionSets from './progressionSets'

const randomPick = list => shuffle(list)[0]

export const randomNote = (range = ['C4', 'B5']) =>
  randomPick(chromatic(range, Math.random() > 0.5))

const intervalSets = {
  '2da': ['2m', '2M'],
  '3ra': ['3m', '3M'],
  '4/5': ['4P', '4A', '5P'],
  '6ta': ['6m', '6M'],
  '7ma': ['7m', '7M'],
  '8va': ['8P']
}

const liftInterval = intervalDesc =>
  typeof intervalDesc === 'string' ? interval(intervalDesc) : intervalDesc

export const ivlQuality = interval => {
  const ivl = liftInterval(interval)
  return `${Math.abs(ivl.num)}${ivl.q}`
}

export const ivlDirection = interval => liftInterval(interval).dir

export const expandIntervalSets = (sets, ascDes = true) =>
  chain(
    set => [
      ...intervalSets[set],
      ...(ascDes ? intervalSets[set].map(interval => `-${interval}`) : [])
    ],
    sets
  )

export const intervalOptions = Object.keys(intervalSets)

export const setOf = interval =>
  intervalOptions.find(name =>
    intervalSets[name].includes(ivlQuality(interval))
  )

export const randomInterval = ({
  sets = intervalOptions,
  rootNote = false,
  excluding = []
}) =>
  intervalFrom(
    rootNote ? rootNote : randomNote(),
    randomPick(without(excluding, expandIntervalSets(sets)))
  )

export const intervalFrom = (note, name) => ({
  noteFrom: note,
  name: name,
  noteTo: transpose(note, name)
})

const notesMap = {
  A: 'La',
  B: 'Si',
  C: 'Do',
  D: 'Re',
  E: 'Mi',
  F: 'Fa',
  G: 'Sol'
}

export const toItalian = noteName => {
  const noteObj = note(noteName)
  return `${notesMap[noteObj.letter]}${noteObj.acc}`
}

export const expandProgressionSets = (sets, types) =>
  chain(set => chain(type => progressionSets[set][type], types), sets)

export const randomProgression = ({
  includedSets,
  includedTypes,
  randomRootNote,
  rootNote = false
}) => ({
  rootNote: randomRootNote ? randomNote(['A3', 'G4']) : rootNote,
  chords: randomPick(expandProgressionSets(includedSets, includedTypes))
})

export const progressionOptions = Object.keys(progressionSets)

const closestNote = (pc, refNote, rootNote) => {
  if (pc === note(rootNote).pc) return rootNote
  return [3, 4, 5]
    .map(octave => `${pc}${octave}`)
    .find(note => interval(distance(note, refNote)).num < 5)
}

export const chordNotes = (chordName, fromNote, rootNote) => {
  const chordObj = chord(chordName)
  const realTonic = closestNote(chordObj.tonic, fromNote, rootNote)
  return chordObj.intervals.map(interval => transpose(realTonic, interval))
}

const extraRomanMap = {
  'V/IV': 'I7',
  'V/V': 'II7',
  'V/VI': 'III7',
  'V/II': 'VI7',
  'V/III': 'VII7',
  SustV: 'IIb7',
  'SustV/IV': 'Vb7',
  'SustV/V': 'VIb7',
  'SustV/VI': 'VIb7',
  'SustV/II': 'IIIb7',
  'SustV/III': 'VI7'
}

const applyExtraRomans = roman =>
  Object.keys(extraRomanMap).includes(roman) ? extraRomanMap[roman] : roman

export const applyProgression = (rootNote, progression) => {
  const chords = progression.split(', ').map(applyExtraRomans)
  return fromRomanNumerals(note(rootNote).pc, chords)
}

export const expandChordProgression = ({ rootNote, chords }) => {
  return applyProgression(rootNote, chords).reduce(
    (progressionChords, chord) => {
      const previousTonic = isEmpty(progressionChords)
        ? rootNote
        : head(last(progressionChords))
      return [...progressionChords, chordNotes(chord, previousTonic, rootNote)]
    },
    []
  )
}

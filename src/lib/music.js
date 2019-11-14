import { chromatic } from '@tonaljs/range'
import { shuffle } from '@tonaljs/array'
import { note, transpose, interval } from '@tonaljs/tonal'
import { chain, without } from 'ramda'

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

const progressionSets = {
  Maj: ['I, IV, V, I'],
  Min: ['Im, IVm, V, Im'],
  DS: ['I, V/IV, IV, I'],
  IM: ['I, IV, IVm, I'],
  Dis: ['I, I#, IIm, I']
}

export const progressionOptions = Object.keys(progressionSets)

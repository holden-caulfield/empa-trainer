import { chromatic } from 'tonal-range'
import { shuffle } from 'tonal-array'
import { pc } from 'tonal-note'
import { transpose } from 'tonal-distance'
import { head, tail, chain, without } from 'ramda'
import { props, build } from 'tonal-interval'

const randomPick = list => shuffle(list)[0]

export const randomNote = (range = ['C4', 'B5']) => randomPick(chromatic(range))

const intervalSets = {
  '2da': ['2m', '2M'],
  '3ra': ['3m', '3M'],
  '4/5': ['4P', '4A', '5P'],
  '6ta': ['6m', '6M'],
  '7ma': ['7m', '7M'],
  '8va': ['8P']
}

const lift = interval =>
  typeof interval === 'string' ? props(interval) : interval

const quality = interval => build({ ...lift(interval), dir: 1 })

const direction = interval => lift(interval).dir

export const interval = {
  quality,
  direction
}

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
    intervalSets[name].includes(build({ ...props(interval), dir: 1 }))
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

export const toItalian = note => {
  const pitch = pc(note)
  return `${notesMap[head(pitch)]}${tail(pitch)}`
}

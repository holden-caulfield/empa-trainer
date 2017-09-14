import { chromatic } from 'tonal-range'
import { shuffle } from 'tonal-array'
import { pc } from 'tonal-note'
import { transpose } from 'tonal-transpose'
import { head, tail, chain } from 'ramda'
import { fromProps } from 'tonal-interval'

const randomPick = list => shuffle(list)[0]

export const randomNote = (range = 'C3 B4') => randomPick(chromatic(range))

const intervalSets = {
  '2da': ['2m', '2M'],
  '3ra': ['3m', '3M'],
  '4/5': ['4P', '4A', '5P'],
  '6ta': ['6m', '6M'],
  '7ma': ['7m', '7M'],
  '8va': ['8P']
}

export const quality = interval => fromProps({ ...interval, dir: 1 })

export const expandIntervalSets = (sets, ascDes = true) =>
  chain(
    set => [
      ...intervalSets[set],
      ...(ascDes ? intervalSets[set].map(interval => `-${interval}`) : [])
    ],
    sets
  )

export const intervalOptions = Object.keys(intervalSets)

export const randomInterval = intervalSets => {
  const intervals = expandIntervalSets(intervalSets)
  const noteFrom = randomNote(),
    name = randomPick(intervals),
    noteTo = transpose(noteFrom, name)
  return { noteFrom, noteTo, name }
}

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

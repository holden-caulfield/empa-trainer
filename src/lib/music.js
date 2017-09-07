import { chromatic } from 'tonal-range'
import { shuffle } from 'tonal-array'
import { pc } from 'tonal-note'
import { transpose } from 'tonal-transpose'
import { head, tail } from 'ramda'

const randomPick = list => shuffle(list)[0]

export const randomNote = (range = 'C3 B4') => randomPick(chromatic(range))

export const randomInterval = (intervals = '3m 3M -3m -3M') => {
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

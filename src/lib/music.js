import { chromatic } from 'tonal-range'
import { shuffle } from 'tonal-array'
import { transpose } from 'tonal-transpose'

const randomPick = (list) => shuffle(list)[0]

export const randomNote = (range = 'C3 B4') =>
  randomPick(chromatic(range))

export const randomInterval = (intervals = '3m 3M -3m -3M') => {
    const rootNote = randomNote()
    const interval = randomPick(intervals)
    return [rootNote, transpose(rootNote, interval)]
}
import { toItalian } from './music'

describe('toItalian', () => {
  it('translates C to Do', () => {
    expect(toItalian('C')).toBe('Do')
  })

  it('properly considers flats and sharps', () => {
    expect(toItalian('Db')).toBe('Reb')
    expect(toItalian('A#')).toBe('La#')
  })

  it('clears octaves', () => {
    expect(toItalian('G#3')).toBe('Sol#')
  })
})

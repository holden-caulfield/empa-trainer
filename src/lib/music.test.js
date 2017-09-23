import * as M from './music'

describe('expandIntervalSets', () => {
  it('properlyExpands set names', () => {
    const result = M.expandIntervalSets(['2da', '8va'])
    expect(result).toContain('2m')
    expect(result).toContain('2M')
    expect(result).toContain('8P')
  })

  it('adds descending intervals by default', () => {
    const result = M.expandIntervalSets(['3ra'])
    expect(result).toContain('-3m')
    expect(result).toContain('-3M')
  })

  it('accepts a flag to supress descending intervals', () => {
    const result = M.expandIntervalSets(['3ra'], false)
    expect(result).not.toContain('-3m')
    expect(result).not.toContain('-3M')
  })
})

describe('randomInterval', () => {
  it('always picks an interval from the given sets', () => {
    const result = M.randomInterval(['4/5', '8va'])
    const possibleIntervals = [
      '4P',
      '4A',
      '-4A',
      '-4P',
      '5P',
      '-5P',
      '8P',
      '-8P'
    ]
    expect(possibleIntervals).toContain(result.name)
  })
})

describe('toItalian', () => {
  it('translates C to Do', () => {
    expect(M.toItalian('C')).toBe('Do')
  })

  it('properly considers flats and sharps', () => {
    expect(M.toItalian('Db')).toBe('Reb')
    expect(M.toItalian('A#')).toBe('La#')
  })

  it('clears octaves', () => {
    expect(M.toItalian('G#3')).toBe('Sol#')
  })
})

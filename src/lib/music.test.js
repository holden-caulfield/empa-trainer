import * as M from './music'
import progressionSets from './progressionSets'

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
    const result = M.randomInterval({ sets: ['4/5', '8va'] })
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

  it('allows fixing the root note', () => {
    const result = M.randomInterval({ sets: ['4/5', '8va'], rootNote: 'D5' })
    expect(result.noteFrom).toBe('D5')
  })

  it('allows filtering out some possible intervals', () => {
    const result = M.randomInterval({
      sets: ['3ra'],
      excluding: ['3M', '3m', '-3m']
    })
    expect(result.name).toBe('-3M')
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

describe('ivlQuality', () => {
  it('gets the absolute quality of intervals', () => {
    expect(M.ivlQuality('3M')).toBe('3M')
    expect(M.ivlQuality('-2m')).toBe('2m')
  })
})

describe('setOf', () => {
  it('gets the proper set for an interval', () => {
    expect(M.setOf('3M')).toBe('3ra')
    expect(M.setOf('-3m')).toBe('3ra')
    expect(M.setOf('4A')).toBe('4/5')
    expect(M.setOf('-8P')).toBe('8va')
  })
})

describe('expandProgressionSets', () => {
  it('properlyExpands progressionNames names', () => {
    const result = M.expandProgressionSets(['Min', 'DS'], ['Tri'])
    expect(result).toContain('Im, IVm, V, Im')
    expect(result).toContain('I, V/IV, IV, I')
  })

  it('considers type of chords', () => {
    const result = M.expandProgressionSets(['Maj'], ['Tri', '7ma'])
    expect(result).toContain('I, IV, V, I')
    expect(result).toContain('IMaj7, IVMaj7, V7, IMaj7')
  })
})

describe('expandChordProgression', () => {
  it('properly handles #o7', () => {
    const result = M.expandChordProgression({
      rootNote: 'Db4',
      chords: 'IIm7, II#o7, IIIm7, IMaj7'
    })
  })
})

describe('applyProgression', () => {
  it('properly expands a chord progression', () => {
    const result = M.applyProgression('C', 'I, IIm, V7, I')
    expect(result).toEqual(['C', 'Dm', 'G7', 'C'])
  })

  it('considers secondary dominants', () => {
    const result = M.applyProgression('C', 'I, V/IV, IV, I')
    expect(result).toEqual(['C', 'C7', 'F', 'C'])
  })

  it('omits octaves', () => {
    const result = M.applyProgression('C4', 'I, IIm, V7, I')
    expect(result).toEqual(['C', 'Dm', 'G7', 'C'])
  })

  it('supports all progression sets', () => {
    Object.values(progressionSets).forEach(set =>
      Object.values(set).forEach(progressions => {
        progressions.forEach(progression => {
          const result = M.applyProgression('C4', progression)
          expect(result.includes('')).toBe(false)
        })
      })
    )
  })
})

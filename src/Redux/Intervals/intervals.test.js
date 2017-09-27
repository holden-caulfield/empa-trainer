import Actions, { reducer, progressStats } from './index'
import { intervalFrom as ivl } from 'lib/music'

describe('reducer', () => {
  it('adds a random interval when exercise starts', () => {
    const { interval } = reducer(
      { intervalRange: ['2da', '6ta'] },
      Actions.start()
    )
    expect(interval).not.toBeNull()
  })

  it('properly registers a given answer', () => {
    const state = { interval: ivl('G3', '3M'), history: [] }
    const { interval, answer } = reducer(state, Actions.answer('3M'))
    expect(interval).not.toBeNull()
    expect(answer).not.toBeNull()
    expect(answer).toBe('3M')
  })

  it('answer is stored on the progress history', () => {
    const interval = ivl('G3', '5P')
    const state = { interval, historic: [] }
    const { historic } = reducer(state, Actions.answer('3M'))
    expect(historic).toHaveLength(1)
    expect(historic[0]).toMatchObject({ interval, answer: '3M' })
  })

  it('properly resets state when stopped', () => {
    const state = {
      intervalRange: ['3ra'],
      interval: ivl('G3', '5P'),
      answer: '3M'
    }
    const { interval, intervalRange, answer } = reducer(state, Actions.stop())
    expect(interval).toBeNull()
    expect(intervalRange).toMatchObject(['3ra'])
    expect(answer).toBeNull()
  })

  it('properly resets selection on each new interval', () => {
    const state = {
      intervalRange: ['3ra'],
      interval: ivl('G3', '5P'),
      answer: '3M'
    }
    const { interval, answer } = reducer(state, Actions.start())
    expect(interval).not.toBeNull()
    expect(answer).toBeNull()
  })
})

describe('progressStats selector', () => {
  const sampleStateWithHistory = {
    intervals: {
      historic: [
        { interval: ivl('G3', '5P'), answer: '4P' },
        { interval: ivl('C3', '3M'), answer: '3M' },
        { interval: ivl('C3', '-3M'), answer: '3M' },
        { interval: ivl('C#3', '6m'), answer: '6m' },
        { interval: ivl('C3', '-7m'), answer: '-7m' }
      ]
    }
  }

  it('properly calculates how many intervals where tested', () => {
    const { total } = progressStats(sampleStateWithHistory)
    expect(total).toBe(5)
  })

  it('properly calculates how many intervals where correct', () => {
    const { correct } = progressStats(sampleStateWithHistory)
    expect(correct).toBe(3)
  })
})

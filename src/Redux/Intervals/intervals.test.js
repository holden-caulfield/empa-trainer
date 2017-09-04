import Actions, { reducer } from './index'

describe('reducer', () => {
  it('adds a random interval when exercise starts', () => {
    const { interval } = reducer({}, Actions.start())
    expect(interval).not.toBeNull()
  })

  it('properly registers a given answer', () => {
    const state = { interval: ['G3', 'D3'] }
    const { interval, answer } = reducer({}, Actions.answer('3M'))
    expect(interval).not.toBeNull()
    expect(answer).not.toBeNull()
    expect(answer).toBe('3M')
  })

  it('properly resets state when restarted', () => {
    const state = { interval: ['G3', 'D3'], answer: '3M' }
    const { interval, answer } = reducer(state, Actions.start())
    expect(interval).not.toBeNull()
    expect(answer).toBeNull()
  })
})

import Creators, { reducer } from './'
import { scaleOptions } from 'lib/music'

describe('reducer', () => {
  it('returns initial state with all scales', () => {
    expect(reducer()).toEqual({
      config: {
        scales: scaleOptions
      },
      scale: null,
      answer: null
    })
  })

  it('updates selected scales in config state', () => {
    const state = {
      config: {
        scales: []
      }
    }
    const newConfig = { scales: ['scale1', 'scale2'] }
    expect(reducer(state, Creators.setConfig(newConfig))).toEqual({
      config: {
        scales: ['scale1', 'scale2']
      }
    })
  })

  it('starts with a scale selected from config', () => {
    const state = {
      config: {
        scales: ['x', 'y', 'z']
      },
      scale: null,
      answer: null
    }
    const newState = reducer(state, Creators.start())
    expect(newState).toMatchObject({
      config: {
        scales: ['x', 'y', 'z']
      },
      answer: null
    })
    expect(
      newState.config.scales.indexOf(newState.scale)
    ).toBeGreaterThanOrEqual(0)
  })
})

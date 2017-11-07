import { createReducer, createActions } from 'reduxsauce'
import { randomInterval } from 'lib/music'
import { randomNote } from 'lib/music'
import { omit, equals } from 'ramda'

const CONFIG_PRESETS = {
  PRACTICA: () => ({
    startOnFirst: true,
    finishOnFirst: true,
    rootNote: 'C4',
    randomRootNote: true,
    allowInverted: true,
    drillLength: false
  }),
  PABLO: () => ({
    startOnFirst: true,
    finishOnFirst: true,
    rootNote: randomNote(['C4', 'B4']),
    randomRootNote: false,
    allowInverted: true,
    drillLength: 3
  })
}

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  config: CONFIG_PRESETS.PRACTICA()
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setConfig: ['newConfig'],
  setPreset: ['preset']
})

export default Creators

/* ------------- Reducers ------------- */
const setConfig = (state, { newConfig }) => ({
  ...state,
  config: { ...state.config, ...newConfig }
})

const setPreset = (state, { preset }) => ({
  ...state,
  config: CONFIG_PRESETS[preset]()
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CONFIG]: setConfig,
  [Types.SET_PRESET]: setPreset
})

/* ------------- Epics ------------- */

/* ------------- Selectors ------------- */

export const preset = state => {
  const checkPreset = (accum, value) =>
    equals(
      omit(['rootNote'], state.config),
      omit(['rootNote'], CONFIG_PRESETS[value]())
    )
      ? value
      : accum
  return Object.keys(CONFIG_PRESETS).reduce(checkPreset, null)
}

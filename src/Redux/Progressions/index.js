import { createReducer, createActions } from 'reduxsauce'
import { progressionOptions } from 'lib/music'
/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  config: {
    includedSets: progressionOptions,
    includedTypes: ['Tri', '7ma'],
    rootNote: 'C4',
    randomRootNote: true
  }
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setConfig: ['newConfig']
})

export default Creators

/* ------------- Reducers ------------- */
const setConfig = (state, { newConfig }) => ({
  ...state,
  config: { ...state.config, ...newConfig }
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_CONFIG]: setConfig
})

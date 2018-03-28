import { createReducer, createActions } from 'reduxsauce'
import { scaleOptions } from 'lib/music'

const INITIAL_STATE = {
  config: {
    scales: scaleOptions
  },
  scale: null,
  answer: null
}

const { Types, Creators } = createActions({
  setConfig: ['newConfig'],
  start: null
})

export default Creators

/* reducers */

const start = state => {
  const index = Math.round(Math.random() * 100) % state.config.scales.length
  return {
    ...state,
    scale: state.config.scales[index]
  }
}

const setConfig = (state, { newConfig }) => ({
  ...state,
  config: { ...state.config, ...newConfig }
})

/* map types to reducers */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.START]: start,
  [Types.SET_CONFIG]: setConfig
})

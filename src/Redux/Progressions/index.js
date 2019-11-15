import { createReducer, createActions } from 'reduxsauce'
import { createLogic } from 'redux-logic'
import {
  progressionOptions,
  randomProgression,
  expandChordProgression
} from 'lib/music'
import { playProgression } from 'lib/player'

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  config: {
    includedSets: progressionOptions,
    includedTypes: ['Tri', '7ma'],
    rootNote: 'C4',
    randomRootNote: true
  },
  progression: null,
  showAnswer: false
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setProgConfig: ['newConfig'],
  progStart: null,
  progReplay: null,
  showProgAnswer: null,
  progReady: null,
  progStop: null
})

export default Creators

/* ------------- Reducers ------------- */
const setConfig = (state, { newConfig }) => ({
  ...state,
  config: { ...state.config, ...newConfig }
})

const start = state => ({
  ...state,
  progression: randomProgression(state.config),
  showAnswer: false
})

const stop = state => ({
  ...state,
  progression: null,
  showAnswer: false
})

const showAnswer = state => ({ ...state, showAnswer: true })

const ready = state => state

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_PROG_CONFIG]: setConfig,
  [Types.PROG_START]: start,
  [Types.PROG_STOP]: stop,
  [Types.SHOW_PROG_ANSWER]: showAnswer,
  [Types.PROG_READY]: ready
})

/* ------------- Logics ------------- */

const playbackLogic = createLogic({
  type: [Types.PROG_START, Types.PROG_REPLAY],
  latest: true,
  processOptions: {
    dispatchReturn: true,
    successType: Creators.progReady
  },
  process: ({ getState }) => {
    const currentState = getState().progressions
    playProgression(expandChordProgression(currentState.progression))
    return
  }
})

export const Logics = [playbackLogic]

import { createReducer, createActions } from 'reduxsauce'
import { randomInterval, intervalOptions, expandIntervalSets } from 'lib/music'
import { playInterval } from 'lib/player'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/mapTo'

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  phase: 'CONFIG',
  intervalRange: intervalOptions,
  interval: null,
  answer: null,
  ready: false
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setIntervalRange: ['intervalRange'],
  start: null,
  ready: null,
  replay: null,
  answer: ['answer'],
  stop: null
})

export default Creators

/* ------------- Reducers ------------- */

const setIntervalRange = (state, { intervalRange }) => ({
  ...state,
  intervalRange
})

const start = state => ({
  ...state,
  phase: 'TEST',
  interval: randomInterval(state.intervalRange),
  answer: null,
  ready: false
})

const answer = (state, { answer }) => ({ ...state, answer })

const ready = state => ({ ...state, ready: true })

const stop = state => ({ ...state, phase: 'CONFIG' })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_INTERVAL_RANGE]: setIntervalRange,
  [Types.START]: start,
  [Types.ANSWER]: answer,
  [Types.READY]: ready,
  [Types.STOP]: stop
})

/* ------------- Epics ------------- */

export const epic = (action$, store) =>
  action$
    .ofType(Types.START, Types.REPLAY)
    .do(() => {
      playInterval(store.getState().intervals.interval)
    })
    .mapTo(Creators.ready())

/* ------------- Selectors ------------- */

export const expandSelectedIntervals = state =>
  expandIntervalSets(state.intervals.intervalRange, false)

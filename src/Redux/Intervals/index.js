import { createReducer, createActions } from 'reduxsauce'
import {
  randomInterval,
  randomNote,
  intervalOptions,
  expandIntervalSets,
  setOf
} from 'lib/music'
import { playInterval } from 'lib/player'
import { append, filter, groupBy, map, path, omit, equals } from 'ramda'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/mapTo'

const CONFIG_PRESETS = {
  PRACTICA: () => ({
    intervalRange: intervalOptions,
    repeatIntervals: true,
    rootNote: 'C4',
    randomRootNote: true,
    drillLength: false
  }),
  PABLO: () => ({
    intervalRange: intervalOptions,
    repeatIntervals: false,
    rootNote: randomNote(['C4', 'B4']),
    randomRootNote: false,
    drillLength: 10
  })
}

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  config: {
    intervalRange: intervalOptions,
    repeatIntervals: true,
    rootNote: 'C4',
    randomRootNote: true,
    drillLength: false
  },
  interval: null,
  answer: null,
  ready: false,
  historic: []
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  setConfig: ['newConfig'],
  setPreset: ['preset'],
  start: null,
  ready: null,
  replay: null,
  answer: ['answer'],
  stop: null
})

export default Creators

/* ------------- Reducers ------------- */
const setConfig = (state, { newConfig }) => ({
  ...state,
  config: { ...state.config, ...newConfig }
})

const start = state => {
  if (drillIsOver(state)) return state
  const {
    randomRootNote,
    intervalRange,
    rootNote,
    repeatIntervals
  } = state.config
  return {
    ...state,
    ready: false,
    answer: null,
    interval: randomInterval({
      sets: intervalRange,
      rootNote: randomRootNote ? false : rootNote,
      excluding:
        repeatIntervals || !allowsNoRepeat(state)
          ? []
          : map(path(['interval', 'name']), state.historic)
    })
  }
}

const answer = (state, { answer }) => ({
  ...state,
  answer,
  historic: append({ interval: state.interval, answer: answer }, state.historic)
})

const ready = state => ({ ...state, ready: true })

const stop = state => ({
  ...INITIAL_STATE,
  config: state.config
})

const setPreset = (state, { preset }) => ({
  ...state,
  config: CONFIG_PRESETS[preset]()
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.START]: start,
  [Types.ANSWER]: answer,
  [Types.READY]: ready,
  [Types.STOP]: stop,
  [Types.SET_CONFIG]: setConfig,
  [Types.SET_PRESET]: setPreset
})

/* ------------- Epics ------------- */

export const epic = (action$, store) =>
  action$
    .ofType(Types.START, Types.REPLAY)
    .do(() => {
      const currentState = store.getState().intervals
      !drillIsOver(currentState) && playInterval(currentState.interval)
    })
    .mapTo(Creators.ready())

/* ------------- Selectors ------------- */
export const drillIsOver = ({ historic, config }) =>
  config.drillLength && historic.length >= config.drillLength

export const allowsNoRepeat = state => {
  const { intervalRange, drillLength } = state.config
  if (drillLength === false) return false
  return drillLength <= expandIntervalSets(intervalRange).length
}

export const expandSelectedIntervals = state =>
  expandIntervalSets(state.config.intervalRange, false)

export const progressStats = state => {
  const { historic } = state.intervals
  console.log(historic)
  const answerOk = ({ interval, answer }) => answer === interval.name
  const intervalSet = ({ interval }) => setOf(interval.name)
  const stats = intervals => ({
    total: intervals.length,
    correct: filter(answerOk, intervals).length
  })
  return {
    ...stats(historic),
    byGroup: map(stats, groupBy(intervalSet, historic))
  }
}

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

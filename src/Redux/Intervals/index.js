import { createReducer, createActions } from 'reduxsauce'
import { randomInterval } from 'lib/music'
import { playInterval } from 'lib/player'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/mapTo'

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  intervalRange: ['3M', '3m', '-3M', '-3m'],
  interval: null,
  answer: null,
  ready: false
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  start: null,
  ready: null,
  answer: ['answer']
})

export default Creators

/* ------------- Reducers ------------- */

const start = state => ({
  ...state,
  interval: randomInterval(state.intervalRange),
  answer: null,
  ready: false
})

const answer = (state, { answer }) => ({ ...state, answer })

const ready = state => ({ ...state, ready: true })

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.START]: start,
  [Types.ANSWER]: answer,
  [Types.READY]: ready
})

/* ------------- Epics ------------- */

export const epic = (action$, store) =>
  action$
    .ofType(Types.START)
    .do(() => {
      playInterval(store.getState().intervals.interval)
    })
    .mapTo(Creators.ready())

/* ------------- Selectors ------------- */

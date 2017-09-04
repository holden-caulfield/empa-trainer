import { createReducer, createActions } from 'reduxsauce'
import { randomInterval } from '../../lib/music'
import { playInterval } from '../../lib/player'

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
    interval: null,
    answer: null
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
    start: null,
    answer: ['answer']
})
  
export default Creators
  
/* ------------- Reducers ------------- */
  
const start = (state) => {
  const interval = randomInterval()
  playInterval(interval)
  return ({ interval, answer: null })
}

const answer = (state, { answer }) =>
  ({ ...state, answer })
/* ------------- Hookup Reducers To Types ------------- */
  
export const reducer = createReducer(INITIAL_STATE, {
  [Types.START]: start,
  [Types.ANSWER]: answer
})
  
/* ------------- Selectors ------------- */

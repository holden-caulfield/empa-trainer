import { createReducer, createActions } from 'reduxsauce'

/* ------------- Initial State ------------- */

const INITIAL_STATE = {
  left: '',
  right: ''
}

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  openLeft: null,
  openRight: null,
  clear: null
})

export default Creators

/* ------------- Reducers ------------- */

const clear = state => INITIAL_STATE

const openLeft = state => ({
  right: '',
  left: 'open'
})

const openRight = state => ({
  left: '',
  right: 'open'
})

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.OPEN_LEFT]: openLeft,
  [Types.OPEN_RIGHT]: openRight,
  [Types.CLEAR]: clear
})

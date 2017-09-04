import { createStore, combineReducers } from 'redux'
import { reducer as intervals } from './Intervals'

export default () => createStore(
  combineReducers({
    intervals
  })
)

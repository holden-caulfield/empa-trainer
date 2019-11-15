import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import Reactotron from 'reactotron-react-js'
import { createLogicMiddleware } from 'redux-logic'

import { reducer as intervals, Logics as intervalsLogics } from './Intervals'
import {
  reducer as progressions,
  Logics as progressionsLogics
} from './Progressions'
import { reducer as panels } from './Panels'

const logicMiddleware = createLogicMiddleware([
  ...intervalsLogics,
  ...progressionsLogics
])

const rootReducer = combineReducers({
  intervals,
  progressions,
  panels
})

const middlewares = [logicMiddleware]

export default () => {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares), Reactotron.createEnhancer())
  )
  return store
}

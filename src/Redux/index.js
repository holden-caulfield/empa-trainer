import { combineReducers, applyMiddleware } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import Reactotron from 'reactotron-react-js'

import { reducer as intervals, epic as intervalsEpic } from './Intervals'

const rootReducer = combineReducers({
  intervals
})

const rootEpic = combineEpics(intervalsEpic)

const middlewares = [createEpicMiddleware(rootEpic)]

export default () =>
  Reactotron.createStore(rootReducer, applyMiddleware(...middlewares))

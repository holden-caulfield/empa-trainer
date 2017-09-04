import { createStore, combineReducers, applyMiddleware } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'

import { reducer as intervals, epic as intervalsEpic } from './Intervals'

const rootReducer = combineReducers({
  intervals
})

const rootEpic = combineEpics(intervalsEpic)

const middlewares = [createEpicMiddleware(rootEpic)]

export default () => createStore(rootReducer, applyMiddleware(...middlewares))

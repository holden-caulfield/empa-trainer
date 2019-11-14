import { combineReducers, applyMiddleware, createStore, compose } from 'redux'
import { combineEpics, createEpicMiddleware } from 'redux-observable'
import Reactotron from 'reactotron-react-js'

import { reducer as intervals, epic as intervalsEpic } from './Intervals'
import { reducer as progressions } from './Progressions'
import { reducer as panels } from './Panels'

const rootReducer = combineReducers({
  intervals,
  progressions,
  panels
})

const rootEpic = combineEpics(intervalsEpic)
const epicMiddleware = createEpicMiddleware()

const middlewares = [epicMiddleware]

export default () => {
  const store = createStore(
    rootReducer,
    compose(applyMiddleware(...middlewares), Reactotron.createEnhancer())
  )
  epicMiddleware.run(rootEpic)
  return store
}

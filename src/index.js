import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import createStore from './Redux'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import './index.css'
import 'Config/Reactotron'

const store = createStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker()

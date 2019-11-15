import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import createStore from './Redux'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import './index.css'
import 'Config/Reactotron'

import theme from 'Theme'
import { ThemeProvider } from 'styled-components'

const store = createStore()

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <Provider store={store}>
      <App />
    </Provider>
  </ThemeProvider>,
  document.getElementById('root')
)

//registerServiceWorker()

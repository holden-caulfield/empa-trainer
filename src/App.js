import React, { Component } from 'react'
import Intervals from 'Containers/Intervals'

class App extends Component {
  render = () => (
    <div id="mainContainer" role="main">
      <div id="leftPanel" />
      <div id="mainPanel">
        <Intervals />
      </div>
      <div id="rightPanel" />
    </div>
  )
}

export default App

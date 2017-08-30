import React, { Component } from 'react'
import Soundfont from 'soundfont-player'
import logo from './logo.svg'
import './App.css'

const ac = new AudioContext()

const playNote = () => {
  Soundfont.instrument(ac, 'acoustic_grand_piano')
  .then((piano) => {
    piano.play('C4')
  })
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={playNote}>Play Some Sound</button>
      </div>
    )
  }
}

export default App

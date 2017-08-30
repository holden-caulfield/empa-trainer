import React, { Component } from 'react'
import Soundfont from 'soundfont-player'
import logo from './logo.svg'
import { randomInterval } from './lib/music'
import './App.css'

const ac = new AudioContext()

const playInterval = () => {
  Soundfont.instrument(ac, 'acoustic_grand_piano')
  .then((piano) => {
    randomInterval().forEach(
      (note, index) => piano.play(note, ac.currentTime + index, {duration: 1})       
    )
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
        <button onClick={playInterval}>Give me an 3rd interval!</button>
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import Soundfont from 'soundfont-player'
import { intervallic } from 'tonal-harmonizer'
import logo from './logo.svg'
import { randomInterval } from './lib/music'
import './App.css'

const ac = new AudioContext()

const renderInterval = (interval) =>
  <div>
    <p>Root Note: {interval[0]}</p>
    <p>Name: {intervallic(interval)}</p>
    <p>Note: {interval[1]}</p>
  </div>

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null
    };
  }

  playInterval = () => {
    Soundfont.instrument(ac, 'acoustic_grand_piano')
    .then((piano) => {
      const interval = randomInterval()
      interval.forEach(
        (note, index) => {
          piano.play(note, ac.currentTime + index, {duration: 1})
        }       
      )
      this.setState({interval})      
    })
  }  

  render() {
    const { interval } = this.state
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.playInterval}>Give me a 3rd interval!</button>
        { interval && renderInterval(interval)}
      </div>
    )
  }
}

export default App

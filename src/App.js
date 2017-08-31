import React, { Component } from 'react'
import Soundfont from 'soundfont-player'
import { intervallic } from 'tonal-harmonizer'
import logo from './logo.svg'
import { randomInterval } from './lib/music'
import './App.css'

const ac = new AudioContext()

const renderInterval = (interval, answer, onAnswer) =>
  <div>
    <p>Root Note: {interval[0]}</p>
    { answer ? renderResult(interval, answer) : renderInput(onAnswer)}
  </div>

const renderResult = (interval, answer) => {
  const intervalName = intervallic(interval)[0]
  const correct = intervalName === answer
  const renderCorrect = <p>Name: {answer} <span className='correct'>Correct!</span></p>
  const renderWrong = <p>Name: <span className='wrong'>{answer} </span>{intervalName}</p>
  return <div> 
    { correct ? renderCorrect : renderWrong }
    <p>Note: {interval[1]}</p>
  </div>
}

const renderInput = (onAnswer) => 
  <div>
    <p>
      Name: 
      <input type='text' id='answer'/>
      <button type='button' onClick={onAnswer}>Send</button>
    </p>
  </div>


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: null,
      answer: null
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
      this.setState({interval, answer: null})      
    })
  }
  
  sendAnswer = () => {
    const answer = document.getElementById('answer').value
    this.setState({answer})
  }

  render() {
    const { interval, answer } = this.state
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
        { interval && renderInterval(interval, answer, this.sendAnswer)}
      </div>
    )
  }
}

export default App

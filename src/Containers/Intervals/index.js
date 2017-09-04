import React, { Component } from 'react'
import { connect } from 'react-redux'
import IntervalsActions from 'Redux/Intervals'
import './style.css'

const renderInterval = (interval, answer, onAnswer) => (
  <div>
    <p>Root Note: {interval.noteFrom}</p>
    {answer ? renderResult(interval, answer) : renderInput(onAnswer)}
  </div>
)

const renderResult = (interval, answer) => {
  const correct = interval.name === answer
  const renderCorrect = (
    <p>
      Name: {answer} <span className="correct">Correct!</span>
    </p>
  )
  const renderWrong = (
    <p>
      Name: <span className="wrong">{answer} </span>
      {interval.name}
    </p>
  )
  return (
    <div>
      {correct ? renderCorrect : renderWrong}
      <p>Note: {interval.noteTo}</p>
    </div>
  )
}

const renderInput = onAnswer => (
  <div>
    <p>
      Name:
      <input type="text" id="answer" />
      <button
        type="button"
        onClick={() => {
          onAnswer(document.getElementById('answer').value)
        }}
      >
        Send
      </button>
    </p>
  </div>
)

class Intervals extends Component {
  render = () => {
    const { interval, answer, startTest, sendAnswer } = this.props
    return (
      <div>
        <button onClick={startTest}>Give me a 3rd interval!</button>
        {interval && renderInterval(interval, answer, sendAnswer)}
      </div>
    )
  }
}

const mapStateToProps = state => state.intervals
const mapDispatchToProps = {
  startTest: IntervalsActions.start,
  sendAnswer: IntervalsActions.answer
}

export default connect(mapStateToProps, mapDispatchToProps)(Intervals)

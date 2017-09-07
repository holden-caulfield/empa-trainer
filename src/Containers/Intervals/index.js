import React, { Component } from 'react'
import { connect } from 'react-redux'
import IntervalsActions from 'Redux/Intervals'
import Button from 'Components/Button'
import IntervalPicker from 'Components/IntervalPicker'
import './style.css'

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

const renderInput = (intervalRange, onAnswer) => (
  <IntervalPicker
    possibleIntervals={intervalRange}
    onIntervalSelected={onAnswer}
  />
)

class Intervals extends Component {
  renderInterval = () => {
    const { interval, answer, intervalRange, sendAnswer } = this.props
    return (
      <div>
        <p>Nota: {interval.noteFrom}</p>
        {answer ? (
          renderResult(interval, answer)
        ) : (
          renderInput(intervalRange, sendAnswer)
        )}
      </div>
    )
  }

  render = () => {
    const { ready, startTest } = this.props
    return (
      <div id="intervalsContainer">
        {ready && this.renderInterval()}
        <Button onClick={startTest}>Nuevo Intervalo</Button>
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

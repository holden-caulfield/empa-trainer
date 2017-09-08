import React, { Component } from 'react'
import { connect } from 'react-redux'
import IntervalsActions, { expandSelectedIntervals } from 'Redux/Intervals'
import Button from 'Components/Button'
import Note from 'Components/Note'
import Result from 'Components/Result'
import IntervalPicker from 'Components/IntervalPicker'
import './style.css'

class Intervals extends Component {
  render = () => {
    const {
      interval,
      ready,
      answer,
      possibleIntervals,
      startTest,
      sendAnswer
    } = this.props
    return (
      <div id="intervalsContainer">
        {interval && <Note note={interval.noteFrom} />}
        {ready && (
          <IntervalPicker
            possibleIntervals={possibleIntervals}
            onIntervalSelected={sendAnswer}
          />
        )}
        {answer && <Result answer={answer} test={interval.name} />}
        {answer && <Note note={interval.noteTo} />}
        <Button onClick={startTest}>Nuevo Intervalo</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.intervals,
  possibleIntervals: expandSelectedIntervals(state)
})

const mapDispatchToProps = {
  startTest: IntervalsActions.start,
  sendAnswer: IntervalsActions.answer
}

export default connect(mapStateToProps, mapDispatchToProps)(Intervals)

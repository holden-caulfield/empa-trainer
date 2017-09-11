import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from 'react-fontawesome'
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
      replay,
      startTest,
      sendAnswer
    } = this.props
    return (
      <div id="intervalsContainer">
        <div>
          {interval && <Note note={interval.noteFrom} />}
          {ready && (
            <Button color="darkblue" onClick={replay}>
              <Icon name="play" /> De nuevo!
            </Button>
          )}
        </div>
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
  sendAnswer: IntervalsActions.answer,
  replay: IntervalsActions.replay
}

export default connect(mapStateToProps, mapDispatchToProps)(Intervals)

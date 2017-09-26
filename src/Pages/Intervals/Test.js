import React, { Component } from 'react'
import { connect } from 'react-redux'
import IntervalsActions, { expandSelectedIntervals } from 'Redux/Intervals'
import MainPanel from 'Components/Panels'
import Button from 'Components/Button'
import IntervalPicker from 'Components/IntervalPicker'
import Interval from 'Components/Interval'

class IntervalsTest extends Component {
  render = () => {
    const {
      interval,
      answer,
      possibleIntervals,
      replay,
      nextInterval,
      sendAnswer,
      stopTest
    } = this.props
    return (
      <MainPanel>
        <Interval
          notes={
            answer ? [interval.noteFrom, interval.noteTo] : [interval.noteFrom]
          }
          replay={replay}
        />
        <IntervalPicker
          possibleIntervals={possibleIntervals}
          onIntervalSelected={sendAnswer}
          interval={interval}
          answer={answer}
        />
        <Button onClick={nextInterval}>Siguiente</Button>
        <Button color="crimson" onClick={stopTest}>
          Terminar
        </Button>
      </MainPanel>
    )
  }
}

const mapStateToProps = state => ({
  ...state.intervals,
  possibleIntervals: expandSelectedIntervals(state)
})

const mapDispatchToProps = {
  nextInterval: IntervalsActions.start,
  sendAnswer: IntervalsActions.answer,
  replay: IntervalsActions.replay,
  stopTest: IntervalsActions.stop
}

export default connect(mapStateToProps, mapDispatchToProps)(IntervalsTest)

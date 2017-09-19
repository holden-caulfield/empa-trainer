import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from 'react-fontawesome'
import IntervalsActions, { expandSelectedIntervals } from 'Redux/Intervals'
import MainPanel from 'Components/Panels'
import Button from 'Components/Button'
import Notes from 'Components/Notes'
import IntervalPicker from 'Components/IntervalPicker'

class IntervalsTest extends Component {
  render = () => {
    const {
      interval,
      ready,
      answer,
      possibleIntervals,
      replay,
      nextInterval,
      sendAnswer,
      stopTest
    } = this.props
    return (
      <MainPanel>
        <Notes
          notes={
            answer ? [interval.noteFrom, interval.noteTo] : [interval.noteFrom]
          }
        />
        {ready && (
          <Button color="darkblue" onClick={replay}>
            <Icon name="play" /> De nuevo!
          </Button>
        )}
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import IntervalsActions, {
  expandSelectedIntervals,
  hasNext
} from 'Redux/Intervals'
import MainPanel from 'Components/Panels'
import Button, { SecondaryButton, ButtonBar } from 'Components/Button'
import IntervalPicker from 'Components/IntervalPicker'
import Interval from 'Components/Interval'
import styled from 'styled-components'

const ControlsContainer = styled.div`
  width: calc(100% - 40px);
  padding: 0 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  @media (max-width: 400px) {
    width: calc(100% - 20px);
    padding: 0 10px;
  }
`

class IntervalsTest extends Component {
  stop = () => {
    this.props.history.replace('/intervals')
  }
  render = () => {
    const {
      interval,
      answer,
      possibleIntervals,
      replay,
      nextInterval,
      hasNext,
      sendAnswer
    } = this.props
    return interval ? (
      <MainPanel>
        <Interval
          notes={
            answer ? [interval.noteFrom, interval.noteTo] : [interval.noteFrom]
          }
          replay={replay}
        />
        <ControlsContainer>
          <IntervalPicker
            possibleIntervals={possibleIntervals}
            onIntervalSelected={sendAnswer}
            interval={interval}
            answer={answer}
          />
          <ButtonBar>
            <SecondaryButton onClick={this.stop}>Terminar</SecondaryButton>
            {hasNext && <Button onClick={nextInterval}>Siguiente</Button>}
          </ButtonBar>
        </ControlsContainer>
      </MainPanel>
    ) : (
      <Redirect to="/intervals" />
    )
  }
}

const mapStateToProps = state => ({
  ...state.intervals,
  possibleIntervals: expandSelectedIntervals(state),
  hasNext: hasNext(state)
})

const mapDispatchToProps = {
  nextInterval: IntervalsActions.start,
  sendAnswer: IntervalsActions.answer,
  replay: IntervalsActions.replay
}

export default connect(mapStateToProps, mapDispatchToProps)(IntervalsTest)

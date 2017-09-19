import React, { Component } from 'react'
import { PickerButton } from 'Components/Button'
import styled from 'styled-components'
import Icon from 'react-fontawesome'
import { props, fromProps } from 'tonal-interval'
import { pick, none, isNil, values } from 'ramda'
import { interval as ivl } from 'lib/music'

const IntervalPickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-content: space-between;
  width: 80%;
`

const IntervalsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex-grow: 3;
  align-items: center;
  justify-content: center;
`

const DirectionContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
`

const directions = [
  { name: 'ascendente', dir: 1, icon: 'arrow-up' },
  { name: 'descendente', dir: -1, icon: 'arrow-down' }
]

const INITIAL_STATE = { num: null, alt: null, dir: null }

export default class IntervalPicker extends Component {
  state = INITIAL_STATE

  setQuality = quality => {
    this.setState(pick(['num', 'alt'], props(quality)))
  }

  setDirection = dir => {
    this.setState({ dir })
  }

  stateComplete = () => none(isNil, values(this.state))

  componentWillReceiveProps(props) {
    if (!props.answer) this.setState(INITIAL_STATE)
  }

  componentDidUpdate() {
    const { answer, onIntervalSelected } = this.props
    if (this.stateComplete() && !answer) {
      onIntervalSelected(fromProps(this.state))
    }
  }

  colorFor = fn => value => {
    const { interval, answer } = this.props
    if (!answer) return 'black'
    if (fn(interval.name) === value) return 'green'
    if (fn(answer) === value) return 'crimson'
    return 'black'
  }

  render() {
    const { possibleIntervals, answer } = this.props

    return (
      <IntervalPickerContainer>
        <IntervalsContainer>
          {possibleIntervals.map(quality => (
            <PickerButton
              color={this.colorFor(ivl.quality)(quality)}
              key={quality}
              onClick={() => this.setQuality(quality)}
              selected={quality === ivl.quality(this.state)}
              disabled={answer}
            >
              {quality}
            </PickerButton>
          ))}
        </IntervalsContainer>
        <DirectionContainer>
          {directions.map(direction => (
            <PickerButton
              key={direction.name}
              color={this.colorFor(ivl.direction)(direction.dir)}
              selected={this.state.dir === direction.dir}
              onClick={() => this.setDirection(direction.dir)}
              disabled={answer}
            >
              <Icon name={direction.icon} />
            </PickerButton>
          ))}
        </DirectionContainer>
      </IntervalPickerContainer>
    )
  }
}

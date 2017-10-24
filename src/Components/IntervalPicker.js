import React, { Component } from 'react'
import { PickerButton } from 'Components/Button'
import styled from 'styled-components'
import Icon from 'react-fontawesome'
import { props, build } from 'tonal-interval'
import { pick, none, isNil, values } from 'ramda'
import { interval as ivl } from 'lib/music'

const IntervalPickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: space-between;
  width: 100%;
`

const IntervalsContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex-grow: 3;
`

const DirectionContainer = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  justify-content: center;
`

const IntervalPickerButton = PickerButton.extend`
  height: 60px;
  font-weight: 600;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  font-size: 20px;
  @media (max-width: 400px) {
    width: 60px;
  }
  @media (max-width: 320px) {
    width: 50px;
    height: 50px;
  }
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
      onIntervalSelected(build(this.state))
    }
  }

  colorFor = fn => value => {
    const { interval, answer } = this.props
    if (!answer) return 'dark'
    if (fn(interval.name) === value) return 'right'
    if (fn(answer) === value) return 'wrong'
    return 'dark'
  }

  render() {
    const { possibleIntervals, answer } = this.props

    return (
      <IntervalPickerContainer>
        <IntervalsContainer>
          {possibleIntervals.map(quality => (
            <IntervalPickerButton
              color={this.colorFor(ivl.quality)(quality)}
              key={quality}
              onClick={() => this.setQuality(quality)}
              selected={quality === ivl.quality(this.state)}
              disabled={answer}
            >
              {quality}
            </IntervalPickerButton>
          ))}
        </IntervalsContainer>
        <DirectionContainer>
          {directions.map(direction => (
            <IntervalPickerButton
              key={direction.name}
              color={this.colorFor(ivl.direction)(direction.dir)}
              selected={this.state.dir === direction.dir}
              onClick={() => this.setDirection(direction.dir)}
              disabled={answer}
            >
              <Icon name={direction.icon} />
            </IntervalPickerButton>
          ))}
        </DirectionContainer>
      </IntervalPickerContainer>
    )
  }
}

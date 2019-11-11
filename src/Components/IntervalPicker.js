import React, { Component } from 'react'
import { PickerButton } from 'Components/Button'
import styled from 'styled-components'
import Icon from 'react-fontawesome'
import { ivlDirection, ivlQuality } from 'lib/music'
import { none, isNil, values } from 'ramda'

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
  opacity: ${props => (props.disabled && !props.selected ? 0.5 : 1)};
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

const INITIAL_STATE = { quality: null, dir: null }

export default class IntervalPicker extends Component {
  state = INITIAL_STATE

  setQuality = quality => {
    this.setState({ quality })
  }

  setDirection = dir => {
    this.setState({ dir })
  }

  stateComplete = () => none(isNil, values(this.state))

  componentWillReceiveProps(props) {
    if (this.props.answer && !props.answer) this.setState(INITIAL_STATE)
  }

  componentDidUpdate() {
    const { answer, onIntervalSelected } = this.props
    if (this.stateComplete() && !answer) {
      const { dir, quality } = this.state
      onIntervalSelected(`${dir === -1 ? '-' : ''}${quality}`)
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
              color={this.colorFor(ivlQuality)(quality)}
              key={quality}
              onClick={() => this.setQuality(quality)}
              selected={quality === this.state.quality}
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
              color={this.colorFor(ivlDirection)(direction.dir)}
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

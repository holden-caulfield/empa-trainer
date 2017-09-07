import React, { Component } from 'react'
import Button from 'Components/Button'
import styled from 'styled-components'

const IntervalPickerContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  align-content: space-between;
  width: 80%;
`

const IntervalButton = Button.extend`
  width: 15vw;
  height: 15vw;
  margin: 1vw;
  font-size: 5vw;
`

export default class IntervalPicker extends Component {
  render() {
    const { possibleIntervals } = this.props
    return (
      <IntervalPickerContainer>
        {possibleIntervals.map(interval => (
          <IntervalButton
            color="darkblue"
            key={interval}
            onClick={() => this.props.onIntervalSelected(interval)}
          >
            {interval}
          </IntervalButton>
        ))}
      </IntervalPickerContainer>
    )
  }
}

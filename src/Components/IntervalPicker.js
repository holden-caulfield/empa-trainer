import React, { Component } from 'react'
import Button from 'Components/Button'
import styled from 'styled-components'

const IntervalPickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const IntervalButton = Button.extend`
  width: 50px;
  height: 50px;
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

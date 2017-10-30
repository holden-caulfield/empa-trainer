import React, { Component } from 'react'
import { PickerButton } from 'Components/Button'
import styled from 'styled-components'

const ButtonPanel = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: space-between;
`

export default class IntervalPicker extends Component {
  render() {
    const { value, onSelect, options } = this.props
    const isSelected = option => option === value
    const clickHandler = option => () => {
      onSelect(option)
    }

    return (
      <ButtonPanel>
        {Object.keys(options).map(key => (
          <PickerButton
            color="dark"
            key={key}
            onClick={clickHandler(options[key])}
            selected={isSelected(options[key])}
          >
            {key}
          </PickerButton>
        ))}
      </ButtonPanel>
    )
  }
}

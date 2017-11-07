import React, { Component } from 'react'
import { PickerButton } from 'Components/Button'
import styled from 'styled-components'

const ButtonPanel = styled.div`
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
`

export default class IntervalPicker extends Component {
  render() {
    const { value, onSelect, options, disabled, wide } = this.props
    const isSelected = option => option === value
    const clickHandler = option => () => {
      onSelect(option)
    }

    return (
      <ButtonPanel>
        {Object.keys(options).map(key => (
          <PickerButton
            wide={wide}
            color="dark"
            key={key}
            disabled={disabled}
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

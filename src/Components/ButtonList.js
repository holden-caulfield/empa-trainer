import React, { Component } from 'react'
import { PickerButton } from 'Components/Button'
import styled from 'styled-components'
import { without, identity, sortBy } from 'ramda'

const ButtonPanel = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: space-between;
`

export default class ButtonList extends Component {
  render() {
    const { selected, onSelectRange, options } = this.props
    const Button = this.props.button || PickerButton
    const isSelected = option => selected.includes(option)
    const clickHandler = option => () => {
      onSelectRange(
        isSelected(option)
          ? without([option], selected)
          : sortBy(identity, [...selected, option])
      )
    }

    return (
      <ButtonPanel>
        {options.map(option => (
          <Button
            color="dark"
            key={option}
            onClick={clickHandler(option)}
            selected={isSelected(option)}
          >
            {option}
          </Button>
        ))}
      </ButtonPanel>
    )
  }
}

import React from 'react'
import { PickerButton } from 'Components/Button'
import styled from 'styled-components'
import { without } from 'ramda'

const ButtonPanel = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: flex-start;
`

const RangePicker = props => {
  const isSelected = value => props.selected.includes(value)

  const clickHandler = value => () => {
    props.onSelectRange(
      isSelected(value)
        ? without([value], props.selected)
        : [...props.selected, value]
    )
  }

  return (
    <ButtonPanel>
      {props.options.map(option => (
        <PickerButton
          color="dark"
          key={option}
          onClick={clickHandler(option)}
          selected={isSelected(option)}
        >
          {option}
        </PickerButton>
      ))}
    </ButtonPanel>
  )
}

export default RangePicker

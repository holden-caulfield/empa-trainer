import React, { Component } from 'react'
import { PickerButton } from 'Components/Button'
import { intervalOptions } from 'lib/music'
import styled from 'styled-components'
import { without, identity, sortBy } from 'ramda'

const ButtonPanel = styled.div`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  justify-content: space-between;
`

export default class IntervalPicker extends Component {
  render() {
    const { selected, onSelectRange } = this.props
    const isSelected = intervalSet => selected.includes(intervalSet)
    const clickHandler = intervalSet => () => {
      onSelectRange(
        isSelected(intervalSet)
          ? without([intervalSet], selected)
          : sortBy(identity, [...selected, intervalSet])
      )
    }

    return (
      <ButtonPanel>
        {intervalOptions.map(intervalSet => (
          <PickerButton
            color="dark"
            key={intervalSet}
            onClick={clickHandler(intervalSet)}
            selected={isSelected(intervalSet)}
          >
            {intervalSet}
          </PickerButton>
        ))}
      </ButtonPanel>
    )
  }
}

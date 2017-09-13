import React, { Component } from 'react'
import Button from 'Components/Button'
import { intervalOptions } from 'lib/music'
import { without } from 'ramda'

const IntervalSetButton = Button.extend`
  width: 10vw;
  height: 10vw;
  margin: 1vw;
  font-size: 3vw;
`

export default class IntervalPicker extends Component {
  render() {
    const { selected, onSelectRange } = this.props
    const isSelected = intervalSet => selected.includes(intervalSet)
    const clickHandler = intervalSet => () => {
      onSelectRange(
        isSelected(intervalSet)
          ? without([intervalSet], selected)
          : [...selected, intervalSet]
      )
    }

    return (
      <div>
        {intervalOptions.map(intervalSet => (
          <IntervalSetButton
            color="black"
            key={intervalSet}
            onClick={clickHandler(intervalSet)}
            selected={isSelected(intervalSet)}
          >
            {intervalSet}
          </IntervalSetButton>
        ))}
      </div>
    )
  }
}

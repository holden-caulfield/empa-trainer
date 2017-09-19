import React, { Component } from 'react'
import styled from 'styled-components'
import Notes from 'Components/Notes'
import Button from 'Components/Button'
import Icon from 'react-fontawesome'

const IntervalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`

const ReplayButton = Button.extend`width: auto;`

export default class Interval extends Component {
  render() {
    const { notes, replay } = this.props
    return (
      <IntervalContainer>
        <Notes notes={notes} />
        <ReplayButton color="darkblue" onClick={replay}>
          <Icon name="play" /> De nuevo!
        </ReplayButton>
      </IntervalContainer>
    )
  }
}

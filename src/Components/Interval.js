import React, { Component } from 'react'
import styled from 'styled-components'
import Notes from 'Components/Notes'
import Button from 'Components/Button'
import Icon from 'react-fontawesome'
import { imagePath } from 'lib/images'

const IntervalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: calc(100% - 40px);
  padding: 0;
  padding-left: 40px;
  margin: 0;
  background-color: #f0f3f4;
  background-image: url(${imagePath('ondas.svg')});
  background-repeat: repeat-x;
  background-position: center 177px;
`

const ReplayButton = Button.extend`
  font-size: 14px;
  height: 30px;
  max-width: 120px;
  left: -30px;
  position: relative;
`

export default class Interval extends Component {
  render() {
    const { notes, replay } = this.props
    return (
      <IntervalContainer>
        <Notes notes={notes} />
        <ReplayButton color="light" textColor="accent" onClick={replay}>
          <Icon name="volume-up" /> &iexcl;De nuevo!
        </ReplayButton>
      </IntervalContainer>
    )
  }
}

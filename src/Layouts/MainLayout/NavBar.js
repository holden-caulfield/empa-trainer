import React, { Component } from 'react'
import styled from 'styled-components'
import Icon from 'react-fontawesome'

const NavBarContainer = styled.header`
  display: flex;
  left: 320px;
  right: 320px;
  top: 0;
  position: fixed;
  height: 60px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid black;
  @media (max-width: 720px) {
    right: 0;
  }
  @media (max-width: 1040px) {
    left: 0;
  }
`

const TitleContainer = styled.h1`
  flex-grow: 1;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`

const MenuIcon = styled(Icon)`
  font-size: 30px;
  height: 60px;
  width: 60px;
  line-height: 60px;
  text-align: center;
  visibility: hidden;
`

const LeftIcon = MenuIcon.extend`
  @media (max-width: 1040px) {
    visibility: visible;
  }
`
const RightIcon = MenuIcon.extend`
  @media (max-width: 720px) {
    visibility: visible;
  }
`

export default class NavBar extends Component {
  render() {
    const { onLeftIcon, onRightIcon, title } = this.props
    return (
      <NavBarContainer>
        <LeftIcon className="left" name="bars" onClick={onLeftIcon} />
        <TitleContainer>{title}</TitleContainer>
        <RightIcon name="line-chart" onClick={onRightIcon} />
      </NavBarContainer>
    )
  }
}

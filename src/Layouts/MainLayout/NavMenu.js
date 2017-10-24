import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import Pages from 'Pages'

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
`

const NavHeader = styled.header`
  height: 60px;
  font-size: 24px;
  padding-left: 10px;
  border-bottom: 1px solid black;
`

const Logo = styled.img`
  height: 26px;
  padding: 17px 5px;
`

const NavItem = styled(NavLink)`
  height: 40px;
  line-height: 40px;
  text-decoration: none;
  color: ${props => props.theme.colors.dark};
  font-size: 16px;
  font-weight: 600;
  padding-left: 10px;
  box-shadow: inset 0 -1px 0 0 #eceff1;
  &.selected {
    color: white;
    background-color: ${props => props.theme.colors.accent};
  }
`

export default class Menu extends Component {
  render = () => (
    <NavContainer>
      <NavHeader>
        <Logo src="/images/logo.svg" />
      </NavHeader>
      {Pages.map(page => (
        <NavItem key={page.name} to={page.route} activeClassName="selected">
          {page.props.title}
        </NavItem>
      ))}
    </NavContainer>
  )
}

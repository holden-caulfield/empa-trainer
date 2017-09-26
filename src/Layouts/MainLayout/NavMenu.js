import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import styled from 'styled-components'
import Pages from 'Pages'

const NavContainer = styled.nav`
  display: flex;
  flex-direction: column;
`

const NavHeader = styled.header`
  height: 60px;
  line-height: 60px;
  font-size: 24px;
  padding-left: 10px;
  border-bottom: 1px solid black;
`

const NavItem = styled(Link)`
  height: 40px;
  line-height: 40px;
  text-decoration: none;
  color: black;
  font-size: 16px;
  padding-left: 10px;
  border-bottom: 1px solid grey;
  &.selected {
    color: white;
    background-color: black;
  }
`

export default class Menu extends Component {
  render = () => (
    <NavContainer>
      <NavHeader>EMPA Trainer</NavHeader>
      {Pages.map(page => (
        <Route
          key={page.name}
          path={page.route}
          children={({ match }) => (
            <NavItem to={page.route} className={match ? 'selected' : ''}>
              {page.props.title}
            </NavItem>
          )}
        />
      ))}
    </NavContainer>
  )
}

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Menu extends Component {
  render = () => (
    <nav>
      <header>EMPA Trainer</header>
      <ul>
        <Link to="/">Intervalos</Link>
      </ul>
      <footer>
        <Link to="/about">Acerca de</Link>
      </footer>
    </nav>
  )
}

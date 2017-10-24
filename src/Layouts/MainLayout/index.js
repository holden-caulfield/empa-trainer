import React, { Component } from 'react'
import { connect } from 'react-redux'
import PanelsActions from 'Redux/Panels'
import NavMenu from './NavMenu'
import NavBar from './NavBar'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const Filler = styled.div`
  flex-grow: 1;
  background-image: url('/images/ondas-dark.svg');
  background-repeat: repeat-x;
  background-position: center bottom;
  opacity: 0.1;
  margin-bottom: 20px;
`

class MainLayout extends Component {
  static defaultProps = {
    infoSection: () => null,
    infoIcon: null
  }
  render = () => (
    <div id="mainContainer" role="main">
      <aside
        id="leftPanel"
        onClick={this.props.clear}
        className={this.props.left}
      >
        <NavMenu />
        <Filler />
      </aside>
      <main id="mainPanel">
        <NavBar
          title={this.props.title}
          onLeftIcon={this.props.openLeft}
          rightIcon={this.props.infoIcon}
          onRightIcon={this.props.infoIcon ? this.props.openRight : false}
        />
        <section id="container">{<this.props.mainContent />}</section>
      </main>
      <aside
        id="rightPanel"
        onClick={this.props.clear}
        className={this.props.right}
      >
        <this.props.infoSection />
      </aside>
    </div>
  )
}

const mapStateToProps = state => state.panels

export default withRouter(connect(mapStateToProps, PanelsActions)(MainLayout))

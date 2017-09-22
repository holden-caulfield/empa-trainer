import React, { Component } from 'react'
import Intervals from 'Containers/Intervals'
import NavBar from 'Components/NavBar'
import { connect } from 'react-redux'
import PanelsActions from 'Redux/Panels'

class App extends Component {
  render = () => {
    return (
      <div id="mainContainer" role="main">
        <div
          id="leftPanel"
          onClick={this.props.clear}
          className={this.props.left}
        />
        <div id="mainPanel">
          <NavBar
            title="Intervalos"
            onLeftIcon={this.props.openLeft}
            onRightIcon={this.props.openRight}
          />
          <div id="container">
            <Intervals />
          </div>
        </div>
        <div
          id="rightPanel"
          onClick={this.props.clear}
          className={this.props.right}
        />
      </div>
    )
  }
}

const mapStateToProps = state => state.panels

export default connect(mapStateToProps, PanelsActions)(App)

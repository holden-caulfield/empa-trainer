import React, { Component } from 'react'
import { connect } from 'react-redux'
import PanelsActions from 'Redux/Panels'
import NavMenu from './NavMenu'
import NavBar from './NavBar'

class MainLayout extends Component {
  static defaultProps = {
    infoSection: null
  }
  render = () => (
    <div id="mainContainer" role="main">
      <aside
        id="leftPanel"
        onClick={this.props.clear}
        className={this.props.left}
      >
        <NavMenu />
      </aside>
      <main id="mainPanel">
        <NavBar
          title={this.props.title}
          onLeftIcon={this.props.openLeft}
          onRightIcon={this.props.openRight}
        />
        <section id="container">{<this.props.mainContent />}</section>
      </main>
      <aside
        id="rightPanel"
        onClick={this.props.clear}
        className={this.props.right}
      >
        {<this.props.infoSection />}
      </aside>
    </div>
  )
}

const mapStateToProps = state => state.panels

export default connect(mapStateToProps, PanelsActions)(MainLayout)

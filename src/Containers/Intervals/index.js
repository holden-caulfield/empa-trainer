import React, { Component } from 'react'
import { connect } from 'react-redux'
import Config from './Config'
import Test from './Test'
import MainPanel from 'Components/Panels'

class Intervals extends Component {
  render = () => {
    const { phase } = this.props
    const renderPhase = phase => {
      switch (phase) {
        case 'TEST':
          return <Test />
        case 'CONFIG':
        default:
          return <Config />
      }
    }
    return (
      <MainPanel>
        <h1>Intervalos</h1>
        {renderPhase(phase)}
      </MainPanel>
    )
  }
}

const mapStateToProps = state => ({
  phase: state.intervals.phase
})

export default connect(mapStateToProps)(Intervals)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Config from './Config'
import Test from './Test'
import IntervalsProgress from './Progress'

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
    return renderPhase(phase)
  }
}

const mapStateToProps = state => ({
  phase: state.intervals.phase
})

export default connect(mapStateToProps)(Intervals)

class IntervalsInfo extends Component {
  render = () => (this.props.phase === 'TEST' ? <IntervalsProgress /> : null)
}

export const Info = connect(mapStateToProps)(IntervalsInfo)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import IntervalsActions from 'Redux/Intervals'
import Button from 'Components/Button'
import MainPanel from 'Components/Panels'
import IntervalRangePicker from 'Components/IntervalRangePicker'

class IntervalsConfig extends Component {
  componentWillMount() {
    this.props.stop()
  }

  startTest = () => {
    const { start, history, match } = this.props
    start()
    history.push(`${match.url}/test`)
  }

  render = () => {
    const { intervalRange, changeIntervalRange } = this.props
    return (
      <MainPanel>
        <IntervalRangePicker
          selected={intervalRange}
          onSelectRange={changeIntervalRange}
        />
        <Button onClick={this.startTest}>Empezar</Button>
      </MainPanel>
    )
  }
}

const mapStateToProps = state => ({
  intervalRange: state.intervals.intervalRange
})

const mapDispatchToProps = {
  start: IntervalsActions.start,
  stop: IntervalsActions.stop,
  changeIntervalRange: IntervalsActions.setIntervalRange
}

export default connect(mapStateToProps, mapDispatchToProps)(IntervalsConfig)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import IntervalsActions from 'Redux/Intervals'
import Button from 'Components/Button'
import IntervalRangePicker from 'Components/IntervalRangePicker'

class IntervalsConfig extends Component {
  render = () => {
    const { intervalRange, changeIntervalRange, start } = this.props
    return (
      <div>
        <IntervalRangePicker
          selected={intervalRange}
          onSelectRange={changeIntervalRange}
        />
        <Button onClick={start}>Empezar</Button>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  intervalRange: state.intervals.intervalRange
})

const mapDispatchToProps = {
  start: IntervalsActions.start,
  changeIntervalRange: IntervalsActions.setIntervalRange
}

export default connect(mapStateToProps, mapDispatchToProps)(IntervalsConfig)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import IntervalsActions from 'Redux/Intervals'
import Button from 'Components/Button'
import MainPanel from 'Components/Panels'
import NotePicker from 'Components/NotePicker'
import IntervalRangePicker from 'Components/IntervalRangePicker'

const SectionContainer = styled.div`
  width: 90%;
  h2 {
    font-size: 20px;
  }
`
const SectionControls = styled.div`
  display: flex;
  flex-direction: row;
`
const SectionButton = Button.extend`
  margin: 0 20px;
  width: auto;
`

const ConfigSection = props => (
  <SectionContainer>
    <h2>{props.title}</h2>
    <SectionControls>{props.children}</SectionControls>
  </SectionContainer>
)

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
    const {
      intervalRange,
      rootNote,
      randomRootNote,
      setIntervalRange,
      setRootNote,
      setRandomRootNote
    } = this.props
    return (
      <MainPanel>
        <ConfigSection title="Incluir intervalos de:">
          <IntervalRangePicker
            selected={intervalRange}
            onSelectRange={setIntervalRange}
          />
        </ConfigSection>
        <ConfigSection title="Intervalos a partir de:">
          <NotePicker
            disabled={randomRootNote}
            onChange={setRootNote}
            value={rootNote}
          />
          <SectionButton
            color="black"
            selected={randomRootNote}
            onClick={() => setRandomRootNote(!randomRootNote)}
          >
            Aleatorio
          </SectionButton>
        </ConfigSection>
        <Button onClick={this.startTest}>Empezar</Button>
      </MainPanel>
    )
  }
}

const mapStateToProps = state => ({
  intervalRange: state.intervals.intervalRange,
  rootNote: state.intervals.rootNote,
  randomRootNote: state.intervals.randomRootNote
})

const mapDispatchToProps = IntervalsActions

export default connect(mapStateToProps, mapDispatchToProps)(IntervalsConfig)

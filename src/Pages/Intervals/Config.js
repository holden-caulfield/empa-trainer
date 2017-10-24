import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import IntervalsActions from 'Redux/Intervals'
import Button, { ButtonBar, CheckableButton } from 'Components/Button'
import MainPanel from 'Components/Panels'
import NotePicker from 'Components/NotePicker'
import IntervalRangePicker from 'Components/IntervalRangePicker'

const SectionContainer = styled.div`
  width: calc(100% - 40px);
  padding: 0 20px;
  margin-bottom: 10px;
  h2 {
    font-size: 20px;
  }
`
const SectionControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const SectionButton = CheckableButton.extend`
  margin: 0 20px;
  max-width: 160px;
  height: 50px;
  font-weight: ${props => (props.selected ? 600 : 300)};
  @media (max-width: 720px) {
    font-size: 15px;
    max-width: 130px;
    height: 40px;
  }
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
            color="dark"
            selected={randomRootNote}
            onClick={() => setRandomRootNote(!randomRootNote)}
          >
            Aleatorio
          </SectionButton>
        </ConfigSection>
        <ButtonBar>
          <Button onClick={this.startTest}>Empezar</Button>
        </ButtonBar>
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import IntervalsActions, { allowsNoRepeat, preset } from 'Redux/Intervals'
import Button, { ButtonBar, CheckableButton } from 'Components/Button'
import MainPanel from 'Components/Panels'
import Picker from 'Components/Picker'
import NotePicker from 'Components/NotePicker'
import IntervalRangePicker from 'Components/IntervalRangePicker'
import CheckableOption from 'Components/CheckableOption'

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

const ModeSection = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
`

const ModeLabel = styled.span`
  text-transform: capitalize;
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
      drillLength,
      repeatIntervals,
      preset,
      allowsNoRepeat,
      setPreset,
      setConfig
    } = this.props
    return (
      <MainPanel>
        <ModeSection>
          {['PABLO', 'PRACTICA'].map(presetOption => (
            <CheckableOption
              key={presetOption}
              selected={preset === presetOption}
              onClick={() => setPreset(presetOption)}
            >
              <ModeLabel>Modo {presetOption.toLowerCase()}</ModeLabel>
            </CheckableOption>
          ))}
        </ModeSection>
        <ConfigSection title="Incluir intervalos de:">
          <IntervalRangePicker
            selected={intervalRange}
            onSelectRange={intervalRange => setConfig({ intervalRange })}
          />
        </ConfigSection>
        <ConfigSection title="Cantidad de intervalos:">
          <Picker
            value={drillLength}
            options={{ '5': 5, '10': 10, '20': 20, '\u221E': false }}
            onSelect={drillLength => setConfig({ drillLength })}
          />
        </ConfigSection>
        <ConfigSection title="Repetir intervalos similares:">
          <Picker
            disabled={!allowsNoRepeat}
            value={allowsNoRepeat ? repeatIntervals : true}
            options={{ Si: true, No: false }}
            onSelect={repeatIntervals => setConfig({ repeatIntervals })}
          />
        </ConfigSection>
        <ConfigSection title="Intervalos a partir de:">
          <NotePicker
            disabled={randomRootNote}
            onChange={rootNote => setConfig({ rootNote })}
            value={rootNote}
          />
          <SectionButton
            color="dark"
            selected={randomRootNote}
            onClick={() => setConfig({ randomRootNote: !randomRootNote })}
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
  ...state.intervals.config,
  allowsNoRepeat: allowsNoRepeat(state.intervals),
  preset: preset(state.intervals)
})

const mapDispatchToProps = IntervalsActions

export default connect(mapStateToProps, mapDispatchToProps)(IntervalsConfig)

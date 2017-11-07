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
import ConfigSection from 'Components/ConfigSection'

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
        <ConfigSection title="Ajustes Predeterminados">
          <Picker
            wide
            value={preset}
            options={{ 'Modo Pablo': 'PABLO', 'Modo Práctica': 'PRACTICA' }}
            onSelect={setPreset}
          />
        </ConfigSection>
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
          <CheckableButton
            color="dark"
            selected={randomRootNote}
            onClick={() => setConfig({ randomRootNote: !randomRootNote })}
          >
            Aleatorio
          </CheckableButton>
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

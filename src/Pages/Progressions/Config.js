import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProgressionsActions, { preset } from 'Redux/Progressions'
import Button, {
  ButtonBar,
  CheckableButton,
  PickerButton
} from 'Components/Button'
import MainPanel from 'Components/Panels'
import Picker from 'Components/Picker'
import NotePicker from 'Components/NotePicker'
import ConfigSection from 'Components/ConfigSection'

class ProgressionsConfig extends Component {
  render = () => {
    const {
      startOnFirst,
      finishOnFirst,
      allowInverted,
      rootNote,
      randomRootNote,
      drillLength,
      preset,
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
        <ConfigSection title="Restricciones">
          <PickerButton
            wide
            color="dark"
            selected={startOnFirst}
            onClick={() => {
              setConfig({ startOnFirst: !startOnFirst })
            }}
          >
            Arrancar en I
          </PickerButton>
          <PickerButton
            wide
            color="dark"
            selected={finishOnFirst}
            onClick={() => {
              setConfig({ finishOnFirst: !finishOnFirst })
            }}
          >
            Terminar en I
          </PickerButton>
        </ConfigSection>

        <ConfigSection title="Cantidad de progresiones:">
          <Picker
            value={drillLength}
            options={{ '3': 3, '5': 5, '10': 10, '\u221E': false }}
            onSelect={drillLength => setConfig({ drillLength })}
          />
        </ConfigSection>
        <ConfigSection title="Incluir acordes con inversiones:">
          <Picker
            value={allowInverted}
            options={{ Si: true, No: false }}
            onSelect={allowInverted => setConfig({ allowInverted })}
          />
        </ConfigSection>
        <ConfigSection title="Tónica:">
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
          <Button>Empezar</Button>
        </ButtonBar>
      </MainPanel>
    )
  }
}

const mapStateToProps = state => ({
  ...state.progressions.config,
  preset: preset(state.progressions)
})

const mapDispatchToProps = ProgressionsActions

export default connect(mapStateToProps, mapDispatchToProps)(ProgressionsConfig)

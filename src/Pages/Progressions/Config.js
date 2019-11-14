import React, { Component } from 'react'
import { connect } from 'react-redux'

import ProgressionsActions from 'Redux/Progressions'
import Button, { ButtonBar } from 'Components/Button'
import MainPanel from 'Components/Panels'
import RangePicker from 'Components/RangePicker'
import NotePicker from 'Components/NotePicker'
import ConfigSection, { SectionButton } from 'Components/ConfigSection'
import { progressionOptions } from 'lib/music'

class ProgressionsConfig extends Component {
  /*componentWillMount() {
    this.props.stop()
  }*/

  /*startTest = () => {
    const { start, history, match } = this.props
    start()
    history.push(`${match.url}/test`)
  }*/

  render = () => {
    const {
      includedSets = [],
      randomRootNote,
      rootNote,
      includedTypes,
      setConfig
    } = this.props
    return (
      <MainPanel>
        <ConfigSection title="Incluir grupos de enlaces:">
          <RangePicker
            selected={includedSets}
            options={progressionOptions}
            onSelectRange={includedSets => setConfig({ includedSets })}
          />
        </ConfigSection>
        <ConfigSection title="Incluir tipos de Acordes:">
          <RangePicker
            selected={includedTypes}
            options={['Tri', '7ma']}
            onSelectRange={includedTypes => setConfig({ includedTypes })}
          />
        </ConfigSection>
        <ConfigSection title="Tonalidad:">
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

const mapStateToProps = state => state.progressions.config

const mapDispatchToProps = ProgressionsActions

export default connect(mapStateToProps, mapDispatchToProps)(ProgressionsConfig)

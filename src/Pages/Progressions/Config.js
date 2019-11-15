import React from 'react'
import { connect } from 'react-redux'

import ProgressionsActions from 'Redux/Progressions'
import Button, { ButtonBar } from 'Components/Button'
import MainPanel from 'Components/Panels'
import RangePicker from 'Components/RangePicker'
import NotePicker from 'Components/NotePicker'
import ConfigSection, { SectionButton } from 'Components/ConfigSection'
import { progressionOptions } from 'lib/music'

const ProgressionsConfig = props => (
  <MainPanel>
    <ConfigSection title="Incluir grupos de enlaces:">
      <RangePicker
        selected={props.includedSets}
        options={progressionOptions}
        onSelectRange={includedSets => props.setProgConfig({ includedSets })}
      />
    </ConfigSection>
    <ConfigSection title="Incluir tipos de Acordes:">
      <RangePicker
        selected={props.includedTypes}
        options={['Tri', '7ma']}
        onSelectRange={includedTypes => props.setProgConfig({ includedTypes })}
      />
    </ConfigSection>
    <ConfigSection title="Tonalidad:">
      <NotePicker
        disabled={props.randomRootNote}
        onChange={rootNote => props.setProgConfig({ rootNote })}
        value={props.rootNote}
      />
      <SectionButton
        color="dark"
        selected={props.randomRootNote}
        onClick={() =>
          props.setProgConfig({ randomRootNote: !props.randomRootNote })
        }
      >
        Aleatorio
      </SectionButton>
    </ConfigSection>
    <ButtonBar>
      <Button
        onClick={() => {
          props.progStart()
          props.history.push(`${props.match.url}/test`)
        }}
      >
        Empezar
      </Button>
    </ButtonBar>
  </MainPanel>
)

const mapStateToProps = state => state.progressions.config

const mapDispatchToProps = ProgressionsActions

export default connect(mapStateToProps, mapDispatchToProps)(ProgressionsConfig)

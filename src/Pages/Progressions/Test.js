import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import ProgressionsActions from 'Redux/Progressions'
import Button, { SecondaryButton, ButtonBar } from 'Components/Button'
import MainPanel from 'Components/Panels'
import { Redirect } from 'react-router-dom'
import { toItalian } from 'lib/music'
import Icon from 'react-fontawesome'

const ControlsContainer = styled.div`
  width: calc(100% - 40px);
  padding: 0 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  @media (max-width: 400px) {
    width: calc(100% - 20px);
    padding: 0 10px;
  }
`

const Answer = styled.h1`
  height: 50px;
  font-size: 40px;
  padding: 10px;
`

const ProgressionsTest = props =>
  props.progression ? (
    <MainPanel>
      <div>
        <h1>Tonalidad: {toItalian(props.progression.rootNote)}</h1>
        <ButtonBar>
          <Button onClick={props.replay}>
            <Icon name="volume-up" /> De nuevo!
          </Button>
        </ButtonBar>
      </div>
      <ButtonBar>
        <Button onClick={props.requestAnswer}>Mostrar Respuesta</Button>
      </ButtonBar>
      <Answer>{props.showAnswer && props.progression.chords}</Answer>
      <ControlsContainer>
        <ButtonBar>
          <SecondaryButton onClick={props.stop}>Terminar</SecondaryButton>
          <Button onClick={props.nextProgression}>Siguiente</Button>
        </ButtonBar>
      </ControlsContainer>
    </MainPanel>
  ) : (
    <Redirect to="/progressions" />
  )

const mapStateToProps = state => state.progressions

const mapDispatchToProps = {
  nextProgression: ProgressionsActions.progStart,
  requestAnswer: ProgressionsActions.showProgAnswer,
  replay: ProgressionsActions.progReplay,
  stop: ProgressionsActions.progStop
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressionsTest)

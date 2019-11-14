import React from 'react'
import styled from 'styled-components'
import { CheckableButton } from 'Components/Button'

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

export const SectionButton = CheckableButton.extend`
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

export default ConfigSection

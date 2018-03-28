import React from 'react'
import styled from 'styled-components'

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
  flex-wrap: wrap;
`

export default props => (
  <SectionContainer>
    <h2>{props.title}</h2>
    <SectionControls>{props.children}</SectionControls>
  </SectionContainer>
)

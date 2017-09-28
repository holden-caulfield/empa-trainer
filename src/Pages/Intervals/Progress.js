import React, { Component } from 'react'
import { connect } from 'react-redux'
import { progressStats } from 'Redux/Intervals'
import styled from 'styled-components'
import chroma from 'chroma-js'

const ProgressContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin: auto;
  text-align: center;
`

const StatsLabel = styled.div`font-size: 50px;`

const PercentLabel = ({ value }) => {
  const colorScale = chroma.scale(['crimson', 'gold', 'green'])
  const StyledLabel = styled.div`
    font-size: 100px;
    color: ${colorScale(value)};
  `
  return <StyledLabel>{(value * 100).toFixed(0)}%</StyledLabel>
}

class IntervalsProgress extends Component {
  render = () => {
    const { correct, total } = this.props
    const percentage = correct / total
    return total > 0 ? (
      <ProgressContainer>
        <PercentLabel value={percentage} />
        <StatsLabel>
          {correct}/{total}
        </StatsLabel>
      </ProgressContainer>
    ) : (
      <ProgressContainer>
        <p>
          En esta sección vas a poder ver el análisis de tu progreso cuando
          arranques tu entrenamiento
        </p>
      </ProgressContainer>
    )
  }
}

const mapStateToProps = state => ({
  ...progressStats(state)
})

export default connect(mapStateToProps)(IntervalsProgress)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { progressStats } from 'Redux/Intervals'
import styled from 'styled-components'
import chroma from 'chroma-js'
import { intervalOptions } from 'lib/music'

const ProgressContainer = styled.div`
  min-height: 100%;
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
`

const ProgressSection = styled.section`
  flex: 1 0 0;
  width: 100%;
  font-size: 20px;
  h2 {
    font-size: 20px;
    width: 100%;
    text-align: center;
  }
`

const OverallProgressSection = styled(ProgressSection)`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 50px;
`

const StatsLabel = styled.p`
  margin: 0;
  padding: 0;
`

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
    const { correct, total, byGroup } = this.props
    const percentage = correct / total
    const setsWithStats = intervalOptions.filter(setName =>
      byGroup.hasOwnProperty(setName)
    )
    return total > 0 ? (
      <ProgressContainer>
        <OverallProgressSection color="palevioletred">
          <h2>Resultados generales</h2>
          <PercentLabel value={percentage} />
          <StatsLabel>
            {correct}/{total}
          </StatsLabel>
        </OverallProgressSection>
        <ProgressSection>
          <h2>Por tipo de intervalo</h2>
          {setsWithStats.map(intervalSet => (
            <StatsLabel key={intervalSet}>
              {intervalSet}:{byGroup[intervalSet].correct}/{byGroup[intervalSet].total}
            </StatsLabel>
          ))}
        </ProgressSection>
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

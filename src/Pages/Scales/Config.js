import React, { Component } from 'react'
import MainPanel from 'Components/Panels'
import Button, { ButtonBar, ConfigButton } from 'Components/Button'
import ButtonList from 'Components/ButtonList'
import ConfigSection from 'Components/ConfigSection'
import { scaleOptions } from 'lib/music'
import ScaleActions from 'Redux/Scales'
import { connect } from 'react-redux'

const ScaleButton = ConfigButton.extend`
  margin: 0 5px 15px;
  width: 120px;
`

class Config extends Component {
  startTest = () => {
    const { start, history, match } = this.props
    start()
    history.push(`${match.url}/test`)
  }

  render() {
    return (
      <MainPanel>
        <ConfigSection title="Incluir escalas:">
          <ButtonList
            options={scaleOptions}
            selected={this.props.scales}
            button={ScaleButton}
            onSelectRange={scales => this.props.setConfig({ scales })}
          />
        </ConfigSection>
        <ButtonBar>
          <Button onClick={this.startTest}>Empezar</Button>
        </ButtonBar>
      </MainPanel>
    )
  }
}

const mapStateToProps = state => ({
  ...state.scales.config
})

export default connect(mapStateToProps, ScaleActions)(Config)

import React from 'react'
import { connect } from 'react-redux'

const Test = props => (
  <ul>{props.config.scales.map(scale => <li>{scale}</li>)}</ul>
)

const mapStateToProps = state => state.scales

export default connect(mapStateToProps)(Test)

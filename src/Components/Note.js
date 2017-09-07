import React, { Component } from 'react'
import { toItalian } from 'lib/music'

export default class Note extends Component {
  render = () => <p> Nota: {toItalian(this.props.note)} </p>
}

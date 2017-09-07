import React, { Component } from 'react'
import Icon from 'react-fontawesome'

export default class Note extends Component {
  render() {
    const { answer, test } = this.props
    const correct = answer === test
    return correct ? (
      <p>
        <Icon className="correct" name="check" /> Correcto!
      </p>
    ) : (
      <p>
        <Icon className="wrong" name="times" /> {test}
      </p>
    )
  }
}

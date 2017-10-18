import React, { Component } from 'react'
import styled from 'styled-components'
import { props as noteProps, build } from 'tonal-note'
import { pick } from 'ramda'

const notes = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si']

const NotesSelect = styled.select`
  font-size: 25px;
  width: 100px;
  text-indent: 5px;
  height: 50px;
  margin-right: 10px;
`

const CheckableOption = styled.button`
  border: 0;
  background-color: transparent;
  font-size: 30px;
  padding: 0;
  width: 30px;
  height: 50px;
  color: ${({ selected }) => (selected ? 'black' : 'lightgrey')};
  :hover {
    text-shadow: 1px 1px 5px black;
  }
  :disabled {
    text-shadow: none;
    color: lightgrey;
  }
`

export default class NotePicker extends Component {
  static defaultProps = {
    value: 'C',
    disabled: false,
    onChange: () => {}
  }

  initStateFrom(props) {
    this.state = pick(['step', 'alt', 'oct'], noteProps(props.value))
  }

  publishChange = () => {
    this.props.onChange(build(this.state))
  }

  changeStep = e => {
    this.setState({ step: parseInt(e.target.value, 10) }, this.publishChange)
  }

  changeAlt = alt => () => {
    this.setState({ alt: this.state.alt === alt ? 0 : alt }, this.publishChange)
  }

  constructor(props) {
    super(props)
    this.initStateFrom(props)
  }

  componentWillReceiveProps(props) {
    this.initStateFrom(props)
  }

  render = () => {
    const { alt, step } = this.state
    const { disabled } = this.props
    return (
      <div>
        <NotesSelect
          disabled={disabled}
          value={step}
          onChange={this.changeStep}
        >
          {notes.map((note, index) => (
            <option value={index} key={note}>
              {note}
            </option>
          ))}
        </NotesSelect>
        <CheckableOption
          disabled={disabled}
          onClick={this.changeAlt(1)}
          selected={alt === 1}
        >
          &#9839;
        </CheckableOption>
        <CheckableOption
          disabled={disabled}
          onClick={this.changeAlt(-1)}
          selected={alt === -1}
        >
          &#9837;
        </CheckableOption>
      </div>
    )
  }
}

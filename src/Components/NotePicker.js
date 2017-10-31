import React, { Component } from 'react'
import styled from 'styled-components'
import { props as noteProps, build } from 'tonal-note'
import CheckableOption from 'Components/CheckableOption'

const notes = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si']

const NotesSelect = styled.select`
  font-size: 25px;
  width: 100px;
  text-indent: 5px;
  height: 50px;
  margin-right: 10px;
  @media (max-width: 720px) {
    font-size: 20px;
    width: 70px;
    height: 40px;
  }
`

export default class NotePicker extends Component {
  static defaultProps = {
    value: 'C4',
    disabled: false,
    onChange: () => {}
  }

  changeNote = change => {
    this.props.onChange(build({ ...noteProps(this.props.value), ...change }))
  }

  render = () => {
    const { disabled, value } = this.props
    const { alt, step } = noteProps(value)
    return (
      <div>
        <NotesSelect
          disabled={disabled}
          value={step}
          onChange={e => this.changeNote({ step: e.target.value })}
        >
          {notes.map((note, index) => (
            <option value={index} key={note}>
              {note}
            </option>
          ))}
        </NotesSelect>
        <CheckableOption
          disabled={disabled}
          onClick={() => this.changeNote({ alt: alt === 1 ? 0 : 1 })}
          selected={alt === 1}
        >
          &#9839;
        </CheckableOption>
        <CheckableOption
          disabled={disabled}
          onClick={() => this.changeNote({ alt: alt === -1 ? 0 : -1 })}
          selected={alt === -1}
        >
          &#9837;
        </CheckableOption>
      </div>
    )
  }
}

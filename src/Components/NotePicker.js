import React, { Component } from 'react'
import styled from 'styled-components'
import { note } from '@tonaljs/tonal'
import { toItalian } from 'lib/music'
import CheckableOption from 'Components/CheckableOption'

const notes = ['C', 'D', 'E', 'F', 'G', 'A', 'B']

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
    const { letter, oct, acc } = { ...note(this.props.value), ...change }
    this.props.onChange(`${letter}${acc}${oct}`)
  }

  render = () => {
    const { disabled, value } = this.props
    const { acc, letter } = note(value)
    return (
      <div>
        <NotesSelect
          disabled={disabled}
          value={letter}
          onChange={e => this.changeNote({ letter: e.target.value })}
        >
          {notes.map((note, index) => (
            <option value={note} key={note}>
              {toItalian(note)}
            </option>
          ))}
        </NotesSelect>
        <CheckableOption
          disabled={disabled}
          onClick={() => this.changeNote({ acc: acc === '#' ? '' : '#' })}
          selected={acc === '#'}
        >
          &#9839;
        </CheckableOption>
        <CheckableOption
          disabled={disabled}
          onClick={() => this.changeNote({ acc: acc === 'b' ? '' : 'b' })}
          selected={acc === 'b'}
        >
          &#9837;
        </CheckableOption>
      </div>
    )
  }
}

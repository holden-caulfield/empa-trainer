import React, { Component } from 'react'
import { altToAccidental, toItalian } from 'lib/music'
import { Flow as VF } from 'vexflow'
import { pc, oct, alt } from 'tonal-note'

const staveNoteFor = note => {
  const StaveNote = new VF.StaveNote({
    clef: 'treble',
    keys: [`${pc(note)}/${oct(note)}`],
    duration: 'w'
  }).addModifier(0, new VF.Annotation(toItalian(note)))

  if (alt(note) !== 0) {
    StaveNote.addAccidental(0, new VF.Accidental(altToAccidental(alt(note))))
  }
  return StaveNote
}

export default class Notes extends Component {
  drawNote = () => {
    const context = this.renderer.getContext()

    this.group && context.svg.removeChild(this.group)

    this.group = context.openGroup()

    const notes = this.props.notes.map(staveNoteFor)

    VF.Formatter.FormatAndDraw(context, this.stave, notes)

    context.closeGroup()
  }

  componentDidMount() {
    // Create an SVG renderer and attach it to the DIV element named "boo".
    this.renderer = new VF.Renderer(
      this.refs.container,
      VF.Renderer.Backends.SVG
    )

    // Configure the rendering context.
    const context = this.renderer.getContext()
    context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed')

    this.renderer.resize(200, 200)
    this.stave = new VF.Stave(10, 44, 180)

    // Add a clef and time signature.
    this.stave.addClef('treble')

    // Connect it to the rendering context and draw!
    this.stave.setContext(context).draw()
    this.drawNote()
  }

  componentDidUpdate() {
    this.drawNote()
  }

  render = () => <div ref="container" />
}

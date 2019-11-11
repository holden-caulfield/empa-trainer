import React, { Component } from 'react'
import { toItalian } from 'lib/music'
import { Flow as VF } from 'vexflow'
import { note as noteProps } from '@tonaljs/tonal'

const staveNoteFor = note => {
  const { pc, oct, acc } = noteProps(note)
  const StaveNote = new VF.StaveNote({
    clef: 'treble',
    keys: [`${pc}/${oct}`],
    duration: 'w'
  }).addModifier(0, new VF.Annotation(toItalian(note)))

  if (acc !== '') {
    StaveNote.addAccidental(0, new VF.Accidental(acc))
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

    this.renderer.resize(200, 200)

    // Configure the rendering context.
    const context = this.renderer.getContext()
    context.setFont('Arial', 10, '').setBackgroundFillStyle('#eed')

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

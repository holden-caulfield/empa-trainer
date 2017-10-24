import chroma from 'chroma-js'

const getColor = (props, color) => props.theme.colors[color]

export const soft = color => chroma(color).luminance(0.8)

export const themeColor = (colorProp, defaultColor) => props =>
  getColor(props, props[colorProp]) || getColor(props, defaultColor)

export const themeColorIf = (predicate, colorIfTrue, colorIfFalse) => props =>
  getColor(props, predicate(props) ? colorIfTrue : colorIfFalse)

export const themeColorIfProp = (
  propName,
  colorIfTrue,
  colorIfFalse
) => props => themeColorIf(props => props[propName], colorIfTrue, colorIfFalse)

import styled from 'styled-components'
import chroma from 'chroma-js'

const makeBackground = ({ selected, color }) =>
  selected ? color : chroma(color).luminance(0.7)

const mainColor = ({ selected, color }) => (selected ? 'white' : color)

const makeBox = ({ color }) => `0px 0px 5px ${color}`

const Button = styled.button.attrs({
  color: props => props.color || 'green'
})`
  border: 1px solid;
  border-radius: 5px;
  padding: 15px;
  width: 90%;
  font-size: 18px;
  background-color: ${makeBackground};
  border-color: ${props => props.color};
  color: ${mainColor};
  &:hover {
    box-shadow: ${makeBox};
  }
  &:focus {
    outline: none;
  }
`

export const PickerButton = Button.extend`
  width: 70px;
  height: 70px;
  margin: 5px;
  font-size: 15px;
`

export default Button

import styled from 'styled-components'
import chroma from 'chroma-js'

const makeBackground = props => chroma(props.color).luminance(0.7)

const propsColor = props => props.color

export default styled.button.attrs({
  color: props => props.color || 'green'
})`
  border: 1px solid;
  border-radius: 5px;
  padding: 2vw;
  font-size: 3vw;
  background-color: ${makeBackground};
  border-color: ${propsColor};
  color: ${propsColor};
  &:hover {
    background-color: ${propsColor};
    color: white;
  }
`

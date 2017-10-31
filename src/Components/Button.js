import styled, { css } from 'styled-components'
import { soft, themeColor, themeColorIfProp } from 'lib/colors'
import React from 'react'

const makeBox = ({ color }) => `0px 0px 5px ${color}`

const BaseButton = styled.button.attrs({
  color: themeColor('color', 'accent')
})`
  border: 0;
  font-family: 'Work Sans';
  background-color: ${props => props.color};
  color: ${themeColor('textColor', 'light')};
  opacity: ${props => (props.disabled ? 0.3 : 1)};
  &:hover {
    box-shadow: ${makeBox};
  }
  &:disabled {
    box-shadow: none !important;
  }
  &:focus {
    outline: none;
  }
`

const Button = BaseButton.extend`
  border-radius: 100px;
  height: 60px;
  width: auto;
  flex-grow: 1;
  max-width: 300px;
  font-size: 20px;
  font-weight: 600;
  @media (max-width: 720px) {
    height: 40px;
    font-size: 16px;
  }
`
export default Button

const LightButton = Button.extend`
  font-weight: 300;
  border-width: 1px;
  border-style: solid;
  border-color: ${themeColor('textColor', 'light')};
`

export const SecondaryButton = props => (
  <LightButton color="light" textColor="fade" {...props} />
)

const withCheckable = css`
  background-color: ${({ selected, color }) =>
    selected ? color : soft(color)};
  color: ${themeColorIfProp('selected', 'light', 'disabled')};
`

export const CheckableButton = Button.extend`${withCheckable};`

export const PickerButton = BaseButton.extend`
  ${withCheckable};
  width: 70px;
  height: 70px;
  border-radius: 15px;
  font-size: 24px;
  margin: 10px 10px 0 0;
  font-weight: 300;
`
export const ButtonBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
  margin-top: 20px;
  flex-grow: 1;
  button {
    margin: 0 10px;
  }
  button:first-child {
    margin-left: 0;
  }
  button:last-child {
    margin-right: 0;
  }
`

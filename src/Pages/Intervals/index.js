import React, { Component } from 'react'
import Config from './Config'
import Test from './Test'
import IntervalsProgress from './Progress'
import TestRouter from 'Components/TestRouter'

export default () => (
  <TestRouter path="/intervals" config={Config} test={Test} />
)

export class Info extends Component {
  render = () => <IntervalsProgress />
}

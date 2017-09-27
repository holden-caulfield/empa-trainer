import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Config from './Config'
import Test from './Test'
import IntervalsProgress from './Progress'

export default class Intervals extends Component {
  render = () => (
    <Switch>
      <Route path="/intervals/test" component={Test} />
      <Route path="/intervals" component={Config} />
    </Switch>
  )
}

export class Info extends Component {
  render = () => <IntervalsProgress />
}

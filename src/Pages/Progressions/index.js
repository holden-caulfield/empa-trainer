import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Config from './Config'
import Test from './Test'

export default class Intervals extends Component {
  render = () => (
    <Switch>
      <Route path="/progressions/test" component={Test} />
      <Route path="/progressions" component={Config} />
    </Switch>
  )
}

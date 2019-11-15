import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Config from './Config'
import Test from './Test'

const Progressions = () => (
  <Switch>
    <Route path="/progressions/test" component={Test} />
    <Route path="/progressions" component={Config} />
  </Switch>
)

export default Progressions

import React from 'react'
import { Route, Switch } from 'react-router-dom'

export default props => (
  <Switch>
    <Route path={props.path + '/test'} component={props.test} />
    <Route path={props.path} component={props.config} />
  </Switch>
)

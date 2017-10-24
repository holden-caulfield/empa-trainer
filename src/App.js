import React, { Component } from 'react'
import Pages from 'Pages'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import MainLayout from 'Layouts/MainLayout'

const renderPage = page => () => {
  const { component, props } = page
  return <MainLayout mainContent={component} {...props} />
}

export default class App extends Component {
  render = () => {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          {Pages.map(page => (
            <Route
              key={page.name}
              path={page.route}
              render={renderPage(page)}
            />
          ))}
          <Route
            key="root"
            exact
            path="/"
            render={() => <Redirect to={Pages[0].route} />}
          />
        </Switch>
      </Router>
    )
  }
}

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router'
import Manage from './manage';
const RedirectWithStatus = ({ from, to, status }) => (
  <Route render={({ staticContext }) => {
    // there is no `staticContext` on the client, so
    // we need to guard against that here
    if (staticContext) {
      staticContext.status = status
    }
    return <Redirect from={from} to={to} />
  }} />
)
class App extends Component {
  componentDidMount() {

  }
  render() {
    return (
        <Switch>
          {/* some other routes */}
          <RedirectWithStatus
            status={301}
            from="/users"
            to="/profiles"
          />
          <RedirectWithStatus
            status={302}
            from="/courses"
            to="/dashboard"
          />
          <Route exact path="/test" component={Manage} />
          {/* <Route path="/manage/add" component={Add} /> */}

        </Switch>
        // <Manage />
      
    );
  }
}

export default App;








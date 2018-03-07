import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router'
import Manage from './containers/manage';
import Index from './components/index/App';
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
          {/* <RedirectWithStatus
            status={301}
            from="/users"
            to="/profiles"
          />
          <RedirectWithStatus
            status={302}
            from="/courses"
            to="/dashboard"
          /> */}
          {/* <Route  path="/manage1" component={Manage} /> */}
          <Route exact path="/" component={Index} />
          <Route exact path="/manage" component={Manage} />
          <RedirectWithStatus status={301} from="/index" to="/"/>

        </Switch>
      
    );
  }
}

export default App;








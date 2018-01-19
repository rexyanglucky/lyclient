import React, { Component } from 'react';
// import { Router, Route, Switch } from 'react-router'
import {
  BrowserRouter as Router,
  Route,
  // Link
  Switch
} from 'react-router-dom'
import Bundle from '@/components/common/bundle';

import Manage from './manage';
import loadAdd from 'bundle-loader?lazy&name=manage/[name]!./add';
const Add = (props) => (
  <Bundle load={loadAdd}>
    {(Add) => <Add {...props} />}
  </Bundle>
)

class App extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div>
      <Router>
        <Switch>
        <Route exact path="/manage" component={Manage} />
        <Route path="/manage/add" component={Add} />
        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;

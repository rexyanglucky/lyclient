import React, { Component } from 'react';
// import { Router, Route, Switch } from 'react-router'
import {
  BrowserRouter as Router,
  Route,
  // Link
  // Switch
} from 'react-router-dom'
import Index from './index';
import About from './about';
import Add from './add';
import Manage from './manage';
import Article from './article';
import '../css/normalize.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Index} />
          <Route path="/about" component={About} />
          <Route path="/add" component={Add}/>
          <Route path="/manage" component={Manage}/>
          <Route path="/article" component={Article}/>
        </div>
      </Router>
    );
  }
}

export default App;

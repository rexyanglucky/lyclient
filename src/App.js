import React, { Component } from 'react';
// import { Router, Route, Switch } from 'react-router'
import {
  HashRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom'
import Index from './components/index';
import About from './components/about';
import Add from './components/add';
// import Sliderright from './components/slideRight';
import './css/normalize.css';

// import './css/article.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={Index} />
          <Route path="/about" component={About} />
          <Route path="/add" component={Add}/>
        </div>
      </Router>
    );
  }
}

export default App;

import React, { Component } from 'react';
// import { Router, Route, Switch } from 'react-router'
import {
  BrowserRouter as Router,
  Route,
  // Link
  // Switch
} from 'react-router-dom'
import Index from './components/index';
import About from './components/about';
import Add from './components/add';
import Manage from './components/manage';
import Article from './components/article';
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
          <Route path="/manage" component={Manage}/>
          <Route path="/article" component={Article}/>
        </div>
      </Router>
    );
  }
}

export default App;

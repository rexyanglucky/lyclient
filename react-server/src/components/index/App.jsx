import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import Index from './index';
import Article from '@/containers/article';
import '@/css/normalize.css';

class App extends Component {
  componentDidMount() {

  }
  render() {
    return (
      <div>
        <Index/>
      </div>

    );
  }

  // render() {
  //   return (
  //     <div>
  //     <Router>
  //       <Switch>
  //       {/* <Route exact path="" component={Index} /> */}
  //       <Route exact path="/" component={Index} />
  //       <Route path="/index" component={Index} />
  //       <Route path="/index/" component={Index} />
  //       <Route path="/article/:id" component={Article} />
  //       </Switch>
  //     </Router>
  //     </div>
  //   );
  // }
}

export default App;

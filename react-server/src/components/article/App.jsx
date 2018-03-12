import React, { Component } from 'react';
import Article from '@/containers/article';


class App extends Component {
  constructor(props){
    super(props);
    const {match}=props;
    this.match=match;
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <div>
        <Article/>
      </div>
    );
  }
}

export default App;



import React, { Component } from 'react';

import Article from './article';
// import Bundle from '@/components/common/bundle';

import '@/css/normalize.css';

// const About = (props) => (
//   <Bundle load={loadAbout}>
//     {(About) => <About {...props} />}
//   </Bundle>
// )


class App extends Component {
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

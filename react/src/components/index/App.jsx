import React, { Component } from 'react';

import Index from './index';
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
        <Index/>
      </div>

    );
  }
}

export default App;

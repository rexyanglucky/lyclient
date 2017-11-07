import React, { Component } from 'react';
// import logo from './logo.svg';
import ArticleList from './components/articleList';
import Sliderright from './components/slideRight';
// import './App.css';
import './css/normalize.css';
import './css/index.css';
// import './css/article.css';

class App extends Component {
  render() {
    return (
      <div>
        <div className="Content">
          <ArticleList />
          <Sliderright />
        </div>
      </div>
    );
  }
}

export default App;

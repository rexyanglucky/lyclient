import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/components/index/App';
import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import registerServiceWorker from '../../registerServiceWorker';
import '@/lib/util.js';
import '@/css/normalize.css';
import '@/css/header';
import '@/css/index';
import util from '@/lib/util';
import {Article as ArticleReducer} from '@/reducers';
import {getArticleList} from '@/actions/article';
const initialState = window.__INITIAL_STATE__;
// let store=createStore(ArticleReducer,initialState);
// store.dispatch(getArticleList(initialState.articleList));
// const finalState = store.getState();
const store = createStore(
  ArticleReducer,
  initialState,
  applyMiddleware(
    thunkMiddleware // 允许我们 dispatch() 函数
  ),
)
store.getState();
console.log(module.hot);
let render=module.hot?ReactDOM.render:ReactDOM.hydrate;
render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// registerServiceWorker();


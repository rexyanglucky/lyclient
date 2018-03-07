import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/components/index/App';
import { createStore } from 'redux';
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
var store=createStore(ArticleReducer,initialState);
store.dispatch(getArticleList(initialState.articleList));
const finalState = store.getState();
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// registerServiceWorker();


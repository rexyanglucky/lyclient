import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/components/article/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux'
import {Article as ArticleReducer} from '@/reducers';
import {getArticleDetial} from '@/actions/article';
import registerServiceWorker from '../../registerServiceWorker';
import '@/lib/util.js';
import '@/css/normalize.css';
import '@/css/header';
import util from '@/lib/util';
const initialState = window.__INITIAL_STATE__;
var store=createStore(ArticleReducer,initialState);
// store.dispatch(getArticleDetial(initialState.articleInfo));
// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.hydrate(<Provider store={store}><App /></Provider>, document.getElementById('root'));
// registerServiceWorker();


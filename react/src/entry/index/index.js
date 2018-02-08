import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/components/index/App';
import registerServiceWorker from '../../registerServiceWorker';
import '@/lib/util.js';
import '@/css/normalize.css';
import '@/css/header';
import '@/css/index';
import util from '@/lib/util';
ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


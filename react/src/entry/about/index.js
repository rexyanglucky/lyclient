import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/components/about/App';
import registerServiceWorker from '../../registerServiceWorker';
import '@/lib/util.js';
import '@/css/normalize.css';
import '@/css/header';
ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();


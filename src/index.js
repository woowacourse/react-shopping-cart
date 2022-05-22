import React from 'react';
import ReactDOM from 'react-dom/client';

import 'index.css';

import { Provider } from 'react-redux';
import { store } from 'redux/store';

import App from 'App';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('mocks/browser');

  worker.start({
    serviceWorker: {
      url: `/react-shopping-cart/mockServiceWorker.js`,
    },
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

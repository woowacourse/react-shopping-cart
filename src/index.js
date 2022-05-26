import React from 'react';
import ReactDOM from 'react-dom/client';

import 'styles/index.css';
import GlobalStyle from 'styles/GlobalStyle';

import { Provider } from 'react-redux';
import { store } from 'redux/store';

import App from 'App';

if (process.env.NODE_ENV === 'development') {
  if (window.location.pathname === '/react-shopping-cart') {
    window.location.pathname = '/react-shopping-cart/';
  }

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
    <GlobalStyle />
    <App />
  </Provider>
);

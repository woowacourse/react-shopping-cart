import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { store } from 'store/store';

import App from 'App';

import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from 'styles/GlobalStyles';
import Theme from 'styles/Theme';

if (process.env.NODE_ENV === 'development') {
  if (window.location.pathname === '/react-shopping-cart') {
    window.location.pathname = '/react-shopping-cart/';
  }

  const { worker } = require('./mocks/browser');
  worker.start({
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
    onUnhandledRequest(req) {
      if (!req.url.pathname.startsWith('/react-shopping-cart/')) {
        console.warn('Found an unhandled %s request to %s', req.method, req.url.href);
      }
    },
    quiet: true,
  });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ThemeProvider theme={Theme}>
      <Provider store={store}>
        <App />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>,
);

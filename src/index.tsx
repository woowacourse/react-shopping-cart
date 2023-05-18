import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import App from './App';

import { worker } from './mocks/browser';
import GlobalStyle from './styles';
import theme from './styles/theme';

const main = async () => {
  if (window.location.pathname === '/react-shopping-cart') {
    window.location.pathname = '/react-shopping-cart/';
    return;
  }

  await worker.start({
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
  });
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);

main();

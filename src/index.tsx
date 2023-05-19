import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';

import GlobalStyle from './GlobalStyle';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import { worker } from './mocks/browsers';
import { RecoilRoot } from 'recoil';

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
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);

main();

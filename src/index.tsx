import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { worker } from './mocks/worker';
import AppRouter from './router/routes';
import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

(async () => {
  if (window.location.pathname === '/react-shopping-cart') {
    window.location.pathname += '/';
    return;
  }

  await worker.start({
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
  });
})();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <AppRouter />
      </ThemeProvider>
    </RecoilRoot>
  </React.StrictMode>
);

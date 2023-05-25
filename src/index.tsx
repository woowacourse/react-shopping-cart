import React from 'react';
import ReactDOM from 'react-dom/client';
import GlobalStyles from './styles/GlobalStyles';
import App from './App';
import { RecoilRoot } from 'recoil';
import { worker } from './mocks/browser';

const main = async () => {
  const isDevelopmentMode = process.env.NODE_ENV === 'development';
  await worker.start({
    serviceWorker: {
      url: isDevelopmentMode
        ? '/mockServiceWorker.js'
        : '/react-shopping-cart/mockServiceWorker.js',
    },
  });
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RecoilRoot>
      <GlobalStyles />
      <App />
    </RecoilRoot>
  </React.StrictMode>
);

main();

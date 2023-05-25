import React from 'react';
import ReactDOM from 'react-dom/client';

import { RecoilRoot } from 'recoil';

import { App } from './App';

import { worker } from './msw/browser';

(async () => {
  if (process.env.REACT_APP_API_DEFAULT) {
    return;
  }

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
      <App />
    </RecoilRoot>
  </React.StrictMode>
);

import { Global } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import MobileLayout from './components/common/mobileLayout/MobileLayout.tsx';
import reset from './global/reset.ts';
import { worker } from './mocks/browser';

async function enableMocking() {
  await worker.start({
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
    onUnhandledRequest: 'bypass',
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Global styles={reset} />
      <MobileLayout>
        <App />
      </MobileLayout>
    </React.StrictMode>
  );
});

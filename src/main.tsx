import React from 'react';
import ReactDOM from 'react-dom/client';
import Route from './routes';
import { Global } from '@emotion/react';
import globalStyles from './styles/global.styles';
import './index.css';

async function enableMocking() {
  const { worker } = await import('./mocks/browser');
  return worker.start({
    onUnhandledRequest: 'bypass',
    serviceWorker: {
      url: import.meta.env.DEV
        ? '/mockServiceWorker.js'
        : '/react-shopping-products/mockServiceWorker.js',
    },
  });
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <Global styles={globalStyles} />
      <Route />
    </React.StrictMode>
  );
});

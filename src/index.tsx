import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from 'src/mocks/browser';

async function main() {
  const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
  );

  if (process.env.NODE_ENV === 'development') {
    if (window.location.pathname === '/react-shopping-cart') {
      window.location.pathname = '/react-shopping-cart/';
      return;
    }

    await worker.start({
      serviceWorker: {
        url: '/react-shopping-cart/mockServiceWorker.js',
      },
    });
  }

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

main();

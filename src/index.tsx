import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

async function main() {
  if (process.env.NODE_ENV === 'development') {
    if (window.location.pathname === '/react-shopping-cart') {
      window.location.pathname = '/react-shopping-cart/';
      return;
    }

    const { worker } = require('./mocks/browser');

    await worker.start({
      serviceWorker: {
        url: '/react-shopping-cart/mockServiceWorker.js',
      },
    });
  }
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

main();

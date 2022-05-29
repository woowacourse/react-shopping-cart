import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'App';

async function main() {
  if (window.location.pathname === '/react-shopping-cart') {
    window.location.pathname = '/react-shopping-cart/';
    return;
  }

  const { worker } = await import('./mocks/browser');

  await worker.start({
    serviceWorker: {
      url: '/react-shopping-cart/mockServiceWorker.js',
    },
    onUnhandledRequest(req) {
      if (!req.url.pathname.startsWith('/react-shopping-cart/')) {
        return;
      }
    },
  });

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
}

main();

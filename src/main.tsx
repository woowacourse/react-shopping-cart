import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const start = async () => {
  const { worker } = await import('./mocks/browser');
  await worker.start({
    serviceWorker: { url: '/react-shopping-cart/mockServiceWorker.js' },
    onUnhandledRequest: 'bypass',
  });
};

start().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

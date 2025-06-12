import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { setMockDate } from './utils/getCurrentDate.ts';

if (import.meta.env.MODE === 'development') {
  setMockDate(new Date('2025-01-01T04:00:00'));
}

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

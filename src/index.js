import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'index.css';

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
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
}
main();

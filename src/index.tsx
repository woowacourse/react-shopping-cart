import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '../public/assets/cart.svg';
import '../public/assets/logo.svg';
import '../public/assets/arrowUp.svg';
import '../public/assets/arrowDown.svg';

if (process.env.NODE_ENV === 'development') {
  const { worker } = require('./mocks/worker');
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

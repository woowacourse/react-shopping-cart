import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import '../public/assets/cart.svg';
import '../public/assets/logo.svg';
import '../public/assets/delete.svg';
import '../public/assets/baemin-empty.png';

import { worker } from './mocks/worker';
worker.start();

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

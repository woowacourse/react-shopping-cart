import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './route/index.tsx';
import {ErrorProvider} from './provider/errorProvider.tsx';
import {CartItemsProvider} from './provider/cartItemsProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorProvider>
      <CartItemsProvider>
        <Router />
      </CartItemsProvider>
    </ErrorProvider>
  </React.StrictMode>
);

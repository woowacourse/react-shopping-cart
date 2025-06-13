import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { CartItemsProvider } from './components/Common/CartItemsProvider/CartItemsProvider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <CartItemsProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CartItemsProvider>
);

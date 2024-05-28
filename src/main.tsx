import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import CartPage from './pages/CartPage';
import PaymentConfirmPage from './pages/PaymentConfirmPage';
import OrderConfirmPage from './pages/OrderConfirmPage';

import { PATH } from './constants/rule';

import './index.css';

const router = createBrowserRouter(
  [
    {
      path: PATH.CartPage,
      Component: CartPage,
    },
    {
      path: PATH.OrderConfirmPage,
      Component: OrderConfirmPage,
    },
    {
      path: PATH.PaymentConfirmPage,
      Component: PaymentConfirmPage,
    },
  ],
  { basename: import.meta.env.BASE_URL },
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
);

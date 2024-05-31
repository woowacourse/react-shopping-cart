import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CartPage from '@pages/cart/CartPage.tsx';
import PaymentsPage from '@pages/payments/PaymentsPage.tsx';
import NotFoundPage from '@pages/notfound/NotFoundPage.tsx';
import Layout from '@components/common/Layout.tsx';
import CheckoutPage from '@pages/checkout/CheckoutPage.tsx';

import './styles/reset.css';
import './styles/index.css';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <CartPage />,
      },
      {
        path: '/checkout',
        element: <CheckoutPage />,
      },
      {
        path: '/payments',
        element: <PaymentsPage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
);

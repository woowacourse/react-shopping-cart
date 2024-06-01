import React from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CartPage from '@pages/cart/CartPage.tsx';
import PaymentsPage from '@pages/payments/PaymentsPage.tsx';
import ErrorPage from '@pages/ErrorPage/ErrorPage';
import Layout from '@components/common/Layout.tsx';
import CheckoutPage from '@pages/checkout/CheckoutPage.tsx';
import { ToastProvider } from './context/ToastProvider';

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
      { path: '*', element: <ErrorPage errorMessage={'잘못된 경로 입니다.'} /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </RecoilRoot>
  </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import CartPage from './pages/cart/CartPage.tsx';
import PaymentsPage from './pages/payments/PaymentsPage.tsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import NotFoundPage from './pages/notfound/NotFoundPage.tsx';
import './styles/reset.css';
import './styles/index.css';
import { RecoilRoot } from 'recoil';
import Layout from './components/common/Layout.tsx';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <CartPage />,
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

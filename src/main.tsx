import React from 'react';
import ReactDOM from 'react-dom/client';
import Cart from './pages/cart/Cart.tsx';
import Checkout from './pages/checkout/Checkout.tsx';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import './index.css';
import NotFoundPage from './pages/notfound/NotFoundPage.tsx';

const CommonLayout = () => (
  <ErrorBoundary fallback={<div>에러</div>}>
    <Suspense fallback={<div>로딩중!</div>}>
      <Outlet />
    </Suspense>
  </ErrorBoundary>
);

const router = createBrowserRouter([
  {
    element: <CommonLayout />,
    children: [
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/checkout',
        element: <Checkout />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

import React from 'react';
import ReactDOM from 'react-dom/client';
import CartPage from './pages/cart/CartPage.tsx';
import CheckoutPage from './pages/checkout/CheckoutPage.tsx';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import NotFoundPage from './pages/notfound/NotFoundPage.tsx';
import './styles/reset.css';
import './styles/index.css';
import { RecoilRoot } from 'recoil';

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
        element: <CartPage />,
      },
      {
        path: '/checkout',
        element: <CheckoutPage />,
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

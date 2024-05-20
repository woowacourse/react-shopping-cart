import React from 'react';
import ReactDOM from 'react-dom/client';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import NotFoundPage from './pages/notfound/NotFoundPage';
import './styles/reset.css';
import './styles/index.css';
import { RecoilRoot } from 'recoil';
import ROUTES from './constants/routes';

const CommonLayout = () => (
  <ErrorBoundary fallback={<div>에러</div>}>
    <Suspense fallback={<div>로딩중!</div>}>
      <Outlet />
    </Suspense>
  </ErrorBoundary>
);

const routes = [
  {
    element: <CommonLayout />,
    children: [
      {
        path: ROUTES.CART,
        element: <CartPage />,
      },
      {
        path: ROUTES.CHECK_OUT,
        element: <CheckoutPage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: ROUTES.CART,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
);

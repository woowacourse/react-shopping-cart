import ReactDOM from 'react-dom/client';
import CartPage from './pages/cart/CartPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import React, { Suspense } from 'react';
import NotFoundPage from './pages/notfound/NotFoundPage';
import './styles/reset.css';
import './styles/index.css';
import { RecoilRoot } from 'recoil';
import { PAGE_ROUTES } from './constants/routes';
import OrderConfirmPage from './pages/orderConfirm/OrderConfirmPage';

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
        path: PAGE_ROUTES.CART,
        element: <CartPage />,
      },
      {
        path: PAGE_ROUTES.ORDER_CONFIRM,
        element: <OrderConfirmPage />,
      },
      {
        path: PAGE_ROUTES.CHECK_OUT,
        element: <CheckoutPage />,
      },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

const router = createBrowserRouter(routes, {
  basename: PAGE_ROUTES.CART,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
);

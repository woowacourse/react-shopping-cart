import './App.css';
import './reset.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ENDPOINTS from './constants/endpoints';
import ErrorBoundary from './components/page/ErrorBoundary';
import OrderConfirmationPage from './components/page/OrderConfirmationPage/OrderConfirmationPage';
import PaymentPage from './components/page/PaymentPage/PaymentPage';
import ShoppingCartPage from './components/page/ShoppingCartPage/ShoppingCartPage';
import { Suspense } from 'react';

const router = createBrowserRouter([
  {
    path: ENDPOINTS.shoppingCart,
    element: <ShoppingCartPage />,
  },
  {
    path: ENDPOINTS.orderConfirmation,
    element: (
      <ErrorBoundary>
        <Suspense>
          <OrderConfirmationPage />,
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: ENDPOINTS.paymentPage,
    element: (
      <ErrorBoundary>
        <Suspense>
          <PaymentPage />
        </Suspense>
      </ErrorBoundary>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

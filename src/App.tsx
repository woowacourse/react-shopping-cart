import './App.css';
import './reset.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ENDPOINTS from './constants/endpoints';
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
      <Suspense>
        <OrderConfirmationPage />
      </Suspense>
    ),
  },
  {
    path: ENDPOINTS.paymentPage,
    element: (
      <Suspense>
        <PaymentPage />
      </Suspense>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

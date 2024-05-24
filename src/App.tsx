import './App.css';
import './reset.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ENDPOINTS from './constants/endpoints';
import OrderConfirmationPage from './page/OrderConfirmationPage/OrderConfirmationPage';
import OrderLastPage from './page/OrderLastPage/OrderLastPage';
import ShoppingCartPage from './page/ShoppingCartPage/ShoppingCartPage';
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
    path: ENDPOINTS.lastPage,
    element: (
      <Suspense>
        <OrderLastPage />
      </Suspense>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

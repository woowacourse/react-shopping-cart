import './App.css';
import './reset.css';

import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ConfirmOrderPage from './page/ConfirmOrderPage/ConfirmOrderPage';
import ENDPOINTS from './constants/endpoints';
import ShoppingCartPage from './page/ShoppingCartPage';
import { Suspense } from 'react';

const router = createBrowserRouter([
  {
    path: ENDPOINTS.shoppingCart,
    element: <ShoppingCartPage />,
  },
  {
    path: ENDPOINTS.confirmOrder,
    element: (
      <Suspense>
        <ConfirmOrderPage />
      </Suspense>
    ),
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

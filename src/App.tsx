import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ShoppingCartPage, ConfirmOrderPage } from './page';

import { ENDPOINTS } from './constants';
import './App.css';
import './reset.css';

const router = createBrowserRouter([
  {
    path: ENDPOINTS.shoppingCart,
    element: <ShoppingCartPage />,
  },
  {
    path: ENDPOINTS.confirmOrder,
    element: <ConfirmOrderPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

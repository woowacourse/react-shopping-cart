import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ShoppingCartPage from './page/ShoppingCartPage';
import ConfirmOrderPage from './page/ConfirmOrderPage';

import './App.css';
import './reset.css';
import ENDPOINTS from './constants/endpoints';

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

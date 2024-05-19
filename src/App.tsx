import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ShoppingCartPage, ConfirmOrderPage } from './page';

import { ENDPOINT } from './constants';
import './App.css';
import './reset.css';

const router = createBrowserRouter([
  {
    path: ENDPOINT.shoppingCart,
    element: <ShoppingCartPage />,
  },
  {
    path: ENDPOINT.confirmOrder,
    element: <ConfirmOrderPage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

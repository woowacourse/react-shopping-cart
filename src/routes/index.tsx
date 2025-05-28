import { createBrowserRouter, RouterProvider } from 'react-router';

import App from '../App';
import OrderCheck from './pages/OrderCheck';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/order-check',
    element: <OrderCheck />,
  },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}

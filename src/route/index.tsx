import {ROUTE_PATHS} from './path';
import {createBrowserRouter, RouterProvider} from 'react-router';
import NavBar from '../components/layout/NavBar';
import CartList from '../pages/CartList';
import PaymentConfirm from '../pages/PaymentConfirm';
import OrderConfirm from '../pages/OrderConfirm';

const router = createBrowserRouter(
  [
    {
      element: <NavBar />,
      children: [
        {
          path: ROUTE_PATHS.MAIN,
          element: <CartList />,
        },
        {
          path: ROUTE_PATHS.PAYMENT_CONFIRM,
          element: <PaymentConfirm />,
        },
        {
          path: ROUTE_PATHS.ORDER_CONFIRM,
          element: <OrderConfirm />,
        },
      ],
    },
  ],
  {
    basename: '/react-shopping-cart/',
  }
);
export default function Router() {
  return <RouterProvider router={router} />;
}

import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from '../App';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <CartPage />,
      },
      {
        path: '/checkout',
        element: <CheckoutPage />,
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;

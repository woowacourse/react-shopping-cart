import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from '../App';
import { PATH } from '../constants/path';
import CartPage from '../pages/CartPage/CartPage';
import ProductListPage from '../pages/ProductListPage';

const router = createBrowserRouter(
  [
    {
      path: PATH.ROOT,
      element: <App />,
      children: [
        {
          path: '',
          element: <ProductListPage />,
        },
        {
          path: PATH.CARTS,
          element: <CartPage />,
        },
      ],
    },
  ],
  {
    basename: process.env.PUBLIC_URL,
  }
);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;

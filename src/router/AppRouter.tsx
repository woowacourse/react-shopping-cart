import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import CartListPage from '../pages/CartListPage';
import ProductListPage from '../pages/ProductListPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <ProductListPage />,
    },
    {
      path: '/cartlist',
      element: <CartListPage />,
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

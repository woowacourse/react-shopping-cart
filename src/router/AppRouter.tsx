import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ProductListPage from '../pages/ProductListPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <ProductListPage />,
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

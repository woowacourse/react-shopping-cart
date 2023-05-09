import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import ProductListPage from '../pages/ProductListPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductListPage />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;

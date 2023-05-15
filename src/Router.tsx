import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProductPage from './pages/ProductPage/ProductPage';
import { Layout } from './components/common/Layout/Layout';
import ErrorPage from './pages/ErrorPage/ErrorPage';
import ProductPageError from './pages/ProductPage/ProductPageError';
import { PAGE_ROUTES } from './constants/routes';

const router = createBrowserRouter([
  {
    path: PAGE_ROUTES.HOME,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <ProductPage />,
        errorElement: <ProductPageError />,
      },
    ],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;

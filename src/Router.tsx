import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import ProductPage from './pages/ProductPage/ProductPage';
import { Layout } from './components/common/Layout';
import ProductPageError from './pages/ProductPage/ProductPageError';
import { PAGE_ROUTES } from './constants/routes';
import Page404 from './pages/ErrorPage/Page404';

const router = createBrowserRouter([
  {
    path: PAGE_ROUTES.HOME,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductPage />,
        errorElement: <ProductPageError />,
      },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;

import { createBrowserRouter } from 'react-router-dom';
import { CartListPage, Error, NotFound, ProductListPage } from './components';
import { PATH } from './constants/path';
import Root from './components/pages/Root';

export const router = createBrowserRouter([
  {
    path: PATH.PRODUCT_LIST,
    element: <Root />,
    children: [
      { path: '', element: <ProductListPage />, errorElement: <Error /> },
      { path: PATH.CART_LIST, element: <CartListPage /> },
    ],
    errorElement: <NotFound />,
  },
]);

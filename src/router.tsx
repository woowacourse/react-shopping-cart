import { createBrowserRouter } from 'react-router-dom';
import { CartListPage, ProductListPage } from './components';
import { PATH } from './constants/path';
import Root from './components/pages/Root';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { path: '', element: <ProductListPage /> },
      { path: 'cart', element: <CartListPage /> },
    ],
  },
]);

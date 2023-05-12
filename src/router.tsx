import { createBrowserRouter } from 'react-router-dom';
import ProductListPage from './components/pages/ProductListPage';
import { PATH } from './constants/path';

export const router = createBrowserRouter([
  {
    path: PATH.PRODUCT_LIST,
    element: <ProductListPage />,
  },
]);

import { createBrowserRouter } from 'react-router-dom';
import ProductListPage from './components/pages/ProductListPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <ProductListPage />,
  },
]);

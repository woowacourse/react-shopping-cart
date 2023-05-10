import ProductListPage from '@Pages/ProductListPage';
import App from './App';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: 'product-list',
          element: <ProductListPage />,
        },
      ],
    },
  ],
  {
    basename: '/',
  },
);

export default router;

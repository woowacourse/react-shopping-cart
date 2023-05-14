import { createBrowserRouter } from 'react-router-dom';
import ProductList from 'pages/ProductList';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <ProductList />,
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;

import { createBrowserRouter } from 'react-router-dom';
import ProductListPage from 'pages/ProductListPage';
import ROUTE_PATH from 'constants/routePath';
import Layout from 'components/Layout/Layout';

const router = createBrowserRouter([
  {
    path: ROUTE_PATH.root,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <ProductListPage />,
      },
      {
        path: ROUTE_PATH.cart,
        element: <div>cart</div>,
      },
    ],
  },
]);

export default router;

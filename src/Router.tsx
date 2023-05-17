import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import ProductListPage from './pages/ProductListPage';
import CartPage from './pages/CartPage';

export default function Router() {
  const router = createBrowserRouter(
    [
      {
        path: '/',
        element: <App />,
        children: [
          {
            path: '/',
            element: <ProductListPage />,
          },
          {
            path: '/cart',
            element: <CartPage />,
          },
        ],
      },
    ],
    {}
  );

  return <RouterProvider router={router} />;
}

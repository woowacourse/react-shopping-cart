import { createBrowserRouter } from 'react-router-dom';

import App from './components/App/App';
import ProductsPage from './components/pages/ProductsPage/ProductsPage';
import ErrorPage from './components/pages/ErrorPage/ErrorPage';
import CartPage from './components/pages/CartPage/CartPage';
import Routes from './constants/Routes';

const router = createBrowserRouter(
  [
    {
      path: Routes.ENTRY,
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { path: Routes.PRODUCTS, element: <ProductsPage /> },
        { path: Routes.CART, element: <CartPage /> },
      ],
    },
  ],
  {
    basename: Routes.BASENAME,
  }
);

export default router;

import { createBrowserRouter } from 'react-router-dom';

import App from './components/App/App';
import ProductsPage from './components/pages/ProductsPage/ProductsPage';
import ErrorPage from './components/pages/ErrorPage/ErrorPage';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
      children: [{ path: '', element: <ProductsPage /> }],
    },
  ],
  {
    basename: '/react-shopping-cart',
  }
);

export default router;

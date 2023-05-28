import { createBrowserRouter } from 'react-router-dom';
import { CartList } from './pages/CartList';
import { ProductList } from './pages/ProductList';
import { NotFound } from './pages/NotFound';
import { RootPage } from './pages/RootPage';

const routes = [
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        path: '',
        element: <ProductList />,
      },
      {
        path: '/cart-list',
        element: <CartList />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export default createBrowserRouter(routes, {
  basename: process.env.PUBLIC_URL,
});

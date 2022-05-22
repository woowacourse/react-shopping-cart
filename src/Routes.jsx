import { Suspense, lazy } from 'react';
import DefaultLayout from './layouts/DefaultLayout';
import CartPageLayout from './layouts/CartPageLayout';

const Loadable = (Component) => (props) =>
  (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );

const Home = Loadable(lazy(() => import('./pages/Home')));
const ProductListPage = Loadable(lazy(() => import('./pages/ProductListPage')));
const ProductDetailPage = Loadable(lazy(() => import('./pages/ProductDetailPage')));
const CartPage = Loadable(lazy(() => import('./pages/CartPage')));
const NotFoundPage = Loadable(lazy(() => import('./pages/NotFoundPage')));

const routes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            element: <ProductListPage />,
          },
          {
            path: ':id',
            element: <ProductDetailPage />,
          },
        ],
      },
      {
        path: 'cart',
        element: <CartPageLayout />,
        children: [
          {
            path: '',
            element: <CartPage />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export default routes;

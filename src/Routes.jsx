import { Suspense, lazy } from 'react';

const Loadable = (Component) => (props) =>
  (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );

const ProductListPage = Loadable(lazy(() => import('./pages/ProductListPage')));
const ProductDetailPage = Loadable(lazy(() => import('./pages/ProductDetailPage')));

const routes = [
  {
    path: '/',
    element: <ProductListPage />,
  },
  {
    path: '/product-detail-page',
    element: <ProductDetailPage />,
  },
];

export default routes;

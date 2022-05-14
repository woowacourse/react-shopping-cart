import { Suspense, lazy } from 'react';
import Loading from '../components/Loading';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );

const ProductListPage = Loadable(lazy(() => import('../pages/ProductListPage')));
const ProductDetailPage = Loadable(lazy(() => import('../pages/ProductDetailPage')));

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

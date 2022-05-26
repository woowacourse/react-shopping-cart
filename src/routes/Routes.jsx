import { Suspense, lazy } from 'react';
import { ROUTES_PATH } from '../constants';
import Loading from '../components/Loading';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );

const ProductListPage = Loadable(lazy(() => import('../pages/ProductListPage')));
const ProductDetailPage = Loadable(lazy(() => import('../pages/ProductDetailPage')));
const ShoppingCart = Loadable(lazy(() => import('../pages/ShoppingCart')));

const routes = [
  {
    path: ROUTES_PATH.HOME,
    element: <ProductListPage />,
  },
  {
    path: ROUTES_PATH.DETAIL,
    element: <ProductDetailPage />,
  },
  {
    path: ROUTES_PATH.CART,
    element: <ShoppingCart />,
  },
];

export default routes;

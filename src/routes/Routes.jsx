import { Suspense, lazy } from 'react';
import { PATH } from '../constant';
import Loading from '../components/Loading';

const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<Loading />}>
      <Component {...props} />
    </Suspense>
  );

const ProductListPage = Loadable(lazy(() => import('../pages/ProductListPage')));
const ProductDetailPage = Loadable(lazy(() => import('../pages/ProductDetailPage')));
const ShoppingBasket = Loadable(lazy(() => import('../pages/ShoppingBasket')));

const routes = [
  {
    path: PATH.HOME,
    element: <ProductListPage />,
  },
  {
    path: PATH.DETAIL,
    element: <ProductDetailPage />,
  },
  {
    path: PATH.BASKET,
    element: <ShoppingBasket />,
  },
];

export default routes;

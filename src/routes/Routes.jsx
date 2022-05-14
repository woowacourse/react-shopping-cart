import { Suspense, lazy } from 'react';
import Loading from '../components/Loading';
import { PATH } from '../constant';

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
    path: PATH.HOME,
    element: <ProductListPage />,
  },
  {
    path: PATH.DETAIL,
    element: <ProductDetailPage />,
  },
];

export default routes;

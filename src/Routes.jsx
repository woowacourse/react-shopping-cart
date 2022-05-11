import { Suspense, lazy } from 'react';

const Loadable = (Component) => (props) =>
  (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );

const ProductListPage = Loadable(lazy(() => import('./pages/ProductListPage')));

const routes = [
  {
    path: '/',
    element: <ProductListPage />,
  },
];

export default routes;

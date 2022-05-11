import { Suspense, lazy } from 'react';

const Loadable = (Component) => (props) =>
  (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );

const CardAddPage = Loadable(lazy(() => import('./pages/ProductListPage')));

const routes = [
  {
    path: '/',
    element: <CardAddPage />,
  },
];

export default routes;

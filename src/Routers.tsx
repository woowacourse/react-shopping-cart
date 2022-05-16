import { Route, Routes, Navigate } from 'react-router-dom';
import ItemDetail from 'pages/ItemDetail';
import NotFound from 'pages/NotFound';
import Main from 'pages/Main';
import Cart from 'pages/Cart';
import { ReactElement } from 'react';

export const PATH = {
  home: '/',
  main: '/main/:id',
  getMain(id: number) {
    return `/main/${id}`;
  },
  itemDetail: '/item_detail/:id',
  getItemDetail(id: number) {
    return `/item_detail/${id}`;
  },
  cart: '/cart',
  notFound: '/*',
} as const;

type PathName = keyof Omit<typeof PATH, 'getMain' | 'getItemDetail'>;
type Path = typeof PATH[PathName];

interface RoutesType {
  path: Path;
  element: ReactElement;
}

const ROUTES: RoutesType[] = [
  { path: PATH.home, element: <Navigate replace to='/main/1' /> },
  { path: PATH.main, element: <Main /> },
  { path: PATH.itemDetail, element: <ItemDetail /> },
  { path: PATH.cart, element: <Cart /> },
  { path: PATH.notFound, element: <NotFound /> },
];

const Routers = () => {
  return (
    <Routes>
      {ROUTES.map(route => (
        <Route key={route.path} {...route} />
      ))}
    </Routes>
  );
};

export default Routers;

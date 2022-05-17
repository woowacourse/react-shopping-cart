import Cart from 'pages/Cart';
import ItemDetail from 'pages/ItemDetail';
import Main from 'pages/ItemList';
import NotFound from 'pages/NotFound';
import { ReactElement } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

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

import { Route, Routes, Navigate } from 'react-router-dom';
import ItemDetail from 'pages/ItemDetailPage';
import NotFound from 'pages/NotFoundPage';
import ItemListPage from 'pages/ItemListPage';
import CartPage from 'pages/CartPage';

const PATH = {
  notFound: '*',
  main: '/main/:id',
  itemDetail: '/item_detail/:id',
  cart: '/cart',
};

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to='/main/1' />} />
      <Route path={PATH.main} element={<ItemListPage />} />
      <Route path={PATH.itemDetail} element={<ItemDetail />} />
      <Route path={PATH.cart} element={<CartPage />} />
      <Route path={PATH.notFound} element={<NotFound />} />
    </Routes>
  );
};

export default Router;

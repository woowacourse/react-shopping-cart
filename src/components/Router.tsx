import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Header from './common/header/Header';
import { RoutePath } from '../constants';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={RoutePath.HomePage} element={<ProductPage />} />
        <Route path={RoutePath.CartPage} element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

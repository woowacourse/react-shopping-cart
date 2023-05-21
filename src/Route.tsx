import { Route, Routes } from 'react-router-dom';
import CartPage from './components/CartPage';
import ErrorPage from './components/ErrorPage';
import ProductList from './components/ProductList';

const Router = () => {
  return (
    <Routes>
      <Route path="/products" element={<ProductList />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;

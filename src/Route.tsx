import { Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ErrorPage from './components/ErrorPage';

const Router = () => {
  return (
    <Routes>
      <Route path="/products" element={<ProductList />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default Router;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ShoppingPage from './pages/ShoppingPage';
import CartPage from './pages/CartPage';
import Header from './common/header/Header';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ShoppingPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

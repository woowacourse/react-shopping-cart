import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from 'src/pages/ProductList';

const CartRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default CartRouter;

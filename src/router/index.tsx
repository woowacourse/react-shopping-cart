import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from 'src/pages/ProductList';

const CartRouter = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  );
};

export default CartRouter;

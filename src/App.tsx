import { RecoilRoot } from 'recoil';
import { Header } from './layouts/Header';
import { ProductList } from './pages/ProductList';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { NotFound } from './pages/NotFound';
import { CartList } from './pages/CartList';

export const App = () => {
  return (
    <RecoilRoot>
      <Router basename={process.env.PUBLIC_URL}>
        <Header />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/cart-list" element={<CartList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </RecoilRoot>
  );
};

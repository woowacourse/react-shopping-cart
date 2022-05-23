import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadProducts } from 'store/products/action';
import { loadCarts } from 'store/carts/action';
import GlobalStyle from 'GlobalStyle';
import ProductListPage from 'components/Main/ProductListPage';
import Header from 'components/Header/Header';
import CartPage from 'components/CartPage/CartPage';
import OrderList from 'components/OrderList/OrderList';
import NotFound from 'components/NotFound/NotFound';
import { PATH } from 'constants';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadCarts());
  }, []);

  return (
    <div className="App">
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path={`${PATH.ROOT}`} element={<ProductListPage />} />
          <Route path={`${PATH.ORDERLIST}`} element={<OrderList />} />
          <Route path={`${PATH.CARTS}`} element={<CartPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

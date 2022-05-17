import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadProducts } from 'store/products';
import { loadCarts } from 'store/carts';
import GlobalStyle from 'GlobalStyle';
import ProductListContainer from 'components/Main/ProductListContainer';
import Header from 'components/Header/Header';
import Cart from 'components/Cart/Cart';
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
          <Route path={`${PATH.ROOT}`} element={<ProductListContainer />} />
          <Route path={`${PATH.ORDERLIST}`} element={<OrderList />} />
          <Route path={`${PATH.CARTS}`} element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

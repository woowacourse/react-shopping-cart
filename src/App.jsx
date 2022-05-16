import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { loadProducts } from './store/products';
import { loadCarts } from './store/carts';

import ProductListContainer from './components/Main/ProductListContainer';
import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';
import NotFound from './components/NotFound/NotFound';
import Orders from './components/Orders/Orders';

import GlobalStyle from './GlobalStyle';

import { PATH } from './constants';

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
          <Route path={`${PATH.ORDERS}`} element={<Orders />} />
          <Route path={`${PATH.CARTS}`} element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

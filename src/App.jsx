import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import Main from './pages/Main';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import Carts from './pages/Carts';
import ProductDetailContainer from './components/ProductDetail/ProductDetailContainer';

import GlobalStyle from './GlobalStyle';

import PATH from './constants/path';
import { loadProducts } from './store/products';
import useUser from './hooks/useUser';
import { loadCarts } from './store/carts';

function App() {
  const dispatch = useDispatch();
  const { userId, isLoggedIn } = useUser();

  useEffect(() => {
    dispatch(loadProducts(userId));
    if (isLoggedIn) {
      dispatch(loadCarts(userId));
    }
  }, [userId]);

  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path={`${PATH.ROOT}`} element={<Main />} />
          <Route path={`${PATH.ORDERS}`} element={<Orders />} />
          <Route path={`${PATH.CARTS}`} element={<Carts />} />
          <Route
            path={`${PATH.PRODUCT}/:id`}
            element={<ProductDetailContainer />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

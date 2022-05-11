import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadCarts, loadProducts } from './store/actions';
import GlobalStyle from './GlobalStyle';
import ProductListContainer from './components/Main/ProductListContainer';
import Header from './components/Header/Header';
import Cart from './components/Cart/Cart';
import OrderList from './components/OrderList/OrderList';
import NotFound from './components/NotFound/NotFound';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProducts());
    dispatch(loadCarts());
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path="/" element={<ProductListContainer />} />
          <Route path="/orderlist" element={<OrderList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

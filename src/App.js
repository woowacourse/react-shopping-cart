import GlobalStyle from 'GlobalStyle';

import { Provider } from 'react-redux';
import { store } from 'store/store';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from 'component';

import ProductList from 'page/ProductList/ProductList';
import ShoppingCart from 'page/ShoppingCart/ShoppingCart';

function App() {
  return (
    <>
      <GlobalStyle />
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Routes>
            <Route path="react-shopping-cart/ProductList" element={<ProductList />} />
            <Route path="react-shopping-cart/ShoppingCart" element={<ShoppingCart />} />
            <Route path="*" element={<ProductList />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;

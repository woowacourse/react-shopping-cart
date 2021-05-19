import { useEffect, useState } from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import { NavBar, ShoppingCart, Products, OrderPayment } from './components';
import productReducer from './reducers/products';
import { ROUTE } from './constants';
import GlobalStyle from './global.styles';

const reducer = combineReducers({
  product: productReducer,
});

const store = createStore(reducer);

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // TODO: 미들 웨어 적용
    async function fetchProducts() {
      try {
        const response = await axios.get('/api/products');

        setProducts(response.data);
      } catch (error) {
        //TODO: 상품을 못 받아 왔을 때, 안내 화면 띄우기
        console.error(error.message);
      }
    }

    fetchProducts();
  }, []);

  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <NavBar />
        <Route exact path={[ROUTE.HOME, ROUTE.PRODUCTS]}>
          <Products products={products} />
        </Route>
        <Route exact path={ROUTE.CART}>
          <ShoppingCart products={products} />
        </Route>
        <Route exact path={ROUTE.ORDER_PAYMENT}>
          <OrderPayment products={products} />
        </Route>
      </Router>
    </Provider>
  );
}

export default App;

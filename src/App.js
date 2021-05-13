import { useEffect, useState } from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import {
  NavBar,
  ShoppingCart,
  CompletedOrder,
  Products,
  OrderPayment,
} from './components';
import productReducer from './reducers/products';
import { ROUTE } from './constants';
import GlobalStyle from './global.styles';

const reducer = combineReducers({
  product: productReducer,
});

const store = createStore(reducer);

function App() {
  const [products, setProducts] = useState([]);
  const [totalOrders, setTotalOrders] = useState([]);

  //TODO: 비동기 작업 진행중
  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get('/products');

      setProducts(response.data);
    }

    async function fetchTotalOrders() {
      const response = await axios.get('/totalOrders');

      setTotalOrders(response.data);
    }

    fetchProducts();
    fetchTotalOrders();
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
        <Route exact path={ROUTE.COMPLETED_ORDER}>
          <CompletedOrder orders={totalOrders} />
        </Route>
      </Router>
    </Provider>
  );
}

export default App;

import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  NavBar,
  ShoppingCart,
  CompletedOrder,
  Products,
  OrderPayment,
} from './components';
import GlobalStyle from './global.styles';
import { totalOrders } from '../src/mockData';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import productReducer from './reducers/products';
import { ROUTE } from './constants';
import { useEffect, useState } from 'react';
import axios from 'axios';

const reducer = combineReducers({
  product: productReducer,
});

const store = createStore(reducer);

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const response = await axios.get('/products');

      setProducts(response.data);
    }

    fetchProducts();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <GlobalStyle />
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
        </div>
      </Router>
    </Provider>
  );
}

export default App;

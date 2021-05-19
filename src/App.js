import { useEffect, useState } from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';
import {
  NavBar,
  ShoppingCart,
  Products,
  OrderPayment,
  Details,
} from './components';
import productReducer from './reducers/products';
import { FALLBACK, ROUTE } from './constants';
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

  const onImageError = e => (e.target.src = FALLBACK.PRODUCT.IMG_URL);

  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <NavBar />
        <Route
          exact
          path={[ROUTE.HOME, ROUTE.PRODUCTS]}
          render={props => (
            <Products
              products={products}
              onImageError={onImageError}
              {...props}
            />
          )}
        />
        <Route
          exact
          path={ROUTE.CART}
          render={props => <ShoppingCart products={products} {...props} />}
        />
        <Route
          exact
          path={ROUTE.ORDER_PAYMENT}
          render={props => <OrderPayment products={products} {...props} />}
        />
        <Route
          exact
          path={'/product/:product_id'}
          render={props => (
            <Details
              products={products}
              onImageError={onImageError}
              {...props}
            />
          )}
        />
      </Router>
    </Provider>
  );
}

export default App;

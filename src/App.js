import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  NavBar,
  ShoppingCart,
  Products,
  OrderPayment,
  CompletedOrder,
  ProductDetail,
} from './components';
import { ACTION_TYPE, MESSAGE, ROUTE } from './constants';

const App = () => {
  const dispatch = useDispatch();

  const handleCartButtonClick = (event, product) => {
    event.stopPropagation();
    if (!window.confirm(MESSAGE.PRODUCTS.ADD_TO_CART_CONFIRM)) return;

    dispatch({ type: ACTION_TYPE.PRODUCTS.ADD_TO_CART, product });
    alert(MESSAGE.PRODUCTS.ADD_TO_CART_ALERT);
  };

  return (
    <Router>
      <NavBar />
      <Route
        exact
        path={[ROUTE.HOME, ROUTE.PRODUCTS]}
        component={() => <Products onCartButtonClick={handleCartButtonClick} />}
      />
      <Route
        exact
        path={ROUTE.PRODUCT_DETAIL}
        component={() => (
          <ProductDetail onCartButtonClick={handleCartButtonClick} />
        )}
      />
      <Route exact path={ROUTE.CART} component={ShoppingCart} />
      <Route exact path={ROUTE.ORDER_PAYMENT} component={OrderPayment} />
      <Route
        exact
        path={ROUTE.COMPLETED_ORDER}
        component={() => (
          <CompletedOrder onCartButtonClick={handleCartButtonClick} />
        )}
      />
    </Router>
  );
};

export default App;

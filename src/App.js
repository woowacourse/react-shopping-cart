import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import GlobalStyles from './GlobalStyles';
import NavBar from './components/NavBar/NavBar';
import { ROUTE } from './constants';
import {
  OrderCheckoutPage,
  OrderDetailPage,
  OrderListPage,
  ProductDetailPage,
  ProductListPage,
  ShoppingCartPage,
} from './pages';
import { getMyShoppingCartAsync } from './redux/slice';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyShoppingCartAsync());
  }, []);

  return (
    <>
      <GlobalStyles />
      <Router>
        <NavBar />

        <Switch>
          <Route exact path={ROUTE.HOME} component={ProductListPage} />
          <Route exact path={ROUTE.ORDER_LIST} component={OrderListPage} />
          <Route exact path={ROUTE.ORDER_CHECKOUT} component={OrderCheckoutPage} />
          <Route exact path={`${ROUTE.ORDER_DETAIL}/:id`} component={OrderDetailPage} />
          <Route exact path={ROUTE.SHOPPING_CART} component={ShoppingCartPage} />
          <Route exact path={`${ROUTE.PRODUCT_DETAIL}/:id`} component={ProductDetailPage} />
          <Route component={() => <Redirect to={ROUTE.HOME} />} />
        </Switch>
      </Router>
    </>
  );
};

export default App;

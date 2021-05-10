import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import GlobalStyles from './GlobalStyles';
import NavBar from './components/NavBar/NavBar';
import { ROUTE, SCHEMA } from './constants';
import { getMyShoppingCartAsync } from './redux/action';
import { OrderCheckoutPage, OrderListPage, ProductListPage, ShoppingCartPage } from './pages';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyShoppingCartAsync(SCHEMA.SHOPPING_CART));
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
          <Route exact path={ROUTE.SHOPPING_CART} component={ShoppingCartPage} />
        </Switch>
      </Router>
    </>
  );
};

export default App;

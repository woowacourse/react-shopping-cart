import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ROUTE } from './constants';
import { getMyShoppingCartAsync, updateProductItemsAsync } from './redux/action';
import { OrderCheckoutPage, OrderListPage, ProductListPage, ShoppingCartPage } from './pages';
import { GlobalNavbar } from './components/templates';
import GlobalStyles from './GlobalStyles';
import { Spinner } from './components';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loadingReducer.loading);

  useEffect(() => {
    dispatch(updateProductItemsAsync());
    dispatch(getMyShoppingCartAsync());
  }, [dispatch]);

  return (
    <>
      <GlobalStyles />
      <Router>
        <GlobalNavbar />

        <Switch>
          <Route exact path={ROUTE.HOME} component={ProductListPage} />
          <Route exact path={ROUTE.ORDER_LIST} component={OrderListPage} />
          <Route exact path={ROUTE.ORDER_CHECKOUT} component={OrderCheckoutPage} />
          <Route exact path={ROUTE.SHOPPING_CART} component={ShoppingCartPage} />
          <Route component={() => <Redirect to={ROUTE.HOME} />} />
        </Switch>
      </Router>
      {loading && <Spinner />}
    </>
  );
};

export default App;

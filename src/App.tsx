import { useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import Spinner from './component/atom/Spinner/Spinner';
import GlobalNavbar from './component/organism/GlobalNavBar/GlobalNavBar';
import OrderCheckoutPage from './component/page/OrderCheckPage/OrderCheckPage';
import OrderDetailPage from './component/page/OrderDetailPage/OrderDetailPage';
import OrderListPage from './component/page/OrderListPage/OrderListPage';
import ProductDetailPage from './component/page/ProductDetailPage/ProductDetailPage';
import ProductListPage from './component/page/ProductListPage/ProductListPage';
import ShoppingCartPage from './component/page/ShoppingCartPage/ShoppingCartPage';
import { ROUTE } from './constant';
import { ModalPortal } from './portal';
import { RootState } from './redux/store';
import GlobalStyles from './style/GlobalStyles';

const App = () => {
  const loading = useSelector(
    ({ loadingReducer }: RootState) => loadingReducer.loading
  );

  return (
    <>
      <GlobalStyles />
      <Router>
        <GlobalNavbar />

        <Switch>
          <Route exact path={ROUTE.HOME} component={ProductListPage} />
          <Route path={ROUTE.PRODUCT_DETAIL} component={ProductDetailPage} />
          <Route
            exact
            path={ROUTE.SHOPPING_CART}
            component={ShoppingCartPage}
          />
          <Route exact path={ROUTE.ORDER_LIST} component={OrderListPage} />
          <Route
            exact
            path={ROUTE.ORDER_CHECKOUT}
            component={OrderCheckoutPage}
          />
          <Route path={ROUTE.ORDER_DETAIL} component={OrderDetailPage} />

          <Route component={() => <Redirect to={ROUTE.HOME} />} />
        </Switch>
      </Router>
      {loading && (
        <ModalPortal>
          <Spinner />
        </ModalPortal>
      )}
    </>
  );
};

export default App;

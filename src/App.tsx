import { HashRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './App.styles';
import { PATH } from './constants';

import Header from './components/Header/Header';
import GlobalStyle from './Global.styles';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductOrderPage from './pages/ProductOrderPage/ProductOrderPage';
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage';
import OrderListPage from './pages/OrderListPage/OrderListPage';
import OrderDetailPage from './pages/OrderDetailPage/OrderDetailPage';
import { Snackbar } from './components/commons/Snackbar/Snackbar.styles';
import { SNACKBAR_ANIMATION_DURATION, SNACKBAR_DURATION } from './constants/layout';
import useSnackbar from './hooks/layout/useSnackbar';

function App() {
  const { snackbarMessage, isSnackbarShown } = useSnackbar();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <HashRouter>
        <Header />
        <Switch>
          <Route exact path={PATH.ROOT}>
            <ProductListPage />
          </Route>
          <Route path={PATH.PRODUCT_DETAIL}>
            <ProductDetailPage />
          </Route>
          <Route exact path={PATH.CART}>
            <ShoppingCartPage />
          </Route>
          <Route exact path={PATH.ORDER}>
            <ProductOrderPage />
          </Route>
          <Route exact path={PATH.ORDER_LIST}>
            <OrderListPage />
          </Route>
          <Route path={PATH.ORDER_DETAIL}>
            <OrderDetailPage />
          </Route>
        </Switch>
      </HashRouter>
      <Snackbar isShown={isSnackbarShown} animationDuration={SNACKBAR_ANIMATION_DURATION}>
        {snackbarMessage}
      </Snackbar>
    </ThemeProvider>
  );
}

export default App;

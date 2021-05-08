import { HashRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './App.styles';
import Header from './components/Header/Header';
import GlobalStyle from './Global.styles';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductOrderPage from './pages/ProductOrderPage/ProductOrderPage';
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage';
import OrderListPage from './pages/OrderListPage/OrderListPage';
import OrderDetailPage from './pages/OrderDetailPage/OrderDetailPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header styles={{ marginBottom: '60px' }} />
      <HashRouter>
        <Switch>
          <Route exact path="/">
            <ProductListPage />
          </Route>
          <Route exact path="/detail">
            <ProductDetailPage />
          </Route>
          <Route exact path="/cart">
            <ShoppingCartPage />
          </Route>
          <Route exact path="/order">
            <ProductOrderPage />
          </Route>
          <Route exact path="/order-list">
            <OrderListPage />
          </Route>
          <Route exact path="/order-detail">
            <OrderDetailPage />
          </Route>
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;

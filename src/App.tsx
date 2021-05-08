import { HashRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from './App.styles';
import Header from './components/Header/Header';
import GlobalStyle from './Global.styles';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import ProductListPage from './pages/ProductListPage/ProductListPage';
import ProductOrderPage from './pages/ProductOrderPage/ProductOrderPage';
import ShoppingCartPage from './pages/ShoppingCartPage/ShoppingCartPage';

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
        </Switch>
      </HashRouter>
    </ThemeProvider>
  );
}

export default App;

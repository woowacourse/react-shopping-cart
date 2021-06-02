import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import GlobalStyle from './globalStyle';
import Header from '../src/components/Header';
import MainContainer from '../src/components/shared/MainContainer';
import { PATH } from './constants';
import { Cart, ProductList, Order } from './pages';
import { store } from './store';
import { ReactComponent as Logo } from './assets/icons/logo.svg';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <>
      <Provider store={store}>
        <GlobalStyle />
        <Header>
          <div>
            <Link to={PATH.MAIN}>
              <Logo height="48px" />
            </Link>
          </div>
          <div>
            <Link to={PATH.CART}>장바구니</Link>
            <Link to={PATH.MYMART_ORDER}>주문목록</Link>,
          </div>
        </Header>
        <MainContainer>
          <Switch>
            <Route exact path={[PATH.MAIN, PATH.GOODS]} component={ProductList} />
            <Route exact path={`${PATH.GOODS_DETAIL}/:id`} component={ProductDetail} />
            <Route exact path={PATH.CART} component={Cart} />
            <Route exact path={PATH.ORDER} component={Order} />
            <Route exact path={PATH.MYMART_ORDER}>
              MYMART_ORDER
            </Route>
            <Route exact path={PATH.MYMART_ORDER_DETAIL}>
              MYMART_ORDER_DETAIL
            </Route>
            <Redirect to={PATH.MAIN} />
          </Switch>
        </MainContainer>
      </Provider>
    </>
  );
}
export default App;

import React from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import GlobalStyle from './globalStyle';
import Header from '../src/components/Header';
import MainContainer from '../src/components/shared/MainContainer';
import { PATH } from './constants';
import { ProductDetail, ProductList, Cart, Order } from './pages';
import { ReactComponent as Logo } from './assets/icons/logo.svg';
import OrderList from './pages/OrderList';

function App() {
  return (
    <>
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
          <Route exact path={[PATH.MAIN, PATH.PRODUCTS]} component={ProductList} />
          <Route exact path={`${PATH.PRODUCTS}/:id`} component={ProductDetail} />
          <Route exact path={PATH.CART} component={Cart} />
          <Route exact path={PATH.ORDER} component={Order} />
          <Route exact path={PATH.MYMART_ORDER} component={OrderList} />
          <Redirect to={PATH.MAIN} />
        </Switch>
      </MainContainer>
    </>
  );
}
export default App;

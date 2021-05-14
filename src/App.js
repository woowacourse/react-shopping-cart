import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import GlobalStyle from './globalStyle';
import Header from '../src/components/Header';
import MainContainer from '../src/components/shared/MainContainer';
import { PATH } from './constants';
import { Cart, ItemList, Order } from './pages';
import { setItemList, store } from './store';
import { setCartItemList } from './store/cartReducer';
import { API } from '../src/services';
import { ReactComponent as Logo } from './assets/icons/logo.svg';

function App() {
  useEffect(() => {
    const getItemListRequest = async () => {
      const result = await API.getItemList();
      store.dispatch(setItemList(result));
    };

    const getCartItemListRequest = async () => {
      const result = await API.getCartItemList();
      store.dispatch(setCartItemList(result));
    };
    getItemListRequest();
    getCartItemListRequest();
  }, []);

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
            <Route exact path={[PATH.MAIN, PATH.GOODS]} component={ItemList} />
            <Route exact path={PATH.GOODS_DETAIL}>
              GOODS_DETAIL
            </Route>
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

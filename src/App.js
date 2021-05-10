import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import GlobalStyle from './globalStyle';
import Header from '../src/components/Header';
import MainContainer from '../src/components/shared/MainContainer';
import { PATH } from './constants';
import { Cart, ItemList } from './pages';
import { setItemList, setCartItemList, store } from './store';
import { API } from './utils';

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
        <Header menuList={['장바구니', '주문목록']} />
        <MainContainer>
          <Switch>
            <Route exact path={PATH.MAIN} component={ItemList} />
            <Route exact path={PATH.GOODS_DETAIL}>
              GOODS_DETAIL
            </Route>
            <Route exact path={PATH.CART} component={Cart} />
            <Route exact path={PATH.ORDER}>
              ORDER
            </Route>
            <Route exact path={PATH.MYMART_ORDER}>
              MYMART_ORDER
            </Route>
            <Route exact path={PATH.MYMART_ORDER_DETAIL}>
              MYMART_ORDER_DETAIL
            </Route>
          </Switch>
        </MainContainer>
      </Provider>
    </>
  );
}
export default App;

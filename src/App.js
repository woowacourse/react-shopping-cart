import GlobalStyle from './globalStyle';
import Header from '../src/components/Header';
import MainContainer from '../src/components/shared/MainContainer';
import { Switch, Route } from 'react-router-dom';
import { PATH } from './constants';

function App() {
  return (
    <>
      <GlobalStyle />
      <Header menuList={['장바구니', '주문목록']} />
      <MainContainer>
        <Switch>
          <Route exact path={PATH.MAIN}>
            MAIN
          </Route>
          <Route exact path={PATH.GOODS_DETAIL}>
            GOODS_DETAIL
          </Route>
          <Route exact path={PATH.CART}>
            CART
          </Route>
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
    </>
  );
}
export default App;

import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useSetCartState } from './recoils/recoilCart';
import { useQuery } from './hooks/useQuery';

import GlobalStyle from './GlobalStyle';

import { useApiBaseUrlValue } from './recoils/recoilApiBaseUrl';

import { Home } from './components/pages/Home';
import { ShoppingCart } from './components/pages/ShoppingCart';

import { isEqual } from './utils';

import { CartItemType } from './types';
import { FETCH_URL, PATH } from './constants';

export const App = () => {
  const baseUrl = useApiBaseUrlValue();
  const { data: cart, loading, error } = useQuery<CartItemType[]>(baseUrl + FETCH_URL.CART_ITEMS);

  const setCartState = useSetCartState();

  useEffect(() => {
    if (!cart) return;

    setCartState(cart);
  }, [cart, setCartState]);

  useEffect(() => {
    if (!cart) return;

    setCartState((prev) => {
      if (!isEqual(prev, cart)) return cart;

      // 두 객체가 같다면 굳이 또 Set해주는 것으로 리렌더링을 발생시키고 싶지 않다
      // prev를 그대로 return해도 객체이기 때문에 set 함수 내부의 === 비교 로직 결과가 false가 되니 리렌더링이 일어난다
      // TODO 이 문제를 어떻게 해결할 수 있을까
      return prev;
    });
  }, [cart]);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path={PATH.HOME} Component={Home} />
          <Route path={PATH.CART} Component={ShoppingCart} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

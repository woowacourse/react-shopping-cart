import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useSetCartState } from './recoils/recoilCart';
import { useQuery } from './hooks/useQuery';

import GlobalStyle from './GlobalStyle';

import { useApiBaseUrlValue } from './recoils/recoilApiBaseUrl';

import { Home } from './components/pages/Home';
import { ShoppingCart } from './components/pages/ShoppingCart';

import { CartItemType } from './types';
import { FETCH_URL, PATH } from './constants';

export const App = () => {
  const baseUrl = useApiBaseUrlValue();
  const { data: cart } = useQuery<CartItemType[]>(baseUrl + FETCH_URL.CART_ITEMS, {
    Authorization: `Basic ${btoa(process.env.REACT_APP_API_CREDENTIAL!)}`,
  });

  const setCartState = useSetCartState();

  useEffect(() => {
    if (!cart) return;

    setCartState(cart);
  }, [cart, setCartState]);

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

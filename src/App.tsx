import GlobalStyle from './GlobalStyle';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useEffect } from 'react';
import { useSetCartState } from './recoils/recoilCart';
import { useQuery } from './hooks/useQuery';

import { Home } from './pages/Home';
import { ShoppingCart } from './pages/ShoppingCart';

import { CartItem } from './types';

export const App = () => {
  const { data: cart, fetchData } = useQuery<CartItem[]>();
  const setCartState = useSetCartState();

  useEffect(() => {
    fetchData('/cart-items');
  }, []);

  useEffect(() => {
    if (cart === null) return;

    setCartState(cart);
  }, [cart]);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="shopping-cart" Component={ShoppingCart} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

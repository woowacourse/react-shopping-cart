import { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';

import { Home } from './components/pages/Home/Home';
import { Cart } from './components/pages/Cart/Cart';

import { PATH } from './constants';
import { Layout } from './components/common/Layout/Layout';
import { useCartRepository } from './recoils/recoilCart';

export const App = () => {
  const { fetchCartItems } = useCartRepository();

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route
            path={PATH.HOME}
            Component={() => (
              <Layout>
                <Home />
              </Layout>
            )}
          />
          <Route
            path={PATH.CART}
            Component={() => (
              <Layout>
                <Cart />
              </Layout>
            )}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

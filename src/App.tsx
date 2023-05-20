import { LocalData } from '@Utils/localData';
import { Outlet } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import Header from '@Components/Header';

import GlobalStyle, { CommonPageStyle } from '@Styles/GlobalStyle';

import shoppingCartState from '@Atoms/shoppingCartState';

import { LOCAL_STORAGE_KEYWORD } from './constants';
import { ShoppingCartProduct } from './types';

function App() {
  const setShoppingCart = useSetRecoilState<ShoppingCartProduct[]>(shoppingCartState);
  setShoppingCart(LocalData.getData(LOCAL_STORAGE_KEYWORD.SHOPPING_CART) ?? []);

  return (
    <>
      <GlobalStyle />
      <Header />
      <CommonPageStyle>
        <Outlet />
      </CommonPageStyle>
    </>
  );
}

export default App;

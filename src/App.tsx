import { Outlet } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';

import Header from '@Components/Header';

import ErrorContainer from '@Pages/ProductListPage/ErrorContainer';

import GlobalStyle, { CommonPageStyle } from '@Styles/GlobalStyle';

import useFetch from '@Hooks/useFetch';

import shoppingCartState from '@Atoms/shoppingCartState';

import { getMockSelectItemApiUrl } from './api/index';
import { ShoppingCartProduct } from './types';

function App() {
  const { data, isLoading, currentHttpStatus } = useFetch<ShoppingCartProduct[]>(getMockSelectItemApiUrl('GET'));
  const setShoppingCart = useSetRecoilState<ShoppingCartProduct[]>(shoppingCartState);

  if (!isLoading && !data) {
    return (
      <>
        <GlobalStyle />
        <Header />
        <CommonPageStyle>
          <ErrorContainer error={currentHttpStatus} />
        </CommonPageStyle>
      </>
    );
  }

  data && setShoppingCart(data);

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

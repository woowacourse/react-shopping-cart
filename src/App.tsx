import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@Components/Header';

import GlobalStyle, { CommonPageStyle } from '@Styles/GlobalStyle';

import localStorageHelper from '@Utils/localStorageHelper';

function App() {
  useEffect(() => {
    if (!localStorageHelper.hasKey('cartItems')) localStorageHelper.setInitValue('cartItems', []);
  }, []);

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

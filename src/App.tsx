import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@Components/Header';

import GlobalStyle, { CommonPageStyle } from '@Styles/GlobalStyle';

import localStorageHelper from '@Utils/localStorageHelper';

import { worker } from './mocks/browser';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

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

import { Outlet } from 'react-router-dom';

import Header from '@Components/Header';

import GlobalStyle, { CommonPageStyle } from '@Styles/GlobalStyle';

import { worker } from './mocks/browser';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

function App() {
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

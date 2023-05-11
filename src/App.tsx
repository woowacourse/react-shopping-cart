import React from 'react';
import GlobalStyle from './GlobalStyle';
import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

function App() {
  return (
    <>
      <GlobalStyle />
      <RecoilRoot>
        <RouterProvider router={router} />;
      </RecoilRoot>
    </>
  );
}

export default App;

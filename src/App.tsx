import React from 'react';
import { ThemeProvider } from 'styled-components';

import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';

import { GlobalStyle } from './styles/global-style';
import Theme from './styles/theme';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <RecoilRoot>
        <RouterProvider router={router} />;
      </RecoilRoot>
    </ThemeProvider>
  );
}

export default App;

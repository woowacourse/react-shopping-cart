import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './style/theme';
import GlobalStyle from 'style/GlobalStyle';

import Router from './Router';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
};

export default App;

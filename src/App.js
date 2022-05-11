import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from './style/theme';
import GlobalStyle from 'style/GlobalStyle';
import ProductList from './pages/ProductList';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ProductList />
    </ThemeProvider>
  );
}

export default App;

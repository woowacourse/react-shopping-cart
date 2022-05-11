import React from 'react';
import reset from 'styled-reset';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import Header from 'component/common/Header';
import theme from 'theme/theme';
import ProductListPage from 'page/ProductListPage';

export const GlobalStyles = createGlobalStyle`
  ${reset}
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    background-color: transparent;
    border: none;
    outline: none;
  }
  `;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <GlobalStyles />
        <Header />
        <ProductListPage />
      </div>
    </ThemeProvider>
  );
}

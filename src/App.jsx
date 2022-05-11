import React from 'react';
import reset from 'styled-reset';
import {createGlobalStyle, ThemeProvider} from 'styled-components';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from 'component/common/Header';
import theme from 'theme/theme';
import ProductListPage from 'page/ProductListPage';
import ProductDetailPage from 'page/ProductDetailPage';

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
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
          <GlobalStyles />
          <Header />
          <Routes>
            <Route exact path="/" element={<ProductListPage />}></Route>
            <Route exact path="/detail/:id" element={<ProductDetailPage />}></Route>
          </Routes>
        </div>
      </ThemeProvider>
    </Router>
  );
}

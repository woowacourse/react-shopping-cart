import { Route, Routes } from 'react-router-dom';

import CartPage from 'pages/CartPage/CartPage';
import GlobalStyle from 'styles/GlobalStyle';
import Header from 'components/Layout/Header/Header';
import MainPage from 'pages/MainPage/MainPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import PATH from 'constants/path';
import ProductPage from 'pages/ProductPage/ProductPage';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header />
        <Routes>
          <Route path={PATH.BASE} element={<MainPage />} />
          <Route path={`${PATH.PRODUCT}/:id`} element={<ProductPage />} />
          <Route path={PATH.CART} element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;

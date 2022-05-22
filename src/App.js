import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import { ProductListPage, ProductDetailPage, CartPage } from 'page';
import { Header, CartIcon, GlobalStyles, theme } from 'components';

import { BASE_URL, ROUTES } from 'constants';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={BASE_URL}>
        <Header
          left={
            <Styled.HomeLink to={ROUTES.HOME}>
              <CartIcon category="header" /> WOOWA SHOP
            </Styled.HomeLink>
          }
          right={
            <div>
              <Styled.CartLink to={ROUTES.CART}>장바구니</Styled.CartLink>
              <Styled.OrderLink to={ROUTES.HOME}>주문목록</Styled.OrderLink>
            </div>
          }
        />

        <Styled.Body>
          <Routes>
            <Route path={ROUTES.HOME} element={<ProductListPage />} />
            <Route path={ROUTES.DETAILS} element={<ProductDetailPage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
          </Routes>
        </Styled.Body>

        <GlobalStyles />
      </BrowserRouter>
    </ThemeProvider>
  );
}

const Styled = {
  Body: styled.div`
    display: flex;
    justify-content: center;
  `,

  HomeLink: styled(Link)`
    font-weight: 900;
    font-size: 40px;
    line-height: 58px;
    text-decoration: none;
    color: white;
  `,

  CartLink: styled(Link)`
    font-weight: 500;
    font-size: 24px;
    line-height: 12px;
    text-decoration: none;
    color: white;
    margin: 0 10px;
  `,

  OrderLink: styled(Link)`
    font-weight: 500;
    font-size: 24px;
    line-height: 12px;
    text-decoration: none;
    color: white;
    margin: 0 10px;
  `,
};

export default App;

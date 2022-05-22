import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import ProductListPage from 'page/ProductListPage';
import ProductDetailPage from 'page/ProductDetailPage';
import { Header, CartIcon } from 'components';
import GlobalStyles from 'components/GlobalStyles';
import theme from 'components/theme';

import { BASE_URL } from 'constants';
import CartPage from 'page/CartPage';

const Styled = {
  Routes: styled.div`
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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={BASE_URL}>
        <Header
          left={
            <Styled.HomeLink to="">
              <CartIcon category="header" /> WOOWA SHOP
            </Styled.HomeLink>
          }
          right={
            <div>
              <Styled.CartLink to="cart">장바구니</Styled.CartLink>
              <Styled.OrderLink to="">주문목록</Styled.OrderLink>
            </div>
          }
        />
        <Styled.Routes>
          <Routes>
            <Route path="" element={<ProductListPage />} />
            <Route path="details/:id" element={<ProductDetailPage />} />
            <Route path="cart" element={<CartPage />} />
          </Routes>
        </Styled.Routes>
        <GlobalStyles />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

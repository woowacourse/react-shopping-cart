import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styled from 'styled-components';

import ProductListPage from 'pages/productList/ProductListPage';
import ShoppingCartPage from 'pages/shoppingCart/ShoppingCartPage';
import Header from 'components/header/Header';
import Button from 'components/base/button/Button';
import HeaderCartIcon from 'components/header/HeaderCartIcon';

import GlobalStyles from 'style/GlobalStyles';

import { BASE_PAGE_URL, SHOPPING_CART_PAGE_URL } from 'constants/constants';

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header
        left={
          <Link to={BASE_PAGE_URL}>
            <Button>
              <HeaderCartIcon />
            </Button>
            <Button boldText>WOOWA SHOP</Button>
          </Link>
        }
        right={
          <div>
            <Link to={SHOPPING_CART_PAGE_URL}>
              <Button normalText>장바구니</Button>
            </Link>
            <Button normalText>주문목록</Button>
          </div>
        }
      />
      <PageWrapper>
        <Routes>
          <Route path={BASE_PAGE_URL} element={<ProductListPage />} />
          <Route path={SHOPPING_CART_PAGE_URL} element={<ShoppingCartPage />} />
        </Routes>
      </PageWrapper>
    </BrowserRouter>
  );
}

export default App;

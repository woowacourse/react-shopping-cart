import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import ProductListPage from 'page/productList/ProductListPage';
import Header from 'components/header/Header';
import Button from 'components/base/button/Button';
import HeaderCartIcon from 'components/header/HeaderCartIcon';

import GlobalStyles from 'GlobalStyles';

import { BASE_URL } from 'constants';

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
          <div>
            <Button>
              <HeaderCartIcon />
            </Button>
            <Button boldText>WOOWA SHOP</Button>
          </div>
        }
        right={
          <div>
            <Button normalText>장바구니</Button>
            <Button normalText>주문목록</Button>
          </div>
        }
      />
      <PageWrapper>
        <Routes>
          <Route path={BASE_URL} element={<ProductListPage />} />
        </Routes>
      </PageWrapper>
    </BrowserRouter>
  );
}

export default App;

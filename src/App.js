import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import ProductListPage from 'page/ProductListPage/ProductListPage';
import Header from 'components/Header/Header';
import Button from 'components/Button/Button';
import CartIcon from 'components/CartIcon/CartIcon';
import GlobalStyles from 'components/GlobalStyles';

import { BASE_URL } from 'constants';

const Styled = {
  Routes: styled.div`
    display: flex;
    justify-content: center;
  `,
};

function App() {
  return (
    <BrowserRouter>
      <Header
        left={
          <div>
            <Button>
              <CartIcon theme="header" />
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
      <Styled.Routes>
        <Routes>
          <Route path={BASE_URL} element={<ProductListPage />} />
        </Routes>
      </Styled.Routes>
      <GlobalStyles />
    </BrowserRouter>
  );
}

export default App;

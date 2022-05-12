import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import ProductListPage from 'page/productList/ProductListPage';
import Header from 'components/header/Header';
import Button from 'components/shared/button/Button';
import CartIcon from 'components/shared/cartIcon/CartIcon';

const StyledRoutes = styled.div`
  display: flex;
  justify-content: center;
`;

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
      <StyledRoutes>
        <Routes>
          <Route path="/react-shopping-cart/" element={<ProductListPage />} />
        </Routes>
      </StyledRoutes>
    </BrowserRouter>
  );
}

export default App;

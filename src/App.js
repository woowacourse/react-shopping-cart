import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import ProductListPage from 'page/ProductListPage';
import Button from 'components/shared/button/Button';
import HeaderButton from 'components/header/HeaderButton';
import Header from 'components/header/Header';
import ShoppingCartIcon from 'components/shared/icon/ShoppingCartIcon';

const StyledRoutes = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: gray;
`;

function App() {
  return (
    <BrowserRouter>
      <Header
        left={
          <div>
            <Button>
              <ShoppingCartIcon theme="header" />
            </Button>
            <HeaderButton bold>WOOWA SHOP</HeaderButton>
          </div>
        }
        right={
          <div>
            <HeaderButton>장바구니</HeaderButton>
            <HeaderButton>주문목록</HeaderButton>
          </div>
        }
      />
      <StyledRoutes>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
        </Routes>
      </StyledRoutes>
    </BrowserRouter>
  );
}

export default App;

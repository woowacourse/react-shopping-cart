import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import ProductListPage from 'page/ProductListPage';
import { Header, Button, CartIcon } from 'components';
import GlobalStyles from 'components/GlobalStyles';
import theme from 'components/theme';

import { BASE_URL } from 'constants';

const Styled = {
  Routes: styled.div`
    display: flex;
    justify-content: center;
  `,
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          left={
            <div>
              <Button>
                <CartIcon category="header" />
              </Button>
              <Button boldFont>WOOWA SHOP</Button>
            </div>
          }
          right={
            <div>
              <Button normalFont>장바구니</Button>
              <Button normalFont>주문목록</Button>
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
    </ThemeProvider>
  );
}

export default App;

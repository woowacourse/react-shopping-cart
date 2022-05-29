import { Routes, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import GlobalStyle from './styles/GlobalStyle';
import theme from './styles/theme';

import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import ProductPage from './pages/ProductPage/ProductPage';
import CartPage from './pages/CartPage/CartPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import PATHS from './constants/paths';

function App() {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header />
        <StyledContent>
          <Routes>
            <Route path={PATHS.INDEX} element={<MainPage />} />
            <Route path={PATHS.PRODUCT} element={<ProductPage />} />
            <Route path={PATHS.CART} element={<CartPage />} />
            <Route path={PATHS.DEFAULT} element={<NotFoundPage />} />
          </Routes>
        </StyledContent>
      </ThemeProvider>
    </>
  );
}

const StyledContent = styled.div`
  min-height: 200px;
  margin: 60px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export default App;

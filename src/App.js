import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductListPage from './page/ProductListPage';
import Header from './shared/Header';
import styled from 'styled-components';

const StyledRoutes = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: gray;
`;

function App() {
  return (
    <BrowserRouter>
      <Header />
      <StyledRoutes>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
        </Routes>
      </StyledRoutes>
    </BrowserRouter>
  );
}

export default App;

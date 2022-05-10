import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemDetail from './pages/ItemDetail';
import ItemList from './pages/ItemList';
import NotFound from './pages/NotFound';
import styled from 'styled-components';
import Header from './components/common/Header';

function App() {
  return (
    <BrowserRouter>
      <StyledRoot>
        <Header />
        <StyledMain>
          <Routes>
            <Route path='/' element={<ItemList />} />
            <Route path='/items/*' element={<ItemDetail />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </StyledMain>
      </StyledRoot>
    </BrowserRouter>
  );
}

export default App;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMain = styled.main`
  width: ${({ theme }) => theme.size.fullContentWidth};
`;

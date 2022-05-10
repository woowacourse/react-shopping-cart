import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemDetail from './pages/ItemDetail';
import ItemList from './pages/ItemList';
import NotFound from './pages/NotFound';
import styled from 'styled-components';

function App() {
  return (
    <StyledRoot>
      <StyledMain>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ItemList />} />
            <Route path='/items/*' element={<ItemDetail />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </StyledMain>
    </StyledRoot>
  );
}

export default App;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledMain = styled.main`
  width: 1320px;
`;

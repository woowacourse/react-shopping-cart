import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ItemDetail from 'pages/ItemDetail';
import ItemList from 'pages/ItemList';
import NotFound from 'pages/NotFound';
import styled from 'styled-components';
import Header from 'components/common/Header';
import Snackbar from 'components/common/Snackbar';
import { useAppSelector } from 'hooks/useAppSelector';

function App() {
  const { isSnackbarOpen } = useAppSelector(state => state.snackbarReducer);

  return (
    <BrowserRouter>
      <StyledRoot>
        <Header />
        <StyledMain>
          <Routes>
            <Route path='/' element={<ItemList />} />
            <Route path='/item_detail/:id' element={<ItemDetail />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </StyledMain>
      </StyledRoot>
      {isSnackbarOpen && <Snackbar />}
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

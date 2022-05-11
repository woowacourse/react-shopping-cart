import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ItemDetail from 'pages/ItemDetail';
import NotFound from 'pages/NotFound';
import Main from 'pages/Main';
import styled from 'styled-components';
import Header from 'components/common/Header';
import Snackbar from 'components/common/Snackbar';
import { useAppSelector } from 'hooks/useAppSelector';

function App() {
  const { isSnackbarOpen } = useAppSelector(state => state.snackbarReducer);

  return (
    <BrowserRouter basename={process.env.public_url}>
      <StyledRoot>
        <Header />
        <StyledMain>
          <Routes>
            <Route path='/' element={<Navigate replace to='/main/1' />} />
            <Route path='/main/:id' element={<Main />} />
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

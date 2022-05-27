import { BrowserRouter } from 'react-router-dom';
import styled from 'styled-components';
import Header from 'components/common/Header';
import Modal from 'components/common/Snackbar';
import { useAppSelector } from 'hooks/useAppSelector';
import Router from 'Router';

function App() {
  const { isSnackbarOpen } = useAppSelector(state => state.snackbarReducer);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <StyledRoot>
        <Header />
        <StyledMain>
          <Router />
        </StyledMain>
      </StyledRoot>
      {isSnackbarOpen && <Modal />}
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

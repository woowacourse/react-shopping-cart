import Header from 'components/common/Header';
import { BrowserRouter } from 'react-router-dom';
import Routers from 'Routers';
import styled from 'styled-components';

function App() {
  return (
    <BrowserRouter basename='/react-shopping-cart'>
      <StyledRoot>
        <Header />
        <StyledMain>
          <Routers />
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

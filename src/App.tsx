import Header from 'components/common/Header';
import Loading from 'components/common/Loading';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routers from 'Routers';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter basename='/react-shopping-cart'>
        <StyledRoot>
          <Header />
          <StyledMain>
            <Routers />
          </StyledMain>
        </StyledRoot>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;

const StyledRoot = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

const StyledMain = styled.main`
  width: ${({ theme }) => theme.size.fullContentWidth};
  ${flexCenter};
  height: 100%;
`;

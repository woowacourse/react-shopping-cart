import { Suspense } from 'react';
import { styled } from 'styled-components';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import ProductList from './components/ProductList';
import GlobalStyle from './styles/GlobalStyle';
import ResetStyle from './styles/ResetStyle';

const Content = styled.main`
  margin: 0 auto;
  margin-top: 60px;
  padding: 0 24px;

  max-width: 1300px;
`;

const App = () => {
  return (
    <>
      <ResetStyle />
      <GlobalStyle />

      <Header />
      <Content>
        <ErrorBoundary fallback={<div>Error!!!</div>}>
          <Suspense fallback={<div>Loading</div>}>
            <ProductList />
          </Suspense>
        </ErrorBoundary>
      </Content>
    </>
  );
};

export default App;

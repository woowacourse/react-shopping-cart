import { Suspense, useMemo } from 'react';
import { selector, useRecoilState } from 'recoil';
import { styled } from 'styled-components';
import client from './api';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import ProductList from './components/ProductList';
import { retryCountState } from './recoil/atoms/retryCountState';
import GlobalStyle from './styles/GlobalStyle';
import ResetStyle from './styles/ResetStyle';
import type { Product } from './type';

const Content = styled.main`
  margin: 0 auto;
  margin-top: 60px;
  padding: 0 24px;

  max-width: 1300px;
`;

const App = () => {
  const [retryCount, setRetryCount] = useRecoilState(retryCountState);
  const productsQuery = useMemo(
    () =>
      selector<Product[]>({
        key: `productsQuery_${retryCount}`,
        get: async () => {
          const data = await client.get('/products');
          return data;
        },
      }),
    [retryCount],
  );

  const handleRetry = async () => {
    setRetryCount((prevCount) => prevCount + 1);
  };

  return (
    <>
      <ResetStyle />
      <GlobalStyle />

      <Header />

      <Content>
        <ErrorBoundary fallback={<div>Error!!!!</div>} onRetry={handleRetry}>
          <Suspense fallback={<div>Loading</div>}>
            <ProductList productsQuery={productsQuery} />
          </Suspense>
        </ErrorBoundary>
      </Content>
    </>
  );
};

export default App;

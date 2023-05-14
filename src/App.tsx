import { styled } from 'styled-components';
import Header from './components/Header/Header';
import ProductList from './components/ProductList/ProductList';
import { Suspense } from 'react';
import ProductListFallback from './components/ProductList/ProductListFallback';

function App() {
  return (
    <div className="App">
      <Header />
      <Layout>
        <Suspense fallback={<ProductListFallback />}>
          <ProductList />
        </Suspense>
      </Layout>
    </div>
  );
}

const Layout = styled.main`
  padding: 140px 0 60px 0;

  @media screen and (min-width: 1200px) {
    display: flex;
    justify-content: center;
  }
`;

export default App;

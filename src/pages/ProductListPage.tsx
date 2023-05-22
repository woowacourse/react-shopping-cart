import { styled } from 'styled-components';
import { Suspense } from 'react';
import Header from '../components/common/Header/Header';
import ProductList from '../components/product/ProductList/ProductList';
import ProductFallBack from '../components/product/ProductFallBack/ProductFallBack';
import ErrorBoundary from '../errorHandler/ErrorBoundary';

const ProductListPage = () => {
  return (
    <>
      <Header />
      <Layout>
        <ErrorBoundary>
          <Suspense fallback={<ProductFallBack />}>
            <ProductList />
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </>
  );
};

const Layout = styled.main`
  padding: 140px 0 60px 0;

  @media screen and (min-width: 1200px) {
    display: flex;
    justify-content: center;
  }
`;

export default ProductListPage;

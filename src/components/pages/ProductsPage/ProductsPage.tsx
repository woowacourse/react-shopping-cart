import { Suspense } from 'react';
import * as Styled from './ProductsPage.styled';
import ProductList from './ProductList/ProductList';
import LoadingPage from '../LoadingPage/LoadingPage';
import { Product } from '../../../types/Product';
import fetchData from '../../../utils/fetchData';
import ErrorBoundary from '../../commons/ErrorBoundary/ErrorBoundary';
import ErrorPage from '../ErrorPage/ErrorPage';

const ProductsPage = () => {
  const listFetcher = fetchData<Product[]>('/products');

  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <Suspense fallback={<LoadingPage />}>
        <Styled.ProductsPage>
          <ProductList listFetcher={listFetcher} />
        </Styled.ProductsPage>
      </Suspense>
    </ErrorBoundary>
  );
};

export default ProductsPage;

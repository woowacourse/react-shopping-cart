import { Suspense } from 'react';
import * as Styled from './ProductsPage.styled';
import ProductList from './ProductList/ProductList';
import LoadingPage from '../LoadingPage/LoadingPage';
import { Product } from '../../../types/Product';
import fetchData from '../../../utils/fetchData';

const ProductsPage = () => {
  const listFetcher = fetchData<Product[]>('/products');

  return (
    <Suspense fallback={<LoadingPage />}>
      <Styled.ProductsPage>
        <ProductList listFetcher={listFetcher} />
      </Styled.ProductsPage>
    </Suspense>
  );
};

export default ProductsPage;

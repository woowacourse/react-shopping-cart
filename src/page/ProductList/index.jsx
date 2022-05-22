import styled from 'styled-components';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearProducts } from 'store/action/productsActions';
import Maybe from 'react-maybe';
import usePagination from 'hooks/usePagination';

import GridLayout from 'component/common/GridLayout';
import LoadingSpinner from 'component/common/LoadingSpinner';
import ProductContainer from 'component/ProductList/ProductContainer';
import { PRODUCTS_COUNT_PER_PAGE } from 'constant';
import { productListAsyncThunk } from 'store/thunk/productThunk';

export default function ProductList() {
  const dispatch = useDispatch();
  const products = useSelector(store => store.products);
  const { currentPageProducts, Pagination } = usePagination(products, PRODUCTS_COUNT_PER_PAGE);

  useEffect(() => {
    if (products.length) {
      dispatch(clearProducts());
    }
    dispatch(productListAsyncThunk());
  }, []);

  return (
    <Maybe
      of={!!products.length}
      either={
        <Content>
          <GridLayout>
            {currentPageProducts.map(product => (
              <ProductContainer key={product.id} product={product} />
            ))}
          </GridLayout>
          <Pagination />
        </Content>
      }
      orElse={<LoadingSpinner />}
    />
  );
}

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  padding: 60px 0;
`;

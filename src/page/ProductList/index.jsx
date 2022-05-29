import styled from 'styled-components';

import Maybe from 'react-maybe';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearProductList } from 'store/action/productActions';

import GridLayout from 'component/common/GridLayout';
import LoadingSpinner from 'component/common/LoadingSpinner';
import ProductContainer from 'component/ProductList/ProductContainer';
import { PRODUCTS_COUNT_PER_PAGE } from 'constant';
import { productListAsyncThunk } from 'store/thunk/productThunk';
import usePagination from 'hooks/usePagination';
import PageController from 'component/common/PageController';

export default function ProductList() {
  const dispatch = useDispatch();
  const { productList } = useSelector(store => store.product);
  const { totalPageLength, currentPage, startIndex, endIndex, handlePageChange } = usePagination(
    productList.length,
    PRODUCTS_COUNT_PER_PAGE
  );

  useEffect(() => {
    if (productList.length) {
      dispatch(clearProductList());
    }
    dispatch(productListAsyncThunk());
  }, []);

  return (
    <Maybe
      of={!!productList.length}
      either={
        <Styled.Content>
          <GridLayout>
            {productList.slice(startIndex, endIndex + 1).map(product => (
              <ProductContainer key={product.id} product={product} />
            ))}
          </GridLayout>
          <PageController
            pageLength={totalPageLength}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </Styled.Content>
      }
      orElse={<LoadingSpinner />}
    />
  );
}

const Styled = {
  Content: styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 50px;
    padding: 60px 0;
  `,
};

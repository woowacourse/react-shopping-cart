import React, { useEffect } from 'react';

import useProductList from 'hooks/useProductList';

import ErrorContainer from 'components/common/ErrorContainer/ErrorContainer';
import ProductCard from 'components/product/ProductCard/ProductCard';
import * as Styled from 'components/product/ProductList/ProductList.style';
import { ERROR_MESSAGES } from 'constants/messages';

function ProductList({ openModal }) {
  const { isLoading, productList, pageCount, currentPage } = useProductList();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isLoading]);

  return (
    <Styled.Container>
      {currentPage > pageCount && (
        <ErrorContainer>{ERROR_MESSAGES.INVALID_PAGE}</ErrorContainer>
      )}
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => (
            <ProductCard.skeleton key={index} />
          ))
        : productList.map((product) => (
            <ProductCard key={product.id} product={product} openModal={openModal} />
          ))}
    </Styled.Container>
  );
}

export default ProductList;

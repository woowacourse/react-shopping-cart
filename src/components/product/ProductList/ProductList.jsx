import React, { useEffect } from 'react';

import useProductList from 'hooks/useProductList';

import ErrorContainer from 'components/common/ErrorContainer/ErrorContainer';
import ProductCard from 'components/product/ProductCard/ProductCard';
import * as Styled from 'components/product/ProductList/ProductList.style';

const INVALID_PAGE_ERROR_MESSAGE = '😱 존재하지 상품 페이지입니다. 😱';

function ProductList({ openModal }) {
  const { isLoading, productList, pageCount, currentPage } = useProductList();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [isLoading]);

  return (
    <Styled.Container>
      {currentPage > pageCount && <ErrorContainer>{INVALID_PAGE_ERROR_MESSAGE}</ErrorContainer>}
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => <ProductCard.skeleton key={index} />)
        : productList.map((product) => (
            <ProductCard key={product.id} product={product} openModal={openModal} />
          ))}
    </Styled.Container>
  );
}

export default ProductList;

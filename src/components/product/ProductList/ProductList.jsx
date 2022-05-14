import React from 'react';
import useProductList from '../../../hooks/useProductList';
import ErrorContainer from '../../common/ErrorContainer/ErrorContainer';
import ProductCard from '../ProductCard/ProductCard';
import * as Styled from './ProductList.style';

function ProductList({ openModal }) {
  const { isLoading, productList, pageCount, currentPage } = useProductList();

  return (
    <Styled.Container>
      {currentPage > pageCount && (
        <ErrorContainer>😱 존재하지 상품 페이지입니다. 😱</ErrorContainer>
      )}
      {isLoading
        ? Array.from({ length: 12 }).map((_, index) => <ProductCard.skeleton key={index} />)
        : productList.map(product => (
            <ProductCard key={product.id} product={product} openModal={openModal} />
          ))}
    </Styled.Container>
  );
}

export default ProductList;

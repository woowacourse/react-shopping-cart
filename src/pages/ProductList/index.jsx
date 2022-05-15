import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Product from 'components/Product';

const ProductList = () => {
  const productList = useSelector(({ productListReducer }) => productListReducer.productList);

  return (
    <Styled.ProductBox>
      {productList.length ? (
        productList.map(({ id, name, price, thumbnail }) => (
          <Product key={id} id={id} name={name} price={Number(price)} thumbnail={thumbnail} />
        ))
      ) : (
        <Styled.EmptyMessage>상품 목록이 존재하지 않습니다.</Styled.EmptyMessage>
      )}
    </Styled.ProductBox>
  );
};

const Styled = {
  ProductBox: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
  `,
  EmptyMessage: styled.div`
    width: 100%;
    text-align: center;
    font-size: 20px;
    font-weight: 600;
  `,
};

export default ProductList;

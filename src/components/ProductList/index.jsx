import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Product from 'components/Product';

const Styled = {
  ProductBox: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
  `,
  EmptyMessage: styled.div`
    text-align: center;
    width: 100%;
    font-size: 20px;
    font-weight: 600;
  `,
};

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

export default ProductList;

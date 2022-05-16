import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Product from 'components/Product';
import LoadingSpinner from 'components/common/LoadingSpinner';
import { setProductList } from 'modules/productList';
import { loadProductList } from 'api';

const ProductList = () => {
  const dispatch = useDispatch();
  const { productList, isLoading } = useSelector(({ productListReducer }) => productListReducer);

  useEffect(() => {
    loadProductList().then((res) => dispatch(setProductList(res)));
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (productList.length === 0) {
    return <Styled.EmptyMessage>상품 목록이 존재하지 않습니다.</Styled.EmptyMessage>;
  }

  return (
    <Styled.ProductBox>
      {productList.map(({ id, name, price, thumbnail }) => (
        <Product key={id} id={id} name={name} price={price} thumbnail={thumbnail} />
      ))}
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

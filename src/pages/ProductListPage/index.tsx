import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import Product from 'components/Product';
import LoadingSpinner from 'components/@common/LoadingSpinner';

import { setProductList, startProductList } from 'store/productList/actions';
import { loadProductList } from 'api/product';
import { RootState } from 'store';

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList, isLoading, isLoaded } = useSelector(
    (state: RootState) => state.productListReducer,
  );

  useEffect(() => {
    if (isLoaded) return;

    dispatch(startProductList());
    loadProductList()
      .then((res) => dispatch(setProductList(res)))
      .catch(() => navigate('/notFound'));
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (productList.length === 0) {
    return <Styled.EmptyMessage>상품 목록이 존재하지 않습니다.</Styled.EmptyMessage>;
  }

  return (
    <Styled.Container>
      {productList.map(({ id, name, price, thumbnail }) => (
        <Product key={id} id={id} name={name} price={price} thumbnail={thumbnail} />
      ))}
    </Styled.Container>
  );
};

const Styled = {
  Container: styled.div`
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

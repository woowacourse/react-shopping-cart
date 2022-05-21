import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Product from 'components/Product';
import LoadingSpinner from 'components/@common/LoadingSpinner';

import { setProductList, startProductList } from 'store/productList/actions';
import { loadProductList } from 'api/product';
import { RootState } from 'store';
import Flex from 'components/@common/Flex';
import Text from 'components/@common/Text';

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList, isLoading, isLoaded } = useSelector((state: RootState) => state.productList);

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
    return (
      <Text align="center" size="20px" weight={600}>
        상품 목록이 존재하지 않습니다.
      </Text>
    );
  }

  return (
    <Flex wrap="wrap" gap="40px">
      {productList.map(({ id, name, price, thumbnail }) => (
        <Product key={id} id={id} name={name} price={price} thumbnail={thumbnail} />
      ))}
    </Flex>
  );
};

export default ProductList;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Product from 'components/Product';
import Flex from 'components/@common/Flex';
import Text from 'components/@common/Text';
import Skeleton from 'components/@common/Skeleton';

import { RootState } from 'store';
import { ProductListAction } from 'store/productList/reducer';
import { getProductListAsync } from 'store/productList/thunk';
import { AppDispatch } from 'types';

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch<ProductListAction>>();
  const { productList, isLoading, isError } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    if (productList.length !== 0) return;
    dispatch(getProductListAsync());
  }, []);

  if (isError) {
    navigate('/notFound');
  }

  if (!isLoading && productList.length === 0) {
    return (
      <Text align="center" size="20px" weight={600}>
        상품 목록이 존재하지 않습니다.
      </Text>
    );
  }

  return (
    <Flex wrap="wrap" gap="40px">
      {isLoading && Array.from({ length: 8 }, (_, idx) => <Skeleton key={idx} />)}
      {productList.map(({ id, name, price, thumbnail }) => (
        <Product key={id} id={id} name={name} price={price} thumbnail={thumbnail} />
      ))}
    </Flex>
  );
};

export default ProductList;

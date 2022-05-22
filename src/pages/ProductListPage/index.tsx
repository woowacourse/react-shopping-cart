import React, { useEffect, useRef, useState } from 'react';

import Product from 'components/Product';
import Flex from 'components/@common/Flex';
import Text from 'components/@common/Text';
import Skeleton from 'components/@common/Skeleton';

import useProductList from 'hooks/useProductList';
import { getProductListAsync } from 'store/productList/thunk';

const ProductList = () => {
  const {
    dispatch,
    navigate,
    data: { productList, isLoading, isError },
  } = useProductList();

  const [loadedImageCount, setLoadedImageCount] = useState(0);
  const isUsed = useRef(false);

  if (isUsed.current === false && productList.length !== 0) {
    productList.forEach(({ thumbnail }) => {
      const image = new Image();

      image.onload = function () {
        setLoadedImageCount((prev) => prev + 1);
      };
      image.src = thumbnail;
    });

    isUsed.current = true;
  }

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
      {loadedImageCount !== productList.length &&
        Array.from({ length: 8 }, (_, idx) => <Skeleton key={idx} />)}
      {loadedImageCount === productList.length &&
        productList.map(({ id, name, price, thumbnail }) => (
          <Product key={id} id={id} name={name} price={price} thumbnail={thumbnail} />
        ))}
    </Flex>
  );
};

export default ProductList;

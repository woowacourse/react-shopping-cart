import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Product from 'components/Product';
import Flex from 'components/@common/Flex';
import Text from 'components/@common/Text';
import Skeleton from 'components/@common/Skeleton';
import useAppDispatch from 'hooks/useAppDispatch';
import useGlobalState from 'hooks/useGlobalState';

import { getProductListAsync } from 'store/productList/thunk';
import { ProductListState } from 'store/productList/reducer';

const ProductList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productList, isLoading, isError } = useGlobalState('product') as ProductListState;
  const [isLoadedAllImage, setIsLoadedAllImage] = useState(false);
  const loadedImageCount = useRef(0);

  if (isLoadedAllImage === false && productList.length !== 0) {
    productList.forEach(({ thumbnail }) => {
      const image = new Image();

      image.onload = function () {
        loadedImageCount.current += 1;
        if (loadedImageCount.current === productList.length) {
          setIsLoadedAllImage(true);
        }
      };
      image.src = thumbnail;
    });
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
      {isLoadedAllImage
        ? productList.map(({ id, name, price, thumbnail }) => (
            <Product key={id} id={id} name={name} price={price} thumbnail={thumbnail} />
          ))
        : Array.from({ length: 8 }, (_, idx) => <Skeleton key={idx} />)}
    </Flex>
  );
};

export default ProductList;

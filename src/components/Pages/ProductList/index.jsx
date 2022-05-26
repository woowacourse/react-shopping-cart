import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from 'reduxModule/productList';
import { useAddCartEvent } from 'hooks/cart';

import Product from 'components/Pages/ProductList/Product';
import LoadingSpinner from 'components/common/Styled/LoadingSpinner';

const Styled = {
  ProductBox: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    max-width: 1260px;
    margin: 0 auto;
    padding: 60px 0 100px;
  `,
  EmptyMessage: styled.div`
    text-align: center;
    width: 100%;
    font-size: 20px;
    font-weight: 600;
  `,
};

const ProductList = () => {
  const dispatch = useDispatch();
  const [onAddClick] = useAddCartEvent();
  const { productList, loading, error } = useSelector(
    ({ productListReducer }) => productListReducer.posts,
  );

  useEffect(() => {
    dispatch(getProductList());
  }, []);

  if (loading) {
    return (
      <Styled.ProductBox>
        <LoadingSpinner />
      </Styled.ProductBox>
    );
  }
  if (error) {
    return <Styled.ProductBox>에러 발생!</Styled.ProductBox>;
  }

  return (
    <Styled.ProductBox>
      {productList.length !== 0 ? (
        productList.map(({ id, name, price, thumbnail }) => (
          <Product
            key={id}
            id={id}
            name={name}
            price={Number(price)}
            thumbnail={thumbnail}
            onClick={onAddClick}
          />
        ))
      ) : (
        <Styled.EmptyMessage>상품 목록이 존재하지 않습니다.</Styled.EmptyMessage>
      )}
    </Styled.ProductBox>
  );
};

export default ProductList;

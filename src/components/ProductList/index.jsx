import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { getProductList } from 'modules/productList';

import Product from 'components/Product';
import LoadingSpinner from 'components/common/Styled/LoadingSpinner';
import { addCartItem } from 'modules/cart';

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

const ProductList = ({ onAddCartButtonClick }) => {
  const dispatch = useDispatch();

  const { productList, loading, error } = useSelector(
    ({ productListReducer }) => productListReducer.posts,
  );

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

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
      {productList.length ? (
        productList.map(({ id, name, price, thumbnail }) => (
          <Product
            key={id}
            id={id}
            name={name}
            price={Number(price)}
            thumbnail={thumbnail}
            onClick={onAddCartButtonClick}
          />
        ))
      ) : (
        <Styled.EmptyMessage>상품 목록이 존재하지 않습니다.</Styled.EmptyMessage>
      )}
    </Styled.ProductBox>
  );
};

ProductList.propTypes = {
  onAddCartButtonClick: PropTypes.func,
};

export default ProductList;

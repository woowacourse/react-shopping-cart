import React, { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Product from 'components/Product';
import { useSelector } from 'react-redux';

const Styled = {
  ProductBox: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
  `,
};

const ProductList = () => {
  const productList = useSelector(({ productListReducer }) => productListReducer.productList);

  return (
    <Styled.ProductBox>
      {productList &&
        productList.map(({ id, name, price, thumbnail }) => (
          <Product key={id} id={id} name={name} price={Number(price)} thumbnail={thumbnail} />
        ))}
    </Styled.ProductBox>
  );
};

export default ProductList;

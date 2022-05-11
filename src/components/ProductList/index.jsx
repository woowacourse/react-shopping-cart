import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Product from 'components/Product';

const Styled = {
  ProductBox: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
  `,
};

const ProductList = () => {
  return (
    <Styled.ProductBox>
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
      <Product />
    </Styled.ProductBox>
  );
};

export default ProductList;

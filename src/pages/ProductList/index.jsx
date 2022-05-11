import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Product from 'components/Product';
import Layout from 'pages/Layout';

const Styled = {
  ProductBox: styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
  `,
};

const ProductList = () => {
  return (
    <Layout>
      <Styled.ProductBox>
        <Product />
        <Product />
        <Product />
        <Product />
      </Styled.ProductBox>
    </Layout>
  );
};

export default ProductList;

import PropTypes from 'prop-types';
import React from 'react';
import ProductListItem from './ProductListItem';
import * as Styled from './style';

const ProductList = ({ children }) => {
  return <Styled.ProductList>{children}</Styled.ProductList>;
};

ProductList.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element),
};

export default ProductList;

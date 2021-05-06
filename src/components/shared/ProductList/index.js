import PropTypes from 'prop-types';
import React from 'react';
import ProductListItem from './ProductListItem';
import * as Styled from './style';

const ProductList = ({ listStyle, isCheckbox, products, imageSize, children }) => {
  return (
    <Styled.ProductList>
      {products.map((item) => (
        <ProductListItem
          key={item.id}
          listStyle={listStyle}
          isCheckbox={isCheckbox}
          imageSize={imageSize}
          product={item}
        >
          {children}
        </ProductListItem>
      ))}
    </Styled.ProductList>
  );
};

ProductList.propTypes = {
  listStyle: PropTypes.string,
  products: PropTypes.array,
  isCheckbox: PropTypes.bool,
  imageSize: PropTypes.string,
  children: PropTypes.any,
};

export default ProductList;

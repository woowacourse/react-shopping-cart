import PropTypes from 'prop-types';
import React from 'react';
import ProductListItem from './ProductListItem';

const ProductList = ({ listStyle, isCheckbox, products, imageSize, children }) => {
  return (
    <ul>
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
    </ul>
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

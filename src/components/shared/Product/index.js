import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const Product = ({ imageUrl, alt, size, direction, children }) => {
  return (
    <Styled.ProductContainer size={size} direction={direction}>
      <img src={imageUrl} alt={alt} />
      {children}
    </Styled.ProductContainer>
  );
};

Product.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['row', 'column']).isRequired,
  children: PropTypes.elementType,
};

export default Product;

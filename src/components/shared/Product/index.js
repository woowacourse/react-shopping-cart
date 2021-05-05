import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const Product = ({ imageUrl, alt, size, direction, children }) => {
  return (
    <Styled.ProductContainer size={size} direction={direction}>
      <img src={imageUrl} alt={alt} />
      <div>{children}</div>
    </Styled.ProductContainer>
  );
};

Product.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  direction: PropTypes.oneOf(['row', 'column']),
  children: PropTypes.elementType,
};

Product.defaultProps = {
  size: 'md',
  direction: 'column',
};

export default Product;

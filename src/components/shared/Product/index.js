import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const Product = ({ product, productDetail, size, direction }) => {
  return (
    <Styled.ProductContainer size={size} direction={direction}>
      <img src={product.image.url} alt={product.image.alt} />
      <div>
        <Styled.ProductName>{product.name}</Styled.ProductName>
        <Styled.ProductDetail>{productDetail}</Styled.ProductDetail>
      </div>
    </Styled.ProductContainer>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string,
    }),
    amount: PropTypes.number,
  }),
  productDetail: PropTypes.string,
  size: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['row', 'column']).isRequired,
};

export default Product;

import React from 'react';
import PropTypes from 'prop-types';

import FlexContainer from '../../common/FlexContainer';

import * as Styled from './style';

const Product = ({ product, productDetail, size, direction, onClick, children }) => {
  return (
    <Styled.ProductContainer size={size} direction={direction}>
      <Styled.ProductImageContainer direction={direction}>
        <Styled.ProductImage
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          onClick={onClick}
          direction={direction}
        />
      </Styled.ProductImageContainer>
      <FlexContainer justifyContent="space-between" align="center" padding="0 1rem">
        <FlexContainer direction="column" align="flex-start" height="100%">
          <Styled.ProductName>{product.name}</Styled.ProductName>
          {productDetail && (
            <Styled.ProductDetail fontSize={productDetail.fontSize} color={productDetail.color}>
              {productDetail.text}
            </Styled.ProductDetail>
          )}
        </FlexContainer>
        {children}
      </FlexContainer>
    </Styled.ProductContainer>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    productId: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
  }),
  productDetail: PropTypes.shape({
    text: PropTypes.string,
    fontSize: PropTypes.string,
    color: PropTypes.string,
  }),
  size: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  direction: PropTypes.oneOf(['row', 'column']).isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
};

export default React.memo(Product);

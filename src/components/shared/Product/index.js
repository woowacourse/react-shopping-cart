import PropTypes from 'prop-types';
import React from 'react';
import FlexContainer from '../../common/FlexContainer';
import * as Styled from './style';

const Product = ({ product, productDetail, size, direction, children }) => {
  return (
    <Styled.ProductContainer size={size} direction={direction}>
      <img src={product.image} alt={product.name} loading="lazy" />
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
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    image: PropTypes.string,
  }),
  productDetail: PropTypes.shape({
    text: PropTypes.string,
    fontSize: PropTypes.string,
    color: PropTypes.string,
  }),
  size: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['row', 'column']).isRequired,
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.bool]),
};

export default React.memo(Product);

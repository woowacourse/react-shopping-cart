import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';
import FlexContainer from '../../common/FlexContainer';

const Product = ({ product, productDetail, size, direction, children }) => {
  return (
    <Styled.ProductContainer size={size} direction={direction}>
      <img src={product.image.url} alt={product.image.alt} />
      <FlexContainer justifyContent={'space-between'} align={'center'} padding={'0 1rem'}>
        <div>
          <Styled.ProductName>{product.name}</Styled.ProductName>
          {productDetail && (
            <Styled.ProductDetail fontSize={productDetail.fontSize} color={productDetail.color}>
              {productDetail.text}
            </Styled.ProductDetail>
          )}
        </div>
        {children}
      </FlexContainer>
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
  productDetail: PropTypes.shape({
    text: PropTypes.string,
    fontSize: PropTypes.string,
    color: PropTypes.string,
  }),
  size: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(['row', 'column']).isRequired,
  children: PropTypes.element,
};

export default Product;

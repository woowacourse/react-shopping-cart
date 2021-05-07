import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';
import Product from '../../Product';
import Checkbox from '../../../common/Checkbox';

const ProductListItem = ({ product, listStyle, productDetail, isCheckbox, imageSize, children }) => {
  const productElement = <Product product={product} productDetail={productDetail} size={imageSize} direction={'row'} />;

  return (
    <Styled.ProductListItem listStyle={listStyle}>
      {isCheckbox ? (
        <Checkbox align={'flex-start'} isChecked={product.isChecked}>
          {productElement}
        </Checkbox>
      ) : (
        productElement
      )}
      {children}
    </Styled.ProductListItem>
  );
};

ProductListItem.propTypes = {
  listStyle: PropTypes.string,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.shape({
      url: PropTypes.string,
      alt: PropTypes.string,
    }),
    amount: PropTypes.number,
    isChecked: PropTypes.bool,
  }).isRequired,
  productDetail: PropTypes.string,
  isCheckbox: PropTypes.bool,
  imageSize: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.elementType, PropTypes.string]),
};

ProductListItem.defaultProps = {
  listStyle: 'lineStyle',
  isCheckbox: false,
  imageSize: '9rem',
};

export default ProductListItem;

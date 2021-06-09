import PropTypes from 'prop-types';
import React from 'react';
import Checkbox from '../../../common/Checkbox';
import Product from '../../Product';
import * as Styled from './style';

const ProductListItem = ({ product, listStyle, onChange, productDetail, isCheckbox, imageSize, children }) => {
  const productElement = <Product product={product} productDetail={productDetail} size={imageSize} direction="row" />;

  const onChangeCheckbox = () => {
    onChange(product.product_id);
  };

  return (
    <Styled.ProductListItem listStyle={listStyle}>
      {isCheckbox ? (
        <Checkbox align="flex-start" isChecked={product.isChecked} onChange={onChangeCheckbox}>
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
  onChange: PropTypes.func,
  product: PropTypes.shape({
    product_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    quantity: PropTypes.number,
    isChecked: PropTypes.bool,
  }).isRequired,
  productDetail: PropTypes.shape({
    text: PropTypes.string,
    color: PropTypes.string,
  }),
  isCheckbox: PropTypes.bool,
  imageSize: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element, PropTypes.node, PropTypes.string]),
};

ProductListItem.defaultProps = {
  listStyle: 'lineStyle',
  isCheckbox: false,
  imageSize: '9rem',
};

export default React.memo(ProductListItem);

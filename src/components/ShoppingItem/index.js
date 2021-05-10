import React from 'react';
import PropTypes from 'prop-types';
import Button from '../common/Button';
import CheckBox from '../common/CheckBox';
import QuantityInput from '../common/QuantityInput';
import { TrashCan } from '../../assets/svg';
import { FALLBACK } from '../../constants';
import { Controller, Image, Name, Product } from './index.styles';

const ShoppingItem = ({
  imgUrl = FALLBACK.PRODUCT.IMG_URL,
  imgAlt = FALLBACK.PRODUCT.IMG_ALT,
  name = FALLBACK.PRODUCT.NAME,
  price = FALLBACK.PRODUCT.PRICE,
  // onClick = () => {},
}) => (
  <Product>
    <CheckBox checked={true} onClick={() => {}} />
    <Image src={imgUrl} alt={imgAlt} />
    <Name>{name}</Name>
    <Controller>
      <button type="button" onClick={() => {}}>
        <TrashCan width="20" height="20" />
      </button>
      <QuantityInput type="number" />
      <span>{price}원</span>
    </Controller>
  </Product>
);

ShoppingItem.propTypes = {
  imgUrl: PropTypes.string,
  imgAlt: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  onClick: PropTypes.func,
};

export default ShoppingItem;

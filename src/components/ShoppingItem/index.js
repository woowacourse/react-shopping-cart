import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../common/CheckBox';
import QuantityInput from '../common/QuantityInput';
import { TrashCan } from '../../assets/svg';
import { Controller, Image, Name, Product } from './index.styles';
import { formatPrice } from '../../utils';

const ShoppingItem = ({ image_url, name, price, quantity, isChecked }) => (
  <Product>
    <CheckBox isChecked={isChecked} />
    <Image src={image_url} alt={name} />
    <Name>{name}</Name>
    <Controller>
      <button type="button">
        <TrashCan width="20" height="20" />
      </button>
      <QuantityInput type="number" quantity={quantity} />
      <span>{formatPrice(price * quantity)}원</span>
    </Controller>
  </Product>
);

ShoppingItem.propTypes = {
  image_url: PropTypes.string,
  imgAlt: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  isChecked: PropTypes.bool,
};

export default ShoppingItem;

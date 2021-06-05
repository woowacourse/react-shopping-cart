import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../common/CheckBox';
import QuantityInput from '../common/QuantityInput';
import { TrashCan } from '../../assets/svg';
import { Controller, Image, Name, Product } from './index.styles';
import { formatPrice } from '../../utils';

const ShoppingItem = ({
  imageUrl,
  name,
  price,
  quantity,
  isChecked,
  onCheckBoxClick,
  onDeleteButtonClick,
  increaseQuantity,
  decreaseQuantity,
}) => (
  <Product>
    <CheckBox onCheckBoxClick={onCheckBoxClick} isChecked={isChecked} />
    <Image src={imageUrl} alt={name} />
    <Name>{name}</Name>
    <Controller>
      <button onClick={onDeleteButtonClick} type="button">
        <TrashCan width="20" height="20" />
      </button>
      <QuantityInput
        type="number"
        quantity={quantity}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />
      <span>{formatPrice(price * quantity)}원</span>
    </Controller>
  </Product>
);

ShoppingItem.propTypes = {
  imageUrl: PropTypes.string,
  imgAlt: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  isChecked: PropTypes.bool,
  onCheckBoxClick: PropTypes.func,
};

export default ShoppingItem;

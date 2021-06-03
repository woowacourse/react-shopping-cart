import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../common/CheckBox';
import QuantityInput from '../common/QuantityInput';
import { TrashCan } from '../../assets/svg';
import { Controller, Image, Name, Product } from './index.styles';
import { formatPrice } from '../../utils';

const ShoppingItem = ({
  imgUrl,
  imgAlt,
  name,
  price,
  quantity,
  isChecked,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onCheckBoxClick,
  onDeleteButtonClick,
}) => {
  return (
    <Product>
      <CheckBox isChecked={isChecked} onCheckBoxClick={onCheckBoxClick} />
      <Image src={imgUrl} alt={imgAlt} />
      <Name>{name}</Name>
      <Controller>
        <button type="button" onClick={onDeleteButtonClick}>
          <TrashCan width="20" height="20" />
        </button>
        <QuantityInput
          type="number"
          quantity={quantity}
          onIncreaseQuantity={onIncreaseQuantity}
          onDecreaseQuantity={onDecreaseQuantity}
        />
        <span>{formatPrice(price * quantity)}원</span>
      </Controller>
    </Product>
  );
};

ShoppingItem.propTypes = {
  imgUrl: PropTypes.string,
  imgAlt: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  isChecked: PropTypes.bool,
  onDeleteButtonClick: PropTypes.func.isRequired,
  onIncreaseQuantity: PropTypes.func.isRequired,
  onDecreaseQuantity: PropTypes.func.isRequired,
  onCheckBoxClick: PropTypes.func.isRequired,
};

export default ShoppingItem;

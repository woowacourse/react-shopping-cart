import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../common/CheckBox';
import QuantityInput from '../common/QuantityInput';
import { TrashCan } from '../../assets/svg';
import { FALLBACK } from '../../constants';
import { Controller, Image, Name, Product } from './index.styles';
import { formatPrice } from '../../utils';

const ShoppingItem = ({
  imgUrl = FALLBACK.PRODUCT.IMG_URL,
  imgAlt = FALLBACK.PRODUCT.IMG_ALT,
  name = FALLBACK.PRODUCT.NAME,
  price = FALLBACK.PRODUCT.PRICE,
  quantity = FALLBACK.PRODUCT.QUANTITY,
  isChecked = FALLBACK.PRODUCT.CHECKED,
  onIncreaseQuantity = () => {},
  onDecreaseQuantity = () => {},
  onCheckBoxClick = () => {},
}) => {
  return (
    <Product>
      <CheckBox isChecked={isChecked} onCheckBoxClick={onCheckBoxClick} />
      <Image src={imgUrl} alt={imgAlt} />
      <Name>{name}</Name>
      <Controller>
        <button type="button" onClick={() => {}}>
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
  onIncreaseQuantity: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onCheckBoxClick: PropTypes.func,
};

export default ShoppingItem;

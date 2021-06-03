import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '../@common/CheckBox';
import QuantityInput from '../QuantityInput';
import { TrashCan } from '../../assets/svg';
import { FALLBACK } from '../../constants';
import { Controller, Name, Product, ImageWrapper } from './index.styles';
import { formatPrice } from '../../utils';
import Image from '../@common/Image';

const ShoppingItem = ({
  image_url = FALLBACK.PRODUCT.IMG_URL,
  name = FALLBACK.PRODUCT.NAME,
  price = FALLBACK.PRODUCT.PRICE,
  quantity = FALLBACK.PRODUCT.QUANTITY,
  isChecked = FALLBACK.PRODUCT.CHECKED,
  onIncreaseQuantity = () => {},
  onDecreaseQuantity = () => {},
  onCheckBoxClick = () => {},
  onDeleteButtonClick = () => {},
}) => {
  return (
    <Product>
      <CheckBox isChecked={isChecked} onCheckBoxClick={onCheckBoxClick} />
      <ImageWrapper>
        <Image src={image_url} alt={name} />
      </ImageWrapper>
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
  image_url: PropTypes.string,
  imgAlt: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number,
  isChecked: PropTypes.bool,
  onDeleteButtonClick: PropTypes.func,
  onIncreaseQuantity: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
  onCheckBoxClick: PropTypes.func,
};

export default ShoppingItem;

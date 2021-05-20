import React from 'react';
import PropTypes from 'prop-types';
import { FALLBACK } from '../../../constants';
import { InputWrapper, Input, ControlButtons } from './index.styles';

const QuantityInput = ({
  quantity = FALLBACK.PRODUCT.QUANTITY,
  onIncreaseQuantity,
  onDecreaseQuantity,
}) => {
  return (
    <InputWrapper>
      <label htmlFor="quantity-input"></label>
      <Input quantity={quantity} />
      <ControlButtons>
        <button onClick={onIncreaseQuantity}> ▲ </button>
        <button onClick={onDecreaseQuantity}> ▼ </button>
      </ControlButtons>
    </InputWrapper>
  );
};

QuantityInput.propTypes = {
  quantity: PropTypes.number,
  onIncreaseQuantity: PropTypes.func,
  onDecreaseQuantity: PropTypes.func,
};

export default QuantityInput;

import React from 'react';
import PropTypes from 'prop-types';
import { InputWrapper, Input, ControlButtons } from './index.styles';

const QuantityInput = ({ quantity, increaseQuantity, decreaseQuantity }) => {
  return (
    <InputWrapper>
      <label htmlFor="quantity-input"></label>
      <Input quantity={quantity} />
      <ControlButtons>
        <button onClick={increaseQuantity}> ▲ </button>
        <button onClick={decreaseQuantity}> ▼ </button>
      </ControlButtons>
    </InputWrapper>
  );
};

QuantityInput.propTypes = {
  quantity: PropTypes.number.isRequired,
  increaseQuantity: PropTypes.func.isRequired,
  decreaseQuantity: PropTypes.func.isRequired,
};

export default QuantityInput;

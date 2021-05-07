import React from 'react';
import PropTypes from 'prop-types';
import { InputWrapper, Input, ControlButtons } from './index.styles';

const QuantityInput = ({ quantity = 1 }) => {
  const handleIncrement = () => {};
  const handleDecrement = () => {};

  return (
    <InputWrapper>
      <label htmlFor="quantity-input"></label>
      <Input quantity={quantity} />
      <ControlButtons>
        <button onClick={handleIncrement}> ▲ </button>
        <button onClick={handleDecrement}> ▼ </button>
      </ControlButtons>
    </InputWrapper>
  );
};

QuantityInput.propTypes = {
  quantity: PropTypes.number,
};

export default QuantityInput;

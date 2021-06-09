import React from 'react';
import PropTypes from 'prop-types';

import * as Styled from './style';

const QuantityInput = ({ min, max, step, quantity, setQuantity }) => {
  const onIncrease = () => {
    setQuantity(quantity + step);
  };

  const onDecrease = () => {
    if (quantity <= min) return;

    setQuantity(quantity - step);
  };

  const onChangeQuantityInput = ({ target: { valueAsNumber } }) => {
    if (isNaN(valueAsNumber) || valueAsNumber <= min) {
      setQuantity(min);
    }

    setQuantity(valueAsNumber);
  };

  return (
    <Styled.QuantityInputContainer>
      <Styled.NumberContainer
        type="number"
        onChange={onChangeQuantityInput}
        min={min}
        max={max}
        step={step}
        value={quantity}
      />
      <Styled.ButtonContainer>
        <button type="button" onClick={onIncrease}></button>
        <button type="button" onClick={onDecrease}></button>
      </Styled.ButtonContainer>
    </Styled.QuantityInputContainer>
  );
};

QuantityInput.propTypes = {
  type: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  quantity: PropTypes.number.isRequired,
  setQuantity: PropTypes.func.isRequired,
};

QuantityInput.defaultProps = {
  step: 1,
};

export default QuantityInput;

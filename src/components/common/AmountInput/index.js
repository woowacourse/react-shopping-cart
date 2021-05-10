import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const AmountInput = ({ min, max, step, amount, setAmount }) => {
  const onIncrease = () => {
    setAmount(amount + step);
  };

  const onDecrease = () => {
    if (amount <= min) return;

    setAmount(amount - step);
  };

  const onChangeAmountInput = ({ target: { valueAsNumber } }) => {
    if (isNaN(valueAsNumber) || valueAsNumber <= min) {
      setAmount(min);
    }

    setAmount(valueAsNumber);
  };

  return (
    <Styled.AmountInputContainer>
      <Styled.NumberContainer
        type="number"
        onChange={onChangeAmountInput}
        min={min}
        max={max}
        step={step}
        value={amount}
      />
      <Styled.ButtonContainer>
        <button type="button" onClick={onIncrease}></button>
        <button type="button" onClick={onDecrease}></button>
      </Styled.ButtonContainer>
    </Styled.AmountInputContainer>
  );
};

AmountInput.propTypes = {
  type: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  amount: PropTypes.number.isRequired,
  setAmount: PropTypes.func.isRequired,
};

AmountInput.defaultProps = {
  step: 1,
};

export default AmountInput;

import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const AmountInput = ({ min, max, step, amount, setAmount }) => {
  const increase = () => {
    setAmount(amount + step);
  };

  const decrease = () => {
    setAmount(amount - step);
  };

  return (
    <Styled.AmountInputContainer>
      <Styled.NumberContainer type="number" min={min} max={max} step={step} value={amount} />
      <Styled.ButtonContainer>
        <button type="button" onClick={increase}></button>
        <button type="button" onClick={decrease}></button>
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

export default AmountInput;

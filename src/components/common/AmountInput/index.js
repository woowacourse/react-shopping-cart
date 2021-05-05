import React from 'react';
import PropTypes from 'prop-types';
import * as Styled from './style';

const AmountInput = ({ amount, setAmount }) => {
  const increase = () => {
    setAmount(amount + 1);
  };

  const decrease = () => {
    setAmount(amount - 1);
  };

  return (
    <Styled.AmountInputContainer>
      <Styled.NumberContainer>{amount}</Styled.NumberContainer>
      <Styled.ButtonContainer>
        <button type="button" onClick={increase}></button>
        <button type="button" onClick={decrease}></button>
      </Styled.ButtonContainer>
    </Styled.AmountInputContainer>
  );
};

AmountInput.propTypes = {
  amount: PropTypes.number.isRequired,
  setAmount: PropTypes.func.isRequired,
};

export default AmountInput;

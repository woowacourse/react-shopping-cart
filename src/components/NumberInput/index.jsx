import React from 'react';
import { InputWrapperStyled, InputStyled, ButtonStyled } from './style';

function NumberInput() {
  return (
    <InputWrapperStyled>
      <InputStyled type="number" min="1" max="100" step="1" value="1" />
      <ButtonStyled>
        <button className="increase"> + </button>
        <button className="decrease"> - </button>
      </ButtonStyled>
    </InputWrapperStyled>
  );
}

export default NumberInput;

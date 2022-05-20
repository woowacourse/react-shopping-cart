import React from 'react';
import { InputStyled, LabelStyled } from './style';

function Checkbox() {
  return (
    <>
      <InputStyled input id="checkbox" type="checkbox" />
      <LabelStyled htmlFor="checkbox"></LabelStyled>
    </>
  );
}

export default Checkbox;

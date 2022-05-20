import React from 'react';
import { InputStyled, LabelStyled } from './style';

function Checkbox({ label }) {
  return (
    <>
      <InputStyled input id="checkbox" type="checkbox" />
      <LabelStyled htmlFor="checkbox"></LabelStyled>
      <label htmlFor="checkbox">{label}</label>
    </>
  );
}

export default Checkbox;

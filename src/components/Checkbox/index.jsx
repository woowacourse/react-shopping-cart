import React from 'react';
import { CheckboxWrapperStyled, InputStyled, CheckboxStyled, LabelStyled } from './style';

function Checkbox({ label }) {
  return (
    <CheckboxWrapperStyled>
      <InputStyled input id="checkbox" type="checkbox" />
      <CheckboxStyled htmlFor="checkbox">
        <div></div>
      </CheckboxStyled>
      <LabelStyled htmlFor="checkbox">{label}</LabelStyled>
    </CheckboxWrapperStyled>
  );
}

export default Checkbox;

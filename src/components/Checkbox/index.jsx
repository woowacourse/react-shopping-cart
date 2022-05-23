import React from 'react';
import { CheckboxWrapperStyled, InputStyled, CheckboxStyled, LabelStyled } from './style';

function Checkbox({ isChecked, label, onClick }) {
  return (
    <CheckboxWrapperStyled>
      <InputStyled
        input
        id="checkbox"
        type="checkbox"
        checked={isChecked ? true : false}
        readOnly
      />
      <CheckboxStyled htmlFor="checkbox" onClick={onClick}>
        <div></div>
      </CheckboxStyled>
      <LabelStyled htmlFor="checkbox">{label}</LabelStyled>
    </CheckboxWrapperStyled>
  );
}

export default Checkbox;

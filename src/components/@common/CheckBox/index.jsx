import React from 'react';
import { CheckBoxStyle, DefaultCheckBox } from './styles';

const CheckBox = ({ children, checkState, handleChecked }) => (
  <label>
    <CheckBoxStyle isChecked={checkState}>
      ✔
      <DefaultCheckBox type="checkbox" onChange={handleChecked} />
    </CheckBoxStyle>
    {children}
  </label>
);

export default CheckBox;

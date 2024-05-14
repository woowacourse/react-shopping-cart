import { useState } from 'react';
import { CheckBoxStyle } from './CheckBox.style';
import Checkbox from '../../assets/checkbox.svg';
import CheckboxDisable from '../../assets/checkbox-disable.svg';

export default function CheckBox() {
  const [isCheck, setIsCheck] = useState(false);

  return (
    <CheckBoxStyle onClick={() => setIsCheck(!isCheck)}>
      <img src={isCheck ? Checkbox : CheckboxDisable} alt="" />
    </CheckBoxStyle>
  );
}

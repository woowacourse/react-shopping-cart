import { HTMLAttributes } from 'react';
import { StyleCheckBox, StyleCheckMark, StyleLabel } from './CheckBox.style';

interface CheckBoxProps extends HTMLAttributes<HTMLInputElement> {
  type?: 'checkbox';
  checked?: boolean;
  onChange?: () => void;
}

const CheckBox = ({ type, ...restProps }: CheckBoxProps) => (
  <StyleLabel>
    <StyleCheckBox type={type} {...restProps} />
    <StyleCheckMark />
  </StyleLabel>
);

export default CheckBox;

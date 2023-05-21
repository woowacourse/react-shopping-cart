import { HTMLAttributes } from 'react';
import { StyleCheckBox, StyleCheckMark, StyleLabel } from './CheckBox.style';

interface CheckBoxProps extends HTMLAttributes<HTMLInputElement> {
  type?: 'checkbox';
  checked?: boolean;
  onChange?: () => void;
  size?: 'small' | 'medium' | 'large';
}

const CheckBox = ({ type, size, ...restProps }: CheckBoxProps) => (
  <StyleLabel>
    <StyleCheckBox boxsize={size} type={type} {...restProps} />
    <StyleCheckMark boxsize={size} />
  </StyleLabel>
);

export default CheckBox;

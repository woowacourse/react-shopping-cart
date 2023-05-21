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
    <StyleCheckBox boxSize={size} type={type} {...restProps} />
    <StyleCheckMark boxSize={size} />
  </StyleLabel>
);

export default CheckBox;

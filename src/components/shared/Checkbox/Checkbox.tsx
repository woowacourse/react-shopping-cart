/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { InputHTMLAttributes } from 'react';
import Styled from './Checkbox.styles';

type CheckboxProps = {
  labelText?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
} & InputHTMLAttributes<HTMLInputElement>;

const Checkbox = (props: CheckboxProps) => {
  const { labelText, checked, onChange, disabled } = props;

  return (
    <Styled.Label disabled={disabled}>
      <Styled.Checkbox type="checkbox" checked={checked} onChange={onChange} {...props} />
      <Styled.CheckMark />
      <Styled.Text>{labelText}</Styled.Text>
    </Styled.Label>
  );
};

Checkbox.defaultProps = {
  labelText: '',
  checked: false,
  onChange: () => {},
};

export default Checkbox;

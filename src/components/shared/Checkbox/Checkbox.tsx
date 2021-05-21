/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { InputHTMLAttributes, ReactElement } from 'react';
import Styled from './Checkbox.styles';

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  labelText?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: IProps): ReactElement => {
  const { labelText = '', checked = false, onChange = () => {}, disabled } = props;

  return (
    <Styled.Label disabled={disabled}>
      <Styled.Checkbox type="checkbox" checked={checked} onChange={onChange} {...props} />
      <Styled.CheckMark />
      <Styled.Text>{labelText}</Styled.Text>
    </Styled.Label>
  );
};

export default Checkbox;

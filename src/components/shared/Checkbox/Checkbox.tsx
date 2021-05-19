/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import Styled from './Checkbox.styles';

interface CheckboxProps {
  labelText?: string;
  checked?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = (props: CheckboxProps) => {
  const { labelText, checked, onChange } = props;

  return (
    <Styled.Label>
      <Styled.Checkbox type="checkbox" checked={checked} onChange={onChange} />
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

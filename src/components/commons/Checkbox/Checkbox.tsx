import { HTMLAttributes } from 'react';

import * as Styled from './Checkbox.styled';

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
  checked?: boolean;
}

const Checkbox = (props: CheckboxProps) => {
  const { defaultChecked, onClick, label, checked, onChange } = props;

  return (
    <div>
      <Styled.CheckboxInput
        type="checkbox"
        id={label}
        defaultChecked={defaultChecked}
        onClick={onClick}
        checked={checked}
        onChange={onChange}
      />
      <Styled.CheckboxLabel htmlFor={label}>
        <Styled.CheckSignDiv aria-hidden />
        <Styled.LabelTextSpan>{label}</Styled.LabelTextSpan>
      </Styled.CheckboxLabel>
    </div>
  );
};

export default Checkbox;

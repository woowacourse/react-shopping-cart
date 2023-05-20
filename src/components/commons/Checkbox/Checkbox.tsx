import { HTMLAttributes } from 'react';

import * as Styled from './Checkbox.styled';

interface CheckboxProps extends HTMLAttributes<HTMLInputElement> {
  label: string;
}

const Checkbox = (props: CheckboxProps) => {
  const { defaultChecked, onClick, label } = props;

  return (
    <div>
      <Styled.CheckboxInput
        type="checkbox"
        id={label}
        defaultChecked={defaultChecked}
        onClick={onClick}
      />
      <Styled.CheckboxLabel htmlFor={label}>
        <Styled.CheckSignDiv aria-hidden />
        <Styled.LabelTextSpan>{label}</Styled.LabelTextSpan>
      </Styled.CheckboxLabel>
    </div>
  );
};

export default Checkbox;

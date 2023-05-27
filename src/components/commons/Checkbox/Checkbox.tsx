import { InputHTMLAttributes, useState } from 'react';

import { Check } from '@assets/index';

import { StyledOuterCheckbox, StyledInnerCheckbox } from './Checkbox.styled';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  border?: string | null;
  borderRadius?: string | number | null;
  backgroundColor?: string | null;
}

export const Checkbox = (props: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <StyledOuterCheckbox
      {...props}
      onClick={() => {
        setIsChecked(!isChecked);
      }}
    >
      {isChecked && (
        <StyledInnerCheckbox {...props} aria-label="checked">
          <Check />
        </StyledInnerCheckbox>
      )}
    </StyledOuterCheckbox>
  );
};

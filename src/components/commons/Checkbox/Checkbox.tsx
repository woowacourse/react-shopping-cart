import { InputHTMLAttributes, useState } from 'react';

import { StyledOuterCheckbox, StyledInnerCheckbox } from './Checkbox.styled';
import { Check } from '@assets/index';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  border?: string | null;
  borderRadius?: string | number | null;
  backgroundColor?: string | null;
}

export const Checkbox = (props: CheckboxProps) => {
  const [isCheck, setIsCheck] = useState(false);

  return (
    <StyledOuterCheckbox {...props} onClick={() => setIsCheck(!isCheck)}>
      {isCheck && (
        <StyledInnerCheckbox {...props} aria-label="checked">
          <Check />
        </StyledInnerCheckbox>
      )}
    </StyledOuterCheckbox>
  );
};

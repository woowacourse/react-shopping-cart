import { useState } from 'react';

import { StyledOuterCheckbox, StyledInnerCheckbox } from './Checkbox.styled';
import { Check } from '@assets/index';

export interface CheckboxProps {
  width?: string | number | null;
  height?: string | number | null;
  border?: string | null;
  borderRadius?: string | number | null;
  backgroundColor?: string | null;
}

export const Checkbox = (props: CheckboxProps) => {
  const [isCheck, setIsCheck] = useState(false);

  return (
    <StyledOuterCheckbox {...props} onClick={() => setIsCheck(!isCheck)}>
      {isCheck && (
        <StyledInnerCheckbox {...props}>
          <Check />
        </StyledInnerCheckbox>
      )}
    </StyledOuterCheckbox>
  );
};

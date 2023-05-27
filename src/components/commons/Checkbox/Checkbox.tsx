import { InputHTMLAttributes, useState } from 'react';

import { Check } from '@assets/index';

import {
  StyledOuterCheckbox,
  StyledInnerCheckbox,
  StyledCheckbox,
} from './Checkbox.styled';

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  handleCheck?: () => void;
  handleUnCheck?: () => void;
  border?: string | null;
  borderRadius?: string | number | null;
  backgroundColor?: string | null;
}

export const Checkbox = (props: CheckboxProps) => {
  const { handleCheck, handleUnCheck } = props;
  const [isChecked, setIsChecked] = useState(false);

  const handleOuterCheckboxClick = () => {
    setIsChecked(true);

    if (handleCheck) handleCheck();
  };

  const handleInnerCheckboxClick = () => {
    setIsChecked(false);

    if (handleUnCheck) handleUnCheck();
  };

  return (
    <StyledCheckbox>
      {!isChecked ? (
        <StyledOuterCheckbox
          {...props}
          onClick={handleOuterCheckboxClick}
        ></StyledOuterCheckbox>
      ) : (
        <StyledInnerCheckbox
          {...props}
          aria-label="checked"
          onClick={handleInnerCheckboxClick}
        >
          <Check />
        </StyledInnerCheckbox>
      )}
    </StyledCheckbox>
  );
};

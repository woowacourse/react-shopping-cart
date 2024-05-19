import React from "react";
import CheckedButtonIcon from "../../../assets/CheckedButtonIcon.png";
import UnCheckedButtonIcon from "../../../assets/UncheckedButtonIcon.png";
import { StyledCheckboxButton, StyledCheckboxButtonImg } from "./CheckboxButton.styled";

interface CheckboxButtonProps {
  isChecked?: boolean;
  onCheck: () => void;
  disabled?: boolean;
}

export const CheckboxButton: React.FC<CheckboxButtonProps> = ({ isChecked, onCheck, disabled }) => {
  const src = isChecked ? CheckedButtonIcon : UnCheckedButtonIcon;
  return (
    <StyledCheckboxButton onClick={onCheck} disabled={disabled}>
      <StyledCheckboxButtonImg src={src} />
    </StyledCheckboxButton>
  );
};

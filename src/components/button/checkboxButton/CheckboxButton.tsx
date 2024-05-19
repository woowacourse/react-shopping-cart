import React from "react";
import CheckedButtonIcon from "../../../assets/CheckedButtonIcon.png";
import UnCheckedButtonIcon from "../../../assets/UncheckedButtonIcon.png";
import { StyledCheckboxButton, StyledCheckboxButtonImg } from "./CheckboxButton.styled";

interface CheckboxButtonProps {
  clicked?: boolean;
  onCheck: () => void;
  disabled?: boolean;
}

export const CheckboxButton: React.FC<CheckboxButtonProps> = ({ clicked, onCheck, disabled }) => {
  const src = clicked ? CheckedButtonIcon : UnCheckedButtonIcon;
  return (
    <StyledCheckboxButton onClick={onCheck} disabled={disabled}>
      <StyledCheckboxButtonImg src={src} />
    </StyledCheckboxButton>
  );
};

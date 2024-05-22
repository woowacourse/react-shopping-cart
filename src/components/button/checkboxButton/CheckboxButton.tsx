import React from "react";
import CheckedButtonIcon from "../../../assets/CheckedButtonIcon.png";
import UnCheckedButtonIcon from "../../../assets/UncheckedButtonIcon.png";
import BaseButton from "../baseButton/baseButton";
import { StyledBaseButtonImg } from "../baseButton/baseButton.styled";

interface CheckboxButtonProps {
  isChecked?: boolean;
  onCheck: () => void;
  disabled?: boolean;
}

export const CheckboxButton: React.FC<CheckboxButtonProps> = ({ isChecked, onCheck, disabled }) => {
  const src = isChecked ? CheckedButtonIcon : UnCheckedButtonIcon;
  return (
    <BaseButton onClick={onCheck} disabled={disabled}>
      <StyledBaseButtonImg src={src} />
    </BaseButton>
  );
};

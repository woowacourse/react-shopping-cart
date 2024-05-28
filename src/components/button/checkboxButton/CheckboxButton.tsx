import React from "react";
import { CheckedButtonIcon, UncheckedButtonIcon } from "../../../assets";
import BaseButton from "../baseButton/baseButton";
import { StyledBaseButtonImg } from "../baseButton/baseButton.styled";

interface CheckboxButtonProps {
  isChecked?: boolean;
  onCheck: () => void;
  disabled?: boolean;
}

export const CheckboxButton: React.FC<CheckboxButtonProps> = ({ isChecked, onCheck, disabled }) => {
  const src = isChecked ? CheckedButtonIcon : UncheckedButtonIcon;
  return (
    <BaseButton onClick={onCheck} disabled={disabled}>
      <StyledBaseButtonImg src={src} />
    </BaseButton>
  );
};

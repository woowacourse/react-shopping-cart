import React from "react";
<<<<<<< HEAD
import { CheckedButtonIcon, UncheckedButtonIcon } from "../../../assets";
import BaseButton from "../baseButton/baseButton";
import { StyledBaseButtonImg } from "../baseButton/baseButton.styled";
=======
import CheckedButtonIcon from "../../../assets/CheckedButtonIcon.png";
import UnCheckedButtonIcon from "../../../assets/UncheckedButtonIcon.png";
import { StyledCheckboxButton, StyledCheckboxButtonImg } from "./CheckboxButton.styled";
>>>>>>> 00kang

interface CheckboxButtonProps {
  isChecked?: boolean;
  onCheck: () => void;
  disabled?: boolean;
}

export const CheckboxButton: React.FC<CheckboxButtonProps> = ({ isChecked, onCheck, disabled }) => {
<<<<<<< HEAD
  const src = isChecked ? CheckedButtonIcon : UncheckedButtonIcon;
  return (
    <BaseButton onClick={onCheck} disabled={disabled}>
      <StyledBaseButtonImg src={src} />
    </BaseButton>
=======
  const src = isChecked ? CheckedButtonIcon : UnCheckedButtonIcon;
  return (
    <StyledCheckboxButton onClick={onCheck} disabled={disabled}>
      <StyledCheckboxButtonImg src={src} />
    </StyledCheckboxButton>
>>>>>>> 00kang
  );
};

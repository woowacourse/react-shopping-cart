import React from "react";
<<<<<<< HEAD
import { StyledDeleteButtonText } from "./DeleteButton.styled";
import BaseButton from "../baseButton/baseButton";
=======
import { StyledDeleteButton, StyledDeleteButtonText } from "./DeleteButton.styled";
>>>>>>> 00kang

interface DeleteButtonProps {
  onDelete: () => void;
  disabled?: boolean;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete, disabled }) => {
  return (
<<<<<<< HEAD
    <BaseButton onClick={onDelete} disabled={disabled}>
      <StyledDeleteButtonText>삭제</StyledDeleteButtonText>
    </BaseButton>
=======
    <StyledDeleteButton onClick={onDelete} disabled={disabled}>
      <StyledDeleteButtonText>삭제</StyledDeleteButtonText>
    </StyledDeleteButton>
>>>>>>> 00kang
  );
};

import React from "react";
import { StyledDeleteButton, StyledDeleteButtonText } from "./DeleteButton.styled";

interface DeleteButtonProps {
  onDelete: () => void;
  disabled?: boolean;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete, disabled }) => {
  return (
    <StyledDeleteButton onClick={onDelete} disabled={disabled}>
      <StyledDeleteButtonText>삭제</StyledDeleteButtonText>
    </StyledDeleteButton>
  );
};

import React from "react";
import { StyledDeleteButtonText } from "./DeleteButton.styled";
import BaseButton from "../baseButton/baseButton";

interface DeleteButtonProps {
  onDelete: () => void;
  disabled?: boolean;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete, disabled }) => {
  return (
    <BaseButton onClick={onDelete} disabled={disabled}>
      <StyledDeleteButtonText>삭제</StyledDeleteButtonText>
    </BaseButton>
  );
};

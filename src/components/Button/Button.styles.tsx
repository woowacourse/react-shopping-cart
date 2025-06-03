import styled from "@emotion/styled";
import { ButtonVariant } from "./type";

export const Button = styled.button<{ disabled: boolean; variant: ButtonVariant }>`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  padding: 16px 8px;
  background-color: ${({ disabled, variant }) =>
    disabled ? "rgba(0, 0, 0, 0.1)" : variant === "contained" ? "black" : "transparent"};
  border-radius: 4px;
  border: ${({ variant }) => (variant === "contained" ? "none" : "1px solid #333")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  color: ${({ variant }) => (variant === "contained" ? "white" : "black")};
`;

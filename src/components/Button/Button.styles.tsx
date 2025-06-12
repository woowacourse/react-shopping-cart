import styled from "@emotion/styled";
import { ButtonVariant } from "./type";

export const Button = styled.button<{ disabled: boolean; variant: ButtonVariant; isLoading: boolean }>`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: center;
  padding: 16px 8px;
  background-color: ${({ disabled, variant, theme }) =>
    disabled ? theme.colors.gray : variant === "contained" ? "black" : "transparent"};
  border-radius: 4px;
  border: ${({ variant, theme }) => (variant === "contained" ? "none" : `1px solid ${theme.colors.gray}`)};
  color: ${({ variant }) => (variant === "contained" ? "white" : "black")};
  cursor: ${({ disabled, isLoading }) => (disabled || isLoading ? "not-allowed" : "pointer")};
  opacity: ${({ isLoading }) => (isLoading ? 0.5 : 1)};
`;
